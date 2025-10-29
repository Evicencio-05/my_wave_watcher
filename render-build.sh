#!/usr/bin/env bash
set -e  # Exit on error

echo "📦 Installing backend dependencies..."
cd backend
npm install

echo "📦 Installing frontend dependencies..."
cd ../frontend
npm install

echo "🏗️  Building frontend..."
npm run build

echo "📁 Copying frontend build to backend/public..."
mkdir -p ../backend/public
cp -r dist/* ../backend/public/

echo "✅ Build complete!"
ls -la ../backend/public/
