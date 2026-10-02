import type { ReactNode } from "react";
import { EVENT_LABELS, StatCard } from "@/components/admin/ui";
import { LOCALE_NAMES, isLocale } from "@/lib/i18n/locales";
import { QR_TYPE_LABELS, type QrType } from "@/lib/qr/types";
import { getStats } from "@/lib/stats";

/** Save methods shown as matrix columns ("generate" is never logged). */
const SAVE_EVENTS = ["download_png", "download_svg", "copy", "print", "batch"] as const;
const UNKNOWN = "(알 수 없음)";

const typeLabel = (t: string) => (QR_TYPE_LABELS as Record<string, string>)[t as QrType] ?? t;
const localeLabel = (l: string | null) => (l && isLocale(l) ? `${l} · ${LOCALE_NAMES[l].full}` : (l ?? UNKNOWN));
const n = (v: number) => v.toLocaleString();
const pct = (part: number, whole: number) => (whole > 0 ? `${((part / whole) * 100).toFixed(1)}%` : "–");

function Section({ title, hint, children }: { title: string; hint?: string; children: ReactNode }) {
  return (
    <section className="overflow-hidden rounded-xl border border-border bg-card">
      <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1 px-5 py-4">
        <h2 className="text-[15px] font-semibold">{title}</h2>
        {hint ? <p className="text-xs text-muted">{hint}</p> : null}
      </div>
      <div className="border-t border-border">{children}</div>
    </section>
  );
}

function Empty() {
  return <p className="px-5 py-10 text-center text-sm text-muted">아직 데이터가 없습니다.</p>;
}

/** Vertical CSS bars (no chart library); each bar carries a hover title. */
function Bars({ items, height }: { items: { key: string; c: number; title: string }[]; height: string }) {
  const max = Math.max(1, ...items.map((i) => i.c));
  return (
    <div className={`flex items-end gap-0.5 sm:gap-1 ${height}`}>
      {items.map((i) => (
        <div key={i.key} className="flex h-full flex-1 items-end" title={i.title}>
          <div
            className={`w-full rounded-t-sm transition-colors ${i.c ? "bg-accent/80 hover:bg-accent" : "bg-surface"}`}
            style={{ height: i.c ? `${Math.max(3, (i.c / max) * 100)}%` : "2px" }}
          />
        </div>
      ))}
    </div>
  );
}

export default async function StatsPage() {
  const s = await getStats();
  const maxDay = Math.max(0, ...s.byDay.map((d) => d.c));
  const localeTotal = s.byLocale.reduce((sum, r) => sum + r.c, 0);

  // qr_type × event matrix, rows sorted by their total.
  const matrix = new Map<string, Record<string, number>>();
  for (const r of s.byTypeEvent) {
    const row = matrix.get(r.qrType) ?? {};
    row[r.event] = (row[r.event] ?? 0) + r.c;
    matrix.set(r.qrType, row);
  }
  const matrixRows = [...matrix.entries()]
    .map(([qrType, cells]) => ({ qrType, cells, total: Object.values(cells).reduce((a, b) => a + b, 0) }))
    .sort((a, b) => b.total - a.total);

  const funnelTotals = s.funnel.reduce(
    (acc, r) => ({ select: acc.select + r.select, preview: acc.preview + r.preview, save: acc.save + r.save }),
    { select: 0, preview: 0, save: 0 },
  );

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold tracking-tight">
        통계 <span className="ml-1 text-sm font-normal tracking-normal text-muted">최근 {s.days}일 · KST 기준</span>
      </h1>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label={`저장 (최근 ${s.days}일)`} value={n(s.total)} />
        <StatCard label="저장이 있었던 언어" value={n(s.byLocale.filter((r) => r.locale).length)} />
        <StatCard label="퍼널: 종류 선택" value={n(funnelTotals.select)} hint="세션·종류별 1회" />
        <StatCard
          label="퍼널: 미리보기 → 저장"
          value={pct(funnelTotals.save, funnelTotals.preview)}
          hint={`저장 ${n(funnelTotals.save)} / 미리보기 ${n(funnelTotals.preview)}`}
        />
      </div>

      <Section title="일별 저장 수" hint={`최근 ${s.days}일`}>
        {s.total === 0 ? (
          <Empty />
        ) : (
          <div className="px-5 pt-5 pb-4">
            <Bars height="h-40" items={s.byDay.map((d) => ({ key: d.day, c: d.c, title: `${d.day}: ${n(d.c)}건` }))} />
            <div className="mt-1.5 flex justify-between text-[10px] text-muted tabular-nums">
              <span>{s.byDay[0].day.slice(5)}</span>
              <span>최대 {n(maxDay)}건/일</span>
              <span>{s.byDay[s.byDay.length - 1].day.slice(5)}</span>
            </div>
          </div>
        )}
      </Section>

      <div className="grid gap-6 lg:grid-cols-2">
        <Section title="언어별 저장 수">
          {s.byLocale.length === 0 ? (
            <Empty />
          ) : (
            <div className="table-scroll [--table-offset:20rem]">
              <table className="table">
                <thead>
                  <tr>
                    <th>언어</th>
                    <th className="text-right">저장</th>
                    <th className="text-right">비율</th>
                  </tr>
                </thead>
                <tbody>
                  {s.byLocale.map((r) => (
                    <tr key={r.locale ?? ""}>
                      <td className={r.locale ? "" : "text-muted"}>{localeLabel(r.locale)}</td>
                      <td className="text-right tabular-nums">{n(r.c)}</td>
                      <td className="text-right text-muted tabular-nums">{pct(r.c, localeTotal)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Section>

        <Section title="페이지별 저장 수" hint="상위 15">
          {s.byPage.length === 0 ? (
            <Empty />
          ) : (
            <div className="table-scroll [--table-offset:20rem]">
              <table className="table">
                <thead>
                  <tr>
                    <th>페이지 (언어 접두 제외)</th>
                    <th className="text-right">저장</th>
                  </tr>
                </thead>
                <tbody>
                  {s.byPage.map((r) => (
                    <tr key={r.page ?? ""}>
                      <td className={`max-w-xs truncate font-mono text-xs ${r.page ? "" : "text-muted"}`} title={r.page ?? undefined}>
                        {r.page ?? UNKNOWN}
                      </td>
                      <td className="text-right tabular-nums">{n(r.c)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Section>
      </div>

      <Section title="종류 × 저장 방식">
        {matrixRows.length === 0 ? (
          <Empty />
        ) : (
          <div className="table-scroll [--table-offset:20rem]">
            <table className="table">
              <thead>
                <tr>
                  <th>종류</th>
                  {SAVE_EVENTS.map((e) => (
                    <th key={e} className="text-right">
                      {EVENT_LABELS[e] ?? e}
                    </th>
                  ))}
                  <th className="text-right">합계</th>
                </tr>
              </thead>
              <tbody>
                {matrixRows.map((r) => (
                  <tr key={r.qrType}>
                    <td className="whitespace-nowrap">{typeLabel(r.qrType)}</td>
                    {SAVE_EVENTS.map((e) => (
                      <td key={e} className={`text-right tabular-nums ${r.cells[e] ? "" : "text-muted"}`}>
                        {r.cells[e] ? n(r.cells[e]) : "–"}
                      </td>
                    ))}
                    <td className="text-right font-medium tabular-nums">{n(r.total)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Section>

      <Section title="시간대 분포" hint="KST 0–23시">
        {s.total === 0 ? (
          <Empty />
        ) : (
          <div className="px-5 pt-5 pb-4">
            <Bars height="h-24" items={s.byHour.map((h) => ({ key: String(h.hour), c: h.c, title: `${h.hour}시: ${n(h.c)}건` }))} />
            <div className="mt-1.5 flex gap-0.5 text-[10px] text-muted tabular-nums sm:gap-1">
              {s.byHour.map((h) => (
                <span key={h.hour} className="flex-1 text-center">
                  {h.hour % 3 === 0 ? h.hour : ""}
                </span>
              ))}
            </div>
          </div>
        )}
      </Section>

      <Section title="퍼널 (선택 → 미리보기 → 저장)">
        {s.funnel.length === 0 ? (
          <Empty />
        ) : (
          <div className="table-scroll [--table-offset:20rem]">
            <table className="table">
              <thead>
                <tr>
                  <th>종류</th>
                  <th className="text-right">선택</th>
                  <th className="text-right">미리보기</th>
                  <th className="text-right">미리보기/선택</th>
                  <th className="text-right">저장</th>
                  <th className="text-right">저장/미리보기</th>
                </tr>
              </thead>
              <tbody>
                {s.funnel.map((r) => (
                  <tr key={r.qrType}>
                    <td className="whitespace-nowrap">{typeLabel(r.qrType)}</td>
                    <td className="text-right tabular-nums">{n(r.select)}</td>
                    <td className="text-right tabular-nums">{n(r.preview)}</td>
                    <td className="text-right text-muted tabular-nums">{pct(r.preview, r.select)}</td>
                    <td className="text-right tabular-nums">{n(r.save)}</td>
                    <td className="text-right text-muted tabular-nums">{pct(r.save, r.preview)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <p className="border-t border-border px-5 py-3 text-xs text-muted">
          선택·미리보기는 브라우저 세션당 종류별 1회만 셉니다. 저장은 모든 저장 건수(일괄 생성 포함)라 100%를 넘을 수 있습니다. 퍼널 집계는
          이 기능을 배포한 날부터 시작되었으며, IP·브라우저 등 개인 정보는 저장하지 않습니다.
        </p>
      </Section>
    </div>
  );
}
