const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS for all origins (your extension needs this)
app.use(cors());

// Serve static files from public directory
app.use(express.static('public'));

// API endpoint to check extension version
app.get('/api/extension/version', (req, res) => {
  try {
    const versionFile = path.join(__dirname, 'public', 'version.json');
    const versionData = fs.readFileSync(versionFile, 'utf8');
    const version = JSON.parse(versionData);
    
    console.log(`✅ Version check requested: v${version.version}`);
    
    res.json(version);
  } catch (error) {
    console.error('❌ Error reading version file:', error);
    res.status(500).json({ 
      error: 'Failed to read version information',
      version: '1.5.0' // Fallback version
    });
  }
});

// API endpoint to download latest extension
app.get('/api/extension/download', (req, res) => {
  try {
    const zipFile = path.join(__dirname, 'public', 'range-pf-extension.zip');
    
    // Check if file exists
    if (!fs.existsSync(zipFile)) {
      console.error('❌ Extension zip file not found');
      return res.status(404).json({ error: 'Extension file not found' });
    }
    
    console.log('📦 Serving extension download...');
    
    // Set headers for file download
    res.setHeader('Content-Type', 'application/zip');
    res.setHeader('Content-Disposition', 'attachment; filename=range-pf-extension.zip');
    
    // Stream the file
    const fileStream = fs.createReadStream(zipFile);
    fileStream.pipe(res);
    
    fileStream.on('end', () => {
      console.log('✅ Extension downloaded successfully');
    });
    
    fileStream.on('error', (error) => {
      console.error('❌ Error streaming file:', error);
      res.status(500).json({ error: 'Failed to download extension' });
    });
    
  } catch (error) {
    console.error('❌ Error serving download:', error);
    res.status(500).json({ error: 'Failed to serve extension file' });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    service: 'Range Medical Extension Update Server',
    timestamp: new Date().toISOString()
  });
});

// Root endpoint
app.get('/', (req, res) => {
  res.send(`
    <html>
      <head>
        <title>Range Medical Extension Updates</title>
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            max-width: 600px;
            margin: 50px auto;
            padding: 20px;
            line-height: 1.6;
          }
          h1 { color: #0ea5e9; }
          .endpoint {
            background: #f1f5f9;
            padding: 10px;
            border-radius: 6px;
            margin: 10px 0;
            font-family: monospace;
          }
          .status { color: #10b981; font-weight: bold; }
        </style>
      </head>
      <body>
        <h1>🏥 Range Medical Extension Update Server</h1>
        <p class="status">✅ Server is running</p>
        
        <h2>Available Endpoints:</h2>
        <div class="endpoint">GET /api/extension/version</div>
        <div class="endpoint">GET /api/extension/download</div>
        <div class="endpoint">GET /health</div>
        
        <h2>Quick Test:</h2>
        <ul>
          <li><a href="/api/extension/version">Check Version</a></li>
          <li><a href="/api/extension/download">Download Extension</a></li>
          <li><a href="/health">Health Check</a></li>
        </ul>
      </body>
    </html>
  `);
});

// Start server
app.listen(PORT, () => {
  console.log('🚀 Range Medical Extension Update Server');
  console.log(`✅ Server running on http://localhost:${PORT}`);
  console.log(`📡 Version endpoint: http://localhost:${PORT}/api/extension/version`);
  console.log(`📦 Download endpoint: http://localhost:${PORT}/api/extension/download`);
  console.log('');
  console.log('Press Ctrl+C to stop');
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('👋 SIGTERM received, shutting down gracefully...');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('👋 SIGINT received, shutting down gracefully...');
  process.exit(0);
});
