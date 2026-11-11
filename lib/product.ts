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
  /** THIS brief: reviews require moderation before publication. */
  autoPublish: false,
};

/**
 * Owner-curated published reviews with star ratings.
 * Marketing testimonials without ratings live in `testimonials` (lib/site.ts) —
 * do not invent AggregateRating averages from those quotes.
 */
export const product = {
  reviews: [] as Review[],
};
