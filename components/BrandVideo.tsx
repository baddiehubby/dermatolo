"use client";

import { useEffect, useId, useRef, useState, type CSSProperties } from "react";

/** Dispatched when an audible BrandVideo begins playback — peers pause so only one has voice. */
const BRAND_VIDEO_AUDIO_PLAY = "brand-video-audio-play";

type BrandVideoProps = {
  /** MP4 path under /public, e.g. "/videos/money-hero.mp4". Null = poster only. */
  src?: string | null;
  /** Poster image path. Null = CSS placeholder. */
  poster?: string | null;
  /** Accessible label for the video. */
  label: string;
  /** Aspect ratio CSS value, default 16 / 9. */
  aspectRatio?: string;
  className?: string;
  /** Optional caption strip under the frame (atmosphere gallery). */
  caption?: string;
  /**
   * Audible / voice-on mode (intro + cinema films).
   * Browsers block unmuted autoplay — starts on poster with Play / Tap for sound.
   * User gesture starts playback with muted=false. Pure atmosphere loops leave this false.
   */
  withAudio?: boolean;
  /** Alias of withAudio. */
  audible?: boolean;
};

/**
 * Brand video.
 * - Default: lazy muted looping atmosphere (IntersectionObserver).
 * - withAudio / audible: click-to-play with sound (no unmuted autoplay).
 * - prefers-reduced-motion → static poster / placeholder (no autoplay).
 * - Only one audible BrandVideo plays at a time (peers pause on start).
 */
export function BrandVideo({
  src = null,
  poster = null,
  label,
  aspectRatio = "16 / 9",
  className = "",
  caption,
  withAudio = false,
  audible = false,
}: BrandVideoProps) {
  const wantsAudio = withAudio || audible;
  const instanceId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [reduced, setReduced] = useState<boolean | null>(null);
  const [near, setNear] = useState(false);
  const [failed, setFailed] = useState(false);
  const [started, setStarted] = useState(false);
  const [playing, setPlaying] = useState(false);

  const claimExclusiveAudio = () => {
    window.dispatchEvent(
      new CustomEvent(BRAND_VIDEO_AUDIO_PLAY, { detail: { id: instanceId } }),
    );
  };

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (!wantsAudio) return;
    const onPeerPlay = (event: Event) => {
      const peerId = (event as CustomEvent<{ id: string }>).detail?.id;
      if (!peerId || peerId === instanceId) return;
      const video = videoRef.current;
      if (video && !video.paused) {
        video.pause();
        setPlaying(false);
      }
    };
    window.addEventListener(BRAND_VIDEO_AUDIO_PLAY, onPeerPlay);
    return () => window.removeEventListener(BRAND_VIDEO_AUDIO_PLAY, onPeerPlay);
  }, [wantsAudio, instanceId]);

  useEffect(() => {
    if (reduced !== false || !src || wantsAudio) return;
    const node = rootRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setNear(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px 0px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [reduced, src, wantsAudio]);

  const showMutedLoop =
    Boolean(src) && reduced === false && near && !failed && !wantsAudio;

  const showAudibleVideo =
    Boolean(src) && reduced === false && !failed && wantsAudio;

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !showMutedLoop || !src) return;
    video.muted = true;
    video.load();
    const pending = video.play();
    if (pending) pending.catch(() => undefined);
  }, [showMutedLoop, src]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !showAudibleVideo || !src || !started) return;
    claimExclusiveAudio();
    video.muted = false;
    const pending = video.play();
    if (pending) {
      pending
        .then(() => setPlaying(true))
        .catch(() => {
          // If unmuted play fails, fall back to muted so motion still works.
          video.muted = true;
          video.play().then(() => setPlaying(true)).catch(() => undefined);
        });
    }
    // claimExclusiveAudio is stable per instanceId; intentionally omit from deps
    // eslint-disable-next-line react-hooks/exhaustive-deps -- run when audible playback is requested
  }, [showAudibleVideo, src, started]);

  const startWithSound = () => {
    if (!src || reduced) return;
    setStarted(true);
  };

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video || !started) {
      startWithSound();
      return;
    }
    if (video.paused) {
      claimExclusiveAudio();
      video.muted = false;
      video.play().then(() => setPlaying(true)).catch(() => undefined);
    } else {
      video.pause();
      setPlaying(false);
    }
  };

  const frameStyle: CSSProperties | undefined =
    aspectRatio === "auto" ? undefined : { aspectRatio };

  return (
    <figure className={caption ? "space-y-3" : "contents"}>
      <div
        ref={rootRef}
        className={`relative w-full overflow-hidden bg-ink-200 ring-1 ring-gold/15 ${className}`}
        style={frameStyle}
      >
        {poster ? (
          // eslint-disable-next-line @next/next/no-img-element -- static poster; may be absent until assets land
          <img
            src={poster}
            alt=""
            aria-hidden
            className="absolute inset-0 h-full w-full object-cover"
          />
        ) : (
          <LuxuryPlate />
        )}

        {showMutedLoop && src ? (
          <video
            ref={videoRef}
            className="absolute inset-0 h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster={poster ?? undefined}
            aria-label={label}
            onError={() => setFailed(true)}
          >
            <source src={src} type="video/mp4" />
          </video>
        ) : null}

        {showAudibleVideo && src ? (
          <video
            ref={videoRef}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
              started ? "opacity-100" : "opacity-0"
            }`}
            playsInline
            preload="metadata"
            poster={poster ?? undefined}
            controls={started}
            controlsList="nodownload"
            aria-label={label}
            onPlay={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
            onEnded={() => setPlaying(false)}
            onError={() => setFailed(true)}
          >
            <source src={src} type="video/mp4" />
          </video>
        ) : null}

        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/55 via-transparent to-ink/20"
          aria-hidden
        />

        {wantsAudio && reduced === false && src && !failed && (!started || !playing) ? (
          <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center p-4 pb-28 md:pb-36">
            {!started ? (
              <button
                type="button"
                onClick={startWithSound}
                className="group pointer-events-auto flex flex-col items-center gap-3 rounded-sm border border-gold/45 bg-ink/70 px-6 py-5 text-center shadow-[0_12px_40px_rgba(0,0,0,0.45)] backdrop-blur-md transition hover:border-gold hover:bg-ink/85 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
                aria-label={`Play ${label} with sound`}
              >
                <span className="flex h-14 w-14 items-center justify-center rounded-full border border-gold/50 bg-gold/15 text-gold-light transition group-hover:bg-gold/25">
                  <PlayIcon />
                </span>
                <span className="font-display text-sm tracking-[0.28em] text-ivory uppercase">
                  Tap for sound
                </span>
                <span className="max-w-[14rem] text-[0.7rem] leading-relaxed tracking-wide text-mist/80">
                  Voice on after you press play — browsers block unmuted autoplay.
                </span>
              </button>
            ) : (
              <button
                type="button"
                onClick={togglePlay}
                className="pointer-events-auto flex h-14 w-14 items-center justify-center rounded-full border border-gold/50 bg-ink/75 text-gold-light backdrop-blur-md transition hover:bg-ink/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
                aria-label={`Resume ${label}`}
              >
                <PlayIcon />
              </button>
            )}
          </div>
        ) : null}

        <span className="sr-only">{label}</span>
      </div>
      {caption ? (
        <figcaption className="text-center text-xs tracking-[0.22em] uppercase text-mist/70">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}

function PlayIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M8.2 5.4c-.5-.3-1.2 0-1.2.6v12c0 .7.7 1 1.2.6l10-6c.5-.3.5-1 0-1.3l-10-5.9z" />
    </svg>
  );
}

/** Luxury brand plate when poster/src is missing — typography + gold rule + subtle texture. */
function LuxuryPlate() {
  return (
    <div className="luxury-plate absolute inset-0 flex items-center justify-center" aria-hidden>
      <div className="relative z-[1] px-8 text-center">
        <p className="font-display text-[0.7rem] tracking-[0.55em] text-gold/80">PERFUME</p>
        <div className="mx-auto my-5 h-px w-16 bg-gradient-to-r from-transparent via-gold to-transparent" />
        <p className="font-display text-3xl tracking-[0.42em] text-gold-light md:text-4xl">MONEY</p>
        <div className="mx-auto my-5 h-px w-16 bg-gradient-to-r from-transparent via-gold to-transparent" />
        <p className="text-[0.65rem] tracking-[0.35em] text-mist/55">PAKISTAN</p>
      </div>
    </div>
  );
}
