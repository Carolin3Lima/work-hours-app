#!/bin/bash
docker network create oowlish || true
PORT=3000

docker build \
  -t work_hours_front .
   
docker run -it --rm --name work_hours_front --network oowlish \
  -e PORT=$PORT -e HOST=0.0.0.0 \
  -p $PORT:3000  work_hours_front:latest