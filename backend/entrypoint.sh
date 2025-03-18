#!/bin/sh
set -e

echo "Waiting for database to be ready..."
/wait-for-it.sh db:5432 -- echo "DB is ready"

# Даем БД немного времени на инициализацию
sleep 2

echo "Applying database migrations..."
if [ -d "prisma/migrations" ] && [ "$(ls -A prisma/migrations)" ]; then
  npx prisma migrate deploy
else
  npx prisma db push
fi

echo "Starting application..."
exec npm run start:prod
