# Fix: Repeated 404 Errors for `/_next/static/css/app/layout.css`

## Problem
The browser continuously requests `/_next/static/css/app/layout.css` which doesn't exist, causing repeated 404 errors in the terminal. This is a Next.js development mode issue related to Hot Module Replacement (HMR).

## Root Cause
1. **Stale Browser Cache**: The browser has cached references to old CSS files that no longer exist
2. **HMR Loop**: Next.js Hot Module Replacement is trying to reload a non-existent file
3. **Service Workers**: Old service workers might be serving outdated file references
4. **Browser Extensions**: Some extensions (React DevTools, etc.) might be interfering

## Solutions

### Solution 1: Clear Browser Cache and Hard Reload (Recommended)
1. Open your browser's DevTools (F12 or Cmd+Option+I)
2. Go to the **Application** tab (Chrome) or **Storage** tab (Firefox)
3. Click **Clear site data** or **Clear storage**
4. Check all boxes and click **Clear**
5. Hard reload the page: **Cmd+Shift+R** (Mac) or **Ctrl+Shift+R** (Windows/Linux)

### Solution 2: Unregister Service Workers
1. Open DevTools → **Application** tab
2. Click **Service Workers** in the left sidebar
3. Click **Unregister** for any service workers
4. Refresh the page

### Solution 3: Clear Next.js Cache
```bash
cd apps/web
rm -rf .next
pnpm dev
```

### Solution 4: Use Incognito/Private Mode
1. Open your site in an incognito/private window
2. This bypasses cache and extensions
3. If it works, the issue is cache/extensions related

### Solution 5: Disable Browser Extensions
1. Disable all browser extensions
2. Test if the issue persists
3. Re-enable extensions one by one to find the culprit

### Solution 6: Check Network Tab
1. Open DevTools → **Network** tab
2. Filter by "CSS" or "layout.css"
3. Check what's requesting the file
4. Look for the **Initiator** column to see what's causing the request

## Why This Happens
- Next.js bundles CSS files with hashes (e.g., `a21c07ce781c8f1c.css`)
- The browser might have a cached reference to an old file path
- HMR tries to reload the file but it doesn't exist at that path
- This creates a loop of 404 requests

## Prevention
- Regularly clear browser cache during development
- Use **Hard Reload** (Cmd+Shift+R) when CSS changes don't appear
- Keep `.next` directory clean by clearing it occasionally
- Restart the dev server after major changes

## Note
This is a **development-only issue** and doesn't affect production builds. The CSS is properly bundled in production.

## Still Having Issues?
1. Check if the issue persists in a different browser
2. Check if the issue persists after a full restart (browser + dev server)
3. Check the browser console for any JavaScript errors
4. Verify that no custom service workers are registered
5. Check if any browser extensions are interfering

