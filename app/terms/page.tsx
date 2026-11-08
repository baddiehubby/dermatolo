import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { StickyCta } from "@/components/StickyCta";
import { formatPrice, pageTitle, PRODUCT_NAME, site } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: pageTitle("Terms") },
  description: `Order terms for ${PRODUCT_NAME}: WhatsApp preorder, ${formatPrice()}, free delivery Pakistan.`,
  alternates: site.url ? { canonical: "/terms" } : undefined,
};

export default function TermsPage() {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-3xl px-4 py-14 pb-28 text-mist leading-relaxed">
        <h1 className="font-display text-4xl text-ivory">Terms</h1>
        <p className="mt-6">
          All orders are confirmed on WhatsApp. An order is confirmed when we reply on WhatsApp.
        </p>
        <p className="mt-4">
          Preorder price: {formatPrice()}. {site.delivery}. {site.payment}.
        </p>
        <p className="mt-4">
          Delivery timing is typically {site.deliveryDays} after confirmation, depending on your city.
        </p>
        <p className="mt-4">
          Fragrance preference is subjective. Unopened bottles in original packaging may be discussed
          for return or exchange within 3 days of delivery via WhatsApp.
        </p>
        <Link href="/" className="mt-8 inline-block text-gold-light hover:underline">
          Back to home
        </Link>
      </main>
      <Footer />
      <StickyCta />
    </>
  );
}
