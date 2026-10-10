import { site } from "@/data/site";

export function formatPKR(amount: number) {
  return `${site.currencySymbol}${Math.round(amount).toLocaleString("en-PK")}`;
}

export function cartItemKey(productId: string, variantId: string) {
  return `${productId}::${variantId}`;
}
