#!/bin/bash

if [ -f .env ]; then
  source .env
fi

if [ "$FE_DEVELOPMENT" = "true" ]; then
  npm run dev -- --port 8081
else
  node .
fi
