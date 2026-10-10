import Link from "next/link";
import { copy } from "@/data/copy";
import { categoriesWithProducts } from "@/data/products";
import { site } from "@/data/site";
import { BrandLockup } from "@/components/brand-mark";
import { Bilingual } from "@/components/bilingual";
import { buildWhatsAppUrl, generalEnquiryMessage } from "@/lib/whatsapp";

export function Footer() {
  const shop = categoriesWithProducts();

  return (
    <footer className="mt-auto border-t border-white/8 bg-[#070708] text-[#f3eee4]">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 md:grid-cols-4">
        <div>
          <BrandLockup />
          <Bilingual value={copy.footer.blurb} className="mt-4 block text-sm leading-7 text-[#f3eee4]/70" as="p" />
        </div>
        <div>
          <Bilingual value={copy.footer.shop} className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-[#c9a227]" as="h2" />
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/products">
                <Bilingual value={copy.actions.seeAll} />
              </Link>
            </li>
            {shop.map((category) => (
              <li key={category.handle}>
                <Link href={`/collections/${category.handle}`}>
                  <Bilingual value={category.name} />
                </Link>
              </li>
            ))}
            <li>
              <Link href="/videos">
                <Bilingual value={copy.nav.videos} />
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <Bilingual value={copy.footer.help} className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-[#c9a227]" as="h2" />
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/faq">
                <Bilingual value={copy.nav.faq} />
              </Link>
            </li>
            <li>
              <Link href="/shipping">
                <Bilingual value={copy.footer.shipping} />
              </Link>
            </li>
            <li>
              <Link href="/privacy">
                <Bilingual value={copy.footer.privacy} />
              </Link>
            </li>
            <li>
              <Link href="/terms">
                <Bilingual value={copy.footer.terms} />
              </Link>
            </li>
            <li>
              <Link href="/contact">
                <Bilingual value={copy.nav.contact} />
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <Bilingual value={copy.footer.orders} className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-[#c9a227]" as="h2" />
          <p className="text-sm">{site.whatsappDisplay}</p>
          <a
            href={buildWhatsAppUrl(generalEnquiryMessage("en"))}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex rounded-full bg-[#25D366] px-4 py-2 text-sm font-semibold text-white"
          >
            <Bilingual value={copy.actions.message} />
          </a>
        </div>
      </div>
      <div className="border-t border-white/8 px-4 py-4 text-center text-xs text-[#f3eee4]/50">
        <Bilingual value={copy.footer.medical} as="p" />
        <p className="mt-2">
          © {new Date().getFullYear()} {site.legalName}. {site.city}.
        </p>
      </div>
    </footer>
  );
}
