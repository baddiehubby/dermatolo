"use client";

import Link from "next/link";
import { copy } from "@/data/copy";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { useLanguage } from "@/lib/language";
import { generalEnquiryMessage } from "@/lib/whatsapp";

export function HeroActions() {
  const { locale, tx } = useLanguage();

  return (
    <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-start">
      <Link
        href="/products"
        className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#c9a227] px-6 py-3 text-center text-sm font-semibold text-[#070708]"
      >
        {tx(copy.hero.cta)}
      </Link>
      <Link
        href="/products"
        className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#f3eee4]/20 px-6 py-3 text-center text-sm font-semibold text-[#f3eee4]"
      >
        {tx(copy.hero.explore)}
      </Link>
      <WhatsAppButton
        message={generalEnquiryMessage(locale)}
        className="inline-flex h-12 items-center justify-center rounded-full bg-[#25D366] px-6 text-sm font-semibold text-white"
      >
        {tx(copy.actions.whatsapp)}
      </WhatsAppButton>
    </div>
  );
}
