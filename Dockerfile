FROM node:lts-alpine@sha256:9bef0ef1e268f60627da9ba7d7605e8831d5b56ad07487d24d1aa386336d1944 as builder

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

USER node
WORKDIR /home/node

COPY --chown=node:node . .
RUN mv .docker.yarnrc.yml .yarnrc.yml
RUN mv .docker.next.config.js next.config.js

RUN yarn && yarn build

FROM node:lts-alpine@sha256:9bef0ef1e268f60627da9ba7d7605e8831d5b56ad07487d24d1aa386336d1944 as runner

EXPOSE 3000

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

USER node
WORKDIR /home/node

COPY --from=builder --chown=node:node /home/node/public ./public
COPY --from=builder --chown=node:node /home/node/.next/standalone ./
COPY --from=builder --chown=node:node /home/node/.next/static ./.next/static

CMD ["node", "server.js"]