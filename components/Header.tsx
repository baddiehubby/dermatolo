import Link from "next/link";
import { BRAND, navItems, site, waLink } from "@/lib/site";
import { BrandMark } from "./Icons";
import { WhatsAppButton } from "./WhatsAppButton";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-gold/12 bg-ink/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3.5">
        <Link href="/" className="flex min-w-0 items-center gap-3 text-gold">
          <BrandMark className="h-9 w-9 shrink-0 md:h-10 md:w-10" />
          <span className="min-w-0">
            <span className="font-display block text-lg tracking-[0.32em] text-gold-light">
              {BRAND}
            </span>
            <span className="mt-0.5 block truncate text-[0.7rem] tracking-wide text-mist/75">
              {site.tagline}
            </span>
          </span>
        </Link>
        <nav className="hidden items-center gap-8 text-sm text-mist lg:flex" aria-label="Main">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="tracking-wide transition hover:text-gold-light"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <WhatsAppButton
          href={waLink()}
          className="hidden !min-h-11 !px-4 !py-2 text-sm md:inline-flex"
        >
          {site.ctaLabel}
        </WhatsAppButton>
      </div>
      <nav
        className="no-scrollbar flex gap-1 overflow-x-auto border-t border-gold/8 px-3 py-1.5 text-sm text-mist lg:hidden"
        aria-label="Mobile"
      >
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="whitespace-nowrap rounded-sm px-3 py-1.5 hover:bg-gold/10 hover:text-gold-light"
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
