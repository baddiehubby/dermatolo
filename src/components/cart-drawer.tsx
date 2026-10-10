"use client";

import Image from "next/image";
import Link from "next/link";
import { copy } from "@/data/copy";
import { getProduct } from "@/data/products";
import { site } from "@/data/site";
import { QuantitySelector } from "@/components/quantity-selector";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { useCart } from "@/lib/cart-context";
import { formatPKR } from "@/lib/format";
import { useLanguage } from "@/lib/language";
import { cartOrderMessage } from "@/lib/whatsapp";

export function CartDrawer() {
  const { items, isOpen, closeCart, subtotal, setQuantity, removeItem, clearCart } = useCart();
  const { locale, tx } = useLanguage();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60" onClick={closeCart}>
      <aside
        className="absolute inset-y-0 end-0 flex h-full w-full max-w-md flex-col bg-[#111113] text-[#f3eee4] shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-[#f3eee4]/8 px-5 py-4">
          <h2 className="text-lg font-semibold">{tx(copy.cart.title)}</h2>
          <button type="button" onClick={closeCart} className="text-2xl leading-none">
            ×
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 px-8 text-center">
            <p className="text-[#f3eee4]/55">{tx(copy.cart.empty)}</p>
            <Link
              href="/products"
              onClick={closeCart}
              className="rounded-full bg-[#c9a227] px-5 py-2 text-sm font-semibold text-[#070708]"
            >
              {tx(copy.cart.shop)}
            </Link>
          </div>
        ) : (
          <>
            <div className="flex-1 space-y-4 overflow-y-auto px-5 py-4">
              {items.map((item) => {
                const product = getProduct(item.slug);
                const label = product ? tx(product.name) : item.name;
                return (
                <div key={item.key} className="flex gap-3 border-b border-[#f3eee4]/8 pb-4">
                  <Link
                    href={`/products/${item.slug}`}
                    onClick={closeCart}
                    className="relative h-20 w-16 shrink-0 overflow-hidden rounded-xl bg-black"
                  >
                    {item.image ? (
                      <Image src={item.image} alt={label} fill className="object-cover" sizes="64px" />
                    ) : null}
                  </Link>
                  <div className="min-w-0 flex-1">
                    <Link
                      href={`/products/${item.slug}`}
                      onClick={closeCart}
                      className="line-clamp-2 text-sm font-semibold"
                    >
                      {label}
                    </Link>
                    <p className="mt-1 text-sm text-[#c9a227]">{formatPKR(item.price)}</p>
                    <div className="mt-2 flex items-center justify-between">
                      <QuantitySelector
                        value={item.quantity}
                        onChange={(value) => setQuantity(item.key, value)}
                      />
                      <button type="button" className="text-xs text-[#f3eee4]/40" onClick={() => removeItem(item.key)}>
                        {tx(copy.cart.remove)}
                      </button>
                    </div>
                  </div>
                </div>
              );
              })}
              <button type="button" className="text-xs text-[#f3eee4]/40 underline" onClick={clearCart}>
                {tx(copy.cart.clear)}
              </button>
            </div>
            <div className="border-t border-[#f3eee4]/8 p-5">
              <div className="mb-2 flex items-center justify-between text-sm">
                <span>{tx(copy.product.lineTotal)}</span>
                <strong>{formatPKR(subtotal)}</strong>
              </div>
              <p className="mb-4 text-xs leading-5 text-[#f3eee4]/50">{tx(site.deliveryNote)}</p>
              <WhatsAppButton
                message={cartOrderMessage(items, locale)}
                className="flex h-12 items-center justify-center rounded-full bg-[#25D366] text-sm font-semibold text-white"
              >
                {tx(copy.actions.checkout)}
              </WhatsAppButton>
              <p className="mt-3 text-center text-[11px] leading-4 text-[#f3eee4]/40">
                {tx(copy.product.sendNote)}
              </p>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}
