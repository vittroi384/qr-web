import { BOOLEAN_SETTINGS, SETTING_LABELS, type SettingKey, getSettings } from "@/lib/settings";
import { saveSettingsAction } from "./actions";

type SearchParams = Record<string, string | string[] | undefined>;

const GROUPS: { title: string; description?: string; keys: SettingKey[] }[] = [
  {
    title: "사이트",
    description: "메타 태그, sitemap, OG 정보에 사용됩니다. 도메인을 바꾸면 여기서 URL만 수정하면 됩니다.",
    keys: ["site_name", "site_url", "site_description", "footer_notice"],
  },
  {
    title: "광고 (Google AdSense)",
    description:
      "게시자 ID를 넣고 '광고 표시'를 켜면 슬롯 ID가 있는 자리에만 광고가 나옵니다. /ads.txt 도 자동으로 생성됩니다. 슬롯 ID는 AdSense에서 '디스플레이 광고' 단위를 만들면 data-ad-slot 값으로 표시됩니다.",
    keys: ["adsense_client", "ads_enabled", "ad_placeholders", "ad_slot_top", "ad_slot_left", "ad_slot_right", "ad_slot_bottom", "ad_slot_incontent"],
  },
  {
    title: "수익화",
    description:
      "인쇄 제휴 링크는 인쇄용 안내판 창과 랜딩 페이지 팁 아래에 '제휴' 표시와 함께 작은 카드로 나옵니다. 후원 링크는 푸터에 표시됩니다. URL을 비우면 해당 항목은 아무것도 표시되지 않습니다. 문구가 기본값이면 한국어 페이지에서는 한국어 기본 문구로 바뀌어 보입니다.",
    keys: ["affiliate_print_url", "donate_url", "affiliate_print_label", "affiliate_print_note"],
  },
  {
    title: "방문자 입력 기록",
    description: "방문자가 QR로 만든 내용과 접속 정보를 서버 DB에 저장할지 결정합니다. Wi-Fi 비밀번호는 설정과 무관하게 항상 마스킹(****)되어 저장됩니다. 보관 일수가 지난 기록은 자동 삭제됩니다.",
    keys: ["logging_enabled", "log_retention_days"],
  },
];

const ERROR_MESSAGES: Record<string, string> = {
  site_url: "사이트 URL 형식이 올바르지 않습니다. 예: https://example.com",
  adsense_client: "AdSense 게시자 ID 형식이 올바르지 않습니다. 예: ca-pub-1234567890123456",
  ad_slot: "광고 슬롯 ID는 숫자 5~20자리여야 합니다. 비워 두면 해당 자리는 표시되지 않습니다. (다른 변경도 함께 저장되지 않았습니다)",
  log_retention_days: "기록 보관 일수는 0 이상의 정수여야 합니다. (다른 변경도 함께 저장되지 않았습니다)",
  monetize_url: "제휴·후원 링크는 http:// 또는 https:// 로 시작하는 주소여야 합니다. (다른 변경도 함께 저장되지 않았습니다)",
};

export default async function SettingsPage({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const sp = await searchParams;
  const s = await getSettings();
  const saved = typeof sp.saved === "string" ? Number.parseInt(sp.saved, 10) : null;
  const error = typeof sp.error === "string" ? ERROR_MESSAGES[sp.error] : null;

  return (
    <form action={saveSettingsAction} className="mx-auto max-w-4xl space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-semibold tracking-tight">설정</h1>
        <button type="submit" className="btn btn-primary">
          저장
        </button>
      </div>

      {saved !== null ? (
        <p role="status" className="rounded-lg border border-green-200 bg-success-soft px-4 py-3 text-sm text-success">
          {saved > 0 ? `${saved}개 항목이 저장되었습니다. 변경 내역은 감사 로그에 기록되었습니다.` : "변경된 항목이 없습니다."}
        </p>
      ) : null}
      {error ? (
        <p role="alert" className="rounded-lg border border-red-200 bg-danger-soft px-4 py-3 text-sm text-danger">
          {error}
        </p>
      ) : null}

      {GROUPS.map((g) => (
        <section key={g.title} className="overflow-hidden rounded-xl border border-border bg-card">
          <div className="border-b border-border px-5 py-4 sm:px-6">
            <h2 className="text-[15px] font-semibold">{g.title}</h2>
            {g.description ? <p className="mt-1 text-[13px] leading-relaxed text-muted">{g.description}</p> : null}
          </div>
          <div className="grid gap-5 p-5 sm:grid-cols-2 sm:p-6">
            {g.keys.map((key) =>
              BOOLEAN_SETTINGS.includes(key) ? (
                <label
                  key={key}
                  className="flex min-h-11 cursor-pointer items-center gap-2.5 self-end rounded-lg border border-border-strong bg-card px-3 text-sm shadow-xs transition-colors hover:border-zinc-400 hover:bg-subtle"
                >
                  <input type="checkbox" name={key} defaultChecked={s[key] === "1"} />
                  {SETTING_LABELS[key]}
                </label>
              ) : (
                <label
                  key={key}
                  className={`block ${key === "site_description" || key === "footer_notice" || key === "affiliate_print_note" ? "sm:col-span-2" : ""}`}
                >
                  <span className="label">{SETTING_LABELS[key]}</span>
                  {key === "site_description" || key === "footer_notice" ? (
                    <textarea name={key} className="input min-h-16" defaultValue={s[key]} />
                  ) : (
                    <input
                      name={key}
                      className="input"
                      defaultValue={s[key]}
                      type={key === "log_retention_days" ? "number" : key.endsWith("_url") && key !== "site_url" ? "url" : "text"}
                      placeholder={key.endsWith("_url") && key !== "site_url" ? "https://" : undefined}
                      min={key === "log_retention_days" ? 0 : undefined}
                      autoComplete="off"
                    />
                  )}
                </label>
              ),
            )}
          </div>
        </section>
      ))}

      <section className="rounded-xl border border-border bg-subtle px-5 py-4 text-sm sm:px-6">
        <h2 className="text-[15px] font-semibold">서버 환경변수 (파일에서만 변경)</h2>
        <p className="mt-1.5 text-[13px] leading-relaxed text-muted [&_code]:rounded [&_code]:bg-surface [&_code]:px-1 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-xs [&_code]:text-foreground">
          비밀번호와 세션 키는 보안상 <code>.env</code> 파일로만 관리합니다: <code>ADMIN_PASSWORD</code>, <code>SESSION_SECRET</code>,{" "}
          <code>DOMAIN</code>, <code>POSTGRES_PASSWORD</code>(<code>DATABASE_URL</code>). 변경 후 <code>docker compose up -d</code> 로 재시작하세요.
        </p>
      </section>

      <div className="flex justify-end">
        <button type="submit" className="btn btn-primary">
          저장
        </button>
      </div>
    </form>
  );
}
