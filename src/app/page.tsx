import Link from "next/link";
import { AdSlot, type AdSlotConfig } from "@/components/ads/AdSlot";
import { QrGenerator } from "@/components/qr/QrGenerator";
import { QR_TYPE_DESCRIPTIONS, QR_TYPE_LABELS, QR_TYPES } from "@/lib/qr/types";
import { getSettings, isOn } from "@/lib/settings";

function adConfig(slotId: string): AdSlotConfig {
  const s = getSettings();
  return {
    client: s.adsense_client,
    slotId,
    enabled: isOn(s.ads_enabled),
    showPlaceholder: isOn(s.ad_placeholders) || process.env.NODE_ENV !== "production",
  };
}

export default function HomePage() {
  const s = getSettings();
  const ads = {
    top: adConfig(s.ad_slot_top),
    left: adConfig(s.ad_slot_left),
    right: adConfig(s.ad_slot_right),
    bottom: adConfig(s.ad_slot_bottom),
    incontent: adConfig(s.ad_slot_incontent),
  };
  const sideVisible = (c: AdSlotConfig) => (c.enabled && c.client && c.slotId) || c.showPlaceholder;

  return (
    <main className="mx-auto max-w-7xl px-4 py-6">
      {/* 1. 상단 가로 광고 */}
      <AdSlot config={ads.top} name="상단" shape="horizontal" className="mb-6" />

      <div className="flex gap-6">
        {/* 2. 왼쪽 세로 광고 (lg 이상) */}
        {sideVisible(ads.left) ? (
          <aside className="hidden w-40 shrink-0 lg:block">
            <div className="sticky top-6">
              <AdSlot config={ads.left} name="왼쪽" shape="vertical" />
            </div>
          </aside>
        ) : null}

        <div className="min-w-0 flex-1 space-y-8">
          <QrGenerator />

          {/* 3. 본문 중간 광고 */}
          <AdSlot config={ads.incontent} name="본문 중간" shape="rectangle" />

          <section className="card" aria-labelledby="types-heading">
            <h2 id="types-heading" className="text-lg font-semibold">
              이런 것들을 QR 코드로 만들 수 있어요
            </h2>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {QR_TYPES.map((t) => (
                <li key={t} className="rounded-xl border border-border p-3">
                  <p className="font-medium">{QR_TYPE_LABELS[t]}</p>
                  <p className="mt-1 text-xs text-muted">{QR_TYPE_DESCRIPTIONS[t]}</p>
                </li>
              ))}
            </ul>
          </section>

          <section className="card" aria-labelledby="faq-heading">
            <h2 id="faq-heading" className="text-lg font-semibold">
              자주 묻는 질문
            </h2>
            <dl className="mt-4 space-y-4 text-sm">
              <div>
                <dt className="font-medium">만든 QR 코드는 영구적으로 쓸 수 있나요?</dt>
                <dd className="mt-1 text-muted">
                  네. 입력한 내용이 QR 이미지 자체에 담기는 정적 QR이기 때문에 만료되지 않으며, 이 사이트가 없어도 계속 동작합니다.
                </dd>
              </div>
              <div>
                <dt className="font-medium">인쇄용으로는 어떤 형식이 좋나요?</dt>
                <dd className="mt-1 text-muted">SVG는 벡터 형식이라 아무 크기로 확대해도 선명합니다. 웹·메신저용은 PNG를 권장합니다.</dd>
              </div>
              <div>
                <dt className="font-medium">로고를 넣으면 인식이 안 될 수도 있나요?</dt>
                <dd className="mt-1 text-muted">
                  로고를 넣으면 오류 정정 레벨이 자동으로 H(30%)로 올라갑니다. 그래도 인쇄 전에 반드시 여러 기기로 스캔 테스트를 해 보세요.
                </dd>
              </div>
              <div>
                <dt className="font-medium">입력한 내용은 어떻게 처리되나요?</dt>
                <dd className="mt-1 text-muted">
                  QR 이미지는 브라우저에서 바로 만들어집니다. 다만 서비스 개선을 위해 입력 내용과 접속 정보가 서버에 기록될 수 있습니다. 자세한 내용은{" "}
                  <Link href="/privacy" className="underline">
                    개인정보처리방침
                  </Link>
                  을 참고하세요.
                </dd>
              </div>
            </dl>
          </section>
        </div>

        {/* 4. 오른쪽 세로 광고 (xl 이상) */}
        {sideVisible(ads.right) ? (
          <aside className="hidden w-[300px] shrink-0 xl:block">
            <div className="sticky top-6">
              <AdSlot config={ads.right} name="오른쪽" shape="vertical" />
            </div>
          </aside>
        ) : null}
      </div>

      {/* 5. 하단 가로 광고 */}
      <AdSlot config={ads.bottom} name="하단" shape="horizontal" className="mt-8" />
    </main>
  );
}
