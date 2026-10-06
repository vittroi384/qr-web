#!/usr/bin/env bash
# Allow the GetQRMaker origin port (host 8080 → Caddy container :80) only from Cloudflare's edge.
#
# Why: the site is reached through the Cloudflare proxy (docker-compose.cloudflare.yml). A visitor who
# hits http://<server-ip>:8080 directly skips Cloudflare's TLS, WAF and rate limiting, and Caddy then
# sees the raw peer IP (fine) but nothing stops a flood from reaching the app. Docker publishes 8080
# itself, bypassing INPUT rules, so the filter has to live in the DOCKER-USER chain (evaluated for
# forwarded traffic before Docker's own rules).
#
# What it does (idempotent, safe to re-run):
#   1. Fetch Cloudflare's current IPv4 ranges (falls back to the list baked in below if offline).
#   2. Rebuild chain QR_CF: RETURN for each Cloudflare range, DROP for everything else.
#   3. Jump into QR_CF from DOCKER-USER only for connections whose ORIGINAL destination port was 8080
#      on the external interface, so other containers (TutorPay :443) and loopback access are untouched.
# Rollback at any time:  sudo iptables -F DOCKER-USER && sudo iptables -F QR_CF
# Installed as a oneshot systemd unit (see docs/배포-절차.md 2-C) because the chain is empty after a reboot.
set -euo pipefail

PORT="${QR_HTTP_PORT:-8080}"
IFACE="$(ip -4 route show default | awk '{print $5; exit}')"
FALLBACK_V4="173.245.48.0/20 103.21.244.0/22 103.22.200.0/22 103.31.4.0/22 141.101.64.0/18 108.162.192.0/18 190.93.240.0/20 188.114.96.0/20 197.234.240.0/22 198.41.128.0/17 162.158.0.0/15 104.16.0.0/13 104.24.0.0/14 172.64.0.0/13 131.0.72.0/22"

RANGES="$(curl -fsS --max-time 10 https://www.cloudflare.com/ips-v4 2>/dev/null | tr '\n' ' ' || true)"
# Sanity: a real list has 10+ CIDRs; otherwise keep the baked-in copy.
if [ "$(echo "$RANGES" | wc -w)" -lt 10 ]; then RANGES="$FALLBACK_V4"; SRC="baked-in list"; else SRC="cloudflare.com/ips-v4"; fi

iptables -N QR_CF 2>/dev/null || iptables -F QR_CF
for r in $RANGES; do iptables -A QR_CF -s "$r" -j RETURN; done
iptables -A QR_CF -p tcp -j DROP

# Replace (not duplicate) the jump rule.
while iptables -D DOCKER-USER -i "$IFACE" -p tcp -m conntrack --ctorigdstport "$PORT" -j QR_CF 2>/dev/null; do :; done
iptables -I DOCKER-USER 1 -i "$IFACE" -p tcp -m conntrack --ctorigdstport "$PORT" -j QR_CF

echo "QR_CF: $(echo "$RANGES" | wc -w) Cloudflare ranges ($SRC) allowed on $IFACE:$PORT, everything else dropped."
