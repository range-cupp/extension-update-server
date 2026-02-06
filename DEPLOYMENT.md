# Deployment Guide

## Option 1: Deploy to Vercel (Recommended - FREE)

### Prerequisites
```bash
npm install -g vercel
```

### Steps
1. Open terminal in this folder
2. Run: `vercel login`
3. Run: `vercel`
4. Follow prompts (accept all defaults)
5. Vercel will give you a URL like: `https://your-project.vercel.app`

### Update Your Extension
Change these lines in your extension's `sidepanel.js`:
```javascript
const UPDATE_URL = 'https://your-project.vercel.app/api/extension/version';
const DOWNLOAD_URL = 'https://your-project.vercel.app/api/extension/download';
```

---

## Option 2: Deploy to Your Existing Server

### If you have a Node.js server:

1. Copy this entire folder to your server
2. SSH into your server
3. Run:
```bash
cd extension-update-server
npm install
npm start
```

4. Use PM2 to keep it running:
```bash
npm install -g pm2
pm2 start server.js --name "extension-updater"
pm2 startup
pm2 save
```

5. Configure nginx to proxy:
```nginx
location /api/extension/ {
    proxy_pass http://localhost:3000;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_cache_bypass $http_upgrade;
}
```

---

## Option 3: Run Locally (Testing Only)

```bash
npm install
npm start
```

Server runs on: http://localhost:3000

---

## After Deployment

### Test Your Endpoints

1. **Version Check:**
   - Visit: `https://your-domain.com/api/extension/version`
   - Should return JSON with version info

2. **Download Test:**
   - Visit: `https://your-domain.com/api/extension/download`
   - Should download the zip file

### Distribute Updated Extension

1. Update `sidepanel.js` with your new URLs
2. Zip the extension
3. Send to your team
4. They install once
5. Future updates happen automatically!

---

## How to Release Future Updates

1. Edit `manifest.json` - bump version (e.g., 1.5.0 → 1.5.1)
2. Zip your extension
3. Replace `public/range-pf-extension.zip` with new zip
4. Update `public/version.json`:
```json
{
  "version": "1.5.1",
  "notes": "Fixed DOB bug, added new feature",
  "downloadUrl": "https://your-domain.com/api/extension/download"
}
```
5. If on Vercel: Run `vercel --prod`
6. If on your server: Restart with `pm2 restart extension-updater`

Done! All users will see update banner automatically.

---

## Monitoring

Check server logs:
```bash
# If using PM2
pm2 logs extension-updater

# If running directly
# Check terminal output
```

---

## Troubleshooting

**CORS errors?**
- Server already configured for CORS
- Check browser console for specific error

**Download not working?**
- Verify zip file is in `public/` folder
- Check file size isn't too large (most hosts limit to 50MB)

**Version check fails?**
- Verify `version.json` is valid JSON
- Check server logs for errors

---

## Security Notes

- This is a public endpoint (no authentication)
- Anyone with the URL can download the extension
- If you need to restrict access, add API key authentication to `server.js`

---

## Cost

**Vercel:** FREE (generous limits, perfect for this)
**Your Server:** Uses minimal resources (<50MB RAM)

---

Need help? Contact chris@range-medical.com
