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
  // Chip rows that wrap across the full footer width instead of a tall two-column list.
  const chip = "inline-flex min-h-8 items-center rounded-md border border-border bg-subtle/60 px-2.5 text-[13px] text-muted transition-colors hover:border-border-strong hover:bg-subtle hover:text-foreground";
  const generatorLinks = (
    <ul className="flex flex-wrap gap-1.5">
      {QR_TYPES.map((type) => (
        <li key={type}>
          <Link href={localePath(locale, `/${typeToSlug(type)}`)} className={chip}>
            {d.types.labels[type]}
          </Link>
        </li>
      ))}
    </ul>
  );
  const useCaseLinks = (
    <>
      <p className="mt-4 mb-2 text-xs font-medium text-muted">{t.useCases}</p>
      <ul className="flex flex-wrap gap-1.5">
        {USE_CASES.map((u) => (
          <li key={u.id}>
            <Link href={localePath(locale, `/${u.slug}`)} className={chip}>
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

        <nav aria-label={t.navLabel} className="flex flex-wrap gap-x-5 gap-y-2 text-[13px]">
          <Link href={localePath(locale, "/about")} className="text-muted transition-colors hover:text-foreground">
            {t.about}
          </Link>
          <Link href={localePath(locale, "/privacy")} className="font-medium text-foreground/80 transition-colors hover:text-foreground">
            {t.privacy}
          </Link>
          {donateUrl ? (
            <a
              href={donateUrl}
              target="_blank"
              rel="noopener"
              className="inline-flex items-center gap-1.5 text-muted transition-colors hover:text-foreground"
            >
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
            <p className="mb-3 text-[13px] font-medium text-foreground">{t.generators}</p>
            {generatorLinks}
            {useCaseLinks}
          </div>
        </nav>

      </div>
    </footer>
  );
}
