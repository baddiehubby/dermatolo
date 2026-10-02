import Link from "next/link";
import { contact, product } from "@/lib/product";
import { orderUrl } from "@/lib/whatsapp";
import { BrandMark } from "./Icons";

export function Footer() {
  return (
    <footer className="border-t border-gold/20 bg-[#090908] pb-28 pt-16 md:pb-16">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 md:grid-cols-3">
        <div>
          <BrandMark className="h-12 w-12 text-gold" />
          <p className="font-latin mt-4 text-sm font-medium tracking-[0.32em] text-gold">EAGLE</p>
          <p className="mt-2 text-lg text-ivory">{product.nameUrdu}</p>
          <p className="font-latin mt-1 text-xs tracking-[0.22em] text-mist">{product.name}</p>
          <p className="mt-4 text-mist">
            {product.city}، {product.country}
          </p>
        </div>
        <div className="space-y-2 leading-8 text-mist">
          <p>
            WhatsApp:{" "}
            <a href={orderUrl()} target="_blank" rel="noopener noreferrer" className="text-gold-light hover:underline">
              <bdi dir="ltr">{contact.phoneDisplay}</bdi>
            </a>
          </p>
          <p>{product.ordersNote}</p>
          <p>{product.deliveryUrdu}</p>
          <p>
            ادائیگی: {product.paymentUrdu}
            {product.discreetPackaging ? ` • ${product.discreetUrdu}` : ""}
          </p>
          <p className="text-sm leading-7 text-mist/70">{product.ageNote}</p>
        </div>
        <div className="space-y-3">
          <a
            href={orderUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="block text-gold-light hover:underline"
          >
            واٹس ایپ پر آرڈر کریں
          </a>
          <Link href="/privacy" className="block text-mist hover:text-gold-light">
            رازداری
          </Link>
          <Link href="/terms" className="block text-mist hover:text-gold-light">
            شرائط
          </Link>
        </div>
      </div>
      <p className="mx-auto mt-12 max-w-6xl px-4 text-xs leading-7 text-mist/60">
        یہ ویب سائٹ طبی تشخیص یا علاج نہیں ہے۔ استعمال مینوفیکچرر کے لیبل کے مطابق کریں۔
      </p>
    </footer>
  );
}
