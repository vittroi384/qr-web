"use client";

import { useCallback, useEffect, useRef } from "react";
import type { Locale } from "@/lib/i18n/locales";
import { maskIdentifier, maskPaymentIdentifiers, maskWifiPasswords } from "@/lib/qr/sanitize";
import type { EpcPayload, LogEvent, PixPayload, QrPayload, QrStyleOptions, QrType, UpiPayload, WifiPayload } from "@/lib/qr/types";

type LogInput = {
  type: QrType;
  payload: QrPayload;
  options: QrStyleOptions;
  encoded: string;
};

/**
 * Never let a Wi-Fi password leave the browser in clear text. The server masks too, but this
 * keeps the plaintext off the network entirely. The encoded string is masked for every type,
 * so a WIFI: string pasted into the free-text type is covered as well. Bank-transfer identifiers
 * (Pix key, UPI ID, IBAN) leave partially masked for the same reason.
 */
function maskSensitive(input: LogInput): Pick<LogInput, "payload" | "encoded"> {
  const encoded = maskPaymentIdentifiers(maskWifiPasswords(input.encoded));
  switch (input.type) {
    case "wifi": {
      const wifi = input.payload as WifiPayload;
      return { payload: wifi.password ? { ...wifi, password: "****" } : wifi, encoded };
    }
    case "pix": {
      const pix = input.payload as PixPayload;
      return { payload: { ...pix, key: maskIdentifier(pix.key) }, encoded };
    }
    case "upi": {
      const upi = input.payload as UpiPayload;
      return { payload: { ...upi, vpa: maskIdentifier(upi.vpa) }, encoded };
    }
    case "epc": {
      const epc = input.payload as EpcPayload;
      return { payload: { ...epc, iban: maskIdentifier(epc.iban) }, encoded };
    }
    default:
      return { payload: input.payload, encoded };
  }
}

/** Body accepted by POST /api/log. */
export type LogBody = {
  type: QrType;
  event: LogEvent;
  payload: Record<string, string | number | boolean>;
  options: Record<string, string | number | boolean | null>;
  encoded: string;
};

/**
 * Fire-and-forget POST to /api/log. Callers are responsible for masking secrets first.
 * Only ever call this from an explicit user action (download, copy, print, batch export).
 */
export function sendLog(log: LogBody) {
  beacon("/api/log", JSON.stringify({ ...log, encoded: log.encoded.slice(0, 200) }));
}

/** Fire-and-forget JSON POST: sendBeacon, falling back to a keepalive fetch. Never throws. */
function beacon(url: string, body: string) {
  try {
    if (navigator.sendBeacon) {
      const blob = new Blob([body], { type: "application/json" });
      if (navigator.sendBeacon(url, blob)) return;
    }
    fetch(url, { method: "POST", headers: { "Content-Type": "application/json" }, body, keepalive: true }).catch(() => {});
  } catch {
    // Logging must never affect the user experience.
  }
}

/**
 * Anonymous funnel counter (POST /api/funnel), at most once per step × type per browser session.
 * Sends only the step, the QR type and the UI locale — no content.
 */
function sendFunnelOnce(step: "select" | "preview", type: QrType, locale: Locale) {
  const key = `qrm.funnel.${step}.${type}`;
  try {
    if (sessionStorage.getItem(key)) return;
    sessionStorage.setItem(key, "1");
  } catch {
    return; // No session storage → we cannot dedupe, so do not count at all.
  }
  beacon("/api/funnel", JSON.stringify({ step, type, locale }));
}

/**
 * Funnel steps for the generator: "select" once the visitor has actually chosen a type (a tile
 * click, typing into the default type, or landing on a type-specific page) — merely loading the
 * home page with its default type does not count. "preview" the first time that type renders a
 * non-empty QR. Saves are counted by /api/log.
 */
export function useFunnel(type: QrType, selected: boolean, hasPreview: boolean, locale: Locale) {
  useEffect(() => {
    if (selected) sendFunnelOnce("select", type, locale);
  }, [type, selected, locale]);

  useEffect(() => {
    if (hasPreview) sendFunnelOnce("preview", type, locale);
  }, [type, hasPreview, locale]);
}

function send(event: LogEvent, input: LogInput) {
  const safe = maskSensitive(input);
  // The frame label is free text the visitor typed: report only its length (the server does the same).
  const { frameText, ...options } = input.options;
  sendLog({
    type: input.type,
    event,
    payload: safe.payload as LogBody["payload"],
    options: { ...options, logoDataUrl: options.logoDataUrl ? "1" : null, frameTextLength: Array.from(frameText).length },
    encoded: safe.encoded,
  });
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
