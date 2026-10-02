import Link from "next/link";

export function SiteFooter({ siteName, notice }: { siteName: string; notice: string }) {
  return (
    <footer className="mt-10 border-t border-border bg-card/60">
      <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {new Date().getFullYear()} {siteName}. {notice}
        </p>
        <nav className="flex gap-4">
          <Link href="/guide" className="hover:text-foreground">
            사용법
          </Link>
          <Link href="/about" className="hover:text-foreground">
            소개
          </Link>
          <Link href="/privacy" className="hover:text-foreground">
            개인정보처리방침
          </Link>
        </nav>
      </div>
    </footer>
  );
}
