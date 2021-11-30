##
## STEP 1: Build the React app
##

FROM node:13-alpine as build-stage

COPY ./ /app/
COPY ./deployment/docker/nginx.conf /app/
COPY ./deployment/docker/env.sh /app/

# Build the React app
WORKDIR /app
RUN yarn install
RUN yarn build


##
## STEP 2a: Serve the static React app in Nginx
##

FROM nginx:1.15 as app-static

# Add bash
RUN apt-get update && apt-get install bash

COPY --from=build-stage /app/build/ /usr/share/nginx/html

# Copy the default nginx.conf provided by tiangolo/node-frontend
COPY --from=build-stage /app/nginx.conf /etc/nginx/conf.d/default.conf

# Copy .env file and shell script to container
COPY --from=build-stage /app/env.sh /usr/share/nginx
WORKDIR /usr/share/nginx

# Make our shell script executable
RUN chmod +x env.sh

# Run the script along with the nginx process
WORKDIR /usr/share/nginx/html
CMD ["/bin/bash", "-c", "/usr/share/nginx/env.sh && nginx -g \"daemon off;\""]


##
## STEP 2b: Serve Node server dynamic index page
##

FROM node:13-alpine as app-server

WORKDIR /app/
COPY --from=build-stage /app/build ./build

# COPY --from=build-stage /app/server/build ./build
# COPY --from=build-stage /app/server/node_modules ./node_modules

ENV NODE_ENV production

# Build the Node server
WORKDIR /app/server
COPY ./server/ .
RUN yarn install
RUN yarn build

RUN ls -la .

CMD ["yarn", "serve"]
