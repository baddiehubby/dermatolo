import { site } from "@/lib/site";

const items = [
  { label: site.payment, short: "COD" },
  { label: `Delivery ${site.deliveryDays}`, short: "2–4 days" },
  { label: site.authenticity, short: "Authentic" },
] as const;

export function TrustStrip() {
  return (
    <ul className="flex flex-wrap items-center justify-center gap-x-1 gap-y-2 text-sm text-mist">
      {items.map((item, index) => (
        <li key={item.label} className="flex items-center gap-x-1">
          {index > 0 ? (
            <span className="mx-2 hidden h-3 w-px bg-gold/30 sm:block" aria-hidden />
          ) : null}
          <span className="inline-flex items-center gap-2 px-1">
            <span className="h-px w-3 bg-gold/70" aria-hidden />
            <span className="sm:hidden">{item.short}</span>
            <span className="hidden sm:inline">{item.label}</span>
          </span>
        </li>
      ))}
    </ul>
  );
}
