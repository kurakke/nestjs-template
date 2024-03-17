FROM node:20.11.1

WORKDIR /app

COPY package*.json ./

RUN npm install -g @nestjs/cli

RUN npm install

COPY . .

EXPOSE 8000

RUN npx prisma migrate dev --name init

RUN npx prisma generate

CMD ["npm", "run", "start:dev"]
