import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import "./globals.css";
import { Analytics } from "@/components/Analytics";
import { JsonLd } from "@/components/JsonLd";
import { organizationJsonLd } from "@/lib/schema";
import { BOTTLE_ML, BRAND, formatPrice, pageDescription, site } from "@/lib/site";

const display = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

const sans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#070708",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  ...(site.url ? { metadataBase: new URL(site.url) } : {}),
  title: {
    default: `${BRAND} Perfume Pakistan | ${BOTTLE_ML} ml Unisex · ${formatPrice()} | kaptaan804.com`,
    template: `%s | ${BRAND} Perfume Pakistan`,
  },
  description: pageDescription(
    "MONEY — Smells Like Money. Luxury unisex perfume Pakistan.",
  ),
  alternates: site.url ? { canonical: "/" } : undefined,
  openGraph: {
    type: "website",
    locale: site.locale,
    siteName: `${BRAND} · kaptaan804.com`,
    title: `${BRAND} — ${site.tagline}`,
    description: pageDescription(
      "Luxury unisex perfume Pakistan — signature fragrance.",
    ),
    images: [
      {
        url: site.ogImage,
        width: 1200,
        height: 630,
        alt: `${BRAND} perfume — ${BOTTLE_ML} ml · ${formatPrice()}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${BRAND} — ${site.tagline}`,
    description: pageDescription(
      "Luxury unisex perfume Pakistan — signature fragrance.",
    ),
    images: [site.ogImage],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" dir="ltr" className={`${display.variable} ${sans.variable}`}>
      <body className="min-h-screen overflow-x-clip bg-ink font-sans text-ivory antialiased">
        <JsonLd data={organizationJsonLd()} />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
