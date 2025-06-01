#!/bin/bash

IMAGE_NAME="wartale-xp-calculator:dev"
CONTAINER_NAME="wartale-xp-container"
PORT=3000
PROJECT_DIR=$(pwd)

podman build -t $IMAGE_NAME .

podman rm -f $CONTAINER_NAME 2>/dev/null

podman run -it --rm \
  --name $CONTAINER_NAME \
  -v "$PROJECT_DIR:/app" \
  -w /app \
  -p $PORT:$PORT \
  -e CHOKIDAR_USEPOLLING=true \
  -e BROWSER=none \
  $IMAGE_NAME \
  npm start
