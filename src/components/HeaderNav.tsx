"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { localePath, stripLocale, type Locale } from "@/lib/i18n";

type Item = { path: string; label: string; /** Hidden on phones — the footer links these. */ secondary?: boolean };

/** Primary navigation with the current page marked (aria-current + soft background). */
export function HeaderNav({ locale, label, items }: { locale: Locale; label: string; items: Item[] }) {
  const current = stripLocale(usePathname() ?? "/");
  return (
    <nav aria-label={label} className="flex items-center gap-0.5 text-sm">
      {items.map((item) => {
        const active = current === item.path;
        return (
          <Link
            key={item.path}
            href={localePath(locale, item.path)}
            aria-current={active ? "page" : undefined}
            className={`rounded-md px-2 py-1.5 whitespace-nowrap transition-colors sm:px-3 ${
              active ? "bg-surface font-medium text-foreground" : "text-muted hover:bg-surface hover:text-foreground"
            } ${item.secondary ? "hidden md:block" : ""}`}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
