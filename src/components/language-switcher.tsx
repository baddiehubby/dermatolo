"use client";

import { copy } from "@/data/copy";
import { useLanguage } from "@/lib/language";

export function LanguageSwitcher() {
  const { locale, setLocale } = useLanguage();

  return (
    <div className="flex items-center rounded-full border border-[#f3eee4]/15 p-0.5 text-[11px] font-semibold uppercase tracking-[0.14em]">
      <button
        type="button"
        onClick={() => setLocale("en")}
        className={`rounded-full px-2.5 py-1 ${
          locale === "en" ? "bg-[#c9a227] text-[#070708]" : "text-[#f3eee4]/70"
        }`}
        aria-pressed={locale === "en"}
      >
        {copy.lang.en}
      </button>
      <button
        type="button"
        onClick={() => setLocale("ur")}
        className={`rounded-full px-2.5 py-1 ${
          locale === "ur" ? "bg-[#c9a227] text-[#070708]" : "text-[#f3eee4]/70"
        }`}
        aria-pressed={locale === "ur"}
      >
        {copy.lang.ur}
      </button>
    </div>
  );
}
