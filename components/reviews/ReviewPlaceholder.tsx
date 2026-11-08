import { BrandMark } from "../Icons";

/**
 * Honest empty state: one quiet card with a plain sentence. No stars, names,
 * dates or avatars, so it cannot be mistaken for a review.
 */
export function ReviewPlaceholder() {
  return (
    <div className="mx-auto flex max-w-xl flex-col items-center rounded-[1.5rem] border border-dashed border-gold/25 bg-black/25 px-6 py-10 text-center">
      <BrandMark className="h-12 w-12 text-gold/50" />
      <p className="mt-5 text-lg leading-9 text-ivory/90">ابھی تک کوئی جائزہ دستیاب نہیں۔</p>
    </div>
  );
}
