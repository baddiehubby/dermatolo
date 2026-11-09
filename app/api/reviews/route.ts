import { randomUUID } from "node:crypto";
import { revalidatePath } from "next/cache";
import { json, readJsonLimited } from "@/lib/http";
import { reviewSettings } from "@/lib/product";
import { checkReviewInput, normalizeForDuplicate, reviewMessages } from "@/lib/reviews";
import { clientIp, hashVisitor, isSameOrigin } from "@/lib/reviews-auth";
import { createReview, hitRateLimit, listAllReviews, storeMode, type StoredReview } from "@/lib/reviews-store";

export const dynamic = "force-dynamic";

const MAX_BODY_BYTES = 4096;

/**
 * Public submission endpoint. Same-origin only.
 * Reviews are stored as pending until approved in /admin/reviews (autoPublish: false).
 */
export async function POST(request: Request) {
  if (!isSameOrigin(request)) {
    return json({ ok: false, message: reviewMessages.generic }, 403);
  }
  if (storeMode() === "none") {
    const detail =
      process.env.NODE_ENV !== "production" ? "No review store: set Redis env vars or unset REVIEWS_STORE=off" : undefined;
    return json({ ok: false, message: reviewMessages.unavailable, ...(detail ? { detail } : {}) }, 503);
  }

  const body = await readJsonLimited(request, MAX_BODY_BYTES);
  if (!body || typeof body !== "object") {
    return json({ ok: false, message: reviewMessages.invalid }, 400);
  }
  const input = body as Record<string, unknown>;

  if (typeof input.website === "string" && input.website.trim() !== "") {
    return json({ ok: true, message: reviewMessages.success });
  }

  const startedAt = Number(input.startedAt);
  const elapsed = Date.now() - startedAt;
  if (!Number.isFinite(startedAt) || elapsed < reviewSettings.minSecondsToSubmit * 1000 || elapsed > 7 * 86_400_000) {
    return json({ ok: false, message: reviewMessages.tooFast }, 400);
  }

  const checked = checkReviewInput(input);
  if (!checked.ok) {
    return json({ ok: false, field: checked.field, message: checked.message }, 400);
  }

  try {
    const visitor = hashVisitor(clientIp(request.headers));
    const hourOk = await hitRateLimit(`submit:h:${visitor}`, 3600, reviewSettings.perHour);
    const dayOk = await hitRateLimit(`submit:d:${visitor}`, 86_400, reviewSettings.perDay);
    if (!hourOk || !dayOk) {
      return json({ ok: false, message: reviewMessages.rateLimited }, 429);
    }

    const existing = await listAllReviews();
    if (existing.length >= reviewSettings.maxTotal) {
      return json({ ok: false, message: reviewMessages.full }, 503);
    }

    const { name, rating, text, city } = checked.value;
    const fresh = await hitRateLimit(`dup:${hashVisitor(`${clientIp(request.headers)}|${normalizeForDuplicate(text)}`)}`, 86_400, 1);
    if (!fresh) {
      return json({ ok: false, field: "text", message: reviewMessages.duplicate }, 409);
    }

    const record: StoredReview = {
      id: randomUUID(),
      name,
      rating,
      textUr: text,
      city,
      createdAt: new Date().toISOString(),
      verifiedPurchase: false,
      status: reviewSettings.autoPublish ? "published" : "pending",
    };
    await createReview(record);

    revalidatePath("/");
    revalidatePath("/shop");
    return json({ ok: true, message: reviewMessages.success });
  } catch (error) {
    console.error("[reviews] Saving a review failed:", error);
    const detail =
      process.env.NODE_ENV !== "production" && error instanceof Error ? error.message.slice(0, 200) : undefined;
    return json({ ok: false, message: reviewMessages.generic, ...(detail ? { detail } : {}) }, 500);
  }
}
