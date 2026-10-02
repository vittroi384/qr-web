import { getSettings, isOn } from "@/lib/settings";

export const metadata = { title: "개인정보처리방침" };

export default function PrivacyPage() {
  const s = getSettings();
  const logging = isOn(s.logging_enabled);
  const retention = Number.parseInt(s.log_retention_days, 10);

  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6 sm:py-14">
      <header>
        <h1 className="text-[28px] leading-tight font-semibold tracking-tight sm:text-[34px]">개인정보처리방침</h1>
        <p className="mt-3 text-sm text-muted">시행일: 2026년 10월 2일</p>
      </header>
      <div className="mt-10 divide-y divide-border border-y border-border text-[15px] leading-7 text-foreground/90 [&_section]:py-7 [&_section_h2]:text-base [&_section_h2]:font-semibold [&_section_h2]:text-foreground">
        <section>
          <h2>1. 수집하는 정보</h2>
          <p className="mt-2">
            {s.site_name}(이하 &quot;서비스&quot;)는 회원가입을 요구하지 않으며, 다음 정보를 수집할 수 있습니다.
          </p>
          <ul className="mt-2 list-disc space-y-1.5 pl-5 marker:text-zinc-400">
            <li>
              <strong>QR 코드 입력 내용</strong>: 사용자가 QR로 변환하기 위해 입력한 내용(URL, 텍스트, Wi-Fi 이름, 연락처 정보 등)과 선택한 디자인 옵션.
              {logging ? " 현재 이 기록 기능은 사용 중입니다." : " 현재 이 기록 기능은 꺼져 있습니다."}
              {" Wi-Fi 비밀번호는 저장 전에 항상 마스킹 처리되어 원문이 기록되지 않습니다."}
            </li>
            <li>
              <strong>접속 정보</strong>: IP 주소, 브라우저 종류(User-Agent), 유입 경로(Referer), 언어 설정, 접속 시각.
            </li>
          </ul>
        </section>

        <section>
          <h2>2. 수집 목적</h2>
          <ul className="mt-2 list-disc space-y-1.5 pl-5 marker:text-zinc-400">
            <li>서비스 이용 현황 파악 및 기능 개선</li>
            <li>스팸·악성 링크 등 서비스 악용 방지와 보안</li>
            <li>장애 분석</li>
          </ul>
        </section>

        <section>
          <h2>3. 보관 기간</h2>
          <p className="mt-2">
            {retention > 0
              ? `수집된 기록은 ${retention}일 후 자동으로 삭제됩니다.`
              : "수집된 기록은 수집 목적이 달성될 때까지 보관되며, 운영자가 수시로 삭제합니다."}{" "}
            법령에 따라 보존이 필요한 경우 해당 기간 동안 보관할 수 있습니다.
          </p>
        </section>

        <section>
          <h2>4. 제3자 제공 및 광고</h2>
          <p className="mt-2">
            수집된 입력 내용은 제3자에게 판매·제공되지 않습니다. 단, 서비스는 Google AdSense 광고를 게재하며, Google은 광고 제공을 위해 쿠키(DoubleClick
            DART 쿠키 등)를 사용하여 사용자의 이 사이트 및 다른 사이트 방문 정보를 수집할 수 있습니다. 사용자는{" "}
            <a href="https://adssettings.google.com" className="link" target="_blank" rel="noopener noreferrer">
              Google 광고 설정
            </a>
            에서 맞춤 광고를 거부할 수 있습니다.
          </p>
        </section>

        <section>
          <h2>5. 민감한 정보에 대한 안내</h2>
          <p className="mt-2">
            비밀번호, 계좌번호, 주민등록번호 등 민감한 정보는 QR 코드에 담지 않는 것을 권장합니다. QR 코드는 누구나 스캔하여 내용을 읽을 수 있습니다.
          </p>
        </section>

        <section>
          <h2>6. 이용자의 권리</h2>
          <p className="mt-2">이용자는 본인의 기록 삭제를 요청할 수 있습니다. 요청 시 해당 기록을 확인할 수 있는 정보(대략적인 시각, 입력 내용 일부)를 함께 알려 주세요.</p>
        </section>

        <section>
          <h2>7. 문의</h2>
          <p className="mt-2">개인정보 관련 문의는 서비스 운영자에게 연락해 주세요. (운영자 연락처는 관리자 설정의 푸터 문구 또는 이 페이지를 수정하여 안내하세요.)</p>
        </section>

      </div>
    </main>
  );
}
