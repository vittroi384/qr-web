#!/usr/bin/env bash
# One-time setup on a fresh Oracle Cloud Ubuntu instance. Run as the default user (ubuntu):
#   curl -fsSL https://raw.githubusercontent.com/<you>/qr-web/main/scripts/server-setup.sh | bash
# or copy this file over and run `bash server-setup.sh`.
set -euo pipefail

REPO="${REPO:-https://github.com/vittroi384/qr-web.git}"
APP_DIR="${APP_DIR:-$HOME/qr-web}"

echo "==> 1/5 Open ports 80/443 in the instance firewall (Oracle images block them by default)"
sudo iptables -C INPUT -m state --state NEW -p tcp --dport 80 -j ACCEPT 2>/dev/null || sudo iptables -I INPUT 6 -m state --state NEW -p tcp --dport 80 -j ACCEPT
sudo iptables -C INPUT -m state --state NEW -p tcp --dport 443 -j ACCEPT 2>/dev/null || sudo iptables -I INPUT 6 -m state --state NEW -p tcp --dport 443 -j ACCEPT
sudo iptables -C INPUT -m state --state NEW -p udp --dport 443 -j ACCEPT 2>/dev/null || sudo iptables -I INPUT 6 -m state --state NEW -p udp --dport 443 -j ACCEPT
sudo DEBIAN_FRONTEND=noninteractive apt-get install -y -q iptables-persistent >/dev/null
sudo netfilter-persistent save >/dev/null

echo "==> 2/5 Install Docker"
if ! command -v docker >/dev/null; then
  curl -fsSL https://get.docker.com | sudo sh
fi
sudo usermod -aG docker "$USER"

echo "==> 3/5 Clone the app (private repo: you will be asked for a GitHub token as the password)"
if [ ! -d "$APP_DIR/.git" ]; then
  git clone "$REPO" "$APP_DIR"
fi
cd "$APP_DIR"

echo "==> 4/5 Create .env with fresh secrets (session key, admin path, database password)"
if [ ! -f .env ]; then
  cp .env.example .env
  SESSION_SECRET=$(openssl rand -hex 32)
  POSTGRES_PASSWORD=$(openssl rand -hex 24)
  ADMIN_PATH="/gate-$(openssl rand -hex 8)"
  sed -i "s|^SESSION_SECRET=.*|SESSION_SECRET=${SESSION_SECRET}|" .env
  sed -i "s|^POSTGRES_PASSWORD=.*|POSTGRES_PASSWORD=${POSTGRES_PASSWORD}|" .env
  # The app container gets DATABASE_URL from docker-compose.yml; drop the local-dev value.
  sed -i "/^DATABASE_URL=/d" .env
  sed -i "s|^ADMIN_PATH=.*|ADMIN_PATH=${ADMIN_PATH}|" .env
  sed -i "s|^DOMAIN=.*|DOMAIN=|" .env
  echo
  echo "    .env created. NOW EDIT IT:  nano .env"
  echo "      ADMIN_PASSWORD=   (long password)"
  echo "      DOMAIN=           (leave empty until your domain's DNS points here)"
  echo "    Your secret admin entry path is: ${ADMIN_PATH}   <- bookmark http://<server-ip>${ADMIN_PATH}"
fi
chmod +x deploy.sh scripts/backup.sh
mkdir -p backups

echo "==> 5/5 Done. Next:"
echo "    1) nano .env   (set ADMIN_PASSWORD; optionally ADMIN_ALLOWED_IPS)"
echo "    2) newgrp docker   (or log out and back in so 'docker' works without sudo)"
echo "    3) ./deploy.sh     (builds and starts; first build takes a few minutes on A1)"
echo "    4) Open http://<server-ip>/  and  http://<server-ip>${ADMIN_PATH:-<ADMIN_PATH>}"
echo "    5) Daily DB backup (cron):  (crontab -l 2>/dev/null; echo \"30 4 * * * $APP_DIR/scripts/backup.sh >> $APP_DIR/backups/backup.log 2>&1\") | crontab -"
echo "    6) Later: npm run totp-setup inside the container ->  docker compose exec app node scripts/totp-setup.mjs"
