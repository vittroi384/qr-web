"use client";

import QRCode from "qrcode";
import { useEffect, useRef, useState } from "react";
import type { QrStyleOptions } from "@/lib/qr/types";

type Props = {
  encoded: string;
  style: QrStyleOptions;
  fileBase: string;
  onAction: (event: "download_png" | "download_svg" | "copy") => void;
};

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

async function drawToCanvas(canvas: HTMLCanvasElement, encoded: string, style: QrStyleOptions) {
  await QRCode.toCanvas(canvas, encoded, {
    width: style.size,
    margin: style.margin,
    errorCorrectionLevel: style.errorCorrectionLevel,
    color: { dark: style.darkColor, light: style.lightColor },
  });
  if (style.logoDataUrl) {
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const img = await loadImage(style.logoDataUrl);
    const logoSize = Math.round(style.size * 0.22);
    const pad = Math.round(logoSize * 0.12);
    const x = (style.size - logoSize) / 2;
    const y = x;
    ctx.fillStyle = style.lightColor;
    ctx.beginPath();
    ctx.roundRect(x - pad, y - pad, logoSize + pad * 2, logoSize + pad * 2, pad);
    ctx.fill();
    ctx.drawImage(img, x, y, logoSize, logoSize);
  }
}

async function buildSvg(encoded: string, style: QrStyleOptions): Promise<string> {
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
      const logo = units * 0.22;
      const pad = logo * 0.12;
      const pos = (units - logo) / 2;
      const overlay =
        `<rect x="${pos - pad}" y="${pos - pad}" width="${logo + pad * 2}" height="${logo + pad * 2}" rx="${pad}" fill="${style.lightColor}"/>` +
        `<image href="${style.logoDataUrl}" x="${pos}" y="${pos}" width="${logo}" height="${logo}" preserveAspectRatio="xMidYMid meet"/>`;
      svg = svg.replace("</svg>", `${overlay}</svg>`);
    }
  }
  return svg;
}

function triggerDownload(href: string, filename: string) {
  const a = document.createElement("a");
  a.href = href;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
}

export function QrPreview({ encoded, style, fileBase, onAction }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (!encoded) {
      const ctx = canvas.getContext("2d");
      canvas.width = style.size;
      canvas.height = style.size;
      ctx?.clearRect(0, 0, canvas.width, canvas.height);
      return;
    }
    let cancelled = false;
    drawToCanvas(canvas, encoded, style)
      .then(() => !cancelled && setError(null))
      .catch((e: unknown) => {
        if (cancelled) return;
        const msg = e instanceof Error ? e.message : String(e);
        setError(/too big|capacity/i.test(msg) ? "내용이 너무 길어 QR에 담을 수 없습니다. 내용을 줄이거나 오류 정정 레벨을 낮춰 보세요." : msg);
      });
    return () => {
      cancelled = true;
    };
  }, [encoded, style]);

  const downloadPng = () => {
    const canvas = canvasRef.current;
    if (!canvas || !encoded) return;
    triggerDownload(canvas.toDataURL("image/png"), `${fileBase}.png`);
    onAction("download_png");
  };

  const downloadSvg = async () => {
    if (!encoded) return;
    const svg = await buildSvg(encoded, style);
    const url = URL.createObjectURL(new Blob([svg], { type: "image/svg+xml" }));
    triggerDownload(url, `${fileBase}.svg`);
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    onAction("download_svg");
  };

  const copyPng = async () => {
    const canvas = canvasRef.current;
    if (!canvas || !encoded) return;
    try {
      const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/png"));
      if (!blob) throw new Error("blob");
      await navigator.clipboard.write([new ClipboardItem({ "image/png": blob })]);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
      onAction("copy");
    } catch {
      setError("이 브라우저에서는 이미지 복사를 지원하지 않습니다. PNG 다운로드를 이용해 주세요.");
    }
  };

  // Stale errors are irrelevant once the input is cleared.
  const shownError = encoded ? error : null;
  const disabled = !encoded || Boolean(shownError);

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative grid aspect-square w-full max-w-[320px] place-items-center overflow-hidden rounded-xl border border-border bg-white">
        <canvas ref={canvasRef} className={`h-full w-full ${encoded && !shownError ? "" : "opacity-0"}`} style={{ imageRendering: "pixelated" }} />
        {!encoded ? (
          <p className="absolute inset-0 grid place-items-center px-6 text-center text-sm text-gray-500">
            왼쪽에 내용을 입력하면
            <br />
            QR 코드가 여기에 나타납니다
          </p>
        ) : null}
        {shownError ? <p className="absolute inset-0 grid place-items-center px-6 text-center text-sm text-red-500">{shownError}</p> : null}
      </div>
      <div className="flex flex-wrap justify-center gap-2">
        <button type="button" className="btn btn-primary" onClick={downloadPng} disabled={disabled}>
          PNG 다운로드
        </button>
        <button type="button" className="btn" onClick={downloadSvg} disabled={disabled}>
          SVG 다운로드
        </button>
        <button type="button" className="btn" onClick={copyPng} disabled={disabled}>
          {copied ? "복사됨 ✓" : "이미지 복사"}
        </button>
      </div>
      {encoded ? (
        <details className="w-full text-xs text-muted">
          <summary className="cursor-pointer">QR에 담긴 실제 데이터 보기</summary>
          <pre className="mt-2 max-h-40 overflow-auto whitespace-pre-wrap break-all rounded-lg border border-border bg-background p-2">{encoded}</pre>
        </details>
      ) : null}
    </div>
  );
}
