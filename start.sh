#!/bin/bash

echo "🏥 Range Medical Extension Update Server"
echo "=========================================="
echo ""

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
    echo ""
fi

echo "✅ Starting server..."
echo ""
echo "Your extension update server will be available at:"
echo "  📡 Version check: http://localhost:3000/api/extension/version"
echo "  📦 Download: http://localhost:3000/api/extension/download"
echo ""
echo "Press Ctrl+C to stop the server"
echo ""

npm start
