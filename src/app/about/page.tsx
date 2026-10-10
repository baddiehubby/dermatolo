import type { Metadata } from "next";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "About",
  description: "About KAPTAAN 804, a Karachi WhatsApp store for Eagle Delay Spray.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="font-[family-name:var(--font-display)] text-4xl text-[#f3eee4]">
        <span className="ltr-only">About KAPTAAN 804</span>
        <span className="rtl-only">کپتان ۸۰۴ کے بارے میں</span>
      </h1>
      <p className="mt-4 text-sm leading-7 text-[#f3eee4]/65">
        <span className="ltr-only">
          KAPTAAN 804 is a Karachi storefront for Eagle Delay Spray. New products are added only
          when their details are verified. This site does not take online payment.
        </span>
        <span className="rtl-only">
          کپتان ۸۰۴ کراچی میں ایگل ڈیلے اسپرے کا اسٹور ہے۔ نئی مصنوعات تب شامل ہوتی ہیں جب ان کی تفصیل تصدیق شدہ ہو۔ اس سائٹ پر آن لائن ادائیگی نہیں۔
        </span>
      </p>
      <p className="mt-4 text-sm text-[#f3eee4]/45">{site.city}</p>
    </div>
  );
}
