# Step: build frontend
FROM node:22-alpine AS builder-fe
RUN corepack enable

WORKDIR /app

COPY . .

RUN pnpm install --frozen-lockfile

RUN pnpm build:client

# Step: build backend
FROM node:22-alpine AS builder-be
RUN corepack enable

WORKDIR /app

COPY package.json pnpm-*.yaml ./

RUN pnpm install --frozen-lockfile

COPY . .

RUN pnpm build:server

# Step: prod
FROM node:22-alpine
RUN corepack enable

WORKDIR /app

COPY --from=builder-fe /app/dist ./dist
COPY --from=builder-be /app/dist ./dist
COPY --from=builder-be /app/package.json ./
COPY --from=builder-be /app/pnpm-*.yaml ./

RUN pnpm install --prod --frozen-lockfile

# add user
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

EXPOSE 8000

HEALTHCHECK --interval=30s --timeout=30s --start-period=30s --retries=3 \
  CMD curl -f http://localhost:8000/healthcheck || exit 1

CMD ["node", "dist/server.js"]
