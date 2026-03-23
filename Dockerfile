FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Serve static files
WORKDIR /app/dist

# Copy en.html to en/index.html for /en route
RUN mkdir -p en && cp en.html en/index.html

RUN npm install -g serve

EXPOSE 3000
CMD ["serve", "-p", "3000", "-s", "."]
