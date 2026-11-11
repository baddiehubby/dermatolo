import { site } from "@/lib/site";
import { buildOrderMessage, orderWhatsAppUrl } from "@/lib/whatsapp";
import { WhatsAppButton } from "./WhatsAppButton";

const points = [
  {
    title: "Delivery charges apply",
    body: site.deliveryDetail,
  },
  {
    title: "Timing",
    body: `Delivery timeframe is ${site.deliveryDays}. We confirm charges and ETA for your city before dispatch.`,
  },
  {
    title: site.payment,
    body: "Pay when your parcel arrives. Product price and delivery charges are confirmed on WhatsApp.",
  },
  {
    title: "Exchange & damage",
    body: site.exchange,
  },
] as const;

export function DeliveryTrust() {
  const href = orderWhatsAppUrl({ quantity: 1 });
  const message = buildOrderMessage({ quantity: 1 });

  return (
    <section className="mx-auto max-w-6xl px-4 py-16 md:py-20" aria-labelledby="trust-heading">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-xs tracking-[0.4em] text-gold uppercase">Delivery & trust</p>
        <h2 id="trust-heading" className="font-display mt-3 text-3xl text-ivory md:text-4xl">
          Clear before you order
        </h2>
        <p className="mt-4 text-sm text-mist leading-relaxed">
          Transparent terms — no free-delivery claims, no invented same-day promises.
        </p>
      </div>
      <ul className="mt-10 grid gap-4 sm:grid-cols-2">
        {points.map((point) => (
          <li key={point.title} className="border border-gold/15 bg-ink-100/50 px-5 py-6">
            <h3 className="font-display text-xl text-gold-light">{point.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-mist">{point.body}</p>
          </li>
        ))}
      </ul>
      <p className="mt-8 text-center text-sm text-mist">
        Questions?{" "}
        <WhatsAppButton
          href={href}
          message={message}
          showIcon={false}
          variant="ghost"
          className="!inline !min-h-0 !border-0 !bg-transparent !p-0 !shadow-none text-gold-light hover:underline"
        >
          WhatsApp {site.whatsappDisplay}
        </WhatsAppButton>
      </p>
    </section>
  );
}
