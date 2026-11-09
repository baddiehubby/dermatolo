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
 *  - REVIEWS_STORE=redis|file|off overrides the choice.
 *
 * Moderation: new submissions are status "pending" until approved in /admin/reviews.
 */

export type ReviewStatus = "pending" | "published";

export type StoredReview = {
  id: string;
  name: string;
  rating: number;
  /** The review text, in Urdu, English, or any language. */
  textUr: string;
  city?: string;
  /** ISO timestamp. */
  createdAt: string;
  /**
   * Always false on submit. There is no order database, so nothing can verify an order
   * automatically; only the owner can set it after checking the order out of band.
   */
  verifiedPurchase: boolean;
  /** pending = awaiting moderation; published = visible on storefront. */
  status: ReviewStatus;
};

export type StoreMode = "redis" | "file" | "none";

const HASH_KEY = "money:reviews";

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
    signal: AbortSignal.timeout(5000),
  });
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
    // Legacy records without status → pending (require explicit approve under this brief).
    const status: ReviewStatus = r.status === "published" ? "published" : "pending";
    return {
      id: r.id,
      name: r.name,
      rating: r.rating,
      textUr: r.textUr,
      ...(city ? { city } : {}),
      createdAt: r.createdAt,
      verifiedPurchase: r.verifiedPurchase === true,
      status,
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
  patch: Partial<Pick<StoredReview, "verifiedPurchase" | "status">>,
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

export async function hitRateLimit(key: string, windowSeconds: number, limit: number): Promise<boolean> {
  const mode = storeMode();
  if (mode === "redis") {
    const redisKey = `money:rl:${key}`;
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
 * Published reviews only for the storefront + review JSON-LD.
 * Owner-curated `product.reviews` are treated as already published.
 */
export async function getDisplayedReviews(): Promise<Review[]> {
  const stored = await getStoredReviews();
  return usableReviews([...product.reviews, ...stored]).sort((a, b) => Date.parse(b.date) - Date.parse(a.date));
}

/** Published customer-submitted reviews only. */
export async function getStoredReviews(): Promise<Review[]> {
  if (storeMode() === "none") return [];
  try {
    const all = await listAllReviews();
    return usableReviews(all.filter((r) => r.status === "published").map(toDisplay));
  } catch (error) {
    console.error("[reviews] Could not read reviews; rendering the page without them:", error);
    return [];
  }
}
