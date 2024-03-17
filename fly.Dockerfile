FROM node:20.11.1

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8000

RUN npx prisma generate

RUN npm run build

CMD ["npm", "run", "start:prod"]
