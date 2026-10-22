import Link from "next/link";
import type { ReactNode } from "react";

/**
 * Inline markup used by the editorial content (src/lib/content): `code` → inline code,
 * [text](/path) → link to a page on this site, [text](https://…) → external link.
 */
export function Rich({ text }: { text: string }): ReactNode {
  const parts = text.split(/(`[^`]+`|\[[^\]]+\]\([^)\s]+\))/);
  if (parts.length === 1) return text;
  return parts.map((part, i) => {
    if (i % 2 === 0) return part;
    if (part.startsWith("`")) {
      return (
        <code key={i} className="rounded bg-surface px-1 py-px font-mono text-[0.9em] break-all text-foreground">
          {part.slice(1, -1)}
        </code>
      );
    }
    const m = /^\[([^\]]+)\]\(([^)\s]+)\)$/.exec(part);
    if (!m) return part;
    const [, label, href] = m;
    return href.startsWith("/") ? (
      <Link key={i} href={href} className="link">
        {label}
      </Link>
    ) : (
      <a key={i} href={href} className="link" target="_blank" rel="noopener noreferrer">
        {label}
      </a>
    );
  });
}
