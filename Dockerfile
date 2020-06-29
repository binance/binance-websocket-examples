FROM node:10-alpine

RUN mkdir /app
WORKDIR /app
ADD . /app
ADD package.json /app
ADD package-lock.json /app

RUN npm install

ENTRYPOINT ["/bin/sh"]