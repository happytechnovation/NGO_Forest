#!/usr/bin/env bash
# Runs ON the VPS. Ensures a Let's Encrypt cert exists, then installs the
# Treelands nginx site and reloads. Reads config from /tmp/treelands.env.
# Requires: DNS A-record for $SUBDOMAIN -> this server, and certbot installed
# (already present — used by the other happytechnovation.com sites).
set -e
source /tmp/treelands.env
DOMAIN="${SUBDOMAIN}"

echo "Checking DNS resolution for ${DOMAIN} ..."
V4_RESULTS="$(getent ahostsv4 "${DOMAIN}" 2>/dev/null || true)"
V6_RESULTS="$(getent ahostsv6 "${DOMAIN}" 2>/dev/null || true)"
if [ -n "${V6_RESULTS}" ]; then
  echo "WARNING: ${DOMAIN} currently has an IPv6 (AAAA) answer."
  echo "         If that IPv6 does not serve this VPS, Let's Encrypt and browsers"
  echo "         may hit the wrong nginx site. Remove or fix the AAAA record."
fi
if [ -z "${V4_RESULTS}" ]; then
  echo "WARNING: ${DOMAIN} did not return an IPv4 (A) answer from this server."
fi

if [ -d "/etc/letsencrypt/live/${DOMAIN}" ]; then
  echo "Certificate already present for ${DOMAIN}."
  echo "Installing full HTTPS site config ..."
  mv /tmp/treelands-site.conf "/etc/nginx/sites-available/${DOMAIN}"
  ln -sf "/etc/nginx/sites-available/${DOMAIN}" /etc/nginx/sites-enabled/
  nginx -t && systemctl reload nginx
  echo "NGINX_OK"
  exit 0
fi

echo "No certificate for ${DOMAIN} — attempting to issue via certbot (webroot) ..."
mkdir -p /var/www/html
cat > "/etc/nginx/sites-available/${DOMAIN}" <<EOF
server {
    listen 80;
    server_name ${DOMAIN};
    root /var/www/html;
    location /.well-known/acme-challenge/ { root /var/www/html; }
}
EOF
ln -sf "/etc/nginx/sites-available/${DOMAIN}" /etc/nginx/sites-enabled/
nginx -t && systemctl reload nginx

# Run certbot but don't exit script on failure
set +e
certbot certonly --webroot -w /var/www/html -d "${DOMAIN}" \
  --non-interactive --agree-tos -m "${CERTBOT_EMAIL}"
CERTBOT_STATUS=$?
set -e

if [ $CERTBOT_STATUS -eq 0 ]; then
  echo "Certificate issued successfully!"
  echo "Installing full HTTPS site config ..."
  mv /tmp/treelands-site.conf "/etc/nginx/sites-available/${DOMAIN}"
  ln -sf "/etc/nginx/sites-available/${DOMAIN}" /etc/nginx/sites-enabled/
  nginx -t && systemctl reload nginx
  echo "NGINX_OK"
else
  echo "WARNING: Certbot failed. DNS may not be pointed to this server yet."
  echo "If you have an AAAA record for ${DOMAIN}, make sure it points to this VPS"
  echo "or remove it until IPv6 is configured here."
  echo "Installing HTTP-only fallback config for proxying to port 3006 ..."
  
  cat > "/etc/nginx/sites-available/${DOMAIN}" <<EOF
server {
    listen 80;
    server_name ${DOMAIN};

    location / {
        proxy_pass http://localhost:3006;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_set_header X-Forwarded-Host \$host;
        proxy_redirect off;
    }
}
EOF
  nginx -t && systemctl reload nginx
  echo "HTTP_FALLBACK_OK"
fi
