/**
 * CENTRAL SITE CONFIG — change WhatsApp, price, bottle size, and brand copy here only.
 * Live brand domain: https://www.kaptaan804.com (set NEXT_PUBLIC_SITE_URL to match).
 */

export const WHATSAPP_NUMBER = "923102201180";
/** Local Pakistan display format for UI. */
export const WHATSAPP_DISPLAY = "0310 220 1180";

export const PRICE = 1999;
export const CURRENCY = "PKR";
export const BOTTLE_ML = 50;
/** Delivery is paid by the customer — never claim free delivery. */
export const FREE_DELIVERY = false;
export const DELIVERY_NOTE = "Delivery charges apply";
export const DELIVERY_DETAIL =
  "Delivery is charged separately and confirmed on WhatsApp before dispatch.";

export const BRAND = "MONEY";
export const TAGLINE = "Smells Like Money.";
export const PRODUCT_NAME = "MONEY Perfume";
export const PRODUCT_LABEL = "MONEY Unisex Perfume";

/** Default short WhatsApp opener (order builder adds qty / address fields). */
export const WHATSAPP_MESSAGE = `Hi, I want to order ${PRODUCT_NAME} (${BOTTLE_ML} ml, PKR ${PRICE}). Delivery charged separately.`;

/**
 * International readiness (architecture only).
 * Only activate a market when price + delivery are confirmed — do not promise unsupported shipping.
 */
export const markets = [
  { code: "PK", currency: "PKR", price: 1999, active: true },
  { code: "AE", currency: "AED", price: null, active: false },
  { code: "SA", currency: "SAR", price: null, active: false },
  { code: "GB", currency: "GBP", price: null, active: false },
  { code: "US", currency: "USD", price: null, active: false },
] as const;

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
  productLabel: PRODUCT_LABEL,
  tagline: TAGLINE,
  bottleMl: BOTTLE_ML,
  locale: "en_PK",
  language: "en",
  url: configuredSiteUrl(),
  country: "Pakistan",
  delivery: DELIVERY_NOTE,
  deliveryDetail: DELIVERY_DETAIL,
  /** Timing is confirmed per order on WhatsApp — do not invent same-day claims. */
  deliveryDays: "confirmed on WhatsApp",
  payment: "Cash on delivery (COD)",
  authenticity: "Authentic MONEY fragrance",
  exchange:
    "Unopened bottles in original packaging may be discussed for exchange within 3 days of delivery if damaged in transit — message WhatsApp with order details.",
  ctaLabel: "Order on WhatsApp",
  shopCtaLabel: "Shop Now",
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
  markets,
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
    a: `Tap “Shop Now” or “Order on WhatsApp”. Choose quantity, optionally fill your name, address, and phone, then open WhatsApp. The message includes ${PRODUCT_NAME}, ${BOTTLE_ML} ml, ${formatPrice()} each, quantity, product subtotal, and that delivery is charged separately.`,
  },
  {
    q: "What is the perfume price in Pakistan?",
    a: `${PRODUCT_LABEL} (${BOTTLE_ML} ml) is ${formatPrice()}. Delivery charges apply and are confirmed on WhatsApp before dispatch.`,
  },
  {
    q: "Is delivery free?",
    a: "No. Delivery charges apply and are paid by the customer. Exact charges and timing are confirmed on WhatsApp for your city.",
  },
  {
    q: "Do you deliver outside Karachi?",
    a: "Yes — we deliver across Pakistan. Delivery charges and timing are confirmed on WhatsApp for your city.",
  },
  {
    q: "Is cash on delivery available?",
    a: "Yes. COD is available. Pay when your parcel arrives. Delivery charges still apply and will be confirmed on WhatsApp.",
  },
  {
    q: "Is MONEY authentic?",
    a: "Yes. You order directly from the MONEY brand WhatsApp channel — not a marketplace reseller listing.",
  },
  {
    q: "What is your exchange / damage policy?",
    a: site.exchange,
  },
  {
    q: "Is MONEY a unisex perfume?",
    a: "Yes. MONEY is a premium unisex perfume — a confident, modern scent you can wear day or night.",
  },
  {
    q: "How do I contact you?",
    a: `Message us on WhatsApp at ${WHATSAPP_DISPLAY}. All orders and delivery questions are handled there.`,
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
  return `${keyword} | MONEY Perfume | kaptaan804.com`;
}

export function pageDescription(focus: string): string {
  return `${focus} ${PRODUCT_NAME} — ${BOTTLE_ML} ml, ${formatPrice()}. ${DELIVERY_NOTE}. Order on WhatsApp.`;
}
