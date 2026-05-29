#!/bin/sh
set -e
cd "$(dirname "$0")"

rand() {
	if command -v openssl >/dev/null 2>&1; then
		openssl rand -hex 16
	else
		head -c 32 /dev/urandom | od -An -tx1 | tr -d ' \n' | head -c 32
	fi
}

if [ ! -f .env ]; then
	cat > .env <<EOF
MYSQL_ROOT_PASSWORD=$(rand)
MYSQL_PASSWORD=$(rand)
JWT_SECRET=$(rand)$(rand)
GIGACHAT_AUTH_KEY=
GIGACHAT_SCOPE=GIGACHAT_API_PERS
HTTP_PORT=80
EOF
	echo "→ создан .env (пароли сгенерированы автоматически)"
fi

echo "→ сборка и запуск..."
docker compose up -d --build

echo ""
echo "Готово. Сайт: http://$(hostname -I 2>/dev/null | awk '{print $1}' || echo 'localhost'):$(grep '^HTTP_PORT=' .env | cut -d= -f2 || echo 80)"
echo "Логи: docker compose logs -f"
