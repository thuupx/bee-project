#!/bin/bash

DOCKER_COMPOSE_DIR="docker-compose"
KONG_DIR="kong-api-gateway"

for folder in "$DOCKER_COMPOSE_DIR"/*/; do
  echo "$folder"
  if [ -f "${folder}docker-compose.yml" ]; then
    echo "Bringing up services in $folder"
    if [ "$folder" == "$DOCKER_COMPOSE_DIR/$KONG_DIR/" ]; then
      (cd "$folder" && docker-compose --profile kong --env-file ../../.env up -d --build)
    else
      (cd "$folder" && docker-compose up -d --build)
    fi
  fi
done
