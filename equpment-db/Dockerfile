# Use the official MySQL image from the Docker Hub
FROM mysql:latest

# Set environment variables for MySQL
ENV MYSQL_ROOT_PASSWORD=mySqlPass111!
ENV MYSQL_DATABASE=equpment

# Copy the database backup file into the container
COPY ./equpment-dump.sql /docker-entrypoint-initdb.d/