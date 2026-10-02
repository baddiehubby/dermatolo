import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { StickyCta } from "@/components/StickyCta";
import { contact, product } from "@/lib/product";

export const metadata: Metadata = {
  title: "رازداری",
  description: `${product.name} کی رازداری کی معلومات۔ آرڈر واٹس ایپ پر، ادائیگی ${product.paymentUrdu}${product.discreetPackaging ? `، اور ${product.discreetUrdu}` : ""}۔`,
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-3xl px-4 py-16 pb-28 leading-9 text-mist">
        <h1 className="font-nastaliq text-4xl text-white">رازداری</h1>
        <p className="mt-6">
          تمام آرڈرز واٹس ایپ (<bdi dir="ltr">{contact.phoneDisplay}</bdi>) کے ذریعے ہوتے ہیں۔ اس صفحے کا آرڈر فارم ادائیگی کی معلومات نہیں لیتا، اور بھیجی گئی تفصیل اس ویب سائٹ کے سرور پر محفوظ نہیں ہوتی۔ بٹن دبانے پر واٹس ایپ کھلتا ہے۔
        </p>
        <p className="mt-4">
          ادائیگی {product.paymentUrdu} ہے، یعنی رقم پارسل وصول کرتے وقت ادا کی جاتی ہے۔ یہ سائٹ کارڈ نمبر، پاس ورڈ، یا آن لائن چیک آؤٹ کے لیے استعمال نہیں ہوتی۔
        </p>
        {product.discreetPackaging ? (
          <p className="mt-4">
            آرڈر سادہ اور بند ڈسکریٹ پیکنگ میں بھیجا جاتا ہے۔ باہر سے پیکج کے اندر موجود پروڈکٹ کی نوعیت ظاہر نہیں کی جاتی۔
          </p>
        ) : null}
        <p className="mt-4">
          آپ کا نام، نمبر اور پتہ صرف آرڈر کی کنفرمیشن اور ڈیلیوری کے لیے استعمال ہوتے ہیں۔ واٹس ایپ پر بھیجا گیا پیغام واٹس ایپ کی اپنی پالیسی کے تحت رہتا ہے۔
        </p>
        <Link href="/" className="mt-8 inline-block text-gold-light hover:underline">
          واپس ہوم
        </Link>
      </main>
      <Footer />
      <StickyCta />
    </>
  );
}
