FROM node:lts-alpine@sha256:8996bb5821d62a8fd9bb27c1cb07462f3fdce6e47d640c6a881ead0b064ce216 as builder

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

USER node
WORKDIR /home/node

COPY --chown=node:node . .
RUN mv .docker.yarnrc.yml .yarnrc.yml
RUN mv .docker.next.config.js next.config.js

RUN yarn && yarn build

FROM node:lts-alpine@sha256:8996bb5821d62a8fd9bb27c1cb07462f3fdce6e47d640c6a881ead0b064ce216 as runner

EXPOSE 3000

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

USER node
WORKDIR /home/node

COPY --from=builder --chown=node:node /home/node/public ./public
COPY --from=builder --chown=node:node /home/node/.next/standalone ./
COPY --from=builder --chown=node:node /home/node/.next/static ./.next/static

CMD ["node", "server.js"]