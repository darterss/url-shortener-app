FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

RUN apk add --no-cache bash

COPY . .
COPY prisma ./prisma

# Генерация Prisma
RUN npx prisma generate

# Убедитесь, что база данных доступна, прежде чем выполнять миграции
COPY wait-for-it.sh /wait-for-it.sh
RUN chmod +x /wait-for-it.sh

# Выполнение миграций перед запуском приложения
#CMD ["/bin/sh", "-c", "/wait-for-it.sh db:5432 -- npx prisma migrate deploy && npm run start:prod"]
#CMD ["/bin/sh", "-c", "/wait-for-it.sh db:5432 -- echo 'DB is ready' && npx prisma migrate dev && npm run start:dev"]
CMD ["/bin/sh", "-c", "/wait-for-it.sh db:5432 -- echo 'DB is ready' && npx prisma migrate dev --create-only && npx prisma migrate deploy && npm run start:dev"]
