/**
 * CENTRAL SITE CONFIG — change WhatsApp, price, and brand copy here only.
 */

export const WHATSAPP_NUMBER = "923102201180";
/** Local Pakistan display format for UI. */
export const WHATSAPP_DISPLAY = "0310 220 1180";
export const WHATSAPP_MESSAGE =
  "Hi, I want to order MONEY perfume (PKR 1999, free delivery).";

export const PRICE = 1999;
export const CURRENCY = "PKR";
export const FREE_DELIVERY = true;

export const BRAND = "MONEY";
export const TAGLINE = "Smells like money.";
export const PRODUCT_NAME = "MONEY Perfume";

export function waLink(message: string = WHATSAPP_MESSAGE): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function formatPrice(value: number = PRICE): string {
  return `PKR ${value.toLocaleString("en-PK")}`;
}

function configuredSiteUrl(): string | null {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (!raw) return null;
  try {
    const url = new URL(raw);
    if (url.protocol !== "http:" && url.protocol !== "https:") return null;
    return url.origin;
  } catch {
    return null;
  }
}

export const site = {
  brand: BRAND,
  productName: PRODUCT_NAME,
  tagline: TAGLINE,
  locale: "en_PK",
  language: "en",
  url: configuredSiteUrl(),
  country: "Pakistan",
  delivery: "Free delivery all over Pakistan",
  deliveryDays: "2–4 days",
  payment: "Cash on delivery (COD)",
  authenticity: "Authentic MONEY fragrance",
  ctaLabel: "Order on WhatsApp",
  whatsappDisplay: WHATSAPP_DISPLAY,
  /**
   * OG / social image.
   * TODO: replace with a real product photograph once available.
   */
  ogImage: "/og/money-og.svg",
  /**
   * Video assets under /public/videos.
   * Intro: Desktop/yt short — primary brand film with click-to-play voice (see BrandVideo withAudio).
   * Other clips may still be temporary atmosphere footage. Use neutral alts — do not claim MONEY bottle CGI.
   * NOTE: Browsers block unmuted autoplay without a user gesture; intro must use Tap for sound / Play.
   */
  videos: {
    /** Primary brand intro — homepage hero; play with sound after user tap. */
    intro: {
      src: "/videos/money-intro.mp4",
      poster: "/videos/posters/money-intro.jpg",
    },
    hero: {
      src: "/videos/money-intro.mp4",
      poster: "/videos/posters/money-intro.jpg",
    },
    product: {
      src: "/videos/money-product.mp4",
      poster: "/videos/posters/money-product.jpg",
    },
    atmosphere: {
      src: "/videos/money-atmosphere.mp4",
      poster: "/videos/posters/money-atmosphere.jpg",
    },
  },
};

export const navItems = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
  { href: "/11-11", label: "11.11 Sale" },
  { href: "/about", label: "About" },
  { href: "/faq", label: "FAQ" },
] as const;

export const faqs = [
  {
    q: "How do I order MONEY perfume?",
    a: `Tap “Order on WhatsApp”. A pre-filled message opens for ${PRODUCT_NAME} at ${formatPrice()}. Share your name, phone, and full delivery address to confirm.`,
  },
  {
    q: "What is the perfume price in Pakistan?",
    a: `Preorder price is ${formatPrice()}. ${site.delivery}. That keeps MONEY in the perfume under 2000 Pakistan range with free nationwide delivery.`,
  },
  {
    q: "Do you deliver outside Karachi?",
    a: "Yes. We offer free delivery all over Pakistan. Typical delivery takes 2–4 days depending on your city.",
  },
  {
    q: "Is cash on delivery available?",
    a: "Yes. COD is available. Pay when your parcel arrives.",
  },
  {
    q: "Is MONEY authentic?",
    a: "Yes. You order directly from the MONEY brand WhatsApp channel — not a marketplace reseller listing.",
  },
  {
    q: "What is your return policy?",
    a: "Unopened bottles in original packaging may be discussed for return or exchange within 3 days of delivery. Message us on WhatsApp with your order details.",
  },
  {
    q: "Is MONEY a unisex perfume?",
    a: "Yes. MONEY is a premium unisex perfume made for anyone who wants a confident, modern scent — a long lasting perfume Pakistan shoppers can wear day or night.",
  },
] as const;

/** 11.11 sale end (Asia/Karachi). System date before 11 Nov 2026 → 2026; otherwise next year. */
export function getElevenElevenTarget(): Date {
  const now = new Date();
  const year = now.getFullYear();
  const endThisYear = new Date(`${year}-11-11T23:59:59+05:00`);
  if (now.getTime() <= endThisYear.getTime()) return endThisYear;
  return new Date(`${year + 1}-11-11T23:59:59+05:00`);
}

export function pageTitle(keyword: string): string {
  return `${keyword} | MONEY Perfume Pakistan`;
}

export function pageDescription(focus: string): string {
  return `${focus} ${PRODUCT_NAME} — ${formatPrice()}, free delivery all over Pakistan. Preorder on WhatsApp.`;
}
