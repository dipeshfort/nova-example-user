FROM node:8.11

LABEL author=dipesh

ENV DEBUG=hh*
ENV PORT=5001

WORKDIR /data/app

COPY . .

RUN npm --version

EXPOSE 5001

CMD ["npm", "start"]
