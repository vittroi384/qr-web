import QRCode from "qrcode";
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
 * Draw a QR code (plus optional centre logo) onto `canvas` at `style.size` pixels. Used by the
 * live preview, the print sheet and batch export so every output looks the same.
 * Throws when the content does not fit (qrcode's "too big" error).
 */
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

export async function drawQrToCanvas(canvas: HTMLCanvasElement, encoded: string, style: QrStyleOptions) {
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

export async function buildSvg(encoded: string, style: QrStyleOptions): Promise<string> {
  let svg = await QRCode.toString(encoded, {
    type: "svg",
    width: style.size,
    margin: style.margin,
    errorCorrectionLevel: style.errorCorrectionLevel,
    color: { dark: style.darkColor, light: style.lightColor },
  });
  if (style.logoDataUrl) {
    // qrcode's SVG uses a viewBox in module units; place the logo in those units.
    const vb = /viewBox="0 0 (\d+) \1"/.exec(svg);
    const units = vb ? Number(vb[1]) : 0;
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
