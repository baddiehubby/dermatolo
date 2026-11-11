import {
  BOTTLE_ML,
  DELIVERY_NOTE,
  formatPrice,
  PRICE,
  PRODUCT_NAME,
  waLink,
  WHATSAPP_MESSAGE,
  WHATSAPP_NUMBER,
} from "./site";

export type OrderDraft = {
  quantity: number;
  customerName?: string;
  deliveryAddress?: string;
  contactNumber?: string;
};

export function buildWhatsAppUrl(message: string): string {
  return waLink(message);
}

export function orderUrl(message: string = WHATSAPP_MESSAGE): string {
  return waLink(message);
}

/** Build a pre-filled WhatsApp order message with verified product facts. */
export function buildOrderMessage(draft: OrderDraft): string {
  const qty = Math.min(99, Math.max(1, Math.floor(draft.quantity) || 1));
  const subtotal = qty * PRICE;
  const name = draft.customerName?.trim() || "________________";
  const address = draft.deliveryAddress?.trim() || "________________";
  const contact = draft.contactNumber?.trim() || "________________";

  return [
    `Hi, I want to order ${PRODUCT_NAME}.`,
    "",
    `Product: ${PRODUCT_NAME}`,
    `Bottle: ${BOTTLE_ML} ml`,
    `Unit price: ${formatPrice(PRICE)}`,
    `Quantity: ${qty}`,
    `Product subtotal: ${formatPrice(subtotal)}`,
    `${DELIVERY_NOTE} (delivery charged separately)`,
    "",
    `Customer name: ${name}`,
    `Delivery address: ${address}`,
    `Contact number: ${contact}`,
  ].join("\n");
}

/** Single entry for order CTAs — always wa.me + encodeURIComponent. */
export function orderWhatsAppUrl(draft: OrderDraft = { quantity: 1 }): string {
  return waLink(buildOrderMessage(draft));
}

export function reviewHref(): string {
  return waLink(`Hi, I want to share feedback about ${PRODUCT_NAME}.`);
}

/** TikTok / Instagram / Facebook and similar WebViews often break target=_blank. */
export function isLikelyInAppBrowser(ua: string = typeof navigator !== "undefined" ? navigator.userAgent : ""): boolean {
  return /FBAN|FBAV|Instagram|Line\/|Twitter|TikTok|BytedanceWebview|ByteLocale|musical_ly|Snapchat|Pinterest|LinkedInApp|MicroMessenger|GSA\//i.test(
    ua,
  );
}

/**
 * Navigate to WhatsApp from a direct user gesture.
 * Same-tab assign avoids popup blockers and in-app browsers that ignore target=_blank / window.open.
 */
export function navigateToWhatsApp(url: string): void {
  if (typeof window === "undefined") return;
  window.location.assign(url);
}

/** @deprecated Prefer navigateToWhatsApp — synthetic target=_blank clicks get blocked. */
export function openWhatsApp(url: string) {
  navigateToWhatsApp(url);
}

export function decodeWaMessage(url: string): string | null {
  try {
    const text = new URL(url).searchParams.get("text");
    return text;
  } catch {
    return null;
  }
}

export function assertWaCheckoutUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    const digits = WHATSAPP_NUMBER.replace(/\D/g, "");
    return (
      parsed.protocol === "https:" &&
      parsed.hostname === "wa.me" &&
      parsed.pathname === `/${digits}` &&
      Boolean(parsed.searchParams.get("text"))
    );
  } catch {
    return false;
  }
}
