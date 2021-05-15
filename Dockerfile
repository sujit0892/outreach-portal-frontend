FROM node:14

COPY . ./

WORKDIR ./

EXPOSE 3080

CMD [ "npm" , "start" ]

