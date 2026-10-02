import Link from "next/link";
import { AdSlot, type AdSlotConfig } from "@/components/ads/AdSlot";
import { TypeIcon } from "@/components/icons";
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
    <main className="mx-auto w-full max-w-[1400px] px-4 pt-4 pb-16 sm:px-6 sm:pt-5">
      {/* 1. 상단 가로 광고 */}
      <AdSlot config={ads.top} name="상단" shape="horizontal" compact className="mb-5" />

      <div className="flex gap-6 xl:gap-8">
        {/* 2. 왼쪽 세로 광고 (lg 이상) */}
        {sideVisible(ads.left) ? (
          <aside className="hidden w-40 shrink-0 lg:block">
            <div className="sticky top-20">
              <AdSlot config={ads.left} name="왼쪽" shape="vertical" />
            </div>
          </aside>
        ) : null}

        <div className="min-w-0 flex-1">
          <QrGenerator />

          {/*
            Everything below the generator. Ads start here — never beside the generator — so the
            download/copy buttons keep a wide margin from every ad (AdSense accidental-click policy).
          */}
          <div className="mt-12 flex gap-8 border-t border-border pt-12">
            <div className="min-w-0 flex-1">
          {/* 3. 본문 중간 광고 */}
          <AdSlot config={ads.incontent} name="본문 중간" shape="rectangle" />

          <section className="mt-16" aria-labelledby="types-heading">
            <div className="max-w-2xl">
              <h2 id="types-heading" className="section-title">
                지원하는 형식
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-muted">스캔했을 때 어떤 동작이 일어나는지에 따라 형식을 고르세요.</p>
            </div>
            <ul className="mt-6 grid gap-px overflow-hidden rounded-xl border border-border bg-border md:grid-cols-3">
              {QR_TYPES.map((t) => (
                <li key={t} className="flex gap-3 bg-card p-5">
                  <TypeIcon type={t} className="mt-0.5 size-5 shrink-0 text-muted" />
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-foreground">{QR_TYPE_LABELS[t]}</p>
                    <p className="mt-1 text-[13px] leading-relaxed text-muted">{QR_TYPE_DESCRIPTIONS[t]}</p>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          <section className="mt-16 grid gap-6 lg:grid-cols-[minmax(0,240px)_minmax(0,1fr)] lg:gap-12" aria-labelledby="faq-heading">
            <div>
              <h2 id="faq-heading" className="section-title">
                자주 묻는 질문
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                더 자세한 내용은{" "}
                <Link href="/guide" className="link">
                  사용법
                </Link>
                에서 볼 수 있습니다.
              </p>
            </div>
            <dl className="divide-y divide-border border-y border-border">
              <div className="py-5">
                <dt className="text-[15px] font-medium text-foreground">만든 QR 코드는 영구적으로 쓸 수 있나요?</dt>
                <dd className="mt-2 text-sm leading-relaxed text-muted">
                  네. 입력한 내용이 QR 이미지 자체에 담기는 정적 QR이기 때문에 만료되지 않으며, 이 사이트가 없어도 계속 동작합니다.
                </dd>
              </div>
              <div className="py-5">
                <dt className="text-[15px] font-medium text-foreground">인쇄용으로는 어떤 형식이 좋나요?</dt>
                <dd className="mt-2 text-sm leading-relaxed text-muted">
                  SVG는 벡터 형식이라 아무 크기로 확대해도 선명합니다. 웹·메신저용은 PNG를 권장합니다.
                </dd>
              </div>
              <div className="py-5">
                <dt className="text-[15px] font-medium text-foreground">로고를 넣으면 인식이 안 될 수도 있나요?</dt>
                <dd className="mt-2 text-sm leading-relaxed text-muted">
                  로고를 넣으면 복원력이 자동으로 최대(오류 정정 H, 30%)로 올라갑니다. 그래도 인쇄 전에는 여러 기기로 스캔해 확인하세요.
                </dd>
              </div>
              <div className="py-5">
                <dt className="text-[15px] font-medium text-foreground">입력한 내용은 어떻게 처리되나요?</dt>
                <dd className="mt-2 text-sm leading-relaxed text-muted">
                  QR 이미지는 브라우저에서 바로 만들어집니다. 다만 서비스 개선을 위해 QR 코드를 내려받거나 복사할 때 입력 내용과 접속 정보가 서버에 기록될 수
                  있습니다. 자세한 내용은{" "}
                  <Link href="/privacy" className="link">
                    개인정보처리방침
                  </Link>
                  을 참고하세요.
                </dd>
              </div>
            </dl>
          </section>
            </div>

            {/* 4. 오른쪽 세로 광고 (xl 이상) — starts below the generator card */}
            {sideVisible(ads.right) ? (
              <aside className="hidden w-[300px] shrink-0 xl:block">
                <div className="sticky top-20">
                  <AdSlot config={ads.right} name="오른쪽" shape="vertical" />
                </div>
              </aside>
            ) : null}
          </div>
        </div>
      </div>

      {/* 5. 하단 가로 광고 */}
      <AdSlot config={ads.bottom} name="하단" shape="horizontal" className="mt-16" />
    </main>
  );
}
