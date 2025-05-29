#!/bin/bash

# Запуск контейнеров в фоне
docker compose up -d

# Ожидание инициализации nginx
sleep 5

# Запуск Certbot для получения сертификата (без --dry-run для реального вызова)
docker compose run --rm certbot

# Остановка и удаление контейнеров, сетей, томов
docker compose down -v

# Дополнительно: удаление образов (раскомментировать при необходимости)
docker rmi nginx:alpine certbot/certbot