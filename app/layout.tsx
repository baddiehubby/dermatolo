import type { Metadata, Viewport } from "next";
import { Noto_Naskh_Arabic, Noto_Nastaliq_Urdu, Outfit } from "next/font/google";
import "./globals.css";
import { product, site } from "@/lib/product";
import { faqJsonLd, organizationJsonLd, productJsonLd } from "@/lib/schema";

const naskh = Noto_Naskh_Arabic({
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-naskh",
  display: "swap",
});

const nastaliq = Noto_Nastaliq_Urdu({
  subsets: ["arabic"],
  weight: "400",
  variable: "--font-nastaliq",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-outfit",
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
    default: site.title,
    template: `%s · ${product.name}`,
  },
  description: site.description,
  keywords: [...site.keywords],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: site.locale,
    siteName: product.name,
    ...(site.url
      ? {
          images: [
            {
              url: product.images.og,
              width: 1280,
              height: 720,
              alt: `${product.name} — ${product.cityEn}`,
            },
          ],
        }
      : {}),
  },
  twitter: {
    card: "summary_large_image",
    ...(site.url ? { images: [product.images.og] } : {}),
  },
  robots: {
    index: true,
    follow: true,
  },
};

function JsonLd({ data }: { data: unknown }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ur" dir="rtl" className={`${naskh.variable} ${nastaliq.variable} ${outfit.variable}`}>
      <body className="min-h-screen overflow-x-clip bg-ink font-naskh text-ivory antialiased">
        <JsonLd data={organizationJsonLd()} />
        <JsonLd data={productJsonLd()} />
        <JsonLd data={faqJsonLd()} />
        {children}
      </body>
    </html>
  );
}
