import { waLink, WHATSAPP_MESSAGE } from "./site";

export function buildWhatsAppUrl(message: string): string {
  return waLink(message);
}

export function orderUrl(message: string = WHATSAPP_MESSAGE): string {
  return waLink(message);
}

/** Kept for admin/reviews UI if enabled; storefront does not show reviews. */
export function reviewHref(): string {
  return waLink(`Hi, I want to share feedback about ${WHATSAPP_MESSAGE.includes("MONEY") ? "MONEY perfume" : "my order"}.`);
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
