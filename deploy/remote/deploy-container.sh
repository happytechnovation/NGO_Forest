#!/usr/bin/env bash
# Runs ON the VPS. Loads the uploaded image and (re)starts the container.
# Reads config from /tmp/treelands.env (uploaded copy of deploy/deploy.env).
set -e
source /tmp/treelands.env

echo "Loading image ${IMAGE_NAME}:prod ..."
docker load -i /root/treelands-prod.tar

echo "Replacing container '${CONTAINER_NAME}' on host port ${PORT} ..."
docker rm -f "${CONTAINER_NAME}" 2>/dev/null || true
docker run -d --name "${CONTAINER_NAME}" \
  -p "${PORT}:3000" \
  --restart unless-stopped \
  "${IMAGE_NAME}:prod"

echo "Waiting for health ..."
sleep 4
if curl -sf "http://localhost:${PORT}/health" >/dev/null; then
  echo "CONTAINER_HEALTHY"
else
  echo "CONTAINER_UNHEALTHY"
  docker logs --tail 30 "${CONTAINER_NAME}" || true
  exit 1
fi

docker image prune -f >/dev/null 2>&1 || true
rm -f /root/treelands-prod.tar
echo "DEPLOY_OK"
