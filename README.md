# Range Medical Extension Auto-Update Server

This project sets up automatic update distribution for your Chrome extension.

## What This Does

Creates two API endpoints on your website:
1. `/api/extension/version` - Returns current version info (JSON)
2. `/api/extension/download` - Serves the latest extension .zip file

When your team opens the extension, it automatically checks for updates and shows a banner if a new version is available.

## Setup Instructions for Claude Code

### 1. Run This Command in Claude Code Terminal

```bash
# Install dependencies
npm install express cors

# Start the server
node server.js
```

The server will run on `http://localhost:3000`

### 2. Test the Endpoints

Open in your browser:
- http://localhost:3000/api/extension/version (should show JSON)
- http://localhost:3000/api/extension/download (should download the zip)

### 3. Deploy to Your Website

**Option A: Vercel (Easiest)**
```bash
npm install -g vercel
vercel login
vercel
```

**Option B: Your Existing Server**
1. Copy these files to your server:
   - `server.js`
   - `public/` folder (with version.json and range-pf-extension.zip)
2. Run: `node server.js`
3. Use nginx/Apache to proxy to port 3000

### 4. Update the Extension's UPDATE_URL

In your extension's `sidepanel.js`, change line 11-12 to:

```javascript
const UPDATE_URL = 'https://YOUR-DOMAIN.com/api/extension/version';
const DOWNLOAD_URL = 'https://YOUR-DOMAIN.com/api/extension/download';
```

## How to Release Updates

### Step 1: Update Your Extension
1. Change version in `manifest.json` (e.g., `1.5.0` → `1.5.1`)
2. Zip the extension folder
3. Name it `range-pf-extension-v1.5.1.zip`

### Step 2: Update the Server
1. Copy the new zip to `public/range-pf-extension.zip` (replace old file)
2. Edit `public/version.json`:
```json
{
  "version": "1.5.1",
  "notes": "Your update notes here",
  "downloadUrl": "https://YOUR-DOMAIN.com/api/extension/download"
}
```
3. Restart the server (if needed)

### Step 3: Notify Your Team
The extension will automatically show an update banner to all users the next time they open it!

## File Structure

```
extension-update-server/
├── server.js              # Express server
├── public/
│   ├── version.json       # Current version info
│   └── range-pf-extension.zip  # Latest extension zip
├── package.json           # Dependencies
└── README.md             # This file
```

## Environment Variables

For production, set these:
- `PORT` - Server port (default: 3000)
- `NODE_ENV` - Set to 'production'

## Troubleshooting

**CORS errors?**
- The server already has CORS enabled for all origins
- If you need to restrict it, edit the `cors()` line in server.js

**Download not working?**
- Make sure the zip file is in the `public/` folder
- Check file permissions

**Version check not working?**
- Verify the UPDATE_URL in your extension matches your server URL
- Check browser console for errors

## Support

Questions? Contact chris@range-medical.com
