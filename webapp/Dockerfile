FROM node:lts-alpine
WORKDIR /usr/src/webapp
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000

CMD ["npm", "run", "start:dev"]