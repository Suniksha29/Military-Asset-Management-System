#!/bin/bash
set -e

echo "Building and starting Military Asset Management System (MAMS)..."

# Build the Spring Boot backend
cd backend
echo "Building Spring Boot application..."
mvn clean package -DskipTests

# Run the built JAR
echo "Starting Spring Boot application on port 8081..."
java -jar target/*.jar

