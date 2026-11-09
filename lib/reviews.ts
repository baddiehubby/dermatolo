import type { Review } from "./product";

const urduDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];

const urduMonths = [
  "جنوری",
  "فروری",
  "مارچ",
  "اپریل",
  "مئی",
  "جون",
  "جولائی",
  "اگست",
  "ستمبر",
  "اکتوبر",
  "نومبر",
  "دسمبر",
];

export function toUrduDigits(value: number | string): string {
  return String(value).replace(/\d/g, (digit) => urduDigits[Number(digit)]);
}

/**
 * Static, locale-independent date format in UTC (e.g. "۱۲ مارچ ۲۰۲۶"),
 * so the server and the browser always render the same text.
 * Returns null for an unreadable date, in which case no date is shown.
 */
const enMonths = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

/** English date for MONEY storefront (e.g. "12 Mar 2026"). */
export function formatReviewDate(iso: string): string | null {
  const time = Date.parse(iso);
  if (Number.isNaN(time)) return null;
  const date = new Date(time);
  return `${date.getUTCDate()} ${enMonths[date.getUTCMonth()]} ${date.getUTCFullYear()}`;
}

/** Legacy Urdu date helper (kept for any Urdu UI that still needs it). */
export function formatReviewDateUrdu(iso: string): string | null {
  const time = Date.parse(iso);
  if (Number.isNaN(time)) return null;
  const date = new Date(time);
  return `${toUrduDigits(date.getUTCDate())} ${urduMonths[date.getUTCMonth()]} ${toUrduDigits(date.getUTCFullYear())}`;
}

/** Keeps only entries that are usable as-is. Nothing is repaired or invented. */
export function usableReviews(reviews: readonly Review[]): Review[] {
  return reviews.filter(
    (review) =>
      review.id.trim() !== "" &&
      review.name.trim() !== "" &&
      review.textUr.trim() !== "" &&
      Number.isInteger(review.rating) &&
      review.rating >= 1 &&
      review.rating <= 5,
  );
}

export type ReviewSummary = { count: number; average: number };

/** Average and count from real reviews only. Returns null when there are none. */
export function summarizeReviews(reviews: readonly Review[]): ReviewSummary | null {
  if (reviews.length === 0) return null;
  const total = reviews.reduce((sum, review) => sum + review.rating, 0);
  return { count: reviews.length, average: total / reviews.length };
}

/* ------------------------------------------------------------------ */
/* Submission rules, shared by the form (UX) and the API (enforcement). */
/* ------------------------------------------------------------------ */

export const reviewLimits = {
  nameMin: 2,
  nameMax: 40,
  textMin: 10,
  textMax: 500,
  cityMin: 2,
  cityMax: 40,
} as const;

export type ReviewField = "name" | "rating" | "text" | "city";

export const reviewMessages = {
  name: `نام کم از کم ${toUrduDigits(reviewLimits.nameMin)} اور زیادہ سے زیادہ ${toUrduDigits(reviewLimits.nameMax)} حروف کا ہونا چاہیے۔`,
  rating: "براہِ کرم ایک سے پانچ تک ستارے منتخب کریں۔",
  text: `رائے کم از کم ${toUrduDigits(reviewLimits.textMin)} اور زیادہ سے زیادہ ${toUrduDigits(reviewLimits.textMax)} حروف کی ہونی چاہیے۔`,
  city: `شہر کا نام کم از کم ${toUrduDigits(reviewLimits.cityMin)} اور زیادہ سے زیادہ ${toUrduDigits(reviewLimits.cityMax)} حروف کا ہونا چاہیے۔`,
  link: "براہِ کرم نام، جائزے یا شہر میں لنک یا ویب سائٹ کا پتہ شامل نہ کریں۔",
  phone: "براہِ کرم نام، جائزے یا شہر میں فون نمبر شامل نہ کریں۔",
  duplicate: "آپ یہ جائزہ پہلے ہی بھیج چکے ہیں۔ براہِ کرم نیا جائزہ لکھیں یا کچھ دیر بعد دوبارہ کوشش کریں۔",
  tooFast: "براہِ کرم چند لمحے رک کر دوبارہ کوشش کریں۔",
  rateLimited: "آپ نے مختصر وقت میں بہت زیادہ آراء بھیجی ہیں۔ براہِ کرم کچھ دیر بعد دوبارہ کوشش کریں۔",
  unavailable: "رائے جمع کرانے کی سہولت اس وقت دستیاب نہیں۔ براہِ کرم واٹس ایپ کے ذریعے اپنی رائے بھیجیں۔",
  full: "اس وقت نئی آراء قبول نہیں کی جا رہیں۔ براہِ کرم بعد میں کوشش کریں۔",
  invalid: "بھیجی گئی معلومات درست نہیں۔ براہِ کرم فارم دوبارہ دیکھیں۔",
  generic: "کچھ مسئلہ پیش آ گیا۔ براہِ کرم دوبارہ کوشش کریں۔",
  success: "Thank you — your review was submitted and is awaiting moderation before it appears publicly.",
  successUr: "آپ کا جائزہ جمع ہو گیا ہے۔ منظوری کے بعد یہ صفحے پر نظر آئے گا۔ شکریہ!",
} as const;

/** Bidi overrides, zero-width space and BOM. (ZWNJ/ZWJ are kept: Urdu needs them.) */
const INVISIBLE = /[\u200B\u200E\u200F\u202A-\u202E\u2066-\u2069\uFEFF]/g;
const CONTROL = /[\u0000-\u001F\u007F-\u009F]/g;

/** Strips control characters, collapses all whitespace to single spaces, trims. */
export function cleanText(value: unknown): string {
  if (typeof value !== "string") return "";
  return value.replace(INVISIBLE, "").replace(CONTROL, " ").replace(/\s+/g, " ").trim();
}

const LINK_PATTERN =
  /(https?:\/\/|www\.|wa\.me|t\.me|bit\.ly|\b[a-z0-9-]+\.(com|net|org|pk|info|io|co|me|xyz|link|ly|app|shop|store|site|online|biz|cc|tk)\b)/i;

/** True if the text contains something that looks like a link or web address. */
export function containsLink(value: string): boolean {
  return LINK_PATTERN.test(value);
}

const arabicIndic = /[\u06F0-\u06F9\u0660-\u0669]/g;

/** True if the text contains a run of 9 or more digits (a phone-number shape). */
export function containsPhoneNumber(value: string): boolean {
  const ascii = value.replace(arabicIndic, (digit) => String(digit.charCodeAt(0) & 0xf));
  return /\d(?:[\s\-().]?\d){8,}/.test(ascii);
}

function length(value: string): number {
  return Array.from(value).length;
}

/** Text with case, spacing and punctuation removed, so trivial edits of the same review still match. */
export function normalizeForDuplicate(value: string): string {
  return cleanText(value).toLowerCase().replace(/[\s\p{P}\p{S}]+/gu, "");
}

export type ReviewInput = { name: string; rating: number; text: string; city: string };

export type ReviewCheck =
  | { ok: true; value: ReviewInput }
  | { ok: false; field: ReviewField | "text"; message: string };

/** Single source of truth for the limits. The API calls this too: never trust the browser. */
export function checkReviewInput(raw: { name?: unknown; rating?: unknown; text?: unknown; city?: unknown }): ReviewCheck {
  const name = cleanText(raw.name);
  const text = cleanText(raw.text);
  const city = cleanText(raw.city);
  const rating = typeof raw.rating === "number" ? raw.rating : Number(raw.rating);

  if (length(name) < reviewLimits.nameMin || length(name) > reviewLimits.nameMax) {
    return { ok: false, field: "name", message: reviewMessages.name };
  }
  if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
    return { ok: false, field: "rating", message: reviewMessages.rating };
  }
  if (length(text) < reviewLimits.textMin || length(text) > reviewLimits.textMax) {
    return { ok: false, field: "text", message: reviewMessages.text };
  }
  if (length(city) < reviewLimits.cityMin || length(city) > reviewLimits.cityMax) {
    return { ok: false, field: "city", message: reviewMessages.city };
  }
  const fields: [ReviewField, string][] = [
    ["name", name],
    ["text", text],
    ["city", city],
  ];
  for (const [field, value] of fields) {
    if (containsLink(value)) return { ok: false, field, message: reviewMessages.link };
    if (containsPhoneNumber(value)) return { ok: false, field, message: reviewMessages.phone };
  }
  return { ok: true, value: { name, rating, text, city } };
}

/** First visible character of a name, for the neutral initial avatar. */
export function nameInitial(name: string): string {
  const first = Array.from(name.trim())[0];
  return first ?? "";
}

