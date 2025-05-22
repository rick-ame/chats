FROM node:22-alpine AS base
RUN corepack enable

WORKDIR /app

COPY package.json pnpm-*.yaml ./

# Step: build frontend
FROM base AS build-fe

COPY . .

RUN pnpm install --frozen-lockfile && \
  pnpm build:client

# Step: build backend
FROM base AS build-be

RUN pnpm install --frozen-lockfile

COPY . .

RUN pnpm build:server

# Step: prod
FROM base AS prod

RUN pnpm install --prod --frozen-lockfile

COPY --from=build-fe /app/dist ./dist
COPY --from=build-be /app/dist ./dist

# add user
RUN apk add --no-cache curl && \
  addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

ENV PORT=8000

EXPOSE ${PORT}

HEALTHCHECK --interval=30s --timeout=10s --start-period=30s --retries=3 \
  CMD curl -f http://localhost:${PORT}/health || exit 1

CMD ["pnpm", "start"]
