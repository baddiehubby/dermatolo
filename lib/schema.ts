import { faqs } from "./content";
import { contact, hasConfirmedPrice, product, site } from "./product";

export function productJsonLd() {
  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    alternateName: product.nameUrdu,
    brand: {
      "@type": "Brand",
      name: product.brand,
    },
    description: site.description,
    category: "Personal Care",
    audience: {
      "@type": "PeopleAudience",
      suggestedMinAge: 18,
    },
    areaServed: {
      "@type": "City",
      name: "Karachi",
      containedInPlace: {
        "@type": "Country",
        name: "Pakistan",
      },
    },
  };

  if (site.url) {
    data.url = site.url;
    data.image = [`${site.url}${product.images.og}`];
  }

  if (hasConfirmedPrice(product.pricePkr)) {
    const offer: Record<string, unknown> = {
      "@type": "Offer",
      price: product.pricePkr,
      priceCurrency: product.currency,
      availability: "https://schema.org/InStock",
      acceptedPaymentMethod: "http://purl.org/goodrelations/v1#COD",
      seller: {
        "@type": "Organization",
        name: product.name,
      },
      areaServed: {
        "@type": "City",
        name: "Karachi",
      },
    };
    if (site.url) offer.url = site.url;
    data.offers = offer;
  }

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

export function organizationJsonLd() {
  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: product.name,
    telephone: `+${contact.whatsappE164}`,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Karachi",
      addressRegion: "Sindh",
      addressCountry: "PK",
    },
  };
  if (site.url) data.url = site.url;
  return data;
}
