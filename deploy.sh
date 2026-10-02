#!/usr/bin/env bash
# One-shot deploy/update on the server: pull latest code, rebuild, restart, clean up.
set -euo pipefail
cd "$(dirname "$0")"

if [ ! -f .env ]; then
  echo ".env not found. Copy .env.example to .env and fill it in first." >&2
  exit 1
fi

git pull --ff-only

# Older .env files predate the Umami service: add its secrets once instead of failing compose.
ensure_secret() { # <name> <openssl rand -hex length>
  grep -q "^$1=." .env && return 0
  sed -i "/^$1=/d" .env
  [ -n "$(tail -c1 .env)" ] && echo >> .env # never glue onto a last line without a newline
  echo "$1=$(openssl rand -hex "$2")" >> .env
  echo "Added $1 to .env"
}
ensure_secret UMAMI_APP_SECRET 32
ensure_secret UMAMI_DB_PASSWORD 24

# Umami's role + database: init scripts only run on an empty volume, so (re)apply the idempotent
# script on every deploy. pg_isready over TCP is false during first-boot init (socket only), so
# this never races the entrypoint's own run of the same script.
docker compose up -d db
for _ in $(seq 1 30); do
  docker compose exec -T db pg_isready -q -h 127.0.0.1 -U qr && break
  sleep 1
done
docker compose exec -T db sh /docker-entrypoint-initdb.d/01-umami.sh

docker compose up -d --build --remove-orphans
docker image prune -f >/dev/null

echo
docker compose ps
echo
echo "Deployed. Logs: docker compose logs -f app"
