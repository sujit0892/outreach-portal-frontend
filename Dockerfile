FROM node:14
COPY . ./
WORKDIR ./
CMD [ "npm" , "start" ]

