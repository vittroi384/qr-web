#!/usr/bin/env bash
# Dumps the production PostgreSQL databases to backups/qr-YYYY-MM-DD.sql.gz (app) and
# backups/umami-YYYY-MM-DD.sql.gz (analytics, when that database exists) and keeps 30 days.
# Run from cron on the server, e.g.  30 4 * * * /home/ubuntu/qr-web/scripts/backup.sh
# Restore:  gunzip -c backups/qr-2026-10-02.sql.gz | docker compose exec -T db psql -U qr -d qr
#           gunzip -c backups/umami-2026-10-02.sql.gz | docker compose exec -T db psql -U qr -d umami
set -uo pipefail
# Dumps contain visitor IPs and inputs: readable by the owner account only.
umask 077
cd "$(dirname "$0")/.."

KEEP_DAYS="${KEEP_DAYS:-30}"

# Optional Telegram alert on failure (and a short success line): set TELEGRAM_BOT_TOKEN and
# TELEGRAM_CHAT_ID in .env. Without them the script just logs to stdout.
[ -f .env ] && set -a && . ./.env && set +a
notify() {
  [ -n "${TELEGRAM_BOT_TOKEN:-}" ] && [ -n "${TELEGRAM_CHAT_ID:-}" ] || return 0
  curl -fsS -m 10 "https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage" \
    --data-urlencode "chat_id=${TELEGRAM_CHAT_ID}" --data-urlencode "text=$1" >/dev/null || true
}
fail() {
  rm -f "${tmp:-}"
  notify "GetQRMaker backup FAILED on $(hostname): $1"
  echo "$(date '+%F %T') backup failed: $1" >&2
  exit 1
}

mkdir -p backups

# dump <database> <output file>. Writes to a temp file first so a failed dump never replaces a good backup.
dump() {
  out="$2"
  tmp="${out}.partial"
  docker compose exec -T db pg_dump -U qr --no-owner --clean --if-exists "$1" | gzip > "$tmp" || fail "pg_dump $1 exited with status $?"
  [ -s "$tmp" ] || fail "$1 dump file is empty"
  mv "$tmp" "$out" || fail "could not move $1 dump into place"
  tmp=""
  echo "$(date '+%F %T') backup written: $out ($(du -h "$out" | cut -f1))"
}

dump qr "backups/qr-$(date +%F).sql.gz"
summary="backups/qr-$(date +%F).sql.gz ($(du -h "backups/qr-$(date +%F).sql.gz" | cut -f1))"
# Umami analytics: only once its database exists (see README).
if [ "$(docker compose exec -T db psql -U qr -d qr -tAc "SELECT 1 FROM pg_database WHERE datname = 'umami'")" = "1" ]; then
  dump umami "backups/umami-$(date +%F).sql.gz"
  summary="$summary, umami ($(du -h "backups/umami-$(date +%F).sql.gz" | cut -f1))"
fi
find backups \( -name 'qr-*.sql.gz' -o -name 'umami-*.sql.gz' \) -mtime +"$KEEP_DAYS" -delete

notify "GetQRMaker backup OK on $(hostname): $summary"
