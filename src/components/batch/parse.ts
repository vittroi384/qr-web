import { HOST_WITH_PORT, encodeUrl } from "@/lib/qr/encoders";

export const MAX_ROWS = 200;
/** Largest byte-mode payload a version-40 code holds at error correction M. */
const MAX_BYTES = 2331;
const MAX_NAME = 40;

export type RowKind = "url" | "text";
export type RowError = "scheme" | "empty" | "tooLong";

export type RowInput = { name: string; content: string };

export type RowCheck =
  | { state: "blank" }
  | { state: "invalid"; error: RowError }
  | { state: "ok"; kind: RowKind; encoded: string };

/** Schemes that must never end up in a printed code, whatever the user meant. */
const BLOCKED_SCHEME = /^(javascript|data|vbscript|file|blob):\S/i;
/** "https://…", "ftp://…" — anything written as an address with "//". */
const SCHEME_URL = /^[a-z][a-z0-9+.-]*:\/\//i;
/** Address-like schemes without "//" that scanners open directly. */
const OPAQUE_URL = /^(mailto|tel|sms|geo|market|itms-apps):/i;
/** "example.com", "shop.example.co.kr/menu?x=1" — a bare host with a letter TLD, no spaces. */
const BARE_HOST = /^[\w-]+(\.[\w-]+)*\.[a-z]{2,}(:\d+)?([/?#]\S*)?$/i;

const utf8 = new TextEncoder();

/**
 * Decides per row whether the content is a link or plain text, so visitors never pick a mode.
 * Text that merely contains a colon ("Note: …") stays text; only address-shaped input is a URL.
 */
export function checkRow(row: RowInput): RowCheck {
  const content = row.content.trim();
  if (!content) return row.name.trim() ? { state: "invalid", error: "empty" } : { state: "blank" };
  if (BLOCKED_SCHEME.test(content)) return { state: "invalid", error: "scheme" };

  let kind: RowKind = "text";
  let encoded = content;
  if (SCHEME_URL.test(content) || OPAQUE_URL.test(content) || BARE_HOST.test(content) || HOST_WITH_PORT.test(content)) {
    kind = "url";
    encoded = encodeUrl(content);
    if (!encoded) return { state: "invalid", error: "scheme" };
  }
  if (utf8.encode(encoded).length > MAX_BYTES) return { state: "invalid", error: "tooLong" };
  return { state: "ok", kind, encoded };
}

function looksLikeUrl(value: string): boolean {
  const v = value.trim();
  return SCHEME_URL.test(v) || BARE_HOST.test(v) || HOST_WITH_PORT.test(v);
}

/**
 * Turns pasted text into rows: one line per row. A Tab (what spreadsheets put between cells)
 * splits "name<TAB>link"; if the link is clearly in the first column, the two are swapped.
 * Single-column input goes entirely into the link/content cell.
 */
export function rowsFromPaste(text: string): RowInput[] {
  const lines = text.replace(/\r\n?/g, "\n").split("\n");
  const rows: RowInput[] = [];
  for (const line of lines) {
    if (!line.trim()) continue;
    const cells = line.split("\t").map((c) => c.trim());
    const filled = cells.filter(Boolean);
    if (filled.length >= 2) {
      const [a, b] = [cells[0], cells.slice(1).find(Boolean) ?? ""];
      rows.push(looksLikeUrl(a) && !looksLikeUrl(b) ? { name: b, content: a } : { name: a, content: b });
    } else {
      rows.push({ name: "", content: filled[0] ?? "" });
    }
  }
  return rows;
}

/** True when pasting this should fan out into rows instead of filling one cell. */
export function isMultiCellPaste(text: string): boolean {
  return /\t|\n/.test(text.replace(/\r?\n$/, ""));
}

// Built at runtime: TypeScript rejects the `u` flag literal when targeting ES2017.
const UNSAFE_CHARS = new RegExp("[^\\p{L}\\p{N}._-]+", "gu");

/** "메뉴판 (2층)" → "메뉴판-2층": safe on every OS, at most 40 characters. */
export function safeFileStem(name: string): string {
  const stem = name
    .normalize("NFC")
    .replace(UNSAFE_CHARS, "-")
    .replace(/-{2,}/g, "-")
    .replace(/^[-.]+|[-.]+$/g, "");
  // Cut by code points so a surrogate pair is never split, then tidy the new end.
  return Array.from(stem).slice(0, MAX_NAME).join("").replace(/[-.]+$/, "");
}

/** "001-메뉴판.png", or just "001.png" when the row has no name. */
export function fileName(index: number, name: string): string {
  const number = String(index + 1).padStart(3, "0");
  const stem = safeFileStem(name);
  return stem ? `${number}-${stem}.png` : `${number}.png`;
}

function csvCell(value: string): string {
  // Spreadsheet apps execute cells that start with these characters as formulas.
  const guarded = /^[=+\-@\t\r]/.test(value) ? `'${value}` : value;
  return /[",\r\n]/.test(guarded) ? `"${guarded.replace(/"/g, '""')}"` : guarded;
}

/** index.csv with a UTF-8 BOM so Excel opens Korean text correctly. */
export function buildCsv(header: readonly string[], rows: readonly (readonly string[])[]): Uint8Array {
  const body = [header, ...rows].map((r) => r.map(csvCell).join(",")).join("\r\n") + "\r\n";
  return utf8.encode(`﻿${body}`);
}
