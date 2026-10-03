# QR Maker — 무엇이든 QR 코드로 바꾸는 무료 생성기

![Next.js](https://img.shields.io/badge/Next.js-16-000000?logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4-06B6D4?logo=tailwindcss&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-4169E1?logo=postgresql&logoColor=white)
![Drizzle ORM](https://img.shields.io/badge/Drizzle-ORM-C5F74F?logo=drizzle&logoColor=black)
![Docker](https://img.shields.io/badge/Docker-Compose%20%2B%20Caddy-2496ED?logo=docker&logoColor=white)
![Oracle Cloud](https://img.shields.io/badge/Oracle%20Cloud-Ampere%20A1-F80000?logo=oracle&logoColor=white)

URL·SNS·WhatsApp·Wi-Fi·연락처·결제 링크 등 **14종 정보를 QR 코드로** 만드는 공개 웹서비스입니다.
QR은 브라우저에서 생성되는 **정적 코드**라 만료되지 않고 서버에 종속되지 않습니다(경쟁 서비스의 "동적 QR + 구독" 모델을 의도적으로 배제).
해외 사용자가 주 타깃이라 **영어가 기본**(`/`)이고 한국어·스페인어·포르투갈어·독일어·프랑스어·일본어·힌디어·인도네시아어는 `/ko` `/es` `/pt` `/de` `/fr` `/ja` `/hi` `/id` 아래에 **9개 언어**로 제공합니다. 수익은 AdSense 광고 6슬롯, 유입은 언어별 SEO 랜딩 페이지 171개(19종 × 9개 언어). 방문자가 저장한 QR 내용은 운영자 전용 관리자에서 확인합니다.

## 스크린샷

> 광고 자리는 개발 모드의 점선 placeholder입니다.

**메인** — 14종 타입 선택, 실시간 미리보기, 크기·여백·꾸미기, 광고 레이아웃(최대 6슬롯)

![메인](assets/main.png)

**타입별 랜딩** — 검색어에 맞춘 제목 + 타입이 미리 선택된 생성기 (`/wifi-qr-code`)

![타입별 랜딩](assets/landing.png)

**일괄 생성** — 표 편집기, 엑셀 붙여 넣기, PNG ZIP (의존성 없는 ZIP 작성기)

![일괄 생성](assets/batch.png)

<p align="center"><img src="assets/mobile.png" width="320" alt="모바일(한국어) — 390px, 광고 3슬롯"></p>

**모바일(한국어)** — 390px 단일 열, 광고 3슬롯

## 주요 기능

- **QR 14종**: URL · SNS/앱 링크(28개 플랫폼 프리셋, 링크 붙여 넣기 자동 인식) · WhatsApp · 텍스트 · Wi-Fi · 연락처(vCard 3.0) · 이메일 · SMS · 전화 · 위치 · 일정(iCalendar) · 결제 링크(PayPal/Venmo/Cash App… 금액 사전 입력) · 암호화폐(BIP-21/EIP-681) · PDF/파일 링크
- **출력**: PNG(256~2048px, 모듈 단위 정수 스케일 보정으로 픽셀 정확) · SVG · 클립보드 복사 · **인쇄용 A4 안내판**(제목/부제 편집 → 브라우저 인쇄/PDF)
- **꾸미기**: 색 프리셋 8종 + 직접 선택, 배경(흰색/연회색/아이보리/투명), 복원력, 중앙 로고(자동 ECC H), 대비 경고
- **일괄 생성**: 표 편집기 + 엑셀 2열 붙여 넣기, 줄별 링크/텍스트 자동 판별, 최대 200개 → `001-이름.png` ZIP + `index.csv`
- **i18n/SEO**: 경로 기반 9개 언어(hreflang, sitemap 207 URL), 타입별 랜딩 14종 + 사용 사례 5종 × 9개 언어(언어별로 새로 쓴 본문 400~600단어, `FAQPage`·`SoftwareApplication` JSON-LD)
- **광고**: AdSense 슬롯 6곳(상단·좌·우·하단·본문 중간·글 사이 인아티클; 일괄·소개 페이지도 포함), 팝업/오버레이 없음, 다운로드 버튼과 거리 확보, `/ads.txt` 자동
- **방문자 기록**: PNG/SVG/복사/인쇄/일괄 저장 시에만 종류·내용·IP·브라우저 기록(입력 중 전송 없음). Wi-Fi 비밀번호는 저장 전 항상 `****`. IP당 분당 30회 제한, 보관 90일 자동 정리
- **관리자**: 대시보드(KST 집계), 통계(언어·페이지·종류별 저장, 시간대, 선택→미리보기→저장 퍼널 — 개인 정보 없는 카운터), 기록 검색·삭제·CSV(BOM, 수식 주입 차단), 설정(사이트 URL·AdSense ID·슬롯 ID — 재배포 없이 변경), 감사 로그(변경 전/후 값)

## 관리자 3중 잠금

| 계층 | 동작 | 설정 |
|---|---|---|
| 비밀 입구 URL | 입구를 거치지 않은 브라우저에는 `/admin`이 404 | `ADMIN_PATH` |
| 비밀번호 + OTP | 인증 앱 6자리 코드, 5회 실패 시 10분 잠금 | `ADMIN_PASSWORD`, `ADMIN_TOTP_SECRET` |
| IP 허용 목록(선택) | 지정 IP/CIDR 외에는 입구 URL도 404 | `ADMIN_ALLOWED_IPS` |

- **비밀 입구 URL**: `/admin`은 누구에게나 **일반 404와 동일한 응답**입니다. `https://<도메인>/<ADMIN_PATH>`를 먼저 열면 30일 게이트 쿠키가 생기고, 그 브라우저에서만 `/admin`이 열립니다.
- **OTP**: Google Authenticator 등 인증 앱용 RFC 6238을 직접 구현(재사용 차단). 비밀키는 `npm run totp-setup`으로 생성하며, 실패할 때마다 응답을 지연합니다.

세션 쿠키는 HTTPS에서 `__Host-` 접두 + `SameSite=Strict` + 브라우저 지문 바인딩, 24시간 만료. 관리자 응답 `noindex`/`no-store`, robots.txt에 관리자 경로 미노출. `X-Real-IP`는 Caddy가 덮어쓰며 앱 포트는 외부에 publish하지 않습니다.

## 아키텍처 (오라클 클라우드 배포 구성)

```
방문자 ──HTTPS──▶ Caddy (자동 TLS, 보안 헤더, 64KB 본문 캡)
                    │
                    ▼
                 Next.js 16 standalone (Node, non-root)
                    │  Drizzle ORM + postgres.js (풀 10)
                    │  시작 시 scripts/migrate.mjs → drizzle/*.sql 적용
                    ▼
                 PostgreSQL 16 (포트 미공개, 볼륨 pgdata, DB qr + umami)

/umami/script.js·/umami/api/send ──▶ Caddy ──▶ Umami (방문 분석, 전용 role·umami DB)
관리자 PC ──SSH 터널──▶ 127.0.0.1:3001 Umami 대시보드 (외부 미공개)

OCI A1 · Docker Compose (db → app·umami → caddy, db healthcheck 후 기동)
배포: git pull && docker compose up -d --build (deploy.sh) · 백업: scripts/backup.sh (pg_dump)
```

- **단일 서버 + PostgreSQL 컨테이너**: 운영 비용 0원(무료 티어). DB 포트는 외부에 열지 않고 compose 네트워크 안에서만 접근
- **스키마는 코드, 변경은 마이그레이션**: `src/lib/db/schema.ts`(Drizzle) → `npm run db:generate`로 SQL 생성·커밋 → 컨테이너 시작 시 자동 적용. 테이블 관계는 [`docs/데이터-구조.md`](docs/데이터-구조.md)
- **시간은 `timestamptz`, 표시는 KST**: 날짜 필터·오늘·14일 추이는 KST 달력일 기준(`AT TIME ZONE 'Asia/Seoul'`)
- **설정은 DB, 비밀은 .env**: 사이트명·URL·광고 ID는 관리자 화면, 비밀번호·키·입구 경로·DB 비밀번호는 환경변수
- **QR 인코더는 순수 함수**: `src/lib/qr/encoders.ts` — Wi-Fi 이스케이프, vCard, VEVENT(UTC/종일 DTEND 미포함), wa.me, BIP-21 등 `node:test`로 고정(인코더·입력 검증·마스킹 테스트)

## 흐름도

**방문자가 QR을 만드는 흐름** — 입력은 브라우저 안에서만 처리되고, 저장할 때만 서버에 1건 기록됩니다.

```mermaid
sequenceDiagram
  participant U as 방문자
  participant P as 페이지(브라우저)
  participant S as 서버 /api/log
  participant DB as PostgreSQL
  U->>P: 종류 선택 → 내용 입력
  P->>P: 즉시 QR 렌더 (서버 호출 없음)
  U->>P: PNG 저장 / SVG / 복사 / 인쇄 / ZIP 클릭
  P->>P: Wi-Fi 비밀번호를 **** 로 바꿈
  P->>S: 종류·내용·이벤트 1건 전송
  S->>S: 요청 제한 · 크기 검사 · 비밀번호 다시 마스킹
  S->>DB: 기록 저장 (IP · 브라우저 · 시간)
```

**운영자가 관리자에 들어가는 흐름 (3중 잠금)**

```mermaid
flowchart TD
  X["누군가 /admin 접속"] --> G{"비밀 입구 URL을 먼저 열었나?"}
  G -- 아니오 --> N["404 — 일반 404와 동일한 응답"]
  G -- 예 --> I{"허용된 IP? (설정했을 때만)"}
  I -- 아니오 --> N
  I -- 예 --> L["로그인 화면"] --> PW{"비밀번호 + 인증 앱 OTP"}
  PW -- 5회 실패 --> LOCK["10분 잠금"]
  PW -- 성공 --> SES["세션 쿠키 (브라우저 지문 바인딩, 24h)"] --> ADM["대시보드 · 통계 · 기록 · 설정 · 감사 로그"]
```

비전공자용 전체 설명(개발 과정·코드 리뷰·면접 포인트·인수인계)은 [`docs/인수인계.docx`](docs/인수인계.docx) (같은 내용의 [Markdown](docs/인수인계.md))에 있습니다.

## 구조

```
src/app/                 라우트: / /ko /batch /[slug] /ko/[slug] /admin/* /api/*
src/components/qr/       생성기 UI(타입 타일·폼·미리보기·꾸미기·플랫폼 피커·인쇄 안내판·렌더 헬퍼)
src/components/batch/    일괄 생성(표 편집기, 붙여 넣기 파서, STORE ZIP 작성기)
src/components/pages/    Home/Landing/Batch/About/Privacy 본문(언어 공유)
src/lib/qr/              타입·인코더·저장용 마스킹 (+ 테스트)
src/lib/i18n/            9개 언어 사전(`<code>.ts`), 랜딩 콘텐츠(`landing.<code>.ts`), slug 매핑
src/lib/db/              Drizzle 스키마·클라이언트 (마이그레이션 SQL은 drizzle/)
src/lib/{logs,settings,audit}.ts    기록·설정(30초 캐시)·감사 로그 데이터 접근
src/lib/{auth,adminAccess,totp}.ts  세션·게이트·IP 허용목록·TOTP
src/proxy.ts             locale 헤더, 관리자 게이트/404, /en→/ 301
```

## 로컬 실행

```bash
cp .env.example .env     # ADMIN_PASSWORD, SESSION_SECRET(openssl rand -hex 32), ADMIN_PATH
npm ci
docker compose -f docker-compose.local.yml up -d   # PostgreSQL 16 → localhost:5432 (qr/qrlocal)
npm run db:migrate       # drizzle/*.sql 적용
npm run dev              # http://localhost:3000  (관리자: http://localhost:3000/<ADMIN_PATH>)
npm test                 # 인코더·TOTP·시간 단위 테스트 (DB 불필요)
npm run build            # DB 없이도 빌드됨 (모든 페이지가 요청 시 렌더)
```

개발 모드에서는 광고 자리가 점선으로 표시됩니다. 스키마를 바꾸면 `npm run db:generate`로 `drizzle/`에 새 마이그레이션을 만들어 함께 커밋합니다.

## 서버 배포 (오라클 클라우드 Ubuntu)

> 콘솔 설정부터 운영 체크리스트까지 전체 절차는 [`docs/배포-절차.md`](docs/배포-절차.md)에 있습니다. 아래는 요약입니다.

1. OCI 콘솔 → VCN 보안 목록 → Ingress **80, 443** 추가
2. 서버에서 (private 저장소는 GitHub 토큰을 비밀번호로):
   ```bash
   git clone https://github.com/vittroi384/qr-web.git ~/qr-web
   bash ~/qr-web/scripts/server-setup.sh   # iptables 개방, Docker 설치, .env 생성(비밀값 자동)
   cd ~/qr-web && nano .env                 # ADMIN_PASSWORD 입력, DOMAIN은 DNS 연결 후
   newgrp docker && ./deploy.sh
   ```
3. OTP 등록(**첫 로그인 전 필수** — 운영 모드는 TOTP 없이, 또는 12자 미만·예시 비밀번호로는 로그인을 거부): `docker compose exec app node scripts/totp-setup.mjs` → QR을 인증 앱으로 스캔 → `.env`에 `ADMIN_TOTP_SECRET` 추가 → `docker compose up -d`. `DOMAIN`이 비어 있는 동안(평문 HTTP)은 공개 주소로 로그인하지 말고 SSH 터널로 접속: `ssh -L 3000:127.0.0.1:3000 ubuntu@<서버IP>` → `http://localhost:3000/<ADMIN_PATH>` (앱 포트는 서버 루프백에만 바인딩)
4. 도메인 연결 시 `.env`의 `DOMAIN=`만 채우면 Caddy가 HTTPS를 자동 발급. 관리자 설정의 **사이트 URL**도 실제 도메인으로 변경
5. 업데이트: `./deploy.sh` (git pull + 재빌드). 새 마이그레이션은 app 컨테이너가 시작하면서 자동 적용(`docker compose logs app`에 `[migrate]` 줄)
6. 백업: `scripts/backup.sh` → `backups/qr-YYYY-MM-DD.sql.gz` + `backups/umami-YYYY-MM-DD.sql.gz`(umami DB가 있을 때) (`pg_dump`, 30일 보관). cron 예: `30 4 * * * ~/qr-web/scripts/backup.sh`. 복원은 `gunzip -c backups/qr-….sql.gz | docker compose exec -T db psql -U qr -d qr`

> `DOMAIN`을 비우면 평문 HTTP로 동작하며 세션 쿠키에 `Secure`가 붙지 않습니다(테스트 용도). HSTS에 `includeSubDomains`가 포함되어 있으니 HTTP 전용 서브도메인이 있으면 Caddyfile에서 빼세요.

## AdSense 연결

1. 실제 도메인으로 배포 후 AdSense에 사이트 추가 → 게시자 ID(`ca-pub-…`) 발급
2. 관리자 → 설정 → 게시자 ID 입력 + **광고 표시** 체크 → `/ads.txt`와 스크립트가 자동 활성화 → 사이트 확인·심사
3. 승인 후 광고 단위 생성 → 각 `data-ad-slot`을 설정의 슬롯 ID 칸에 입력. 비어 있는 자리는 렌더되지 않음. 처음엔 상단·본문 중간·글 사이(인아티클 단위)·하단 4개만 켜고 보고서를 보며 조정. 자동 광고는 끄기(배치 규칙이 깨지고 실수 클릭 위험)
4. AdSense → 개인정보 보호 및 메시지 → **EEA/UK 동의 메시지** 켜기 — 유럽 방문자에게 광고를 내보내려면 필수(구글 CMP, 코드 변경 없음). 독·프·스페인어 랜딩이 있으므로 꼭 설정

### 배포 후 등록 체크리스트 (분석·유입)

| 순서 | 할 일 | 비용 |
| --- | --- | --- |
| 1 | Google Search Console에 도메인 등록 → `https://도메인/sitemap.xml` 제출 (207 URL, 9개 언어 hreflang) | 무료 |
| 2 | Bing Webmaster Tools — Search Console에서 가져오기 한 번 | 무료 |
| 3 | 업타임 모니터(UptimeRobot) — `https://도메인/api/health` 5분 간격, 알림 메일/텔레그램 | 무료 |
| 4 | Umami 방문 분석 — SSH 터널(`ssh -L 3001:127.0.0.1:3001 ubuntu@서버IP`)로 `http://localhost:3001` 접속 → 비밀번호 변경 → 사이트 추가 → 관리자 설정에 `https://도메인/umami/script.js`·웹사이트 ID 입력 (쿠키 없음, 동의 배너 불필요) | 무료(자체 호스팅) |
| 5 | AdSense 신청 → 승인 후 슬롯 4개부터 → 1~2주 뒤 보고서로 조정 | — |
| 6 | 관리자 → 통계 탭에서 언어별·페이지별 저장 수와 퍼널(선택→미리보기→저장)을 보고 랜딩 콘텐츠 보강 | — |

## 방문 분석 (Umami, 자체 호스팅)

쿠키 없는 방문 통계(페이지·국가·기기). 개인을 식별하지 않으므로 동의 배너가 필요 없습니다. `umami` 컨테이너는 같은 Postgres 인스턴스에서 **전용 role `umami`와 `umami` DB**를 씁니다(슈퍼유저 `qr` 비밀번호를 갖지 않음).

- **공개되는 것은 추적기뿐**: Caddy가 본 사이트의 `/umami/script.js`와 `/umami/api/send`만 Umami로 넘기고, 그 밖의 `/umami/*`는 404. 도메인 모드와 IP 전용 모드 모두 동작하며 서브도메인·DNS 추가가 필요 없습니다.
- **대시보드는 외부 미공개**: 서버의 `127.0.0.1:3001`에만 바인딩. 기본 계정(`admin`/`umami`)이 인터넷에 노출되지 않습니다.

1. `./deploy.sh` — `.env`에 `UMAMI_APP_SECRET`·`UMAMI_DB_PASSWORD`가 없으면 생성하고, `scripts/db-init/01-umami.sh`(role·DB 생성, 멱등)를 매 배포마다 실행합니다. 새 볼륨이면 Postgres가 처음 시작할 때도 자동 실행됩니다
2. 내 PC에서 SSH 터널: `ssh -L 3001:127.0.0.1:3001 ubuntu@<서버IP>` → 브라우저로 `http://localhost:3001`
3. `admin` / `umami`로 로그인 → **비밀번호 즉시 변경** → Settings → Websites → Add website(도메인 입력) → 웹사이트 ID 복사
4. 관리자 → 설정 → **방문 분석 (Umami)**: 스크립트 URL `https://<DOMAIN>/umami/script.js`(IP 모드는 `http://<서버IP>/umami/script.js`), 웹사이트 ID 입력. 추적기는 스크립트 주소에서 `/umami/api/send`를 스스로 계산합니다. 공개 페이지에만 삽입되고, 둘 중 하나라도 비우면 아무것도 삽입되지 않음

## 품질 · 운영

**테스트 (CI에서 모두 실행)**
- 단위 102건 — QR 인코더(Wi-Fi 이스케이프, vCard, VEVENT, wa.me, BIP-21), 입력 검증, 비밀번호 마스킹, 로그인 잠금·IPv6 키, TOTP(RFC 6238 벡터), KST 시간 헬퍼 (`npm test`)
- E2E 24건 — Playwright: 입력→PNG 저장→`/api/log` 기록·마스킹 검증, 일괄 ZIP 구조 파싱, 관리자 게이트/OTP/CSV, SEO(hreflang·JSON-LD·sitemap·robots), 모바일 가로 넘침 0, axe 접근성 (`npm run test:e2e`)
- CI: lint → 타입 → 단위 → DB 없는 빌드 → E2E(Postgres 서비스) → Docker 이미지 빌드

**Lighthouse (운영 이미지, 2026-10 · 배포 후 재측정 예정)**

| 페이지 | 성능 (모바일/데스크톱) | 접근성 | 모범 사례 | SEO |
| --- | --- | --- | --- | --- |
| `/` | 98 / 100 | 100 | 100 | 100 |
| `/wifi-qr-code` | 98 / 100 | 100 | 100 | 100 |
| `/batch` | 98 / 100 | 100 | 100 | 100 |

**관측성**
- `GET /api/health` — DB 핑 포함 (200 / 503). compose 헬스체크와 외부 업타임 모니터(UptimeRobot 등 무료, 5분 간격)에 이 주소를 등록
- 앱 로그는 한 줄 JSON (`docker compose logs -f app`): `admin.login`, `admin.login_failed`, `admin.login_locked`, `log.rate_limited`, `log.insert_failed`, `health.db_down`
- 브라우저 오류 수집 — `ClientErrorReporter`가 공개 페이지의 미처리 오류·Promise 거부를 페이지당 최대 3건 `/api/client-error`로 보내고, 서버는 `client.error` 한 줄 JSON으로만 기록(DB 저장 없음, IP당 분당 10건, 외부 서비스 없음)
- Caddy 접근 로그 JSON, 10MB × 5 롤링 (`docker compose exec caddy cat /data/access.log`)
- 모든 컨테이너 표준 출력 로그도 json-file 10MB × 5 로테이션 (docker-compose.yml `x-logging`)
- 백업 실패/성공 알림 — `.env`에 `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID`를 넣으면 `scripts/backup.sh`가 텔레그램으로 보고

**수익화 (관리자 → 설정 → 수익화)**
- AdSense 게시자 ID·슬롯 6개
- 인쇄 제휴 링크 — 인쇄 안내판 다이얼로그와 Wi-Fi·명함·메뉴판 등 인쇄 수요가 있는 랜딩 페이지에 "Sponsored" 카드로 노출(`rel="sponsored"`), 비우면 미표시
- 후원 링크(Buy Me a Coffee 등) — 푸터에 작은 링크, 비우면 미표시
- 사용 사례 랜딩 — `/restaurant-menu-qr-code`, `/wedding-qr-code`, `/business-card-qr-code`, `/google-review-qr-code`, `/wifi-qr-code-for-cafe` (+ `/ko/…`)

## 환경변수

| 이름 | 설명 |
|---|---|
| `DOMAIN` | Caddy용 도메인. 비우면 `:80` 평문 HTTP |
| `ADMIN_PATH` | 관리자 비밀 입구 경로 (`/gate-…`, 영숫자 8~64자). 없으면 게이트 비활성(개발용) |
| `ADMIN_PASSWORD` | 관리자 비밀번호 |
| `ADMIN_TOTP_SECRET` | OTP 비밀키. 운영 모드에서는 필수(없으면 로그인 API가 503으로 거부), 개발 모드에서만 생략 가능 |
| `SITE_URL` | `DOMAIN`이 없을 때의 기본 사이트 URL(선택). 관리자 설정에 저장된 값이 항상 우선 |
| `ADMIN_ALLOWED_IPS` | 관리자 접근 허용 IP/CIDR 목록 (선택) |
| `SESSION_SECRET` | 세션·게이트 쿠키 서명 키 (`openssl rand -hex 32`) |
| `POSTGRES_PASSWORD` | DB 사용자 `qr`의 비밀번호. compose가 DB 생성과 앱의 `DATABASE_URL`에 사용 (server-setup.sh가 생성) |
| `UMAMI_APP_SECRET` | Umami 로그인 토큰 서명 키 (`openssl rand -hex 32`, server-setup.sh·deploy.sh가 없으면 생성). compose 필수 |
| `UMAMI_DB_PASSWORD` | Umami 전용 DB role `umami`의 비밀번호 (`openssl rand -hex 24`, 위와 같이 자동 생성). deploy.sh가 매번 role에 다시 적용 |
| `TELEGRAM_BOT_TOKEN` / `TELEGRAM_CHAT_ID` | 선택. 백업 결과 텔레그램 알림 |
| `DATABASE_URL` | 로컬 개발용 접속 문자열 (`postgres://qr:qrlocal@localhost:5432/qr`). Docker에서는 compose가 `db` 서비스로 덮어씀 |

## 설계 결정

- **정적 QR만**: 사용자가 인쇄한 QR이 이 서버의 가동 여부에 종속되지 않게. 리다이렉트·통계·수정 기능(동적 QR)은 피싱 중계·운영 책임을 동반하므로 배제
- **기록은 저장 시점에만**: 입력 중 디바운스 전송을 없애 "타이핑마다 저장되는" 느낌을 제거. PNG/SVG/복사/인쇄/ZIP 클릭이 곧 "만든 것"
- **민감값은 서버에 도달하기 전·후 모두 마스킹**: 클라이언트가 `****`로 보내고 서버가 다시 고정 마스킹. 설정으로 끌 수 없음
- **관리자는 존재 자체를 숨김**: 로그인 폼을 노출하는 대신 404로 응답해 무차별 대입의 표면을 없앰
- 전체 계획과 검증 기록은 [`docs/계획.md`](docs/계획.md)
- 다음에 추가할 기능과 하지 않을 것은 [`docs/기능-로드맵.md`](docs/기능-로드맵.md)
- 서버 배포·운영 절차는 [`docs/배포-절차.md`](docs/배포-절차.md)

## 만든 방식

1인 개발이며, 구현 과정에서 AI 코딩 도구를 보조로 사용했습니다. 무엇을 만들지와 설계 결정(정적 QR만, 회원가입 없음, 9개 언어, 관리자에 무엇을 기록할지)은 직접 내렸고 그 근거를 [`docs/결정-기록`](docs/결정-기록/README.md)에 남겼습니다. 모든 변경은 CI(lint → 타입 → 단위 → 빌드 → E2E → Docker 빌드)를 통과한 뒤 main에 올립니다.

## 라이선스

MIT
