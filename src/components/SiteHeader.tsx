import Link from "next/link";
import { getDict, localePath, type Locale } from "@/lib/i18n";
import { LocaleSwitch } from "./i18n/LocaleSwitch";
import { QrMarkIcon } from "./icons";

export function SiteHeader({ siteName, locale }: { siteName: string; locale: Locale }) {
  const t = getDict(locale).header;
  const nav = [
    { href: localePath(locale, "/batch"), label: t.batch, className: "" },
    { href: localePath(locale, "/about"), label: t.about, className: "" },
    // The footer always links the policy, so phones drop it here to keep the bar on one line.
    { href: localePath(locale, "/privacy"), label: t.privacy, className: "hidden sm:block" },
  ];
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-white/75 backdrop-blur-md supports-[backdrop-filter]:bg-white/65">
      <div className="mx-auto flex h-14 w-full max-w-[1400px] items-center justify-between gap-4 px-4 sm:px-6">
        <Link
          href={localePath(locale, "/")}
          className="-mx-1.5 flex min-w-0 items-center gap-2.5 rounded-md px-1.5 py-1 text-[15px] font-semibold tracking-tight text-foreground"
        >
          <span className="grid size-7 shrink-0 place-items-center rounded-md bg-accent text-white shadow-[0_2px_8px_rgb(2_132_199/0.35)]">
            <QrMarkIcon className="size-4" />
          </span>
          <span className="truncate">{siteName}</span>
        </Link>
        <div className="flex shrink-0 items-center gap-1">
          <nav aria-label={t.navLabel} className="flex items-center gap-0.5 text-sm">
            {nav.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                className={`rounded-md px-2 py-1.5 whitespace-nowrap text-muted transition-colors hover:bg-surface hover:text-foreground sm:px-3 ${n.className}`}
              >
                {n.label}
              </Link>
            ))}
          </nav>
          <LocaleSwitch locale={locale} label={t.languageLabel} />
        </div>
      </div>
    </header>
  );
}
