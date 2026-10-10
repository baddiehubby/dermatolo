"use client";

import { useSearchParams } from "next/navigation";
import { copy } from "@/data/copy";
import { searchProducts } from "@/data/products";
import { ProductCard } from "@/components/product-card";
import { useLanguage } from "@/lib/language";

export function SearchResults() {
  const { tx } = useLanguage();
  const params = useSearchParams();
  const query = params.get("q") ?? "";
  const results = searchProducts(query);

  return (
    <div className="mt-8">
      {query ? (
        <p className="mb-6 text-sm text-[#f3eee4]/55">
          {query} · {results.length}
        </p>
      ) : null}
      {results.length === 0 ? (
        <p className="text-[#f3eee4]/55">{tx(copy.search.none)}</p>
      ) : (
        <div className="grid grid-cols-2 gap-3 md:gap-4 lg:grid-cols-4">
          {results.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
