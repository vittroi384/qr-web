import { encodeUrl } from "@/lib/qr/encoders";

export const MAX_LINES = 200;
/** Largest byte-mode payload a version-40 code holds at error correction M. */
const MAX_BYTES = 2331;
const MAX_NAME = 40;

export type BatchMode = "url" | "text";
export type BatchError = "scheme" | "empty" | "tooLong";

export type BatchItem = {
  /** 1-based line number in the textarea (blank lines count). */
  line: number;
  label: string;
  content: string;
  /** What goes into the QR code. Empty when `error` is set. */
  encoded: string;
  error: BatchError | null;
};

export type BatchParse = { items: BatchItem[]; total: number; valid: number };

const SCHEME = /^[a-z][a-z0-9+.-]*:/i;
/** "example.com/menu" — a bare address, so a comma after it is part of the URL, not a label. */
const BARE_HOST = /^[\w-]+(\.[\w-]+)+(\/\S*)?$/;

/**
 * Splits "label<TAB>content" or "label, content" (first separator only, so content keeps its
 * commas). A line that already starts like an address is never split at a comma. In text mode
 * only a Tab separates: commas are ordinary punctuation there.
 */
function splitLine(line: string, mode: BatchMode): { label: string; content: string } {
  const tab = line.indexOf("\t");
  if (tab >= 0) return { label: line.slice(0, tab).trim(), content: line.slice(tab + 1).trim() };
  if (mode === "url") {
    const comma = line.indexOf(",");
    if (comma > 0) {
      const head = line.slice(0, comma).trim();
      if (!SCHEME.test(head) && !BARE_HOST.test(head)) return { label: head, content: line.slice(comma + 1).trim() };
    }
  }
  return { label: "", content: line.trim() };
}

const utf8 = new TextEncoder();

export function parseBatch(text: string, mode: BatchMode): BatchParse {
  const items: BatchItem[] = [];
  text.split(/\r?\n/).forEach((raw, i) => {
    if (!raw.trim()) return;
    const { label, content } = splitLine(raw, mode);
    let encoded = "";
    let error: BatchError | null = null;
    if (!content) error = "empty";
    else {
      encoded = mode === "url" ? encodeUrl(content) : content;
      if (!encoded) error = "scheme";
      else if (utf8.encode(encoded).length > MAX_BYTES) error = "tooLong";
    }
    items.push({ line: i + 1, label, content, encoded: error ? "" : encoded, error });
  });
  return { items, total: items.length, valid: items.filter((it) => !it.error).length };
}

// Built at runtime: TypeScript rejects the `u` flag literal when targeting ES2017.
const UNSAFE_CHARS = new RegExp("[^\\p{L}\\p{N}._-]+", "gu");

/** "메뉴판" / "https://example.com/a?b" → "메뉴판" / "example.com-a-b": safe on every OS. */
export function safeFileStem(item: Pick<BatchItem, "label" | "content">): string {
  const source = item.label || item.content.replace(/^[a-z][a-z0-9+.-]*:(\/\/)?/i, "");
  const stem = source
    .normalize("NFC")
    .replace(UNSAFE_CHARS, "-")
    .replace(/-{2,}/g, "-")
    .replace(/^[-.]+|[-.]+$/g, "");
  // Cut by code points so a surrogate pair is never split, then tidy the new end.
  const cut = Array.from(stem).slice(0, MAX_NAME).join("").replace(/[-.]+$/, "");
  return cut || "qr";
}

export function fileName(index: number, item: Pick<BatchItem, "label" | "content">): string {
  return `${String(index + 1).padStart(3, "0")}-${safeFileStem(item)}.png`;
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
