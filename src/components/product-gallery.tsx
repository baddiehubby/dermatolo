"use client";

import Image from "next/image";
import { useState } from "react";
import { useLanguage } from "@/lib/language";
import type { ProductImage } from "@/lib/types";

export function ProductGallery({ images, name }: { images: ProductImage[]; name: string }) {
  const { tx } = useLanguage();
  const [active, setActive] = useState(0);
  const current = images[active];

  if (!current) {
    return (
      <div className="flex aspect-[4/5] items-center justify-center rounded-[1.8rem] bg-[#111113] px-8 text-center text-[#f3eee4]/50">
        {name}
      </div>
    );
  }

  return (
    <div className="grid gap-3">
      <div className="relative aspect-[4/5] overflow-hidden rounded-[1.8rem] bg-black">
        <Image
          src={current.src}
          alt={tx(current.alt)}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 520px"
          className="object-cover"
        />
      </div>
      {images.length > 1 ? (
        <div className="grid grid-cols-4 gap-2">
          {images.map((image, index) => (
            <button
              key={image.src}
              type="button"
              onClick={() => setActive(index)}
              className={`relative aspect-square overflow-hidden rounded-2xl border ${
                index === active ? "border-[#c9a227]" : "border-white/10"
              }`}
              aria-label={`Show image ${index + 1}`}
            >
              <Image src={image.src} alt={tx(image.alt)} fill sizes="80px" className="object-cover" />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
