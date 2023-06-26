FROM node:16

# Create app directory
WORKDIR /app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

# Clear package cache
RUN rm -rf /var/lib/apt/lists/*

# Update package lists and install OpenJDK 11
RUN apt-get update && \
    apt-get install -y openjdk-11-jdk

# Remove package lists
RUN rm -rf /var/lib/apt/lists/*

# Set Java Home environment variable
ENV JAVA_HOME /usr/lib/jvm/java-11-openjdk-amd64

RUN export JAVA_HOME

# Install Node.js dependencies
RUN npm install

# Bundle app source
COPY . .

# Write entrypoint.sh
CMD ls -ltr && npm test && npm run createReport
