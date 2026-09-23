import type { MetadataRoute } from "next";
import { site, areas } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${site.url}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${site.url}/areas/`, changeFrequency: "monthly", priority: 0.8 },
    ...areas.map((a) => ({
      url: `${site.url}/areas/${a.slug}/`,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    })),
  ];
}
