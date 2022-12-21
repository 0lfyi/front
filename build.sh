#!/bin/bash

COMMIT_HASH=$(git log --pretty=oneline | head -1 | cut -d ' ' -f 1)
CI_COMMIT_SHA="${COMMIT_HASH:0:8}"

docker build \
  -f ./docker/Dockerfile \
  --build-arg CI_COMMIT_SHA="$CI_COMMIT_SHA" \
  -t "0l.fyi/front:${CI_COMMIT_SHA}" \
  .

