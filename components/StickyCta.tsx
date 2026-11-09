import Link from "next/link";
import { BOTTLE_ML, formatPrice, site } from "@/lib/site";
import { orderWhatsAppUrl } from "@/lib/whatsapp";
import { WhatsAppButton } from "./WhatsAppButton";

export function StickyCta() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-gold/20 bg-ink/96 px-3 pt-2.5 shadow-[0_-8px_32px_rgba(0,0,0,0.45)] backdrop-blur-md md:hidden pb-[max(0.75rem,env(safe-area-inset-bottom))]">
      <div className="flex gap-2">
        <Link href="/shop" className="ghost-btn !min-h-12 flex-1 !px-3 text-sm whitespace-nowrap">
          {site.shopCtaLabel}
        </Link>
        <WhatsAppButton href={orderWhatsAppUrl({ quantity: 1 })} className="!min-h-12 flex-[1.4] !px-3 text-sm whitespace-nowrap">
          Order · {formatPrice()}
          <span className="sr-only">
            {BOTTLE_ML} ml, {site.delivery}
          </span>
        </WhatsAppButton>
      </div>
    </div>
  );
}
