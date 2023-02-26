FROM node:18-alpine
RUN apk add g++ make py3-pip

EXPOSE 9000

ENV NODE_ENV=production
WORKDIR /app

COPY ["./package.json", "./"]

RUN npm install --omit=dev

COPY . .

CMD ["node", "./server/consumer/server.js"]