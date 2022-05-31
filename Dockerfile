FROM node:18.2-alpine3.15 as builder

ENV WORKDIR=/app

#Linux setup
RUN apk update \
  && apk add --update alpine-sdk \
  && apk del alpine-sdk \
  && rm -rf /tmp/* /var/cache/apk/* *.tar.gz ~/.npm \
  && npm cache verify \
  && sed -i -e "s/bin\/ash/bin\/sh/" /etc/passwd
WORKDIR $WORKDIR

COPY . $WORKDIR

# install dependencies
RUN npm install
RUN npm install -g @angular/cli

# build
RUN ng build

FROM nginx:1.22.0-alpine as runner

ENV WORKDIR=/app

WORKDIR $WORKDIR

# copy nginx config
COPY docker/nginx/nginx.conf /etc/nginx/nginx.conf

# copy build from previous container run
COPY --from=builder \
    /app/dist/simple-prm-basic-gui $WORKDIR
