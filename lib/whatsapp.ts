import {
  BOTTLE_ML,
  DELIVERY_NOTE,
  formatPrice,
  PRICE,
  PRODUCT_NAME,
  waLink,
  WHATSAPP_MESSAGE,
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

export function orderWhatsAppUrl(draft: OrderDraft): string {
  return waLink(buildOrderMessage(draft));
}

export function reviewHref(): string {
  return waLink(`Hi, I want to share feedback about ${PRODUCT_NAME}.`);
}

export function openWhatsApp(url: string) {
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.target = "_blank";
  anchor.rel = "noopener noreferrer";
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
}
