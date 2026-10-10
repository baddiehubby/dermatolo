import type { Product } from "@/lib/types";
import { getCategory } from "@/data/categories";

export const products: Product[] = [
  {
    id: "eagle-delay-spray",
    slug: "eagle-delay-spray",
    name: {
      en: "Eagle Delay Spray",
      ur: "ایگل ڈیلے اسپرے",
    },
    category: "personal-care",
    categories: ["personal-care"],
    price: 1300,
    compareAtPrice: null,
    available: true,
    featured: true,
    bestseller: true,
    description: {
      en: "A premium delay spray for adult men who want better control in intimate moments. Results vary. Follow the pack label.",
      ur: "بالغ مردوں کے لیے ایک پریمیم ڈیلے سپرے، قربت کے لمحات میں بہتر کنٹرول کے لیے۔ نتائج ہر شخص میں مختلف ہو سکتے ہیں۔ لیبل کی ہدایت پر عمل کریں۔",
    },
    fullDescription: {
      en: "Eagle Delay Spray is offered for adult men who want more confidence and better control in intimate moments. This is brand language, not a medical promise. Formula details are printed on the pack label. Use only as directed on the label.",
      ur: "ایگل ڈیلے اسپرے بالغ مردوں کے لیے پیش کیا گیا ہے جو قربت کے لمحات میں زیادہ اعتماد اور بہتر کنٹرول چاہتے ہیں۔ یہ برانڈ کی زبان ہے، طبی وعدہ نہیں۔ فارمولا کی تفصیل پیکنگ کے لیبل پر درج ہے۔ صرف لیبل کے مطابق استعمال کریں۔",
    },
    benefits: [],
    ingredients: [
      {
        en: "Ingredients and strength are printed on the bottle label. A verified list will be added here when it is supplied.",
        ur: "اجزاء اور ارتکاز بوتل کے لیبل پر درج ہیں۔ تصدیق شدہ فہرست دستیاب ہوتے ہی یہاں شامل کر دی جائے گی۔",
      },
    ],
    howToUse: {
      en: "Shake the bottle as the label directs. Apply the labelled amount to the intended area. Check the label for timing. More product is not a better result. Patch-test as the label instructs. Stop if you notice burning, rash, swelling, or marked irritation, and seek medical advice.",
      ur: "لیبل کی ہدایت کے مطابق بوتل ہلائیں۔ مطلوبہ جگہ پر لیبل کے مطابق مقدار لگائیں۔ وقت کے لیے لیبل دیکھیں۔ زیادہ مقدار بہتر نتیجے کی ضمانت نہیں۔ پہلی بار حساسیت چیک کریں۔ جلن، دانے یا سوجن پر استعمال بند کریں اور ڈاکٹر سے مشورہ کریں۔",
    },
    warnings: [
      {
        en: "For adult men aged 18 and over only.",
        ur: "صرف ۱۸ سال یا اس سے زیادہ عمر کے بالغ مردوں کے لیے۔",
      },
      {
        en: "Results vary from person to person.",
        ur: "نتائج ہر شخص میں مختلف ہو سکتے ہیں۔",
      },
      {
        en: "If you have an allergy, skin sensitivity, or a relevant medical condition, ask a qualified clinician before use.",
        ur: "اگر الرجی، جلد کی حساسیت، یا کوئی متعلقہ طبی مسئلہ ہو تو استعمال سے پہلے مستند طبی مشورہ لیں۔",
      },
      {
        en: "Keep out of reach of children.",
        ur: "بچوں کی پہنچ سے دور رکھیں۔",
      },
      {
        en: "This page is not medical diagnosis or treatment.",
        ur: "یہ صفحہ طبی تشخیص یا علاج نہیں ہے۔",
      },
    ],
    images: [
      {
        src: "/images/product/hero.jpg",
        alt: {
          en: "Eagle Delay Spray bottle — Kaptaan804 product photograph",
          ur: "ایگل ڈیلے اسپرے کی بوتل — برانڈ کی تصویری پیشکش",
        },
        width: 1200,
        height: 1600,
      },
      {
        src: "/images/product/closeup.jpg",
        alt: {
          en: "Close-up of Eagle Delay Spray — Kaptaan804 product photograph",
          ur: "ایگل ڈیلے اسپرے کا قریبی منظر",
        },
        width: 1200,
        height: 900,
      },
      {
        src: "/images/product/lifestyle.jpg",
        alt: {
          en: "Eagle Delay Spray in a dim room — brand photograph",
          ur: "رات کے کمرے میں ایگل ڈیلے اسپرے",
        },
        width: 1600,
        height: 1200,
      },
      {
        src: "/images/product/discreet-parcel.jpg",
        alt: {
          en: "Plain sealed discreet parcel with a faint eagle mark",
          ur: "سنہری عقاب کے ہلکے نشان والا بند سیاہ ڈسکریٹ پارسل",
        },
        width: 1600,
        height: 1200,
      },
    ],
    variants: [
      {
        id: "standard",
        title: { en: "Standard", ur: "اسٹینڈرڈ" },
        price: 1300,
        compareAtPrice: null,
        available: true,
      },
    ],
  },
];

export const productBySlug = Object.fromEntries(
  products.map((product) => [product.slug, product]),
) as Record<string, Product>;

export function getProduct(slug: string) {
  return productBySlug[slug];
}

export function getProductsByCategory(handle: string) {
  return products.filter(
    (product) => product.category === handle || product.categories.includes(handle),
  );
}

export function categoriesWithProducts() {
  return products
    .flatMap((product) => product.categories)
    .filter((handle, index, list) => list.indexOf(handle) === index)
    .map((handle) => getCategory(handle))
    .filter((category): category is NonNullable<typeof category> => Boolean(category));
}

export function searchProducts(query: string) {
  const q = query.trim().toLowerCase();
  if (!q) return products;
  return products.filter((product) => {
    const haystack = [
      product.name.en,
      product.name.ur,
      product.description.en,
      product.description.ur,
      product.category,
      ...product.categories,
    ]
      .join(" ")
      .toLowerCase();
    return haystack.includes(q);
  });
}

export function relatedProducts(slug: string, limit = 4) {
  const current = getProduct(slug);
  if (!current) return products.slice(0, limit);
  return products
    .filter((product) => product.slug !== slug)
    .sort((a, b) => {
      const aMatch = a.categories.some((c) => current.categories.includes(c)) ? 1 : 0;
      const bMatch = b.categories.some((c) => current.categories.includes(c)) ? 1 : 0;
      return bMatch - aMatch;
    })
    .slice(0, limit);
}
