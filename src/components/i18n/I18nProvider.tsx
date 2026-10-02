"use client";

import { createContext, useContext, type ReactNode } from "react";
import { getDict, type Dict, type Locale } from "@/lib/i18n";

type I18nValue = { locale: Locale; t: Dict };

const I18nContext = createContext<I18nValue>({ locale: "ko", t: getDict("ko") });

/**
 * Makes the UI dictionary available to client components. Only the locale crosses the
 * server/client boundary — the dictionary holds functions, so it is resolved here.
 */
export function I18nProvider({ locale, children }: { locale: Locale; children: ReactNode }) {
  return <I18nContext.Provider value={{ locale, t: getDict(locale) }}>{children}</I18nContext.Provider>;
}

export function useI18n(): I18nValue {
  return useContext(I18nContext);
}
