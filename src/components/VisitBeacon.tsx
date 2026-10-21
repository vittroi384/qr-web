"use client";

import { useEffect } from "react";
import { SOURCE_SESSION_KEY, beacon } from "@/components/qr/useQrLogger";
import type { Locale } from "@/lib/i18n/locales";
import { classifySource } from "@/lib/traffic";

/**
 * Counts where a browser session came from (ChatGPT, Google, …), once per session on its first
 * page. Sends only the source key and the UI locale; the key is kept for the session so saves
 * (/api/log) can be attributed to it. A link from this site itself is not a new visit.
 */
export function VisitBeacon({ locale }: { locale: Locale }) {
  useEffect(() => {
    try {
      if (sessionStorage.getItem(SOURCE_SESSION_KEY)) return;
      const source = classifySource(document.referrer, new URLSearchParams(location.search).get("utm_source"), location.host);
      if (!source) return;
      sessionStorage.setItem(SOURCE_SESSION_KEY, source);
      beacon("/api/visit", JSON.stringify({ source, locale }));
    } catch {
      // No session storage → we cannot dedupe, so do not count at all.
    }
  }, [locale]);
  return null;
}
