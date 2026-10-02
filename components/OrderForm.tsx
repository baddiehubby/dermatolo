"use client";

import { FormEvent, useRef, useState } from "react";
import { contact, formatPkr, karachiAreaHints, orderTotalPkr, product } from "@/lib/product";
import { filledOrderUrl, openWhatsApp, orderUrl } from "@/lib/whatsapp";
import { PriceTag } from "./PriceTag";

type FormState = {
  name: string;
  phone: string;
  address: string;
  area: string;
  quantity: string;
};

const empty: FormState = {
  name: "",
  phone: "",
  address: "",
  area: "",
  quantity: "1",
};

function isValidPkPhone(value: string) {
  const digits = value.replace(/[^\d]/g, "");
  return /^(03\d{9}|923\d{9}|3\d{9})$/.test(digits);
}

export function OrderForm() {
  const [form, setForm] = useState<FormState>(empty);
  const [error, setError] = useState("");
  const errorRef = useRef<HTMLParagraphElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const addressRef = useRef<HTMLTextAreaElement>(null);
  const areaRef = useRef<HTMLInputElement>(null);

  function fail(message: string, field?: { focus: () => void } | null) {
    setError(message);
    requestAnimationFrame(() => {
      (field ?? errorRef.current)?.focus();
    });
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (form.name.trim().length < 2) {
      fail("براہِ کرم اپنا نام لکھیں۔", nameRef.current);
      return;
    }
    if (!isValidPkPhone(form.phone)) {
      fail("درست موبائل نمبر لکھیں، مثلاً 03XX XXXXXXX۔", phoneRef.current);
      return;
    }
    if (form.address.trim().length < 5) {
      fail("مکمل پتہ لکھیں تاکہ ڈیلیوری ہو سکے۔", addressRef.current);
      return;
    }
    if (form.area.trim().length < 2) {
      fail("کراچی کا علاقہ لکھیں۔", areaRef.current);
      return;
    }
    const qty = Number(form.quantity);
    if (!Number.isInteger(qty) || qty < product.order.minQuantity || qty > product.order.maxQuantity) {
      fail(`مقدار ${product.order.minQuantity} سے ${product.order.maxQuantity} کے درمیان رکھیں۔`);
      return;
    }
    setError("");
    openWhatsApp(
      filledOrderUrl({
        name: form.name.trim(),
        phone: form.phone.trim(),
        address: form.address.trim(),
        area: form.area.trim(),
        quantity: qty,
      }),
    );
  }

  const total = orderTotalPkr(Number(form.quantity));

  const fieldClass =
    "mt-2 w-full rounded-2xl border border-gold/25 bg-ink px-4 py-3.5 text-base text-gold-pale outline-none transition placeholder:text-mist/40 focus:border-gold";

  return (
    <section id="order" className="mx-auto max-w-6xl scroll-mt-32 px-4 py-16 md:py-24">
      <div className="max-w-2xl">
        <h2 className="font-nastaliq text-4xl text-white">آرڈر فارم</h2>
        <p className="mt-4 leading-9 text-mist">
          فارم بھیجیں تو واٹس ایپ کھل جائے گا، آپ کی لکھی ہوئی تفصیل اور کل رقم کے ساتھ۔ یہاں کوئی ادائیگی نہیں لی جاتی —{" "}
          {product.paymentUrdu}۔
        </p>
      </div>
      <div className="mt-8 grid items-start gap-8 lg:grid-cols-[1.05fr_0.95fr]">
        <form onSubmit={onSubmit} className="surface-card rounded-[2rem] p-5 sm:p-8" noValidate>
          <PriceTag className="mb-6" />
          <label className="mb-4 block text-sm text-gold-light">
            نام
            <input
              ref={nameRef}
              className={fieldClass}
              name="name"
              autoComplete="name"
              enterKeyHint="next"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
          </label>
          <label className="mb-4 block text-sm text-gold-light">
            موبائل نمبر
            <input
              ref={phoneRef}
              className={`${fieldClass} text-start`}
              dir="ltr"
              name="phone"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              enterKeyHint="next"
              placeholder="03XX XXXXXXX"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              required
            />
          </label>
          <label className="mb-4 block text-sm text-gold-light">
            مکمل پتہ
            <textarea
              ref={addressRef}
              className={`${fieldClass} min-h-28`}
              name="address"
              autoComplete="street-address"
              enterKeyHint="next"
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
              required
            />
          </label>
          <label className="mb-4 block text-sm text-gold-light">
            کراچی کا علاقہ
            <input
              ref={areaRef}
              className={fieldClass}
              name="area"
              list="karachi-areas"
              enterKeyHint="next"
              value={form.area}
              onChange={(e) => setForm({ ...form, area: e.target.value })}
              required
            />
            <datalist id="karachi-areas">
              {karachiAreaHints.map((area) => (
                <option key={area} value={area} />
              ))}
            </datalist>
          </label>
          <label className="mb-5 block text-sm text-gold-light">
            مقدار
            <select
              className={fieldClass}
              name="quantity"
              value={form.quantity}
              onChange={(e) => setForm({ ...form, quantity: e.target.value })}
            >
              {Array.from(
                { length: product.order.maxQuantity - product.order.minQuantity + 1 },
                (_, i) => product.order.minQuantity + i,
              ).map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
          </label>
          {total !== null ? (
            <div
              className="mb-5 flex items-center justify-between gap-4 rounded-2xl border border-gold/25 bg-black/25 px-4 py-3"
              aria-live="polite"
            >
              <span className="text-sm text-mist">کل رقم ({product.paymentUrdu})</span>
              <bdi dir="ltr" className="font-latin text-xl font-semibold text-gold-light" data-order-total>
                {formatPkr(total)}
              </bdi>
            </div>
          ) : null}
          {error ? (
            <p ref={errorRef} tabIndex={-1} role="alert" className="mb-4 text-sm text-red-300 outline-none">
              {error}
            </p>
          ) : null}
          <button type="submit" className="wa-btn w-full">
            واٹس ایپ پر آرڈر کریں
          </button>
          <p className="mt-3 text-center text-xs leading-6 text-mist/70">{product.ordersNote}</p>
        </form>
        <aside className="rounded-[2rem] border border-gold/15 bg-ink-50/60 p-6 sm:p-8">
          <h3 className="text-2xl font-semibold leading-10 text-gold-light">فارم کے بغیر بھی بھیج سکتے ہیں</h3>
          <p className="mt-4 leading-8 text-mist">
            یہ لنک خالی آرڈر پیغام کے ساتھ واٹس ایپ کھول دیتا ہے۔ اپنا نام، موبائل نمبر، مکمل پتہ، کراچی کا علاقہ اور مقدار خود لکھ دیں۔
          </p>
          <a href={orderUrl()} target="_blank" rel="noopener noreferrer" className="ghost-btn mt-6 w-full">
            ابھی آرڈر کریں
          </a>
          <p className="mt-4 text-center text-sm text-mist">
            واٹس ایپ:{" "}
            <bdi dir="ltr" className="font-latin text-gold-light">
              {contact.phoneDisplay}
            </bdi>
          </p>
          <ul className="mt-6 space-y-1 text-sm leading-7 text-gold">
            <li>{product.deliveryUrdu}</li>
            <li>{product.paymentUrdu}</li>
            {product.discreetPackaging ? <li>{product.discreetUrdu}</li> : null}
          </ul>
        </aside>
      </div>
    </section>
  );
}
