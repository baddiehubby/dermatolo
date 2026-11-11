import type { Metadata } from "next";
import Link from "next/link";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { StickyCta } from "@/components/StickyCta";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { BRAND, pageTitle, site } from "@/lib/site";
import { buildOrderMessage, orderWhatsAppUrl } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: { absolute: pageTitle("Privacy") },
  description: `How ${BRAND} handles WhatsApp orders and site data. No card checkout on this site.`,
  alternates: site.url ? { canonical: "/privacy" } : undefined,
  robots: { index: true, follow: true },
};

export default function PrivacyPage() {
  const href = orderWhatsAppUrl({ quantity: 1 });
  const message = buildOrderMessage({ quantity: 1 });

  return (
    <>
      <Header />
      <main className="mx-auto max-w-3xl px-4 py-14 pb-28 text-mist leading-relaxed">
        <h1 className="font-display text-4xl text-ivory">Privacy</h1>
        <p className="mt-6">
          Orders are placed on WhatsApp via{" "}
          <WhatsAppButton
            href={href}
            message={message}
            showIcon={false}
            variant="ghost"
            className="!inline !min-h-0 !border-0 !bg-transparent !p-0 !shadow-none text-gold-light hover:underline"
          >
            {site.ctaLabel}
          </WhatsAppButton>
          . This website does not take card payments. Optional name, address, and phone fields on
          the shop page only fill your WhatsApp message in your browser — they are not stored on our
          server as a checkout database.
        </p>
        <p className="mt-4">
          Name, phone, and address you send on WhatsApp are used only to confirm and deliver your
          order. WhatsApp messages are subject to WhatsApp’s own policies.
        </p>
        <p className="mt-4">
          If review tools are enabled, submitted review text may be stored for moderation and, once
          approved, shown publicly. Contact us on WhatsApp to request removal.
        </p>
        <p className="mt-4">
          Analytics scripts (Google Analytics / Meta Pixel) load only if the site owner has set the
          corresponding environment variables. Prefer a consent banner where required by law.
        </p>
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
