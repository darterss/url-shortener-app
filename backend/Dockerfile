FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

RUN apk add --no-cache bash

COPY . .

RUN npx prisma generate

COPY wait-for-it.sh /wait-for-it.sh
RUN chmod +x /wait-for-it.sh

CMD ["/bin/sh", "-c", "/wait-for-it.sh db:5432 -- echo 'DB is ready' && npx prisma migrate dev --create-only && npx prisma migrate deploy && npm run start:prod"]
