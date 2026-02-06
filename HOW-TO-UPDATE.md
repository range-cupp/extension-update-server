# How to Release Extension Updates

## Quick Steps (After Initial Setup)

### 1. Update Your Extension
- Edit `manifest.json` → change version number (e.g., `1.5.0` to `1.5.1`)
- Make your code changes
- Zip the extension folder

### 2. Update the Server
```bash
# Copy new zip to public folder
cp range-pf-extension-v1.5.1.zip extension-update-server/public/range-pf-extension.zip

# Edit public/version.json
{
  "version": "1.5.1",
  "notes": "What's new in this version",
  "downloadUrl": "https://YOUR-DOMAIN/api/extension/download"
}
```

### 3. Deploy
```bash
cd extension-update-server
vercel --prod
```

### 4. Done!
All your team members will see an update banner automatically the next time they open the extension!

---

## Example Update Workflow

Let's say you fixed a bug:

```bash
# Step 1: Update extension
cd range-pf-extension-v1.5.0
# Edit manifest.json: "version": "1.5.1"
# Make your bug fix
zip -r ../range-pf-extension-v1.5.1.zip .

# Step 2: Update server
cd ../extension-update-server
cp ../range-pf-extension-v1.5.1.zip public/range-pf-extension.zip

# Edit public/version.json
nano public/version.json
# Change: "version": "1.5.1", "notes": "Fixed DOB bug"

# Step 3: Deploy
vercel --prod

# Done! Users will be notified automatically
```

---

## What Your Team Sees

When an update is available:

```
🎉 Update Available (v1.5.1)
Fixed DOB bug
[Download Update] [Later]
```

They click "Download Update" → unzip → refresh extension. That's it!

---

## Testing Before Release

```bash
# Test locally first
npm start

# Visit http://localhost:3000/api/extension/version
# Should show your new version

# Visit http://localhost:3000/api/extension/download  
# Should download the zip

# If all looks good, deploy to production
vercel --prod
```
