import Link from "next/link";
import { cookies, headers } from "next/headers";
import { LogoutIcon } from "@/components/icons";
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
  const authed = await verifySessionToken(cookieStore.get(SESSION_COOKIE)?.value, (await headers()).get("user-agent"));

  return (
    <div className="mx-auto w-full max-w-[1400px] px-4 py-6 sm:px-6 sm:py-8">
      {authed ? (
        <div className="mb-8 flex flex-wrap items-center justify-between gap-3 border-b border-border pb-3">
          <nav aria-label="관리자 메뉴" className="-mx-2.5 flex flex-wrap items-center gap-0.5 text-sm">
            <span className="mr-2 ml-2.5 rounded bg-accent px-1.5 py-0.5 text-[11px] font-semibold text-white">관리자</span>
            {NAV.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                className="rounded-md px-2.5 py-1.5 text-muted transition-colors hover:bg-surface hover:text-foreground"
              >
                {n.label}
              </Link>
            ))}
          </nav>
          <form action="/api/admin/logout" method="post">
            <button type="submit" className="btn btn-sm">
              <LogoutIcon />
              로그아웃
            </button>
          </form>
        </div>
      ) : null}
      {children}
    </div>
  );
}
