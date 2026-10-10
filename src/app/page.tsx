import Image from "next/image";
import Link from "next/link";
import { copy } from "@/data/copy";
import { faqs } from "@/data/faqs";
import { categoriesWithProducts, products } from "@/data/products";
import { site } from "@/data/site";
import { Bilingual } from "@/components/bilingual";
import { FaqList } from "@/components/faq-list";
import { HeroActions } from "@/components/hero-actions";
import { JsonLd } from "@/components/json-ld";
import { ProductCard } from "@/components/product-card";
import { ReviewsSection } from "@/components/reviews-section";
import { VideoShowcase } from "@/components/video-showcase";

export default function Home() {
  const featured = products.filter((product) => product.featured);
  const available = products.filter((product) => product.available);
  const hero = products.find((product) => product.slug === "eagle-delay-spray") ?? products[0];
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
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-8 md:grid-cols-2 md:py-16">
          <div className="order-1 md:order-2">
            <div className="relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden rounded-[2rem] bg-black shadow-[0_30px_80px_rgba(201,162,39,0.12)] md:max-w-md">
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
            <Bilingual
              value={copy.hero.kicker}
              className="text-xs font-semibold uppercase tracking-[0.22em] text-[#c9a227]"
              as="p"
            />
            <Bilingual
              value={copy.hero.wordmark}
              className="mt-3 font-[family-name:var(--font-display)] text-5xl text-[#f3eee4] md:text-6xl"
              as="p"
            />
            <Bilingual
              value={copy.hero.headline}
              className="mt-4 font-[family-name:var(--font-display)] text-3xl leading-tight text-[#f3eee4] sm:text-5xl"
              as="h1"
            />
            <Bilingual
              value={copy.hero.support}
              className="mt-4 max-w-xl text-base leading-7 text-[#f3eee4]/65"
              as="p"
            />
            <Bilingual
              value={copy.hero.cricketTitle}
              className="mt-5 text-sm font-semibold uppercase tracking-[0.12em] text-[#c9a227]"
              as="p"
            />
            <Bilingual
              value={copy.hero.cricketSupport}
              className="mt-2 max-w-xl text-sm leading-6 text-[#f3eee4]/80"
              as="p"
            />
            <HeroActions />
            <Bilingual value={site.ageNote} className="mt-4 block text-sm text-[#f3eee4]/45" as="p" />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12">
        <Bilingual
          value={copy.sections.categories}
          className="font-[family-name:var(--font-display)] text-3xl text-[#f3eee4]"
          as="h2"
        />
        <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-3">
          {shopCategories.map((category) => (
            <Link
              key={category.handle}
              href={`/collections/${category.handle}`}
              className="rounded-[1.4rem] border border-white/8 bg-[#111113] p-5"
            >
              <Bilingual value={category.name} className="font-semibold text-[#f3eee4]" as="p" />
              <Bilingual value={category.description} className="mt-2 block text-sm text-[#f3eee4]/55" as="p" />
            </Link>
          ))}
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
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <VideoShowcase compact />

      <section className="mx-auto max-w-6xl px-4 py-12">
        <Bilingual
          value={copy.sections.available}
          className="mb-6 font-[family-name:var(--font-display)] text-3xl text-[#f3eee4]"
          as="h2"
        />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {available.map((product) => (
            <ProductCard key={`available-${product.id}`} product={product} />
          ))}
        </div>
      </section>

      <ReviewsSection />

      <section className="mx-auto max-w-3xl px-4 py-12">
        <Bilingual
          value={copy.sections.discover}
          className="mb-4 font-[family-name:var(--font-display)] text-3xl text-[#f3eee4]"
          as="h2"
        />
        <Bilingual value={copy.sections.ctaBody} className="text-sm leading-7 text-[#f3eee4]/65" as="p" />
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
