# syntax=docker/dockerfile:1
# Multi-stage build. Works on x86_64 and arm64 (Oracle Ampere A1). No native modules, so no
# build toolchain is needed.

FROM node:22-bookworm-slim AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

FROM node:22-bookworm-slim AS build
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# No database at build time: every page is force-dynamic and the DB client connects lazily.
RUN npm run build

FROM node:22-bookworm-slim AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

RUN groupadd -g 1001 nodejs && useradd -u 1001 -g nodejs -m nextjs

COPY --from=build --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=build --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=build --chown=nextjs:nodejs /app/public ./public
# Migrations run on every start (already-applied ones are skipped). The migrator needs only
# drizzle-orm + postgres (both dependency-free); copy the full packages because the standalone
# trace keeps just the files the server bundle imports, not drizzle-orm's migrator.
COPY --from=deps --chown=nextjs:nodejs /app/node_modules/drizzle-orm ./node_modules/drizzle-orm
COPY --from=deps --chown=nextjs:nodejs /app/node_modules/postgres ./node_modules/postgres
COPY --from=build --chown=nextjs:nodejs /app/drizzle ./drizzle
COPY --from=build --chown=nextjs:nodejs /app/scripts/migrate.mjs ./scripts/migrate.mjs
# OTP enrolment helper (`docker compose exec app node scripts/totp-setup.mjs`): needs the qrcode
# library core only (dijkstrajs + pngjs); yargs is used solely by qrcode's own CLI.
COPY --from=deps --chown=nextjs:nodejs /app/node_modules/qrcode ./node_modules/qrcode
COPY --from=deps --chown=nextjs:nodejs /app/node_modules/dijkstrajs ./node_modules/dijkstrajs
COPY --from=deps --chown=nextjs:nodejs /app/node_modules/pngjs ./node_modules/pngjs
COPY --from=build --chown=nextjs:nodejs /app/scripts/totp-setup.mjs ./scripts/totp-setup.mjs

USER nextjs
EXPOSE 3000
CMD ["sh", "-c", "node scripts/migrate.mjs && exec node server.js"]
