"use client";

import Link from "next/link";
import { useState } from "react";
import { copy } from "@/data/copy";
import { navLinks } from "@/data/site";
import { BrandLockup } from "@/components/brand-mark";
import { LanguageSwitcher } from "@/components/language-switcher";
import { SearchDialog } from "@/components/search-dialog";
import { useCart } from "@/lib/cart-context";
import { useLanguage } from "@/lib/language";
import { buildWhatsAppUrl, generalEnquiryMessage } from "@/lib/whatsapp";

export function Header() {
  const { count, openCart } = useCart();
  const { tx, locale } = useLanguage();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-[#f3eee4]/8 bg-[#070708]/90 backdrop-blur-md">
      <div className="mx-auto flex h-[76px] max-w-6xl items-center justify-between gap-3 px-4">
        <button
          type="button"
          className="flex h-11 w-11 items-center justify-center rounded-full text-[#f3eee4] md:hidden"
          aria-label={tx(copy.actions.menu)}
          onClick={() => setMenuOpen(true)}
        >
          <div className="space-y-1.5">
            <span className="block h-0.5 w-5 bg-current" />
            <span className="block h-0.5 w-5 bg-current" />
            <span className="block h-0.5 w-5 bg-current" />
          </div>
        </button>

        <Link href="/" className="mx-auto md:mx-0">
          <BrandLockup compact />
        </Link>

        <nav className="hidden items-center gap-6 text-sm font-medium text-[#f3eee4] md:flex">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-[#c9a227]">
              {tx(copy.nav[link.key])}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={buildWhatsAppUrl(generalEnquiryMessage(locale))}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden h-11 items-center rounded-full bg-[#25D366] px-4 text-sm font-semibold text-white lg:inline-flex"
          >
            {tx(copy.actions.whatsapp)}
          </a>
          <LanguageSwitcher />
          <button
            type="button"
            className="flex h-11 w-11 items-center justify-center rounded-full text-[#f3eee4]"
            aria-label={tx(copy.actions.search)}
            onClick={() => setSearchOpen(true)}
          >
            <SearchIcon />
          </button>
          <button
            type="button"
            className="relative flex h-11 w-11 items-center justify-center rounded-full text-[#f3eee4]"
            aria-label={tx(copy.actions.cart)}
            onClick={openCart}
          >
            <CartIcon />
            <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#c9a227] px-1 text-[11px] font-bold text-[#070708]">
              {count}
            </span>
          </button>
        </div>
      </div>

      {menuOpen ? (
        <div className="fixed inset-0 z-50 bg-black/60 md:hidden" onClick={() => setMenuOpen(false)}>
          <div
            className="absolute inset-y-0 start-0 flex h-full w-[86%] max-w-sm flex-col bg-[#111113] p-6 text-[#f3eee4]"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mb-8 flex items-center justify-between">
              <BrandLockup compact />
              <button type="button" onClick={() => setMenuOpen(false)} className="text-3xl leading-none">
                ×
              </button>
            </div>
            <LanguageSwitcher />
            <a
              href={buildWhatsAppUrl(generalEnquiryMessage(locale))}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex h-12 items-center justify-center rounded-full bg-[#25D366] px-4 text-sm font-semibold text-white"
            >
              {tx(copy.actions.whatsapp)}
            </a>
            <div className="mt-8 grid gap-4 text-lg font-semibold">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href} onClick={() => setMenuOpen(false)}>
                  {tx(copy.nav[link.key])}
                </Link>
              ))}
            </div>
          </div>
        </div>
      ) : null}

      <SearchDialog open={searchOpen} onClose={() => setSearchOpen(false)} />
    </header>
  );
}

function SearchIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.8" />
      <path d="M16.5 16.5 21 21" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function CartIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M6 6h15l-1.5 9h-12L5 3H2"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="9" cy="20" r="1.4" fill="currentColor" />
      <circle cx="18" cy="20" r="1.4" fill="currentColor" />
    </svg>
  );
}
