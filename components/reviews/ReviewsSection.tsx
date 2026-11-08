import type { Review } from "@/lib/product";
import { summarizeReviews, toUrduDigits, usableReviews } from "@/lib/reviews";
import { reviewHref } from "@/lib/whatsapp";
import { BrandMark, WhatsAppIcon } from "../Icons";
import { ReviewCard } from "./ReviewCard";
import { ReviewForm } from "./ReviewForm";
import { ReviewPlaceholder } from "./ReviewPlaceholder";
import { StarRating } from "./StarRating";

type ReviewsSectionProps = {
  /** Real customer reviews only (static + submitted). Empty array renders the honest empty state. */
  reviews: readonly Review[];
};

export function ReviewsSection({ reviews }: ReviewsSectionProps) {
  const real = usableReviews(reviews);
  const summary = summarizeReviews(real);

  return (
    <section className="mx-auto max-w-6xl px-4 py-16 md:py-20" aria-labelledby="reviews-heading">
      <div className="reviews-shell reveal relative overflow-hidden rounded-[1.75rem] border border-gold/20 px-4 py-12 sm:px-8 md:px-10 md:py-14">
        <BrandMark className="pointer-events-none absolute -end-10 -top-10 h-56 w-56 text-gold/[0.06] md:h-72 md:w-72" />

        <header className="relative text-center">
          <p className="font-latin text-[0.72rem] font-medium tracking-[0.42em] text-gold">REVIEWS</p>
          <h2 id="reviews-heading" className="font-nastaliq mt-3 text-4xl text-white md:text-5xl">
            صارفین کی آراء
          </h2>
          <p className="mx-auto mt-4 max-w-xl leading-8 text-mist">
            صارفین کے اصل تجربات، انہی کے اپنے الفاظ میں۔
          </p>

          {summary ? (
            <div className="mt-6 inline-flex flex-wrap items-center justify-center gap-x-4 gap-y-2 rounded-full border border-gold/30 bg-black/30 px-6 py-3">
              <span className="font-latin text-2xl font-medium text-gold-light" dir="ltr">
                {summary.average.toFixed(1)}
                <span className="text-base text-mist/70"> / 5</span>
              </span>
              <StarRating value={summary.average} className="h-5" />
              <span className="text-sm text-mist">
                {toUrduDigits(summary.count)} {summary.count === 1 ? "رائے" : "آراء"} کی بنیاد پر
              </span>
            </div>
          ) : null}
        </header>

        <div className="relative mt-10">
          {summary ? (
            <div
              role="region"
              aria-label="صارفین کی آراء، افقی طور پر سوائپ کریں"
              tabIndex={0}
              className="review-track no-scrollbar"
            >
              {real.map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))}
            </div>
          ) : (
            <ReviewPlaceholder />
          )}
        </div>

        <div className="relative mt-10 flex flex-col items-center gap-3 text-center sm:flex-row sm:justify-center sm:gap-4">
          <a
            href="#review-form"
            className="inline-flex min-h-14 w-full items-center justify-center rounded-full bg-gradient-to-b from-gold-light to-gold px-8 py-3.5 text-base font-semibold text-ink shadow-gold touch-manipulation focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-light sm:w-auto"
          >
            آپ بھی اپنی رائے دیں
          </a>
          <a
            href={reviewHref()}
            target="_blank"
            rel="noopener noreferrer"
            className="ghost-btn w-full gap-2 sm:w-auto"
          >
            <WhatsAppIcon />
            واٹس ایپ پر رائے بھیجیں
          </a>
        </div>

        <div id="review-form" className="relative mx-auto mt-10 max-w-2xl scroll-mt-28">
          <ReviewForm />
          <noscript>
            <p className="mt-4 text-center text-sm leading-7 text-mist">
              رائے کا فارم استعمال کرنے کے لیے جاوا اسکرپٹ درکار ہے۔ آپ واٹس ایپ کے ذریعے بھی رائے بھیج سکتے ہیں۔
            </p>
          </noscript>
          <p className="mt-4 text-center text-xs leading-6 text-mist/70">
            فارم سے جمع کرائی گئی رائے فوراً شائع ہو جاتی ہے۔ واٹس ایپ کے ذریعے رائے بھیجنے پر وہ آپ کی اجازت کے بعد ہی شائع ہو گی۔
          </p>
        </div>
      </div>
    </section>
  );
}
