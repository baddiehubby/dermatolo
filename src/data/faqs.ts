import type { Localized } from "@/lib/types";

export const faqs: { question: Localized; answer: Localized }[] = [
  {
    question: { en: "How do I place an order?", ur: "آرڈر کیسے کروں؟" },
    answer: {
      en: "Choose a product and quantity, then tap Order on WhatsApp. A message opens with the product name, price, and quantity. The request is sent only after you press send.",
      ur: "مصنوعات اور تعداد منتخب کریں، پھر واٹس ایپ پر آرڈر دبائیں۔ پیغام میں نام، قیمت اور تعداد کھلتی ہے۔ درخواست تب جاتی ہے جب آپ خود بھیجیں۔",
    },
  },
  {
    question: { en: "Do I pay on this website?", ur: "کیا ادائیگی ویب سائٹ پر ہوتی ہے؟" },
    answer: {
      en: "No. This site does not take card or online payment. Confirm payment and cash on delivery with the business on WhatsApp.",
      ur: "نہیں۔ اس سائٹ پر کارڈ یا آن لائن ادائیگی نہیں۔ ادائیگی اور کیش آن ڈیلیوری واٹس ایپ پر کنفرم کریں۔",
    },
  },
  {
    question: { en: "What about delivery charges and timing?", ur: "ڈیلیوری چارجز اور وقت؟" },
    answer: {
      en: "Karachi delivery is listed as free and same-day, depending on order time and rider availability. Confirm the slot on WhatsApp before you send the order.",
      ur: "کراچی میں فری اور اسی دن ڈیلیوری آرڈر کے وقت اور دستیابی کے مطابق ہے۔ آرڈر بھیجنے سے پہلے واٹس ایپ پر سلاٹ کنفرم کریں۔",
    },
  },
  {
    question: { en: "How should I use a product?", ur: "استعمال کیسے کروں؟" },
    answer: {
      en: "Follow the directions printed on that product’s label. This website is not medical advice.",
      ur: "ہر پروڈکٹ کے لیبل پر لکھی ہدایت پر عمل کریں۔ یہ ویب سائٹ طبی مشورہ نہیں ہے۔",
    },
  },
];
