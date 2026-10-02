import Link from "next/link";
import { getSettings } from "@/lib/settings";

export const metadata = { title: "소개" };

export default function AboutPage() {
  const s = getSettings();
  return (
    <main className="mx-auto max-w-3xl space-y-6 px-4 py-8">
      <h1 className="text-2xl font-bold">{s.site_name} 소개</h1>
      <div className="card space-y-4 text-sm leading-relaxed">
        <p>
          {s.site_name}는 URL, 텍스트, Wi-Fi 접속 정보, 연락처, 이메일, 문자, 전화번호, 위치, 일정 등 일상에서 자주 쓰는 정보를 누구나 쉽게 QR 코드로 바꿀 수
          있도록 만든 무료 도구입니다.
        </p>
        <p>
          QR 이미지는 서버가 아닌 사용자의 브라우저 안에서 바로 생성되므로 빠르고, 만들어진 QR은 만료 없이 영구적으로 동작합니다. 회원가입이나 결제는 필요하지
          않으며, 운영 비용은 페이지에 표시되는 광고로 충당합니다.
        </p>
        <p>
          서비스 품질 개선과 악용 방지를 위해 입력 내용과 접속 정보가 서버에 기록될 수 있습니다. 자세한 내용은{" "}
          <Link href="/privacy" className="underline">
            개인정보처리방침
          </Link>
          에서 확인할 수 있습니다.
        </p>
        <p className="text-muted">문의: 사이트 하단의 개인정보처리방침 페이지에 안내된 연락처를 이용해 주세요.</p>
      </div>
    </main>
  );
}
