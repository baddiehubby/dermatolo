import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { StickyCta } from "@/components/StickyCta";
import { BidiText } from "@/components/BidiText";
import { formatPkr, hasConfirmedPrice, product } from "@/lib/product";

export const metadata: Metadata = {
  title: "شرائط",
  description: `${product.name} کی آرڈر شرائط۔ تمام آرڈرز واٹس ایپ پر، ${product.deliveryUrdu}، اور ${product.paymentUrdu}۔`,
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-3xl px-4 py-16 pb-28 leading-9 text-mist">
        <h1 className="font-nastaliq text-4xl text-white">شرائط</h1>
        <p className="mt-6">{product.ordersNote}۔ آرڈر تب کنفرم ہوتا ہے جب واٹس ایپ پر جواب آ جائے۔</p>
        {hasConfirmedPrice(product.pricePkr) ? (
          <p className="mt-4">
            <BidiText text={`قیمت: ${formatPkr(product.pricePkr)}۔ کل رقم مقدار کے حساب سے آرڈر کنفرم کرتے وقت بتائی جاتی ہے۔`} />
          </p>
        ) : null}
        <p className="mt-4">
          {product.deliveryUrdu}۔ {product.deliveryNote}
        </p>
        <p className="mt-4">ادائیگی: {product.paymentUrdu} — رقم پارسل وصول کرتے وقت ادا کی جاتی ہے۔</p>
        <p className="mt-4">{product.ageNote}۔</p>
        <p className="mt-4">یہ ویب سائٹ طبی مشورہ نہیں۔ استعمال مینوفیکچرر کے لیبل کے مطابق کریں۔</p>
        <Link href="/" className="mt-8 inline-block text-gold-light hover:underline">
          واپس ہوم
        </Link>
      </main>
      <Footer />
      <StickyCta />
    </>
  );
}
