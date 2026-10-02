#!/usr/bin/env bash
# One-shot deploy/update on the server: pull latest code, rebuild, restart, clean up.
set -euo pipefail
cd "$(dirname "$0")"

if [ ! -f .env ]; then
  echo ".env not found. Copy .env.example to .env and fill it in first." >&2
  exit 1
fi

git pull --ff-only
docker compose up -d --build --remove-orphans
docker image prune -f >/dev/null

echo
docker compose ps
echo
echo "Deployed. Logs: docker compose logs -f app"
