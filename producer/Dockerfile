FROM node:lts-alpine

WORKDIR /

COPY package*.json ./

RUN apk --no-cache add curl

RUN npm install

COPY . .

# ENTRYPOINT ["node", "index.js"]
CMD [ "/bin/sh", "-c", "until curl --head localhost:15000 ; do echo Waiting for Sidecar; sleep 3 ; done ; echo Sidecar available; node index.js"]