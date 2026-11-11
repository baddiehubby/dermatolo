import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { BrandVideo } from "@/components/BrandVideo";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { ReviewsSection } from "@/components/reviews/ReviewsSection";
import { StickyCta } from "@/components/StickyCta";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { getDisplayedReviews } from "@/lib/reviews-store";
import {
  BOTTLE_ML,
  BRAND,
  formatPrice,
  pageDescription,
  pageTitle,
  site,
  testimonials,
} from "@/lib/site";
import { buildOrderMessage, orderWhatsAppUrl } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: { absolute: pageTitle("Customer Reviews") },
  description: pageDescription("Customer feedback for MONEY luxury unisex perfume Pakistan."),
  alternates: site.url ? { canonical: "/reviews" } : undefined,
  openGraph: {
    title: pageTitle("Customer Reviews"),
    description: pageDescription("Customer feedback for MONEY luxury unisex perfume Pakistan."),
    images: [{ url: site.ogImage, alt: `${BRAND} perfume reviews — ${BOTTLE_ML} ml · ${formatPrice()}` }],
  },
  twitter: {
    card: "summary_large_image",
    title: pageTitle("Customer Reviews"),
    description: pageDescription("Customer feedback for MONEY luxury unisex perfume Pakistan."),
    images: [site.ogImage],
  },
};

export default async function ReviewsPage() {
  const reviews = await getDisplayedReviews();
  const href = orderWhatsAppUrl({ quantity: 1 });
  const message = buildOrderMessage({ quantity: 1 });

  return (
    <>
      <Header />
      <main>
        <section className="mx-auto max-w-3xl px-4 pt-10 md:pt-14" aria-labelledby="reviews-page-h1">
          <Breadcrumbs
            items={[
              { name: "Home", path: "/" },
              { name: "Reviews", path: "/reviews" },
            ]}
          />
          <p className="mt-8 text-xs tracking-[0.42em] text-gold uppercase">Reviews</p>
          <h1 id="reviews-page-h1" className="font-display mt-3 text-4xl text-ivory md:text-6xl">
            Voices of {BRAND}
          </h1>
          <div className="mt-5 h-px w-12 bg-gold/60" aria-hidden />
          <p className="mt-6 text-lg leading-relaxed text-mist">
            Customer feedback shared by the brand for publication — {testimonials.length} notes,
            quote-led and without invented star averages.
          </p>
        </section>

        <section
          className="mx-auto max-w-6xl px-4 py-12 md:py-16"
          aria-label={`${BRAND} cinema beside reviews`}
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <BrandVideo
              src={site.videos.cinemaA.src}
              poster={site.videos.cinemaA.poster}
              label={`${BRAND} perfume cinema A`}
              caption="Cinema"
              withAudio
              aspectRatio="4 / 5"
              className="reveal"
            />
            <BrandVideo
              src={site.videos.cinemaB.src}
              poster={site.videos.cinemaB.poster}
              label={`${BRAND} perfume cinema B`}
              caption="Atmosphere"
              withAudio
              aspectRatio="4 / 5"
              className="reveal"
            />
          </div>
        </section>

        <ReviewsSection reviews={reviews} />

        <section className="mx-auto max-w-3xl px-4 pb-20 text-center">
          <p className="font-display text-2xl text-ivory md:text-3xl">{site.tagline}</p>
          <p className="mt-3 text-sm text-mist">
            {BOTTLE_ML} ml · {formatPrice()} · {site.delivery}
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link href="/shop" className="ghost-btn !min-h-12">
              {site.shopCtaLabel}
            </Link>
            <WhatsAppButton href={href} message={message}>
              {site.ctaLabel}
            </WhatsAppButton>
          </div>
        </section>
      </main>
      <Footer />
      <StickyCta />
      <FloatingWhatsApp />
    </>
  );
}
