import type { Metadata } from "next";
import Link from "next/link";
import { BrandVideo } from "@/components/BrandVideo";
import { ComparisonSection } from "@/components/ComparisonSection";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { StickyCta } from "@/components/StickyCta";
import { TrustStrip } from "@/components/TrustStrip";
import { VideoStrip } from "@/components/VideoStrip";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import {
  BRAND,
  formatPrice,
  pageDescription,
  pageTitle,
  site,
  waLink,
} from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: pageTitle("Luxury Unisex Perfume Pakistan") },
  description: pageDescription(
    "Luxury perfume Pakistan — long lasting unisex perfume under 2000.",
  ),
  alternates: site.url ? { canonical: "/" } : undefined,
  openGraph: {
    title: pageTitle("Luxury Unisex Perfume Pakistan"),
    description: pageDescription("Long lasting unisex perfume for Pakistan."),
    images: [{ url: site.ogImage, alt: `${BRAND} perfume — luxury unisex fragrance Pakistan` }],
  },
  twitter: {
    card: "summary_large_image",
    title: pageTitle("Luxury Unisex Perfume Pakistan"),
    description: pageDescription("Long lasting unisex perfume for Pakistan."),
    images: [site.ogImage],
  },
};

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <section className="relative overflow-hidden" aria-labelledby="home-h1">
          <div className="absolute inset-0">
            <BrandVideo
              src={site.videos.intro.src}
              poster={site.videos.intro.poster}
              label={`${BRAND} perfume intro film`}
              withAudio
              aspectRatio="auto"
              className="h-[min(92vh,900px)] min-h-[420px] max-h-none !aspect-auto"
            />
            <div
              className="pointer-events-none absolute inset-0 bg-gradient-to-b from-ink/75 via-ink/55 to-ink"
              aria-hidden
            />
          </div>

          {/* pointer-events-none so Tap for sound on the intro remains clickable; restore on CTAs */}
          <div className="pointer-events-none relative mx-auto flex min-h-[420px] h-[min(92vh,900px)] max-w-4xl flex-col items-center justify-end px-4 pb-14 pt-28 text-center md:pb-20">
            <p className="reveal font-display text-sm tracking-[0.45em] text-gold md:text-base">
              {BRAND}
            </p>
            <div className="reveal mx-auto mt-5 h-px w-14 bg-gold/70" aria-hidden style={{ animationDelay: "80ms" }} />
            <h1
              id="home-h1"
              className="reveal font-display mt-6 text-5xl leading-[1.05] text-ivory md:text-7xl"
              style={{ animationDelay: "120ms" }}
            >
              {site.tagline}
            </h1>
            <p
              className="reveal mt-6 max-w-lg text-base text-mist md:text-lg"
              style={{ animationDelay: "200ms" }}
            >
              Premium unisex perfume for Pakistan · {formatPrice()} · Free delivery
            </p>
            <div
              className="reveal pointer-events-auto mt-9 flex flex-col items-center gap-4 sm:flex-row"
              style={{ animationDelay: "280ms" }}
            >
              <WhatsAppButton href={waLink()}>{site.ctaLabel}</WhatsAppButton>
              <Link href="/shop" className="ghost-btn !min-h-12 !px-5 text-sm">
                View offer
              </Link>
            </div>
            <div className="reveal mt-10 w-full max-w-2xl" style={{ animationDelay: "360ms" }}>
              <TrustStrip />
            </div>
          </div>
        </section>

        <VideoStrip />
        <ComparisonSection />
      </main>
      <Footer />
      <StickyCta />
    </>
  );
}
