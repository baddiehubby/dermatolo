import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { JsonLd } from "@/components/JsonLd";
import { StickyCta } from "@/components/StickyCta";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { faqJsonLd } from "@/lib/schema";
import { faqs, pageDescription, pageTitle, site, waLink } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: pageTitle("Perfume Delivery FAQ") },
  description: pageDescription("Delivery, authenticity, returns, and COD for MONEY perfume."),
  alternates: site.url ? { canonical: "/faq" } : undefined,
  openGraph: {
    title: pageTitle("Perfume Delivery FAQ"),
    description: pageDescription("Delivery, authenticity, returns, and COD for MONEY perfume."),
    images: [{ url: site.ogImage, alt: "MONEY perfume delivery FAQ Pakistan" }],
  },
  twitter: {
    card: "summary_large_image",
    title: pageTitle("Perfume Delivery FAQ"),
    description: pageDescription("Delivery, authenticity, returns, and COD for MONEY perfume."),
    images: [site.ogImage],
  },
};

export default function FaqPage() {
  return (
    <>
      <JsonLd data={faqJsonLd()} />
      <Header />
      <main className="mx-auto max-w-3xl px-4 py-10 pb-28 md:py-14">
        <Breadcrumbs
          items={[
            { name: "Home", path: "/" },
            { name: "FAQ", path: "/faq" },
          ]}
        />
        <h1 className="font-display mt-8 text-4xl text-ivory md:text-5xl">FAQ</h1>
        <p className="mt-4 text-mist">Delivery, authenticity, returns, and cash on delivery.</p>

        <div className="mt-10 space-y-3">
          {faqs.map((item) => (
            <details
              key={item.q}
              className="group border border-gold/20 bg-ink-100 open:border-gold/40"
            >
              <summary className="cursor-pointer list-none px-5 py-4 font-medium text-ivory marker:content-none">
                <span className="flex items-start justify-between gap-4">
                  <span>{item.q}</span>
                  <span className="text-gold transition group-open:rotate-45" aria-hidden>
                    +
                  </span>
                </span>
              </summary>
              <p className="border-t border-gold/10 px-5 py-4 text-mist leading-relaxed">{item.a}</p>
            </details>
          ))}
        </div>

        <div className="mt-10">
          <WhatsAppButton href={waLink()}>{site.ctaLabel}</WhatsAppButton>
        </div>
        <p className="mt-8 text-sm text-mist/70">
          <Link href="/" className="text-gold-light hover:underline">
            Home
          </Link>
          {" · "}
          <Link href="/shop" className="text-gold-light hover:underline">
            Shop
          </Link>
          {" · "}
          <Link href="/11-11" className="text-gold-light hover:underline">
            11.11
          </Link>
        </p>
      </main>
      <Footer />
      <StickyCta />
    </>
  );
}
