"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";

/** Loads the AdSense loader once per page on public pages only (never under /admin). */
export function AdSenseScript({ client }: { client: string }) {
  const pathname = usePathname();
  if (!client || pathname.startsWith("/admin")) return null;
  return (
    <Script
      async
      strategy="afterInteractive"
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${encodeURIComponent(client)}`}
      crossOrigin="anonymous"
    />
  );
}
