import Link from "next/link";

/** One-line footer for the admin console — the public footer's link grid is noise here. */
export function AdminFooter({ siteName }: { siteName: string }) {
  return (
    <footer className="border-t border-border bg-white/60">
      <div className="mx-auto flex w-full max-w-[1400px] flex-wrap items-center justify-between gap-x-4 gap-y-1 px-4 py-3 text-xs text-muted sm:px-6">
        <span>
          © {new Date().getFullYear()} {siteName} · 관리자 콘솔
        </span>
        <span className="flex items-center gap-3">
          <Link href="/" className="link">
            사이트 열기
          </Link>
          <Link href="/api/health" className="link" prefetch={false}>
            상태 확인
          </Link>
          <a href="https://github.com/vittroi384/qr-web" className="link" rel="noreferrer" target="_blank">
            GitHub
          </a>
        </span>
      </div>
    </footer>
  );
}
