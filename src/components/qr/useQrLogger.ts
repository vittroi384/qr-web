"use client";

import { useCallback, useEffect, useRef } from "react";
import type { LogEvent, QrPayload, QrStyleOptions, QrType } from "@/lib/qr/types";

const DEBOUNCE_MS = 1500;

type LogInput = {
  type: QrType;
  payload: QrPayload;
  options: QrStyleOptions;
  encoded: string;
};

function send(event: LogEvent, input: LogInput) {
  const body = JSON.stringify({
    type: input.type,
    event,
    payload: input.payload,
    options: { ...input.options, logoDataUrl: input.options.logoDataUrl ? "1" : null },
    encoded: input.encoded.slice(0, 200),
  });
  try {
    if (navigator.sendBeacon) {
      const blob = new Blob([body], { type: "application/json" });
      if (navigator.sendBeacon("/api/log", blob)) return;
    }
    void fetch("/api/log", { method: "POST", headers: { "Content-Type": "application/json" }, body, keepalive: true });
  } catch {
    // Logging must never affect the user experience.
  }
}

/**
 * Reports what visitors generate. `generate` fires once the QR content has been stable for
 * 1.5s and is deduped per content string for the page session; explicit actions fire immediately.
 */
export function useQrLogger(current: LogInput) {
  const latest = useRef(current);
  const seen = useRef<Set<string>>(new Set());

  useEffect(() => {
    latest.current = current;
  });

  useEffect(() => {
    const encoded = current.encoded;
    if (!encoded) return;
    const key = `${current.type}\u0000${encoded}`;
    if (seen.current.has(key)) return;
    const timer = window.setTimeout(() => {
      if (latest.current.encoded !== encoded) return;
      seen.current.add(key);
      send("generate", latest.current);
    }, DEBOUNCE_MS);
    return () => window.clearTimeout(timer);
  }, [current.type, current.encoded]);

  return useCallback((event: Exclude<LogEvent, "generate">) => {
    if (!latest.current.encoded) return;
    send(event, latest.current);
  }, []);
}
