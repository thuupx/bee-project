docker-compose --profile kong --env-file .env  -f api-gateway.docker-compose.yml up -d --build &&
docker-compose -f docker-compose.yml up -d
