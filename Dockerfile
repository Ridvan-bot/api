# Use Node.js as the base image
FROM node:20

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY ["package*.json", "./"]

# Install dependencies
RUN npm install sharp

# Copy the rest of the application code
COPY . .

# Expose the application port
EXPOSE 3000

# Build the TypeScript code
RUN npm run build

# Command to run the application
CMD ["npm", "run","start"]
