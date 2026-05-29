#!/bin/sh
set -e

echo "[api] ждём БД и накатываем миграции..."
for i in $(seq 1 60); do
	npx prisma migrate deploy && break
	sleep 2
done

exec "$@"
