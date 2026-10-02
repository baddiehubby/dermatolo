import { formatPkr, hasConfirmedPrice, product } from "@/lib/product";
import { priceEnquireUrl } from "@/lib/whatsapp";

type PriceTagProps = {
  className?: string;
  enquire?: boolean;
  /** Hero style: "صرف Rs. 1,300" without the small label. */
  lead?: boolean;
  /** Larger figure for the main price card. */
  prominent?: boolean;
};

export function PriceTag({ className = "", enquire = true, lead = false, prominent = false }: PriceTagProps) {
  const size = prominent ? "text-4xl md:text-5xl" : "text-3xl";
  return (
    <div className={className}>
      {lead ? null : <p className="text-sm text-mist">قیمت</p>}
      {hasConfirmedPrice(product.pricePkr) ? (
        <p className={`mt-1 font-semibold text-gold-light ${size}`}>
          {lead ? <span className="me-2 text-xl font-medium text-ivory/90 md:text-2xl">صرف</span> : null}
          <bdi dir="ltr" className="font-latin tracking-wide">
            {formatPkr(product.pricePkr)}
          </bdi>
        </p>
      ) : (
        <p className="mt-1 text-xl font-medium leading-8 text-gold-light sm:text-2xl">{product.pricePrompt}</p>
      )}
      <p className="mt-2 text-sm text-gold">{product.deliveryUrdu}</p>
      {enquire && !hasConfirmedPrice(product.pricePkr) ? (
        <a
          href={priceEnquireUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-flex min-h-11 items-center text-sm text-gold-light underline-offset-4 hover:underline"
        >
          قیمت پوچھیں
        </a>
      ) : null}
    </div>
  );
}
