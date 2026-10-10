import { getProduct } from "@/data/products";
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

function localizedProductName(product: Product, locale: Locale) {
  return t(product.name, locale);
}

function cartLineName(item: CartItem, locale: Locale) {
  const product = getProduct(item.slug);
  const name = product ? localizedProductName(product, locale) : item.name;
  const option =
    item.variantTitle && item.variantTitle !== "Standard" && item.variantTitle !== "اسٹینڈرڈ"
      ? ` (${item.variantTitle})`
      : "";
  return `${name}${option}`;
}

export function productOrderMessage(
  product: Product,
  quantity: number,
  variant?: ProductVariant,
  locale: Locale = "en",
) {
  const selected = variant ?? product.variants[0];
  const unit = selected?.price ?? product.price;
  const variantTitle = selected ? t(selected.title, locale) : "";
  const variantLine =
    selected && variantTitle && variantTitle !== "Standard" && variantTitle !== "اسٹینڈرڈ"
      ? locale === "ur"
        ? `آپشن: ${variantTitle}\n`
        : `Option: ${variantTitle}\n`
      : "";

  const priceLine =
    locale === "ur"
      ? `قیمت: ${Math.round(unit).toLocaleString("en-PK")} روپے\n`
      : `Price: ${formatPKR(unit)}\n`;
  const page = `${site.url}/products/${product.slug}`;

  if (locale === "ur") {
    return `السلام علیکم، میں Kaptaan804 سے ${localizedProductName(product, locale)} آرڈر کرنا چاہتا/چاہتی ہوں۔
${variantLine}مقدار: ${quantity}
${priceLine}صفحہ: ${page}
براہِ کرم دستیابی، کل قیمت اور ڈیلیوری کی تفصیلات بتا دیں۔`;
  }

  return `Hello Kaptaan804, I would like to order ${localizedProductName(product, locale)}.
${variantLine}Quantity: ${quantity}
${priceLine}Page: ${page}
Please confirm availability, total price, and delivery details.`;
}

export function cartOrderMessage(items: CartItem[], locale: Locale = "en") {
  if (locale === "ur") {
    const lines = items.map((item, index) => {
      const line = Math.round(item.price).toLocaleString("en-PK");
      return `${index + 1}. ${cartLineName(item, locale)}
مقدار: ${item.quantity}
قیمت: ${line} روپے`;
    });
    return `السلام علیکم، میں Kaptaan804 سے یہ آرڈر کرنا چاہتا/چاہتی ہوں۔
${lines.join("\n")}
براہِ کرم دستیابی، کل قیمت اور ڈیلیوری کی تفصیلات بتا دیں۔`;
  }

  const lines = items.map((item, index) => {
    return `${index + 1}. ${cartLineName(item, locale)}
Quantity: ${item.quantity}
Price: ${formatPKR(item.price)}`;
  });

  return `Hello Kaptaan804, I would like to order:
${lines.join("\n")}
Please confirm availability, total price, and delivery details.`;
}

export function generalEnquiryMessage(locale: Locale = "en") {
  if (locale === "ur") {
    return `السلام علیکم، مجھے Kaptaan804 کی مصنوعات کے بارے میں معلومات درکار ہیں۔`;
  }
  return `Hello Kaptaan804, I would like information about products on Kaptaan804.com.`;
}
