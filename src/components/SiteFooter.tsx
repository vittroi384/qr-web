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
  const generatorLinks = (
    <ul className="grid grid-cols-2 gap-x-6 gap-y-1.5 text-[13px]">
      {QR_TYPES.map((type) => (
        <li key={type} className="min-w-0">
          <Link href={localePath(locale, `/${typeToSlug(type)}`)} className="text-muted transition-colors hover:text-foreground">
            {d.types.labels[type]}
          </Link>
        </li>
      ))}
    </ul>
  );
  const useCaseLinks = (
    <>
      <p className="mt-5 mb-2 text-xs font-medium text-muted">{t.useCases}</p>
      <ul className="grid grid-cols-2 gap-x-6 gap-y-1.5 text-[13px]">
        {USE_CASES.map((u) => (
          <li key={u.id} className="min-w-0">
            <Link href={localePath(locale, `/${u.slug}`)} className="text-muted transition-colors hover:text-foreground">
              {t.useCaseLabels[u.id]}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto grid w-full max-w-[1400px] gap-8 px-4 py-8 sm:px-6 md:grid-cols-[minmax(0,1fr)_auto_auto] md:gap-12">
        <div className="min-w-0 space-y-2">
          <p className="flex items-center gap-2 text-sm font-semibold text-foreground">
            <BrandMark className="size-5 shrink-0" />
            {siteName}
          </p>
          <p className="max-w-xl text-xs leading-relaxed text-muted">
            © {new Date().getFullYear()} {siteName}. {notice}
          </p>
        </div>

        {/* Generators: two columns from sm; a collapsed list on phones. */}
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

        <nav aria-label={t.navLabel} className="flex flex-wrap gap-x-5 gap-y-2 text-[13px] md:flex-col">
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
    </footer>
  );
}
