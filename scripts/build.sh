#!/bin/bash

# Build script for Task Manager application
set -e

echo "🚀 Starting build process..."

# Build frontend
echo "📦 Building frontend..."
cd client
npm ci
npm run build
echo "✅ Frontend build completed"

# Prepare backend
echo "🔧 Preparing backend..."
cd ../server
npm ci
echo "✅ Backend preparation completed"

# Create build artifacts directory
echo "📁 Creating build artifacts..."
mkdir -p ../build
cp -r client/build ../build/frontend
cp -r server ../build/backend
cp ../README.md ../build/

echo "🎉 Build process completed successfully!"
echo "📂 Build artifacts available in ./build directory"
