#!/bin/bash

COMMIT_HASH=$(git log --pretty=oneline | head -1 | cut -d ' ' -f 1)

docker build -f ./docker/Dockerfile -t "0l.fyi/front:${COMMIT_HASH:0:8}" .

