"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

const ENDPOINT = "/api/client-error";
const MAX_REPORTS = 3; // per page load
let sent = 0;

function report(message: string, stack?: string) {
  if (sent >= MAX_REPORTS || !message) return;
  sent += 1;
  const body = JSON.stringify({
    message: message.slice(0, 500),
    stack: stack?.slice(0, 2000),
    url: location.href.slice(0, 300),
    ua: navigator.userAgent.slice(0, 300),
  });
  try {
    // sendBeacon survives page unloads; fall back to a keepalive fetch where it is unavailable or refuses.
    const blob = new Blob([body], { type: "application/json" });
    if (navigator.sendBeacon?.(ENDPOINT, blob)) return;
    void fetch(ENDPOINT, { method: "POST", body, keepalive: true, headers: { "Content-Type": "application/json" } }).catch(() => {});
  } catch {
    // Reporting must never throw into the page.
  }
}

/** Forwards uncaught errors and unhandled promise rejections on public pages to /api/client-error. */
export function ClientErrorReporter() {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  useEffect(() => {
    if (isAdmin) return;
    const onError = (e: ErrorEvent) => {
      const err: unknown = e.error;
      report(e.message || String(err), err instanceof Error ? err.stack : undefined);
    };
    const onRejection = (e: PromiseRejectionEvent) => {
      const reason: unknown = e.reason;
      if (reason instanceof Error) report(`Unhandled rejection: ${reason.message}`, reason.stack);
      else report(`Unhandled rejection: ${String(reason)}`);
    };
    window.addEventListener("error", onError);
    window.addEventListener("unhandledrejection", onRejection);
    return () => {
      window.removeEventListener("error", onError);
      window.removeEventListener("unhandledrejection", onRejection);
    };
  }, [isAdmin]);

  return null;
}
