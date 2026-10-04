import Link from "next/link";
import type { ReactNode } from "react";
import { LOCALES, LOCALE_NAMES, USE_CASES, getDict, localePath, typeToSlug, type Locale } from "@/lib/i18n";
import { QR_TYPES } from "@/lib/qr/types";
import { BrandMark } from "./BrandMark";
import { ChevronDownIcon, CoffeeIcon } from "./icons";

/** Required notice for the "QR Code" mark; kept in English like other generators do. */
const TRADEMARK = "QR Code is a registered trademark of DENSO WAVE INCORPORATED.";

type FooterLink = { href: string; label: string; external?: boolean; icon?: ReactNode };

export function SiteFooter({
  siteName,
  notice,
  locale,
  donateUrl,
}: {
  siteName: string;
  notice: string;
  locale: Locale;
  /** Optional support link (admin setting); hidden when empty. */
  donateUrl?: string;
}) {
  const d = getDict(locale);
  const t = d.footer;
  const columns: { title: string; links: FooterLink[] }[] = [
    {
      title: t.generators,
      links: QR_TYPES.map((type) => ({ href: localePath(locale, `/${typeToSlug(type)}`), label: d.types.labels[type] })),
    },
    {
      title: t.useCases,
      links: USE_CASES.map((u) => ({ href: localePath(locale, `/${u.slug}`), label: t.useCaseLabels[u.id] })),
    },
    {
      title: t.info,
      links: [
        { href: localePath(locale, "/about"), label: t.about },
        { href: localePath(locale, "/privacy"), label: t.privacy },
        ...(donateUrl ? [{ href: donateUrl, label: t.donate, external: true, icon: <CoffeeIcon className="size-4" /> }] : []),
      ],
    },
  ];
  // On touch screens each row grows to a 44px target; with a mouse the list stays compact.
  const linkClass = "inline-flex items-center gap-1.5 text-[13px] leading-7 text-muted transition-colors pointer-coarse:min-h-11 hover:text-foreground";
  const renderLink = (l: FooterLink) =>
    l.external ? (
      <a href={l.href} target="_blank" rel="noopener" className={linkClass}>
        {l.icon}
        {l.label}
      </a>
    ) : (
      <Link href={l.href} className={linkClass}>
        {l.icon}
        {l.label}
      </Link>
    );
  const renderList = (links: FooterLink[], twoColumns: boolean) => (
    <ul className={twoColumns ? "grid grid-cols-2 gap-x-4" : ""}>
      {links.map((l) => (
        <li key={l.href} className="min-w-0">
          {renderLink(l)}
        </li>
      ))}
    </ul>
  );

  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto w-full max-w-[1400px] px-4 py-10 sm:px-6">
        <div className="grid gap-8 md:grid-cols-[minmax(0,1.3fr)_minmax(0,1.6fr)_minmax(0,1fr)_minmax(0,0.8fr)] md:gap-10">
          {/* Brand */}
          <div className="min-w-0 space-y-3">
            <p className="flex items-center gap-2 text-base font-bold text-foreground">
              <BrandMark className="size-6 shrink-0" />
              {siteName}
            </p>
            <p className="max-w-xs text-[13px] leading-relaxed text-muted">{t.tagline}</p>
          </div>

          {/* Link columns: a collapsed list each on phones, open columns from md. Each nav keeps
              its own label so the landmarks stay distinct for screen readers. */}
          {columns.map((col) => (
            <nav key={col.title} aria-label={col.title} className="min-w-0">
              <details className="group md:hidden">
                <summary className="-mx-2 flex min-h-11 cursor-pointer items-center justify-between rounded-md px-2 text-sm font-semibold text-foreground">
                  {col.title}
                  <ChevronDownIcon className="size-4 text-muted transition-transform group-open:rotate-180" />
                </summary>
                <div className="pt-1 pb-2">{renderList(col.links, true)}</div>
              </details>
              <div className="hidden md:block">
                <p className="mb-2 text-sm font-semibold text-foreground">{col.title}</p>
                {renderList(col.links, col.links.length > 10)}
              </div>
            </nav>
          ))}
        </div>

        {/* Languages: every edition's home page, by native name. */}
        <nav aria-label={d.header.languageLabel} className="mt-8 border-t border-border pt-5">
          <ul className="flex flex-wrap gap-x-5 gap-y-1">
            {LOCALES.map((l) => (
              <li key={l}>
                <a
                  href={localePath(l, "/")}
                  hrefLang={l}
                  lang={l}
                  aria-current={l === locale ? "page" : undefined}
                  className={`inline-flex min-h-9 items-center text-[13px] transition-colors hover:text-foreground ${
                    l === locale ? "font-semibold text-foreground" : "text-muted"
                  }`}
                >
                  {LOCALE_NAMES[l].full}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-4 space-y-1 text-xs leading-relaxed text-muted">
          <p>
            © {new Date().getFullYear()} {siteName}. {notice}
          </p>
          <p>{TRADEMARK}</p>
        </div>
      </div>
    </footer>
  );
}
