import type { Localized } from "@/lib/types";

export const categories: {
  handle: string;
  name: Localized;
  description: Localized;
}[] = [
  {
    handle: "personal-care",
    name: { en: "Personal care", ur: "ذاتی دیکھ بھال" },
    description: {
      en: "Adult personal-care products, including Eagle Delay Spray.",
      ur: "بالغوں کی ذاتی دیکھ بھال، بشمول ایگل ڈیلے اسپرے.",
    },
  },
  {
    handle: "hair-care",
    name: { en: "Hair care", ur: "بالوں کی دیکھ بھال" },
    description: {
      en: "Hair-care products will appear here when their details are added.",
      ur: "بالوں کی مصنوعات تفصیل شامل ہونے پر یہاں نظر آئیں گی۔",
    },
  },
  {
    handle: "skin-care",
    name: { en: "Skin care", ur: "جلد کی دیکھ بھال" },
    description: {
      en: "Skin-care products will appear here when their details are added.",
      ur: "جلد کی مصنوعات تفصیل شامل ہونے پر یہاں نظر آئیں گی۔",
    },
  },
];

export function getCategory(handle: string) {
  return categories.find((category) => category.handle === handle);
}
