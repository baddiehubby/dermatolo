"use client";

import Image from "next/image";
import { useEffect, useRef, useSyncExternalStore } from "react";
import { extractTikTokId } from "@/lib/tiktok";

function subscribe() {
  return () => {};
}

function isLocalhost() {
  const host = window.location.hostname;
  return host === "localhost" || host === "127.0.0.1";
}

export function TikTokEmbed({
  url,
  title,
  poster,
  nativeVideoUrl,
  active,
}: {
  url: string;
  title: string;
  poster?: string;
  nativeVideoUrl?: string;
  active?: boolean;
}) {
  const id = extractTikTokId(url);
  const local = useSyncExternalStore(subscribe, isLocalhost, () => true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const reduced =
    typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const allowIframe = Boolean(id) && !local && Boolean(active);

  useEffect(() => {
    if (!id) return;
    const src = "https://www.tiktok.com/embed.js";
    if (document.querySelector(`script[src="${src}"]`)) return;
    const script = document.createElement("script");
    script.src = src;
    script.async = true;
    document.body.appendChild(script);
  }, [id]);

  useEffect(() => {
    const node = videoRef.current;
    if (!node) return;
    if (active && !reduced) {
      node.play().catch(() => undefined);
    } else {
      node.pause();
    }
  }, [active, reduced]);

  if (nativeVideoUrl) {
    return (
      <div className="relative aspect-[9/16] overflow-hidden bg-black">
        <video
          ref={videoRef}
          src={nativeVideoUrl}
          poster={poster}
          muted
          loop
          playsInline
          controls
          preload="metadata"
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>
    );
  }

  if (!id) {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="flex aspect-[9/16] items-center justify-center bg-[#111113] px-6 text-center text-sm text-[#f3eee4]"
      >
        {title}
      </a>
    );
  }

  return (
    <div className="relative aspect-[9/16] overflow-hidden bg-[#111113]">
      {allowIframe ? (
        <iframe
          src={`https://www.tiktok.com/embed/v2/${id}`}
          title={title}
          className="absolute inset-0 h-full w-full"
          allow="encrypted-media; fullscreen; picture-in-picture; accelerometer; autoplay"
          loading="lazy"
          referrerPolicy="strict-origin-when-cross-origin"
        />
      ) : (
        <>
          {poster ? (
            <Image src={poster} alt={title} fill sizes="360px" className="object-cover" />
          ) : null}
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute inset-0 flex flex-col items-center justify-center bg-black/35 p-4 text-center text-white"
          >
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white/90 text-2xl text-[#070708]">
              ▶
            </span>
            <span className="mt-3 text-sm font-semibold">{title}</span>
          </a>
        </>
      )}
    </div>
  );
}
