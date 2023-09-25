#!/bin/bash

DOCKER_COMPOSE_DIR="docker-compose"
KONG_DIR="kong-api-gateway"

for folder in "$DOCKER_COMPOSE_DIR"/*/; do
  echo "$folder"
  if [ -f "${folder}docker-compose.yml" ]; then
    echo "Dropping services in $folder"
    (cd "$folder" && docker-compose down)
  fi
done
