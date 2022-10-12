FROM node:18-bullseye-slim

USER node
RUN mkdir /home/node/app && mkdir /home/node/.bump-level
WORKDIR /home/node/app

COPY --chown=node:node . .
RUN npm install && npm run build && npm prune --production

VOLUME [ "/home/node/.bump-level" ]

CMD [ "npm", "start" ]
