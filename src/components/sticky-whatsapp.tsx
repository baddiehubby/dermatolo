"use client";

import { useEffect, useState } from "react";
import { copy } from "@/data/copy";
import { site } from "@/data/site";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { useCart } from "@/lib/cart-context";
import { useLanguage } from "@/lib/language";
import { cartOrderMessage, generalEnquiryMessage } from "@/lib/whatsapp";

export function StickyWhatsApp() {
  const { items, isOpen } = useCart();
  const { locale, tx } = useLanguage();
  const [visible, setVisible] = useState(false);
  const message = items.length ? cartOrderMessage(items, locale) : generalEnquiryMessage(locale);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 280);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (isOpen || !visible) return null;

  return (
    <div className="pointer-events-none fixed bottom-[max(1rem,env(safe-area-inset-bottom))] end-4 z-30 md:bottom-6">
      <WhatsAppButton
        message={message}
        className="pointer-events-auto flex h-14 items-center gap-2 rounded-full bg-[#25D366] px-4 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(37,211,102,0.45)]"
      >
        <span className="max-w-[10rem] truncate sm:max-w-none">
          {items.length ? tx(copy.actions.checkout) : site.whatsappDisplay}
        </span>
      </WhatsAppButton>
    </div>
  );
}
