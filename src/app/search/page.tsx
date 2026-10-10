import type { Metadata } from "next";
import { Suspense } from "react";
import { SearchResults } from "@/components/search-results";

export const metadata: Metadata = {
  title: "Search",
  robots: { index: false, follow: true },
};

export default function SearchPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="font-[family-name:var(--font-display)] text-4xl text-[#f3eee4]">
        <span className="ltr-only">Search</span>
        <span className="rtl-only">تلاش</span>
      </h1>
      <Suspense fallback={<p className="mt-6 text-[#f3eee4]/50">…</p>}>
        <SearchResults />
      </Suspense>
    </div>
  );
}
