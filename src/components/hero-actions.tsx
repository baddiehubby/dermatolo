"use client";

import Link from "next/link";
import { copy } from "@/data/copy";
import { useLanguage } from "@/lib/language";
import { generalEnquiryMessage, buildWhatsAppUrl } from "@/lib/whatsapp";

export function HeroActions() {
  const { locale, tx } = useLanguage();

  return (
    <div className="mt-7 flex flex-col gap-3 sm:flex-row">
      <Link
        href="/products"
        className="inline-flex h-12 items-center justify-center rounded-full bg-[#c9a227] px-6 text-sm font-semibold text-[#070708]"
      >
        {tx(copy.actions.shop)}
      </Link>
      <Link
        href="/videos"
        className="inline-flex h-12 items-center justify-center rounded-full border border-white/20 px-6 text-sm font-semibold text-[#f3eee4]"
      >
        {tx(copy.actions.watch)}
      </Link>
      <a
        href={buildWhatsAppUrl(generalEnquiryMessage(locale))}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex h-12 items-center justify-center rounded-full bg-[#25D366] px-6 text-sm font-semibold text-white"
      >
        {tx(copy.actions.whatsapp)}
      </a>
    </div>
  );
}
