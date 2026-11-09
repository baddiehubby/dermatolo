import { site, waLink } from "@/lib/site";
import { WhatsAppIcon } from "./Icons";

/** Persistent floating WhatsApp affordance (desktop + mobile above sticky bar). */
export function FloatingWhatsApp() {
  return (
    <a
      href={waLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${site.ctaLabel} — WhatsApp ${site.whatsappDisplay}`}
      className="fixed bottom-[5.25rem] end-4 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25d366] text-white shadow-[0_12px_28px_rgba(37,211,102,0.35)] transition hover:scale-105 hover:bg-[#1ebe5d] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#25d366] md:bottom-8 md:end-8 md:h-16 md:w-16"
    >
      <WhatsAppIcon className="h-7 w-7" />
    </a>
  );
}
