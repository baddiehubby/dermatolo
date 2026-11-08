import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  if (!site.url) return [];

  const lastModified = new Date();
  const paths = ["/", "/shop", "/11-11", "/about", "/faq", "/privacy", "/terms"] as const;

  return paths.map((path, index) => ({
    url: `${site.url}${path === "/" ? "/" : path}`,
    lastModified,
    changeFrequency: path === "/" || path === "/11-11" ? "daily" : "weekly",
    priority: index === 0 ? 1 : path === "/shop" || path === "/11-11" ? 0.9 : 0.6,
  }));
}
