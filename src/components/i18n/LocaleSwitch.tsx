"use client";

import { usePathname } from "next/navigation";
import { LOCALES, localePath, stripLocale, type Locale } from "@/lib/i18n";

const NAMES: Record<Locale, { short: string; full: string }> = {
  ko: { short: "KO", full: "한국어" },
  en: { short: "EN", full: "English" },
};

/**
 * KO | EN switch pointing at the same page in the other locale. Plain <a> on purpose: the root
 * layout (html lang, header, footer) is locale-specific and must be re-rendered on switch.
 */
export function LocaleSwitch({ locale, label }: { locale: Locale; label: string }) {
  const pathname = usePathname() ?? "/";
  if (pathname.startsWith("/admin")) return null;
  const base = stripLocale(pathname);
  return (
    <div role="group" aria-label={label} className="ml-1 flex items-center rounded-md border border-border p-0.5 text-xs font-medium">
      {LOCALES.map((l) => {
        const active = l === locale;
        return (
          <a
            key={l}
            href={localePath(l, base)}
            hrefLang={l}
            lang={l}
            aria-current={active ? "true" : undefined}
            aria-label={NAMES[l].full}
            className={`grid min-h-7 min-w-8 place-items-center rounded px-1.5 transition-colors ${
              active ? "bg-surface text-foreground" : "text-muted hover:text-foreground"
            }`}
          >
            {NAMES[l].short}
          </a>
        );
      })}
    </div>
  );
}
