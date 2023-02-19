FROM node:lts-alpine3.17


# Create app directory
WORKDIR /usr/src/app

COPY package*.json ./

RUN  apk add --no-cache --virtual g++ make py3-pip
RUN npm install --omit=dev
RUN apk del .gyp

# Bundle app source
COPY . .

EXPOSE 9000


CMD [ "node", "server/server.js" ]