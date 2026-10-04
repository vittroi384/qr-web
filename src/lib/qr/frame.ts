import type { FrameShape, QrStyleOptions } from "./types";

/**
 * Geometry of the decorative frame that wraps a saved QR image: a filled box in the frame colour
 * (border plus, for most shapes, a caption bar), an optional speech-bubble tail and the caption.
 * Pure arithmetic, shared by the canvas renderer, the SVG builder and the size caption so all
 * three agree to the pixel. Everything is relative to the QR bitmap's own size.
 */

/** Longest label the UI accepts (code points). */
export const FRAME_TEXT_MAX = 40;
/** Caption bar height and nominal font size as shares of the QR size (bar shapes). */
const BAR_RATIO = 0.18;
const FONT_RATIO = 0.55;
/** "thin": caption set under the box in the frame colour — gap and font as shares of the QR size. */
const OUTSIDE_GAP_RATIO = 0.05;
const OUTSIDE_FONT_RATIO = 0.11;
const OUTSIDE_LINE_RATIO = 1.3;
/** Speech-bubble tail, as shares of the QR size. */
const TAIL_W_RATIO = 0.14;
const TAIL_H_RATIO = 0.08;
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

type ShapeSpec = {
  /** Border thickness as a share of the QR size. */
  border: number;
  /** Corner radius as a multiple of the border. */
  radius: number;
  /** Where the caption bar goes; "none" sets the caption outside the box in the frame colour. */
  bar: "bottom" | "top" | "none";
  tail: boolean;
};

const SHAPES: Record<FrameShape, ShapeSpec> = {
  label: { border: 0.06, radius: 2, bar: "bottom", tail: false },
  top: { border: 0.06, radius: 2, bar: "top", tail: false },
  bubble: { border: 0.06, radius: 2, bar: "bottom", tail: true },
  rounded: { border: 0.08, radius: 3.5, bar: "bottom", tail: false },
  thin: { border: 0.025, radius: 2, bar: "none", tail: false },
};

export type FrameLayout = {
  width: number;
  height: number;
  /** Where the QR bitmap goes. */
  qr: { x: number; y: number; size: number };
  /** Filled rounded box in the frame colour (border, and the caption bar when it is inside). Null without a frame. */
  box: { x: number; y: number; w: number; h: number; radius: number } | null;
  /** Speech-bubble tail: a triangle in the frame colour whose base sits on the box's bottom edge. */
  tail: { points: [number, number][] } | null;
  /** Coloured strip holding the caption (border + bar), null when there is no bar. */
  bar: { x: number; y: number; w: number; h: number } | null;
  /** Caption centre, fitted font size, colour and the (possibly shortened) text. Null without a caption. */
  text: { x: number; y: number; fontPx: number; maxWidth: number; value: string; color: string } | null;
  /** True when the canvas must be painted with the code's light colour first (caption outside the box). */
  fillBackground: boolean;
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

const WIDE = /[ᄀ-ᇿ⺀-〿぀-ヿ㄰-㆏㐀-䶿一-鿿가-힯豈-﫿＀-｠￠-￦]/u;
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
export function frameLayout(
  qrSize: number,
  style: Pick<QrStyleOptions, "frame" | "frameShape" | "frameText">,
  measure: TextMeasure = estimateTextWidth,
): FrameLayout {
  if (!hasFrame(style)) {
    return { width: qrSize, height: qrSize, qr: { x: 0, y: 0, size: qrSize }, box: null, tail: null, bar: null, text: null, fillBackground: false, radius: 0, border: 0 };
  }
  const spec = SHAPES[style.frameShape] ?? SHAPES.label;
  const border = Math.max(2, Math.round(qrSize * spec.border));
  const radius = Math.round(border * spec.radius);
  const label = normalizeFrameText(style.frameText);
  const width = qrSize + border * 2;

  if (spec.bar === "none") {
    // Thin line: the box is just the border; the caption sits below it in the frame colour.
    const box = { x: 0, y: 0, w: width, h: width, radius };
    const layout: FrameLayout = { width, height: width, qr: { x: border, y: border, size: qrSize }, box, tail: null, bar: null, text: null, fillBackground: true, radius, border };
    if (!label) return layout;
    const gap = Math.round(qrSize * OUTSIDE_GAP_RATIO);
    const fitted = fitLabel(label, Math.round(qrSize * OUTSIDE_FONT_RATIO), qrSize, measure);
    const line = Math.round(fitted.fontPx * OUTSIDE_LINE_RATIO);
    layout.height = width + gap + line;
    layout.text = { x: width / 2, y: width + gap + line / 2, fontPx: fitted.fontPx, maxWidth: qrSize, value: fitted.value, color: "" };
    return layout;
  }

  const barH = label ? Math.round(qrSize * BAR_RATIO) : 0;
  const boxH = width + barH;
  const tailH = spec.tail ? Math.round(qrSize * TAIL_H_RATIO) : 0;
  const qrY = spec.bar === "top" ? border + barH : border;
  const layout: FrameLayout = {
    width,
    height: boxH + tailH,
    qr: { x: border, y: qrY, size: qrSize },
    box: { x: 0, y: 0, w: width, h: boxH, radius },
    tail: null,
    bar: null,
    text: null,
    fillBackground: false,
    radius,
    border,
  };
  if (spec.tail) {
    const tailW = Math.round(qrSize * TAIL_W_RATIO);
    const cx = width / 2;
    layout.tail = { points: [[cx - tailW / 2, boxH], [cx + tailW / 2, boxH], [cx, boxH + tailH]] };
  }
  if (!label) return layout;
  // The strip holding the caption is the bar plus the adjacent border; the label sits in its middle.
  layout.bar = spec.bar === "top" ? { x: 0, y: 0, w: width, h: border + barH } : { x: 0, y: border + qrSize, w: width, h: border + barH };
  // The label may run as wide as the code itself: one border width of padding on each side.
  const maxWidth = qrSize;
  const fitted = fitLabel(label, Math.round(barH * FONT_RATIO), maxWidth, measure);
  layout.text = { x: width / 2, y: layout.bar.y + layout.bar.h / 2, fontPx: fitted.fontPx, maxWidth, value: fitted.value, color: FRAME_TEXT_COLOR };
  return layout;
}

/** Caption colour for `layout`: white on a bar, the frame colour when set outside the box. */
export function frameTextColor(layout: FrameLayout, style: Pick<QrStyleOptions, "frameColor" | "darkColor">): string {
  return layout.text?.color || resolveFrameColor(style);
}
