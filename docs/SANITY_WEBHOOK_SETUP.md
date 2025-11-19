# Sanity Webhook Setup for Instant Content Updates

This guide explains how to set up Sanity webhooks to instantly update your live website when content changes.

## Current Behavior

**Without webhook (current setup):**
- Changes appear within **60 seconds** automatically (ISR with `revalidate = 60`)

**With webhook (recommended):**
- Changes appear **instantly** (within 1-2 seconds) when you publish in Sanity

## Setup Instructions

### 1. Add Revalidation Secret to Environment Variables

Add this to your `.env.local` (development) and Vercel environment variables (production):

```bash
SANITY_REVALIDATE_SECRET=your-random-secret-here-min-32-chars
```

Generate a secure random secret:
```bash
openssl rand -base64 32
```

### 2. Configure Sanity Webhook

1. Go to [Sanity Manage](https://www.sanity.io/manage)
2. Select your project
3. Go to **API** → **Webhooks**
4. Click **Create webhook**
5. Configure the webhook:

   **Name:** `Vercel Revalidate`
   
   **URL:** 
   ```
   https://your-domain.com/api/revalidate?secret=YOUR_SECRET_HERE
   ```
   
   **Dataset:** `production` (or your dataset name)
   
   **Trigger on:** 
   - ✅ Create
   - ✅ Update
   - ✅ Delete
   
   **Filter (GROQ):**
   ```
   _type == "servicePage" || _type == "caseStudy" || _type == "aboutUsPage" || _type == "category"
   ```
   
   **HTTP method:** `POST`
   
   **API version:** `v2021-06-07` or latest
   
   **Include drafts:** ❌ (unchecked - only revalidate published content)
   
   **Secret:** (optional, for additional security)

6. **Request body format:** Select **JSON**
   
   The webhook will send:
   ```json
   {
     "type": "servicePage",
     "slug": "cloud-transformation"
   }
   ```

7. Click **Save**

### 3. Test the Webhook

1. Make a small change to any page in Sanity (e.g., edit a service page title)
2. Publish the change
3. Check your Vercel logs to see if the webhook was called
4. Visit the page on your live site - it should update within 1-2 seconds

### 4. Verify Webhook is Working

You can check webhook delivery in Sanity:
1. Go to **API** → **Webhooks**
2. Click on your webhook
3. Check **Delivery history** for recent requests
4. Green status = successful, Red = failed

## Troubleshooting

### Webhook not triggering

- **Check the secret:** Ensure `SANITY_REVALIDATE_SECRET` in Vercel matches the secret in the webhook URL
- **Check the URL:** Make sure it's your production domain, not `localhost`
- **Check Vercel logs:** Look for errors in the `/api/revalidate` endpoint
- **Check Sanity webhook history:** See if requests are being sent and if they're successful

### Changes still not appearing

- **Check cache:** Clear your browser cache or test in incognito mode
- **Check CDN:** If using a CDN, it may need additional time to invalidate
- **Fallback:** The 60-second ISR will still work as a fallback if webhook fails

### 401 Unauthorized Error

- The secret in the webhook URL doesn't match `SANITY_REVALIDATE_SECRET`
- Update the secret in both places

## How It Works

1. You publish content in Sanity CMS
2. Sanity sends a POST request to `/api/revalidate` with document type and slug
3. Next.js invalidates the cache for that specific page
4. Next request triggers a fresh rebuild from Sanity
5. Updated content appears instantly

## Supported Document Types

The webhook currently handles:
- `servicePage` → Revalidates `/services/[slug]` and `/services`
- `caseStudy` → Revalidates `/case-studies/[slug]` and `/case-studies`
- `aboutUsPage` → Revalidates `/about-us`
- `category` → Revalidates `/services`

To add more types, update `/apps/web/src/app/api/revalidate/route.ts`.

## Fallback Behavior

Even if the webhook fails or isn't set up, your site will still update automatically:
- Pages are revalidated every 60 seconds (ISR)
- This ensures content is never more than 60 seconds stale

