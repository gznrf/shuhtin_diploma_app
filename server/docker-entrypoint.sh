#!/bin/sh
set -e

echo "Applying database migrations..."
i=1
while [ "$i" -le 30 ]; do
	if npx prisma migrate deploy; then
		break
	fi
	echo "Database not ready yet ($i/30), retrying in 2s..."
	i=$((i + 1))
	sleep 2
done

if [ "$i" -gt 30 ]; then
	echo "Failed to connect to database after 30 attempts"
	exit 1
fi

exec "$@"
