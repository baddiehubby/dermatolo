export const site = {
  name: "KAPTAAN 804",
  legalName: "KAPTAAN 804",
  productName: "Eagle Delay Spray",
  productNameUr: "ایگل ڈیلے اسپرے",
  tagline: {
    en: "More time. More confidence.",
    ur: "اعتماد کے ساتھ زیادہ دیر",
  },
  description: {
    en: "KAPTAAN 804 is a Karachi storefront for Eagle Delay Spray and other personal-care products, with WhatsApp ordering and cash on delivery.",
    ur: "کپتان ۸۰۴ کراچی میں ایگل ڈیلے اسپرے اور ذاتی دیکھ بھال کی مصنوعات کا اسٹور ہے — آرڈر واٹس ایپ پر، ادائیگی کیش آن ڈیلیوری۔",
  },
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://www.kaptaan804.com",
  locale: "en_PK",
  currency: "PKR",
  currencySymbol: "Rs. ",
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "923102201180",
  whatsappDisplay: "0310 220 1180",
  city: "Karachi, Pakistan",
  announcement: {
    en: "Karachi same-day free delivery · Cash on delivery · Discreet packing · 18+",
    ur: "کراچی بھر میں فری اور اسی دن ڈیلیوری · کیش آن ڈیلیوری · ڈسکریٹ پیکنگ · ۱۸+",
  },
  deliveryNote: {
    en: "Karachi delivery is advertised as free and same-day, depending on order time and rider availability. Confirm the slot on WhatsApp before you send the order.",
    ur: "کراچی میں فری اور اسی دن ڈیلیوری آرڈر کے وقت اور ڈیلیوری کی دستیابی کے مطابق ہوتی ہے۔ واٹس ایپ پر سلاٹ کنفرم کریں۔",
  },
  ageNote: {
    en: "For adult men aged 18 and over only.",
    ur: "صرف ۱۸ سال یا اس سے زیادہ عمر کے بالغ مردوں کے لیے۔",
  },
} as const;

export const navLinks = [
  { href: "/", key: "home" as const },
  { href: "/products", key: "shop" as const },
  { href: "/videos", key: "videos" as const },
  { href: "/faq", key: "faq" as const },
  { href: "/contact", key: "contact" as const },
];
