##
## STEP 1: BUILD
##

FROM node:13-alpine as build-stage

COPY ./ /app/
COPY ./deployment/docker/nginx.conf /app/
COPY ./deployment/docker/env.sh /app/

WORKDIR /app

RUN yarn install
RUN yarn build
RUN ls -la .

##
## STEP 2: EXECUTION
##

FROM nginx:1.15

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
