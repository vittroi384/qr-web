"use client";

import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import type { QrStyleOptions } from "@/lib/qr/types";
import { CloseIcon, PrinterIcon } from "../icons";
import { AffiliateCard, type AffiliateInfo } from "../AffiliateCard";
import { useI18n } from "../i18n/I18nProvider";
import { drawQrToCanvas } from "./render";

/** The sheet's QR is rendered on its own canvas at this resolution (≈ 200 dpi at print size). */
const SHEET_QR_PX = 1024;

export type SheetText = { headline: string; subline: string };

/** The rendered code as a data URL plus its bitmap size (taller than wide when it has a frame). */
type PosterImage = { src: string; width: number; height: number };

type PosterProps = SheetText & { footer: string; image: PosterImage | null; alt: string };

/**
 * The A4 poster. Every size is in container-width units (cqw), so the same markup scales from
 * the on-screen preview to the 186 mm printable width without a second layout.
 */
function Poster({ headline, subline, footer, image, alt }: PosterProps) {
  return (
    <div className="poster-frame">
      <div className="poster">
        <div className="poster-head">
          <p className="poster-headline">{headline}</p>
          {subline ? <p className="poster-subline">{subline}</p> : null}
        </div>
        <div className="poster-qr">
          {image ? (
            // eslint-disable-next-line @next/next/no-img-element -- a local data URL; next/image adds nothing here
            <img
              src={image.src}
              alt={alt}
              width={image.width}
              height={image.height}
              // A framed code is taller than wide: keep its ratio and let it shrink to the slot's height.
              style={{ aspectRatio: `${image.width} / ${image.height}`, maxHeight: "100%", objectFit: "contain" }}
            />
          ) : null}
        </div>
        <p className="poster-footer">{footer}</p>
      </div>
    </div>
  );
}

function TextField({
  label,
  value,
  onChange,
  placeholder,
  optional,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  optional?: string;
}) {
  return (
    <label className="block min-w-0">
      <span className="label flex items-baseline justify-between gap-2">
        {label}
        {optional ? <span className="text-xs font-normal text-muted">{optional}</span> : null}
      </span>
      <input className="input" value={value} maxLength={80} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} />
    </label>
  );
}

/**
 * Modal editor for a printable A4 sign. Uses a native <dialog> (focus containment, Esc and the
 * inert background come from the browser). Both the dialog and the print-only copy of the poster
 * are portalled into <body>, so print CSS can hide every other top-level node.
 */
export function PrintSheetDialog({
  encoded,
  style,
  defaults,
  affiliate,
  onClose,
  onPrint,
}: {
  encoded: string;
  style: QrStyleOptions;
  defaults: SheetText;
  onClose: () => void;
  onPrint: () => void;
  affiliate: AffiliateInfo | null;
}) {
  const { t } = useI18n();
  const p = t.print;
  const titleId = useId();
  const descId = useId();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [headline, setHeadline] = useState(defaults.headline);
  const [subline, setSubline] = useState(defaults.subline);
  const [footer, setFooter] = useState("");
  const [image, setImage] = useState<PosterImage | null>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (dialog && !dialog.open) dialog.showModal();
    const root = document.documentElement;
    const previous = root.style.overflow;
    root.style.overflow = "hidden";
    // No dialog.close() here: removing an open dialog from the DOM already dismisses it, and a
    // queued "close" event would unmount it again under React's dev double-invoke.
    return () => {
      root.style.overflow = previous;
    };
  }, []);

  useEffect(() => {
    let cancelled = false;
    const canvas = document.createElement("canvas");
    drawQrToCanvas(canvas, encoded, { ...style, size: SHEET_QR_PX })
      .then(() => {
        if (!cancelled) setImage({ src: canvas.toDataURL("image/png"), width: canvas.width, height: canvas.height });
      })
      .catch(() => {
        if (!cancelled) setImage(null);
      });
    return () => {
      cancelled = true;
    };
  }, [encoded, style]);

  const print = () => {
    onPrint();
    window.print();
  };

  const poster = { headline, subline, footer, image, alt: p.qrAlt };

  return createPortal(
    <>
      <dialog
        ref={dialogRef}
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descId}
        onClose={onClose}
        className="m-auto max-h-[calc(100dvh-32px)] w-[min(880px,calc(100vw-32px))] overflow-hidden rounded-xl border border-border bg-card p-0 text-foreground shadow-[0_24px_64px_-16px_rgb(15_23_42/0.35)] backdrop:bg-[rgb(15_23_42/0.45)]"
      >
        <div className="flex max-h-[calc(100dvh-32px)] flex-col">
          <header className="flex items-start justify-between gap-4 border-b border-border px-5 py-4 sm:px-6">
            <div className="min-w-0">
              <h2 id={titleId} className="text-[15px] font-semibold">
                {p.dialogTitle}
              </h2>
              <p id={descId} className="mt-0.5 text-[13px] text-muted">
                {p.dialogDesc}
              </p>
            </div>
            <button
              type="button"
              className="btn btn-ghost -mt-1.5 -mr-2.5 size-11 shrink-0 px-0"
              aria-label={p.close}
              onClick={() => dialogRef.current?.close()}
            >
              <CloseIcon />
            </button>
          </header>

          <div className="grid min-h-0 flex-1 overflow-y-auto md:grid-cols-[minmax(0,1fr)_300px]">
            <div className="flex items-start justify-center bg-surface px-5 py-6 sm:px-8 md:py-8" aria-label={p.previewLabel} role="img">
              <div className="w-full max-w-[340px] shadow-[0_1px_2px_rgb(15_23_42/0.06),0_12px_32px_-12px_rgb(15_23_42/0.25)]">
                <Poster {...poster} />
              </div>
            </div>

            <div className="flex flex-col gap-4 border-t border-border p-5 sm:p-6 md:border-t-0 md:border-l">
              <TextField label={p.headline} value={headline} onChange={setHeadline} />
              <TextField label={p.subline} value={subline} onChange={setSubline} placeholder={p.sublinePlaceholder} optional={p.optional} />
              <TextField label={p.footer} value={footer} onChange={setFooter} placeholder={p.footerPlaceholder} optional={p.optional} />
              <div className="mt-auto pt-2">
                <button type="button" className="btn btn-primary w-full" onClick={print} disabled={!image}>
                  <PrinterIcon />
                  {p.print}
                </button>
                <p className="hint">{p.pdfHint}</p>
                {/* Partner slot: 32px below the print button, labelled "Sponsored". */}
                {affiliate ? <AffiliateCard info={affiliate} className="mt-8" /> : null}
              </div>
            </div>
          </div>
        </div>
      </dialog>

      {/* Hidden on screen; the only thing visible when printing. */}
      <div className="print-root" aria-hidden="true">
        <Poster {...poster} />
      </div>
    </>,
    document.body,
  );
}
