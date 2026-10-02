"use client";

import { useMemo, useState } from "react";
import { encodePayload } from "@/lib/qr/encoders";
import type { Dict } from "@/lib/i18n";
import { DEFAULT_PAYLOADS, DEFAULT_STYLE, type QrPayloadMap, type QrStyleOptions, type QrType } from "@/lib/qr/types";
import { StepGuide } from "../StepGuide";
import { DownloadIcon, GridIcon, PencilIcon, ResetIcon } from "../icons";
import { useI18n } from "../i18n/I18nProvider";
import { PayloadForm } from "./PayloadForm";
import { SectionHeading } from "./SectionHeading";
import type { SheetText } from "./PrintSheet";
import { QrPreview } from "./QrPreview";
import { StyleOptions } from "./StyleOptions";
import { TypeTabs } from "./TypeTabs";
import { useQrLogger } from "./useQrLogger";

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

export function QrGenerator() {
  const { t } = useI18n();
  const [type, setType] = useState<QrType>("url");
  const [payloads, setPayloads] = useState<QrPayloadMap>(DEFAULT_PAYLOADS);
  const [style, setStyle] = useState<QrStyleOptions>(DEFAULT_STYLE);

  const payload = payloads[type];
  const encoded = useMemo(() => encodePayload(type, payload), [type, payload]);
  // Logs only on download, copy and print — typing and previewing never reach the server.
  const logAction = useQrLogger({ type, payload, options: style, encoded });
  // Step guide state: which content was last saved (download, copy or print).
  const [savedFor, setSavedFor] = useState<string | null>(null);
  const [typePicked, setTypePicked] = useState(false);
  const onAction = (event: Parameters<typeof logAction>[0]) => {
    logAction(event);
    setSavedFor(encoded);
  };
  const touched = typePicked || payload !== DEFAULT_PAYLOADS[type];
  const completedSteps = encoded && savedFor === encoded ? 3 : encoded ? 2 : touched ? 1 : 0;

  const setPayload = (next: QrPayloadMap[QrType]) => setPayloads((prev) => ({ ...prev, [type]: next }));
  const reset = () => setPayloads((prev) => ({ ...prev, [type]: DEFAULT_PAYLOADS[type] }));

  return (
    <section aria-labelledby="generator-heading">
      <header className="mb-4 flex flex-wrap items-baseline gap-x-4 gap-y-1">
        <h1 id="generator-heading" className="text-2xl font-semibold tracking-tight text-foreground">
          {t.generator.title}
        </h1>
        <p className="text-sm text-muted">{t.generator.tagline}</p>
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

      <div className="grid rounded-xl border border-border bg-card shadow-panel lg:grid-cols-[minmax(0,1fr)_minmax(300px,340px)] lg:grid-rows-[auto_1fr]">
        {/* 01 종류 · 02 내용 */}
        <div className="min-w-0 lg:col-start-1 lg:row-start-1">
          <div className="p-4 sm:px-6 sm:py-6">
            <SectionHeading step={1} title={t.generator.stepType} />
            <TypeTabs
              value={type}
              onChange={(next) => {
                setType(next);
                setTypePicked(true);
              }}
            />
          </div>

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
            <PayloadForm key={type} type={type} value={payload} onChange={setPayload} />
          </div>
        </div>

        {/* 미리보기 · 저장 — desktop: sticky right column. Mobile: right after the form. */}
        <div className="min-w-0 border-t border-border bg-subtle p-4 sm:px-6 sm:py-6 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:rounded-r-xl lg:border-t-0 lg:border-l">
          <div className="lg:sticky lg:top-20">
            <QrPreview
              encoded={encoded}
              style={style}
              onStyleChange={setStyle}
              fileBase={`qr-${type}`}
              sheetDefaults={sheetDefaults(type, payloads, encoded, t.print)}
              onAction={onAction}
            />
          </div>
        </div>

        {/* 꾸미기 — secondary, collapsed by default */}
        <div className="min-w-0 border-t border-border p-4 sm:px-6 sm:py-6 lg:col-start-1 lg:row-start-2">
          <StyleOptions value={style} onChange={setStyle} />
        </div>
      </div>
    </section>
  );
}
