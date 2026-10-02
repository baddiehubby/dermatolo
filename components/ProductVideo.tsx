"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { product } from "@/lib/product";

const caption = `${product.artworkNote} — طریقۂ استعمال کی عام تصویر`;
const videoLabel =
  "ایگل ڈیلے اسپرے کی برانڈ آرٹ ورک، طریقۂ استعمال کی عام تصویر۔ یہ طبی مظاہرہ یا نتیجے کی ضمانت نہیں۔";

export function ProductVideo() {
  const src = product.video.src;
  const webm = product.video.webm;
  const poster = product.images.demoPoster ?? product.images.hero;

  const rootRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [reduced, setReduced] = useState<boolean | null>(null);
  const [near, setNear] = useState(false);
  const [failed, setFailed] = useState(false);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (reduced !== false || !src) return;
    const node = rootRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setNear(true);
          observer.disconnect();
        }
      },
      { rootMargin: "240px 0px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [reduced, src]);

  const showVideo = Boolean(src) && reduced === false && near && !failed;

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !showVideo || !src) return;
    video.muted = true;
    video.load();
    const pending = video.play();
    if (pending) pending.catch(() => setPlaying(false));
  }, [showVideo, src]);

  function togglePlayback() {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      const pending = video.play();
      if (pending) pending.catch(() => setPlaying(false));
    } else {
      video.pause();
    }
  }

  return (
    <figure className="surface-card mb-6 overflow-hidden rounded-[1.75rem]">
      <div ref={rootRef} className="relative aspect-video w-full max-w-full bg-ink">
        <Image src={poster} alt="" fill sizes="(min-width: 1152px) 1120px, 100vw" className="object-cover" />
        {showVideo && src ? (
          <video
            ref={videoRef}
            className="absolute inset-0 h-full w-full object-cover"
            muted
            loop
            playsInline
            autoPlay
            poster={poster}
            preload="none"
            aria-label={videoLabel}
            onError={() => setFailed(true)}
            onPlay={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
          >
            {webm ? <source src={webm} type="video/webm" /> : null}
            <source src={src} type="video/mp4" />
          </video>
        ) : null}
        {showVideo ? (
          <button
            type="button"
            onClick={togglePlayback}
            aria-label={playing ? "روکیں" : "چلائیں"}
            className="absolute top-3 end-3 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-gold/40 bg-black/55 text-gold-light"
          >
            {playing ? <PauseMark /> : <PlayMark />}
          </button>
        ) : null}
      </div>
      <figcaption className="px-5 py-4 text-sm leading-7 text-mist md:px-7">{caption}</figcaption>
    </figure>
  );
}

function PlayMark() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden>
      <path fill="currentColor" d="M8 5.5v13l11-6.5-11-6.5z" />
    </svg>
  );
}

function PauseMark() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden>
      <path fill="currentColor" d="M6 5h4v14H6V5zm8 0h4v14h-4V5z" />
    </svg>
  );
}
