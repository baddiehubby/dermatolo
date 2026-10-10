import type { Review } from "@/lib/types";

/**
 * Add only verified reviews. Keep the original wording and rating.
 *
 * Example:
 * {
 *   id: "google-1",
 *   name: "Approved display name",
 *   quote: { en: "Exact review text", ur: "اصل متن" },
 *   rating: 5,
 *   date: "2026-01-01",
 *   source: "Google",
 * }
 */
export const reviews: Review[] = [];
