import type { Metadata } from "next";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "About",
  description: "About KAPTAAN 804 and Eagle Delay Spray in Karachi.",
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
          KAPTAAN 804 is a WhatsApp-first store in Karachi. The current catalog includes Eagle Delay
          Spray at Rs. 1,300. More products can be added when their names, prices, and copy are
          verified. This site does not take online payment.
        </span>
        <span className="rtl-only">
          کپتان ۸۰۴ کراچی کا واٹس ایپ اسٹور ہے۔ موجودہ کیٹلاگ میں ایگل ڈیلے اسپرے Rs. 1,300 پر شامل ہے۔
          مزید مصنوعات تصدیق کے بعد شامل کی جا سکتی ہیں۔ اس سائٹ پر آن لائن ادائیگی نہیں لی جاتی۔
        </span>
      </p>
      <p className="mt-4 text-sm text-[#f3eee4]/45">{site.city}</p>
    </div>
  );
}
