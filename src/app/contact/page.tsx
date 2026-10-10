import type { Metadata } from "next";
import { copy } from "@/data/copy";
import { site } from "@/data/site";
import { Bilingual } from "@/components/bilingual";
import { HeroActions } from "@/components/hero-actions";

export const metadata: Metadata = {
  title: "Contact",
  description: `Contact KAPTAAN 804 on WhatsApp at ${site.whatsappDisplay}.`,
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <Bilingual
        value={copy.nav.contact}
        className="font-[family-name:var(--font-display)] text-4xl text-[#f3eee4]"
        as="h1"
      />
      <p className="mt-4 text-lg text-[#c9a227]">{site.whatsappDisplay}</p>
      <Bilingual value={copy.sections.ctaBody} className="mt-3 text-sm leading-7 text-[#f3eee4]/65" as="p" />
      <HeroActions />
    </div>
  );
}
