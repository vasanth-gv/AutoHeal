FROM node:22-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install --omit=dev

COPY src ./src

ENV NODE_ENV=production
ENV PORT=5000
ENV APP_VERSION=1.0.0

EXPOSE 5000

CMD ["node", "src/server.js"]