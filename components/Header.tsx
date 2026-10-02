import Link from "next/link";
import { navItems } from "@/lib/content";
import { contact, product } from "@/lib/product";
import { orderUrl } from "@/lib/whatsapp";
import { BrandMark } from "./Icons";
import { WhatsAppButton } from "./WhatsAppButton";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-gold/15 bg-ink/92 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-2.5 md:py-3">
        <Link href="/#home" className="flex min-w-0 items-center gap-3 text-gold">
          <BrandMark className="h-11 w-11 shrink-0" />
          <span className="min-w-0">
            <span className="font-latin block text-[0.72rem] font-medium tracking-[0.32em] text-gold-light">
              EAGLE
            </span>
            <span className="mt-0.5 block truncate text-xs text-mist/85">{product.nameUrdu}</span>
          </span>
        </Link>
        <nav className="hidden items-center gap-6 text-sm text-mist lg:flex" aria-label="اہم حصے">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="transition hover:text-gold-light">
              {item.label}
            </Link>
          ))}
        </nav>
        <WhatsAppButton href={orderUrl()} className="hidden !min-h-11 !px-4 !py-2 text-sm md:inline-flex">
          آرڈر کریں
        </WhatsAppButton>
      </div>
      <nav
        className="no-scrollbar flex gap-1 overflow-x-auto border-t border-gold/10 px-3 py-1.5 text-sm text-mist lg:hidden"
        aria-label="موبائل نیویگیشن"
      >
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="whitespace-nowrap rounded-full px-3 py-1.5 hover:bg-gold/10 hover:text-gold-light"
          >
            {item.label}
          </Link>
        ))}
      </nav>
      <span className="sr-only">
        WhatsApp <span dir="ltr">{contact.phoneDisplay}</span>
      </span>
    </header>
  );
}
