"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV = [
  { href: "/admin", label: "대시보드" },
  { href: "/admin/stats", label: "통계" },
  { href: "/admin/logs", label: "입력 기록" },
  { href: "/admin/settings", label: "설정" },
  { href: "/admin/audit", label: "감사 로그" },
];

/** Admin menu with the current page marked (aria-current), so it is clear where you are. */
export function AdminNav() {
  const path = usePathname();
  return (
    <nav aria-label="관리자 메뉴" className="-mx-1 flex flex-wrap items-center gap-1 text-sm">
      <span className="mr-2 ml-1 rounded bg-accent px-1.5 py-0.5 text-[11px] font-semibold text-white">관리자</span>
      {NAV.map((n) => {
        const active = n.href === "/admin" ? path === "/admin" : path.startsWith(n.href);
        return (
          <Link
            key={n.href}
            href={n.href}
            aria-current={active ? "page" : undefined}
            className={`rounded-md px-3 py-1.5 transition-colors ${
              active ? "bg-accent-soft font-semibold text-accent" : "text-muted hover:bg-surface hover:text-foreground"
            }`}
          >
            {n.label}
          </Link>
        );
      })}
    </nav>
  );
}
