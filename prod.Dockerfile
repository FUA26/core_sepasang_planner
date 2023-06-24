# Stage 1: Build the app
FROM node:14 AS builder

WORKDIR /app

# Copy package files and dependencies
COPY package*.json ./
COPY prisma ./prisma/
# Install app dependencies
RUN npm install

# Copy rest of the code
COPY . .

# Build the app
RUN npm run build

# Stage 2: Create a production-ready image
FROM node:14

WORKDIR /app

# Copy built app from the previous stage
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist

# Install production dependencies only
RUN npm install --production

# Generate Prisma client
RUN npx prisma generate

EXPOSE 3000

CMD [ "npm", "run", "start:prod" ]
