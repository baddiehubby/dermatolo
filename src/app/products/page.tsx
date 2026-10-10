import type { Metadata } from "next";
import { copy } from "@/data/copy";
import { products } from "@/data/products";
import { Bilingual } from "@/components/bilingual";
import { ProductCard } from "@/components/product-card";

export const metadata: Metadata = {
  title: "Shop",
  description: "Browse KAPTAAN 804 products and order on WhatsApp.",
  alternates: { canonical: "/products" },
};

export default function ProductsPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <Bilingual
        value={copy.actions.seeAll}
        className="font-[family-name:var(--font-display)] text-4xl text-[#f3eee4]"
        as="h1"
      />
      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
