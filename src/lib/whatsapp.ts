import { site } from "@/data/site";
import { formatPKR } from "@/lib/format";
import { t } from "@/lib/i18n";
import type { CartItem, Locale, Product, ProductVariant } from "@/lib/types";

export function whatsappNumber() {
  return site.whatsappNumber.replace(/\D/g, "");
}

export function buildWhatsAppUrl(message: string) {
  return `https://wa.me/${whatsappNumber()}?text=${encodeURIComponent(message)}`;
}

export function buildWhatsAppFallbackUrl(message: string) {
  return `https://api.whatsapp.com/send?phone=${whatsappNumber()}&text=${encodeURIComponent(message)}`;
}

export function productOrderMessage(
  product: Product,
  quantity: number,
  variant?: ProductVariant,
  locale: Locale = "en",
) {
  const selected = variant ?? product.variants[0];
  const unit = selected?.price ?? product.price;
  const total = unit * quantity;
  const variantTitle = selected ? t(selected.title, locale) : "";
  const variantLine =
    selected && variantTitle && variantTitle !== "Standard" && variantTitle !== "اسٹینڈرڈ"
      ? locale === "ur"
        ? `آپشن: ${variantTitle}\n`
        : `Option: ${variantTitle}\n`
      : "";

  if (locale === "ur") {
    return `السلام علیکم، میں ${t(product.name, locale)} آرڈر کرنا چاہتا ہوں۔

پروڈکٹ: ${t(product.name, locale)}
${variantLine}قیمت: ${formatPKR(unit)}
مقدار: ${quantity}
سب ٹوٹل: ${formatPKR(total)}

براہِ کرم دستیابی اور ڈیلیوری چارجز کنفرم کریں۔`;
  }

  return `Assalam-o-Alaikum! I would like to order:

Product: ${t(product.name, locale)}
${variantLine}Price: ${formatPKR(unit)}
Quantity: ${quantity}
Subtotal: ${formatPKR(total)}

Please confirm availability and delivery charges.`;
}

export function cartOrderMessage(items: CartItem[], locale: Locale = "en") {
  const merchandise = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (locale === "ur") {
    const lines = items.map((item, index) => {
      const option =
        item.variantTitle && item.variantTitle !== "Standard" && item.variantTitle !== "اسٹینڈرڈ"
          ? ` (${item.variantTitle})`
          : "";
      return `${index + 1}. ${item.name}${option}
   مقدار: ${item.quantity} × ${formatPKR(item.price)} = ${formatPKR(item.price * item.quantity)}`;
    });
    return `السلام علیکم، میں یہ آرڈر کرنا چاہتا ہوں:

${lines.join("\n")}

سب ٹوٹل: ${formatPKR(merchandise)}

براہِ کرم دستیابی اور ڈیلیوری چارجز کنفرم کریں۔`;
  }

  const lines = items.map((item, index) => {
    const option =
      item.variantTitle && item.variantTitle !== "Standard"
        ? ` (${item.variantTitle})`
        : "";
    return `${index + 1}. ${item.name}${option}
   Qty: ${item.quantity} × ${formatPKR(item.price)} = ${formatPKR(item.price * item.quantity)}`;
  });

  return `Assalam-o-Alaikum! I would like to order:

${lines.join("\n")}

Subtotal: ${formatPKR(merchandise)}

Please confirm availability and delivery charges.`;
}

export function generalEnquiryMessage(locale: Locale = "en") {
  if (locale === "ur") {
    return `السلام علیکم، مجھے ${site.productNameUr} کے بارے میں معلومات درکار ہیں۔`;
  }
  return `Assalam-o-Alaikum, I would like information about ${site.productName} and KAPTAAN 804 products.`;
}
