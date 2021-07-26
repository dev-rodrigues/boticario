FROM node:14

WORKDIR /usr/app

COPY package*.json ./
COPY src ./src
COPY tsconfig.json ./
COPY ormconfig.json ./
COPY swaggerConfig.json ./

RUN npm install

EXPOSE 3333
CMD ["npm","run","dev:server"]