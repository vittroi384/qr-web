import type { QrStyleOptions } from "./types";

/**
 * Geometry of the decorative frame (coloured border + label bar) that wraps a saved QR image.
 * Pure arithmetic, shared by the canvas renderer, the SVG builder and the size caption so all
 * three agree to the pixel. Everything is relative to the QR bitmap's own size.
 */

/** Longest label the UI accepts (code points). */
export const FRAME_TEXT_MAX = 40;
/** Border thickness, label bar height and nominal font size as shares of the QR size. */
const BORDER_RATIO = 0.06;
const BAR_RATIO = 0.18;
const FONT_RATIO = 0.55;
/**
 * A label is shrunk to fit down to this share of the nominal font size, then cut with an ellipsis.
 * 40 % lets the longest allowed Latin label (40 characters) fit without being cut.
 */
const MIN_FONT_RATIO = 0.4;
const ELLIPSIS = "…";

export const FRAME_TEXT_COLOR = "#ffffff";
/** System fonts so Korean, Japanese and Hindi labels render without bundling a typeface. */
export const FRAME_FONT_FAMILY = 'system-ui, -apple-system, "Segoe UI", Roboto, "Noto Sans", sans-serif';
export const FRAME_FONT_WEIGHT = 700;

export type FrameLayout = {
  width: number;
  height: number;
  /** Where the QR bitmap goes. */
  qr: { x: number; y: number; size: number };
  /** Coloured strip under the code (border + label bar), null when there is no label. */
  bar: { x: number; y: number; w: number; h: number } | null;
  /** Label centre, fitted font size and the (possibly shortened) text. Null without a label. */
  text: { x: number; y: number; fontPx: number; maxWidth: number; value: string } | null;
  /** Corner radius of the outer frame; 0 without a frame. */
  radius: number;
  /** Border thickness; 0 without a frame. */
  border: number;
};

/** Width in pixels of `text` set at `fontPx` (canvas: `measureText`; elsewhere: the estimate below). */
export type TextMeasure = (text: string, fontPx: number) => number;

export function hasFrame(style: Pick<QrStyleOptions, "frame">): boolean {
  return style.frame !== "none";
}

/** Border/bar colour: the chosen one, or the code colour when none was chosen. */
export function resolveFrameColor(style: Pick<QrStyleOptions, "frameColor" | "darkColor">): string {
  return style.frameColor || style.darkColor;
}

/** CSS shorthand for the label font at `fontPx`. */
export function frameFont(fontPx: number): string {
  return `${FRAME_FONT_WEIGHT} ${fontPx}px ${FRAME_FONT_FAMILY}`;
}

/** Trims, collapses whitespace and caps the label at FRAME_TEXT_MAX code points. */
export function normalizeFrameText(text: string): string {
  return Array.from(text.replace(/\s+/g, " ").trim()).slice(0, FRAME_TEXT_MAX).join("");
}

const WIDE = /[ᄀ-ᇿ⺀-〿぀-ヿ㄰-㆏㐀-䶿一-鿿가-힯豈-﫿＀-｠￠-￦]/u;
const NARROW = /[iljtfI.,:;'!|()[\]]/;
const BROAD = /[mwMW@%]/;

/**
 * Rough advance width of `text` in a bold system sans-serif, for places without a canvas (SVG,
 * tests). East Asian characters count as a full em, combining marks as nothing.
 */
export function estimateTextWidth(text: string, fontPx: number): number {
  let em = 0;
  for (const ch of text) {
    if (/\p{M}/u.test(ch)) continue;
    if (ch === " ") em += 0.3;
    else if (WIDE.test(ch)) em += 1;
    else if (NARROW.test(ch)) em += 0.33;
    else if (BROAD.test(ch)) em += 0.9;
    else if (/[A-Z0-9]/.test(ch)) em += 0.68;
    else em += 0.58;
  }
  return em * fontPx;
}

/**
 * Makes `text` fit in `maxWidth`: first by shrinking the font (down to MIN_FONT_RATIO of the nominal size),
 * then by cutting characters off the end and adding an ellipsis.
 */
export function fitLabel(text: string, fontPx: number, maxWidth: number, measure: TextMeasure): { value: string; fontPx: number } {
  const width = measure(text, fontPx);
  if (width <= maxWidth) return { value: text, fontPx };
  const minPx = Math.max(8, Math.round(fontPx * MIN_FONT_RATIO));
  // Advance widths scale linearly with the font size.
  const shrunk = Math.floor((fontPx * maxWidth) / width);
  if (shrunk >= minPx) return { value: text, fontPx: shrunk };
  const chars = Array.from(text);
  while (chars.length > 1 && measure(chars.join("") + ELLIPSIS, minPx) > maxWidth) chars.pop();
  return { value: chars.join("").trimEnd() + ELLIPSIS, fontPx: minPx };
}

/**
 * Lays out the frame around a QR bitmap of `qrSize` pixels. With `frame: "none"` the result is the
 * bare QR (width = height = qrSize, nothing else), so callers can use it unconditionally.
 */
export function frameLayout(qrSize: number, style: Pick<QrStyleOptions, "frame" | "frameText">, measure: TextMeasure = estimateTextWidth): FrameLayout {
  if (!hasFrame(style)) {
    return { width: qrSize, height: qrSize, qr: { x: 0, y: 0, size: qrSize }, bar: null, text: null, radius: 0, border: 0 };
  }
  const border = Math.round(qrSize * BORDER_RATIO);
  const label = normalizeFrameText(style.frameText);
  const barH = label ? Math.round(qrSize * BAR_RATIO) : 0;
  const width = qrSize + border * 2;
  const height = width + barH;
  const layout: FrameLayout = {
    width,
    height,
    qr: { x: border, y: border, size: qrSize },
    bar: null,
    text: null,
    radius: border * 2,
    border,
  };
  if (!label) return layout;
  // The strip under the code is the bottom border plus the bar; the label sits in its middle.
  layout.bar = { x: 0, y: border + qrSize, w: width, h: border + barH };
  // The label may run as wide as the code itself: one border width of padding on each side.
  const maxWidth = qrSize;
  const fitted = fitLabel(label, Math.round(barH * FONT_RATIO), maxWidth, measure);
  layout.text = { x: width / 2, y: layout.bar.y + layout.bar.h / 2, fontPx: fitted.fontPx, maxWidth, value: fitted.value };
  return layout;
}
