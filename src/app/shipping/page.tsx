import type { Metadata } from "next";
import { site } from "@/data/site";
import { Bilingual } from "@/components/bilingual";

export const metadata: Metadata = {
  title: "Shipping",
  description: "Karachi delivery notes for KAPTAAN 804 WhatsApp orders.",
  alternates: { canonical: "/shipping" },
};

export default function ShippingPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="font-[family-name:var(--font-display)] text-4xl text-[#f3eee4]">
        <span className="ltr-only">Shipping</span>
        <span className="rtl-only">ڈیلیوری</span>
      </h1>
      <Bilingual value={site.deliveryNote} className="mt-4 text-sm leading-7 text-[#f3eee4]/65" as="p" />
      <p className="mt-4 text-sm leading-7 text-[#f3eee4]/65">
        <span className="ltr-only">
          Payment is cash on delivery. Packing is plain and sealed. Confirm the delivery slot on
          WhatsApp before you send the order.
        </span>
        <span className="rtl-only">
          ادائیگی کیش آن ڈیلیوری ہے۔ پیکنگ سادہ اور بند ہے۔ آرڈر بھیجنے سے پہلے واٹس ایپ پر سلاٹ کنفرم کریں۔
        </span>
      </p>
    </div>
  );
}
