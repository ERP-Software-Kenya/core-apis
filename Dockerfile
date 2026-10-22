FROM node:22-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm ci --legacy-peer-deps

COPY . .

RUN NODE_OPTIONS="--max-old-space-size=2048" npm run build


FROM node:22-slim

WORKDIR /app

COPY package*.json ./

ENV PUPPETEER_SKIP_DOWNLOAD=true
RUN npm ci --omit=dev --legacy-peer-deps

COPY --from=builder /root/.cache/puppeteer /root/.cache/puppeteer
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/docs ./docs

EXPOSE 10000

CMD ["node", "dist/main.js"]
