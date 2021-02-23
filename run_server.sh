#!/bin/bash
docker network create oowlish || true
PORT=3001
docker build \
  -t work_hours .

docker run -d --network oowlish --name mongo \
    mongo 
   
rm -f index.*

docker run -it --rm --name work_hours --network oowlish \
  -e PORT=$PORT -e HOST=localhost -p $PORT:3001 work_hours:latest
