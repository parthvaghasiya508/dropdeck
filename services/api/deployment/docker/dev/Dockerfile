FROM node:13-alpine

WORKDIR /usr/src/dropdeck

RUN apk update && apk upgrade && \
    apk add --no-cache bash git openssh

COPY package.json .
COPY yarn.lock .
COPY packages/schema ./packages/schema
COPY services/api ./services/api
RUN yarn install --pure-lockfile --non-interactive

# Build the schema
WORKDIR /usr/src/dropdeck/packages/schema
RUN yarn build

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

WORKDIR /usr/src/dropdeck/services/api

CMD ["yarn", "start"]



