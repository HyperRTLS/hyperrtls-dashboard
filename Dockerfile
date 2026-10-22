FROM node:lts-alpine@sha256:06d7adf3e0ef61a13f1d28682726366f97a15aa1888c934d3ecec86c33918b53 as builder

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

USER node
WORKDIR /home/node

COPY --chown=node:node . .
RUN mv .docker.yarnrc.yml .yarnrc.yml
RUN mv .docker.next.config.js next.config.js

RUN yarn && yarn build

FROM node:lts-alpine@sha256:06d7adf3e0ef61a13f1d28682726366f97a15aa1888c934d3ecec86c33918b53 as runner

EXPOSE 3000

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

USER node
WORKDIR /home/node

COPY --from=builder --chown=node:node /home/node/public ./public
COPY --from=builder --chown=node:node /home/node/.next/standalone ./
COPY --from=builder --chown=node:node /home/node/.next/static ./.next/static

CMD ["node", "server.js"]