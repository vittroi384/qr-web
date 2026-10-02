"use client";

import { useState } from "react";
import { ChevronDownIcon } from "../icons";
import { BrandGlyph } from "./brandIcons";

export type PlatformOption = { id: string; name: string; fullName: string };

/**
 * Platform choice as a grid of toggle tiles (icon + short name) instead of a long <select>.
 * With `popular`, only those ids show until "More" is opened; a selection hidden behind "More"
 * opens it automatically so the active tile is always visible.
 */
export function PlatformPicker({
  label,
  options,
  value,
  onChange,
  popular,
  moreLabel,
  lessLabel,
}: {
  label: string;
  options: readonly PlatformOption[];
  value: string;
  onChange: (id: string) => void;
  popular?: readonly string[];
  moreLabel?: (hidden: number) => string;
  lessLabel?: string;
}) {
  const [open, setOpen] = useState(false);
  const ordered = popular
    ? [...popular.map((id) => options.find((o) => o.id === id)).filter((o): o is PlatformOption => Boolean(o)), ...options.filter((o) => !popular.includes(o.id))]
    : options;
  const collapsible = Boolean(popular && popular.length < options.length);
  const expanded = !collapsible || open || !popular?.includes(value);
  const shown = expanded ? ordered : ordered.filter((o) => popular?.includes(o.id));
  const hiddenCount = ordered.length - (popular?.length ?? ordered.length);

  return (
    <div className="@container">
      <div role="group" aria-label={label} className="grid auto-rows-fr grid-cols-4 gap-2 @md:grid-cols-6 @2xl:grid-cols-8">
        {shown.map((o) => {
          const active = o.id === value;
          return (
            <button
              key={o.id}
              type="button"
              aria-pressed={active}
              title={o.fullName}
              onClick={() => onChange(o.id)}
              className={`flex min-h-[68px] min-w-0 flex-col items-center justify-center gap-1.5 rounded-lg border px-1 py-2 text-center text-[11.5px] leading-tight font-medium transition-colors ${
                active
                  ? "border-accent bg-accent text-white shadow-[0_2px_10px_rgb(2_132_199/0.35)]"
                  : "border-border bg-card text-muted hover:border-border-strong hover:bg-subtle hover:text-foreground"
              }`}
            >
              <BrandGlyph id={o.id} label={o.fullName} className={`size-6 ${active ? "text-white" : ""}`} />
              <span className="line-clamp-2 max-w-full break-keep">{o.name}</span>
            </button>
          );
        })}
      </div>
      {/* Hidden while the selection lives in the extra group: collapsing would hide it. */}
      {collapsible && moreLabel && lessLabel && (!expanded || popular?.includes(value)) ? (
        <button
          type="button"
          aria-expanded={expanded}
          onClick={() => setOpen(!expanded)}
          className="btn btn-ghost btn-sm mt-2 -ml-1"
        >
          <ChevronDownIcon className={`transition-transform ${expanded ? "rotate-180" : ""}`} />
          {expanded ? lessLabel : moreLabel(hiddenCount)}
        </button>
      ) : null}
    </div>
  );
}

/** Host + path prefix of a link template, e.g. "https://www.instagram.com/{handle}/" → instagram.com, "/". */
function templateParts(template: string): { host: string; path: string } | null {
  try {
    const u = new URL(template.replace("{handle}", "HANDLE").replace("{amount}", "1"));
    const host = u.hostname.replace(/^www\./, "");
    // Sub-domain handles (name.substack.com): match on the parent domain.
    const bareHost = host.startsWith("handle.") ? host.slice("handle.".length) : host;
    const path = u.pathname.split("HANDLE")[0].replace(/\$$/, "").toLowerCase();
    return { host: bareHost, path };
  } catch {
    return null;
  }
}

/** Hosts that are the same service under another name. */
const HOST_ALIASES: Record<string, string> = {
  "twitter.com": "x.com",
  "youtu.be": "youtube.com",
  "m.youtube.com": "youtube.com",
  "fb.com": "facebook.com",
  "m.facebook.com": "facebook.com",
  "telegram.me": "t.me",
  "discord.com": "discord.gg",
  "paypal.com": "paypal.me",
  "account.venmo.com": "venmo.com",
};

/**
 * Recognises which platform a pasted link belongs to by comparing its host (and, when several
 * platforms share a host, the longest matching path prefix) with each platform's link template.
 * Returns null for anything that is not clearly a link.
 */
export function detectPlatform(input: string, platforms: readonly { id: string; template: string }[]): string | null {
  const raw = input.trim();
  if (!/^(https?:\/\/)?[\w-]+(\.[\w-]+)+(\/|$)/i.test(raw)) return null;
  let url: URL;
  try {
    url = new URL(/^https?:\/\//i.test(raw) ? raw : `https://${raw}`);
  } catch {
    return null;
  }
  const host0 = url.hostname.toLowerCase().replace(/^www\./, "");
  const host = HOST_ALIASES[host0] ?? host0;
  const path = url.pathname.toLowerCase();
  let best: { id: string; score: number } | null = null;
  for (const p of platforms) {
    const parts = templateParts(p.template);
    if (!parts) continue;
    const hostMatch = host === parts.host || host.endsWith(`.${parts.host}`);
    if (!hostMatch) continue;
    const score = path.startsWith(parts.path) ? parts.path.length : 0;
    if (!best || score > best.score) best = { id: p.id, score };
  }
  return best?.id ?? null;
}

/** encodeSocial / encodePayment accept a full link only with its scheme; add it for bare hosts. */
export function withScheme(input: string): string {
  const raw = input.trim();
  return /^https?:\/\//i.test(raw) ? input : `https://${raw}`;
}
