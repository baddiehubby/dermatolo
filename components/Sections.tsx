import Image from "next/image";
import { features, faqs, orderSteps, precautions, productInfo, trustItems, usage } from "@/lib/content";
import { contact, hasConfirmedPrice, product } from "@/lib/product";
import { infoUrl, orderUrl, priceEnquireUrl } from "@/lib/whatsapp";
import { BidiText } from "./BidiText";
import { BrandMark, FeatureIconMark } from "./Icons";
import { PriceTag } from "./PriceTag";
import { ProductVideo } from "./ProductVideo";
import { ProductVisual } from "./ProductVisual";
import { WhatsAppButton } from "./WhatsAppButton";

const urduNumerals = ["۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];

function SectionTitle({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <h2 className={`font-nastaliq text-4xl text-white md:text-5xl ${className}`}>{children}</h2>;
}

function GoldDot() {
  return <span className="mt-[0.85rem] h-1.5 w-1.5 shrink-0 rounded-full bg-gold" aria-hidden />;
}

export function TrustRow() {
  return (
    <section className="border-y border-gold/15 bg-[#0c0c0e]" aria-label="اعتماد">
      <ul className="mx-auto flex max-w-6xl flex-wrap justify-center gap-x-8 gap-y-3 px-4 py-5 text-sm text-ivory/90">
        {trustItems.map((label) => (
          <li key={label} className="flex items-center gap-2">
            <span className="h-1 w-1 rounded-full bg-gold" aria-hidden />
            <BidiText text={label} />
          </li>
        ))}
      </ul>
    </section>
  );
}

export function ProductIntro() {
  return (
    <section id="product" className="mx-auto max-w-6xl scroll-mt-32 px-4 py-20 md:py-28">
      <article className="product-card reveal grid overflow-hidden rounded-[1.75rem] md:grid-cols-[0.92fr_1.08fr]">
        <ProductVisual
          src={product.images.closeup}
          alt={`${product.nameUrdu} کا قریبی منظر — ${product.artworkNote}`}
          sweep
          sizes="(min-width: 768px) 460px, 100vw"
          imageClassName="object-cover"
          className="frame-plain h-80 md:h-full md:min-h-[540px]"
        />
        <div className="flex flex-col justify-center px-6 py-8 sm:px-8 md:px-12 md:py-14">
          <BrandMark className="h-14 w-14 text-gold" />
          <p className="font-latin mt-6 text-[0.72rem] font-medium tracking-[0.42em] text-gold">EAGLE</p>
          <h2 className="font-nastaliq mt-3 text-4xl text-white md:text-5xl">{product.nameUrdu}</h2>
          <p className="font-latin mt-2 text-xs font-medium tracking-[0.28em] text-gold-light/90">DELAY SPRAY</p>
          <p className="mt-6 text-lg leading-9 text-ivory/90">
            ہر لمحہ جلدی ختم کرنے کے بجائے، اسے اپنے وقت پر جینے کا اعتماد۔
          </p>
          <p className="mt-3 leading-8 text-mist">
            بالغ مردوں کے لیے ایک پریمیم{product.isHerbal ? " ہربل" : ""} ڈیلے سپرے، ان کے لیے جو قربت کے لمحات میں زیادہ
            اعتماد اور بہتر کنٹرول چاہتے ہیں۔
          </p>
          <div className="mt-8 rounded-2xl border border-gold/25 bg-black/25 px-5 py-5">
            <p className="font-latin text-sm tracking-[0.2em] text-gold-light/90">{product.name}</p>
            <PriceTag className="mt-2" prominent />
            <p className="mt-1 text-sm text-mist">{product.paymentUrdu}</p>
          </div>
          <WhatsAppButton href={orderUrl()} className="mt-6 w-full sm:w-auto">
            ابھی واٹس ایپ پر آرڈر کریں
          </WhatsAppButton>
        </div>
      </article>

      <article className="surface-card reveal mt-12 rounded-[1.75rem] p-7 md:p-10">
        <h3 className="text-xl font-semibold text-gold-light md:text-2xl">اہم معلومات</h3>
        <ul className="mt-5 grid gap-x-10 gap-y-3 leading-8 text-mist md:grid-cols-2">
          {productInfo.map((line) => (
            <li key={line} className="flex gap-3">
              <GoldDot />
              <span>{line}</span>
            </li>
          ))}
          <li className="flex gap-3">
            <GoldDot />
            <span>{product.ageNote}۔</span>
          </li>
        </ul>
      </article>

      <ul className="mt-16 grid gap-x-12 gap-y-8 md:grid-cols-2">
        {features.map((item) => (
          <li key={item.title} className="border-t border-gold/20 pt-6">
            <div className="flex items-center gap-3 text-gold">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-gold/30">
                <FeatureIconMark name={item.icon} />
              </span>
              <h3 className="text-lg font-semibold text-ivory">{item.title}</h3>
            </div>
            <p className="mt-3 leading-8 text-mist">
              <BidiText text={item.body} />
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function LifestyleBand() {
  return (
    <section className="px-4" aria-label={product.emotion}>
      <div className="relative mx-auto h-[28rem] max-w-6xl overflow-hidden rounded-[1.75rem] md:h-[38rem]">
        <Image
          src={product.images.lifestyle}
          alt={`رات کے کمرے میں ${product.nameUrdu} — ${product.artworkNote}`}
          fill
          sizes="(min-width: 1152px) 1152px, 100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-l from-black/5 via-black/35 to-black/80" />
        <div className="relative z-10 flex h-full flex-col justify-end p-7 md:p-14">
          <div className="w-[54%] max-w-md self-end drop-shadow-[0_10px_28px_rgba(0,0,0,0.8)]">
            <p className="font-nastaliq text-[1.65rem] text-white sm:text-4xl md:text-6xl">{product.emotion}</p>
            <p className="mt-3 max-w-md text-sm leading-7 text-ivory/85">{product.emotionNote}</p>
            <p className="mt-5 text-xs text-gold-light">{product.artworkNote}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export function BrandBand() {
  return (
    <section className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-20 md:grid-cols-2 md:gap-16 md:py-28">
      <figure className="product-frame relative aspect-square">
        <Image
          src={product.images.eagle}
          alt="سنہری عقاب، ایگل برانڈ کا نشان"
          fill
          sizes="(min-width: 768px) 540px, 100vw"
          className="object-cover object-[70%_center]"
        />
      </figure>
      <div className="reveal">
        <p className="font-latin text-[0.72rem] font-medium tracking-[0.42em] text-gold">EAGLE</p>
        <SectionTitle className="mt-4">زیادہ دیر۔ زیادہ اعتماد۔ بہتر لمحات۔</SectionTitle>
        <p className="mt-6 text-lg leading-9 text-ivory/90">اپنے قیمتی لمحات کو جلد بازی کے بجائے اعتماد کے ساتھ جئیں۔</p>
        <p className="mt-4 leading-8 text-mist">
          <BidiText text={`${product.name} کو بالغ مردوں کے لیے قربت کے لمحات میں بہتر کنٹرول کے مقصد سے پیش کیا گیا ہے۔`} />
        </p>
        <p className="mt-4 text-sm leading-7 text-mist/70">
          عقاب کا نشان اعتماد اور ضبط کی علامت ہے۔ نتائج ہر شخص میں مختلف ہو سکتے ہیں۔
        </p>
      </div>
    </section>
  );
}

export function OrderingSection() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 md:py-24">
      <div className="max-w-2xl">
        <SectionTitle>صرف چند سیکنڈ میں آرڈر کریں</SectionTitle>
        <p className="mt-4 leading-8 text-mist">
          آن لائن چیک آؤٹ کی ضرورت نہیں۔ واٹس ایپ پر پیغام بھیجیں، اور ادائیگی پارسل ملنے پر کریں۔
        </p>
      </div>
      <ol className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {orderSteps.map((step, index) => (
          <li key={step.title} className="surface-card rounded-3xl p-5">
            <span className="text-2xl text-gold">{urduNumerals[index]}</span>
            <h3 className="mt-3 text-lg font-semibold text-ivory">{step.title}</h3>
            <p className="mt-2 text-sm leading-7 text-mist">
              <BidiText text={step.body} />
            </p>
          </li>
        ))}
      </ol>
      <div className="mt-8 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:gap-6">
        <WhatsAppButton href={orderUrl()} className="w-full sm:w-auto">
          واٹس ایپ پر آرڈر کریں
        </WhatsAppButton>
        <a
          href={orderUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-12 items-center gap-2 text-gold-light hover:underline"
        >
          واٹس ایپ:
          <bdi dir="ltr" className="font-latin text-lg tracking-wide">
            {contact.phoneDisplay}
          </bdi>
        </a>
      </div>

      <div className="product-card mt-12 grid overflow-hidden rounded-[1.75rem] md:grid-cols-2">
        <figure className="relative h-72 md:h-auto md:min-h-[420px]">
          <Image
            src={product.images.karachi}
            alt={`شام کے ساحلی منظر میں ${product.nameUrdu} — ${product.artworkNote}`}
            fill
            sizes="(min-width: 768px) 560px, 100vw"
            className="object-cover"
          />
          <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent px-5 pb-4 pt-12 text-xs text-gold-light">
            {product.artworkNote}
          </figcaption>
        </figure>
        <div className="flex flex-col justify-center p-7 md:p-10">
          <h3 className="font-nastaliq text-4xl text-white">ڈیلیوری</h3>
          <p className="mt-4 text-lg text-gold-light">{product.deliveryUrdu}</p>
          <p className="mt-3 leading-8 text-mist">{product.deliveryNote}</p>
          <p className="mt-2 leading-8 text-mist">
            ادائیگی: {product.paymentUrdu} — {product.paymentNote}
          </p>
          <p className="mt-2 text-sm text-mist/70">{product.ordersNote}</p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            {hasConfirmedPrice(product.pricePkr) ? null : (
              <a href={priceEnquireUrl()} target="_blank" rel="noopener noreferrer" className="ghost-btn">
                قیمت پوچھیں
              </a>
            )}
            <a
              href={infoUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 items-center text-sm text-gold-light hover:underline"
            >
              واٹس ایپ پر معلومات لیں
            </a>
          </div>
        </div>
      </div>

      {product.discreetPackaging ? <PrivacyCard /> : null}
    </section>
  );
}

function PrivacyCard() {
  const points = [product.sameDayUrdu, product.paymentUrdu, "سادہ، بند اور ڈسکریٹ پیکنگ"];
  return (
    <div className="product-card reveal mt-8 grid overflow-hidden rounded-[1.75rem] md:grid-cols-2">
      <div className="order-2 flex flex-col justify-center p-7 md:order-1 md:p-10">
        <p className="font-latin text-[0.72rem] font-medium tracking-[0.42em] text-gold">DISCREET</p>
        <h3 className="font-nastaliq mt-3 text-[2rem] text-white md:text-4xl">آپ کی پرائیویسی، ہماری ترجیح</h3>
        <p className="mt-4 leading-8 text-mist">
          آپ کا آرڈر سادہ اور ڈسکریٹ پیکنگ میں روانہ کیا جاتا ہے۔ باہر سے پیکج کے اندر موجود پروڈکٹ کی نوعیت ظاہر نہیں کی
          جاتی۔
        </p>
        <ul className="mt-6 space-y-3 leading-8 text-ivory/90">
          {points.map((point) => (
            <li key={point} className="flex gap-3">
              <GoldDot />
              <span>{point}</span>
            </li>
          ))}
        </ul>
        <WhatsAppButton href={orderUrl()} className="mt-7 w-full sm:w-auto sm:self-start">
          واٹس ایپ پر آرڈر کریں
        </WhatsAppButton>
      </div>
      {product.images.discreetParcel ? (
        <figure className="relative order-1 h-72 md:order-2 md:h-auto md:min-h-[420px]">
          <Image
            src={product.images.discreetParcel}
            alt="سنہری عقاب کے ہلکے نشان والا مکمل بند سیاہ ڈسکریٹ پارسل — برانڈ کی تصویری پیشکش"
            fill
            sizes="(min-width: 768px) 560px, 100vw"
            className="object-cover"
          />
          <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent px-5 pb-4 pt-12 text-xs text-gold-light">
            {product.artworkNote}
          </figcaption>
        </figure>
      ) : (
        <div className="order-1 hidden items-center justify-center bg-[#0c0c0e] md:order-2 md:flex" aria-hidden>
          <BrandMark className="h-24 w-24 text-gold/60" />
        </div>
      )}
    </div>
  );
}

export function SafetySection() {
  return (
    <section id="usage" className="mx-auto max-w-6xl scroll-mt-32 px-4 py-16 md:py-24">
      <ProductVideo />
      <div className="grid gap-6 md:grid-cols-[1.2fr_0.8fr]">
        <article className="surface-card rounded-[1.75rem] p-7 md:p-10">
          <SectionTitle>طریقۂ استعمال</SectionTitle>
          <ol className="mt-7 space-y-4">
            {usage.steps.map((step, index) => (
              <li key={step.title} className="flex gap-4 rounded-2xl border border-gold/15 bg-black/20 p-4 md:p-5">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-gold/40 text-lg text-gold">
                  {urduNumerals[index]}
                </span>
                <div>
                  <h3 className="text-lg font-semibold text-ivory">{step.title}</h3>
                  <p className="mt-1 leading-8 text-mist">{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
          {usage.note ? <p className="mt-5 text-sm leading-7 text-mist/75">{usage.note}</p> : null}
        </article>
        <article className="surface-card rounded-[1.75rem] p-7 md:p-10">
          <SectionTitle>محفوظ استعمال</SectionTitle>
          <ul className="mt-6 list-disc space-y-3 ps-5 leading-8 text-mist">
            {precautions.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
      </div>
    </section>
  );
}

export function IngredientsBlock() {
  return (
    <section className="mx-auto max-w-6xl px-4 pb-4">
      <article className="surface-card rounded-[1.75rem] p-7 md:p-10">
        <SectionTitle>اجزاء</SectionTitle>
        {product.ingredients?.length ? (
          <ul className="mt-5 list-disc space-y-2 ps-5 leading-8 text-mist">
            {product.ingredients.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        ) : (
          <p className="mt-5 max-w-3xl leading-8 text-mist">{product.ingredientsNote}</p>
        )}
      </article>
    </section>
  );
}

export function ReviewsPlaceholder() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 md:py-20" aria-label="صارفین کے تجربات">
      <div className="rounded-[1.75rem] border border-gold/15 px-6 py-12 text-center md:px-10">
        <SectionTitle>صارفین کے تجربات</SectionTitle>
        {product.reviews.length > 0 ? (
          <ul className="mx-auto mt-8 max-w-2xl space-y-4 text-start">
            {product.reviews.map((review) => (
              <li key={`${review.name}-${review.text}`} className="rounded-2xl border border-gold/15 px-5 py-4">
                <p className="leading-8 text-mist">{review.text}</p>
                <p className="mt-2 text-sm text-gold-light">{review.name}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mx-auto mt-5 max-w-xl leading-8 text-mist">اصل صارفین کے تجربات جلد شامل کیے جائیں گے۔</p>
        )}
      </div>
    </section>
  );
}

export function FaqSection() {
  return (
    <section id="faq" className="mx-auto max-w-6xl scroll-mt-32 px-4 py-8 md:py-16">
      <SectionTitle className="text-center">عام سوالات</SectionTitle>
      <div className="mx-auto mt-8 max-w-3xl space-y-3">
        {faqs.map((item) => (
          <details key={item.q} className="surface-card rounded-2xl px-5 py-4" data-faq>
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-gold-light [&::-webkit-details-marker]:hidden">
              <h3 className="text-base font-medium leading-8 md:text-lg">
                <BidiText text={item.q} />
              </h3>
              <span className="faq-plus shrink-0 text-2xl leading-none text-gold" aria-hidden>
                +
              </span>
            </summary>
            <p className="mt-3 leading-8 text-mist">
              <BidiText text={item.a} />
            </p>
          </details>
        ))}
      </div>
    </section>
  );
}
