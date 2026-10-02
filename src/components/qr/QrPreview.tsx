"use client";

import QRCode from "qrcode";
import { useEffect, useRef, useState } from "react";
import type { QrStyleOptions } from "@/lib/qr/types";
import { CheckIcon, CodeIcon, CopyIcon, DownloadIcon, QrMarkIcon } from "../icons";
import { Segmented } from "./Segmented";

/** Output resolution of the saved PNG. The on-screen preview always scales to fit its frame. */
const SIZES = [
  { name: "작게", value: 256 },
  { name: "보통", value: 512 },
  { name: "크게", value: 1024 },
] as const;

/** Quiet zone in modules — the QR spec requires at least 4. */
const MARGINS = [
  { name: "표준", value: 4 },
  { name: "넓게", value: 6 },
] as const;

type Props = {
  encoded: string;
  style: QrStyleOptions;
  onStyleChange: (next: QrStyleOptions) => void;
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

export function QrPreview({ encoded, style, onStyleChange, fileBase, onAction }: Props) {
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
        setError(/too big|capacity/i.test(msg) ? "내용이 너무 길어 QR에 담을 수 없습니다. 내용을 줄이거나 꾸미기의 복원력을 “기본”으로 바꿔 보세요." : msg);
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

  const badge = shownError
    ? { text: "오류", cls: "bg-danger-soft text-danger" }
    : encoded
      ? { text: "실시간 반영", cls: "bg-success-soft text-success" }
      : { text: "입력 대기", cls: "bg-surface text-muted" };

  return (
    <div className="flex flex-col">
      <div className="mb-3 flex items-center justify-between gap-3">
        <h2 className="text-[15px] font-semibold text-foreground">미리보기</h2>
        <span className={`inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-xs font-medium ${badge.cls}`}>
          <span className="size-1.5 rounded-full bg-current" aria-hidden="true" />
          {badge.text}
        </span>
      </div>

      {/* The canvas keeps its full output resolution; CSS scales it to the frame. */}
      <div className="relative mx-auto aspect-square w-full max-w-[280px] overflow-hidden rounded-lg border border-border bg-white">
        <canvas
          ref={canvasRef}
          role="img"
          aria-label="생성된 QR 코드 미리보기"
          className={`block h-full w-full max-w-full ${encoded && !shownError ? "" : "opacity-0"}`}
          style={{ imageRendering: "pixelated" }}
        />
        {!encoded ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-8 text-center">
            <span className="grid size-11 place-items-center rounded-lg border border-dashed border-border-strong text-zinc-400">
              <QrMarkIcon className="size-5" />
            </span>
            <p className="text-[13px] leading-relaxed text-muted">
              내용을 입력하면
              <br />
              QR 코드가 바로 나타납니다.
            </p>
          </div>
        ) : null}
        {shownError ? (
          <p role="alert" className="absolute inset-0 grid place-items-center px-8 text-center text-[13px] leading-relaxed font-medium text-danger">
            {shownError}
          </p>
        ) : null}
      </div>

      <div className="mt-4 grid grid-cols-[auto_minmax(0,1fr)] items-center gap-x-3 gap-y-2">
        <span className="text-[13px] font-medium text-foreground">크기</span>
        <Segmented label="저장 크기" options={SIZES} selected={style.size} onSelect={(size) => onStyleChange({ ...style, size })} />
        <span className="text-[13px] font-medium text-foreground">여백</span>
        <Segmented
          label="여백"
          options={MARGINS}
          selected={style.margin >= 6 ? 6 : 4}
          onSelect={(margin) => onStyleChange({ ...style, margin })}
        />
      </div>
      <p className="mt-2 text-xs text-muted">
        저장 크기 <span className="font-mono text-foreground tabular-nums">{style.size} × {style.size}px</span> · 여백 {style.margin}칸
      </p>

      <div className="mt-4 grid grid-cols-2 gap-2">
        <button type="button" className="btn btn-primary col-span-2" onClick={downloadPng} disabled={disabled}>
          <DownloadIcon />
          PNG 다운로드
        </button>
        <button type="button" className="btn" onClick={downloadSvg} disabled={disabled}>
          <DownloadIcon />
          SVG
        </button>
        <button type="button" className="btn" onClick={copyPng} disabled={disabled}>
          {copied ? <CheckIcon className="text-success" /> : <CopyIcon />}
          {copied ? "복사됨" : "이미지 복사"}
        </button>
      </div>

      <p className="mt-3 text-xs leading-relaxed text-muted">인쇄물에는 확대해도 선명한 SVG를 권장합니다. 사용 전에 휴대폰 카메라로 스캔해 확인하세요.</p>

      {encoded ? (
        <details className="mt-3 border-t border-border pt-2 text-xs text-muted">
          <summary className="flex cursor-pointer items-center gap-1.5 rounded py-1 font-medium transition-colors hover:text-foreground">
            <CodeIcon className="size-3.5" />
            QR에 담긴 실제 데이터 보기
          </summary>
          <pre className="mt-2 max-h-40 overflow-auto rounded-md border border-border bg-card p-3 font-mono text-[11px] leading-relaxed break-all whitespace-pre-wrap text-foreground">
            {encoded}
          </pre>
        </details>
      ) : null}
    </div>
  );
}
