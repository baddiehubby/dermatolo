import {
  BOTTLE_ML,
  BRAND,
  CURRENCY,
  DELIVERY_NOTE,
  faqs,
  formatPrice,
  PRICE,
  PRODUCT_NAME,
  site,
  WHATSAPP_NUMBER,
} from "./site";

function absUrl(path: string): string {
  if (!site.url) return path;
  return `${site.url}${path.startsWith("/") ? path : `/${path}`}`;
}

export function organizationJsonLd() {
  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: BRAND,
    description: `${PRODUCT_NAME} — ${site.tagline}`,
    telephone: WHATSAPP_NUMBER.includes("X") ? undefined : `+${WHATSAPP_NUMBER}`,
    areaServed: {
      "@type": "Country",
      name: "Pakistan",
    },
  };
  if (site.url) data.url = site.url;
  if (!data.telephone) delete data.telephone;
  return data;
}

export function productJsonLd(pagePath: "/shop" | "/11-11" | "/" = "/shop") {
  const offerUrl = site.url ? absUrl(pagePath === "/" ? "/shop" : pagePath) : pagePath === "/" ? "/shop" : pagePath;

  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: PRODUCT_NAME,
    brand: {
      "@type": "Brand",
      name: BRAND,
    },
    description: `${PRODUCT_NAME}. ${site.tagline} Unisex perfume, ${BOTTLE_ML} ml. Price ${formatPrice()}. ${DELIVERY_NOTE}. Order on WhatsApp.`,
    category: "Perfume",
    size: `${BOTTLE_ML} ml`,
    image: [absUrl(site.ogImage)],
    offers: {
      "@type": "Offer",
      price: PRICE,
      priceCurrency: CURRENCY,
      availability: "https://schema.org/InStock",
      url: offerUrl,
      seller: {
        "@type": "Organization",
        name: BRAND,
      },
      areaServed: {
        "@type": "Country",
        name: "Pakistan",
      },
      // Shipping rate is confirmed on WhatsApp — do not invent a fixed delivery price in schema.
    },
  };
  if (site.url) data.url = offerUrl;
  return data;
}

export function faqJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: site.url ? absUrl(item.path) : item.path,
    })),
  };
}
