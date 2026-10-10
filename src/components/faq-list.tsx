"use client";

import { useState } from "react";
import { faqs as defaultFaqs } from "@/data/faqs";
import { useLanguage } from "@/lib/language";
import type { Localized } from "@/lib/types";

export function FaqList({
  items = defaultFaqs,
}: {
  items?: readonly { question: Localized; answer: Localized }[];
}) {
  const { tx } = useLanguage();
  const [open, setOpen] = useState(0);

  return (
    <div className="divide-y divide-white/8 rounded-[1.6rem] border border-[#f3eee4]/8 bg-[#111113]">
      {items.map((faq, index) => {
        const isOpen = open === index;
        return (
          <div key={faq.question.en} className="px-5">
            <button
              type="button"
              className="flex w-full items-center justify-between gap-4 py-4 text-start font-semibold text-[#f3eee4]"
              aria-expanded={isOpen}
              onClick={() => setOpen(isOpen ? -1 : index)}
            >
              {tx(faq.question)}
              <span className="text-xl">{isOpen ? "−" : "+"}</span>
            </button>
            {isOpen ? <p className="pb-5 text-sm leading-7 text-[#f3eee4]/65">{tx(faq.answer)}</p> : null}
          </div>
        );
      })}
    </div>
  );
}
