FROM node:22-slim AS builder

WORKDIR /app

# Skip Chrome download in build stage — only TypeScript compilation needed here
ENV PUPPETEER_SKIP_DOWNLOAD=true

COPY package*.json ./
RUN npm ci --legacy-peer-deps

COPY . .
RUN NODE_OPTIONS="--max-old-space-size=2048" npm run build


FROM node:22-slim

WORKDIR /app

# unzip is required by Puppeteer to extract the bundled Chrome binary on install
# The remaining packages are the system libraries Chrome depends on at runtime
RUN apt-get update && apt-get install -y \
  unzip \
  libglib2.0-0 \
  libnss3 \
  libnspr4 \
  libatk1.0-0 \
  libatk-bridge2.0-0 \
  libcups2 \
  libdrm2 \
  libdbus-1-3 \
  libxcb1 \
  libxkbcommon0 \
  libx11-6 \
  libxcomposite1 \
  libxdamage1 \
  libxext6 \
  libxfixes3 \
  libxrandr2 \
  libgbm1 \
  libpango-1.0-0 \
  libcairo2 \
  libasound2 \
  fonts-liberation \
  ca-certificates \
  --no-install-recommends \
  && rm -rf /var/lib/apt/lists/*

COPY package*.json ./
RUN npm ci --omit=dev --legacy-peer-deps

COPY --from=builder /root/.cache/puppeteer /root/.cache/puppeteer
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/docs ./docs

EXPOSE 10000

CMD ["node", "dist/main.js"]
