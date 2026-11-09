import type { Metadata } from "next";
import Link from "next/link";
import { BrandVideo } from "@/components/BrandVideo";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { DeliveryTrust } from "@/components/DeliveryTrust";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { JsonLd } from "@/components/JsonLd";
import { OrderPanel } from "@/components/OrderPanel";
import { ReviewsSection } from "@/components/reviews/ReviewsSection";
import { StickyCta } from "@/components/StickyCta";
import { TrustStrip } from "@/components/TrustStrip";
import { VideoStrip } from "@/components/VideoStrip";
import { getDisplayedReviews } from "@/lib/reviews-store";
import { productJsonLd } from "@/lib/schema";
import {
  BOTTLE_ML,
  BRAND,
  formatPrice,
  pageDescription,
  pageTitle,
  PRODUCT_NAME,
  site,
} from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: pageTitle("Shop MONEY Perfume Pakistan") },
  description: pageDescription(
    `Shop ${PRODUCT_NAME} — ${BOTTLE_ML} ml unisex fragrance.`,
  ),
  alternates: site.url ? { canonical: "/shop" } : undefined,
  openGraph: {
    title: pageTitle("Shop MONEY Perfume Pakistan"),
    description: pageDescription(`Shop ${PRODUCT_NAME}.`),
    images: [{ url: site.ogImage, alt: `${PRODUCT_NAME} — ${BOTTLE_ML} ml · ${formatPrice()}` }],
  },
  twitter: {
    card: "summary_large_image",
    title: pageTitle("Shop MONEY Perfume Pakistan"),
    description: pageDescription(`Shop ${PRODUCT_NAME}.`),
    images: [site.ogImage],
  },
};

export default async function ShopPage() {
  const reviews = await getDisplayedReviews();

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
            <p className="text-xs tracking-[0.35em] text-gold uppercase">Shop</p>
            <h1 className="font-display mt-3 text-4xl text-ivory md:text-5xl">
              Shop {BRAND} perfume
            </h1>
            <p className="mt-4 text-mist leading-relaxed">
              {BOTTLE_ML} ml unisex fragrance. Clear price: {formatPrice()}. {site.delivery}.
              WhatsApp order only — no cart maze.
            </p>
          </header>

          <article className="mt-10 grid gap-0 overflow-hidden border border-gold/20 bg-ink-100 md:grid-cols-2">
            <div className="relative">
              <BrandVideo
                src={site.videos.product.src}
                poster={site.videos.product.poster}
                label={`${BRAND} perfume lifestyle motion`}
                aspectRatio="4 / 5"
                className="md:min-h-full"
              />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/80 to-transparent p-5 md:hidden">
                <p className="font-display text-lg tracking-[0.2em] text-gold-light">
                  {BOTTLE_ML} ML · {formatPrice()}
                </p>
              </div>
            </div>
            <div className="flex flex-col justify-center px-6 py-8 md:px-10 md:py-12">
              <OrderPanel />
              <div className="mt-8">
                <TrustStrip />
              </div>
              <p className="mt-6 text-sm text-mist/70">
                Also see the{" "}
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
        <DeliveryTrust />
        <ReviewsSection reviews={reviews} />
      </main>
      <Footer />
      <StickyCta />
      <FloatingWhatsApp />
    </>
  );
}
