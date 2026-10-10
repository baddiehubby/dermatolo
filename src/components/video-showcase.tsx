"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { copy } from "@/data/copy";
import { getProduct } from "@/data/products";
import { configuredVideos, featuredVideos } from "@/data/productVideos";
import { site } from "@/data/site";
import { TikTokEmbed } from "@/components/tiktok-embed";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { formatPKR } from "@/lib/format";
import { useLanguage } from "@/lib/language";
import { extractTikTokId } from "@/lib/tiktok";
import { productOrderMessage } from "@/lib/whatsapp";

export function VideoShowcase({
  compact = false,
  productSlug,
}: {
  compact?: boolean;
  productSlug?: string;
}) {
  const { locale, tx } = useLanguage();
  const items = useMemo(() => {
    const source = productSlug
      ? configuredVideos().filter((video) => video.productSlug === productSlug)
      : compact
        ? featuredVideos()
        : configuredVideos();
    return source
      .map((video) => ({
        video,
        product: getProduct(video.productSlug),
        videoId: extractTikTokId(video.tiktokUrl),
      }))
      .filter((item) => item.product && (item.videoId || item.video.nativeVideoUrl));
  }, [compact, productSlug]);

  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || items.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % items.length);
    }, 6500);
    return () => window.clearInterval(timer);
  }, [items.length, paused]);

  if (items.length === 0) {
    return (
      <section id="videos" className="mx-auto max-w-6xl px-4 py-16">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#c9a227]">KAPTAAN 804</p>
        <h2 className="mt-2 font-[family-name:var(--font-display)] text-3xl text-[#f3eee4] md:text-4xl">
          {tx(copy.sections.videos)}
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-[#f3eee4]/65">{tx(copy.sections.videosEmpty)}</p>
        <Link
          href="/products"
          className="mt-6 inline-flex rounded-full bg-[#c9a227] px-5 py-3 text-sm font-semibold text-[#070708]"
        >
          {tx(copy.actions.shop)}
        </Link>
      </section>
    );
  }

  const visible = compact ? items.slice(0, 6) : items;

  return (
    <section id="videos" className="mx-auto max-w-6xl px-4 py-16">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#c9a227]">KAPTAAN 804</p>
          <h2 className="mt-2 font-[family-name:var(--font-display)] text-3xl text-[#f3eee4] md:text-4xl">
            {tx(copy.sections.videos)}
          </h2>
          <p className="mt-2 max-w-xl text-sm text-[#f3eee4]/60">{tx(copy.sections.videosSub)}</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="rounded-full border border-white/15 px-3 py-2 text-xs font-semibold text-[#f3eee4]"
            onClick={() => setIndex((current) => (current - 1 + visible.length) % visible.length)}
          >
            {tx(copy.actions.prev)}
          </button>
          <button
            type="button"
            className="rounded-full border border-white/15 px-3 py-2 text-xs font-semibold text-[#f3eee4]"
            onClick={() => setPaused((value) => !value)}
          >
            {paused ? tx(copy.actions.play) : tx(copy.actions.pause)}
          </button>
          <button
            type="button"
            className="rounded-full border border-white/15 px-3 py-2 text-xs font-semibold text-[#f3eee4]"
            onClick={() => setIndex((current) => (current + 1) % visible.length)}
          >
            {tx(copy.actions.next)}
          </button>
        </div>
      </div>

      <div
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 md:grid md:grid-cols-3 md:overflow-visible"
        onPointerDown={() => setPaused(true)}
      >
        {visible.map(({ video, product }, cardIndex) => (
          <article
            key={video.id}
            className="w-[78vw] max-w-sm shrink-0 snap-center overflow-hidden rounded-[1.6rem] border border-white/8 bg-[#111113] md:w-auto"
          >
            <TikTokEmbed
              url={video.tiktokUrl}
              title={tx(product!.name)}
              poster={video.poster || product!.images[0]?.src}
              nativeVideoUrl={video.nativeVideoUrl}
              active={cardIndex === index}
            />
            <div className="space-y-3 p-4">
              <p className="text-[11px] uppercase tracking-[0.16em] text-[#c9a227]">
                {tx(copy.videoKind[video.kind])}
                {video.creatorName ? ` · ${video.creatorName}` : ""}
              </p>
              <h3 className="font-semibold text-[#f3eee4]">{tx(product!.name)}</h3>
              <p className="text-sm text-[#f3eee4]/60">{tx(video.description)}</p>
              <p className="font-bold text-[#c9a227]">{formatPKR(product!.price)}</p>
              <Link href={`/products/${product!.slug}`} className="block text-sm underline">
                {tx(copy.actions.viewProduct)}
              </Link>
              <WhatsAppButton
                message={productOrderMessage(product!, 1, product!.variants[0], locale)}
                className="flex h-11 items-center justify-center rounded-full bg-[#25D366] text-sm font-semibold text-white"
              >
                {tx(copy.actions.whatsapp)}
              </WhatsAppButton>
            </div>
          </article>
        ))}
      </div>
      {compact ? (
        <div className="mt-6">
          <Link href="/videos" className="text-sm font-semibold text-[#c9a227]">
            {tx(copy.actions.seeVideos)}
          </Link>
        </div>
      ) : (
        <p className="mt-4 text-xs text-[#f3eee4]/40">{site.name}</p>
      )}
    </section>
  );
}
