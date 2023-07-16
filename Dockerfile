FROM node:20.0.0-alpine

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

WORKDIR /home/node/app

COPY package*.json ./
COPY tsconfig.json ./

RUN npm install

USER node

RUN ls -a

COPY src ./src

RUN npm run build

EXPOSE 4000

CMD [ "node", "./build/index.js" ]