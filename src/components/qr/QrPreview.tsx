"use client";

import { useEffect, useRef, useState } from "react";
import type { QrStyleOptions } from "@/lib/qr/types";
import { CheckIcon, CodeIcon, CopyIcon, DownloadIcon, PrinterIcon, QrMarkIcon } from "../icons";
import { useI18n } from "../i18n/I18nProvider";
import { PrintSheetDialog, type SheetText } from "./PrintSheet";
import { buildSvg, drawQrToCanvas, isCapacityError, triggerDownload } from "./render";
import { Segmented } from "./Segmented";

type Props = {
  encoded: string;
  style: QrStyleOptions;
  onStyleChange: (next: QrStyleOptions) => void;
  fileBase: string;
  /** Starting text for the print sheet (depends on the QR type and its content). */
  sheetDefaults: SheetText;
  onAction: (event: "download_png" | "download_svg" | "copy" | "print") => void;
};

export function QrPreview({ encoded, style, onStyleChange, fileBase, sheetDefaults, onAction }: Props) {
  const { t } = useI18n();
  const p = t.preview;
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [error, setError] = useState<string | null>(null);
  // One confirmation line for every save action; replaces the tip for two seconds.
  const [feedback, setFeedback] = useState<"saved" | "copied" | null>(null);
  const feedbackTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);

  /** Output resolution of the saved PNG. The on-screen preview always scales to fit its frame. */
  const sizes = [
    { name: p.sizes.small, value: 256 },
    { name: p.sizes.medium, value: 512 },
    { name: p.sizes.large, value: 1024 },
  ];
  /** Quiet zone in modules — the QR spec requires at least 4. */
  const margins = [
    { name: p.margins.standard, value: 4 },
    { name: p.margins.wide, value: 6 },
  ];

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
    drawQrToCanvas(canvas, encoded, style)
      .then(() => !cancelled && setError(null))
      .catch((e: unknown) => {
        if (cancelled) return;
        setError(isCapacityError(e) ? p.tooLong : e instanceof Error ? e.message : String(e));
      });
    return () => {
      cancelled = true;
    };
  }, [encoded, style, p.tooLong]);

  useEffect(() => () => {
    if (feedbackTimer.current) clearTimeout(feedbackTimer.current);
  }, []);

  const confirm = (kind: "saved" | "copied") => {
    if (feedbackTimer.current) clearTimeout(feedbackTimer.current);
    setFeedback(kind);
    feedbackTimer.current = setTimeout(() => setFeedback(null), 2000);
  };

  const downloadPng = () => {
    const canvas = canvasRef.current;
    if (!canvas || !encoded) return;
    triggerDownload(canvas.toDataURL("image/png"), `${fileBase}.png`);
    confirm("saved");
    onAction("download_png");
  };

  const downloadSvg = async () => {
    if (!encoded) return;
    const svg = await buildSvg(encoded, style);
    const url = URL.createObjectURL(new Blob([svg], { type: "image/svg+xml" }));
    triggerDownload(url, `${fileBase}.svg`);
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    confirm("saved");
    onAction("download_svg");
  };

  const copyPng = async () => {
    const canvas = canvasRef.current;
    if (!canvas || !encoded) return;
    try {
      const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/png"));
      if (!blob) throw new Error("blob");
      await navigator.clipboard.write([new ClipboardItem({ "image/png": blob })]);
      confirm("copied");
      onAction("copy");
    } catch {
      setError(p.copyUnsupported);
    }
  };

  // Stale errors are irrelevant once the input is cleared.
  const shownError = encoded ? error : null;
  const disabled = !encoded || Boolean(shownError);

  const badge = shownError
    ? { text: p.badgeError, cls: "bg-danger-soft text-danger" }
    : encoded
      ? { text: p.badgeLive, cls: "bg-success-soft text-success" }
      : { text: p.badgeIdle, cls: "bg-surface text-muted" };

  return (
    <div className="flex flex-col">
      <div className="mb-3 flex items-center justify-between gap-3">
        <h2 className="text-[15px] font-semibold text-foreground">{p.title}</h2>
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
          aria-label={p.canvasLabel}
          className={`block h-full w-full ${encoded && !shownError ? "" : "opacity-0"}`}
          style={{ imageRendering: "auto" }}
        />
        {!encoded ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-8 text-center">
            <span className="grid size-11 place-items-center rounded-lg border border-dashed border-border-strong text-zinc-400">
              <QrMarkIcon className="size-5" />
            </span>
            <p className="text-[13px] leading-relaxed text-balance text-muted">
              <span className="hidden lg:inline">{p.emptyDesktop}</span>
              <span className="lg:hidden">{p.emptyMobile}</span>
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
        <span className="text-[13px] font-medium text-foreground">{p.size}</span>
        <Segmented label={p.sizeLabel} options={sizes} selected={style.size} onSelect={(size) => onStyleChange({ ...style, size })} />
        <span className="text-[13px] font-medium text-foreground">{p.margin}</span>
        <Segmented
          label={p.margin}
          options={margins}
          selected={style.margin >= 6 ? 6 : 4}
          onSelect={(margin) => onStyleChange({ ...style, margin })}
        />
      </div>
      <p className="mt-2 text-xs text-muted tabular-nums">
        {p.summaryPrefix}{" "}
        <span className="font-mono text-foreground tabular-nums">
          {style.size} × {style.size}px
        </span>{" "}
        · {p.summaryMargin(style.margin)}
      </p>

      <div className="mt-4 grid grid-cols-2 gap-2">
        <button type="button" className="btn btn-primary col-span-2" onClick={downloadPng} disabled={disabled}>
          <DownloadIcon />
          {p.downloadPng}
        </button>
        {/* Two-up buttons may wrap to two lines rather than overflow (long labels, narrow column). */}
        <button type="button" className="btn min-w-0 text-center leading-tight whitespace-normal" onClick={downloadSvg} disabled={disabled}>
          <DownloadIcon />
          {p.svg}
        </button>
        <button type="button" className="btn min-w-0 text-center leading-tight whitespace-normal" onClick={copyPng} disabled={disabled}>
          <CopyIcon />
          {p.copy}
        </button>
        <button type="button" className="btn col-span-2 min-w-0 text-center leading-tight whitespace-normal" onClick={() => setSheetOpen(true)} disabled={disabled} aria-haspopup="dialog">
          <PrinterIcon />
          {p.printSheet}
        </button>
      </div>

      <div aria-live="polite">
        {feedback ? (
          <p className="mt-3 flex items-start gap-1.5 text-xs leading-relaxed font-medium text-success">
            <CheckIcon className="mt-px size-3.5 shrink-0" />
            {feedback === "copied" ? p.copiedToast : p.savedToast}
          </p>
        ) : null}
      </div>
      {feedback ? null : <p className="mt-3 text-xs leading-relaxed text-muted">{encoded ? p.tip : p.disabledWhy}</p>}

      {encoded ? (
        <details className="mt-3 border-t border-border pt-2 text-xs text-muted">
          <summary className="flex cursor-pointer items-center gap-1.5 rounded py-1 font-medium transition-colors hover:text-foreground">
            <CodeIcon className="size-3.5" />
            {p.showData}
          </summary>
          <pre className="mt-2 max-h-40 overflow-auto rounded-md border border-border bg-card p-3 font-mono text-[11px] leading-relaxed break-all whitespace-pre-wrap text-foreground">
            {encoded}
          </pre>
        </details>
      ) : null}

      {sheetOpen && encoded ? (
        <PrintSheetDialog
          encoded={encoded}
          style={style}
          defaults={sheetDefaults}
          onClose={() => setSheetOpen(false)}
          onPrint={() => onAction("print")}
        />
      ) : null}
    </div>
  );
}
