"use client";

import { useMemo, useState } from "react";
import { copy } from "@/data/copy";
import { useCart } from "@/lib/cart-context";
import { formatPKR } from "@/lib/format";
import { useLanguage } from "@/lib/language";
import { productOrderMessage } from "@/lib/whatsapp";
import type { Product } from "@/lib/types";
import { QuantitySelector } from "@/components/quantity-selector";
import { WhatsAppButton } from "@/components/whatsapp-button";

export function ProductActions({ product }: { product: Product }) {
  const { addItem } = useCart();
  const { locale, tx } = useLanguage();
  const [variantId, setVariantId] = useState(product.variants[0]?.id ?? "");
  const [quantity, setQuantity] = useState(1);
  const variant = useMemo(
    () => product.variants.find((item) => item.id === variantId) ?? product.variants[0],
    [product.variants, variantId],
  );
  const price = variant?.price ?? product.price;
  const available = variant?.available ?? product.available;

  return (
    <div className="space-y-5">
      <div>
        <p className="text-3xl font-bold text-[#c9a227]">{formatPKR(price)}</p>
        <p className="mt-1 text-sm text-[#f3eee4]/55">
          {available ? tx(copy.product.available) : tx(copy.product.unavailable)}
        </p>
      </div>

      {product.variants.length > 1 ? (
        <fieldset>
          <legend className="mb-2 text-sm font-semibold">{tx(copy.product.option)}</legend>
          <div className="flex flex-wrap gap-2">
            {product.variants.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setVariantId(item.id)}
                className={`rounded-full border px-4 py-2 text-sm ${
                  item.id === variant?.id
                    ? "border-[#c9a227] bg-[#c9a227] text-[#070708]"
                    : "border-white/15"
                }`}
              >
                {tx(item.title)} · {formatPKR(item.price)}
              </button>
            ))}
          </div>
        </fieldset>
      ) : null}

      <div>
        <p className="mb-2 text-sm font-semibold">{tx(copy.product.quantity)}</p>
        <QuantitySelector value={quantity} onChange={setQuantity} />
      </div>

      <p className="text-sm text-[#f3eee4]/70">
        {tx(copy.product.lineTotal)}: <strong>{formatPKR(price * quantity)}</strong>
      </p>

      <div className="grid gap-3 sm:grid-cols-2">
        <button
          type="button"
          disabled={!available}
          onClick={() => addItem(product, quantity, variant)}
          className="h-12 rounded-full border border-[#c9a227] font-semibold text-[#c9a227] disabled:opacity-50"
        >
          {tx(copy.actions.addCart)}
        </button>
        <WhatsAppButton
          message={productOrderMessage(product, quantity, variant, locale)}
          className="flex h-12 items-center justify-center rounded-full bg-[#25D366] font-semibold text-white"
        >
          {tx(copy.actions.buyNow)}
        </WhatsAppButton>
      </div>
      <p className="text-xs leading-5 text-[#f3eee4]/50">{tx(copy.product.sendNote)}</p>
    </div>
  );
}
