#!/bin/sh
set -e

PRISMA_SCHEMAS="./libs/infrastructure/src/lib/prisma/schemas"

SCHEMA=$1

if [[ "$SCHEMA" != "product" && "$SCHEMA" != "account" ]]
then
  echo "Supported schemas: product | account"
  exit 1
else
  npx prisma migrate deploy --schema="$PRISMA_SCHEMAS/$SCHEMA/schema.prisma"
fi
