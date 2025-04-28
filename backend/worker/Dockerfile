# Use an official Node.js runtime as base image
FROM node:14

# Install Python and GCC (for C++)
RUN apt-get update \
    && apt-get install -y --no-install-recommends \
        python3 \
        python3-pip \
        build-essential \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (if present) to /usr/src/app
# This is assuming you are also deploying Node.js applications in this container
COPY package*.json ./

# Install Node.js dependencies
RUN npm install

#build
RUN tsc -b

# Copy the rest of your application code to the container
COPY ./build /usr/src/app/

# Set environment variables if needed
# ENV NODE_ENV=production
ENV REDIS_HOST=
ENV REDIS_QUEUE=

# Expose any ports your app needs
# EXPOSE 8080



# You may also include a command to start your worker process
CMD ["node", "./src/index.js"]
