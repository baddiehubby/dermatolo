"use client";

import { useEffect, useId, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { checkReviewInput, reviewLimits, reviewMessages, toUrduDigits, type ReviewField } from "@/lib/reviews";

const STAR_PATH = "m12 2.6 2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17.4l-5.9 3.2 1.2-6.5L2.5 9.5l6.6-.9L12 2.6Z";
const RATING_WORDS = ["", "بہت برا", "برا", "ٹھیک ٹھاک", "اچھا", "بہت اچھا"];

type Errors = Partial<Record<ReviewField | "form", string>>;
type Success = { message: string };

const inputClass =
  "mt-2 w-full rounded-2xl border border-gold/25 bg-black/40 px-4 py-3.5 text-ivory placeholder:text-mist/50 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold";

function FieldError({ id, message }: { id: string; message?: string }) {
  return message ? (
    <p id={id} role="alert" className="mt-2 text-sm text-red-300">
      {message}
    </p>
  ) : null;
}

export function ReviewForm() {
  const uid = useId();
  const router = useRouter();
  const [name, setName] = useState("");
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [text, setText] = useState("");
  const [city, setCity] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [busy, setBusy] = useState(false);
  const [success, setSuccess] = useState<Success | null>(null);
  const startedAt = useRef(0);
  const honeypot = useRef<HTMLInputElement>(null);
  const radios = useRef<(HTMLInputElement | null)[]>([]);
  const nameRef = useRef<HTMLInputElement>(null);
  const textRef = useRef<HTMLTextAreaElement>(null);
  const cityRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  function pick(value: number, focus = false) {
    const next = Math.min(5, Math.max(1, value));
    setRating(next);
    setErrors((current) => ({ ...current, rating: undefined }));
    if (focus) radios.current[next - 1]?.focus();
  }

  // RTL: star 1 sits on the right, star 5 on the left, so Left/Up = more, Right/Down = fewer.
  function onStarKeys(event: React.KeyboardEvent) {
    if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      event.preventDefault();
      pick((rating || 0) + 1, true);
    } else if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      event.preventDefault();
      pick((rating || 2) - 1, true);
    }
  }

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (busy) return;

    const checked = checkReviewInput({ name, rating, text, city });
    if (!checked.ok) {
      setErrors({ [checked.field]: checked.message });
      const target = { name: nameRef, text: textRef, city: cityRef, rating: { current: radios.current[0] } }[checked.field];
      target?.current?.focus();
      return;
    }

    setBusy(true);
    setErrors({});
    try {
      const response = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...checked.value,
          website: honeypot.current?.value ?? "",
          startedAt: startedAt.current,
        }),
      });
      const data = (await response.json().catch(() => null)) as {
        ok?: boolean;
        field?: ReviewField;
        message?: string;
      } | null;
      if (response.ok && data?.ok) {
        setSuccess({ message: reviewMessages.success });
        // The server already purged the cached homepage; re-fetch it so the new review shows now.
        router.refresh();
        return;
      }
      const message = data?.message ?? reviewMessages.generic;
      setErrors(data?.field ? { [data.field]: message } : { form: message });
    } catch {
      setErrors({ form: reviewMessages.generic });
    } finally {
      setBusy(false);
    }
  }

  function reset() {
    setName("");
    setRating(0);
    setText("");
    setCity("");
    setErrors({});
    setSuccess(null);
    startedAt.current = Date.now();
  }

  if (success) {
    return (
      <div role="status" className="surface-card rounded-[1.5rem] p-7 text-center md:p-10">
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-gold/50 text-gold">
          <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="m5 12.5 4.5 4.5L19 7.5" />
          </svg>
        </span>
        <p className="mt-5 text-lg leading-9 text-ivory">{success.message}</p>
        <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a href="#reviews-heading" className="ghost-btn w-full sm:w-auto">
            اپنی رائے دیکھیں
          </a>
          <button type="button" onClick={reset} className="ghost-btn w-full sm:w-auto">
            ایک اور رائے بھیجیں
          </button>
        </div>
      </div>
    );
  }

  const shown = hover || rating;
  const f = (suffix: string) => `${uid}-${suffix}`;

  return (
    <form onSubmit={onSubmit} noValidate className="surface-card rounded-[1.5rem] p-6 md:p-9" aria-labelledby={f("title")}>
      <h3 id={f("title")} className="font-nastaliq text-3xl text-white md:text-4xl">
        اپنی رائے لکھیں
      </h3>
      <p className="mt-3 text-sm leading-7 text-mist">
        آپ کا نام، شہر، ریٹنگ اور جائزہ جمع کراتے ہی اس صفحے پر سب کو نظر آئے گا۔ براہِ کرم اپنا فون نمبر، پتہ یا کوئی لنک نہ لکھیں۔
      </p>

      <div className="mt-7">
        <label htmlFor={f("name")} className="font-medium text-ivory">
          آپ کا نام
        </label>
        <input
          ref={nameRef}
          id={f("name")}
          value={name}
          onChange={(event) => setName(event.target.value)}
          maxLength={reviewLimits.nameMax * 2}
          autoComplete="name"
          placeholder="اپنا نام لکھیں"
          aria-required="true"
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? f("name-err") : undefined}
          className={inputClass}
        />
        <FieldError id={f("name-err")} message={errors.name} />
      </div>

      <fieldset className="mt-7" aria-describedby={errors.rating ? f("rating-err") : undefined} onKeyDown={onStarKeys}>
        <legend className="font-medium text-ivory">آپ کی ریٹنگ</legend>
        <div className="mt-3 flex items-center gap-1" onMouseLeave={() => setHover(0)}>
          {[1, 2, 3, 4, 5].map((value) => (
            <label
              key={value}
              className="relative flex h-12 w-12 cursor-pointer items-center justify-center rounded-full has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-gold sm:h-14 sm:w-14"
              onMouseEnter={() => setHover(value)}
            >
              <input
                ref={(element) => {
                  radios.current[value - 1] = element;
                }}
                type="radio"
                name={f("rating")}
                value={value}
                checked={rating === value}
                onChange={() => pick(value)}
                aria-label={`${toUrduDigits(value)} ستارے`}
                tabIndex={rating === value || (rating === 0 && value === 1) ? 0 : -1}
                className="peer absolute inset-0 h-full w-full cursor-pointer opacity-0"
              />
              <svg
                viewBox="0 0 24 24"
                className={`h-9 w-9 transition-transform duration-200 motion-reduce:transition-none sm:h-10 sm:w-10 ${
                  value <= shown
                    ? "scale-105 fill-gold text-gold drop-shadow-[0_0_8px_rgba(201,162,39,0.5)]"
                    : "fill-transparent text-gold/40"
                }`}
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinejoin="round"
                aria-hidden
              >
                <path d={STAR_PATH} />
              </svg>
            </label>
          ))}
          <span className="ms-3 text-sm text-gold-light" aria-live="polite">
            {rating ? RATING_WORDS[rating] : ""}
          </span>
        </div>
        <FieldError id={f("rating-err")} message={errors.rating} />
      </fieldset>

      <div className="mt-7">
        <label htmlFor={f("text")} className="font-medium text-ivory">
          آپ کی رائے
        </label>
        <textarea
          ref={textRef}
          id={f("text")}
          value={text}
          onChange={(event) => setText(event.target.value)}
          rows={5}
          maxLength={reviewLimits.textMax * 2}
          placeholder="پروڈکٹ کے ساتھ اپنا تجربہ اپنے الفاظ میں لکھیں"
          aria-required="true"
          aria-invalid={Boolean(errors.text)}
          aria-describedby={`${f("text-count")}${errors.text ? ` ${f("text-err")}` : ""}`}
          className={`${inputClass} resize-y leading-8`}
        />
        <p id={f("text-count")} className="mt-1 text-xs text-mist/70">
          {toUrduDigits(Array.from(text).length)} / {toUrduDigits(reviewLimits.textMax)}
        </p>
        <FieldError id={f("text-err")} message={errors.text} />
      </div>

      <div className="mt-7">
        <label htmlFor={f("city")} className="font-medium text-ivory">
          شہر
        </label>
        <input
          ref={cityRef}
          id={f("city")}
          value={city}
          onChange={(event) => setCity(event.target.value)}
          maxLength={reviewLimits.cityMax * 2}
          autoComplete="address-level2"
          placeholder="مثلاً: کراچی"
          aria-required="true"
          aria-invalid={Boolean(errors.city)}
          aria-describedby={errors.city ? f("city-err") : undefined}
          className={inputClass}
        />
        <FieldError id={f("city-err")} message={errors.city} />
      </div>

      {/* Honeypot: invisible to people, tempting to bots. */}
      <div className="sr-only" aria-hidden>
        <label>
          ویب سائٹ
          <input ref={honeypot} type="text" name="website" tabIndex={-1} autoComplete="off" defaultValue="" />
        </label>
      </div>

      {errors.form ? (
        <p role="alert" className="mt-6 rounded-2xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm leading-7 text-red-200">
          {errors.form}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={busy}
        aria-busy={busy}
        className="mt-8 inline-flex min-h-14 w-full items-center justify-center gap-2 rounded-full bg-gradient-to-b from-gold-light to-gold px-8 py-3.5 text-base font-semibold text-ink shadow-gold touch-manipulation focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-light disabled:cursor-wait disabled:opacity-70 sm:w-auto"
      >
        {busy ? (
          <>
            <svg viewBox="0 0 24 24" className="h-5 w-5 motion-safe:animate-spin" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" aria-hidden>
              <path d="M12 3a9 9 0 1 0 9 9" />
            </svg>
            بھیجا جا رہا ہے…
          </>
        ) : (
          "رائے بھیجیں"
        )}
      </button>
    </form>
  );
}
