FROM node:14

# Create app directory
WORKDIR /usr/src/app
# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install \
&& npm i nodemon \
&& npm i react-script \
&& npm i react-bootstrap \
&& npm i react-router-dom \
&& npm i bootstrap \
&& npm i axios \
&& npm i redux react-redux redux-thunk

# If you are building your code for production
# RUN npm ci --only=production
COPY . .
# Bundle app source

CMD [ "npm", "start" ]

EXPOSE 3000