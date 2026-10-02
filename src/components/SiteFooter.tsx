import Link from "next/link";
import { getDict, localePath, typeToSlug, type Locale } from "@/lib/i18n";
import { QR_TYPES } from "@/lib/qr/types";
import { BrandMark } from "./BrandMark";
import { ChevronDownIcon } from "./icons";

export function SiteFooter({ siteName, notice, locale }: { siteName: string; notice: string; locale: Locale }) {
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
            <div className="pt-2 pb-1">{generatorLinks}</div>
          </details>
          <div className="hidden sm:block">
            <p className="mb-3 text-[13px] font-medium text-foreground">{t.generators}</p>
            {generatorLinks}
          </div>
        </nav>

        <nav aria-label={t.navLabel} className="flex flex-wrap gap-x-5 gap-y-2 text-[13px] md:flex-col">
          <Link href={localePath(locale, "/about")} className="text-muted transition-colors hover:text-foreground">
            {t.about}
          </Link>
          <Link href={localePath(locale, "/privacy")} className="font-medium text-foreground/80 transition-colors hover:text-foreground">
            {t.privacy}
          </Link>
        </nav>
      </div>
    </footer>
  );
}
