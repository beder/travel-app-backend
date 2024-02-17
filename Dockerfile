# syntax=docker/dockerfile:1

ARG NODE_VERSION=20.10.0

# Use node image.
FROM node:${NODE_VERSION}

# Set the working directory in the container.
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install TypeScript globally
RUN npm install -g @nestjs/cli

# Install the application dependencies
RUN npm install

# Copy the application code to the working directory
COPY . .

# Expose the port on which the application will run
EXPOSE 4000

# Command to run the application
CMD ["npm", "run", "start:dev"]
