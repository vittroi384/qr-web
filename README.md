# QR-Web — 무엇이든 QR 코드로

URL · 텍스트 · Wi-Fi · 연락처(vCard) · 이메일 · 문자 · 전화 · 위치 · 일정을 QR 코드로 바꿔주는 공개 웹사이트.
방문자가 입력한 내용은 **내 서버의 SQLite DB에 기록**되고, `/admin`에서 조회·검색·CSV 내보내기·설정 변경을 할 수 있습니다.
Google AdSense 광고 자리 5곳(상단·좌·우·하단·본문 중간)이 미리 잡혀 있습니다. 팝업 광고는 없습니다.

- 스택: Next.js 16 (App Router, TypeScript) · Tailwind CSS 4 · better-sqlite3 · `qrcode`
- 배포: Docker Compose + Caddy(자동 HTTPS) → 오라클 클라우드 등 아무 리눅스 서버

## 로컬 개발

```bash
cp .env.example .env     # ADMIN_PASSWORD, SESSION_SECRET 채우기
npm install
npm run dev              # http://localhost:3000
npm test                 # 인코더 단위 테스트
npm run lint
```

- 관리자: `http://localhost:3000/admin` (비밀번호 = `.env`의 `ADMIN_PASSWORD`)
- 개발 모드에서는 광고 자리가 점선 박스로 표시됩니다.
- DB 파일: `./data/qr.db` (자동 생성, git 제외)

## 구조

```
src/app/                 페이지 · API 라우트 (page.tsx = 메인 생성기, admin/* = 관리자)
src/components/qr/       QR 생성기 UI (탭, 폼, 미리보기, 디자인 옵션, 기록 전송 훅)
src/components/ads/      AdSense 스크립트 · 광고 슬롯 컴포넌트
src/lib/qr/encoders.ts   입력값 → QR 문자열 (WIFI:, vCard, VEVENT, mailto:, SMSTO:, tel:, geo:)
src/lib/settings.ts      관리자 설정 (DB 저장, 재배포 없이 변경)
src/lib/logs.ts          방문자 입력 기록 조회/삭제/통계
src/lib/audit.ts         관리자 활동 감사로그
src/proxy.ts             /admin/* 세션 보호
```

### 동작 요약

- QR 이미지는 **브라우저에서** 생성됩니다(서버 부하 없음).
- 미리보기는 브라우저에서 실시간으로 그려지며 서버로 아무것도 보내지 않습니다. **PNG/SVG 다운로드 또는 이미지 복사를 눌렀을 때만** `POST /api/log`로 종류·입력값·옵션·IP·브라우저가 기록됩니다(이벤트: download_png / download_svg / copy).
  IP당 분당 30회 제한, 16KB 본문 제한(Caddy에서도 64KB 캡), Wi-Fi 비밀번호는 저장 전 항상 `****`로 마스킹(설정으로 끌 수 없음).
  기록 보관 기본 90일, 감사 로그 365일 후 자동 정리.
- 관리자 설정(사이트 URL, 이름, AdSense ID, 슬롯 ID, 기록 on/off, 보관 일수 등)은 DB에 저장되고 변경 전/후 값이 **감사 로그**에 남습니다.
- `/ads.txt`, `/robots.txt`, `/sitemap.xml`, OG 메타는 설정값으로 동적 생성됩니다.

## 서버 배포 (오라클 클라우드 Ubuntu 기준)

### 1. 네트워크 열기
1. OCI 콘솔 → VCN → 서브넷의 **보안 목록** → Ingress 규칙에 `0.0.0.0/0` TCP **80**, **443** 추가.
2. 인스턴스 안에서도 iptables가 막고 있으므로:
   ```bash
   sudo iptables -I INPUT 6 -m state --state NEW -p tcp --dport 80 -j ACCEPT
   sudo iptables -I INPUT 6 -m state --state NEW -p tcp --dport 443 -j ACCEPT
   sudo apt-get install -y iptables-persistent && sudo netfilter-persistent save
   ```
3. 도메인을 쓸 경우 DNS A 레코드를 서버 공인 IP로 지정.

### 2. Docker 설치
```bash
curl -fsSL https://get.docker.com | sudo sh
sudo usermod -aG docker $USER && newgrp docker
```

### 3. 코드 받기 & 설정
```bash
git clone <이 저장소 URL> qr-web && cd qr-web
cp .env.example .env
nano .env
#   DOMAIN=qr.example.com          # 도메인 없으면 비워두기 → http://서버IP 로 접속
#   ADMIN_PASSWORD=긴-비밀번호
#   SESSION_SECRET=$(openssl rand -hex 32)
chmod +x deploy.sh
```

### 4. 배포 / 업데이트
```bash
./deploy.sh          # git pull + docker compose up -d --build
docker compose logs -f app
```
DOMAIN을 지정하면 Caddy가 Let's Encrypt 인증서를 자동 발급해 HTTPS로 서비스합니다.
DOMAIN을 비우면 평문 HTTP(:80)로 동작하며 이때 관리자 세션 쿠키는 `Secure` 없이 발급됩니다(테스트 용도로만 권장).
배포 후 `/admin/settings`에서 **사이트 URL**을 실제 도메인으로 바꿔 주세요(sitemap/OG에 사용).

### 5. 백업
SQLite 파일 하나(`./data/qr.db`)가 전부입니다.
```bash
# 매일 03:00 백업, 30일 보관 (crontab -e)
0 3 * * * cd /home/ubuntu/qr-web && docker compose exec -T app node -e "require('better-sqlite3')('/app/data/qr.db').backup('/app/data/backup-'+new Date().toISOString().slice(0,10)+'.db')" && find data -name 'backup-*.db' -mtime +30 -delete
```

## AdSense 연결

1. AdSense에서 사이트를 추가하고 승인 받기(`/guide`, `/about`, `/privacy` 등 콘텍스트 페이지 포함).
2. 광고 단위(디스플레이) 5개 생성 → 각 `data-ad-slot` 값을 `/admin/settings`의 슬롯 ID 칸에 입력.
3. 게시자 ID(`ca-pub-…`) 입력, **광고 표시** 체크, 저장. `/ads.txt`는 자동으로 채워집니다.
4. 슬롯 ID가 비어 있는 자리는 렌더되지 않습니다. 레이아웃만 확인하려면 **광고 자리 점선 표시**를 켜세요.

## 환경변수

| 이름 | 설명 |
| --- | --- |
| `DOMAIN` | Caddy용 도메인. 비우면 `:80` 평문 HTTP |
| `ADMIN_PASSWORD` | `/admin` 로그인 비밀번호 |
| `SESSION_SECRET` | 세션 쿠키 서명 키 (`openssl rand -hex 32`) |
| `DATABASE_PATH` | SQLite 경로. Docker에서는 `/app/data/qr.db` 고정 |

> 보안 주의: 앱은 `X-Real-IP`(Caddy가 덮어씀)를 신뢰합니다. `docker-compose.yml`의 app 서비스에 `ports:`를 추가해 3000 포트를 외부에 직접 노출하지 마세요. 노출하면 클라이언트가 IP를 위조할 수 있습니다.
