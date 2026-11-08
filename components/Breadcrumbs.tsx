import Link from "next/link";
import { JsonLd } from "./JsonLd";
import { breadcrumbJsonLd } from "@/lib/schema";

export type Crumb = { name: string; path: string };

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(items)} />
      <nav aria-label="Breadcrumb" className="text-sm text-mist/80">
        <ol className="flex flex-wrap items-center gap-2">
          {items.map((item, index) => {
            const last = index === items.length - 1;
            return (
              <li key={item.path} className="flex items-center gap-2">
                {index > 0 ? <span aria-hidden className="text-gold/40">/</span> : null}
                {last ? (
                  <span aria-current="page" className="text-ivory">
                    {item.name}
                  </span>
                ) : (
                  <Link href={item.path} className="hover:text-gold-light">
                    {item.name}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
