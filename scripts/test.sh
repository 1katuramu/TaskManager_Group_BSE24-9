#!/bin/bash

# Test script for Task Manager application
set -e

echo "🧪 Running test suite..."

# Run backend tests
echo "🔧 Testing backend..."
cd server
npm test
echo "✅ Backend tests passed"

# Run frontend tests
echo "⚛️ Testing frontend..."
cd ../client
npm test -- --coverage --watchAll=false
echo "✅ Frontend tests passed"

echo "🎉 All tests passed successfully!"
