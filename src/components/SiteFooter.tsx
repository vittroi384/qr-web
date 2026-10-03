import Link from "next/link";
import { USE_CASES, getDict, localePath, typeToSlug, type Locale } from "@/lib/i18n";
import { QR_TYPES } from "@/lib/qr/types";
import { BrandMark } from "./BrandMark";
import { ChevronDownIcon, CoffeeIcon } from "./icons";

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
  // Plain text links laid out in columns across the full footer width (no tall two-column list).
  // On touch screens each row grows to a 44px target; with a mouse the list stays compact.
  const link = "block truncate text-[13px] leading-6 text-muted transition-colors pointer-coarse:py-2.5 hover:text-foreground";
  // Top-row links: 44px tall everywhere, widened a little so short words are still easy to hit.
  const navLink = "-mx-2 inline-flex min-h-11 items-center px-2 transition-colors hover:text-foreground";
  const generatorLinks = (
    <ul className="grid grid-cols-2 gap-x-6 sm:grid-cols-4 lg:grid-cols-7">
      {QR_TYPES.map((type) => (
        <li key={type} className="min-w-0">
          <Link href={localePath(locale, `/${typeToSlug(type)}`)} className={link}>
            {d.types.labels[type]}
          </Link>
        </li>
      ))}
    </ul>
  );
  const useCaseLinks = (
    <>
      <p className="mt-4 mb-1 text-xs font-medium text-muted">{t.useCases}</p>
      <ul className="grid grid-cols-2 gap-x-6 sm:grid-cols-4 lg:grid-cols-7">
        {USE_CASES.map((u) => (
          <li key={u.id} className="min-w-0">
            <Link href={localePath(locale, `/${u.slug}`)} className={link}>
              {t.useCaseLabels[u.id]}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto w-full max-w-[1400px] space-y-7 px-4 py-8 sm:px-6">
        <div className="flex flex-wrap items-start justify-between gap-6">
        <div className="min-w-0 space-y-2">
          <p className="flex items-center gap-2 text-sm font-semibold text-foreground">
            <BrandMark className="size-5 shrink-0" />
            {siteName}
          </p>
          <p className="max-w-xl text-xs leading-relaxed text-muted">
            © {new Date().getFullYear()} {siteName}. {notice}
          </p>
        </div>

        <nav aria-label={t.navLabel} className="-my-2 flex flex-wrap items-center gap-x-7 gap-y-0 text-[13px]">
          <Link href={localePath(locale, "/about")} className={`${navLink} text-muted`}>
            {t.about}
          </Link>
          <Link href={localePath(locale, "/privacy")} className={`${navLink} font-medium text-foreground/80`}>
            {t.privacy}
          </Link>
          {donateUrl ? (
            <a href={donateUrl} target="_blank" rel="noopener" className={`${navLink} gap-1.5 text-muted`}>
              <CoffeeIcon className="size-4" />
              {t.donate}
            </a>
          ) : null}
        </nav>
        </div>

        {/* Generators: chip rows across the full width; a collapsed list on phones. */}
        <nav aria-label={t.generators} className="min-w-0">
          <details className="group sm:hidden">
            <summary className="-mx-2 flex min-h-11 cursor-pointer items-center justify-between rounded-md px-2 text-[13px] font-medium text-foreground">
              {t.generators}
              <ChevronDownIcon className="size-4 text-muted transition-transform group-open:rotate-180" />
            </summary>
            <div className="pt-2 pb-1">
              {generatorLinks}
              {useCaseLinks}
            </div>
          </details>
          <div className="hidden sm:block">
            <p className="mb-1 text-[13px] font-medium text-foreground">{t.generators}</p>
            {generatorLinks}
            {useCaseLinks}
          </div>
        </nav>

      </div>
    </footer>
  );
}
