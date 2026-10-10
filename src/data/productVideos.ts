import type { ProductVideo } from "@/lib/types";
import { extractTikTokId } from "@/lib/tiktok";

/**
 * Add official TikTok video URLs or authorized hosted files here.
 *
 * Example:
 * {
 *   id: "eagle-demo-1",
 *   productSlug: "eagle-delay-spray",
 *   tiktokUrl: "https://www.tiktok.com/@account/video/1234567890",
 *   creatorName: "Account name if verified",
 *   description: { en: "Short factual caption", ur: "مختصر تفصیل" },
 *   poster: "/images/product/hero.jpg",
 *   nativeVideoUrl: "",
 *   featured: true,
 *   order: 1,
 *   kind: "demonstration",
 * }
 *
 * Do not paste a TikTok profile URL. Copy the link from a single video:
 * TikTok → Share → Copy link. The URL must contain /video/{id}.
 * Set productSlug to a slug from src/data/products.ts, for example eagle-delay-spray.
 */
export const productVideos: ProductVideo[] = [];

export function configuredVideos() {
  return productVideos
    .filter((video) => extractTikTokId(video.tiktokUrl) || video.nativeVideoUrl)
    .sort((a, b) => a.order - b.order);
}

export function videosForProduct(slug: string) {
  return configuredVideos().filter((video) => video.productSlug === slug);
}

export function featuredVideos() {
  const featured = configuredVideos().filter((video) => video.featured);
  return featured.length > 0 ? featured : configuredVideos();
}
