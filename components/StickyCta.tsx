import { formatPkr, hasConfirmedPrice, product } from "@/lib/product";
import { orderUrl } from "@/lib/whatsapp";
import { WhatsAppButton } from "./WhatsAppButton";

export function StickyCta() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-gold/25 bg-ink/95 px-3 pt-3 backdrop-blur md:hidden pb-[max(0.75rem,env(safe-area-inset-bottom))]">
      <WhatsAppButton href={orderUrl()} className="w-full !px-4 whitespace-nowrap">
        واٹس ایپ پر آرڈر کریں
        {hasConfirmedPrice(product.pricePkr) ? (
          <>
            <span className="text-white/70" aria-hidden>
              ·
            </span>
            <bdi dir="ltr" className="font-latin">
              {formatPkr(product.pricePkr)}
            </bdi>
          </>
        ) : null}
      </WhatsAppButton>
    </div>
  );
}
