#!/bin/sh

if [ "$FE_DEVELOPMENT" = "true" ]; then
  echo "Shutting down - plug in the VSCode build"
  exit 0
fi

node .