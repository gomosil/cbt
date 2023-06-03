FROM node:12.22.9

WORKDIR /app
COPY package.json ./
COPY public ./public
COPY src ./src

RUN npm install

EXPOSE 3000
CMD npm start
