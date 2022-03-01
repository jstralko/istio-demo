FROM node:14

WORKDIR /usr/src/app

COPY package*.json ./
COPY src src
COPY public public
COPY entrypoint.sh ./

ENV backendIngress="fish.dev.e1.lexi.wkce.app"

RUN npm install

EXPOSE 3000
ENTRYPOINT [ "./entrypoint.sh" ]
CMD [ "npm", "start", "install" ]
