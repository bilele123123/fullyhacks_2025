FROM node:23-slim

WORKDIR /app

COPY package.json package-lock.json* ./

RUN npm install
RUN npm install --save @types/react
RUN npm install -g nodemon


COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start", "nodemon", "--watch", ".", "app/page.tsx"]