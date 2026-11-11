import Link from "next/link";
import { BOTTLE_ML, formatPrice, site } from "@/lib/site";
import { WhatsAppButton } from "./WhatsAppButton";
import { buildOrderMessage, orderWhatsAppUrl } from "@/lib/whatsapp";

/**
 * Homepage conversion block — luxury brand energy, WhatsApp order CTA.
 */
export function ComparisonSection() {
  const href = orderWhatsAppUrl({ quantity: 1 });
  const message = buildOrderMessage({ quantity: 1 });

  return (
    <section
      className="relative mx-auto max-w-3xl px-4 py-16 md:py-24"
      aria-labelledby="statement-heading"
    >
      <div
        className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent md:inset-x-0"
        aria-hidden
      />

      <p className="text-center text-xs tracking-[0.35em] text-gold uppercase">{site.brand}</p>
      <h2
        id="statement-heading"
        className="font-display mt-4 text-center text-3xl leading-tight text-ivory md:text-5xl"
      >
        Crafted for a luxury statement.
      </h2>
      <p className="mx-auto mt-6 max-w-xl text-center text-mist leading-relaxed md:text-lg">
        MONEY is a premium unisex perfume made to feel world-class — confident, modern, and
        impossible to ignore. {site.tagline} {BOTTLE_ML} ml at {formatPrice()}. {site.delivery} —
        confirmed on WhatsApp before dispatch.
      </p>

      <div className="mt-8 flex flex-col items-center gap-2 text-center">
        <p className="font-display text-2xl text-gold-light md:text-3xl">
          {BOTTLE_ML} ML · {formatPrice()}
        </p>
        <p className="text-sm tracking-wide text-gold">{site.delivery}</p>
      </div>

      <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <Link href="/shop" className="ghost-btn !min-h-12 !px-6 text-sm">
          {site.shopCtaLabel}
        </Link>
        <WhatsAppButton href={href} message={message}>
          Order now
        </WhatsAppButton>
      </div>

      <p className="mt-10 text-center text-sm text-mist/80">
        See the{" "}
        <Link href="/shop" className="text-gold-light hover:underline">
          full offer
        </Link>{" "}
        or the{" "}
        <Link href="/11-11" className="text-gold-light hover:underline">
          11.11 sale perfume
        </Link>
        .
      </p>
    </section>
  );
}
