import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { categories, getCategory } from "@/data/categories";
import { getProductsByCategory } from "@/data/products";
import { Bilingual } from "@/components/bilingual";
import { ProductCard } from "@/components/product-card";

export function generateStaticParams() {
  return categories.map((category) => ({ handle: category.handle }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ handle: string }>;
}): Promise<Metadata> {
  const { handle } = await params;
  const category = getCategory(handle);
  if (!category) return { title: "Collection" };
  return {
    title: category.name.en,
    description: category.description.en,
    alternates: { canonical: `/collections/${category.handle}` },
  };
}

export default async function CollectionPage({
  params,
}: {
  params: Promise<{ handle: string }>;
}) {
  const { handle } = await params;
  const category = getCategory(handle);
  if (!category) notFound();
  const items = getProductsByCategory(category.handle);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <Bilingual
        value={category.name}
        className="font-[family-name:var(--font-display)] text-4xl text-[#f3eee4]"
        as="h1"
      />
      <Bilingual value={category.description} className="mt-3 max-w-2xl text-[#f3eee4]/60" as="p" />
      {items.length === 0 ? (
        <p className="mt-10 text-[#f3eee4]/50">
          <span className="ltr-only">No products in this collection yet.</span>
          <span className="rtl-only">اس کیٹگری میں ابھی کوئی پروڈکٹ نہیں۔</span>
        </p>
      ) : (
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
