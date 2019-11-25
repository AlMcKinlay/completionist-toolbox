FROM node:lts

WORKDIR /usr/src/app
COPY server ./server
COPY package.json .
RUN ls
RUN pwd
RUN yarn --production
RUN ls -la node_modules

ENTRYPOINT ["yarn", "start"]