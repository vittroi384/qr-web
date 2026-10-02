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
    title: "방문자 입력 기록",
    description: "방문자가 QR로 만든 내용과 접속 정보를 서버 DB에 저장할지 결정합니다.",
    keys: ["logging_enabled", "mask_wifi_password", "log_retention_days"],
  },
];

const ERROR_MESSAGES: Record<string, string> = {
  site_url: "사이트 URL 형식이 올바르지 않습니다. 예: https://example.com",
  adsense_client: "AdSense 게시자 ID 형식이 올바르지 않습니다. 예: ca-pub-1234567890123456",
};

export default async function SettingsPage({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const sp = await searchParams;
  const s = getSettings();
  const saved = typeof sp.saved === "string" ? Number.parseInt(sp.saved, 10) : null;
  const error = typeof sp.error === "string" ? ERROR_MESSAGES[sp.error] : null;

  return (
    <form action={saveSettingsAction} className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-xl font-semibold">설정</h1>
        <button type="submit" className="btn btn-primary">
          저장
        </button>
      </div>

      {saved !== null ? (
        <p className="rounded-lg border border-green-500/40 bg-green-500/10 px-3 py-2 text-sm">
          {saved > 0 ? `${saved}개 항목이 저장되었습니다. 변경 내역은 감사 로그에 기록되었습니다.` : "변경된 항목이 없습니다."}
        </p>
      ) : null}
      {error ? <p className="rounded-lg border border-red-500/40 bg-red-500/10 px-3 py-2 text-sm">{error}</p> : null}

      {GROUPS.map((g) => (
        <section key={g.title} className="card space-y-4">
          <div>
            <h2 className="font-semibold">{g.title}</h2>
            {g.description ? <p className="mt-1 text-xs text-muted">{g.description}</p> : null}
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {g.keys.map((key) =>
              BOOLEAN_SETTINGS.includes(key) ? (
                <label key={key} className="flex items-center gap-2 text-sm">
                  <input type="checkbox" name={key} defaultChecked={s[key] === "1"} />
                  {SETTING_LABELS[key]}
                </label>
              ) : (
                <label key={key} className={`block ${key === "site_description" || key === "footer_notice" ? "sm:col-span-2" : ""}`}>
                  <span className="label">{SETTING_LABELS[key]}</span>
                  {key === "site_description" || key === "footer_notice" ? (
                    <textarea name={key} className="input min-h-16" defaultValue={s[key]} />
                  ) : (
                    <input
                      name={key}
                      className="input"
                      defaultValue={s[key]}
                      type={key === "log_retention_days" ? "number" : "text"}
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

      <section className="card space-y-2 text-sm">
        <h2 className="font-semibold">서버 환경변수 (파일에서만 변경)</h2>
        <p className="text-xs text-muted">
          비밀번호와 세션 키는 보안상 <code>.env</code> 파일로만 관리합니다: <code>ADMIN_PASSWORD</code>, <code>SESSION_SECRET</code>,{" "}
          <code>DOMAIN</code>, <code>DATABASE_PATH</code>. 변경 후 <code>docker compose up -d</code> 로 재시작하세요.
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
