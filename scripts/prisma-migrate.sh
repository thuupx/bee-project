#!/bin/sh
set -e

PRISMA_SCHEMAS="./libs/infrastructure/src/lib/prisma/schemas"

SCHEMA=$1

MIGRATE_NAME=$2

if [[ "$SCHEMA" != "product" && "$SCHEMA" != "account" ]]
then
  echo "Supported schemas: product | account"
  exit 1
elif [ -z $MIGRATE_NAME ]
then
  echo "Missing migration name"
  exit 1
else
  npx prisma migrate dev --schema="$PRISMA_SCHEMAS/$SCHEMA/schema.prisma" --name=$MIGRATE_NAME
fi
