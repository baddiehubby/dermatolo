"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { copy } from "@/data/copy";
import { searchProducts } from "@/data/products";
import { formatPKR } from "@/lib/format";
import { useLanguage } from "@/lib/language";

export function SearchDialog({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const { tx } = useLanguage();
  const [query, setQuery] = useState("");
  const results = useMemo(() => searchProducts(query).slice(0, 8), [query]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 p-4" onClick={onClose}>
      <div
        className="mx-auto mt-16 max-w-xl overflow-hidden rounded-3xl bg-[#111113] text-[#f3eee4] shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <form action="/search" className="border-b border-white/8 p-4">
          <input
            autoFocus
            name="q"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={tx(copy.search.placeholder)}
            className="h-12 w-full rounded-2xl bg-white/5 px-4 text-base outline-none"
          />
        </form>
        <div className="max-h-[60vh] overflow-y-auto p-2">
          {results.map((product) => (
            <Link
              key={product.id}
              href={`/products/${product.slug}`}
              onClick={onClose}
              className="flex items-center justify-between gap-4 rounded-2xl px-3 py-3 hover:bg-white/5"
            >
              <span className="text-sm font-medium">{tx(product.name)}</span>
              <span className="shrink-0 text-sm text-[#c9a227]">{formatPKR(product.price)}</span>
            </Link>
          ))}
          {query && results.length === 0 ? (
            <p className="px-4 py-8 text-center text-sm text-[#f3eee4]/50">{tx(copy.search.none)}</p>
          ) : null}
        </div>
      </div>
    </div>
  );
}
