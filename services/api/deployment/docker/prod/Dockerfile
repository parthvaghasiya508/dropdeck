##
## STEP 1: BUILD
##
FROM node:13-alpine as build-stage

WORKDIR /usr/src/dropdeck

RUN apk update && apk upgrade && \
    apk add --no-cache bash git openssh curl

# Install node-prune (https://github.com/tj/node-prune)
RUN curl -sfL https://install.goreleaser.com/github.com/tj/node-prune.sh | bash -s -- -b /usr/local/bin

COPY package.json .
COPY yarn.lock .
COPY packages/schema ./packages/schema
COPY services/api ./services/api
RUN yarn install --pure-lockfile --non-interactive

# Build the schema
WORKDIR /usr/src/dropdeck/packages/schema
RUN yarn build

# Build the API service
WORKDIR /usr/src/dropdeck/services/api
RUN yarn build

# Remove development dependencies
RUN npm prune --production

# Run node prune
RUN /usr/local/bin/node-prune


##
## STEP 2: RUNTIME
##
FROM node:13-alpine

#
## Installs latest Chromium (77) package.
RUN apk add --no-cache \
      chromium \
      nss \
      freetype \
      freetype-dev \
      harfbuzz \
      ca-certificates \
      ttf-freefont \
      nodejs

# Tell Puppeteer to skip installing Chrome. We'll be using the installed package.
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser

WORKDIR /usr/src/dropdeck

COPY package.json .
COPY yarn.lock .

COPY --from=build-stage /usr/src/dropdeck/packages/schema/package.json /usr/src/dropdeck/packages/schema/package.json
COPY --from=build-stage /usr/src/dropdeck/packages/schema/dist /usr/src/dropdeck/packages/schema/dist
COPY --from=build-stage /usr/src/dropdeck/packages/schema/node_modules /usr/src/dropdeck/packages/schema/node_modules

COPY --from=build-stage /usr/src/dropdeck/services/api/package.json /usr/src/dropdeck/services/api/package.json
COPY --from=build-stage /usr/src/dropdeck/node_modules /usr/src/dropdeck/node_modules
COPY --from=build-stage /usr/src/dropdeck/services/api/node_modules /usr/src/dropdeck/services/api/node_modules


COPY --from=build-stage /usr/src/dropdeck/services/api/build /usr/src/dropdeck/services/api/build

ENV NODE_ENV production

# RUN yarn install --pure-lockfile --non-interactive --production

WORKDIR /usr/src/dropdeck/services/api

CMD ["yarn", "serve"]



