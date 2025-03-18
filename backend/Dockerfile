FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

RUN apk add --no-cache bash

COPY . .

RUN npx prisma generate

COPY wait-for-it.sh /wait-for-it.sh
RUN chmod +x /wait-for-it.sh

COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

CMD ["/bin/sh", "-c", "/entrypoint.sh"]
