"use client";

import { createContext, useContext, useEffect, useMemo, useSyncExternalStore } from "react";
import { LANG_COOKIE, isLocale, localeDir, localeLang } from "@/lib/i18n";
import type { Locale, Localized } from "@/lib/types";

type LanguageContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  tx: (value: Localized | string) => string;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);
const listeners = new Set<() => void>();

function readLocale(): Locale {
  if (typeof document === "undefined") return "en";
  const cookie = document.cookie
    .split("; ")
    .find((part) => part.startsWith(`${LANG_COOKIE}=`))
    ?.split("=")[1];
  if (isLocale(cookie)) return cookie;
  const stored = window.localStorage.getItem(LANG_COOKIE);
  return isLocale(stored) ? stored : "en";
}

function writeLocale(locale: Locale) {
  document.cookie = `${LANG_COOKIE}=${locale}; path=/; max-age=31536000`;
  window.localStorage.setItem(LANG_COOKIE, locale);
  document.documentElement.lang = localeLang(locale);
  document.documentElement.dir = localeDir(locale);
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const locale = useSyncExternalStore(subscribe, readLocale, () => "en" as Locale);

  useEffect(() => {
    document.documentElement.lang = localeLang(locale);
    document.documentElement.dir = localeDir(locale);
  }, [locale]);

  const value = useMemo<LanguageContextValue>(
    () => ({
      locale,
      setLocale: writeLocale,
      tx: (item) => (typeof item === "string" ? item : item[locale] || item.en),
    }),
    [locale],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return context;
}
