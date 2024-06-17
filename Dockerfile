FROM node:22-alpine3.19

WORKDIR /app

COPY package*.json ./

RUN npm i

COPY . .

ARG REACT_APP_API_URL=https://mariposas-digitais-back-bh67dloi7a-ue.a.run.app/api/md-user-service/v1
RUN npm run build

CMD npx serve@latest build

