import QRCode from "qrcode";
import { FRAME_FONT_FAMILY, FRAME_FONT_WEIGHT, FRAME_TEXT_COLOR, frameFont, frameLayout, hasFrame, resolveFrameColor, type FrameLayout } from "@/lib/qr/frame";
import type { QrStyleOptions } from "@/lib/qr/types";

/** Share of the code's width taken by a centre logo, and the padding plate around it. */
const LOGO_RATIO = 0.22;
const LOGO_PAD_RATIO = 0.12;

export function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

/**
 * qrcode maps modules to pixels with a fractional scale when `width` is not a multiple of the
 * module count, so some modules end up 1px wider than others. Snapping the width to a whole
 * number of pixels per module keeps every module identical and edges razor-sharp.
 */
export function exactWidth(encoded: string, style: QrStyleOptions): number {
  const modules = QRCode.create(encoded, { errorCorrectionLevel: style.errorCorrectionLevel }).modules.size;
  const total = modules + style.margin * 2;
  const scale = Math.max(1, Math.round(style.size / total));
  return scale * total;
}

/** The bare code (plus optional centre logo) — exactly what every output looked like before frames. */
async function drawPlainQr(canvas: HTMLCanvasElement, encoded: string, style: QrStyleOptions) {
  await QRCode.toCanvas(canvas, encoded, {
    width: exactWidth(encoded, style),
    margin: style.margin,
    errorCorrectionLevel: style.errorCorrectionLevel,
    color: { dark: style.darkColor, light: style.lightColor },
  });
  // qrcode pins inline width/height in px (e.g. 512px), which distorts the code inside a
  // smaller frame. Drop them so the canvas is sized by its CSS classes; the bitmap keeps its
  // full resolution.
  canvas.style.removeProperty("width");
  canvas.style.removeProperty("height");
  if (!style.logoDataUrl) return;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  const img = await loadImage(style.logoDataUrl);
  // Use the real bitmap size: qrcode may exceed `width` when the module count demands it.
  const size = canvas.width;
  const logoSize = Math.round(size * LOGO_RATIO);
  const pad = Math.round(logoSize * LOGO_PAD_RATIO);
  const x = (size - logoSize) / 2;
  const y = x;
  ctx.fillStyle = style.lightColor;
  ctx.beginPath();
  ctx.roundRect(x - pad, y - pad, logoSize + pad * 2, logoSize + pad * 2, pad);
  ctx.fill();
  ctx.drawImage(img, x, y, logoSize, logoSize);
}

/**
 * Draw a QR code (plus optional centre logo and frame) onto `canvas`. The code itself is
 * `style.size` pixels (snapped, see `exactWidth`); a frame grows the canvas around it. Used by the
 * live preview, the print sheet and batch export so every output looks the same.
 * Throws when the content does not fit (qrcode's "too big" error).
 */
export async function drawQrToCanvas(canvas: HTMLCanvasElement, encoded: string, style: QrStyleOptions) {
  if (!hasFrame(style)) {
    await drawPlainQr(canvas, encoded, style);
    return;
  }
  // Render the code on its own canvas, then compose it with the frame on the target.
  const code = document.createElement("canvas");
  await drawPlainQr(code, encoded, style);
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  const layout = frameLayout(code.width, style, (text, fontPx) => {
    ctx.font = frameFont(fontPx);
    return ctx.measureText(text).width;
  });
  // Resizing also resets the context state (font, fill, …), so set those afterwards.
  canvas.width = layout.width;
  canvas.height = layout.height;
  ctx.clearRect(0, 0, layout.width, layout.height);
  ctx.fillStyle = resolveFrameColor(style);
  ctx.beginPath();
  ctx.roundRect(0, 0, layout.width, layout.height, layout.radius);
  ctx.fill();
  // Punch the code's square out of the frame so a transparent background stays transparent.
  ctx.clearRect(layout.qr.x, layout.qr.y, layout.qr.size, layout.qr.size);
  ctx.drawImage(code, layout.qr.x, layout.qr.y);
  if (!layout.text) return;
  ctx.fillStyle = FRAME_TEXT_COLOR;
  ctx.font = frameFont(layout.text.fontPx);
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(layout.text.value, layout.text.x, layout.text.y, layout.text.maxWidth);
}

async function buildPlainSvg(encoded: string, style: QrStyleOptions): Promise<string> {
  let svg = await QRCode.toString(encoded, {
    type: "svg",
    width: style.size,
    margin: style.margin,
    errorCorrectionLevel: style.errorCorrectionLevel,
    color: { dark: style.darkColor, light: style.lightColor },
  });
  if (style.logoDataUrl) {
    // qrcode's SVG uses a viewBox in module units; place the logo in those units.
    const units = svgUnits(svg);
    if (units > 0) {
      const logo = units * LOGO_RATIO;
      const pad = logo * LOGO_PAD_RATIO;
      const pos = (units - logo) / 2;
      const overlay =
        `<rect x="${pos - pad}" y="${pos - pad}" width="${logo + pad * 2}" height="${logo + pad * 2}" rx="${pad}" fill="${style.lightColor}"/>` +
        `<image href="${style.logoDataUrl}" x="${pos}" y="${pos}" width="${logo}" height="${logo}" preserveAspectRatio="xMidYMid meet"/>`;
      svg = svg.replace("</svg>", `${overlay}</svg>`);
    }
  }
  return svg;
}

/** Side of qrcode's square viewBox (modules + quiet zone), 0 when it cannot be read. */
function svgUnits(svg: string): number {
  const vb = /viewBox="0 0 (\d+) \1"/.exec(svg);
  return vb ? Number(vb[1]) : 0;
}

function escapeXml(text: string): string {
  return text.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&apos;" })[c] as string);
}

/** Up to four decimals, no trailing zeros — keeps the SVG small and stable. */
const num = (n: number) => String(Math.round(n * 10_000) / 10_000);

/** Rounded outer rectangle with the code's square cut out (evenodd), so a transparent code stays transparent. */
function framePath(layout: FrameLayout): string {
  const { width: w, height: h, radius: r, qr } = layout;
  const outer =
    `M${num(r)} 0H${num(w - r)}A${num(r)} ${num(r)} 0 0 1 ${num(w)} ${num(r)}V${num(h - r)}A${num(r)} ${num(r)} 0 0 1 ${num(w - r)} ${num(h)}` +
    `H${num(r)}A${num(r)} ${num(r)} 0 0 1 0 ${num(h - r)}V${num(r)}A${num(r)} ${num(r)} 0 0 1 ${num(r)} 0Z`;
  const hole = `M${num(qr.x)} ${num(qr.y)}h${num(qr.size)}v${num(qr.size)}h${num(-qr.size)}Z`;
  return outer + hole;
}

/**
 * Standalone SVG of the code, with the same frame as the canvas output. The frame is laid out in
 * pixels at `style.size`; the code's own SVG (module units, logo included) is scaled into place.
 */
export async function buildSvg(encoded: string, style: QrStyleOptions): Promise<string> {
  const plain = await buildPlainSvg(encoded, style);
  if (!hasFrame(style)) return plain;
  const units = svgUnits(plain);
  if (units <= 0) return plain;
  const layout = frameLayout(style.size, style);
  const body = plain.slice(plain.indexOf(">") + 1, plain.lastIndexOf("</svg>"));
  const label = layout.text
    ? `<text x="${num(layout.text.x)}" y="${num(layout.text.y)}" fill="${FRAME_TEXT_COLOR}" font-family='${FRAME_FONT_FAMILY}' font-size="${layout.text.fontPx}" font-weight="${FRAME_FONT_WEIGHT}" text-anchor="middle" dominant-baseline="central">${escapeXml(layout.text.value)}</text>`
    : "";
  return (
    `<svg xmlns="http://www.w3.org/2000/svg" width="${layout.width}" height="${layout.height}" viewBox="0 0 ${layout.width} ${layout.height}">` +
    `<path fill="${resolveFrameColor(style)}" fill-rule="evenodd" d="${framePath(layout)}"/>` +
    `<g transform="translate(${layout.qr.x} ${layout.qr.y}) scale(${num(layout.qr.size / units)})" shape-rendering="crispEdges">${body}</g>` +
    label +
    "</svg>\n"
  );
}

/** qrcode reports overflow as "The amount of data is too big to be stored in a QR Code". */
export function isCapacityError(e: unknown): boolean {
  const msg = e instanceof Error ? e.message : String(e);
  return /too big|capacity/i.test(msg);
}

export function triggerDownload(href: string, filename: string) {
  const a = document.createElement("a");
  a.href = href;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
}
