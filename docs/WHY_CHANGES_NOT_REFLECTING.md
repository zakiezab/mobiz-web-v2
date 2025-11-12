# Why Sanity CMS Changes Are Not Reflecting on Frontend

## The Problem

You've made changes in Sanity CMS, but they're not appearing on your website frontend.

## Root Causes

### 1. **CDN Caching (Main Issue)**
- **Problem:** Sanity uses a CDN (Content Delivery Network) that caches content for better performance
- **Solution:** We've disabled CDN in development mode (`useCdn: false`)
- **Check:** Verify your `sanity.client.ts` has `useCdn: process.env.NODE_ENV === 'production'`

### 2. **Next.js Static Generation**
- **Problem:** Next.js pre-generates pages at build time using `generateStaticParams()`
- **Solution:** Pages revalidate every 60 seconds (`revalidate: 60`)
- **In Development:** You may need to restart the dev server to see changes immediately

### 3. **Next.js Cache**
- **Problem:** Next.js caches fetch results for performance
- **Solution:** Revalidation settings ensure cache is updated every 60 seconds
- **In Development:** CDN is disabled, so data should be fresh

### 4. **Browser Cache**
- **Problem:** Your browser caches the page HTML
- **Solution:** Hard refresh (`Cmd + Shift + R` or `Ctrl + Shift + R`)

## Quick Fixes

### Fix 1: Restart Dev Server (Most Common)
```bash
# Stop the dev server (Ctrl+C)
# Then restart:
pnpm dev
```

### Fix 2: Clear Next.js Cache
```bash
# Delete the .next cache folder
rm -rf .next
pnpm dev
```

### Fix 3: Hard Refresh Browser
- **Mac:** `Cmd + Shift + R`
- **Windows/Linux:** `Ctrl + Shift + R`

### Fix 4: Verify Content is Published
1. Go to Sanity Studio
2. Make sure you clicked **"Publish"** (not just "Save as draft")
3. Unpublished changes won't appear on the frontend

## Configuration Check

### Current Configuration

**File:** `apps/web/src/lib/sanity.client.ts`
```typescript
// CDN is disabled in development (useCdn: false)
// CDN is enabled in production (useCdn: true)
useCdn: process.env.NODE_ENV === 'production'
```

**File:** `apps/web/src/app/services/[slug]/page.tsx`
```typescript
// Revalidate every 60 seconds
export const revalidate = 60;
```

## Expected Behavior

### Development Mode
- **CDN:** Disabled (`useCdn: false`)
- **Revalidation:** 60 seconds
- **Changes:** Should appear after restarting dev server or within 60 seconds
- **Action Required:** Restart dev server for immediate changes

### Production Mode
- **CDN:** Enabled (`useCdn: true`)
- **Revalidation:** 60 seconds
- **Changes:** Appear within 60 seconds automatically
- **Action Required:** Wait up to 60 seconds for changes

## Why Restart is Needed in Development

Even though CDN is disabled, Next.js still:
1. **Pre-generates pages** at build time
2. **Caches fetch results** for performance
3. **Serves cached pages** until revalidation time expires

Restarting the dev server:
- Clears Next.js cache
- Forces fresh data fetch from Sanity
- Rebuilds pages with latest data

## Alternative Solutions

### Option 1: Use Preview Mode (Recommended)
Use Sanity's preview mode to see draft changes immediately:
1. Set up preview mode in Sanity
2. Use draft client to fetch draft content
3. See changes immediately without publishing

### Option 2: Use Webhooks
Set up webhooks to automatically rebuild your site:
1. Configure webhook in Sanity
2. Trigger rebuild on Vercel when content changes
3. Changes appear after deployment completes

### Option 3: Lower Revalidation Time
Change revalidation to a lower value:
```typescript
export const revalidate = 10; // Revalidate every 10 seconds
```

**Note:** Lower revalidation times may impact performance

## Verification Steps

### Step 1: Check Sanity Client Configuration
```typescript
// File: apps/web/src/lib/sanity.client.ts
useCdn: process.env.NODE_ENV === 'production'
```

### Step 2: Check Page Revalidation
```typescript
// File: apps/web/src/app/services/[slug]/page.tsx
export const revalidate = 60;
```

### Step 3: Verify Content is Published
1. Open Sanity Studio
2. Check that content is **Published** (not draft)
3. Verify you're editing the correct dataset (`production`)

### Step 4: Check Browser Console
1. Open browser DevTools (F12)
2. Check Console for errors
3. Check Network tab for Sanity API calls
4. Verify API responses contain new data

### Step 5: Restart Dev Server
```bash
# Stop server (Ctrl+C)
pnpm dev
```

## Still Not Working?

### Check Environment Variables
```bash
# Verify these are set:
NEXT_PUBLIC_SANITY_PROJECT_ID=n627fp81
NEXT_PUBLIC_SANITY_DATASET=production
```

### Check Dataset
1. In Sanity Studio, verify you're editing the **production** dataset
2. Check that your frontend is querying the same dataset

### Check API Access
1. Verify your Sanity project ID is correct
2. Check that the dataset exists
3. Verify API tokens (if using authenticated requests)

### Enable Debug Logging
Add this to see what's happening:
```typescript
console.log('Service data:', service);
console.log('Environment:', process.env.NODE_ENV);
console.log('CDN enabled:', process.env.NODE_ENV === 'production');
```

## Best Practices

1. **Always publish** changes in Sanity (not just save as draft)
2. **Restart dev server** after making changes in Sanity
3. **Use webhooks** for automatic deployments in production
4. **Wait for revalidation** in production (up to 60 seconds)
5. **Clear browser cache** if changes still don't appear

## Summary

**The main issue is likely:**
1. **CDN caching** - Fixed by disabling CDN in development
2. **Next.js static generation** - Fixed by revalidation settings
3. **Browser cache** - Fixed by hard refresh

**The solution:**
1. **Restart dev server** after making changes in Sanity
2. **Hard refresh browser** to clear cache
3. **Wait 60 seconds** in production for automatic updates
4. **Use webhooks** for automatic deployments

## Need More Help?

- Check Sanity documentation: https://www.sanity.io/docs
- Check Next.js documentation: https://nextjs.org/docs
- Review the troubleshooting guide: `docs/TROUBLESHOOTING_SANITY_UPDATES.md`

