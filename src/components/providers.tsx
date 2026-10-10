"use client";

import { CartDrawer } from "@/components/cart-drawer";
import { StickyWhatsApp } from "@/components/sticky-whatsapp";
import { CartProvider } from "@/lib/cart-context";
import { LanguageProvider } from "@/lib/language";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <LanguageProvider>
      <CartProvider>
        {children}
        <CartDrawer />
        <StickyWhatsApp />
      </CartProvider>
    </LanguageProvider>
  );
}
