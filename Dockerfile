FROM node:15-alpine

WORKDIR /home/app

COPY ./package.json ./

RUN yarn

COPY ./ ./

CMD yarn start
