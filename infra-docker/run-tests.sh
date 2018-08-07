#!/bin/bash

docker-compose -f tests/docker-compose.yml build --build-arg BUILD_NO=99 hh-webfront
docker-compose -f tests/docker-compose.yml up hh-webfront
container=$(docker-compose -f tests/docker-compose.yml ps -q hh-webfront)
docker cp ${container}:/data/app/reports reports
docker-compose -f tests/docker-compose.yml down