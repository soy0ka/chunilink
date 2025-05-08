# Builder stage
FROM node:22 AS builder
WORKDIR /app

ENV NODE_ENV=production

RUN corepack enable && corepack prepare yarn@4.9.1 --activate
COPY package.json yarn.lock .yarnrc.yml .yarn/ ./

RUN yarn install --frozen-lockfile
RUN rm -rf .yarn/cache
RUN yarn cache clean

COPY . .
RUN yarn prisma generate && yarn build

# Production stage
FROM node:22-slim AS production
WORKDIR /app

ENV NODE_ENV=production

RUN corepack enable && corepack prepare yarn@4.9.1 --activate

COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.yarnrc.yml ./.yarnrc.yml
COPY --from=builder /app/yarn.lock ./yarn.lock

RUN rm -rf .next/cache
EXPOSE 3000

CMD ["yarn", "start"]
