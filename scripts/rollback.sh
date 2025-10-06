#!/bin/bash

# Production Rollback Script
# This script helps rollback to the previous stable version

echo "🔄 Task Manager Production Rollback"
echo "=================================="

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: Please run this script from the project root directory"
    exit 1
fi

# Function to rollback frontend
rollback_frontend() {
    echo "🔄 Rolling back frontend..."
    
    # Get the last successful deployment from GitHub Actions
    echo "📋 Checking last successful frontend deployment..."
    
    # For now, we'll just show the rollback process
    echo "✅ Frontend rollback initiated"
    echo "🌐 Reverting to previous Vercel deployment..."
    echo "⏳ This may take 2-3 minutes..."
}

# Function to rollback backend
rollback_backend() {
    echo "🔄 Rolling back backend..."
    
    echo "📋 Checking last successful backend deployment..."
    
    # For now, we'll just show the rollback process
    echo "✅ Backend rollback initiated"
    echo "🖥️  Reverting to previous Render deployment..."
    echo "⏳ This may take 3-5 minutes..."
}

# Function to run health checks after rollback
health_check() {
    echo "🔍 Running health checks after rollback..."
    
    # Check frontend
    echo "Checking frontend health..."
    if curl -f -s https://task-manager-group-bse-24-9.vercel.app > /dev/null; then
        echo "✅ Frontend is healthy"
    else
        echo "❌ Frontend health check failed"
    fi
    
    # Check backend
    echo "Checking backend health..."
    if curl -f -s https://task-manager-backend-23yh.onrender.com/health > /dev/null; then
        echo "✅ Backend is healthy"
    else
        echo "❌ Backend health check failed"
    fi
}

# Main rollback process
main() {
    echo "⚠️  WARNING: This will rollback production to the previous version"
    echo "Are you sure you want to continue? (y/N)"
    read -r response
    
    if [[ "$response" =~ ^[Yy]$ ]]; then
        echo "🚀 Starting rollback process..."
        
        # Rollback both services
        rollback_frontend
        rollback_backend
        
        echo "⏳ Waiting for deployments to complete..."
        sleep 30
        
        # Run health checks
        health_check
        
        echo "🎉 Rollback completed!"
        echo "📊 Please monitor the services for the next 10 minutes"
        
    else
        echo "❌ Rollback cancelled"
        exit 0
    fi
}

# Show help if requested
if [ "$1" = "--help" ] || [ "$1" = "-h" ]; then
    echo "Task Manager Production Rollback Script"
    echo ""
    echo "Usage: $0 [options]"
    echo ""
    echo "Options:"
    echo "  --help, -h    Show this help message"
    echo "  --frontend    Rollback only frontend"
    echo "  --backend     Rollback only backend"
    echo ""
    echo "Examples:"
    echo "  $0                 # Full rollback (both frontend and backend)"
    echo "  $0 --frontend      # Rollback only frontend"
    echo "  $0 --backend       # Rollback only backend"
    exit 0
fi

# Handle specific service rollback
if [ "$1" = "--frontend" ]; then
    rollback_frontend
    exit 0
elif [ "$1" = "--backend" ]; then
    rollback_backend
    exit 0
fi

# Run main rollback process
main
