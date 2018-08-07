#!/bin/bash

params=$@
echo "Starting docker-compose up with ($params) params"
docker-compose up $params -d jenkins