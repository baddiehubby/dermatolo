# MONEY video assets

Wired in `lib/site.ts` → `site.videos.intro` / `hero` / `product` / `atmosphere`.

## Current files

| Role | Video | Poster | Source |
|------|--------|--------|--------|
| Intro (primary, voice-on) | `/public/videos/money-intro.mp4` | `/public/videos/posters/money-intro.jpg` | `C:\Users\Dell\Desktop\yt\YTShort_02Nov2026_11_29_34.mp4` |
| Home hero | same as intro | same as intro | Desktop `yt` folder |
| Shop product | `/public/videos/money-product.mp4` | `/public/videos/posters/money-product.jpg` | Eagle Delay Spray short (muted loop) |
| Gallery / atmosphere | `/public/videos/money-atmosphere.mp4` | `/public/videos/posters/money-atmosphere.jpg` | Eagle Delay Spray short (muted loop) |

## Audio / autoplay policy

Browsers **block unmuted autoplay**. The intro uses `BrandVideo` with `withAudio` / `audible`:

1. Poster + “Tap for sound” / Play control (no audio on load).
2. User tap starts playback with `muted=false` (voice on).
3. `prefers-reduced-motion: reduce` → poster only, no autoplay.
4. `playsInline` kept for iOS.

Atmosphere / product clips stay **muted looping** by default.

## Leftover (not referenced)

- `eagle-demo.mp4` / `eagle-demo.webm` — older demo copies.
- `money-hero.mp4` — previous hero short; replaced by intro for the homepage.

## How to swap for real MONEY files

1. Drop compressed H.264 MP4s at the paths above.
2. Extract posters: `ffmpeg -i video.mp4 -ss 00:00:01 -vframes 1 poster.jpg`.
3. Update `lib/site.ts` if filenames change.
