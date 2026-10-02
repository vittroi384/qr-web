"use client";

import { usePathname } from "next/navigation";
import { LOCALES, LOCALE_NAMES, localePath, stripLocale, type Locale } from "@/lib/i18n";

/**
 * Language menu that jumps to the same page in another locale. A full navigation on purpose:
 * the root layout (html lang, header, footer) is locale-specific and must re-render.
 */
export function LocaleSwitch({ locale, label }: { locale: Locale; label: string }) {
  const pathname = usePathname() ?? "/";
  if (pathname.startsWith("/admin")) return null;
  const base = stripLocale(pathname);
  return (
    <span className="ml-1 inline-flex items-center gap-1.5 text-muted">
      <svg viewBox="0 0 24 24" className="size-4 shrink-0" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" />
      </svg>
      <select
        aria-label={label}
        value={locale}
        onChange={(e) => window.location.assign(localePath(e.target.value as Locale, base))}
        className="min-h-7 cursor-pointer rounded-md border border-border bg-card py-1 pr-6 pl-2 text-xs font-medium text-foreground"
      >
        {LOCALES.map((l) => (
          <option key={l} value={l} lang={l}>
            {LOCALE_NAMES[l].full}
          </option>
        ))}
      </select>
    </span>
  );
}
