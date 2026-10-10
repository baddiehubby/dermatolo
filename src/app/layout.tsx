import type { Metadata } from "next";
import { Cormorant_Garamond, Noto_Nastaliq_Urdu, Outfit } from "next/font/google";
import { site } from "@/data/site";
import { AnnouncementBar } from "@/components/announcement-bar";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Providers } from "@/components/providers";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const display = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const urdu = Noto_Nastaliq_Urdu({
  variable: "--font-urdu",
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "KAPTAAN 804 | Real Support. Real Action.",
    template: `%s | KAPTAAN 804`,
  },
  description: site.description.en,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: site.locale,
    url: site.url,
    siteName: site.name,
    title: "KAPTAAN 804 | Real Support. Real Action.",
    description: site.description.en,
    images: [{ url: "/images/product/hero.jpg" }],
  },
  twitter: {
    card: "summary_large_image",
    title: site.name,
    description: site.description.en,
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${outfit.variable} ${display.variable} ${urdu.variable} h-full antialiased`}>
      <body className={`${outfit.className} flex min-h-full flex-col overflow-x-hidden bg-[#070708] text-[#f3eee4]`}>
        <Providers>
          <AnnouncementBar />
          <Header />
          <main className="flex-1 pb-24">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
