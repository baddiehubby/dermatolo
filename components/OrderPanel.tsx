"use client";

import { useMemo, useState } from "react";
import {
  BOTTLE_ML,
  DELIVERY_NOTE,
  formatPrice,
  PRICE,
  PRODUCT_NAME,
  site,
} from "@/lib/site";
import { orderWhatsAppUrl } from "@/lib/whatsapp";
import { WhatsAppIcon } from "./Icons";

const MAX_QTY = 20;

type OrderPanelProps = {
  className?: string;
  /** Compact layout for sticky / narrow columns */
  compact?: boolean;
};

export function OrderPanel({ className = "", compact = false }: OrderPanelProps) {
  const [quantity, setQuantity] = useState(1);
  const [customerName, setCustomerName] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [contactNumber, setContactNumber] = useState("");

  const subtotal = quantity * PRICE;
  const href = useMemo(
    () =>
      orderWhatsAppUrl({
        quantity,
        customerName,
        deliveryAddress,
        contactNumber,
      }),
    [quantity, customerName, deliveryAddress, contactNumber],
  );

  function bump(delta: number) {
    setQuantity((q) => Math.min(MAX_QTY, Math.max(1, q + delta)));
  }

  const field =
    "mt-2 w-full rounded-sm border border-gold/25 bg-black/40 px-4 py-3 text-ivory placeholder:text-mist/45 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold";

  return (
    <div className={`space-y-6 ${className}`}>
      <div>
        <p className="text-xs tracking-[0.35em] text-gold uppercase">Unisex fragrance</p>
        <h2 className={`font-display mt-2 text-ivory ${compact ? "text-2xl" : "text-3xl md:text-4xl"}`}>
          {PRODUCT_NAME}
        </h2>
        <p className="mt-2 text-mist">{site.tagline}</p>
        <div className="mt-5 flex flex-wrap items-baseline gap-x-4 gap-y-1">
          <p className="font-display text-3xl text-gold-light md:text-4xl">{formatPrice()}</p>
          <p className="text-sm tracking-[0.2em] text-mist uppercase">{BOTTLE_ML} ml</p>
        </div>
        <p className="mt-2 text-sm font-medium tracking-wide text-gold">{DELIVERY_NOTE}</p>
        <p className="mt-3 max-w-md text-sm leading-relaxed text-mist/85">
          Signature unisex perfume. Order on WhatsApp only — no card checkout on this site.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <p className="text-sm text-mist">Quantity</p>
        <div className="inline-flex items-center border border-gold/30">
          <button
            type="button"
            aria-label="Decrease quantity"
            onClick={() => bump(-1)}
            className="flex h-11 w-11 items-center justify-center text-gold-light hover:bg-gold/10"
          >
            −
          </button>
          <span className="min-w-[2.5rem] text-center tabular-nums text-ivory" aria-live="polite">
            {quantity}
          </span>
          <button
            type="button"
            aria-label="Increase quantity"
            onClick={() => bump(1)}
            className="flex h-11 w-11 items-center justify-center text-gold-light hover:bg-gold/10"
          >
            +
          </button>
        </div>
        <p className="text-sm text-mist">
          Subtotal <span className="tabular-nums text-ivory">{formatPrice(subtotal)}</span>
        </p>
      </div>

      <fieldset className="space-y-4 border border-gold/15 bg-ink-100/50 p-4 md:p-5">
        <legend className="px-1 text-xs tracking-[0.28em] text-gold uppercase">
          Delivery details
        </legend>
        <p className="text-xs leading-relaxed text-mist/70">
          Optional — fills your WhatsApp message. You can also complete the blanks in WhatsApp.
        </p>
        <div>
          <label htmlFor="order-name" className="text-sm text-ivory">
            Customer name
          </label>
          <input
            id="order-name"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            autoComplete="name"
            placeholder="Your full name"
            className={field}
          />
        </div>
        <div>
          <label htmlFor="order-address" className="text-sm text-ivory">
            Delivery address
          </label>
          <textarea
            id="order-address"
            value={deliveryAddress}
            onChange={(e) => setDeliveryAddress(e.target.value)}
            rows={2}
            autoComplete="street-address"
            placeholder="House / street / city"
            className={`${field} resize-y`}
          />
        </div>
        <div>
          <label htmlFor="order-phone" className="text-sm text-ivory">
            Contact number
          </label>
          <input
            id="order-phone"
            value={contactNumber}
            onChange={(e) => setContactNumber(e.target.value)}
            autoComplete="tel"
            inputMode="tel"
            placeholder="03XX XXX XXXX"
            className={field}
          />
        </div>
      </fieldset>

      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="wa-btn w-full sm:w-auto"
        >
          <WhatsAppIcon />
          Add to order · WhatsApp
        </a>
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="ghost-btn w-full sm:w-auto"
        >
          {site.ctaLabel}
        </a>
      </div>
      <p className="text-xs leading-relaxed text-mist/65">
        WhatsApp {site.whatsappDisplay}. Product subtotal excludes delivery. {site.deliveryDetail}
      </p>
    </div>
  );
}
