# Base openjdk:8-jdk
FROM jenkins/jenkins:lts

USER root
LABEL maintainer=”dipesh@yadav.com”

#curl -sL https://deb.nodesource.com/setup_10.x | sudo bash -
#RUN curl -sL https://deb.nodesource.com/setup_8.x | bash - \
#    && apt-get install -y nodejs \
#    && node --version && npm --version \
#    && npm -g i yarn \
#    && chown -R jenkins:root /usr/lib/node_modules

RUN apt-get update && \
    apt-get -y install apt-transport-https \
    ca-certificates \
    curl \
    gnupg2 \
    software-properties-common && \
    curl -fsSL https://download.docker.com/linux/$(. /etc/os-release; echo "$ID")/gpg > /tmp/dkey; apt-key add /tmp/dkey && \
    add-apt-repository \
    "deb [arch=amd64] https://download.docker.com/linux/$(. /etc/os-release; echo "$ID") \
    $(lsb_release -cs) \
    stable" && \
    apt-get update && \
    apt-get -y install docker-ce \
    && usermod -aG docker jenkins

USER jenkins
