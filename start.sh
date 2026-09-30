#!/bin/bash
set -e

echo "========================================================================="
echo " MILITARY ASSET MANAGEMENT SYSTEM (MAMS) - RAILWAY DEPLOYMENT"
echo "========================================================================="

# Install Node.js dependencies for frontend
echo "1. Installing frontend dependencies..."
cd frontend
npm ci
echo "   Frontend dependencies installed."

# Build the React Vite frontend
echo "2. Building React Vite frontend..."
npm run build
echo "   Frontend built successfully."

# Copy frontend dist to Spring Boot resources
echo "3. Copying frontend build to backend resources..."
cd ../backend
mkdir -p src/main/resources/static
rm -rf src/main/resources/static/*
cp -r ../frontend/dist/* src/main/resources/static/

# Build the Spring Boot backend
echo "4. Building Spring Boot backend..."
mvn clean package -DskipTests

# Run the Spring Boot application
echo "5. Starting Spring Boot application on port 8081..."
java -jar target/*.jar

echo "========================================================================="
echo " Application is running:"
echo "  - Frontend: http://localhost:8081 (served by backend)"
echo "  - Backend API: http://localhost:8081/api"
echo "========================================================================="

