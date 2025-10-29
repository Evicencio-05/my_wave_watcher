#!/usr/bin/env bash
# Build script for Render deployment

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies and build
cd ../frontend
npm install
npm run build

# Move built frontend to backend public folder
mkdir -p ../backend/public
cp -r dist/* ../backend/public/
