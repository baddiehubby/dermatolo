import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-xl px-4 py-20 text-center">
      <h1 className="font-[family-name:var(--font-display)] text-4xl text-[#f3eee4]">404</h1>
      <p className="mt-3 text-[#f3eee4]/60">
        <span className="ltr-only">This page is not in the KAPTAAN 804 catalog.</span>
        <span className="rtl-only">یہ صفحہ کپتان ۸۰۴ کے کیٹلاگ میں نہیں۔</span>
      </p>
      <Link href="/products" className="mt-6 inline-flex rounded-full bg-[#c9a227] px-5 py-3 text-sm font-semibold text-[#070708]">
        <span className="ltr-only">Shop products</span>
        <span className="rtl-only">مصنوعات دیکھیں</span>
      </Link>
    </div>
  );
}
