# Treelands Foundation — multi-stage build: build the Vite SPA, then serve via nginx.
# Build context = project root.  Build:  docker build -f deploy/Dockerfile -t treelands-foundation:prod .

### Build Stage ###
FROM node:20-alpine AS build
WORKDIR /app

# Install deps first (layer caching). npm install (not ci) so platform-specific
# optional deps like @rollup/rollup-linux-x64-musl resolve correctly on alpine/musl.
COPY package.json package-lock.json* ./
RUN npm install --no-audit --no-fund

# Copy only what the build needs
COPY src ./src
COPY public ./public
COPY index.html tsconfig.json vite.config.ts tailwind.config.ts postcss.config.js ./
# Optional env (.env.example always exists; real .env is git-ignored and optional)
COPY .env* ./

# Unused build arg kept for compatibility with the deploy script's --build-arg
ARG BUILD_ENV=production
ENV NODE_OPTIONS="--max-old-space-size=4096"
RUN npm run build

### Runtime Stage ###
FROM nginx:alpine AS runtime
RUN apk add --no-cache curl

# Internal nginx config (serves SPA on port 3000 with /health + history fallback)
COPY deploy/nginx.conf /etc/nginx/conf.d/default.conf

# Built static assets
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
  CMD curl -f http://localhost:3000/health || exit 1

CMD ["nginx", "-g", "daemon off;"]
