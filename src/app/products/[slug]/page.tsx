import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { copy } from "@/data/copy";
import { faqs } from "@/data/faqs";
import { getProduct, products, relatedProducts } from "@/data/products";
import { site } from "@/data/site";
import { Bilingual } from "@/components/bilingual";
import { FaqList } from "@/components/faq-list";
import { JsonLd } from "@/components/json-ld";
import { ProductActions } from "@/components/product-actions";
import { ProductCard } from "@/components/product-card";
import { ProductGallery } from "@/components/product-gallery";
import { VideoShowcase } from "@/components/video-showcase";

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return { title: "Product" };
  return {
    title: product.name.en,
    description: product.description.en.slice(0, 160),
    alternates: { canonical: `/products/${product.slug}` },
    openGraph: {
      title: product.name.en,
      description: product.description.en.slice(0, 160),
      images: product.images[0] ? [{ url: product.images[0].src }] : [],
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();
  const related = relatedProducts(product.slug);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Product",
          name: product.name.en,
          description: product.description.en,
          image: product.images.map((image) => image.src),
          brand: { "@type": "Brand", name: site.name },
          offers: {
            "@type": "Offer",
            url: `${site.url}/products/${product.slug}`,
            priceCurrency: site.currency,
            price: product.price,
            availability: product.available
              ? "https://schema.org/InStock"
              : "https://schema.org/OutOfStock",
          },
        }}
      />
      <p className="text-sm text-[#f3eee4]/45">
        <Link href="/products">
          <Bilingual value={copy.nav.shop} />
        </Link>
        {" / "}
        <Bilingual value={product.name} />
      </p>
      <div className="mt-6 grid gap-10 lg:grid-cols-2">
        <ProductGallery images={product.images} name={product.name.en} />
        <div>
          <Bilingual
            value={product.name}
            className="font-[family-name:var(--font-display)] text-4xl text-[#f3eee4]"
            as="h1"
          />
          <Bilingual value={product.description} className="mt-4 text-sm leading-7 text-[#f3eee4]/65" as="p" />
          <div className="mt-6">
            <ProductActions product={product} />
          </div>
        </div>
      </div>

      <section className="mt-14 grid gap-10 md:grid-cols-2">
        <div>
          <Bilingual
            value={copy.product.details}
            className="font-[family-name:var(--font-display)] text-2xl text-[#f3eee4]"
            as="h2"
          />
          <Bilingual value={product.fullDescription} className="mt-4 text-sm leading-7 text-[#f3eee4]/65" as="p" />
        </div>
        <div>
          <Bilingual
            value={copy.product.warnings}
            className="font-[family-name:var(--font-display)] text-2xl text-[#f3eee4]"
            as="h2"
          />
          <ul className="mt-4 space-y-2 text-sm leading-7 text-[#f3eee4]/65">
            {product.warnings.map((warning) => (
              <li key={warning.en}>
                <Bilingual value={warning} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mt-10 grid gap-10 md:grid-cols-2">
        <div>
          <Bilingual
            value={copy.product.use}
            className="font-[family-name:var(--font-display)] text-2xl text-[#f3eee4]"
            as="h2"
          />
          <Bilingual value={product.howToUse} className="mt-4 text-sm leading-7 text-[#f3eee4]/65" as="p" />
        </div>
        <div>
          <Bilingual
            value={copy.product.ingredients}
            className="font-[family-name:var(--font-display)] text-2xl text-[#f3eee4]"
            as="h2"
          />
          <ul className="mt-4 space-y-2 text-sm leading-7 text-[#f3eee4]/65">
            {product.ingredients.map((item) => (
              <li key={item.en}>
                <Bilingual value={item} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <VideoShowcase productSlug={product.slug} />

      {related.length > 0 ? (
        <section className="mt-8">
          <Bilingual
            value={copy.product.related}
            className="mb-6 font-[family-name:var(--font-display)] text-2xl text-[#f3eee4]"
            as="h2"
          />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        </section>
      ) : null}

      <section className="mx-auto mt-16 max-w-3xl">
        <Bilingual
          value={copy.sections.faq}
          className="mb-6 font-[family-name:var(--font-display)] text-2xl text-[#f3eee4]"
          as="h2"
        />
        <FaqList items={faqs} />
      </section>
    </div>
  );
}
