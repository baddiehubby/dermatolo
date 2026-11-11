import { BrandMark } from "../Icons";
import { nameInitial } from "@/lib/reviews";

type TestimonialCardProps = {
  name: string;
  quote: string;
};

/**
 * Quote-led editorial card for owner-attributed customer feedback.
 * No stars, photos, or Verified Purchase — typography carries the weight.
 */
export function TestimonialCard({ name, quote }: TestimonialCardProps) {
  const initial = nameInitial(name);

  return (
    <article className="review-card surface-card flex h-full flex-col border border-gold/20 bg-ink-100/80 p-6 md:p-8">
      <BrandMark className="h-8 w-8 text-gold/35" />
      <blockquote className="mt-6 flex-1">
        <p className="font-display text-2xl leading-snug text-ivory md:text-[1.65rem] md:leading-snug">
          “{quote}”
        </p>
      </blockquote>
      <footer className="mt-8 flex items-center gap-3 border-t border-gold/15 pt-5">
        <span
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-gold/35 bg-black/40 text-sm text-gold-light"
          aria-hidden
        >
          {initial || "·"}
        </span>
        <div className="min-w-0">
          <p className="truncate font-medium tracking-wide text-ivory">{name}</p>
          <p className="mt-0.5 text-xs tracking-[0.18em] text-mist/65 uppercase">Customer</p>
        </div>
      </footer>
    </article>
  );
}
