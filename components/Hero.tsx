import Link from "next/link";
import { heroReassurance } from "@/lib/content";
import { product } from "@/lib/product";
import { orderUrl } from "@/lib/whatsapp";
import { PriceTag } from "./PriceTag";
import { ProductVisual } from "./ProductVisual";
import { WhatsAppButton } from "./WhatsAppButton";

export function Hero() {
  return (
    <section id="home" className="relative overflow-hidden">
      <div
        className="hero-glow pointer-events-none absolute -top-28 left-1/2 h-[34rem] w-[34rem] -translate-x-1/2"
        aria-hidden
      />
      <div className="relative mx-auto grid max-w-6xl items-center gap-8 px-4 pb-16 pt-7 md:grid-cols-[1.05fr_0.95fr] md:gap-16 md:py-20 lg:py-24">
        <div className="order-2 max-w-xl md:order-1">
          <p className="font-latin text-[0.72rem] font-medium tracking-[0.48em] text-gold">EAGLE</p>
          <p className="font-latin mt-2 text-sm font-medium tracking-[0.34em] text-ivory/90">DELAY SPRAY</p>
          <div className="mt-5 md:hidden">
            <PriceTag enquire={false} lead />
          </div>
          <h1 className="font-nastaliq mt-4 text-[2.15rem] text-white sm:text-5xl lg:text-[3.5rem]">
            {product.tagline}
          </h1>
          <p className="mt-2 text-lg text-ivory/90 md:text-xl">{product.nameUrdu}</p>
          <p className="mt-4 max-w-md text-base leading-8 text-mist md:text-lg md:leading-9">{product.heroSupport}</p>
          <div className="mt-6 hidden md:block">
            <PriceTag enquire={false} lead />
          </div>
          <p className="mt-4 text-sm leading-7 text-mist/80">{product.ageNote}</p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <WhatsAppButton href={orderUrl()} className="w-full text-lg sm:w-auto">
              واٹس ایپ پر ابھی آرڈر کریں
            </WhatsAppButton>
            <Link href="/#usage" className="ghost-btn">
              طریقۂ استعمال
            </Link>
          </div>
          <ul className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-gold-light/90" aria-label="یقین دہانی">
            {heroReassurance.map((item, index) => (
              <li key={item} className="flex items-center gap-3">
                {index > 0 ? (
                  <span className="text-gold/70" aria-hidden>
                    •
                  </span>
                ) : null}
                {item}
              </li>
            ))}
          </ul>
        </div>
        <ProductVisual
          src={product.images.hero}
          alt={`${product.nameUrdu} کی بوتل — ${product.artworkNote}`}
          priority
          float
          sweep
          className="order-1 mx-auto aspect-[3/4] w-[min(64vw,340px)] md:order-2 md:aspect-auto md:h-[min(68vh,620px)] md:w-full"
        />
      </div>
    </section>
  );
}
