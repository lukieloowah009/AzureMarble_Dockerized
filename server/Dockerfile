# Dockerfile for Express backend

# Build Express backend
FROM node:10.16-alpine

# Working directory be app
WORKDIR /usr/src/app

#copy package.json
COPY package.json .

###  Installing dependencies
RUN npm install

# copy local files to app folder
COPY . .

EXPOSE 5000

CMD ["npm","start"]