import type { ReactNode } from "react";

/**
 * Simple single-colour glyphs for the social and payment platforms. They are recognisable
 * line drawings, not reproductions of the trademarks, and inherit `currentColor` like the rest of
 * the icon set. Unknown ids fall back to a two-letter initial badge.
 */
const GLYPHS: Record<string, ReactNode> = {
  instagram: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <path d="M17.5 6.5h.01" />
    </>
  ),
  youtube: (
    <>
      <rect x="2" y="5" width="20" height="14" rx="4" />
      <path d="M10 9.5v5l4.5-2.5Z" />
    </>
  ),
  tiktok: (
    <>
      <path d="M14 3v11.5a3.5 3.5 0 1 1-3.5-3.5" />
      <path d="M14 3c.5 2.5 2.5 4.5 5 4.5" />
    </>
  ),
  x: <path d="M4 4l16 16M20 4 4 20" />,
  threads: (
    <>
      <circle cx="12" cy="12" r="3.5" />
      <path d="M15.5 12v1.5a2.5 2.5 0 0 0 5 0V12a8.5 8.5 0 1 0-3.3 6.7" />
    </>
  ),
  facebook: (
    <>
      <path d="M15 3h-2.5A3.5 3.5 0 0 0 9 6.5V21" />
      <path d="M6 11h8" />
    </>
  ),
  linkedin: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="3" />
      <path d="M8 10.5V17M8 7.5v.01M12 17v-6.5M12 13.5a2.5 2.5 0 0 1 5 0V17" />
    </>
  ),
  kakao_openchat: (
    <>
      <path d="M12 4c-5 0-9 3.1-9 7 0 2.5 1.7 4.7 4.2 5.9L6.5 20l3.8-2.2c.6.1 1.1.1 1.7.1 5 0 9-3.1 9-7s-4-7-9-7Z" />
      <path d="M8.5 11h.01M12 11h.01M15.5 11h.01" />
    </>
  ),
  kakao_channel: (
    <>
      <path d="M12 4c-5 0-9 3.1-9 7 0 2.5 1.7 4.7 4.2 5.9L6.5 20l3.8-2.2c.6.1 1.1.1 1.7.1 5 0 9-3.1 9-7s-4-7-9-7Z" />
      <path d="M14 9.5a2.5 2.5 0 1 0 0 3" />
    </>
  ),
  naver_blog: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="3" />
      <path d="M8.5 16.5v-9l7 9v-9" />
    </>
  ),
  naver_smartstore: (
    <>
      <path d="M5 8h14l-1 12H6Z" />
      <path d="M9 8V6.5a3 3 0 0 1 6 0V8" />
      <path d="M10 17v-5l4 5v-5" />
    </>
  ),
  github: <path d="m9 7-5 5 5 5M15 7l5 5-5 5" />,
  telegram: (
    <>
      <path d="M21 4 3 11l6 2.5L11.5 20l3-4 4.5 3.5Z" />
      <path d="M9 13.5 21 4" />
    </>
  ),
  line: (
    <>
      <path d="M12 4C7 4 3 7.1 3 11c0 3.5 3.2 6.4 7.5 6.9l1 2.1 1.5-2c4.5-.5 8-3.4 8-7 0-3.9-4-7-9-7Z" />
      <path d="M8 9.5v3h1.5M11.5 9.5v3M14 12.5v-3l2.5 3v-3" />
    </>
  ),
  spotify: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M7.5 9.5c3-1 6.5-.7 9 .8M8 12.5c2.5-.7 5.2-.4 7.3.8M8.5 15.3c2-.5 4-.3 5.6.6" />
    </>
  ),
  pinterest: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M11 20.5 13 12" />
      <path d="M10.5 13.5c.5 1 1.5 1.5 2.5 1.5 2.5 0 4-2 4-4.5S15 6.5 12 6.5 7 8.5 7 11c0 1 .3 1.8.8 2.3" />
    </>
  ),
  snapchat: (
    <path d="M12 3c3 0 5 2.2 5 5v2.5l2-.5-1 2c.5 1.5 1.8 2.5 3 3-1 .7-2.3.8-3 1l-.5 1.5c-1-.2-2-.3-3 .3-1 .7-1.5 1.2-2.5 1.2s-1.5-.5-2.5-1.2c-1-.6-2-.5-3-.3L6 16c-.7-.2-2-.3-3-1 1.2-.5 2.5-1.5 3-3l-1-2 2 .5V8c0-2.8 2-5 5-5Z" />
  ),
  twitch: (
    <>
      <path d="M4.5 3 3 7v12h4.5v2h2.5l2-2h4l5-5V3Z" />
      <path d="M11 8v4M15.5 8v4" />
    </>
  ),
  discord: (
    <>
      <path d="M8 6.5c-1.5.3-3 .9-4 1.5C2.5 11 2 14 2.3 17c1.3 1 2.8 1.6 4.2 2l1-1.8M16 6.5c1.5.3 3 .9 4 1.5 1.5 3 2 6 1.7 9-1.3 1-2.8 1.6-4.2 2l-1-1.8" />
      <path d="M7 16.8c3.3 1.3 6.7 1.3 10 0M8 7c2.7-.7 5.3-.7 8 0" />
      <path d="M9.5 12.5h.01M14.5 12.5h.01" />
    </>
  ),
  reddit: (
    <>
      <ellipse cx="12" cy="14.5" rx="7" ry="5" />
      <path d="M12 9.5 13 4l4 1" />
      <circle cx="18" cy="5" r="1.2" />
      <path d="M9.5 13.5h.01M14.5 13.5h.01M9.5 16.5c1.5 1 3.5 1 5 0" />
    </>
  ),
  linktree: <path d="M12 21v-9M5 9h14M7.5 4.5 12 9l4.5-4.5M7.5 13.5 12 9l4.5 4.5" />,
  calendly: (
    <>
      <rect x="3" y="4.5" width="18" height="16.5" rx="2.5" />
      <path d="M8 2.5v4M16 2.5v4" />
      <path d="M14.5 11.5a3 3 0 1 0 0 4" />
    </>
  ),
  google_review: <path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9Z" />,
  yelp: (
    <path d="M12 3c1 3 4.5 4.5 4.5 9a4.5 4.5 0 0 1-9 0c0-1.7.8-2.9 1.7-3.9.2 1.6 1 2.2 1.9 2.4C11 8 11 5.5 12 3Z" />
  ),
  whatsapp_channel: (
    <>
      <path d="M4 10v4h3l7 4V6l-7 4Z" />
      <path d="M17.5 9.5a3.5 3.5 0 0 1 0 5" />
    </>
  ),
  signal: (
    <>
      <circle cx="12" cy="12" r="9" strokeDasharray="3 2.2" />
      <path d="M12 7.5a4.5 4.5 0 0 0-3.9 6.8L7.5 16.5l2.2-.6A4.5 4.5 0 1 0 12 7.5Z" />
    </>
  ),
  medium: <path d="M4 18V6l8 9 8-9v12" />,
  substack: <path d="M5 4h14M5 8h14M5 12h14v8l-7-4-7 4Z" />,

  // Payment services
  paypal: (
    <>
      <path d="M7 19 9.5 4h5a3.5 3.5 0 0 1 0 7H11" />
      <path d="M10.5 21 12 13.5h3.5A3.5 3.5 0 0 0 19 10" />
    </>
  ),
  venmo: <path d="M5 5h3.5l2 11c2.5-3.5 4.5-7 4.5-9.5 0-.6-.1-1-.3-1.5H18c.3.6.4 1.3.4 2 0 3.5-3.5 9-6.5 13H8Z" />,
  cashapp: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <path d="M14.5 9.5a2.6 2 0 0 0-2.5-1.5c-1.4 0-2.5.8-2.5 1.9 0 2.6 5 1.6 5 4.2 0 1.1-1.1 1.9-2.5 1.9a2.6 2 0 0 1-2.5-1.5M12 6.5V8M12 16v1.5" />
    </>
  ),
  buymeacoffee: (
    <>
      <path d="M6 9h12l-1.5 11.5h-9Z" />
      <path d="M5 6h14v3H5Z" />
      <path d="M9 3.5h6" />
    </>
  ),
  kofi: (
    <>
      <path d="M4 8h13v6a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5Z" />
      <path d="M17 10h1.5a2.5 2.5 0 0 1 0 5H17" />
      <path d="M10.5 15.5S8 14 8 12.5a1.25 1.25 0 0 1 2.5-.3 1.25 1.25 0 0 1 2.5.3c0 1.5-2.5 3-2.5 3Z" />
    </>
  ),
  patreon: (
    <>
      <circle cx="14.5" cy="9.5" r="5.5" />
      <path d="M5 4v16" />
    </>
  ),
  revolut: (
    <>
      <path d="M7 20V4h6a4 4 0 0 1 0 8H7" />
      <path d="m12 12 5 8" />
    </>
  ),
  wise: <path d="M3 6l4.5 12L12 9l4.5 9L21 6" />,
};

// Built at runtime: TypeScript rejects the `u` flag literal when targeting ES2017.
const NON_WORD = new RegExp("[^\\p{L}\\p{N}\\s]+", "gu");

function initials(label: string): string {
  const words = label.replace(NON_WORD, " ").trim().split(/\s+/);
  const letters = words.length > 1 ? words[0][0] + words[1][0] : (words[0] ?? "?").slice(0, 2);
  return letters.toUpperCase();
}

export function BrandGlyph({ id, label, className = "size-6" }: { id: string; label: string; className?: string }) {
  const glyph = GLYPHS[id];
  if (!glyph) {
    return (
      <span
        aria-hidden="true"
        className={`grid shrink-0 place-items-center rounded-md border-[1.5px] border-current text-[10px] font-semibold ${className}`}
      >
        {initials(label)}
      </span>
    );
  }
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className={`shrink-0 ${className}`}
    >
      {glyph}
    </svg>
  );
}
