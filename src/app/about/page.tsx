import Link from "next/link";
import { ArrowRightIcon } from "@/components/icons";
import { getSettings } from "@/lib/settings";

export const metadata = { title: "소개" };

const FACTS = [
  { title: "브라우저에서 생성", body: "QR 이미지는 서버가 아닌 사용자의 브라우저에서 바로 만들어집니다." },
  { title: "만료 없음", body: "내용이 이미지에 직접 담기는 정적 QR이라 영구적으로 동작합니다." },
  { title: "무료", body: "회원가입이나 결제가 필요 없습니다. 운영 비용은 광고로 충당합니다." },
];

export default function AboutPage() {
  const s = getSettings();
  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6 sm:py-14">
      <header>
        <h1 className="text-[28px] leading-tight font-semibold tracking-tight sm:text-[34px]">{s.site_name} 소개</h1>
        <p className="mt-3 text-[15px] leading-relaxed text-muted">일상에서 자주 쓰는 정보를 QR 코드로 바꾸는 무료 도구입니다.</p>
      </header>

      <dl className="mt-10 grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-3">
        {FACTS.map((f) => (
          <div key={f.title} className="bg-card p-5">
            <dt className="text-sm font-semibold">{f.title}</dt>
            <dd className="mt-1.5 text-[13px] leading-relaxed text-muted">{f.body}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-10 space-y-5 text-[15px] leading-7 text-foreground/90">
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
          <Link href="/privacy" className="link">
            개인정보처리방침
          </Link>
          에서 확인할 수 있습니다.
        </p>
        <p className="border-t border-border pt-5 text-sm text-muted">문의: 사이트 하단의 개인정보처리방침 페이지에 안내된 연락처를 이용해 주세요.</p>
      </div>

      <Link href="/" className="btn btn-primary mt-10">
        QR 코드 만들기
        <ArrowRightIcon />
      </Link>
    </main>
  );
}
