FROM node:14

# Create app directory
WORKDIR /usr/src/app

RUN apt-get update && apt-get install -y postgresql-client
# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install \
&& npm i express \
&& npm i pg \
&& npm i cors \
&& npm i nodemon
# If you are building your code for production
# RUN npm ci --only=production
COPY . .
# Bundle app source


CMD [ "node", "server.js" ]

EXPOSE 8080