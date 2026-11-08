import "server-only";
import { promises as fs } from "node:fs";
import path from "node:path";
import { product, type Review } from "./product";
import { usableReviews } from "./reviews";

/**
 * Review storage adapter (server only).
 *
 *  - Production: Upstash Redis over its REST API. Env vars (either pair works):
 *      UPSTASH_REDIS_REST_URL / UPSTASH_REDIS_REST_TOKEN
 *      KV_REST_API_URL / KV_REST_API_TOKEN   (injected by the Vercel marketplace integration)
 *  - Anywhere that is NOT Vercel and has no Redis vars (`next dev` and `next start`):
 *    a JSON file at .data/reviews.json (git-ignored), with a one-time console warning.
 *  - On Vercel without Redis vars: mode "none" (read-only filesystem, nothing can persist).
 *    The API answers 503 and the server log names the missing variables.
 *  - REVIEWS_STORE=redis|file|off overrides the choice.
 */

/**
 * A stored review. There is no status field: no approval step exists, so every
 * stored review is published. (Existing records that carry a legacy `area` are read as `city`.)
 */
export type StoredReview = {
  id: string;
  name: string;
  rating: number;
  /** The review text, in Urdu or any language. */
  textUr: string;
  city?: string;
  /** ISO timestamp. */
  createdAt: string;
  /**
   * Always false on submit. There is no order database, so nothing can verify an order
   * automatically; only the owner can set it, in the management page, after checking
   * the order out of band.
   */
  verifiedPurchase: boolean;
};

export type StoreMode = "redis" | "file" | "none";

const HASH_KEY = "eagle:reviews";

function redisConfig(): { url: string; token: string } | null {
  const url = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;
  if (!url || !token) return null;
  return { url: url.replace(/\/+$/, ""), token };
}

const warned = new Set<string>();
function warnOnce(key: string, message: string, level: "warn" | "error" = "warn") {
  if (warned.has(key)) return;
  warned.add(key);
  console[level](`[reviews] ${message}`);
}

/**
 * Backend selection, in order:
 *  1. REVIEWS_STORE=off              -> "none" (explicit opt-out)
 *  2. REVIEWS_STORE=redis, or Redis env vars present -> "redis"
 *  3. REVIEWS_STORE=file, or not running on Vercel   -> "file" (.data/reviews.json),
 *     in both `next dev` and `next start`, with a one-time warning
 *  4. On Vercel with no Redis vars -> "none": the filesystem there is read-only and
 *     ephemeral, so nothing could be persisted. A clear server error names the variables.
 */
export function storeMode(): StoreMode {
  const forced = (process.env.REVIEWS_STORE || "").trim().toLowerCase();
  if (forced === "off") return "none";

  if (forced !== "file" && redisConfig()) return "redis";
  if (forced === "redis") {
    warnOnce(
      "redis-missing",
      "REVIEWS_STORE=redis but no Redis credentials found. Set UPSTASH_REDIS_REST_URL + UPSTASH_REDIS_REST_TOKEN (or KV_REST_API_URL + KV_REST_API_TOKEN).",
      "error",
    );
    return "none";
  }

  if (forced === "file" || !process.env.VERCEL) {
    warnOnce(
      "file-store",
      "Reviews are being stored in a local file (.data/reviews.json). This is for local use only: set UPSTASH_REDIS_REST_URL + UPSTASH_REDIS_REST_TOKEN (or KV_REST_API_URL + KV_REST_API_TOKEN) for production.",
    );
    return "file";
  }

  warnOnce(
    "vercel-no-redis",
    "Reviews cannot be saved: running on Vercel without a Redis store. Add the Upstash Redis integration (injects KV_REST_API_URL and KV_REST_API_TOKEN) or set UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN, then redeploy.",
    "error",
  );
  return "none";
}

/* ------------------------------ Redis (REST) ----------------------------- */

async function redis(command: (string | number)[]): Promise<unknown> {
  const config = redisConfig();
  if (!config) throw new Error("store unavailable");
  const response = await fetch(config.url, {
    method: "POST",
    headers: { Authorization: `Bearer ${config.token}`, "Content-Type": "application/json" },
    body: JSON.stringify(command),
    // No explicit `cache` option on purpose: `cache: "no-store"` makes the homepage
    // render dynamically (DYNAMIC_SERVER_USAGE), which broke the ISR page. API routes are
    // force-dynamic, so their calls (INCR, HSET, ...) are never cached anyway.
    signal: AbortSignal.timeout(5000),
  });
  // Upstash answers { result } on success and { error } (with a non-2xx status) on failure.
  // The error text never contains the token, so it is safe to put in server logs.
  let data: { result?: unknown; error?: string } = {};
  try {
    data = (await response.json()) as typeof data;
  } catch {
    if (response.ok) throw new Error(`Redis ${command[0]}: response was not JSON`);
  }
  if (!response.ok || data.error) {
    throw new Error(`Redis ${command[0]} failed (HTTP ${response.status}): ${data.error ?? "no error text"}`);
  }
  return data.result;
}

function parseRecord(raw: unknown): StoredReview | null {
  try {
    const value = typeof raw === "string" ? JSON.parse(raw) : raw;
    if (!value || typeof value !== "object") return null;
    const r = value as Partial<StoredReview> & { area?: string };
    const city = r.city ?? r.area;
    if (typeof r.id !== "string" || typeof r.name !== "string" || typeof r.textUr !== "string") return null;
    if (typeof r.rating !== "number" || typeof r.createdAt !== "string") return null;
    return {
      id: r.id,
      name: r.name,
      rating: r.rating,
      textUr: r.textUr,
      ...(city ? { city } : {}),
      createdAt: r.createdAt,
      verifiedPurchase: r.verifiedPurchase === true,
    };
  } catch {
    return null;
  }
}

/* ------------------------------- File (dev) ------------------------------ */

type FileData = { reviews: StoredReview[]; rate: Record<string, number[]> };

const dataDir = () => path.join(process.cwd(), ".data");
const dataFile = () => path.join(dataDir(), "reviews.json");

let fileQueue: Promise<unknown> = Promise.resolve();

/** Serializes read-modify-write so concurrent requests cannot clobber each other. */
function withFile<T>(work: (data: FileData) => T | Promise<T>, write: boolean): Promise<T> {
  const run = fileQueue.then(async () => {
    let data: FileData = { reviews: [], rate: {} };
    try {
      const parsed = JSON.parse(await fs.readFile(dataFile(), "utf8")) as Partial<FileData>;
      data = {
        reviews: (parsed.reviews ?? []).map(parseRecord).filter((r): r is StoredReview => r !== null),
        rate: parsed.rate ?? {},
      };
    } catch {
      /* missing or unreadable file: start empty */
    }
    const result = await work(data);
    if (write) {
      await fs.mkdir(dataDir(), { recursive: true });
      const temp = `${dataFile()}.${process.pid}.tmp`;
      await fs.writeFile(temp, JSON.stringify(data, null, 2), "utf8");
      await fs.rename(temp, dataFile());
    }
    return result;
  });
  fileQueue = run.catch(() => undefined);
  return run;
}

/* ------------------------------ Public API ------------------------------- */

export async function listAllReviews(): Promise<StoredReview[]> {
  const mode = storeMode();
  let items: StoredReview[] = [];
  if (mode === "redis") {
    const flat = await redis(["HGETALL", HASH_KEY]);
    const values = Array.isArray(flat)
      ? flat.filter((_, index) => index % 2 === 1)
      : flat && typeof flat === "object"
        ? Object.values(flat)
        : [];
    items = values.map(parseRecord).filter((r): r is StoredReview => r !== null);
  } else if (mode === "file") {
    items = await withFile((data) => data.reviews, false);
  } else {
    throw new Error("store unavailable");
  }
  return items.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export async function createReview(review: StoredReview): Promise<void> {
  const mode = storeMode();
  if (mode === "redis") {
    await redis(["HSET", HASH_KEY, review.id, JSON.stringify(review)]);
  } else if (mode === "file") {
    await withFile((data) => void data.reviews.push(review), true);
  } else {
    throw new Error("store unavailable");
  }
}

export async function updateReview(
  id: string,
  patch: Partial<Pick<StoredReview, "verifiedPurchase">>,
): Promise<StoredReview | null> {
  const mode = storeMode();
  if (mode === "redis") {
    const current = parseRecord(await redis(["HGET", HASH_KEY, id]));
    if (!current) return null;
    const next = { ...current, ...patch };
    await redis(["HSET", HASH_KEY, id, JSON.stringify(next)]);
    return next;
  }
  if (mode === "file") {
    return withFile((data) => {
      const index = data.reviews.findIndex((r) => r.id === id);
      if (index < 0) return null;
      data.reviews[index] = { ...data.reviews[index], ...patch };
      return data.reviews[index];
    }, true);
  }
  throw new Error("store unavailable");
}

export async function deleteReview(id: string): Promise<boolean> {
  const mode = storeMode();
  if (mode === "redis") {
    return Number(await redis(["HDEL", HASH_KEY, id])) > 0;
  }
  if (mode === "file") {
    return withFile((data) => {
      const before = data.reviews.length;
      data.reviews = data.reviews.filter((r) => r.id !== id);
      return data.reviews.length < before;
    }, true);
  }
  throw new Error("store unavailable");
}

/**
 * Counts one attempt for `key` inside a fixed window and says whether it is still
 * within `limit`. Redis uses INCR + EXPIRE (TTL); the file store keeps timestamps.
 */
export async function hitRateLimit(key: string, windowSeconds: number, limit: number): Promise<boolean> {
  const mode = storeMode();
  if (mode === "redis") {
    const redisKey = `eagle:rl:${key}`;
    // Create the key WITH its TTL first (NX = only if absent), then INCR. This way a key
    // can never exist without an expiry, even if a request dies between the two calls.
    await redis(["SET", redisKey, 0, "EX", windowSeconds, "NX"]);
    const count = Number(await redis(["INCR", redisKey]));
    return count <= limit;
  }
  if (mode === "file") {
    return withFile((data) => {
      const now = Date.now();
      const recent = (data.rate[key] ?? []).filter((time) => now - time < windowSeconds * 1000);
      const allowed = recent.length < limit;
      recent.push(now);
      data.rate[key] = recent;
      for (const stale of Object.keys(data.rate)) {
        if (data.rate[stale].every((time) => now - time > 86_400_000)) delete data.rate[stale];
      }
      return allowed;
    }, true);
  }
  throw new Error("store unavailable");
}

/* ------------------------------ Homepage use ----------------------------- */

function toDisplay(stored: StoredReview): Review {
  return {
    id: stored.id,
    name: stored.name,
    rating: stored.rating,
    textUr: stored.textUr,
    date: stored.createdAt,
    verifiedPurchase: stored.verifiedPurchase,
    ...(stored.city ? { city: stored.city } : {}),
  };
}

/**
 * The single list the homepage shows AND uses for review JSON-LD: owner-curated
 * `product.reviews` plus every stored review, invalid entries dropped, newest first.
 */
export async function getDisplayedReviews(): Promise<Review[]> {
  const stored = await getStoredReviews();
  return usableReviews([...product.reviews, ...stored]).sort((a, b) => Date.parse(b.date) - Date.parse(a.date));
}

/**
 * Stored (customer-submitted) reviews. Fails soft: if the store is missing or
 * unreachable it returns [] so the page still renders (and `next build` never fails).
 */
export async function getStoredReviews(): Promise<Review[]> {
  if (storeMode() === "none") return [];
  try {
    const all = await listAllReviews();
    return usableReviews(all.map(toDisplay));
  } catch (error) {
    console.error("[reviews] Could not read reviews; rendering the page without them:", error);
    return [];
  }
}
