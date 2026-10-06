"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";

/** Loads the self-hosted Umami tracker (cookieless) on public pages only (never under /admin). */
export function UmamiScript({ src, websiteId, nonce }: { src: string; websiteId: string; nonce?: string }) {
  const pathname = usePathname();
  if (!src || !websiteId || pathname.startsWith("/admin")) return null;
  return <Script defer nonce={nonce} strategy="afterInteractive" src={src} data-website-id={websiteId} />;
}
