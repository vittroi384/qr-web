import type { FrameShape, QrStyleOptions } from "./types";

/**
 * Geometry of the decorative frame that wraps a saved QR image: a filled box in the frame colour
 * around the code (with the code's square cut out), extra filled parts (caption bars, pills,
 * ribbons, bubble tails, corner marks) and the caption itself. Pure arithmetic, shared by the
 * canvas renderer, the SVG builder and the size caption so all three agree to the pixel.
 * Everything is relative to the QR bitmap's own size.
 */

/** Longest label the UI accepts (code points). */
export const FRAME_TEXT_MAX = 40;
/** Caption bar height and nominal font size as shares of the QR size (bar shapes). */
const BAR_RATIO = 0.18;
const FONT_RATIO = 0.55;
/** Captions set outside the box in the frame colour: gap and font as shares of the QR size. */
const OUTSIDE_GAP_RATIO = 0.05;
const OUTSIDE_FONT_RATIO = 0.11;
const OUTSIDE_LINE_RATIO = 1.3;
/** "card": solid band across the top of the box, as a share of the QR size. */
const BAND_RATIO = 0.12;
/** Speech-bubble tail, as shares of the QR size. */
const TAIL_W_RATIO = 0.14;
const TAIL_H_RATIO = 0.08;
/** Underline and brackets: stroke thickness, bracket arm length and distance from the code, as shares of the QR size. */
const STROKE_RATIO = 0.06;
const BRACKET_ARM_RATIO = 0.14;
const STROKE_GAP_RATIO = 0.05;
/** Corner marks: thickness, arm length and distance from the code, as shares of the QR size. */
const CORNER_THICK_RATIO = 0.06;
const CORNER_ARM_RATIO = 0.24;
const CORNER_GAP_RATIO = 0.04;
/** Floating label: gap between the box and the pill, as a share of the QR size. */
const PILL_GAP_RATIO = 0.06;
/** Ribbon: how far the bar sticks out on each side and the depth of its notched ends. */
const RIBBON_WING_RATIO = 0.1;
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

export type FrameRect = { x: number; y: number; w: number; h: number; radius: number };
/** A filled part in the frame colour besides the main box. */
export type FramePart = ({ kind: "rect" } & FrameRect) | { kind: "polygon"; points: [number, number][] };

export type FrameLayout = {
  width: number;
  height: number;
  /** Where the QR bitmap goes. */
  qr: { x: number; y: number; size: number };
  /** Filled rounded box in the frame colour with the code's square cut out. Null for frames made of parts only. */
  box: FrameRect | null;
  /** Further filled parts (caption bar outside the box, bubble tail, corner marks …), drawn after the box. */
  parts: FramePart[];
  /** Coloured strip holding the caption, null when the caption is not on a strip. */
  bar: { x: number; y: number; w: number; h: number } | null;
  /** Caption centre, fitted font size, colour ("" = frame colour) and the (possibly shortened) text. */
  text: { x: number; y: number; fontPx: number; maxWidth: number; value: string; color: string } | null;
  /** True when the canvas must be painted with the code's light colour first (parts of it stay open). */
  fillBackground: boolean;
  /** Corner radius of the main box; 0 without one. */
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

/** Caption colour for `layout`: white on a strip, the frame colour when set in the open. */
export function frameTextColor(layout: FrameLayout, style: Pick<QrStyleOptions, "frameColor" | "darkColor">): string {
  return layout.text?.color || resolveFrameColor(style);
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

type Ctx = { qr: number; label: string; measure: TextMeasure };

/** Caption centred in a strip: white text at 55 % of the bar height, at most as wide as the code. */
function stripText(c: Ctx, strip: { x: number; y: number; w: number; h: number }, barH: number): FrameLayout["text"] {
  const fitted = fitLabel(c.label, Math.round(barH * FONT_RATIO), c.qr, c.measure);
  return { x: strip.x + strip.w / 2, y: strip.y + strip.h / 2, fontPx: fitted.fontPx, maxWidth: c.qr, value: fitted.value, color: FRAME_TEXT_COLOR };
}

/** Caption set below `bottom` in the open, in the frame colour. Returns the text and the extra height it needs. */
function openText(c: Ctx, cx: number, bottom: number): { text: FrameLayout["text"]; extra: number } {
  const gap = Math.round(c.qr * OUTSIDE_GAP_RATIO);
  const fitted = fitLabel(c.label, Math.round(c.qr * OUTSIDE_FONT_RATIO), c.qr, c.measure);
  const line = Math.round(fitted.fontPx * OUTSIDE_LINE_RATIO);
  return { text: { x: cx, y: bottom + gap + line / 2, fontPx: fitted.fontPx, maxWidth: c.qr, value: fitted.value, color: "" }, extra: gap + line };
}

/**
 * Box with a caption strip inside it, below or above the code ("label", "top", "bubble"/"bubbleTop"
 * with a tail, "rounded" with a thicker border and bigger radius, "ribbon" with a bar sticking out).
 */
function boxWithStrip(c: Ctx, o: { border: number; radius: number; top?: boolean; tail?: "bottom" | "top"; ribbon?: boolean; band?: boolean }): FrameLayout {
  const border = Math.round(c.qr * o.border);
  const radius = Math.round(border * o.radius);
  const barH = c.label ? Math.round(c.qr * BAR_RATIO) : 0;
  const wing = o.ribbon && c.label ? Math.round(c.qr * RIBBON_WING_RATIO) : 0;
  // "card": a solid band above the code (the box simply grows; the band is box colour already).
  const bandH = o.band ? Math.round(c.qr * BAND_RATIO) : 0;
  const boxW = c.qr + border * 2;
  const boxH = boxW + barH + bandH;
  const tailH = o.tail ? Math.round(c.qr * TAIL_H_RATIO) : 0;
  // A tail on top pushes the box down by its height.
  const boxY = o.tail === "top" ? tailH : 0;
  const box: FrameRect = { x: wing, y: boxY, w: boxW, h: boxH, radius };
  const layout: FrameLayout = {
    width: boxW + wing * 2,
    height: boxH + tailH,
    qr: { x: wing + border, y: boxY + bandH + (o.top ? border + barH : border), size: c.qr },
    box,
    parts: [],
    bar: null,
    text: null,
    fillBackground: wing > 0,
    radius,
    border,
  };
  if (o.tail) {
    const tailW = Math.round(c.qr * TAIL_W_RATIO);
    const cx = layout.width / 2;
    layout.parts.push(
      o.tail === "top"
        ? { kind: "polygon", points: [[cx - tailW / 2, tailH], [cx + tailW / 2, tailH], [cx, 0]] }
        : { kind: "polygon", points: [[cx - tailW / 2, boxH], [cx + tailW / 2, boxH], [cx, boxH + tailH]] },
    );
  }
  if (!c.label) return layout;
  // The strip is the bar plus the adjacent border; the label sits in its middle.
  const strip = o.top ? { x: wing, y: boxY, w: boxW, h: border + barH } : { x: wing, y: boxY + bandH + border + c.qr, w: boxW, h: border + barH };
  if (wing > 0) {
    // Ribbon: the strip runs the full width, with a notch cut into each end.
    const { y, h } = strip;
    const notch = Math.round(h * 0.45);
    const w = layout.width;
    layout.parts.push({ kind: "polygon", points: [[0, y], [w, y], [w - notch, y + h / 2], [w, y + h], [0, y + h], [notch, y + h / 2]] });
    strip.x = 0;
    strip.w = w;
  }
  layout.bar = strip;
  layout.text = stripText(c, strip, barH);
  return layout;
}

/** Thin border, caption below in the open. */
function thinLine(c: Ctx): FrameLayout {
  const border = Math.max(2, Math.round(c.qr * 0.025));
  const w = c.qr + border * 2;
  const layout: FrameLayout = {
    width: w,
    height: w,
    qr: { x: border, y: border, size: c.qr },
    box: { x: 0, y: 0, w, h: w, radius: border * 2 },
    parts: [],
    bar: null,
    text: null,
    fillBackground: true,
    radius: border * 2,
    border,
  };
  if (!c.label) return layout;
  const open = openText(c, w / 2, w);
  layout.height += open.extra;
  layout.text = open.text;
  return layout;
}

/** Four L-shaped corner marks around the code (viewfinder look), caption below in the open. */
function cornerMarks(c: Ctx): FrameLayout {
  const thick = Math.max(2, Math.round(c.qr * CORNER_THICK_RATIO));
  const arm = Math.round(c.qr * CORNER_ARM_RATIO);
  const gap = Math.round(c.qr * CORNER_GAP_RATIO);
  const inset = thick + gap;
  const w = c.qr + inset * 2;
  const parts: FramePart[] = [];
  for (const [left, top] of [
    [true, true],
    [false, true],
    [true, false],
    [false, false],
  ]) {
    const x = left ? 0 : w - thick;
    const y = top ? 0 : w - thick;
    // Horizontal arm then vertical arm, both starting at the corner.
    parts.push({ kind: "rect", x: left ? 0 : w - arm, y, w: arm, h: thick, radius: 0 });
    parts.push({ kind: "rect", x, y: top ? 0 : w - arm, w: thick, h: arm, radius: 0 });
  }
  const layout: FrameLayout = {
    width: w,
    height: w,
    qr: { x: inset, y: inset, size: c.qr },
    box: null,
    parts,
    bar: null,
    text: null,
    fillBackground: true,
    radius: 0,
    border: thick,
  };
  if (!c.label) return layout;
  const open = openText(c, w / 2, w);
  layout.height += open.extra;
  layout.text = open.text;
  return layout;
}

/** Border box with the caption on a separate pill floating under it. */
function floatingLabel(c: Ctx): FrameLayout {
  const border = Math.round(c.qr * 0.06);
  const w = c.qr + border * 2;
  const layout: FrameLayout = {
    width: w,
    height: w,
    qr: { x: border, y: border, size: c.qr },
    box: { x: 0, y: 0, w, h: w, radius: border * 2 },
    parts: [],
    bar: null,
    text: null,
    fillBackground: true,
    radius: border * 2,
    border,
  };
  if (!c.label) return layout;
  const gap = Math.round(c.qr * PILL_GAP_RATIO);
  const pillH = Math.round(c.qr * BAR_RATIO);
  const pill = { x: 0, y: w + gap, w, h: pillH };
  layout.parts.push({ kind: "rect", ...pill, radius: pillH / 2 });
  layout.height = pill.y + pill.h;
  layout.bar = pill;
  layout.text = stripText(c, pill, pillH);
  return layout;
}

/** A circle around the code (the square's diagonal plus a border), caption below in the open. */
function circleFrame(c: Ctx): FrameLayout {
  const border = Math.round(c.qr * 0.06);
  const d = Math.ceil(c.qr * Math.SQRT2) + border * 2;
  const inset = Math.round((d - c.qr) / 2);
  const layout: FrameLayout = {
    width: d,
    height: d,
    qr: { x: inset, y: inset, size: c.qr },
    box: { x: 0, y: 0, w: d, h: d, radius: d / 2 },
    parts: [],
    bar: null,
    text: null,
    fillBackground: true,
    radius: d / 2,
    border,
  };
  if (!c.label) return layout;
  const open = openText(c, d / 2, d);
  layout.height += open.extra;
  layout.text = open.text;
  return layout;
}

/** No box: a thick line under the code, caption below it in the open. */
function underline(c: Ctx): FrameLayout {
  const thick = Math.max(2, Math.round(c.qr * STROKE_RATIO));
  const gap = Math.round(c.qr * STROKE_GAP_RATIO);
  const line = { x: 0, y: c.qr + gap, w: c.qr, h: thick };
  const layout: FrameLayout = {
    width: c.qr,
    height: line.y + line.h,
    qr: { x: 0, y: 0, size: c.qr },
    box: null,
    parts: [{ kind: "rect", ...line, radius: thick / 2 }],
    bar: null,
    text: null,
    fillBackground: true,
    radius: 0,
    border: thick,
  };
  if (!c.label) return layout;
  const open = openText(c, c.qr / 2, layout.height);
  layout.height += open.extra;
  layout.text = open.text;
  return layout;
}

/** Square brackets left and right of the code, caption below in the open. */
function brackets(c: Ctx): FrameLayout {
  const thick = Math.max(2, Math.round(c.qr * STROKE_RATIO));
  const arm = Math.round(c.qr * BRACKET_ARM_RATIO);
  const gap = Math.round(c.qr * STROKE_GAP_RATIO);
  const inset = thick + gap;
  const w = c.qr + inset * 2;
  const h = c.qr + gap * 2;
  const parts: FramePart[] = [];
  for (const left of [true, false]) {
    const x = left ? 0 : w - thick;
    parts.push({ kind: "rect", x, y: 0, w: thick, h, radius: 0 });
    parts.push({ kind: "rect", x: left ? 0 : w - arm, y: 0, w: arm, h: thick, radius: 0 });
    parts.push({ kind: "rect", x: left ? 0 : w - arm, y: h - thick, w: arm, h: thick, radius: 0 });
  }
  const layout: FrameLayout = {
    width: w,
    height: h,
    qr: { x: inset, y: gap, size: c.qr },
    box: null,
    parts,
    bar: null,
    text: null,
    fillBackground: true,
    radius: 0,
    border: thick,
  };
  if (!c.label) return layout;
  const open = openText(c, w / 2, h);
  layout.height += open.extra;
  layout.text = open.text;
  return layout;
}

const BUILDERS: Record<FrameShape, (c: Ctx) => FrameLayout> = {
  label: (c) => boxWithStrip(c, { border: 0.06, radius: 2 }),
  top: (c) => boxWithStrip(c, { border: 0.06, radius: 2, top: true }),
  bubble: (c) => boxWithStrip(c, { border: 0.06, radius: 2, tail: "bottom" }),
  bubbleTop: (c) => boxWithStrip(c, { border: 0.06, radius: 2, top: true, tail: "top" }),
  rounded: (c) => boxWithStrip(c, { border: 0.08, radius: 3.5 }),
  ribbon: (c) => boxWithStrip(c, { border: 0.06, radius: 2, ribbon: true }),
  card: (c) => boxWithStrip(c, { border: 0.06, radius: 2, band: true }),
  floating: floatingLabel,
  circle: circleFrame,
  thin: thinLine,
  underline,
  corners: cornerMarks,
  brackets,
};

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
    return { width: qrSize, height: qrSize, qr: { x: 0, y: 0, size: qrSize }, box: null, parts: [], bar: null, text: null, fillBackground: false, radius: 0, border: 0 };
  }
  const build = BUILDERS[style.frameShape] ?? BUILDERS.label;
  return build({ qr: qrSize, label: normalizeFrameText(style.frameText), measure });
}
