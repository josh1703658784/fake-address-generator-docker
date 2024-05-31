FROM ghcr.io/linuxserver/baseimage-alpine:3.20

WORKDIR /app
COPY ./src/* /app

RUN apk add --no-cache npm nodejs && \
    npm install && \
    apk del npm

CMD ["node", "/app/app.js"]
