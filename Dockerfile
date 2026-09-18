FROM node:lts-alpine@sha256:ebfe2f90462722a7a4de65e91990e97fe0d401c70e0e762c5b53302f905ec1c1 as builder

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

USER node
WORKDIR /home/node

COPY --chown=node:node . .
RUN mv .docker.yarnrc.yml .yarnrc.yml
RUN mv .docker.next.config.js next.config.js

RUN yarn && yarn build

FROM node:lts-alpine@sha256:ebfe2f90462722a7a4de65e91990e97fe0d401c70e0e762c5b53302f905ec1c1 as runner

EXPOSE 3000

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

USER node
WORKDIR /home/node

COPY --from=builder --chown=node:node /home/node/public ./public
COPY --from=builder --chown=node:node /home/node/.next/standalone ./
COPY --from=builder --chown=node:node /home/node/.next/static ./.next/static

CMD ["node", "server.js"]