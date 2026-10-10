import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="font-[family-name:var(--font-display)] text-4xl text-[#f3eee4]">
        <span className="ltr-only">Terms</span>
        <span className="rtl-only">شرائط</span>
      </h1>
      <p className="mt-4 text-sm leading-7 text-[#f3eee4]/65">
        <span className="ltr-only">
          An order is placed only after you send the WhatsApp message and the business confirms it.
          Prices shown are the current listed amounts. Delivery time depends on rider availability.
          Eagle Delay Spray is for adult men aged 18 and over. Follow the manufacturer’s label. This
          website is not medical advice.
        </span>
        <span className="rtl-only">
          آرڈر تب ہوتا ہے جب آپ واٹس ایپ پیغام بھیجیں اور کاروبار کنفرم کرے۔ دکھائی گئی قیمت موجودہ فہرست
          کے مطابق ہے۔ ڈیلیوری رائیڈر کی دستیابی پر منحصر ہے۔ ایگل ڈیلے اسپرے صرف ۱۸ سال سے زیادہ عمر کے
          بالغ مردوں کے لیے ہے۔ لیبل کی ہدایت پر عمل کریں۔ یہ ویب سائٹ طبی مشورہ نہیں ہے۔
        </span>
      </p>
    </div>
  );
}
