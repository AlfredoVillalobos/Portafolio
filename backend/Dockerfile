FROM node:10.13-alpine
RUN mkdir -p /app
WORKDIR /api

COPY  package*.json ./
RUN npm install

COPY --chown=node:node . .

EXPOSE 8000

CMD npm start