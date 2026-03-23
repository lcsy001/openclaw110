FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Serve static files
WORKDIR /app/dist
RUN npm install -g serve

EXPOSE 3000
CMD ["serve", "-p", "3000", "-s", "."]
