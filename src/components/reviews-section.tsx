"use client";

import { copy } from "@/data/copy";
import { reviews } from "@/data/reviews";
import { site } from "@/data/site";
import { useLanguage } from "@/lib/language";

export function ReviewsSection() {
  const { tx } = useLanguage();

  if (reviews.length === 0) return null;

  return (
    <section className="mx-auto max-w-6xl px-4 py-16">
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#c9a227]">{site.name}</p>
      <h2 className="mt-2 font-[family-name:var(--font-display)] text-3xl text-[#f3eee4] md:text-4xl">
        {tx(copy.sections.reviews)}
      </h2>
      <div className="mt-8 grid gap-4 md:grid-cols-3">
          {reviews.map((review) => (
            <article key={review.id} className="rounded-[1.6rem] border border-[#f3eee4]/8 bg-[#111113] p-5">
              <p className="text-[#c9a227]" aria-label={`${review.rating} stars`}>
                {"★".repeat(review.rating)}
                {"☆".repeat(5 - review.rating)}
              </p>
              <p className="mt-3 text-sm leading-7 text-[#f3eee4]/80">“{tx(review.quote)}”</p>
              <p className="mt-4 text-sm font-semibold text-[#f3eee4]">{review.name}</p>
              {review.source || review.date ? (
                <p className="mt-1 text-xs text-[#f3eee4]/45">
                  {[review.source, review.date].filter(Boolean).join(" · ")}
                </p>
              ) : null}
            </article>
          ))}
        </div>
    </section>
  );
}
