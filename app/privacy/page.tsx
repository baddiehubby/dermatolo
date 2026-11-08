import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { StickyCta } from "@/components/StickyCta";
import { BRAND, pageTitle, site, waLink } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: pageTitle("Privacy") },
  description: `How ${BRAND} handles WhatsApp orders and site data. No card checkout on this site.`,
  alternates: site.url ? { canonical: "/privacy" } : undefined,
  robots: { index: true, follow: true },
};

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-3xl px-4 py-14 pb-28 text-mist leading-relaxed">
        <h1 className="font-display text-4xl text-ivory">Privacy</h1>
        <p className="mt-6">
          Orders are placed on WhatsApp via{" "}
          <a href={waLink()} className="text-gold-light hover:underline">
            {site.ctaLabel}
          </a>
          . This website does not take card payments or store checkout forms on a server.
        </p>
        <p className="mt-4">
          Name, phone, and address you send on WhatsApp are used only to confirm and deliver your
          order. WhatsApp messages are subject to WhatsApp’s own policies.
        </p>
        <p className="mt-4">
          If review tools are enabled, submitted review text may be stored and shown publicly. Contact
          us on WhatsApp to request removal.
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
