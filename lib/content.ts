import { contact, formatPkr, hasConfirmedPrice, product } from "./product";

export const navItems = [
  { href: "/#home", label: "ہوم" },
  { href: "/#product", label: "مصنوعات" },
  { href: "/#usage", label: "طریقۂ استعمال" },
  { href: "/#faq", label: "سوالات" },
  { href: "/#order", label: "آرڈر" },
] as const;

export type FeatureIcon = "chat" | "pin" | "list" | "lock" | "user" | "label" | "cash";

const priceLabel = hasConfirmedPrice(product.pricePkr) ? formatPkr(product.pricePkr) : null;

export const heroReassurance = [
  product.paymentUrdu,
  ...(product.discreetPackaging ? [product.discreetUrdu] : []),
  "مکمل رازداری",
];

export const features: { icon: FeatureIcon; title: string; body: string }[] = [
  {
    icon: "chat",
    title: "واٹس ایپ آرڈر",
    body: `واٹس ایپ پر ${contact.phoneDisplay} پر پیغام بھیجیں، اور آرڈر چند سیکنڈ میں کنفرم کروائیں۔`,
  },
  {
    icon: "pin",
    title: product.freeDelivery ? "کراچی میں فری اور اسی دن ڈیلیوری" : "کراچی میں اسی دن ڈیلیوری",
    body: `${product.deliveryUrdu}۔ ${product.deliveryNote}`,
  },
  {
    icon: "cash",
    title: product.paymentUrdu,
    body: "کوئی آن لائن ادائیگی نہیں۔ پارسل ہاتھ میں آنے پر ہی رقم ادا کریں۔",
  },
  product.discreetPackaging
    ? {
        icon: "lock",
        title: "ڈسکریٹ پیکنگ",
        body: "سادہ، بند پیکنگ۔ باہر سے پروڈکٹ کی نوعیت ظاہر نہیں ہوتی۔",
      }
    : {
        icon: "lock",
        title: "پرائیویسی",
        body: "اس سائٹ پر کارڈ یا آن لائن ادائیگی نہیں لی جاتی۔ آرڈر واٹس ایپ پر رہتا ہے۔",
      },
  {
    icon: "user",
    title: "بالغ مردوں کے لیے",
    body: "یہ ذاتی دیکھ بھال کی مصنوعہ ۱۸ سال یا اس سے زیادہ عمر کے مردوں کے لیے ہے۔",
  },
  {
    icon: "label",
    title: "لیبل کے مطابق",
    body: "مقدار اور وقت کی ہدایت ہمیشہ پیکنگ کے لیبل سے لیں۔ یہاں اندازے کی خوراک نہیں لکھی گئی۔",
  },
];

export const productInfo: string[] = [
  "بالغ مردوں کے لیے ڈیلے سپرے۔",
  ...(product.isHerbal ? ["ہربل فارمولا۔"] : []),
  "قربت کے لمحات میں تاخیر اور بہتر کنٹرول میں مدد کے مقصد سے تیار کیا گیا ہے۔",
  "نتائج ہر شخص میں مختلف ہو سکتے ہیں۔",
  "فارمولا کی تفصیل پیکنگ کے لیبل پر درج ہے۔",
];

export const orderSteps = [
  { title: "واٹس ایپ کھولیں", body: `کوئی بھی آرڈر بٹن دبائیں، یا ${contact.phoneDisplay} پر پیغام بھیجیں۔` },
  { title: "تفصیل بھیجیں", body: "اپنا نام، موبائل نمبر اور مکمل پتہ بھیجیں۔" },
  { title: "آرڈر کنفرم کریں", body: "واٹس ایپ پر جواب آتے ہی آپ کا آرڈر کنفرم ہو جاتا ہے۔" },
  { title: "کراچی میں اسی دن وصول کریں", body: `پارسل ہاتھ میں آنے پر ادائیگی کریں — ${product.paymentUrdu}۔` },
] as const;

function usageSteps(): { title: string; body: string }[] {
  const { labelConfirmed, minutesBeforeUse, applicationArea } = product.usage;
  const perLabel = labelConfirmed ? "" : "لیبل کی ہدایت کے مطابق، ";
  return [
    {
      title: "بوتل ہلائیں",
      body: `${perLabel}استعمال سے پہلے بوتل کو اچھی طرح ہلائیں تاکہ فارمولا یکساں طور پر مکس ہو جائے۔`,
    },
    {
      title: "استعمال سے پہلے",
      body: applicationArea
        ? `مصنوعات کی ہدایات کے مطابق ${applicationArea} کے لیے مناسب مقدار استعمال کریں۔`
        : "مصنوعات کی ہدایات کے مطابق مطلوبہ جگہ پر مناسب مقدار استعمال کریں۔",
    },
    {
      title: "صحیح وقت",
      body:
        typeof minutesBeforeUse === "number"
          ? `قربت سے تقریباً ${minutesBeforeUse} منٹ پہلے استعمال کریں تاکہ پروڈکٹ کو اثر کرنے کا وقت ملے۔`
          : "کتنی دیر پہلے استعمال کرنا ہے، اس کے لیے پیکنگ کے لیبل کی ہدایت دیکھیں۔",
    },
    {
      title: "اضافی مقدار سے گریز",
      body: "زیادہ مقدار بہتر نتیجے کی ضمانت نہیں دیتی۔ صرف لیبل کے مطابق مقدار استعمال کریں۔",
    },
    {
      title: "حساسیت چیک کریں",
      body: "پہلی بار استعمال سے پہلے حساسیت کے بارے میں لیبل کی ہدایت پر عمل کریں۔ اگر جلن، دانے، سوجن یا نمایاں خارش ہو تو استعمال فوراً بند کریں اور ڈاکٹر سے مشورہ کریں۔",
    },
  ];
}

export const usage = {
  steps: usageSteps(),
  note: product.usage.labelConfirmed
    ? null
    : "یہ عمومی رہنمائی ہے — استعمال سے پہلے پیکنگ کے لیبل کی ہدایات ضرور پڑھیں۔",
};

export const precautions = [
  product.ageNote + "۔",
  "اگر الرجی، جلد کی حساسیت، یا کوئی متعلقہ طبی مسئلہ ہو تو استعمال سے پہلے مستند طبی مشورہ لیں۔",
  "جلن، دانے یا سوجن کی صورت میں استعمال بند کریں۔",
  "بچوں کی پہنچ سے دور رکھیں۔",
  "اجزاء اور مکمل ہدایات پیکنگ کے لیبل پر پڑھیں۔",
] as const;

const freeLine = product.freeDelivery ? " کراچی میں ڈیلیوری فری ہے۔" : "";

export const faqs: { q: string; a: string }[] = [
  {
    q: `${product.name} کیا ہے؟`,
    a: `${product.name} بالغ مردوں کے لیے ایک پریمیم${product.isHerbal ? " ہربل" : ""} ڈیلے سپرے ہے، جو قربت کے لمحات میں زیادہ کنٹرول اور اعتماد چاہنے والوں کے لیے پیش کیا گیا ہے۔ نتائج ہر شخص میں مختلف ہو سکتے ہیں۔ استعمال ہمیشہ پیکنگ کے لیبل کی ہدایات کے مطابق کریں۔`,
  },
  {
    q: "قیمت کیا ہے؟",
    a: priceLabel
      ? `${product.name} کی قیمت ${priceLabel} ہے۔${freeLine} ادائیگی ${product.paymentUrdu} کے ذریعے ہوتی ہے۔`
      : `${product.pricePrompt}۔ رقم مرکزی ترتیب میں درج ہوتے ہی اس صفحے پر دکھائی جائے گی۔`,
  },
  {
    q: "ڈیلیوری کہاں ہوتی ہے؟",
    a: `ہم کراچی بھر میں ڈیلیوری کرتے ہیں۔${freeLine} آرڈر کرتے وقت اپنا مکمل پتہ اور علاقہ ضرور لکھیں۔`,
  },
  {
    q: "ڈیلیوری کتنے وقت میں ہوتی ہے؟",
    a: "کراچی میں اسی دن ڈیلیوری کی جاتی ہے، جو آرڈر کے وقت اور ڈیلیوری کی دستیابی کے مطابق ہوتی ہے۔ آرڈر کنفرم ہونے پر واٹس ایپ پر ڈیلیوری کا متوقع وقت بتا دیا جاتا ہے۔",
  },
  {
    q: "ادائیگی کیسے ہوگی؟",
    a: `ادائیگی ${product.paymentUrdu} ہے — آپ پارسل وصول کرتے وقت رقم ادا کرتے ہیں۔ اس ویب سائٹ پر کارڈ یا آن لائن ادائیگی نہیں لی جاتی۔`,
  },
  ...(product.discreetPackaging
    ? [
        {
          q: "کیا پیکنگ ڈسکریٹ ہے؟",
          a: "جی ہاں۔ آپ کا آرڈر سادہ اور بند پیکنگ میں بھیجا جاتا ہے، اور باہر سے پیکج کے اندر موجود پروڈکٹ کی نوعیت ظاہر نہیں کی جاتی۔",
        },
      ]
    : []),
  {
    q: "آرڈر کیسے کریں؟",
    a: `واٹس ایپ پر ${contact.phoneDisplay} پر پیغام بھیجیں، یا اس صفحے کا آرڈر فارم بھریں۔ اپنا نام، موبائل نمبر، مکمل پتہ، کراچی کا علاقہ اور مقدار بھیجیں، اور آرڈر واٹس ایپ پر کنفرم ہو جائے گا۔`,
  },
  {
    q: "کیسے استعمال کروں؟",
    a: "پیکنگ کے لیبل پر لکھی ہدایات پر عمل کریں۔ اگر الرجی یا کوئی طبی مسئلہ ہو تو استعمال سے پہلے مستند طبی مشورہ لیں۔",
  },
  {
    q: "اجزاء کیا ہیں؟",
    a: product.ingredients?.length
      ? product.ingredients.join("، ")
      : "تصدیق شدہ اجزاء کی فہرست ابھی یہاں درج نہیں۔ بوتل کا لیبل دیکھیں، یا واٹس ایپ پر لیبل کی تصویر مانگ لیں۔",
  },
];

export const trustItems: string[] = [
  ...(priceLabel ? [priceLabel] : []),
  product.freeDelivery ? "فری اور اسی دن ڈیلیوری" : "اسی دن ڈیلیوری",
  product.paymentUrdu,
  ...(product.discreetPackaging ? [product.discreetUrdu] : []),
  "واٹس ایپ آرڈر",
];
