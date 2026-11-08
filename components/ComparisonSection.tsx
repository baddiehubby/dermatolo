import Link from "next/link";
import { formatPrice, site, waLink } from "@/lib/site";
import { WhatsAppButton } from "./WhatsAppButton";

/**
 * Educational context for Pakistan buyers — not a review page, not trademark misuse in titles/schema.
 */
export function ComparisonSection() {
  return (
    <section
      className="mx-auto max-w-3xl px-4 py-16 md:py-24"
      aria-labelledby="compare-heading"
    >
      <p className="text-xs tracking-[0.35em] text-gold uppercase">Buying guide</p>
      <h2 id="compare-heading" className="font-display mt-3 text-3xl text-ivory md:text-4xl">
        Perfume price in Pakistan — how to choose
      </h2>
      <p className="mt-6 text-mist leading-relaxed">
        Shoppers comparing luxury perfume Pakistan options often weigh local fragrance houses,
        international designer bottles sold in PK, and marketplace listings when looking for a long
        lasting perfume Pakistan buyers can trust — or a clear unisex perfume Pakistan pick under a
        set budget. Prices and fulfillment quality vary widely across those segments.
      </p>
      <p className="mt-4 text-mist leading-relaxed">
        When you scan online perfume price ranges or high-street counters, use three practical
        checks: stated concentration and wear notes, who fulfills the order, and total landed cost
        including delivery. MONEY is positioned as a premium unisex preorder at {formatPrice()} with
        free delivery all over Pakistan — a perfume under 2000 Pakistan price point without a long
        checkout form.
      </p>
      <p className="mt-4 text-mist leading-relaxed">
        This section is educational context only. It does not rank or endorse other brands. For the
        current offer, see{" "}
        <Link href="/shop" className="text-gold-light hover:underline">
          Shop
        </Link>{" "}
        or the{" "}
        <Link href="/11-11" className="text-gold-light hover:underline">
          11.11 sale perfume
        </Link>{" "}
        page.
      </p>
      <div className="mt-10 flex justify-center sm:justify-start">
        <WhatsAppButton href={waLink()}>{site.ctaLabel}</WhatsAppButton>
      </div>
    </section>
  );
}
