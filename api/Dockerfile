# Pull base image from stock node image.
FROM collinestes/docker-node-oracle:8

#install PM2, reference: http://pm2.keymetrics.io/docs/usage/docker-pm2-nodejs
RUN npm install pm2 -g

RUN useradd --user-group --create-home --shell /bin/false nodejs
ENV HOME=/home/nodejs

COPY package*.json $HOME/app/
RUN chown -R nodejs:nodejs $HOME/*

USER nodejs

##install npm for API
WORKDIR $HOME/app
RUN npm install

#Start APP with PM2, reference: http://pm2.keymetrics.io/docs/usage/docker-pm2-nodejs
CMD ["pm2-dev", "pm2.docker.process.yml"]
#CMD ["npm", "start"]
