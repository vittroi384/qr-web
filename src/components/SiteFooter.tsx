import Link from "next/link";
import { QrMarkIcon } from "./icons";

export function SiteFooter({ siteName, notice }: { siteName: string; notice: string }) {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto flex w-full max-w-[1400px] flex-col gap-6 px-4 py-8 sm:flex-row sm:items-start sm:justify-between sm:px-6">
        <div className="min-w-0 space-y-2">
          <p className="flex items-center gap-2 text-sm font-semibold text-foreground">
            <span className="grid size-5 place-items-center rounded bg-foreground text-white">
              <QrMarkIcon className="size-3" />
            </span>
            {siteName}
          </p>
          <p className="max-w-xl text-xs leading-relaxed text-muted">
            © {new Date().getFullYear()} {siteName}. {notice}
          </p>
        </div>
        <nav aria-label="하단 메뉴" className="flex flex-wrap gap-x-5 gap-y-2 text-[13px]">
          <Link href="/guide" className="text-muted transition-colors hover:text-foreground">
            사용법
          </Link>
          <Link href="/about" className="text-muted transition-colors hover:text-foreground">
            소개
          </Link>
          <Link href="/privacy" className="font-medium text-foreground/80 transition-colors hover:text-foreground">
            개인정보처리방침
          </Link>
        </nav>
      </div>
    </footer>
  );
}
