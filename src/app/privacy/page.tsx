import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="font-[family-name:var(--font-display)] text-4xl text-[#f3eee4]">
        <span className="ltr-only">Privacy</span>
        <span className="rtl-only">رازداری</span>
      </h1>
      <p className="mt-4 text-sm leading-7 text-[#f3eee4]/65">
        <span className="ltr-only">
          Orders are placed on WhatsApp. We use the name, mobile number, and address you send so the
          parcel can be delivered. This site does not take card payments. Product images are stored
          with this project.
        </span>
        <span className="rtl-only">
          آرڈرز واٹس ایپ پر ہوتے ہیں۔ نام، موبائل نمبر اور پتہ ڈیلیوری کے لیے استعمال ہوتے ہیں۔ اس سائٹ پر
          کارڈ ادائیگی نہیں لی جاتی۔
        </span>
      </p>
    </div>
  );
}
