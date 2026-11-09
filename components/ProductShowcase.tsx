import { BrandVideo } from "@/components/BrandVideo";
import { OrderPanel } from "@/components/OrderPanel";
import { TrustStrip } from "@/components/TrustStrip";
import { BOTTLE_ML, BRAND, formatPrice, site } from "@/lib/site";

type ProductShowcaseProps = {
  id?: string;
  /** Show a compact eyebrow above the grid */
  eyebrow?: string;
};

/**
 * Product cinema + order panel. Uses existing MONEY video/poster — no invented bottle photo.
 */
export function ProductShowcase({ id = "product", eyebrow = "The fragrance" }: ProductShowcaseProps) {
  return (
    <section id={id} className="scroll-mt-28 border-y border-gold/15 bg-ink-100/30 py-16 md:py-24" aria-labelledby={`${id}-heading`}>
      <div className="mx-auto max-w-6xl px-4">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs tracking-[0.4em] text-gold uppercase">{eyebrow}</p>
          <h2 id={`${id}-heading`} className="font-display mt-3 text-3xl text-ivory md:text-5xl">
            {BRAND} · {BOTTLE_ML} ml
          </h2>
          <p className="mt-4 text-mist">
            {formatPrice()} · {site.delivery}
          </p>
        </div>

        <article className="mt-10 grid overflow-hidden border border-gold/20 bg-ink-100 md:grid-cols-2">
          <div className="relative">
            <BrandVideo
              src={site.videos.product.src}
              poster={site.videos.product.poster}
              label={`${BRAND} perfume product cinema`}
              aspectRatio="4 / 5"
              className="md:min-h-full"
            />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/80 to-transparent p-5">
              <p className="font-display text-lg tracking-[0.2em] text-gold-light">
                {BOTTLE_ML} ML · {formatPrice()}
              </p>
            </div>
          </div>
          <div className="flex flex-col justify-center px-6 py-8 md:px-10 md:py-12">
            <OrderPanel />
            <div className="mt-8">
              <TrustStrip />
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
