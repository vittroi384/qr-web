"use client";

import { useEffect, useRef, useState } from "react";
import { frameLayout } from "@/lib/qr/frame";
import type { QrStyleOptions } from "@/lib/qr/types";
import { CoffeeIcon, CheckIcon, ChevronDownIcon, CodeIcon, CopyIcon, DownloadIcon, PrinterIcon, QrMarkIcon, WarningIcon } from "../icons";
import { useI18n } from "../i18n/I18nProvider";
import type { AffiliateInfo } from "../AffiliateCard";
import { PrintSheetDialog, type SheetText } from "./PrintSheet";
import { buildSvg, drawQrToCanvas, exactWidth, isCapacityError, triggerDownload } from "./render";
import { Segmented } from "./Segmented";

type Props = {
  encoded: string;
  /** The form holds a value that cannot be encoded (the field explains why); `encoded` is empty then. */
  invalid?: boolean;
  style: QrStyleOptions;
  onStyleChange: (next: QrStyleOptions) => void;
  fileBase: string;
  /** Starting text for the print sheet (depends on the QR type and its content). */
  sheetDefaults: SheetText;
  affiliate: AffiliateInfo | null;
  /** Support link; when set, one quiet line appears under the buttons after the first save. */
  donateUrl?: string;
  onAction: (event: "download_png" | "download_svg" | "copy" | "print") => void;
};

/** Short-lived line under the buttons: save/copy confirmations and the non-blocking copy failure. */
type Feedback = "saved" | "copied" | "copyFailed";
const FEEDBACK_MS: Record<Feedback, number> = { saved: 2000, copied: 2000, copyFailed: 6000 };

export function QrPreview({ encoded, invalid = false, style, onStyleChange, fileBase, sheetDefaults, affiliate, donateUrl, onAction }: Props) {
  // Set on the first successful save/copy/print and never reset: the thank-you line is shown after
  // the visitor has got what they came for, not before, and never as a popup.
  const [savedOnce, setSavedOnce] = useState(false);
  const act = (event: "download_png" | "download_svg" | "copy" | "print") => {
    setSavedOnce(true);
    onAction(event);
  };
  const { t } = useI18n();
  const p = t.preview;
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);
  // Render failures only (content too long for a QR). Copy problems never land here: they must
  // not disable the save buttons that are the way out.
  const [error, setError] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const feedbackTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);
  // Phone layout: the preview sits below the form. True while its save buttons are still further
  // down the page (out of view below the viewport).
  const [actionsBelow, setActionsBelow] = useState(false);

  /** Output resolution of the saved PNG. The on-screen preview always scales to fit its frame. */
  const sizes = [
    { name: p.sizes.small, value: 256 },
    { name: p.sizes.medium, value: 512 },
    { name: p.sizes.large, value: 1024 },
    { name: p.sizes.max, value: 2048 },
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

  // Drives the phone-only save bar. It stands in for the real save buttons, so it shows exactly
  // while those are out of view *below* the viewport (the visitor is up in the form) and goes
  // away the moment they scroll in. Scrolling past them hides it too, so the bar never sits on
  // top of the ads further down the page.
  // The root is extended far upward, so "not intersecting" means precisely "below the viewport"
  // and the observer fires on every change of that answer — including an instant jump from the
  // page bottom back to the top, which a plain viewport root would miss (both states are
  // non-intersecting there).
  useEffect(() => {
    const actions = actionsRef.current;
    if (!actions || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(([entry]) => setActionsBelow(!entry.isIntersecting), { rootMargin: "100000px 0px 0px 0px" });
    observer.observe(actions);
    return () => observer.disconnect();
  }, []);

  const notify = (kind: Feedback) => {
    if (feedbackTimer.current) clearTimeout(feedbackTimer.current);
    setFeedback(kind);
    feedbackTimer.current = setTimeout(() => setFeedback(null), FEEDBACK_MS[kind]);
  };

  const downloadPng = () => {
    const canvas = canvasRef.current;
    if (!canvas || !encoded) return;
    triggerDownload(canvas.toDataURL("image/png"), `${fileBase}.png`);
    notify("saved");
    act("download_png");
  };

  const downloadSvg = async () => {
    if (!encoded) return;
    const svg = await buildSvg(encoded, style);
    const url = URL.createObjectURL(new Blob([svg], { type: "image/svg+xml" }));
    triggerDownload(url, `${fileBase}.svg`);
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    notify("saved");
    act("download_svg");
  };

  const copyPng = async () => {
    const canvas = canvasRef.current;
    if (!canvas || !encoded) return;
    try {
      // navigator.clipboard is undefined on plain-HTTP pages and ClipboardItem is missing in some
      // browsers; both throw here and end up in the same hint.
      const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/png"));
      if (!blob) throw new Error("blob");
      await navigator.clipboard.write([new ClipboardItem({ "image/png": blob })]);
      notify("copied");
      act("copy");
    } catch {
      notify("copyFailed");
    }
  };

  const scrollToPreview = () => frameRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });

  // Stale errors are irrelevant once the input is cleared.
  const shownError = encoded ? error : null;
  const disabled = !encoded || Boolean(shownError);

  const badge = shownError
    ? { text: p.badgeError, cls: "bg-danger-soft text-danger" }
    : encoded
      ? { text: p.badgeLive, cls: "bg-success-soft text-success" }
      : invalid
        ? { text: p.badgeInvalid, cls: "bg-warning-soft text-warning" }
        : { text: p.badgeIdle, cls: "bg-surface text-muted" };

  let qrPx = style.size;
  if (encoded) {
    try {
      qrPx = exactWidth(encoded, style);
    } catch {
      // content too long for a QR — the error state is shown elsewhere
    }
  }
  // Saved image size: the code plus its frame (identical to the code alone without one).
  const output = frameLayout(qrPx, style);

  const showBar = actionsBelow && !disabled;

  return (
    <div className="flex flex-col">
      <div className="mb-3 flex items-center justify-between gap-3">
        <h2 className="text-[15px] font-semibold text-foreground">{p.title}</h2>
        <span className={`inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-xs font-medium ${badge.cls}`}>
          <span className="size-1.5 rounded-full bg-current" aria-hidden="true" />
          {badge.text}
        </span>
      </div>

      {/* The canvas keeps its full output resolution; CSS scales it to the box (letterboxed when a frame makes it taller). */}
      <div ref={frameRef} className="relative mx-auto aspect-square w-full max-w-[280px] scroll-mt-20 overflow-hidden rounded-lg border border-border bg-white">
        <canvas
          ref={canvasRef}
          role="img"
          aria-label={p.canvasLabel}
          className={`block h-full w-full object-contain ${encoded && !shownError ? "" : "opacity-0"}`}
          style={{ imageRendering: "auto" }}
        />
        {!encoded ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-8 text-center">
            <span className={`grid size-11 place-items-center rounded-lg border border-dashed ${invalid ? "border-amber-300 text-warning" : "border-border-strong text-zinc-400"}`}>
              {invalid ? <WarningIcon className="size-5" /> : <QrMarkIcon className="size-5" />}
            </span>
            <p className="text-[13px] leading-relaxed text-balance text-muted">
              {invalid ? (
                p.emptyInvalid
              ) : (
                <>
                  <span className="hidden lg:inline">{p.emptyDesktop}</span>
                  <span className="lg:hidden">{p.emptyMobile}</span>
                </>
              )}
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
          {output.width} × {output.height}px
        </span>{" "}
        · {p.summaryMargin(style.margin)}
      </p>

      <div ref={actionsRef} className="mt-4 grid grid-cols-2 gap-2">
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
        {feedback === "copyFailed" ? (
          <p className="mt-3 flex items-start gap-1.5 text-xs leading-relaxed font-medium text-warning">
            <WarningIcon className="mt-px size-3.5 shrink-0" />
            {p.copyUnsupported}
          </p>
        ) : feedback ? (
          <p className="mt-3 flex items-start gap-1.5 text-xs leading-relaxed font-medium text-success">
            <CheckIcon className="mt-px size-3.5 shrink-0" />
            {feedback === "copied" ? p.copiedToast : p.savedToast}
          </p>
        ) : null}
      </div>
      {feedback ? null : <p className="mt-3 text-xs leading-relaxed text-muted">{encoded ? p.tip : p.disabledWhy}</p>}

      {savedOnce && donateUrl ? (
        <p className="mt-3 flex flex-wrap items-center gap-x-1.5 gap-y-1 text-xs leading-relaxed text-muted">
          <CoffeeIcon className="size-3.5 shrink-0" />
          <span>{p.thanksLine}</span>
          <a href={donateUrl} target="_blank" rel="noopener" className="font-medium text-accent underline-offset-2 hover:underline">
            {p.thanksCta}
          </a>
        </p>
      ) : null}

      {encoded ? (
        <details className="mt-3 border-t border-border pt-2 text-xs text-muted">
          <summary className="flex min-h-11 cursor-pointer items-center gap-1.5 rounded font-medium transition-colors hover:text-foreground">
            <CodeIcon className="size-3.5" />
            {p.showData}
          </summary>
          <pre className="mt-2 max-h-40 overflow-auto rounded-md border border-border bg-card p-3 font-mono text-[11px] leading-relaxed break-all whitespace-pre-wrap text-foreground">
            {encoded}
          </pre>
        </details>
      ) : null}

      {/*
        Phone-only save bar (lg+ keeps the preview sticky beside the form). Appears while the code
        is ready but the save buttons are scrolled out of view below, so saving does not need a
        long scroll. Fixed to the bottom, under the header (z-40) and menus; padded for the home indicator.
      */}
      {showBar ? (
        <div className="save-bar fixed inset-x-0 bottom-0 z-30 border-t border-border bg-card/95 px-4 pt-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] shadow-[0_-8px_24px_-12px_rgb(2_132_199/0.25)] backdrop-blur-md lg:hidden">
          <div className="mx-auto flex max-w-[1400px] items-center gap-2 sm:gap-3">
            <p className="min-w-0 flex-1 truncate text-[13px] text-foreground">
              {feedback === "saved" ? (
                <span className="font-medium text-success">{p.savedToast}</span>
              ) : (
                <>
                  <span className="font-medium text-success">{p.barReady}</span>
                  <span className="text-muted"> · </span>
                  <span className="font-mono tabular-nums">
                    {output.width}×{output.height}
                  </span>
                </>
              )}
            </p>
            <button type="button" className="btn btn-primary shrink-0" onClick={downloadPng}>
              <DownloadIcon />
              {p.barSave}
            </button>
            <button type="button" className="btn shrink-0 px-3" aria-label={p.barToPreview} title={p.barToPreview} onClick={scrollToPreview}>
              <ChevronDownIcon />
            </button>
          </div>
        </div>
      ) : null}

      {sheetOpen && encoded ? (
        <PrintSheetDialog
          encoded={encoded}
          style={style}
          defaults={sheetDefaults}
          affiliate={affiliate}
          onClose={() => setSheetOpen(false)}
          onPrint={() => act("print")}
        />
      ) : null}
    </div>
  );
}
