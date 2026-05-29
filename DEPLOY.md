# Деплой

На сервере:

```bash
git clone <repo> diplom && cd diplom
chmod +x deploy.sh && ./deploy.sh
```

Всё. Пароли и `.env` создаются сами. Сайт на порту 80.

GigaChat (анализ еды) — допиши в `.env` ключ `GIGACHAT_AUTH_KEY` и перезапусти: `docker compose up -d`.
