"use client";

import { site } from "@/lib/site";
import { buildOrderMessage, orderWhatsAppUrl } from "@/lib/whatsapp";
import { WhatsAppButton } from "./WhatsAppButton";

/** Persistent floating WhatsApp affordance (desktop + mobile above sticky bar). */
export function FloatingWhatsApp() {
  const href = orderWhatsAppUrl({ quantity: 1 });
  const message = buildOrderMessage({ quantity: 1 });

  return (
    <WhatsAppButton
      href={href}
      message={message}
      aria-label={`${site.ctaLabel} — WhatsApp ${site.whatsappDisplay}`}
      className="!fixed bottom-[5.25rem] end-4 z-50 !flex h-14 w-14 !min-h-0 !items-center !justify-center !rounded-full !px-0 !py-0 shadow-[0_12px_28px_rgba(37,211,102,0.35)] transition hover:scale-105 hover:bg-[#1ebe5d] md:bottom-8 md:end-8 md:h-16 md:w-16 [&>svg]:h-7 [&>svg]:w-7"
    >
      <span className="sr-only">{site.ctaLabel}</span>
    </WhatsAppButton>
  );
}
