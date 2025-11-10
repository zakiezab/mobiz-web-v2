# How to Edit Services Content

This guide explains how to edit service content in the Mobiz website.

## Option 1: Using Sanity Studio (Recommended)

The services are managed through **Sanity CMS**. You can edit them using the Sanity Studio interface.

### Step 1: Start Sanity Studio

From the project root, run:

```bash
cd apps/web
pnpm sanity dev
```

This will start the Sanity Studio at **http://localhost:3333**

### Step 2: Access the Studio

1. Open your browser and go to `http://localhost:3333`
2. You may need to log in with your Sanity account credentials
3. Once logged in, you'll see the Sanity Studio dashboard

### Step 3: Edit Services

1. In the left sidebar, click on **"Service Page"** (or search for it)
2. You'll see a list of all service pages
3. Click on any service to edit it

### Step 4: Edit Service Fields

Each service page has the following editable fields:

- **Title** - Service name (e.g., "Cloud Transformation")
- **Slug** - URL-friendly identifier (e.g., "cloud-transformation")
- **Category** - Service category:
  - Cloud Services
  - Data & AI
  - Digital Engineering
  - Modernization
- **Kicker** - Short label that appears before the headline (optional)
- **Hero Headline** - Main headline on the service page
- **Hero Subheadline** - Subheading/description for the service
- **Problem Headline** - Problem section headline (optional)
- **Problem Description** - Problem section description (optional)
- **Solution Description** - Solution section description (optional)
- **Core Capabilities** - Array of capability items (title + description)
- **Proof Kicker** - Proof section label (optional)
- **Proof Metric** - Large metric value (e.g., "$47M") (optional)
- **Proof Context** - Proof context text (optional)
- **Proof Body** - Proof body text (optional)
- **Case Study Reference** - Link to a case study (optional)
- **CTA Headline** - Call-to-action headline (optional)
- **CTA Body** - Call-to-action body text (optional)
- **Meta Title** - SEO title (optional)
- **Meta Description** - SEO description (optional)
- **Meta Keywords** - SEO keywords array (optional)

### Step 5: Save Changes

1. Make your edits
2. Click **"Publish"** in the top right corner
3. Changes will be automatically reflected on the website (may take a few seconds)

## Option 2: Using Sanity Cloud Studio

You can also access Sanity Studio directly in the cloud:

1. Go to [https://www.sanity.io/manage](https://www.sanity.io/manage)
2. Log in with your Sanity account
3. Select the "Mobiz Website" project
4. Click on "Open Studio" to access the web-based Studio
5. Edit services as described above

## Option 3: Edit Fallback Data (For Development)

If you want to edit the fallback data used when Sanity is unavailable, edit:

**File:** `apps/web/src/app/services/page.tsx`

Look for the `FALLBACK_SERVICES` constant (around line 28) and modify it:

```typescript
const FALLBACK_SERVICES = [
    {
        number: "01",
        title: "Cloud Transformation",
        description: "Your description here",
        outcome: "Outcome: 40% cost reduction",
        href: "/services/cloud-transformation",
    },
    // ... more services
];
```

**Note:** This is only used as a fallback. For production, always use Sanity CMS.

## Understanding the Service Schema

The service page schema is defined in:
- **File:** `apps/web/sanity/schemas/servicePage.ts`

This file defines all the fields available for editing services. If you need to add new fields, you'll need to:
1. Update the schema in `servicePage.ts`
2. Update the GROQ query in `apps/web/src/lib/sanity.queries.ts`
3. Update the TypeScript types (run `pnpm typecheck:sanity`)
4. Update the service page component to display the new fields

## Viewing Services on the Website

### Services Listing Page
- **URL:** `/services`
- **File:** `apps/web/src/app/services/page.tsx`
- Shows all services with category filtering

### Individual Service Page
- **URL:** `/services/[slug]` (e.g., `/services/cloud-transformation`)
- **File:** `apps/web/src/app/services/[slug]/page.tsx`
- Shows detailed information about a specific service

## Troubleshooting

### Sanity Studio Won't Start
1. Make sure you're in the `apps/web` directory
2. Check that dependencies are installed: `pnpm install`
3. Verify your `.env.local` has the correct Sanity credentials:
   - `NEXT_PUBLIC_SANITY_PROJECT_ID`
   - `NEXT_PUBLIC_SANITY_DATASET`

### Changes Not Appearing
1. Make sure you clicked "Publish" in Sanity Studio
2. Check if the website is using Sanity data or fallback data
3. Clear your browser cache
4. Restart the Next.js dev server: `pnpm dev`

### Can't See Services in Studio
1. Verify you're logged into the correct Sanity project
2. Check that the dataset is set to "production" (or your configured dataset)
3. Verify the schema is properly configured in `sanity.config.ts`

## Additional Resources

- **Sanity Documentation:** [https://www.sanity.io/docs](https://www.sanity.io/docs)
- **GROQ Query Language:** [https://www.sanity.io/docs/groq](https://www.sanity.io/docs/groq)
- **Project Schema:** `apps/web/sanity/schemas/servicePage.ts`
- **Service Queries:** `apps/web/src/lib/sanity.queries.ts`

## Quick Reference

```bash
# Start Sanity Studio
cd apps/web
pnpm sanity dev

# Start Next.js development server
pnpm dev

# Regenerate TypeScript types from Sanity schema
pnpm typecheck:sanity

# Populate Sanity with sample data (if needed)
pnpm populate:sanity
```

