#!/bin/bash

docker run -d -p 9000:8080 -p 50000:50000 --mount source=jenkins_volume,target=/var/jenkins_home --name jenkins.dipeshy dipeshy/jenkins