import Link from "next/link";
import { getDict, localePath, type Locale } from "@/lib/i18n";
import { HeaderNav } from "./HeaderNav";
import { LocaleSwitch } from "./i18n/LocaleSwitch";
import { BrandMark } from "./BrandMark";

export function SiteHeader({ siteName, locale }: { siteName: string; locale: Locale }) {
  const t = getDict(locale).header;
  const nav = [
    { path: "/", label: t.create },
    { path: "/batch", label: t.batch },
    { path: "/about", label: t.about, secondary: true },
    { path: "/privacy", label: t.privacy, secondary: true },
  ];
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-white/75 backdrop-blur-md supports-[backdrop-filter]:bg-white/65">
      <div className="mx-auto flex h-14 w-full max-w-[1400px] items-center justify-between gap-4 px-4 sm:px-6">
        <Link
          href={localePath(locale, "/")}
          className="-mx-1.5 flex min-h-11 min-w-11 items-center gap-2.5 rounded-md px-1.5 py-1 text-[15px] font-semibold tracking-tight text-foreground"
        >
          <BrandMark className="size-7 shrink-0 drop-shadow-[0_2px_6px_rgba(2,132,199,0.35)]" />
          <span className="sr-only truncate min-[480px]:not-sr-only">{siteName}</span>
        </Link>
        <div className="flex shrink-0 items-center gap-1">
          <HeaderNav locale={locale} label={t.navLabel} items={nav} />
          <LocaleSwitch locale={locale} label={t.languageLabel} />
        </div>
      </div>
    </header>
  );
}
