import Link from "next/link";
import { BOTTLE_ML, BRAND, formatPrice, navItems, site } from "@/lib/site";
import { orderWhatsAppUrl } from "@/lib/whatsapp";
import { BrandMark } from "./Icons";

export function Footer() {
  const orderHref = orderWhatsAppUrl({ quantity: 1 });
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
          <a
            href={orderHref}
            target="_blank"
            rel="noopener noreferrer"
            className="block text-gold-light hover:underline"
          >
            {site.ctaLabel}
          </a>
          <a
            href={orderHref}
            target="_blank"
            rel="noopener noreferrer"
            className="block tabular-nums hover:text-gold-light"
          >
            WhatsApp {site.whatsappDisplay}
          </a>
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
