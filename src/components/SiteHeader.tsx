import Link from "next/link";
import { QrMarkIcon } from "./icons";

const NAV = [
  { href: "/guide", label: "사용법" },
  { href: "/about", label: "소개" },
  { href: "/privacy", label: "개인정보" },
];

export function SiteHeader({ siteName }: { siteName: string }) {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-card/90 backdrop-blur-md supports-[backdrop-filter]:bg-card/80">
      <div className="mx-auto flex h-14 w-full max-w-[1400px] items-center justify-between gap-4 px-4 sm:px-6">
        <Link href="/" className="-mx-1.5 flex min-w-0 items-center gap-2.5 rounded-md px-1.5 py-1 text-[15px] font-semibold tracking-tight text-foreground">
          <span className="grid size-7 shrink-0 place-items-center rounded-md bg-foreground text-white">
            <QrMarkIcon className="size-4" />
          </span>
          <span className="truncate">{siteName}</span>
        </Link>
        <nav aria-label="주요 메뉴" className="flex shrink-0 items-center gap-0.5 text-sm">
          {NAV.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className="rounded-md px-2.5 py-1.5 text-muted transition-colors hover:bg-surface hover:text-foreground sm:px-3"
            >
              {n.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
