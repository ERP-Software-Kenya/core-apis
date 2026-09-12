FROM node:22-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm ci --legacy-peer-deps

COPY . .

RUN NODE_OPTIONS="--max-old-space-size=2048" npm run build


FROM node:22-alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci --omit=dev --legacy-peer-deps

COPY --from=builder /app/dist ./dist

EXPOSE 10000

CMD ["node", "dist/main.js"]
