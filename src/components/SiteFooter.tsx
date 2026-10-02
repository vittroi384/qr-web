import Link from "next/link";
import { getDict, localePath, type Locale } from "@/lib/i18n";
import { BrandMark } from "./BrandMark";

export function SiteFooter({ siteName, notice, locale }: { siteName: string; notice: string; locale: Locale }) {
  const t = getDict(locale).footer;
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto flex w-full max-w-[1400px] flex-col gap-6 px-4 py-8 sm:flex-row sm:items-start sm:justify-between sm:px-6">
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
        </nav>
      </div>
    </footer>
  );
}
