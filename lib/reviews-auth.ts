import "server-only";
import { createHash, createHmac, timingSafeEqual } from "node:crypto";

export const ADMIN_COOKIE = "eagle_admin";
export const ADMIN_SESSION_SECONDS = 8 * 60 * 60;

/** The owner's password. Unset = the admin is disabled. Never sent to the browser. */
export function adminSecret(): string | null {
  const secret = process.env.ADMIN_SECRET;
  return secret && secret.length > 0 ? secret : null;
}

/** Timing-safe string comparison (both sides are hashed to equal length first). */
export function safeEqual(a: string, b: string): boolean {
  const left = createHash("sha256").update(a).digest();
  const right = createHash("sha256").update(b).digest();
  return timingSafeEqual(left, right);
}

function sign(secret: string, expires: number): string {
  return createHmac("sha256", secret).update(`eagle-admin:${expires}`).digest("hex");
}

/** Session cookie value: "<expiry>.<hmac>". It never contains the secret itself. */
export function createSessionToken(secret: string): string {
  const expires = Date.now() + ADMIN_SESSION_SECONDS * 1000;
  return `${expires}.${sign(secret, expires)}`;
}

export function isValidSession(token: string | undefined | null): boolean {
  const secret = adminSecret();
  if (!secret || !token) return false;
  const [expiresText, signature] = token.split(".");
  const expires = Number(expiresText);
  if (!signature || !Number.isFinite(expires) || expires < Date.now()) return false;
  return safeEqual(signature, sign(secret, expires));
}

/** Salted SHA-256 so raw IP addresses are never stored or logged. */
export function hashVisitor(value: string): string {
  const salt = process.env.REVIEWS_HASH_SALT || process.env.ADMIN_SECRET || "eagle-reviews";
  return createHash("sha256").update(`${salt}|${value}`).digest("hex").slice(0, 32);
}

export function clientIp(headers: Headers): string {
  const forwarded = headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  return forwarded || headers.get("x-real-ip") || "unknown";
}

/** Rejects cross-site POSTs: if a browser sends Origin, it must match our own host. */
export function isSameOrigin(request: Request): boolean {
  const origin = request.headers.get("origin");
  if (!origin) return true;
  try {
    return new URL(origin).host === request.headers.get("host");
  } catch {
    return false;
  }
}
