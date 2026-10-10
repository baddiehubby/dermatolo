import type { MetadataRoute } from "next";
import { categoriesWithProducts, products } from "@/data/products";
import { site } from "@/data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/products", "/videos", "/faq", "/contact", "/about", "/shipping", "/privacy", "/terms"].map(
    (path) => ({
      url: `${site.url}${path || "/"}`,
      lastModified: new Date(),
    }),
  );

  const productRoutes = products.map((product) => ({
    url: `${site.url}/products/${product.slug}`,
    lastModified: new Date(),
  }));

  const collectionRoutes = categoriesWithProducts().map((category) => ({
    url: `${site.url}/collections/${category.handle}`,
    lastModified: new Date(),
  }));

  return [...staticRoutes, ...productRoutes, ...collectionRoutes];
}
