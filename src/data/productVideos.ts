import type { ProductVideo } from "@/lib/types";
import { extractTikTokId } from "@/lib/tiktok";

/**
 * Add official TikTok video URLs or authorized hosted files here.
 *
 * Example:
 * {
 *   id: "minoxidil-1",
 *   productSlug: "your-product-slug",
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
 * Do not paste a profile URL. Use /video/{id} links only.
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
