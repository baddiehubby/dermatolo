/**
 * Review types + settings kept for /api/reviews and /admin/reviews.
 * Storefront brand/price/WhatsApp live in lib/site.ts — edit that file only.
 */

export type Review = {
  id: string;
  name: string;
  rating: number;
  textUr: string;
  date: string;
  verifiedPurchase: boolean;
  avatarUrl?: string;
  city?: string;
};

export type CustomerReview = Review;

export const reviewSettings = {
  maxTotal: 1000,
  minSecondsToSubmit: 2,
  perHour: 3,
  perDay: 10,
  revalidateSeconds: 60,
};

/** Owner-curated reviews (empty until real ones exist). Used by reviews-store. */
export const product = {
  reviews: [] as Review[],
};
