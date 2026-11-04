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
    // Phones: smaller items that wrap, no sideways scrolling.
    <nav aria-label="관리자 메뉴" className="flex min-w-0 flex-1 flex-wrap items-center gap-0.5 text-[13px] sm:gap-1 sm:text-sm">
      <span className="mr-1 ml-1 hidden shrink-0 rounded bg-accent px-1.5 py-0.5 text-[11px] font-semibold text-white sm:mr-2 sm:inline">관리자</span>
      {NAV.map((n) => {
        const active = n.href === "/admin" ? path === "/admin" : path.startsWith(n.href);
        return (
          <Link
            key={n.href}
            href={n.href}
            aria-current={active ? "page" : undefined}
            className={`shrink-0 rounded-md px-2 py-1 whitespace-nowrap sm:px-3 sm:py-1.5 transition-colors ${
              active ? "bg-accent font-semibold text-white shadow-xs" : "text-muted hover:bg-surface hover:text-foreground"
            }`}
          >
            {n.label}
          </Link>
        );
      })}
    </nav>
  );
}
