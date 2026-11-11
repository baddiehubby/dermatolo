import type { Review } from "@/lib/product";
import { PRODUCT_NAME, testimonials } from "@/lib/site";
import { summarizeReviews, usableReviews } from "@/lib/reviews";
import { reviewHref } from "@/lib/whatsapp";
import { BrandMark } from "../Icons";
import { WhatsAppButton } from "../WhatsAppButton";
import { ReviewCard } from "./ReviewCard";
import { ReviewForm } from "./ReviewForm";
import { ReviewPlaceholder } from "./ReviewPlaceholder";
import { StarRating } from "./StarRating";
import { TestimonialCard } from "./TestimonialCard";

type ReviewsSectionProps = {
  /** Real published (moderated) reviews only. Star average uses these alone. */
  reviews: readonly Review[];
  /** When true, skip the write-a-review form (e.g. compact homepage teaser). */
  showForm?: boolean;
};

export function ReviewsSection({ reviews, showForm = true }: ReviewsSectionProps) {
  const real = usableReviews(reviews);
  const summary = summarizeReviews(real);
  const hasTestimonials = testimonials.length > 0;
  const hasContent = hasTestimonials || Boolean(summary);

  return (
    <section
      id="reviews"
      className="mx-auto max-w-6xl scroll-mt-28 px-4 py-16 md:py-24"
      aria-labelledby="reviews-heading"
    >
      <div className="reviews-shell reveal relative overflow-hidden border border-gold/20 bg-ink-100/60 px-4 py-12 sm:px-8 md:px-10 md:py-14">
        <BrandMark className="pointer-events-none absolute -end-10 -top-10 h-56 w-56 text-gold/[0.06] md:h-72 md:w-72" />

        <header className="relative text-center">
          <p className="text-[0.72rem] font-medium tracking-[0.42em] text-gold uppercase">Reviews</p>
          <h2 id="reviews-heading" className="font-display mt-3 text-3xl text-ivory md:text-5xl">
            What customers say
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-mist md:text-base">
            {summary
              ? "Customer feedback shared by the brand for publication, plus moderated storefront reviews. New submissions stay pending until approved."
              : "Customer feedback shared by the brand for publication. New submissions stay pending until approved."}
          </p>

          {summary ? (
            <div className="mt-6 inline-flex flex-wrap items-center justify-center gap-x-4 gap-y-2 border border-gold/30 bg-black/30 px-6 py-3">
              <span className="font-display text-2xl font-medium text-gold-light" dir="ltr">
                {summary.average.toFixed(1)}
                <span className="text-base text-mist/70"> / 5</span>
              </span>
              <StarRating value={summary.average} className="h-5" />
              <span className="text-sm text-mist">
                Based on {summary.count} {summary.count === 1 ? "review" : "reviews"}
              </span>
            </div>
          ) : null}
        </header>

        <div className="relative mt-10">
          {hasContent ? (
            <div
              role="region"
              aria-label="Customer reviews, swipe horizontally"
              tabIndex={0}
              className="review-track no-scrollbar"
            >
              {testimonials.map((item) => (
                <TestimonialCard key={item.id} name={item.name} quote={item.quote} />
              ))}
              {real.map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))}
            </div>
          ) : (
            <ReviewPlaceholder />
          )}
        </div>

        <div className="relative mt-10 flex flex-col items-center gap-3 text-center sm:flex-row sm:justify-center sm:gap-4">
          {showForm ? (
            <a href="#review-form" className="ghost-btn w-full !min-h-12 sm:w-auto">
              Write a review
            </a>
          ) : (
            <a href="/reviews#review-form" className="ghost-btn w-full !min-h-12 sm:w-auto">
              Write a review
            </a>
          )}
          <WhatsAppButton
            href={reviewHref()}
            message={`Hi, I want to share feedback about ${PRODUCT_NAME}.`}
            variant="ghost"
            className="w-full !min-h-12 sm:w-auto"
          >
            Share via WhatsApp
          </WhatsAppButton>
        </div>

        {showForm ? (
          <div id="review-form" className="relative mx-auto mt-10 max-w-2xl scroll-mt-28">
            <ReviewForm />
            <p className="mt-4 text-center text-xs leading-6 text-mist/70">
              Submitted reviews stay pending until approved. Average and star counts only use published
              moderated reviews — not quote testimonials.
            </p>
          </div>
        ) : null}
      </div>
    </section>
  );
}
