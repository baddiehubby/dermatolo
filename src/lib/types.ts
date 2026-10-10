export type Locale = "en" | "ur";

export type Localized = {
  en: string;
  ur: string;
};

export type ProductImage = {
  src: string;
  alt: Localized;
  width: number;
  height: number;
};

export type ProductVariant = {
  id: string;
  title: Localized;
  price: number;
  compareAtPrice: number | null;
  available: boolean;
};

export type Product = {
  id: string;
  slug: string;
  name: Localized;
  category: string;
  categories: string[];
  price: number;
  compareAtPrice: number | null;
  available: boolean;
  featured: boolean;
  bestseller: boolean;
  description: Localized;
  fullDescription: Localized;
  benefits: Localized[];
  ingredients: Localized[];
  howToUse: Localized;
  warnings: Localized[];
  images: ProductImage[];
  variants: ProductVariant[];
};

export type CartItem = {
  key: string;
  productId: string;
  slug: string;
  name: string;
  variantId: string;
  variantTitle: string;
  price: number;
  quantity: number;
  image?: string;
};

export type ProductVideo = {
  id: string;
  productSlug: string;
  tiktokUrl: string;
  creatorName?: string;
  description: Localized;
  poster?: string;
  nativeVideoUrl?: string;
  featured: boolean;
  order: number;
  kind: "brand" | "demonstration" | "creator" | "customer";
};

export type Review = {
  id: string;
  name: string;
  quote: Localized;
  rating: 1 | 2 | 3 | 4 | 5;
  date?: string;
  source?: string;
};
