FROM node:22-alpine3.19 as build

WORKDIR /app

COPY package*.json ./

RUN npm i

COPY . .

ARG REACT_APP_API_URL=https://mariposas-digitais-back-bh67dloi7a-ue.a.run.app/api/md-user-service/v1

RUN npm run build

# CMD npx serve@latest build

FROM nginx:1.21.0-alpine
# Copy the ngnix.conf to the container
COPY ngnix.conf /etc/nginx/conf.d/default.conf
# Copy the React app build files to the container
COPY --from=build /app/build /usr/share/nginx/html
# Expose port 80 for Nginx
EXPOSE 80
EXPOSE 8080
# Start Nginx when the container starts
CMD ["nginx", "-g", "daemon off;"]

