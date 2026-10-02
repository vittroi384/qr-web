# QR-Web — 만능 QR 생성기 + 입력 기록 + 광고 슬롯 (오라클 서버 배포)

## Context

빈 저장소(`C:\dev\QR-Web-jjook924`)에서 새로 시작하는 프로젝트. 목표:

1. **"모든 것"을 QR로 변환**하는 공개 웹페이지 (URL, 텍스트, Wi-Fi, 연락처(vCard), 이메일, SMS, 전화, 위치, 일정 등). 방문자 로그인 없음.
2. 페이지는 정적처럼 동작하지만, **방문자가 입력한 값 + 누가(IP/UA)/언제**를 내 SQLite DB에 기록 → 관리자(나 1명)만 보는 `/admin`에서 조회·검색·CSV 내보내기.
3. 관리자 페이지에서 **사이트 URL, 사이트명, AdSense ID, 광고 슬롯 on/off, 기록 on/off** 등을 재배포 없이 변경. 관리자 변경 내역도 별도 감사로그로 저장.
4. **Google AdSense 광고 자리 5곳**(팝업 없음, 콘텐츠 주변 배치, 최소 3개 요구 충족).
5. **Docker Compose + Caddy(자동 HTTPS)**로 개인 오라클 클라우드 서버에 배포. `git pull && docker compose up -d --build` 한 줄 배포.

스택: **Next.js 15 (App Router, TypeScript) + Tailwind CSS + better-sqlite3 + `qrcode` 패키지 + Docker/Caddy**.

---

## 1. 프로젝트 구조

```
QR-Web-jjook924/
├─ src/
│  ├─ app/
│  │  ├─ layout.tsx               # 공통 레이아웃, 헤더/푸터, AdSense 스크립트(next/script)
│  │  ├─ page.tsx                 # 메인 QR 생성기 (광고 레이아웃 포함)
│  │  ├─ about/page.tsx
│  │  ├─ privacy/page.tsx         # 개인정보처리방침 — "입력값이 서버에 저장됨" 명시 (AdSense 필수)
│  │  ├─ ads.txt/route.ts         # settings의 pub ID로 ads.txt 동적 생성
│  │  ├─ robots.ts, sitemap.ts    # settings.siteUrl 사용
│  │  ├─ api/
│  │  │  ├─ log/route.ts          # POST: 방문자 QR 생성 기록 (rate limit)
│  │  │  └─ admin/
│  │  │     ├─ login/route.ts     # POST 비밀번호 → 세션 쿠키
│  │  │     ├─ logout/route.ts
│  │  │     └─ logs/export/route.ts   # CSV 다운로드
│  │  └─ admin/
│  │     ├─ layout.tsx            # 세션 확인, 미인증 → /admin/login
│  │     ├─ login/page.tsx
│  │     ├─ page.tsx              # 대시보드 (오늘/7일/전체 건수, 종류별 비율)
│  │     ├─ logs/page.tsx         # 기록 테이블: 종류/기간/검색/페이지네이션, 상세 보기
│  │     ├─ settings/page.tsx     # 사이트/광고/기록 설정 (Server Action으로 저장)
│  │     └─ audit/page.tsx        # 관리자 변경 감사로그
│  ├─ components/
│  │  ├─ qr/
│  │  │  ├─ QrGenerator.tsx       # 상태 관리 + 탭 + 폼 + 미리보기 묶음 (client)
│  │  │  ├─ TypeTabs.tsx
│  │  │  ├─ forms/ UrlForm, TextForm, WifiForm, VCardForm, EmailForm, SmsForm, PhoneForm, GeoForm, EventForm
│  │  │  ├─ StyleOptions.tsx      # 크기, 전경/배경색, 오류정정 레벨, 여백, 중앙 로고(선택)
│  │  │  └─ QrPreview.tsx         # canvas 렌더 + PNG/SVG 다운로드 + 복사
│  │  ├─ ads/
│  │  │  ├─ AdSenseScript.tsx     # client ID 있을 때만 adsbygoogle.js 1회 로드
│  │  │  └─ AdSlot.tsx            # <ins class="adsbygoogle"> / 미설정 시 점선 placeholder(dev)
│  │  └─ admin/ LogsTable, SettingsForm, StatCards 등
│  ├─ lib/
│  │  ├─ db.ts                    # better-sqlite3 open(WAL) + schema.sql 적용 (idempotent)
│  │  ├─ schema.sql
│  │  ├─ settings.ts              # getSettings()/setSettings() + 30초 메모리 캐시, 기본값
│  │  ├─ auth.ts                  # 비밀번호 timingSafeEqual, jose HS256 세션 쿠키(httpOnly, 7일)
│  │  ├─ rateLimit.ts             # IP별 인메모리 토큰버킷 (예: 30회/분)
│  │  ├─ ip.ts                    # X-Forwarded-For(Caddy) → 클라이언트 IP
│  │  └─ qr/
│  │     ├─ types.ts              # QrType 유니온 + 각 타입 payload 인터페이스
│  │     ├─ encoders.ts           # payload → QR 문자열 (WIFI:, MATMSG/mailto:, SMSTO:, tel:, geo:, BEGIN:VCARD, BEGIN:VEVENT)
│  │     └─ sanitize.ts           # 기록 저장용 마스킹 (Wi-Fi 비밀번호 등)
│  └─ middleware.ts               # /admin/* 세션 쿠키 검사 (login 제외)
├─ data/                          # SQLite 파일 (gitignore, Docker volume)
├─ Dockerfile                     # multi-stage, output:'standalone', node:22-bookworm-slim (arm64 OK)
├─ docker-compose.yml             # app + caddy, ./data 와 caddy_data 볼륨
├─ Caddyfile                      # {$DOMAIN} reverse_proxy app:3000, 자동 HTTPS
├─ deploy.sh                      # git pull && docker compose up -d --build
├─ .env.example                   # ADMIN_PASSWORD, SESSION_SECRET, DOMAIN, DATABASE_PATH
└─ README.md                      # 로컬 실행 + 오라클 서버 배포 절차
```

## 2. DB 스키마 (`src/lib/schema.sql`)

```sql
CREATE TABLE IF NOT EXISTS qr_logs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  qr_type TEXT NOT NULL,            -- url|text|wifi|vcard|email|sms|phone|geo|event
  event TEXT NOT NULL,              -- generate|download_png|download_svg|copy
  payload_json TEXT NOT NULL,       -- 사용자 입력 (마스킹 적용 후)
  encoded_preview TEXT,             -- 최종 QR 문자열 앞 200자
  options_json TEXT,                -- 색상/크기/ECC
  ip TEXT, user_agent TEXT, referer TEXT, accept_language TEXT
);
CREATE INDEX IF NOT EXISTS idx_qr_logs_created ON qr_logs(created_at);
CREATE INDEX IF NOT EXISTS idx_qr_logs_type ON qr_logs(qr_type);

CREATE TABLE IF NOT EXISTS settings (key TEXT PRIMARY KEY, value TEXT NOT NULL, updated_at TEXT NOT NULL);

CREATE TABLE IF NOT EXISTS admin_audit (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  action TEXT NOT NULL,             -- login|login_failed|settings_update|logs_export|logs_delete
  key TEXT, old_value TEXT, new_value TEXT, ip TEXT, user_agent TEXT
);
```

settings 키 (기본값 포함): `site_name`, `site_url`, `site_description`, `adsense_client` (ca-pub-xxxx), `ad_slot_top/left/right/bottom/incontent` (슬롯 ID, 빈 값이면 미표시), `ads_enabled`, `logging_enabled`, `mask_wifi_password`, `log_retention_days`(0=무제한), `footer_notice`.

## 3. 핵심 동작

### 3.1 QR 생성 (클라이언트)
- `qrcode` 패키지로 브라우저에서 즉시 렌더(canvas) → 서버 부하 없음, 입력 중 실시간 미리보기.
- `encoders.ts`가 타입별 표준 포맷 생성. Wi-Fi 특수문자 이스케이프(`\;`, `\,`, `\:`), vCard 3.0, VEVENT는 UTC 시각.
- 스타일: 크기(128~1024), 색상, ECC(L/M/Q/H), 여백, 중앙 로고 업로드(로고 사용 시 ECC H 강제).
- 다운로드 PNG/SVG, 클립보드 복사.

### 3.2 입력 기록 (방문자 → 내 DB)
- 미리보기는 실시간(브라우저 렌더)이며 입력 중에는 서버로 전송하지 않음. **PNG/SVG 다운로드 또는 복사 클릭 시에만** `POST /api/log` (event=`download_png`/`download_svg`/`copy`). (소유자 결정: 2026-10-02 — 입력 중 자동 기록 및 generate 이벤트 폐기)
- 서버: `logging_enabled` 확인 → rate limit → body 크기 제한(16KB) → `sanitize.ts`로 Wi-Fi 비밀번호를 항상 고정 `****`로 마스킹(클라이언트에서도 전송 전 마스킹) → insert. IP는 `X-Real-IP`(Caddy가 덮어씀) 우선, 없으면 `X-Forwarded-For` 마지막 홉.
- 실패해도 사용자 경험에 영향 없음(fire-and-forget, `navigator.sendBeacon` 폴백).
- `log_retention_days` > 0이면 insert 시 1/100 확률 + 관리자 대시보드 진입 시 오래된 행 정리(크론 불필요). 감사 로그는 365일 보관.
- `/privacy` 페이지와 푸터에 "입력 내용은 서비스 개선을 위해 서버에 저장됩니다" 고지.

### 3.3 관리자
- `/admin/login`: `ADMIN_PASSWORD`(env)와 timingSafeEqual 비교 → jose JWT를 httpOnly 쿠키로. 실패도 `admin_audit`에 기록, 5회 실패/10분 잠금(인메모리).
- `/admin` 대시보드: 오늘/7일/30일/전체 건수, 종류별 건수, 최근 20건.
- `/admin/logs`: 종류·기간·텍스트(payload LIKE) 필터, 50건 페이지네이션, 행 클릭 시 payload 전체 JSON, 선택 삭제, **CSV 내보내기**(`/api/admin/logs/export?…`).
- `/admin/settings`: Server Action으로 settings 저장 → 변경 전/후 값을 `admin_audit`에 기록, 캐시 무효화. 광고 자리 점선 표시(전체 on/off, 레이아웃 확인용) 포함.
- `/admin/audit`: 감사로그 목록.
- `middleware.ts`에서 `/admin/*` 보호.

### 3.4 광고 레이아웃 (팝업 없음, 5슬롯)
```
┌──────────────── [top: 728x90 / 반응형 가로] ────────────────┐
│ [left 160x600]  │   QR 생성기 (탭+폼+미리보기)   │ [right 300x600] │
│   (lg 이상)     │   [incontent: 반응형 사각형]    │    (xl 이상)    │
│                 │   종류 소개/FAQ 콘텍스트 콘텐츠 │                 │
└──────────────── [bottom: 반응형 가로] ─────────────────────┘
```
- 모바일: top / incontent / bottom 3개만 노출 (사이드바 숨김) → 최소 3개 보장.
- `AdSlot`: `adsense_client`와 슬롯 ID 둘 다 있고 `ads_enabled`일 때만 `<ins class="adsbygoogle" data-ad-client data-ad-slot data-ad-format="auto" data-full-width-responsive="true">` 렌더 + `(adsbygoogle=window.adsbygoogle||[]).push({})`. 개발 모드에서는 점선 박스에 슬롯 이름 표시.
- `ads.txt`, `robots`, `sitemap`, 메타태그(OG)는 settings에서 동적 생성.

## 4. 배포 (오라클 클라우드)

- **Dockerfile**: `deps`(npm ci, better-sqlite3 네이티브 빌드용 python3/make/g++ 포함) → `build`(`next build`, `output:'standalone'`) → `runner`(node:22-bookworm-slim, non-root, `/app/data` 볼륨). ARM(Ampere A1) / x86 모두 동작.
- **docker-compose.yml**: `app`(env_file .env, volume `./data:/app/data`, restart always) + `caddy`(80/443, `Caddyfile`, `caddy_data`/`caddy_config` 볼륨).
- **Caddyfile**: `{$DOMAIN} { encode gzip; reverse_proxy app:3000 }` — 도메인 없을 때 `:80` 로 IP 접속 가능하게 분기 설명을 README에.
- **deploy.sh**: `git pull && docker compose up -d --build && docker image prune -f`.
- **README 배포 절차**: ① 오라클 VCN 보안목록에 80/443 인그레스 추가 ② Ubuntu 인스턴스 iptables 규칙 열기(`iptables -I INPUT -p tcp --dport 80/443 -j ACCEPT` + `netfilter-persistent save`) ③ Docker 설치 ④ `git clone`, `.env` 작성(`openssl rand -hex 32`로 SESSION_SECRET) ⑤ `./deploy.sh` ⑥ 백업: `sqlite3 data/qr.db ".backup data/backup-$(date +%F).db"` 크론 예시.
- `.env.example`: `DOMAIN=`, `ADMIN_PASSWORD=`, `SESSION_SECRET=`, `DATABASE_PATH=/app/data/qr.db`, `NODE_ENV=production`.

## 5. 구현 순서

1. `create-next-app`(TS, Tailwind, App Router, src/) + 의존성(`qrcode`, `better-sqlite3`, `jose`) + `.gitignore`에 `data/`, `.env`.
2. `lib/db.ts`, `schema.sql`, `settings.ts`(기본값) — 앱 시작 시 테이블 생성.
3. `lib/qr/types.ts`, `encoders.ts`(+ 단위 테스트 몇 개: Wi-Fi 이스케이프, vCard, VEVENT), `sanitize.ts`.
4. QR 생성기 UI: 탭, 9개 폼, 스타일 옵션, 미리보기/다운로드. 한국어 UI.
5. `/api/log` + 클라이언트 디바운스 전송 + rate limit.
6. 광고: `AdSenseScript`, `AdSlot`, 메인 페이지 5슬롯 레이아웃, `ads.txt`.
7. 관리자: auth/middleware → 로그인 → 대시보드 → 로그 테이블/CSV → 설정(감사로그 포함) → 감사로그 페이지.
8. 콘텐츠 페이지(about/privacy — 사용법 페이지는 소유자 결정으로 제거), robots/sitemap/OG 메타.
9. Dockerfile, compose, Caddyfile, deploy.sh, .env.example, README.
10. 첫 커밋.

## 6. 검증

- `npm run dev` → 9개 타입 각각 QR 생성 후 **휴대폰 카메라로 스캔**해 Wi-Fi 접속/연락처 추가/이메일 앱 열림 확인.
- 입력만 했을 때는 `/admin/logs`에 기록이 없고, PNG 다운로드 시 `download_png` 1건이 기록되며 Wi-Fi 비밀번호가 `****`로 저장되는지 확인.
- `/admin/settings`에서 사이트명·AdSense ID 변경 → 새로고침 시 반영, `/ads.txt` 내용 변경, `/admin/audit`에 전/후 값 기록.
- 잘못된 비밀번호 5회 → 잠금 + audit `login_failed`.
- `ads_enabled` on + 더미 슬롯 ID → `<ins class="adsbygoogle">` 5개 DOM 존재(데스크톱), 모바일 뷰포트에서 3개.
- `curl -X POST /api/log` 40회 연속 → 429 발생.
- `docker compose up --build` 로컬에서 기동 → `http://localhost` 접속, 컨테이너 재시작 후 `data/qr.db` 데이터 유지.
- 서버 배포 후 `https://<DOMAIN>` 인증서 자동 발급, 관리자 로그에 실제 공인 IP 표시(X-Forwarded-For 처리 확인).
