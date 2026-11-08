import { BrandVideo } from "@/components/BrandVideo";
import { site } from "@/lib/site";

/**
 * Premium atmosphere strip — lifestyle motion, not product CGI claims.
 * Footage may be temporary brand-atmosphere until real MONEY assets land.
 */
export function VideoStrip() {
  const clips = [
    {
      key: "product",
      src: site.videos.product.src,
      poster: site.videos.product.poster,
      label: "MONEY perfume lifestyle motion",
      caption: "Lifestyle",
    },
    {
      key: "atmosphere",
      src: site.videos.atmosphere.src,
      poster: site.videos.atmosphere.poster,
      label: "MONEY perfume atmosphere film",
      caption: "Atmosphere",
    },
  ] as const;

  return (
    <section className="border-y border-gold/15 bg-ink-100/40 py-14 md:py-20" aria-labelledby="films-heading">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mx-auto max-w-xl text-center">
          <p className="text-xs tracking-[0.4em] text-gold uppercase">The films</p>
          <h2 id="films-heading" className="font-display mt-3 text-3xl text-ivory md:text-4xl">
            Atmosphere in motion
          </h2>
          <p className="mt-4 text-sm text-mist leading-relaxed">
            Short films that set the tone — confident, modern, unisex.
          </p>
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          {clips.map((clip) => (
            <BrandVideo
              key={clip.key}
              src={clip.src}
              poster={clip.poster}
              label={clip.label}
              caption={clip.caption}
              aspectRatio="4 / 5"
              className="reveal"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
