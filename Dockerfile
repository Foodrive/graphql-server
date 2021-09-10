FROM node:slim
# Pass in node environment during build time
ARG NODE_ENV=development
# Set node environment according to args
ENV NODE_ENV=$NODE_ENV
# Set working directory
WORKDIR /opt/app
# Expose port 8080
ENV PORT=8080
EXPOSE 8080
# Copy the package.json and package-lock.json files
COPY package*.json ./
# Install in production mode
RUN npm install
# Copy all non docker ignored files
COPY . .
# Build and compile typescript
USER node
# Run the built server code
CMD ["npm", "start"]
