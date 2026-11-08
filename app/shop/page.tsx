import type { Metadata } from "next";
import Link from "next/link";
import { BrandVideo } from "@/components/BrandVideo";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { JsonLd } from "@/components/JsonLd";
import { StickyCta } from "@/components/StickyCta";
import { TrustStrip } from "@/components/TrustStrip";
import { VideoStrip } from "@/components/VideoStrip";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { productJsonLd } from "@/lib/schema";
import {
  BRAND,
  formatPrice,
  pageDescription,
  pageTitle,
  PRODUCT_NAME,
  site,
  waLink,
} from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: pageTitle("Perfume Price in Pakistan") },
  description: pageDescription(
    "Shop luxury unisex perfume Pakistan — perfume under 2000 with free delivery.",
  ),
  alternates: site.url ? { canonical: "/shop" } : undefined,
  openGraph: {
    title: pageTitle("Perfume Price in Pakistan"),
    description: pageDescription("Shop MONEY unisex perfume."),
    images: [{ url: site.ogImage, alt: `${PRODUCT_NAME} — preorder ${formatPrice()}` }],
  },
  twitter: {
    card: "summary_large_image",
    title: pageTitle("Perfume Price in Pakistan"),
    description: pageDescription("Shop MONEY unisex perfume."),
    images: [site.ogImage],
  },
};

export default function ShopPage() {
  return (
    <>
      <JsonLd data={productJsonLd("/shop")} />
      <Header />
      <main className="pb-28">
        <div className="mx-auto max-w-6xl px-4 py-10 md:py-14">
          <Breadcrumbs
            items={[
              { name: "Home", path: "/" },
              { name: "Shop", path: "/shop" },
            ]}
          />
          <header className="mt-8 max-w-2xl">
            <p className="text-xs tracking-[0.35em] text-gold uppercase">Preorder</p>
            <h1 className="font-display mt-3 text-4xl text-ivory md:text-5xl">
              Shop {BRAND} perfume
            </h1>
            <p className="mt-4 text-mist leading-relaxed">
              One bottle. Clear perfume price in Pakistan. Free delivery nationwide. WhatsApp order
              only — no cart maze.
            </p>
          </header>

          <article className="mt-10 grid gap-0 overflow-hidden border border-gold/20 bg-ink-100 md:grid-cols-2">
            <BrandVideo
              src={site.videos.product.src}
              poster={site.videos.product.poster}
              label={`${BRAND} perfume lifestyle motion`}
              aspectRatio="4 / 5"
              className="md:min-h-full"
            />
            <div className="flex flex-col justify-center px-6 py-8 md:px-10 md:py-12">
              <h2 className="font-display text-3xl text-ivory md:text-4xl">{PRODUCT_NAME}</h2>
              <p className="mt-2 text-mist">{site.tagline}</p>
              <div className="mt-6 h-px w-12 bg-gold/60" aria-hidden />
              <p className="font-display mt-6 text-4xl text-gold-light md:text-5xl">
                {formatPrice()}
              </p>
              <p className="mt-2 text-sm text-mist">{site.delivery}</p>
              <div className="mt-8">
                <TrustStrip />
              </div>
              <div className="mt-8">
                <WhatsAppButton href={waLink()}>{site.ctaLabel}</WhatsAppButton>
              </div>
              <p className="mt-6 text-sm text-mist/70">
                WhatsApp {site.whatsappDisplay}. Also see the{" "}
                <Link href="/11-11" className="text-gold-light hover:underline">
                  11.11 sale
                </Link>{" "}
                and{" "}
                <Link href="/faq" className="text-gold-light hover:underline">
                  delivery FAQ
                </Link>
                .
              </p>
            </div>
          </article>
        </div>
        <VideoStrip />
      </main>
      <Footer />
      <StickyCta />
    </>
  );
}
