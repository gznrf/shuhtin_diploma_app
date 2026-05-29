# Деплой через Docker Compose

## Требования

- Docker и Docker Compose v2
- Ключ GigaChat (`GIGACHAT_AUTH_KEY`) для анализа питания

## Быстрый старт

```bash
cp .env.example .env
# отредактируйте .env — задайте пароли и JWT_SECRET
docker compose up -d --build
```

Приложение будет доступно на `http://localhost` (порт задаётся в `HTTP_PORT`, по умолчанию 80).

## Сервисы

| Сервис | Описание |
|--------|----------|
| `db` | MySQL 8.4, данные в volume `mysql_data` |
| `api` | Express + Prisma, миграции применяются при старте |
| `web` | Собранный React (Vite) + nginx, проксирует API-запросы на `api` |

## Переменные окружения

Скопируйте `.env.example` в `.env` и задайте:

- `MYSQL_ROOT_PASSWORD`, `MYSQL_PASSWORD` — пароли БД
- `JWT_SECRET` — секрет для JWT (длинная случайная строка)
- `GIGACHAT_AUTH_KEY` — Basic-auth ключ GigaChat
- `HTTP_PORT` — внешний порт (если 80 занят, например `8080`)

## Полезные команды

```bash
# логи
docker compose logs -f

# пересборка после изменений кода
docker compose up -d --build

# остановка
docker compose down

# остановка с удалением БД
docker compose down -v
```

## Локальная разработка (без Docker)

Фронтенд по-прежнему может ходить на `http://localhost:3001`:

```bash
# в корне проекта
VITE_API_URL=http://localhost:3001 npm run dev
```
