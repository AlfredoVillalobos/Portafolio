FROM node:10.13-alpine

WORKDIR /app

COPY  package*.json ./

RUN npm install

COPY --chown=node:node . .

EXPOSE 4200

CMD npm start