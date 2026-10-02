#!/usr/bin/env bash
# Dumps the production PostgreSQL database to backups/qr-YYYY-MM-DD.sql.gz and keeps 30 days.
# Run from cron on the server, e.g.  30 4 * * * /home/ubuntu/qr-web/scripts/backup.sh
# Restore:  gunzip -c backups/qr-2026-10-02.sql.gz | docker compose exec -T db psql -U qr -d qr
set -euo pipefail
# Dumps contain visitor IPs and inputs: readable by the owner account only.
umask 077
cd "$(dirname "$0")/.."

KEEP_DAYS="${KEEP_DAYS:-30}"
mkdir -p backups
out="backups/qr-$(date +%F).sql.gz"
tmp="${out}.partial"

# Write to a temp file first so a failed dump never replaces a good backup.
docker compose exec -T db pg_dump -U qr --no-owner --clean --if-exists qr | gzip > "$tmp"
mv "$tmp" "$out"
find backups -name 'qr-*.sql.gz' -mtime +"$KEEP_DAYS" -delete

echo "$(date '+%F %T') backup written: $out ($(du -h "$out" | cut -f1))"
