import Link from "next/link";
import { cookies } from "next/headers";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/auth";

export const metadata = { title: "관리자", robots: { index: false, follow: false } };

const NAV = [
  { href: "/admin", label: "대시보드" },
  { href: "/admin/logs", label: "입력 기록" },
  { href: "/admin/settings", label: "설정" },
  { href: "/admin/audit", label: "감사 로그" },
];

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const authed = await verifySessionToken(cookieStore.get(SESSION_COOKIE)?.value);

  return (
    <div className="mx-auto max-w-7xl px-4 py-6">
      {authed ? (
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border bg-card px-4 py-3">
          <nav className="flex flex-wrap gap-1 text-sm">
            {NAV.map((n) => (
              <Link key={n.href} href={n.href} className="rounded-lg px-3 py-1.5 hover:bg-background">
                {n.label}
              </Link>
            ))}
          </nav>
          <form action="/api/admin/logout" method="post">
            <button type="submit" className="btn py-1.5 text-xs">
              로그아웃
            </button>
          </form>
        </div>
      ) : null}
      {children}
    </div>
  );
}
