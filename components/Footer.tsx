import Link from "next/link";
import { BOTTLE_ML, BRAND, formatPrice, navItems, site } from "@/lib/site";
import { buildOrderMessage, orderWhatsAppUrl } from "@/lib/whatsapp";
import { BrandMark } from "./Icons";
import { WhatsAppButton } from "./WhatsAppButton";

export function Footer() {
  const orderHref = orderWhatsAppUrl({ quantity: 1 });
  const orderMessage = buildOrderMessage({ quantity: 1 });
  return (
    <footer className="border-t border-gold/20 bg-[#080807] pb-28 pt-16 md:pb-16">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 md:grid-cols-3">
        <div>
          <BrandMark className="h-11 w-11 text-gold" />
          <p className="font-display mt-5 text-xl tracking-[0.32em] text-gold">{BRAND}</p>
          <p className="mt-2 text-mist">{site.tagline}</p>
          <p className="mt-5 text-sm text-mist/80">
            {BOTTLE_ML} ml · {formatPrice()} · {site.delivery}
          </p>
        </div>
        <div className="space-y-2.5 text-mist">
          <p className="mb-3 text-xs tracking-[0.28em] text-gold/80 uppercase">Explore</p>
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="block hover:text-gold-light">
              {item.label}
            </Link>
          ))}
        </div>
        <div className="space-y-3 text-mist">
          <p className="mb-3 text-xs tracking-[0.28em] text-gold/80 uppercase">Order</p>
          <Link href="/shop" className="block text-gold-light hover:underline">
            {site.shopCtaLabel}
          </Link>
          <WhatsAppButton
            href={orderHref}
            message={orderMessage}
            showIcon={false}
            variant="ghost"
            className="!block !min-h-0 !justify-start !border-0 !bg-transparent !p-0 !shadow-none text-gold-light hover:underline"
          >
            {site.ctaLabel}
          </WhatsAppButton>
          <WhatsAppButton
            href={orderHref}
            message={orderMessage}
            showIcon={false}
            variant="ghost"
            className="!block !min-h-0 !justify-start !border-0 !bg-transparent !p-0 !shadow-none tabular-nums hover:text-gold-light hover:underline"
          >
            WhatsApp {site.whatsappDisplay}
          </WhatsAppButton>
          <Link href="/privacy" className="block hover:text-gold-light">
            Privacy
          </Link>
          <Link href="/terms" className="block hover:text-gold-light">
            Terms
          </Link>
          <p className="pt-3 text-sm text-mist/65">
            WhatsApp orders only. No card checkout on this site. {site.delivery}.
          </p>
        </div>
      </div>
      <div className="mx-auto mt-14 max-w-6xl border-t border-gold/10 px-4 pt-6">
        <p className="text-xs text-mist/50">
          © {new Date().getFullYear()} {BRAND}. Luxury unisex perfume · Pakistan · kaptaan804.com
        </p>
      </div>
    </footer>
  );
}
