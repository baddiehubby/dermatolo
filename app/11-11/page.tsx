import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Countdown } from "@/components/Countdown";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { JsonLd } from "@/components/JsonLd";
import { StickyCta } from "@/components/StickyCta";
import { TrustStrip } from "@/components/TrustStrip";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { productJsonLd } from "@/lib/schema";
import {
  formatPrice,
  getElevenElevenTarget,
  pageDescription,
  pageTitle,
  site,
  waLink,
} from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: pageTitle("11.11 Sale Perfume Pakistan") },
  description: pageDescription(
    "11.11 sale perfume — lock PKR 1999 luxury unisex fragrance with free delivery.",
  ),
  alternates: site.url ? { canonical: "/11-11" } : undefined,
  openGraph: {
    title: pageTitle("11.11 Sale Perfume Pakistan"),
    description: pageDescription("11.11 sale perfume preorder."),
    images: [{ url: site.ogImage, alt: "MONEY 11.11 sale perfume Pakistan" }],
  },
  twitter: {
    card: "summary_large_image",
    title: pageTitle("11.11 Sale Perfume Pakistan"),
    description: pageDescription("11.11 sale perfume preorder."),
    images: [site.ogImage],
  },
};

export default function ElevenElevenPage() {
  const target = getElevenElevenTarget();
  const year = target.getFullYear();

  return (
    <>
      <JsonLd data={productJsonLd("/11-11")} />
      <Header />
      <main className="mx-auto max-w-3xl px-4 py-10 pb-28 md:py-14">
        <Breadcrumbs
          items={[
            { name: "Home", path: "/" },
            { name: "11.11 Sale", path: "/11-11" },
          ]}
        />
        <header className="mt-8 text-center">
          <p className="text-xs tracking-[0.4em] text-gold uppercase">11.11 Sale</p>
          <div className="mx-auto mt-5 h-px w-12 bg-gold/60" aria-hidden />
          <h1 className="font-display mt-5 text-4xl text-ivory md:text-5xl">
            Preorder price {formatPrice()}
          </h1>
          <p className="mt-4 text-mist leading-relaxed">
            {site.delivery}. Confirm your 11.11 perfume order on WhatsApp before the window closes.
          </p>
        </header>

        <div className="mt-10">
          <Countdown targetIso={target.toISOString()} />
          <p className="mt-3 text-center text-xs text-mist/60">
            Countdown to end of 11 November {year} (Pakistan time).
          </p>
        </div>

        <div className="mt-10 space-y-5 border border-gold/25 bg-ink-100/80 px-6 py-8 text-center">
          <h2 className="font-display text-2xl text-ivory">The offer</h2>
          <p className="text-mist leading-relaxed">
            MONEY unisex perfume — preorder {formatPrice()}, free delivery all over Pakistan, COD
            available. A clear perfume under 2000 Pakistan preorder for 11.11.
          </p>
          <div className="pt-1">
            <TrustStrip />
          </div>
          <div className="flex justify-center pt-3">
            <WhatsAppButton href={waLink()}>{site.ctaLabel}</WhatsAppButton>
          </div>
          <p className="text-sm text-mist/65">WhatsApp {site.whatsappDisplay}</p>
        </div>

        <p className="mt-8 text-center text-sm text-mist/70">
          Back to{" "}
          <Link href="/shop" className="text-gold-light hover:underline">
            Shop
          </Link>{" "}
          or{" "}
          <Link href="/faq" className="text-gold-light hover:underline">
            FAQ
          </Link>
          .
        </p>
      </main>
      <Footer />
      <StickyCta />
    </>
  );
}
