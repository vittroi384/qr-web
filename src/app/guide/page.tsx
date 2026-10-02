import Link from "next/link";
import { AdSlot, type AdSlotConfig } from "@/components/ads/AdSlot";
import { getSettings, isOn } from "@/lib/settings";

export const metadata = { title: "사용법" };

const STEPS = [
  { title: "1. 종류 선택", body: "URL, 텍스트, Wi-Fi, 연락처, 이메일, 문자, 전화, 위치, 일정 중 만들고 싶은 QR 종류를 고릅니다." },
  { title: "2. 내용 입력", body: "필요한 항목을 채우면 오른쪽에 QR 코드가 실시간으로 그려집니다. 별도의 생성 버튼은 없습니다." },
  { title: "3. 디자인 조정 (선택)", body: "크기, 색상, 여백, 오류 정정 레벨을 바꾸거나 중앙에 로고를 넣을 수 있습니다." },
  { title: "4. 저장", body: "PNG(웹·메신저용) 또는 SVG(인쇄·디자인용)로 내려받거나 클립보드로 복사하세요." },
];

const TIPS = [
  { q: "Wi-Fi QR이 연결되지 않아요", a: "SSID와 비밀번호의 대소문자를 확인하고, 암호화 방식이 공유기 설정(대부분 WPA/WPA2)과 같은지 확인하세요. iOS 11+, Android 10+ 기본 카메라에서 바로 인식됩니다." },
  { q: "연락처 QR을 스캔하면 어떻게 되나요", a: "vCard 3.0 형식이라 iPhone·Android 모두 '연락처에 추가' 화면이 열립니다. 이름 또는 전화번호 중 하나는 꼭 넣어 주세요." },
  { q: "QR이 너무 복잡해 보여요", a: "담는 글자가 많을수록 모듈이 촘촘해집니다. URL은 단축 링크를 쓰고, 텍스트는 줄이고, 오류 정정 레벨을 L이나 M으로 낮추면 단순해집니다." },
  { q: "인쇄할 때 최소 크기는요", a: "일반적으로 2cm × 2cm 이상, 스캔 거리의 1/10 정도를 권장합니다. 전경색과 배경색의 대비가 충분한지(어두운 코드, 밝은 배경) 확인하세요." },
  { q: "만든 QR에 유효기간이 있나요", a: "없습니다. 입력한 내용이 이미지 안에 그대로 들어가는 정적 QR이므로 영구적으로 동작합니다. 단, 내용은 나중에 바꿀 수 없으니 저장 전에 꼭 테스트하세요." },
];

export default function GuidePage() {
  const s = getSettings();
  const ad: AdSlotConfig = {
    client: s.adsense_client,
    slotId: s.ad_slot_incontent,
    enabled: isOn(s.ads_enabled),
    showPlaceholder: isOn(s.ad_placeholders) || process.env.NODE_ENV !== "production",
  };

  return (
    <main className="mx-auto max-w-3xl space-y-8 px-4 py-8">
      <header>
        <h1 className="text-2xl font-bold">QR 코드 만들기 사용법</h1>
        <p className="mt-2 text-sm text-muted">1분이면 충분합니다. 가입도, 설치도 필요 없습니다.</p>
      </header>

      <section className="grid gap-3 sm:grid-cols-2">
        {STEPS.map((st) => (
          <div key={st.title} className="card">
            <h2 className="font-semibold">{st.title}</h2>
            <p className="mt-1 text-sm text-muted">{st.body}</p>
          </div>
        ))}
      </section>

      <AdSlot config={ad} name="본문 중간" shape="rectangle" />

      <section className="card">
        <h2 className="text-lg font-semibold">자주 묻는 질문과 팁</h2>
        <dl className="mt-4 space-y-4 text-sm">
          {TIPS.map((t) => (
            <div key={t.q}>
              <dt className="font-medium">{t.q}</dt>
              <dd className="mt-1 text-muted">{t.a}</dd>
            </div>
          ))}
        </dl>
      </section>

      <p className="text-center">
        <Link href="/" className="btn btn-primary">
          지금 QR 만들기 →
        </Link>
      </p>
    </main>
  );
}
