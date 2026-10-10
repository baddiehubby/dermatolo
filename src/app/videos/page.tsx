import type { Metadata } from "next";
import { VideoShowcase } from "@/components/video-showcase";

export const metadata: Metadata = {
  title: "Product videos",
  description: "Watch KAPTAAN 804 product videos and order the matching item on WhatsApp.",
  alternates: { canonical: "/videos" },
};

export default function VideosPage() {
  return <VideoShowcase />;
}
