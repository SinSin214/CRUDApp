FROM node:16
ARG NODE_ENV
WORKDIR /
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm install 
# RUN mv node_modules ./
COPY . .
EXPOSE 3000
COPY --chown=node:node server.js .
USER node
CMD ["node", "server.js"]
