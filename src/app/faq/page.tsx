import type { Metadata } from "next";
import { copy } from "@/data/copy";
import { faqs } from "@/data/faqs";
import { Bilingual } from "@/components/bilingual";
import { FaqList } from "@/components/faq-list";

export const metadata: Metadata = {
  title: "FAQ",
  description: "KAPTAAN 804 ordering, delivery, and product questions.",
  alternates: { canonical: "/faq" },
};

export default function FaqPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <Bilingual
        value={copy.sections.faq}
        className="font-[family-name:var(--font-display)] text-4xl text-[#f3eee4]"
        as="h1"
      />
      <div className="mt-8">
        <FaqList items={faqs} />
      </div>
    </div>
  );
}
