import { BrandVideo } from "@/components/BrandVideo";
import { site } from "@/lib/site";

/**
 * Premium atmosphere strip — lifestyle motion, not product CGI claims.
 * Uses the latest Desktop/yt cinema shorts; older money-product / money-atmosphere files remain on disk.
 */
export function VideoStrip() {
  const clips = [
    {
      key: "cinema-a",
      src: site.videos.cinemaA.src,
      poster: site.videos.cinemaA.poster,
      label: "MONEY perfume cinema film",
      caption: "Cinema",
    },
    {
      key: "cinema-b",
      src: site.videos.cinemaB.src,
      poster: site.videos.cinemaB.poster,
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
