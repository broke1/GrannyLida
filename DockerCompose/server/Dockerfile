FROM node:20-alpine

WORKDIR /app/server/

COPY package.json  ./

RUN yarn install

COPY .  ./

CMD yarn server

