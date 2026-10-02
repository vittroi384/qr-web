# ADR-006: 데이터 계층을 PostgreSQL + Drizzle ORM으로 전환한다

- 상태: 채택 (2026-10-02)
- 결정자: 운영자

## 맥락

초기 구현은 better-sqlite3(동기 API, 단일 파일)였다. 트래픽 규모상 충분했고 운영도 단순했지만, 운영자의 다른 프로젝트(Next.js + Drizzle + PostgreSQL)와 스택이 어긋났고, 포트폴리오·기업 환경 관점에서 "실제 서비스 DB"로서의 설득력이 약했다. 동시 쓰기, 스키마 마이그레이션 이력, 표준 백업(`pg_dump`), 관리형 DB(RDS 등)로의 이전 경로도 필요했다.

## 결정

- PostgreSQL 16을 같은 서버의 Docker Compose 서비스로 운영한다(포트 비공개, 명명된 볼륨).
- Drizzle ORM으로 스키마를 코드로 정의하고 `drizzle-kit`으로 마이그레이션 SQL을 생성해 저장소에 커밋한다. 컨테이너 시작 시 마이그레이션을 자동 적용한다.
- `payload_json`·`options_json`은 `jsonb`, 시각은 `timestamptz`. 관리자 집계는 KST(`Asia/Seoul`) 기준으로 DB에서 변환한다.
- 빌드(`next build`)는 DB 없이 성공해야 한다 — 연결은 요청 시점에만 지연 생성한다.
- 백업은 `scripts/backup.sh`(`pg_dump` + gzip, 30일 보관).

## 결과

- 운영 비용은 그대로 0(무료 티어 메모리로 충분).
- 모든 데이터 함수가 비동기가 되어 호출부(레이아웃·페이지·API·서버 액션)가 `await`로 바뀌었다.
- `DATABASE_URL` 하나만 바꾸면 관리형 PostgreSQL로 이전할 수 있다.
- 로컬 개발에 Postgres 컨테이너(`docker-compose.local.yml`)가 필요해졌다.
