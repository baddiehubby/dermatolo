"use client";

import Image from "next/image";
import Link from "next/link";
import { copy } from "@/data/copy";
import { videosForProduct } from "@/data/productVideos";
import { useCart } from "@/lib/cart-context";
import { formatPKR } from "@/lib/format";
import { useLanguage } from "@/lib/language";
import { productOrderMessage } from "@/lib/whatsapp";
import type { Product } from "@/lib/types";
import { WhatsAppButton } from "@/components/whatsapp-button";

export function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();
  const { locale, tx } = useLanguage();
  const image = product.images[0];
  const variant = product.variants[0];
  const hasVideo = videosForProduct(product.slug).length > 0;

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[1.6rem] border border-white/8 bg-[#111113]">
      <Link href={`/products/${product.slug}`} className="relative block aspect-[4/5] overflow-hidden bg-black">
        {image ? (
          <Image
            src={image.src}
            alt={tx(image.alt)}
            fill
            sizes="(max-width: 768px) 50vw, 280px"
            className="object-cover transition duration-500 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="flex h-full items-center justify-center px-6 text-center text-sm text-[#f3eee4]/50">
            {tx(product.name)}
          </div>
        )}
        {hasVideo ? (
          <span className="absolute left-3 top-3 rounded-full bg-[#c9a227] px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-[#070708]">
            {tx(copy.product.hasVideo)}
          </span>
        ) : null}
      </Link>
      <div className="flex flex-1 flex-col gap-3 p-4">
        <div>
          <p className="text-[11px] uppercase tracking-[0.16em] text-[#c9a227]">
            {tx(copy.nav.shop)}
          </p>
          <Link href={`/products/${product.slug}`} className="mt-1 block font-semibold leading-snug text-[#f3eee4]">
            {tx(product.name)}
          </Link>
          <p className="mt-2 text-lg font-bold text-[#c9a227]">{formatPKR(product.price)}</p>
        </div>
        <p className="line-clamp-2 text-sm leading-6 text-[#f3eee4]/60">{tx(product.description)}</p>
        <div className="mt-auto flex flex-col gap-2">
          <Link
            href={`/products/${product.slug}`}
            className="flex h-11 items-center justify-center rounded-full border border-white/15 text-sm font-semibold text-[#f3eee4]"
          >
            {tx(copy.actions.viewProduct)}
          </Link>
          <button
            type="button"
            className="h-11 rounded-full border border-[#c9a227] text-sm font-semibold text-[#c9a227]"
            onClick={() => addItem(product, 1, variant)}
            disabled={!product.available}
          >
            {tx(copy.actions.addCart)}
          </button>
          <WhatsAppButton
            message={productOrderMessage(product, 1, variant, locale)}
            className="flex h-11 items-center justify-center rounded-full bg-[#25D366] text-sm font-semibold text-white"
          >
            {tx(copy.actions.whatsapp)}
          </WhatsAppButton>
        </div>
      </div>
    </article>
  );
}
