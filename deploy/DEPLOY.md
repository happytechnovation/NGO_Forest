# Deploying Treelands Foundation

Hosts the site at **https://treelands.happytechnovation.com/** on your existing VPS
(`147.93.102.50`), alongside your other 7 sites — no port or domain conflicts.

## How it fits your existing setup

Your VPS already runs each frontend as a Docker container behind the **host (system) nginx**,
which terminates HTTPS per-subdomain and reverse-proxies to the container's host port. Treelands
follows the exact same pattern your `jobportal.happytechnovation.com` already uses.

```
Browser ──HTTPS──> host nginx (443)
                   server_name treelands.happytechnovation.com
                   proxy_pass http://localhost:3006
                                     │
                                     ▼
                   Docker container "treelands-foundation"
                   nginx :3000  (serves the static React build)
```

### Port allocation (verified against the live server)

| Port | Used by |
|------|---------|
| 3000 | react-production |
| 3001 | react-test |
| 3003 | jobportal-prod |
| 3005 | praja-react-production |
| **3006** | **Treelands (this site)** ✅ free |

To change it, edit `PORT` in **both** `deploy/deploy.env` and `deploy/one-click-deploy-prod.bat`,
and the `proxy_pass` port in `deploy/treelands.happytechnovation.com.conf`.

## One prerequisite — DNS

Add a DNS **A record** for the subdomain (happytechnovation.com already points here for jobportal):

```
treelands   A   147.93.102.50
```

Wait until `nslookup treelands.happytechnovation.com` returns `147.93.102.50`. The first deploy
issues a Let's Encrypt certificate via certbot, which **requires DNS to resolve first**.
If you also publish an `AAAA` record, it must point at this same VPS or be removed until this
server is serving IPv6. A stale `AAAA` record can make browsers and certbot hit the wrong nginx
site even when the IPv4 address is correct.

## Deploy

From the project root on your Windows machine (Docker Desktop running):

```bat
deploy\one-click-deploy-prod.bat
```

What it does (8 steps):
1. Verifies Docker is running
2. Clean `npm run build`
3. Builds the Docker image (`deploy/Dockerfile`)
4. Local smoke test on `http://localhost:3998/health`
5. Uploads image + configs to the VPS (`pscp`)
6. Loads the image and (re)starts the container on port **3006**
7. Issues the SSL cert (first run only) and installs the nginx site
8. Verifies `https://treelands.happytechnovation.com/health` when HTTPS is installed, or
   `http://treelands.happytechnovation.com/health` when the script had to fall back to HTTP

Re-running it redeploys (rebuild → ship → replace container). The cert step is skipped once the
certificate exists.

## Files in this folder

| File | Role |
|------|------|
| `Dockerfile` | Multi-stage: build Vite SPA → serve with nginx (internal port 3000, `/health`) |
| `nginx.conf` | **Container** nginx — static serve + SPA history fallback + asset caching |
| `treelands.happytechnovation.com.conf` | **Host** nginx site — HTTPS + proxy to port 3006 |
| `deploy.env` | Single source of config (server, domain, port, container/image names, cert email) |
| `remote/deploy-container.sh` | Runs on VPS: load image, replace container, health-check |
| `remote/setup-nginx-ssl.sh` | Runs on VPS: certbot (first run) + install nginx site + reload |
| `one-click-deploy-prod.bat` | Orchestrates the whole deploy from Windows |

## Notes

- **EmailJS:** to make the contact form send (instead of the `mailto:` fallback), add your
  `VITE_EMAILJS_*` keys to a `.env` file at the project root **before** deploying — they get baked
  into the build. See `.env.example`.
- **Rollback:** the previous image stays on the server until pruned. To roll back, re-run an
  earlier build, or `docker run` a prior image tag on port 3006.
- **Logs:** deploy output is written to `deploy/remote.log`, `deploy/build.log`, `deploy/docker.log`.
- **DNS gotcha:** if the domain has an `AAAA` record and this VPS is not serving IPv6 for the site
  yet, certbot can fail and browsers may show a default nginx page. Remove or correct the `AAAA`
  record before retrying the deploy.
- **Security:** `deploy.env` and the `.bat` contain the server password. Keep this folder private
  (it's outside the app bundle and not served). Consider switching to SSH keys later.
