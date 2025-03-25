# Step 1: Use an official Node.js image as the base image
FROM node:18 AS build

# Step 2: Set the working directory inside the container
WORKDIR /app

# Step 3: Copy package.json and package-lock.json (if present) for dependencies installation
COPY package*.json ./

# Step 4: Install project dependencies
RUN npm install

# Step 5: Copy the rest of the project files to the container
COPY . .

# Step 6: Build the React app for production
RUN npm run build

# Step 7: Use a lighter image for serving the built app (Nginx)
FROM nginx:alpine

# Step 8: Copy the build files to Nginx's public directory
COPY --from=build /app/dist /usr/share/nginx/html

# Step 9: Expose port 80 for the web server
EXPOSE 80

# Step 10: Start Nginx in the foreground to serve the app
CMD ["nginx", "-g", "daemon off;"]
