# Base openjdk:8-jdk
FROM jenkins:2.60.3

USER root
LABEL maintainer=”dipesh@yadav.com”

#curl -sL https://deb.nodesource.com/setup_10.x | sudo bash -
RUN curl -sL https://deb.nodesource.com/setup_8.x | bash - \
    && apt-get install -y nodejs \
    && node --version && npm --version \
    && npm -g i yarn \
    && chown -R jenkins:root /usr/lib/node_modules

USER jenkins
ENTRYPOINT ["/bin/tini", "--", "/usr/local/bin/jenkins.sh"]
