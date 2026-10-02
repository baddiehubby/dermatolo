/**
 * CENTRAL PRODUCT CONFIG
 * Change price, contact details, copy, and image paths here — not in components.
 *
 * Image folders (drop files in, then point the paths below at them):
 *   /public/images/product/   real bottle / pack shots
 *   /public/images/hero/      hero atmosphere, lifestyle, Open Graph
 *   /public/images/icons/     optional brand marks
 *
 * `pricePkr` drives every price string on the site (hero, cards, form total,
 * FAQ, JSON-LD). If it is ever set back to null the site falls back to
 * "قیمت واٹس ایپ پر پوچھیں" and does not invent a rupee amount.
 *
 * `images` points at CGI brand renders. Swap the files for official
 * photography later; do not describe these renders as customer or lab photos.
 *
 * Set NEXT_PUBLIC_SITE_URL after deploy (example: https://example.com).
 * No production domain is guessed in this file.
 */

export type ProductPrice = number | null;

export type CustomerReview = {
  name: string;
  text: string;
};

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

/** Show "free" delivery wording only while free delivery is the current offer. */
const freeDelivery = true;
/** Confirmed by the owner. Turning this off hides every discreet-packaging claim. */
const discreetPackaging = true;
/** Set true only if the bottle/box label confirms a herbal formulation. */
const isHerbal = false;

const sameDayUrdu = "کراچی بھر میں اسی دن ڈیلیوری";

export const product = {
  name: "Eagle Delay Spray",
  nameUrdu: "ایگل ڈیلے اسپرے",
  brand: "Eagle",
  categoryUrdu: "بالغ مردوں کے لیے ذاتی دیکھ بھال",
  tagline: "اعتماد کے ساتھ زیادہ دیر",
  heroSupport: `قربت کے لمحات میں بہتر کنٹرول اور زیادہ اعتماد کے لیے تیار کردہ پریمیم${isHerbal ? " ہربل" : ""} ڈیلے سپرے۔`,
  /** Brand language only. Not a duration, result, or medical promise. */
  emotion: "اعتماد۔ قربت۔ بہتر لمحے۔",
  emotionNote: "یہ برانڈ کی زبان ہے، طبی وعدہ نہیں۔",
  /** Shown beside CGI so it is not read as a customer, doctor, or lab photo. */
  artworkNote: "برانڈ کی تصویری پیشکش",
  subtitle: "بالغ مردوں کے لیے تیار کردہ ڈیلے سپرے",
  city: "کراچی",
  country: "پاکستان",
  cityEn: "Karachi",
  countryEn: "Pakistan",
  ageNote: "صرف ۱۸ سال یا اس سے زیادہ عمر کے بالغ مردوں کے لیے",

  isHerbal,
  freeDelivery,
  discreetPackaging,

  /**
   * Retail price in PKR. Set a number when confirmed, otherwise leave null.
   */
  pricePkr: 1300 as ProductPrice,
  currency: "PKR",
  currencyLabel: "روپے",
  pricePrompt: "قیمت واٹس ایپ پر پوچھیں",

  sameDayUrdu,
  deliveryUrdu: freeDelivery ? "کراچی بھر میں فری اور اسی دن ڈیلیوری" : sameDayUrdu,
  deliveryNote: "اسی دن ڈیلیوری آرڈر کے وقت اور ڈیلیوری کی دستیابی کے مطابق ہوتی ہے۔",
  paymentUrdu: "کیش آن ڈیلیوری",
  paymentNote: "رقم پارسل وصول کرتے وقت ادا کریں۔",
  discreetUrdu: "ڈسکریٹ پیکنگ",
  ordersNote: "تمام آرڈرز واٹس ایپ کے ذریعے",

  /**
   * How-to-use guidance. Fill these in from the bottle/box label, then set
   * `labelConfirmed: true`. Never invent a spray count or timing.
   */
  usage: {
    labelConfirmed: false,
    /** e.g. 5 → step 3 reads "تقریباً 5 منٹ پہلے". Leave null until the label confirms it. */
    minutesBeforeUse: null as number | null,
    /** e.g. "مردانہ عضو پر بیرونی استعمال". Leave null until the label confirms it. */
    applicationArea: null as string | null,
  },

  /**
   * Replace with the real formulation from the bottle or box.
   * Leave null until the manufacturer label is available.
   */
  ingredients: null as string[] | null,
  ingredientsNote:
    "اجزاء اور ارتکاز بوتل کے لیبل پر درج ہیں۔ تصدیق شدہ فہرست دستیاب ہوتے ہی یہاں شامل کر دی جائے گی۔",

  /**
   * Only genuine customer reviews, shared with the customer's permission.
   * Never invent names, quotes, screenshots, or star ratings.
   */
  reviews: [] as CustomerReview[],

  order: {
    minQuantity: 1,
    maxQuantity: 10,
  },

  images: {
    hero: "/images/product/hero.jpg",
    closeup: "/images/product/closeup.jpg",
    lifestyle: "/images/product/lifestyle.jpg",
    eagle: "/images/product/eagle-brand.jpg",
    karachi: "/images/product/karachi.jpg",
    /** Set to null to hide the parcel artwork without breaking the privacy card. */
    discreetParcel: "/images/product/discreet-parcel.jpg" as string | null,
    og: "/images/product/karachi.jpg",
    /**
     * Poster for the muted product film. Null falls back to `hero`.
     * This is brand artwork, not a clinical still.
     */
    demoPoster: "/images/product/demo-poster.jpg" as string | null,
  },

  /**
   * Muted product film in the usage section. Drop a replacement at the same
   * public path, or point these elsewhere. `src: null` shows the poster still
   * only (and `images.demoPoster: null` uses `images.hero`). `webm: null`
   * serves the MP4 alone.
   */
  video: {
    src: "/videos/eagle-demo.mp4" as string | null,
    webm: "/videos/eagle-demo.webm" as string | null,
  },
};

export const contact = {
  phoneDisplay: "0310 220 1180",
  whatsappE164: "923102201180",
};

export function hasConfirmedPrice(price: ProductPrice): price is number {
  return typeof price === "number" && Number.isFinite(price);
}

/** Latin display format used across the site, e.g. "Rs. 1,300". */
export function formatPkr(value: number): string {
  return `Rs. ${value.toLocaleString("en-US")}`;
}

export function orderTotalPkr(quantity: number): number | null {
  return hasConfirmedPrice(product.pricePkr) ? product.pricePkr * quantity : null;
}

function buildDescription(): string {
  const price = hasConfirmedPrice(product.pricePkr) ? `، صرف ${formatPkr(product.pricePkr)}` : "";
  const packing = discreetPackaging ? ` اور ${product.discreetUrdu}` : "";
  return `${product.name} کراچی — بالغ مردوں کے لیے پریمیم${isHerbal ? " ہربل" : ""} ڈیلے سپرے${price}۔ ${product.deliveryUrdu}، ${product.paymentUrdu}${packing}۔ واٹس ایپ پر آرڈر کریں: ${contact.phoneDisplay}۔`;
}

export const site = {
  name: product.name,
  locale: "ur_PK",
  language: "ur",
  url: configuredSiteUrl(),
  title: "ایگل ڈیلے اسپرے کراچی | Eagle Delay Spray Karachi",
  description: buildDescription(),
  keywords: [
    "Eagle Delay Spray Karachi",
    "delay spray Karachi",
    "ڈیلے سپرے کراچی",
    "ڈیلے سپرے",
    "مردوں کے لیے ڈیلے سپرے",
    "cash on delivery Karachi",
  ],
};

export const karachiAreaHints = [
  "گلشن اقبال",
  "نارتھ ناظم آباد",
  "ڈی ایچ اے",
  "کلفٹن",
  "گلستان جوہر",
  "ملیر",
  "کورنگی",
  "صدر",
  "فیڈرل بی ایریا",
  "کیماڑی",
  "اورنگی",
  "لانڈھی",
];
