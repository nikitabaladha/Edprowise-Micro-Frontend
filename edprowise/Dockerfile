# Stage 1: Build React frontend using Node
FROM node:22-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./

RUN npm install

# Copy the rest of the app and build it
# COPY . .

# Optional: If you have an .env file for build
COPY .env .env

# Use the official Nginx image
FROM nginx:alpine

# Set working directory inside the container
WORKDIR /usr/share/nginx/html

# Remove default nginx static assets
RUN rm -rf ./*

# Copy the local React build to nginx html directory
COPY build/ .

# Copy a custom nginx config file
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]

