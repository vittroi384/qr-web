"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { encodePayload } from "@/lib/qr/encoders";
import { validatePayload } from "@/lib/qr/validate";
import type { Dict, LandingUiHints } from "@/lib/i18n";
import { DEFAULT_PAYLOADS, DEFAULT_STYLE, type QrPayloadMap, type QrStyleOptions, type QrType } from "@/lib/qr/types";
import { StepGuide } from "../StepGuide";
import { DownloadIcon, GridIcon, PencilIcon, ResetIcon } from "../icons";
import type { AffiliateInfo } from "../AffiliateCard";
import { useI18n } from "../i18n/I18nProvider";
import { PayloadForm } from "./PayloadForm";
import { SectionHeading } from "./SectionHeading";
import type { SheetText } from "./PrintSheet";
import { QrPreview } from "./QrPreview";
import { StyleOptions } from "./StyleOptions";
import { TypeTabs } from "./TypeTabs";
import { useFunnel, useQrLogger } from "./useQrLogger";

/** Starting headline and sub-line for the print sheet. Everything stays editable in the dialog. */
function sheetDefaults(type: QrType, payloads: QrPayloadMap, encoded: string, t: Dict["print"]): SheetText {
  const headlines: Partial<Record<QrType, string>> = t.headlines;
  const headline = headlines[type] ?? t.headlines.default;
  let subline = "";
  if (type === "wifi" && payloads.wifi.ssid.trim()) subline = t.ssid(payloads.wifi.ssid.trim());
  // Links show their site, so a printed sign says where it leads.
  if ((type === "url" || type === "file") && encoded) {
    try {
      subline = new URL(encoded).hostname.replace(/^www\./, "");
    } catch {
      subline = "";
    }
  }
  return { headline, subline };
}

/** Classes that outline the logo field for a moment after a landing page scrolls to it. */
const LOGO_HIGHLIGHT = ["outline-2", "outline-offset-4", "outline-accent", "rounded-lg"];

export function QrGenerator({
  initialType = "url",
  initialPayload,
  initialUi,
  heading,
  affiliate,
}: {
  /** Type selected on first render (landing pages); visitors can still switch. */
  initialType?: QrType;
  /** Payload fields to preselect (e.g. the Google Review platform on its landing page). */
  initialPayload?: Partial<QrPayloadMap>;
  /** Open the Style section and point at the logo field (the "QR code with logo" landing). */
  initialUi?: LandingUiHints;
  /** Replaces the default H1 and tagline (landing pages use their own). */
  heading?: { title: string; subtitle: string };
  /** Print-partner slot shown inside the print-sheet dialog; omitted when not configured. */
  affiliate?: AffiliateInfo | null;
} = {}) {
  const { t, locale } = useI18n();
  const [type, setType] = useState<QrType>(initialType);
  // False after the chosen tile is pressed again: the form and preview hide, the step guide
  // returns to step 1, and `type` keeps the last choice so re-selecting restores what was typed.
  const [selected, setSelected] = useState(true);
  const [payloads, setPayloads] = useState<QrPayloadMap>(() => ({ ...DEFAULT_PAYLOADS, ...initialPayload }));
  const [style, setStyle] = useState<QrStyleOptions>(DEFAULT_STYLE);

  const payload = payloads[type];
  // Why a filled-in field cannot be encoded (null when fine or still empty). A payload with an
  // issue never reaches the encoder, so nothing half-right (a payment link minus its amount, a
  // blocked URL scheme) can go Live and be saved.
  const issue = useMemo(() => validatePayload(type, payload), [type, payload]);
  const encoded = useMemo(() => (issue || !selected ? "" : encodePayload(type, payload)), [type, payload, issue, selected]);
  // Logs only on download, copy and print — typing and previewing never reach the server.
  const logAction = useQrLogger({ type, payload, options: style, encoded });
  // Step guide state: which content was last saved (download, copy or print).
  const [savedFor, setSavedFor] = useState<string | null>(null);
  // A landing page has already chosen the type, so step 1 starts done there.
  const [typePicked, setTypePicked] = useState(initialType !== "url");
  const onAction = (event: Parameters<typeof logAction>[0]) => {
    logAction(event);
    setSavedFor(encoded);
  };
  const touched = selected && (typePicked || payload !== DEFAULT_PAYLOADS[type]);
  // Anonymous select → preview counters (once per type per session); no content is sent. "select"
  // waits for `touched`, so a plain visit to the home page (default type: URL) is not a selection.
  useFunnel(type, touched, Boolean(encoded), locale);
  const completedSteps = encoded && savedFor === encoded ? 3 : encoded ? 2 : touched ? 1 : 0;

  const setPayload = (next: QrPayloadMap[QrType]) => setPayloads((prev) => ({ ...prev, [type]: next }));
  const reset = () => setPayloads((prev) => ({ ...prev, [type]: DEFAULT_PAYLOADS[type] }));

  // Landing hints run once on mount: the Style section is always open, so this only outlines
  // the logo field briefly when asked. No auto-scroll: the landing headline must stay in view.
  const styleRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!initialUi?.focusLogo) return;
    const root = styleRef.current;
    if (!root) return;
    const field = root.querySelector('input[type="file"]')?.closest<HTMLElement>('[role="group"]');
    if (!field) return;
    field.classList.add(...LOGO_HIGHLIGHT);
    const timer = window.setTimeout(() => field.classList.remove(...LOGO_HIGHLIGHT), 2500);
    return () => window.clearTimeout(timer);
    // Mount-only: the hints describe the landing page, not live state.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section aria-labelledby="generator-heading">
      <header className="mb-4 flex flex-wrap items-baseline gap-x-4 gap-y-1">
        <h1 id="generator-heading" className="text-2xl font-bold tracking-tight text-foreground">
          {heading?.title ?? t.generator.title}
        </h1>
        <p className="text-sm text-muted">{heading?.subtitle ?? t.generator.tagline}</p>
      </header>

      <StepGuide
        slim
        live
        completed={completedSteps}
        className="mb-4"
        label={t.steps.label}
        doneLabel={t.steps.done}
        currentLabel={t.steps.current}
        steps={t.steps.generator.map((step, i) => ({ ...step, icon: [<GridIcon key="type" />, <PencilIcon key="content" />, <DownloadIcon key="save" />][i] }))}
      />

      {/* Three cards: type + content, the preview (sticky at lg, sits right after the form on phones), style. */}
      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(300px,340px)] lg:items-start lg:gap-5">
        {/* 01 종류 · 02 내용 */}
        <div className="min-w-0 rounded-xl border border-border bg-card shadow-panel lg:col-start-1 lg:row-start-1">
          <div className="p-4 sm:px-6 sm:py-6">
            <SectionHeading step={1} title={t.generator.stepType} />
            <TypeTabs
              value={selected ? type : null}
              onChange={(next) => {
                if (next === null) {
                  setSelected(false);
                  setTypePicked(false);
                  return;
                }
                setType(next);
                setSelected(true);
                setTypePicked(true);
              }}
            />
          </div>

          {/* Step 2 exists only while a type is selected; clearing the selection simply hides it. */}
          {selected ? (
            <div className="border-t border-border p-4 sm:px-6 sm:py-6">
              <SectionHeading
                step={2}
                title={t.types.labels[type]}
                description={t.types.descriptions[type]}
                action={
                  <button type="button" className="btn btn-ghost btn-sm -mt-1 -mr-1.5 shrink-0" onClick={reset}>
                    <ResetIcon />
                    {t.generator.reset}
                  </button>
                }
              />
              <PayloadForm key={type} type={type} value={payload} onChange={setPayload} issue={issue} />
            </div>
          ) : null}
        </div>

        {/* 미리보기 · 저장 — its own card: sticky on the right at lg, right after the form on phones. */}
        <div className="min-w-0 rounded-xl border border-border bg-subtle p-4 shadow-panel sm:px-6 sm:py-6 lg:sticky lg:top-20 lg:col-start-2 lg:row-span-2 lg:row-start-1">
          <div>
            <QrPreview
              affiliate={affiliate ?? null}
              encoded={encoded}
              invalid={selected && Boolean(issue)}
              style={style}
              onStyleChange={setStyle}
              fileBase={`qr-${type}`}
              sheetDefaults={sheetDefaults(type, payloads, encoded, t.print)}
              onAction={onAction}
            />
          </div>
        </div>

        {/* 꾸미기 */}
        <div ref={styleRef} className="min-w-0 rounded-xl border border-border bg-card p-4 shadow-panel sm:px-6 sm:py-6 lg:col-start-1 lg:row-start-2">
          <StyleOptions value={style} onChange={setStyle} />
        </div>
      </div>
    </section>
  );
}
