#!/usr/bin/env bash
# Dumps the production PostgreSQL database to backups/qr-YYYY-MM-DD.sql.gz and keeps 30 days.
# Run from cron on the server, e.g.  30 4 * * * /home/ubuntu/qr-web/scripts/backup.sh
# Restore:  gunzip -c backups/qr-2026-10-02.sql.gz | docker compose exec -T db psql -U qr -d qr
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
  notify "QR Maker backup FAILED on $(hostname): $1"
  echo "$(date '+%F %T') backup failed: $1" >&2
  exit 1
}

mkdir -p backups
out="backups/qr-$(date +%F).sql.gz"
tmp="${out}.partial"

# Write to a temp file first so a failed dump never replaces a good backup.
docker compose exec -T db pg_dump -U qr --no-owner --clean --if-exists qr | gzip > "$tmp" || fail "pg_dump exited with status $?"
[ -s "$tmp" ] || fail "dump file is empty"
mv "$tmp" "$out" || fail "could not move dump into place"
find backups -name 'qr-*.sql.gz' -mtime +"$KEEP_DAYS" -delete

size=$(du -h "$out" | cut -f1)
echo "$(date '+%F %T') backup written: $out ($size)"
notify "QR Maker backup OK on $(hostname): $out ($size)"
