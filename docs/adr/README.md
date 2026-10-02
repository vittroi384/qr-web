# Architecture Decision Records

프로젝트의 주요 설계 결정을 결정 시점의 맥락과 함께 기록합니다. 형식은 [MADR](https://adr.github.io/madr/) 축약형.

| 번호 | 제목 | 상태 |
| --- | --- | --- |
| [ADR-001](001-static-qr-only.md) | 동적 QR(리다이렉트) 대신 정적 QR만 제공한다 | 채택 |
| [ADR-002](002-log-on-save-only.md) | 방문자 입력은 저장 행동(다운로드·복사·인쇄) 시점에만 기록한다 | 채택 |
| [ADR-003](003-admin-hidden-behind-gate.md) | 관리자 영역은 비밀 입구 + OTP + IP 허용목록으로 존재 자체를 숨긴다 | 채택 |
| [ADR-004](004-mask-secrets-before-storage.md) | 민감값(Wi-Fi 비밀번호)은 클라이언트와 서버 양쪽에서 저장 전 마스킹한다 | 채택 |
| [ADR-005](005-path-based-i18n-english-default.md) | 경로 기반 i18n, 영어를 기본 언어로 둔다 | 채택 |
| [ADR-006](006-postgresql-drizzle.md) | 데이터 계층을 SQLite에서 PostgreSQL + Drizzle ORM으로 전환한다 | 채택 |
| [ADR-007](007-self-hosted-cookieless-analytics.md) | 방문 분석은 쿠키 없는 Umami를 자체 호스팅하고, 대시보드는 외부에 열지 않는다 | 채택 |
