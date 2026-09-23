import { site, areas } from "./site";

// MedicalClinic schema - honest, no fake ratings.
export function clinicJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "MedicalClinic",
    name: site.name,
    url: site.url,
    telephone: site.phoneDisplay,
    medicalSpecialty: ["Dermatology", "PainManagement"],
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address,
      addressLocality: "Karachi",
      addressCountry: "PK",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ],
        opens: "17:00",
        closes: "21:00",
      },
    ],
    areaServed: areas.map((a) => ({
      "@type": "Place",
      name: `${a.name}, Karachi`,
    })),
  };
}

export function faqJsonLd(items: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function breadcrumbJsonLd(trail: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((t, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: t.name,
      item: `${site.url}${t.path}`,
    })),
  };
}
