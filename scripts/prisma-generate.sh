#!/bin/sh
set -e

PRISMA_SCHEMAS="./libs/infrastructure/src/lib/prisma/schemas"

for schema in "$PRISMA_SCHEMAS"/*/*.prisma
do
  npx prisma generate --schema=$schema
done
