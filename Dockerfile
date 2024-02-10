FROM node:20 as build

WORKDIR /usr/app

COPY package.json ./package.json
COPY package-lock.json ./package-lock.json

RUN npm ci

FROM gcr.io/distroless/nodejs20-debian12

WORKDIR /usr/app

COPY --from=build /usr/app/node_modules /usr/app/node_modules
COPY ./validation.js /usr/app/validation.js

CMD ["/usr/app/validation.js"]

