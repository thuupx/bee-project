###################
# DEVELOPMENT
###################

FROM node:18-alpine As development

RUN npm install -g pnpm
RUN apk add --update python3 make g++ && rm -rf /var/cache/apk/*

WORKDIR /usr/src/app

COPY --chown=node:node . .

RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile

USER node

###################
# PRODUCTION BUILDER
###################

FROM node:18-alpine As builder

RUN npm install -g pnpm

WORKDIR /usr/src/app

COPY --chown=node:node . .

COPY --chown=node:node --from=development /usr/src/app/node_modules ./node_modules

RUN pnpm run db:generate
RUN pnpm run build

ENV NODE_ENV production

RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --prod --frozen-lockfile

USER node

###################
# PRODUCTION
###################

FROM node:18-alpine As production

COPY --chown=node:node --from=builder /usr/src/app/node_modules /app/node_modules
COPY --chown=node:node --from=builder /usr/src/app/package.json /app/
COPY --chown=node:node --from=builder /usr/src/app/dist /app/

RUN ls

WORKDIR /app

CMD ["node", "apps/account-microservice/main.js", "2>&1"]
