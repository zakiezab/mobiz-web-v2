# Troubleshooting: Sanity CMS Changes Not Reflecting on Frontend

If changes made in Sanity CMS are not appearing on your website, follow these steps:

## Quick Fixes

### 1. **Restart Your Development Server**
```bash
# Stop the server (Ctrl+C) and restart
pnpm dev
```

### 2. **Clear Browser Cache**
- **Hard Refresh:** `Cmd + Shift + R` (Mac) or `Ctrl + Shift + R` (Windows/Linux)
- Or clear browser cache completely

### 3. **Verify Content is Published**
- In Sanity Studio, make sure you clicked **"Publish"** (not just "Save as draft")
- Unpublished changes won't appear on the frontend

## Configuration Check

### Development Mode
The service page is configured to:
- **Disable CDN** (`useCdn: false`) - Ensures fresh data immediately
- **Force dynamic rendering** - Bypasses static generation cache
- **Revalidate: 0** - Always fetches fresh data

### Production Mode
- **CDN enabled** - For better performance
- **Revalidate: 60 seconds** - Updates every minute
- **ISR (Incremental Static Regeneration)** - Automatically updates pages

## Common Issues

### Issue 1: Changes Not Appearing in Development

**Solution:**
1. **Restart the dev server:**
   ```bash
   pnpm dev
   ```

2. **Check Sanity client configuration:**
   - File: `apps/web/src/lib/sanity.client.ts`
   - Should have: `useCdn: process.env.NODE_ENV === 'production'`
   - This means CDN is **disabled in development**

3. **Check page revalidation:**
   - File: `apps/web/src/app/services/[slug]/page.tsx`
   - Should have: `export const revalidate = 0` in development
   - Should have: `export const dynamic = 'force-dynamic'` in development

### Issue 2: Changes Not Appearing in Production

**Solution:**
1. **Wait for revalidation** (up to 60 seconds)
2. **Trigger manual revalidation:**
   - Use Vercel's "Redeploy" feature
   - Or set up webhooks (see below)

3. **Check if CDN is caching:**
   - The page revalidates every 60 seconds
   - Changes should appear within 1 minute

### Issue 3: Static Generation Cache

**Solution:**
The page uses `generateStaticParams()` which pre-generates pages at build time. In development, this is bypassed with `dynamic = 'force-dynamic'`.

**To force refresh:**
1. Restart the dev server
2. Clear `.next` cache:
   ```bash
   rm -rf .next
   pnpm dev
   ```

## Setup Webhooks (Recommended for Production)

To automatically rebuild your site when content changes in Sanity:

### Step 1: Create Webhook in Sanity

1. Go to [Sanity Manage](https://www.sanity.io/manage)
2. Select your project
3. Go to **API** → **Webhooks**
4. Click **Create webhook**
5. Configure:
   - **Name:** Vercel Rebuild
   - **URL:** Your Vercel deployment URL (get from Vercel dashboard)
   - **Dataset:** production
   - **Trigger on:** Create, Update, Delete
   - **Filter:** `_type == "servicePage"`

### Step 2: Configure Vercel

1. Go to your Vercel project dashboard
2. Go to **Settings** → **Git**
3. Enable **"Deploy Hooks"**
4. Create a deploy hook
5. Use this URL in Sanity webhook configuration

### Step 3: Test Webhook

1. Make a change in Sanity
2. Publish the change
3. Check Vercel dashboard for automatic deployment

## Manual Refresh Methods

### Method 1: Restart Dev Server
```bash
# Stop server (Ctrl+C)
pnpm dev
```

### Method 2: Clear Next.js Cache
```bash
rm -rf .next
pnpm dev
```

### Method 3: Hard Refresh Browser
- **Mac:** `Cmd + Shift + R`
- **Windows/Linux:** `Ctrl + Shift + R`

### Method 4: Redeploy (Production)
- Go to Vercel dashboard
- Click "Redeploy" for your project

## Verify Configuration

### Check Service Page Configuration

**File:** `apps/web/src/app/services/[slug]/page.tsx`

Should have:
```typescript
export const revalidate = process.env.NODE_ENV === 'development' ? 0 : 60;
export const dynamic = process.env.NODE_ENV === 'development' ? 'force-dynamic' : 'auto';
```

### Check Sanity Client Configuration

**File:** `apps/web/src/lib/sanity.client.ts`

Should have:
```typescript
useCdn: process.env.NODE_ENV === 'production'
```

This means:
- **Development:** CDN disabled (fresh data)
- **Production:** CDN enabled (with revalidation)

## Testing

### Test 1: Verify Sanity Data
1. Open Sanity Studio
2. Check that content is published
3. Verify the correct dataset is selected

### Test 2: Verify Frontend Fetching
1. Check browser console for errors
2. Check network tab for Sanity API calls
3. Verify API responses contain new data

### Test 3: Verify Revalidation
1. Make a change in Sanity
2. Publish the change
3. Wait 60 seconds (in production) or restart dev server (in development)
4. Check if changes appear

## Still Not Working?

### Check Environment Variables

Verify these are set correctly:
```env
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
2. **Restart dev server** after configuration changes
3. **Use webhooks** for automatic deployments in production
4. **Wait for revalidation** in production (up to 60 seconds)
5. **Clear browser cache** if changes still don't appear

## Expected Behavior

### Development Mode
- Changes appear **immediately** after restarting dev server
- No CDN caching
- Dynamic rendering (no static generation cache)

### Production Mode
- Changes appear within **60 seconds** (revalidation interval)
- CDN enabled for performance
- ISR (Incremental Static Regeneration) handles updates

## Need More Help?

- Check Sanity documentation: https://www.sanity.io/docs
- Check Next.js documentation: https://nextjs.org/docs
- Review the service page code: `apps/web/src/app/services/[slug]/page.tsx`
- Review Sanity client: `apps/web/src/lib/sanity.client.ts`

