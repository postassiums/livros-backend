FROM denoland/deno:alpine-1.44.2

RUN apk update && apk upgrade

WORKDIR /app

COPY . . 

EXPOSE $BACKEND_PORT

ENTRYPOINT [ "deno"]


CMD [ "task","dev"]
