# Stage 1: Build the app
FROM node:14 AS builder

WORKDIR /app

# Copy package files and dependencies
COPY package*.json ./

# Install app dependencies
RUN npm install --production

# Copy rest of the code
COPY . .

# Build the app
RUN npm run build

# Stage 2: Create a production-ready image
FROM node:14

WORKDIR /app

# Copy built app from the previous stage
COPY --from=builder /app .

# Install production dependencies only
RUN npm install --production

# Generate Prisma client
RUN npx prisma generate

EXPOSE 3000

CMD [ "npm", "run", "start:prod" ]
