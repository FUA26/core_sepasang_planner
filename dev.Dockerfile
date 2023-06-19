FROM node:14 AS builder

WORKDIR /app

# Copy package files and dependencies
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy rest of the code
COPY . .

EXPOSE 3000

CMD [ "npm", "run", "start:dev" ]