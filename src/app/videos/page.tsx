import type { Metadata } from "next";
import { VideoShowcase } from "@/components/video-showcase";

export const metadata: Metadata = {
  title: "Product videos",
  description: "Product videos for KAPTAAN 804 appear here when official TikTok links are added.",
  alternates: { canonical: "/videos" },
};

export default function VideosPage() {
  return <VideoShowcase />;
}
