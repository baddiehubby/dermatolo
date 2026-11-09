import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { StickyCta } from "@/components/StickyCta";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { BOTTLE_ML, BRAND, formatPrice, pageDescription, pageTitle, site } from "@/lib/site";
import { orderWhatsAppUrl } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: { absolute: pageTitle("About MONEY Luxury Perfume") },
  description: pageDescription("The story behind MONEY — luxury unisex perfume Pakistan."),
  alternates: site.url ? { canonical: "/about" } : undefined,
  openGraph: {
    title: pageTitle("About MONEY Luxury Perfume"),
    description: pageDescription("The story behind MONEY — luxury unisex perfume Pakistan."),
    images: [{ url: site.ogImage, alt: `About ${BRAND} perfume Pakistan` }],
  },
  twitter: {
    card: "summary_large_image",
    title: pageTitle("About MONEY Luxury Perfume"),
    description: pageDescription("The story behind MONEY — luxury unisex perfume Pakistan."),
    images: [site.ogImage],
  },
};

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-3xl px-4 py-10 pb-28 md:py-14">
        <Breadcrumbs
          items={[
            { name: "Home", path: "/" },
            { name: "About", path: "/about" },
          ]}
        />
        <p className="mt-8 text-xs tracking-[0.35em] text-gold uppercase">The brand</p>
        <h1 className="font-display mt-3 text-4xl text-ivory md:text-5xl">About {BRAND}</h1>
        <div className="mt-5 h-px w-12 bg-gold/60" aria-hidden />
        <p className="mt-6 text-lg text-mist leading-relaxed">{site.tagline}</p>
        <p className="mt-5 text-mist leading-relaxed">
          MONEY is a luxury unisex perfume for people who want a clear scent statement without
          noise. One formula. One bottle size ({BOTTLE_ML} ml). One price ({formatPrice()}). Direct
          WhatsApp order across Pakistan. {site.delivery}.
        </p>
        <p className="mt-5 text-mist leading-relaxed">
          We keep the storefront simple on purpose: no cart maze, no invented fragrance notes, no
          fabricated reviews — just the offer, cinematic brand films, and a conversation on WhatsApp.
        </p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Link href="/shop" className="ghost-btn !min-h-12">
            {site.shopCtaLabel}
          </Link>
          <WhatsAppButton href={orderWhatsAppUrl({ quantity: 1 })}>{site.ctaLabel}</WhatsAppButton>
        </div>
        <p className="mt-8 text-sm text-mist/70">
          <Link href="/shop" className="text-gold-light hover:underline">
            Shop
          </Link>
          {" · "}
          <Link href="/11-11" className="text-gold-light hover:underline">
            11.11
          </Link>
          {" · "}
          <Link href="/faq" className="text-gold-light hover:underline">
            FAQ
          </Link>
        </p>
      </main>
      <Footer />
      <StickyCta />
      <FloatingWhatsApp />
    </>
  );
}
