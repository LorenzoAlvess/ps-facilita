FROM node:14

WORKDIR /app/frontend

COPY package*.json ./

RUN npm install

COPY . .

CMD ["npm", "start"]
