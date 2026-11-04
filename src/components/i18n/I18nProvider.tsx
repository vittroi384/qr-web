"use client";

import dynamic from "next/dynamic";
import type { ComponentType, ReactNode } from "react";
import type { Locale } from "@/lib/i18n/locales";

// One chunk per locale: the page loads (and preloads) only the dictionary it renders with.
// The import paths must stay literal for next/dynamic to preload them.
const PROVIDERS: Record<Locale, ComponentType<{ children: ReactNode }>> = {
  en: dynamic(() => import("./locale-providers/en")),
  ko: dynamic(() => import("./locale-providers/ko")),
  es: dynamic(() => import("./locale-providers/es")),
  pt: dynamic(() => import("./locale-providers/pt")),
  de: dynamic(() => import("./locale-providers/de")),
  fr: dynamic(() => import("./locale-providers/fr")),
  ja: dynamic(() => import("./locale-providers/ja")),
  hi: dynamic(() => import("./locale-providers/hi")),
  id: dynamic(() => import("./locale-providers/id")),
  zh: dynamic(() => import("./locale-providers/zh")),
};

/**
 * Makes the UI dictionary available to client components (read it with useI18n from ./I18nContext).
 * Only the locale crosses the server/client boundary — the dictionary holds functions.
 */
export function I18nProvider({ locale, children }: { locale: Locale; children: ReactNode }) {
  const Provider = PROVIDERS[locale];
  return <Provider>{children}</Provider>;
}
