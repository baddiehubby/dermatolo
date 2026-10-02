import { contact, formatPkr, orderTotalPkr, product } from "./product";

export function buildWhatsAppUrl(message: string): string {
  return `https://wa.me/${contact.whatsappE164}?text=${encodeURIComponent(message)}`;
}

export const defaultOrderDraft = `السلام علیکم، مجھے ${product.name} آرڈر کرنا ہے۔

نام:
موبائل:
مکمل پتہ:
کراچی کا علاقہ:
مقدار:

براہِ کرم میرا آرڈر کنفرم کر دیں۔`;

export const enquirePriceMessage = `السلام علیکم، مجھے ${product.name} کی موجودہ قیمت اور کراچی ڈیلیوری کی معلومات درکار ہیں۔`;

export const infoMessage = `السلام علیکم، مجھے ${product.name} کے بارے میں معلومات درکار ہیں۔`;

export function orderUrl(message: string = defaultOrderDraft): string {
  return buildWhatsAppUrl(message);
}

export function priceEnquireUrl(): string {
  return buildWhatsAppUrl(enquirePriceMessage);
}

export function infoUrl(): string {
  return buildWhatsAppUrl(infoMessage);
}

export type OrderDetails = {
  name: string;
  phone: string;
  address: string;
  area: string;
  quantity: number;
};

export function buildFilledOrderMessage(details: OrderDetails): string {
  const total = orderTotalPkr(details.quantity);
  const totalLine =
    total === null
      ? `ادائیگی: ${product.paymentUrdu}`
      : `کل رقم: ${formatPkr(total)} (${product.paymentUrdu})`;
  return `السلام علیکم، مجھے ${product.name} آرڈر کرنا ہے۔

نام: ${details.name}
موبائل: ${details.phone}
مکمل پتہ: ${details.address}
کراچی کا علاقہ: ${details.area}
مقدار: ${details.quantity}
${totalLine}

براہِ کرم میرا آرڈر کنفرم کر دیں۔`;
}

export function filledOrderUrl(details: OrderDetails): string {
  return buildWhatsAppUrl(buildFilledOrderMessage(details));
}

/** Call from a click or submit handler. Keeps the page open and avoids window.open. */
export function openWhatsApp(url: string) {
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.target = "_blank";
  anchor.rel = "noopener noreferrer";
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
}
