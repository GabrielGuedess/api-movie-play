FROM node:latest As development

RUN npm i -g pnpm

WORKDIR /usr/src/app

COPY --chown=node:node pnpm-lock.yaml ./

RUN pnpm fetch --prod

COPY --chown=node:node . .

RUN pnpm install

RUN pnpm prisma generate

USER node

# BUILD

FROM node:latest As build

RUN npm i -g pnpm

WORKDIR /usr/src/app

COPY --chown=node:node pnpm-lock.yaml ./

COPY --chown=node:node --from=development /usr/src/app/node_modules ./node_modules

COPY --chown=node:node . .

RUN pnpm build

ENV NODE_ENV production

RUN pnpm install --ignore-scripts

RUN npx prisma generate

USER node

# PRODUCTION

FROM node:latest As production

COPY --chown=node:node --from=build /usr/src/app/node_modules ./node_modules
COPY --chown=node:node --from=build /usr/src/app/dist ./dist

CMD [ "node", "dist/src/main.js" ]
