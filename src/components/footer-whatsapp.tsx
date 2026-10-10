"use client";

import { copy } from "@/data/copy";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { useLanguage } from "@/lib/language";
import { generalEnquiryMessage } from "@/lib/whatsapp";

export function FooterWhatsApp() {
  const { locale, tx } = useLanguage();

  return (
    <WhatsAppButton
      message={generalEnquiryMessage(locale)}
      className="inline-flex rounded-full bg-[#25D366] px-4 py-2 text-sm font-semibold text-white"
    >
      {tx(copy.actions.message)}
    </WhatsAppButton>
  );
}
