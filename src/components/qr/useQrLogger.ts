"use client";

import { useCallback, useEffect, useRef } from "react";
import type { LogEvent, QrPayload, QrStyleOptions, QrType, WifiPayload } from "@/lib/qr/types";

type LogInput = {
  type: QrType;
  payload: QrPayload;
  options: QrStyleOptions;
  encoded: string;
};

/**
 * Never let a Wi-Fi password leave the browser in clear text. The server masks too, but this
 * keeps the plaintext off the network entirely.
 */
function maskSensitive(input: LogInput): Pick<LogInput, "payload" | "encoded"> {
  if (input.type !== "wifi") return { payload: input.payload, encoded: input.encoded };
  const wifi = input.payload as WifiPayload;
  return {
    payload: wifi.password ? { ...wifi, password: "****" } : wifi,
    // Fields are `;`-delimited and `;`/`:` inside values are backslash-escaped by the encoder.
    encoded: input.encoded.replace(/;P:(?:\\.|[^;])*;/g, ";P:****;"),
  };
}

function send(event: LogEvent, input: LogInput) {
  const safe = maskSensitive(input);
  const body = JSON.stringify({
    type: input.type,
    event,
    payload: safe.payload,
    options: { ...input.options, logoDataUrl: input.options.logoDataUrl ? "1" : null },
    encoded: safe.encoded.slice(0, 200),
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
 * Reports what visitors save. Nothing is sent while typing or previewing — only when the visitor
 * downloads (PNG/SVG) or copies the image. The returned callback always reports the latest content.
 */
export function useQrLogger(current: LogInput) {
  const latest = useRef(current);

  useEffect(() => {
    latest.current = current;
  });

  return useCallback((event: Exclude<LogEvent, "generate">) => {
    if (!latest.current.encoded) return;
    send(event, latest.current);
  }, []);
}
