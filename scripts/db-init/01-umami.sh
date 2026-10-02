#!/bin/sh
# Umami's own login role and database (owner umami), so the analytics container never holds the
# superuser "qr" credentials. Idempotent:
#  - Postgres runs it automatically once, when the db service starts on an empty volume.
#  - deploy.sh runs it on every deploy:  docker compose exec -T db sh /docker-entrypoint-initdb.d/01-umami.sh
# The role's password is (re)set from UMAMI_DB_PASSWORD each run, so .env stays the source of truth.
# No `set -e`: the image's entrypoint may source this file instead of executing it.
if [ -z "${UMAMI_DB_PASSWORD:-}" ]; then
  echo "01-umami.sh: UMAMI_DB_PASSWORD is not set" >&2
  exit 1
fi

# Postgres has no CREATE ROLE/DATABASE IF NOT EXISTS: build each statement and run it via \gexec when missing.
psql -v ON_ERROR_STOP=1 -U "${POSTGRES_USER:-qr}" -d postgres -v pw="$UMAMI_DB_PASSWORD" <<'SQL' || exit 1
SELECT 'CREATE ROLE umami LOGIN' WHERE NOT EXISTS (SELECT FROM pg_roles WHERE rolname = 'umami')\gexec
SELECT format('ALTER ROLE umami WITH LOGIN PASSWORD %L', :'pw')\gexec
SELECT 'CREATE DATABASE umami OWNER umami' WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'umami')\gexec
ALTER DATABASE umami OWNER TO umami;
SQL
