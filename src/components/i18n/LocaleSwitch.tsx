"use client";

import { useEffect, useId, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { LOCALES, LOCALE_NAMES, localePath, stripLocale, type Locale } from "@/lib/i18n";

/**
 * Language menu: a pill showing the current language that opens a popover listing every locale
 * by its native name. Items are plain <a> links on purpose — switching locale must be a full
 * navigation because the root layout (html lang, header, footer) is locale-specific.
 */
export function LocaleSwitch({ locale, label }: { locale: Locale; label: string }) {
  const pathname = usePathname() ?? "/";
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const menuId = useId();

  // Close on outside click / Escape. Listeners are only attached while the menu is open.
  useEffect(() => {
    if (!open) return;
    const onPointer = (e: PointerEvent) => {
      if (!root.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  if (pathname.startsWith("/admin")) return null;
  const base = stripLocale(pathname);

  return (
    <div ref={root} className="relative ml-1">
      <button
        type="button"
        aria-label={`${label}: ${LOCALE_NAMES[locale].full}`}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => setOpen((v) => !v)}
        className={`inline-flex h-8 items-center gap-1.5 rounded-full border px-2.5 text-xs font-semibold tracking-wide transition-colors ${
          open
            ? "border-border-strong bg-surface text-foreground"
            : "border-border bg-card text-muted hover:border-border-strong hover:bg-surface hover:text-foreground"
        }`}
      >
        <svg viewBox="0 0 24 24" className="size-4 shrink-0" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="12" cy="12" r="9" />
          <path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" />
        </svg>
        <span>{LOCALE_NAMES[locale].short}</span>
        <svg viewBox="0 0 20 20" className={`size-3.5 shrink-0 transition-transform ${open ? "rotate-180" : ""}`} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M6 8l4 4 4-4" />
        </svg>
      </button>

      {open && (
        <div
          id={menuId}
          role="menu"
          aria-label={label}
          className="absolute right-0 top-[calc(100%+8px)] z-50 w-[min(20rem,calc(100vw-2rem))] rounded-xl border border-border bg-card p-1.5 shadow-[0_12px_32px_-8px_rgba(2,132,199,0.25),0_2px_8px_rgba(15,34,55,0.08)]"
        >
          <p className="px-2 pb-1 pt-0.5 text-[11px] font-semibold uppercase tracking-wider text-muted">{label}</p>
          {/* Two columns keep nine languages to five short rows instead of a tall list. */}
          <ul className="grid grid-cols-2 gap-x-1 gap-y-0.5">
            {LOCALES.map((l) => {
              const active = l === locale;
              return (
                <li key={l}>
                  <a
                    role="menuitemradio"
                    aria-checked={active}
                    href={localePath(l, base)}
                    hrefLang={l}
                    lang={l}
                    className={`flex min-h-9 items-center justify-between gap-2 rounded-lg px-2 py-1.5 text-[13px] leading-tight transition-colors ${
                      active ? "bg-accent-soft font-medium text-accent" : "text-foreground hover:bg-surface"
                    }`}
                  >
                    <span className="truncate">{LOCALE_NAMES[l].full}</span>
                    {active && (
                      <svg viewBox="0 0 20 20" className="size-3.5 shrink-0" fill="none" stroke="currentColor" strokeWidth={2.25} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M4 10.5l4 4 8-9" />
                      </svg>
                    )}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
