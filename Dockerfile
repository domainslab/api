FROM node:20.2.0

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ENV NEW_RELIC_NO_CONFIG_FILE=true
ENV NEW_RELIC_DISTRIBUTED_TRACING_ENABLED=true

ENV NODE_ENV=production

EXPOSE 3000

CMD [ "npm", "run", "start" ]
