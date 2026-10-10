import type { Locale, Localized } from "@/lib/types";

export const LOCALES: Locale[] = ["en", "ur"];
export const LANG_COOKIE = "kaptaan-lang";

export function isLocale(value: string | null | undefined): value is Locale {
  return value === "en" || value === "ur";
}

export function t(value: Localized | string, locale: Locale) {
  if (typeof value === "string") return value;
  return value[locale] || value.en;
}

export function localeDir(locale: Locale) {
  return locale === "ur" ? "rtl" : "ltr";
}

export function localeLang(locale: Locale) {
  return locale === "ur" ? "ur" : "en";
}
