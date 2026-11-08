import Image from "next/image";
import type { Review } from "@/lib/product";
import { formatReviewDate, nameInitial } from "@/lib/reviews";
import { BrandMark } from "../Icons";
import { StarRating } from "./StarRating";

function Avatar({ name, avatarUrl }: { name: string; avatarUrl?: string }) {
  const initial = nameInitial(name);
  return (
    <span className="relative flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full border border-gold/40 bg-black/40 text-lg text-gold-light">
      {avatarUrl ? (
        <Image
          src={avatarUrl}
          alt=""
          fill
          sizes="48px"
          className="object-cover"
          unoptimized={/^https?:\/\//.test(avatarUrl)}
        />
      ) : initial ? (
        <span aria-hidden>{initial}</span>
      ) : (
        <BrandMark className="h-7 w-7 text-gold/80" />
      )}
    </span>
  );
}

export function ReviewCard({ review }: { review: Review }) {
  const date = formatReviewDate(review.date);
  return (
    <article className="review-card surface-card flex h-full flex-col rounded-[1.5rem] p-6">
      <div className="flex items-center gap-4">
        <Avatar name={review.name} avatarUrl={review.avatarUrl} />
        <div className="min-w-0">
          <p className="truncate font-semibold text-ivory">
            {review.name}
            {review.city ? <span className="font-normal text-mist/70"> · {review.city}</span> : null}
          </p>
          <StarRating value={review.rating} className="mt-1 h-4" />
        </div>
      </div>
      <p className="mt-5 flex-1 leading-8 text-mist">{review.textUr}</p>
      <div className="mt-5 flex flex-wrap items-center justify-between gap-x-3 gap-y-2 border-t border-gold/15 pt-4 text-sm">
        {date ? (
          <time dateTime={review.date} className="text-mist/80">
            {date}
          </time>
        ) : (
          <span />
        )}
        {review.verifiedPurchase ? (
          <span className="inline-flex items-center gap-1.5 rounded-full border border-gold/40 bg-gold/10 px-3 py-1 text-xs font-medium text-gold-light">
            <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="m5 12.5 4.5 4.5L19 7.5" />
            </svg>
            تصدیق شدہ خرید
          </span>
        ) : null}
      </div>
    </article>
  );
}
