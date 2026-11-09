import type { Metadata } from "next";
import Link from "next/link";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { StickyCta } from "@/components/StickyCta";
import { BOTTLE_ML, formatPrice, pageTitle, PRODUCT_NAME, site } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: pageTitle("Terms") },
  description: `Order terms for ${PRODUCT_NAME}: WhatsApp order, ${BOTTLE_ML} ml, ${formatPrice()}, delivery charges apply.`,
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
          Product: {PRODUCT_NAME}, {BOTTLE_ML} ml. Price: {formatPrice()}. {site.delivery}.{" "}
          {site.payment}.
        </p>
        <p className="mt-4">{site.deliveryDetail}</p>
        <p className="mt-4">
          Delivery timing is {site.deliveryDays}, depending on your city.
        </p>
        <p className="mt-4">{site.exchange}</p>
        <Link href="/" className="mt-8 inline-block text-gold-light hover:underline">
          Back to home
        </Link>
      </main>
      <Footer />
      <StickyCta />
      <FloatingWhatsApp />
    </>
  );
}
