import Image from "next/image";
import Link from "next/link";
import { copy } from "@/data/copy";
import { faqs } from "@/data/faqs";
import { categoriesWithProducts, products } from "@/data/products";
import { site } from "@/data/site";
import { Bilingual } from "@/components/bilingual";
import { BrandLockup } from "@/components/brand-mark";
import { FaqList } from "@/components/faq-list";
import { HeroActions } from "@/components/hero-actions";
import { JsonLd } from "@/components/json-ld";
import { ProductCard } from "@/components/product-card";
import { ReviewsSection } from "@/components/reviews-section";
import { VideoShowcase } from "@/components/video-showcase";
import { formatPKR } from "@/lib/format";

export default function Home() {
  const featured = products.filter((product) => product.featured);
  const popular = (products.filter((product) => product.bestseller).length
    ? products.filter((product) => product.bestseller)
    : featured
  ).slice(0, 6);
  const hero = featured[0] ?? products[0];
  const shopCategories = categoriesWithProducts();

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Organization",
          name: site.name,
          url: site.url,
          sameAs: [site.url],
        }}
      />
      <section className="relative overflow-hidden">
        <div className="flex justify-center px-4 pt-5 md:hidden">
          <BrandLockup />
        </div>
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-6 md:grid-cols-2 md:py-16">
          <div className="order-1 md:order-2">
            <div className="relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden rounded-[2rem] border border-[#c9a227]/25 bg-black shadow-[0_30px_80px_rgba(201,162,39,0.16)] md:max-w-md">
              {hero?.images[0] ? (
                <Image
                  src={hero.images[0].src}
                  alt={hero.images[0].alt.en}
                  fill
                  priority
                  sizes="(max-width: 768px) 90vw, 420px"
                  className="object-cover"
                />
              ) : null}
            </div>
          </div>
          <div className="order-2 md:order-1">
            <div className="mb-4 hidden md:block">
              <BrandLockup />
            </div>
            <Bilingual
              value={copy.hero.kicker}
              className="text-xs font-semibold uppercase tracking-[0.22em] text-[#c9a227]"
              as="p"
            />
            <Bilingual
              value={copy.hero.wordmark}
              className="mt-3 font-[family-name:var(--font-display)] text-5xl text-[#f3eee4] md:text-6xl"
              as="h1"
            />
            <Bilingual
              value={copy.hero.headline}
              className="mt-4 font-[family-name:var(--font-display)] text-2xl leading-tight tracking-wide text-[#c9a227] sm:text-4xl"
              as="h2"
            />
            <Bilingual
              value={copy.hero.support}
              className="mt-4 max-w-xl whitespace-pre-line text-base leading-7 text-[#f3eee4]/65"
              as="p"
            />
            <div className="mt-5 flex flex-wrap gap-2">
              {hero ? (
                <span className="rounded-full border border-[#c9a227]/40 px-3 py-1 text-xs font-semibold text-[#c9a227]">
                  <Bilingual value={hero.name} /> · {formatPKR(hero.price)}
                </span>
              ) : null}
              <Bilingual
                value={copy.sections.trustDelivery}
                className="rounded-full border border-[#f3eee4]/10 px-3 py-1 text-xs text-[#f3eee4]/75"
                as="span"
              />
              <Bilingual
                value={copy.sections.trustCod}
                className="rounded-full border border-[#f3eee4]/10 px-3 py-1 text-xs text-[#f3eee4]/75"
                as="span"
              />
              <Bilingual
                value={copy.sections.trustDiscreet}
                className="rounded-full border border-[#f3eee4]/10 px-3 py-1 text-xs text-[#f3eee4]/75"
                as="span"
              />
            </div>
            <HeroActions />
            <Bilingual value={site.ageNote} className="mt-4 block text-sm text-[#f3eee4]/45" as="p" />
          </div>
        </div>
      </section>

      <section id="categories" className="mx-auto max-w-6xl px-4 py-12">
        <Bilingual
          value={copy.sections.categories}
          className="font-[family-name:var(--font-display)] text-3xl text-[#f3eee4]"
          as="h2"
        />
        <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
          {shopCategories.map((category) => {
            const cover = products.find(
              (product) => product.category === category.handle || product.categories.includes(category.handle),
            )?.images[0];
            return (
              <Link
                key={category.handle}
                href={`/collections/${category.handle}`}
                className="overflow-hidden rounded-[1.4rem] border border-[#f3eee4]/8 bg-[#111113]"
              >
                {cover ? (
                  <div className="relative aspect-[4/3]">
                    <Image src={cover.src} alt={cover.alt.en} fill sizes="(max-width: 768px) 100vw, 360px" className="object-cover" />
                  </div>
                ) : null}
                <div className="p-5">
                  <Bilingual value={category.name} className="font-semibold text-[#f3eee4]" as="p" />
                  <Bilingual value={category.description} className="mt-2 block text-sm text-[#f3eee4]/55" as="p" />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-6">
        <div className="mb-6 flex items-end justify-between gap-4">
          <Bilingual
            value={copy.sections.featured}
            className="font-[family-name:var(--font-display)] text-3xl text-[#f3eee4]"
            as="h2"
          />
          <Link href="/products" className="text-sm font-semibold text-[#c9a227]">
            <Bilingual value={copy.actions.seeAll} />
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {popular.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <VideoShowcase compact />

      <ReviewsSection />

      <section className="mx-auto max-w-6xl px-4 py-12">
        <Bilingual
          value={copy.sections.discover}
          className="mb-6 font-[family-name:var(--font-display)] text-3xl text-[#f3eee4]"
          as="h2"
        />
        <div className="grid gap-3 md:grid-cols-3">
          {[copy.sections.orderWhatsApp, copy.sections.orderDelivery, copy.sections.orderPay].map((step) => (
            <div key={step.en} className="rounded-[1.4rem] border border-[#f3eee4]/8 bg-[#111113] p-5">
              <Bilingual value={step} className="text-sm leading-7 text-[#f3eee4]/75" as="p" />
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-12">
        <Bilingual
          value={copy.sections.faq}
          className="mb-6 font-[family-name:var(--font-display)] text-3xl text-[#f3eee4]"
          as="h2"
        />
        <FaqList items={faqs} />
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-20">
        <div className="rounded-[2rem] border border-[#c9a227]/30 bg-[#111113] px-6 py-10 text-center md:px-12">
          <Bilingual
            value={copy.sections.ctaTitle}
            className="font-[family-name:var(--font-display)] text-3xl text-[#f3eee4]"
            as="h2"
          />
          <Bilingual value={copy.sections.ctaBody} className="mx-auto mt-3 max-w-xl text-sm text-[#f3eee4]/60" as="p" />
          <HeroActions />
        </div>
      </section>
    </>
  );
}
