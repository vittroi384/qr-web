"use client";

import { createContext, useContext, type ReactNode } from "react";
import type { Dict } from "@/lib/i18n/ko";
import type { Locale } from "@/lib/i18n/locales";

type I18nValue = { locale: Locale; t: Dict };

const I18nContext = createContext<I18nValue | null>(null);

/** Used by the per-locale providers in ./locale-providers; pages render <I18nProvider> instead. */
export function DictProvider({ locale, t, children }: I18nValue & { children: ReactNode }) {
  return <I18nContext.Provider value={{ locale, t }}>{children}</I18nContext.Provider>;
}

export function useI18n(): I18nValue {
  const value = useContext(I18nContext);
  if (!value) throw new Error("useI18n must be used inside <I18nProvider>");
  return value;
}
