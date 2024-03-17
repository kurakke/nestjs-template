FROM node:20.11.1

WORKDIR /app

COPY package*.json ./

RUN npm install -g @nestjs/cli

RUN npm install

COPY . .

EXPOSE 8000

CMD ["npm", "run", "start:dev"]
