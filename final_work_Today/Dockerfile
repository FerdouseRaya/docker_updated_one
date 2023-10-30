FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8000

#CMD [ "npm", "run","start" ]
# CMD ["node","app.js","npm", "run","start" ]
CMD ["node", "app.js"]

