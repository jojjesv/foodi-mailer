FROM node:8

WORKDIR /srv/app

RUN mkdir -p /var/cred
COPY foodicred /var/cred/
COPY package*.json ./
COPY .babelrc ./

RUN npm i

COPY ./src ./src

EXPOSE 3000
CMD ["npx", "babel-node", "src/index.js"]