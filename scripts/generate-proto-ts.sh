#!/bin/bash
PROTO_DIR="./libs/infrastructure/src/lib/proto"
INDEX_FILE="${PROTO_DIR}/index.ts"

for PROTO_FILE in "$PROTO_DIR"/*.proto; do
  echo "${PROTO_FILE}"
  if [ -f "${PROTO_FILE}" ]; then
    echo "Generating $PROTO_FILE"
    (protoc --plugin=./node_modules/.bin/protoc-gen-ts_proto \
    --ts_proto_opt=nestJs=true \
    --ts_proto_opt=addGrpcMetadata=true \
    --ts_proto_opt=exportCommonSymbols=false \
    --ts_proto_out=. "$PROTO_FILE")
  fi
done

if [ -f "$INDEX_FILE" ]; then
  rm "$INDEX_FILE"
fi

for TS_FILE in "$PROTO_DIR"/*.ts; do
  echo "${TS_FILE}"
  if [ -f "${TS_FILE}" ]; then
    echo "Updating import $TS_FILE in $INDEX_FILE"
    echo "export * from './$(basename "${TS_FILE%.ts}")';" >> "$INDEX_FILE"
  fi
done

npm run format
