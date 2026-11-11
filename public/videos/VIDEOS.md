# MONEY video assets

Wired in `lib/site.ts` → `site.videos`.

## Current files

| Role | Video | Poster | Source |
|------|--------|--------|--------|
| Intro (primary, voice-on) | `/public/videos/money-intro.mp4` | `/public/videos/posters/money-intro.jpg` | Prior Desktop `yt` short |
| Home hero | same as intro | same as intro | Desktop `yt` folder |
| Shop / product showcase | `/public/videos/money-product.mp4` | `/public/videos/posters/money-product.jpg` | Preserved (kept on disk) |
| Legacy atmosphere | `/public/videos/money-atmosphere.mp4` | `/public/videos/posters/money-atmosphere.jpg` | Preserved (kept on disk) |
| Films strip A | `/public/videos/money-cinema-a.mp4` | `/public/videos/posters/money-cinema-a.jpg` | `YTShort_11Nov2026_12_40_19.mp4` |
| Films strip B | `/public/videos/money-cinema-b.mp4` | `/public/videos/posters/money-cinema-b.jpg` | `YTShort_11Nov2026_21_03_52 (1).mp4` |

## Audio / autoplay policy

Browsers **block unmuted autoplay**. The intro uses `BrandVideo` with `withAudio` / `audible`:

1. Poster + “Tap for sound” / Play control (no audio on load).
2. User tap starts playback with `muted=false` (voice on).
3. `prefers-reduced-motion: reduce` → poster only, no autoplay.
4. `playsInline` kept for iOS.

Atmosphere / cinema clips stay **muted looping** by default.

## Leftover (not referenced by storefront)

- `eagle-demo.mp4` / `eagle-demo.webm` — older unused demo copies (safe to ignore).
- `money-hero.mp4` — previous hero short; homepage uses intro instead.
- `money-product.mp4` / `money-atmosphere.mp4` — still on disk; ProductShowcase uses product; VideoStrip now uses cinema A/B.

## How to swap for real MONEY files

1. Drop compressed H.264 MP4s at the paths above.
2. Extract posters: `ffmpeg -i video.mp4 -ss 00:00:01 -vframes 1 -update 1 poster.jpg`.
3. Update `lib/site.ts` if filenames change.
