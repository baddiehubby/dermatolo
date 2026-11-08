import { formatPrice, site, waLink } from "@/lib/site";
import { WhatsAppButton } from "./WhatsAppButton";

export function StickyCta() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-gold/20 bg-ink/96 px-3 pt-2.5 shadow-[0_-8px_32px_rgba(0,0,0,0.45)] backdrop-blur-md md:hidden pb-[max(0.75rem,env(safe-area-inset-bottom))]">
      <WhatsAppButton href={waLink()} className="w-full !px-4 whitespace-nowrap">
        {site.ctaLabel}
        <span className="text-white/70" aria-hidden>
          ·
        </span>
        <span className="font-sans tabular-nums">{formatPrice()}</span>
      </WhatsAppButton>
    </div>
  );
}
