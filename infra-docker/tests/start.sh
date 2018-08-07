#!/bin/bash

docker-compose -f docker-compose.yml build hh-webfront
docker-compose -f docker-compose.yml up hh-webfront
container=$(docker-compose -f docker-compose.yml ps -q hh-webfront)
docker cp ${container}:/data/app/reports reports
docker-compose -f docker-compose.yml down