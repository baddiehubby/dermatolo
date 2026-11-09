import { BrandMark } from "../Icons";

/**
 * Honest empty / ready state — no fake stars, names, or invented testimonials.
 */
export function ReviewPlaceholder() {
  return (
    <div className="mx-auto flex max-w-xl flex-col items-center border border-dashed border-gold/25 bg-black/25 px-6 py-12 text-center">
      <BrandMark className="h-12 w-12 text-gold/50" />
      <p className="font-display mt-5 text-2xl text-ivory">Reviews coming soon</p>
      <p className="mt-3 max-w-sm text-sm leading-relaxed text-mist">
        Be the first to share your experience with MONEY. Your review will appear after moderation.
      </p>
    </div>
  );
}
