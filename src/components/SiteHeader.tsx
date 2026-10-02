import Link from "next/link";

export function SiteHeader({ siteName }: { siteName: string }) {
  return (
    <header className="border-b border-border bg-card/80 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <span className="grid size-8 place-items-center rounded-lg bg-accent text-accent-foreground">
            <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="7" height="7" rx="1" />
              <rect x="14" y="3" width="7" height="7" rx="1" />
              <rect x="3" y="14" width="7" height="7" rx="1" />
              <path d="M14 14h3v3h-3zM19 14h2v2h-2zM14 19h2v2h-2zM18 18h3v3h-3z" />
            </svg>
          </span>
          <span>{siteName}</span>
        </Link>
        <nav className="flex items-center gap-4 text-sm text-muted">
          <Link href="/guide" className="hover:text-foreground">
            사용법
          </Link>
          <Link href="/about" className="hover:text-foreground">
            소개
          </Link>
          <Link href="/privacy" className="hover:text-foreground">
            개인정보
          </Link>
        </nav>
      </div>
    </header>
  );
}
