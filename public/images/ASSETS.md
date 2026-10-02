# Product images

CGI brand renders live in `/public/images/product/`. They are packaging artwork, not customer photos, lab results, or clinical proof. Replace a file, keep the same path in `lib/product.ts`, and the page updates.

## `/public/images/product/`

- `hero.jpg` — full bottle, dark studio, gold eagle behind it. Hero.
- `closeup.jpg` — label and gold collar. Product card.
- `lifestyle.jpg` — empty night interior, bottle on a nightstand. No person.
- `eagle-brand.jpg` — golden eagle, brand section.
- `karachi.jpg` — bottle against dusk water and city bokeh. Delivery section and Open Graph.
- `discreet-parcel.jpg` — sealed matte black parcel with a small embossed gold eagle, dark studio, gold rim light. Privacy / discreet-delivery card in the ordering section (`images.discreetParcel`). No text, label, address, or visible product. Set the config path to `null` to hide it; the card falls back to the eagle mark.
- `demo-poster.jpg` — poster for the product film (`images.demoPoster`). Same dark bottle hero. Set the path to `null` to use `hero.jpg` instead.

Bottle lettering is Latin only: EAGLE / Delay Spray. Urdu stays in the HTML.

## Product film

Muted brand artwork, not a medical demonstration. Paths live on `video` in `lib/product.ts`.

- `/public/videos/eagle-demo.mp4` — H.264, no audio track (`video.src`). Replace this file to swap the film without a code change.
- `/public/videos/eagle-demo.webm` — same picture, VP9 (`video.webm`). Set `webm` to `null` if you only have an MP4.
- Set `video.src` to `null` to keep the poster still and skip playback.

The film is a short loop of bottle, clothed preparation, hand and bottle, a usage-label card, a dressed lounge still, and discreet delivery. It does not state a number of minutes. Drop an official shoot on the same MP4 path when you have one.

## Retired abstracts

These older files are not referenced:

- `/public/images/hero/hero-atmosphere.png`
- `/public/images/hero/lifestyle-gold-marble.png`
- `/public/images/hero/og-eagle-delay-spray.png`
- `/public/images/product/product-stage.png`

## `/public/images/icons/`

- `mark.svg` — gold eagle emblem. The header uses the same mark as an inline SVG.
