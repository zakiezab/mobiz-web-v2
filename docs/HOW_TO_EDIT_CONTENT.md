# How to Edit Website Content

This guide explains how to edit content on the Mobiz website. You have **two options** depending on your access level and technical skills.

---

## Option 1: Using Sanity CMS (Recommended for Non-Technical Users)

**Best for:** Content editors, marketing team, non-developers  
**Requirements:** Access to Sanity CMS dashboard

### What Can Be Edited in Sanity:

✅ **Homepage Content:**
- Hero metrics (e.g., "100% Accountability", "$2B+ Value Delivered")
- Stats bar items
- Accountability Gap section
- Model items (Clarity & Architecture, Velocity & Execution, etc.)
- Delivered Value stories
- Recognition items
- Services grid
- Technology partners
- Industries showcase
- Contact CTA

✅ **Service Pages:**
- Service titles and descriptions
- Hero headlines and subheadlines
- Problem/solution sections
- Core capabilities
- Proof/metrics
- CTA sections
- SEO metadata

✅ **Other Content:**
- Case studies
- Articles/Insights
- Execution pages
- Delivered value pages
- Technology partners
- Site settings

### How to Access Sanity CMS:

#### Method 1: Sanity Studio (Local)

1. Navigate to the project directory:
   ```bash
   cd apps/web
   ```

2. Start Sanity Studio:
   ```bash
   pnpm sanity dev
   ```

3. Open your browser:
   - Go to **http://localhost:3333**
   - Log in with your Sanity account
   - Start editing!

#### Method 2: Sanity Cloud Studio (Online)

1. Go to [https://www.sanity.io/manage](https://www.sanity.io/manage)
2. Log in with your Sanity account (e.g., `zzabar@mobizinc.com`)
3. Select the **"Mobiz Website"** project
4. Click **"Open Studio"**
5. Start editing!

### Making Changes in Sanity:

1. **Navigate to the content type** you want to edit (e.g., "Homepage", "Service Page")
2. **Click on the document** you want to edit
3. **Make your changes** in the form fields
4. **Click "Publish"** in the top right corner
5. **Changes appear on the website** automatically (may take a few seconds)

### Troubleshooting Sanity Access:

**If you see "Not authorized":**
- Contact someone with access to invite you to the project
- Verify you're signed in with the correct account
- Check that you're accessing the correct project

**If changes don't appear:**
- Make sure you clicked "Publish" (not just "Save as draft")
- Clear your browser cache
- Check if the website is using Sanity data or fallback data

---

## Option 2: Edit Code Directly (For Developers)

**Best for:** Developers, quick content changes, content not in Sanity  
**Requirements:** Code editor, Git knowledge, deployment access

### What Can Be Edited in Code:

✅ **Homepage Fallback Data:**
- File: `apps/web/src/app/page.tsx`
- Look for: `FALLBACK_DATA` constant (around line 25)
- Edit: Hero metrics, stats, partners, industries, etc.

✅ **Static Service Pages:**
- File: `apps/web/src/lib/static-services.ts`
- Edit: Service content that's not yet in Sanity
- Example: Azure Landing Zone page

✅ **Hardcoded Content:**
- Hero section: `apps/web/src/app/page.tsx` (lines 202-208)
- Component content: Various component files in `apps/web/src/components/sections/`

### How to Edit Code:

1. **Open the file** in your code editor
2. **Find the content** you want to change
3. **Make your edits**
4. **Save the file**
5. **Test locally:** Run `pnpm dev` to see changes
6. **Commit and push:** Use Git to commit and push changes
7. **Deploy:** Changes will deploy automatically (if using Vercel)

### Example: Editing Homepage Hero

**File:** `apps/web/src/app/page.tsx`

```typescript
<Hero
  label="Strategy, Executed!"  // ← Edit this
  title="Strategy is speculation."  // ← Edit this
  highlight="Execution is truth."  // ← Edit this
  description="We are the execution partner for F500 technology leaders..."  // ← Edit this
  cta={{ label: "Start the Conversation", href: "#contact" }}
  metrics={heroMetrics}
/>
```

### Example: Editing Static Service

**File:** `apps/web/src/lib/static-services.ts`

```typescript
export const STATIC_SERVICES: Record<string, StaticService> = {
  "azure-landing-zone": {
    slug: "azure-landing-zone",
    title: "Azure Landing Zone",  // ← Edit this
    category: "cloud-services",
    heroHeadline: "Azure Managed Service Providers (MSP)",  // ← Edit this
    heroSubheadline: "Run, optimize and maintain...",  // ← Edit this
    // ... more fields
  },
};
```

### Workflow for Code Edits:

1. **Make changes** in your code editor
2. **Test locally:**
   ```bash
   pnpm dev
   ```
3. **Commit changes:**
   ```bash
   git add .
   git commit -m "Update homepage content"
   git push
   ```
4. **Deploy:** Vercel will automatically deploy (if connected)

---

## Current Content Status

### ✅ Managed in Sanity CMS:
- Service pages (if created in Sanity)
- Case studies
- Articles/Insights
- Execution pages
- Delivered value pages
- Technology partners
- Site settings

### ⚠️ Currently Using Fallback Data:
- **Homepage:** Uses `FALLBACK_DATA` in `page.tsx` (lines 25-173)
  - Hero metrics
  - Stats items
  - Partners
  - Other sections use Sanity data when available

### 📝 Static Content (Not in Sanity):
- **Azure Landing Zone service:** Defined in `static-services.ts`
- **Homepage Hero:** Hardcoded in `page.tsx` (lines 202-208)
- Some component content in individual component files

---

## Recommendations

### For Non-Technical Users:
1. **Get Sanity access** (ask someone with access to invite you)
2. **Use Sanity Studio** to edit content (easier, no code)
3. **Changes appear immediately** after publishing

### For Developers:
1. **Quick edits:** Edit code directly
2. **New content:** Add to Sanity CMS (better long-term)
3. **Static content:** Use `static-services.ts` for services not in Sanity

### For Best Practice:
1. **Use Sanity CMS** for all content (easier to manage)
2. **Migrate static content** to Sanity over time
3. **Use fallback data** only as a backup/resilience measure

---

## Quick Reference

### Start Sanity Studio:
```bash
cd apps/web
pnpm sanity dev
# Open http://localhost:3333
```

### Start Next.js Dev Server:
```bash
pnpm dev
# Open http://localhost:3000
```

### Key Files:
- **Homepage:** `apps/web/src/app/page.tsx`
- **Static Services:** `apps/web/src/lib/static-services.ts`
- **Sanity Schemas:** `apps/web/sanity/schemas/`
- **Service Pages:** `apps/web/src/app/services/[slug]/page.tsx`

### Sanity Content Types:
- **Homepage:** `homepage`
- **Service Pages:** `servicePage`
- **Case Studies:** `caseStudy`
- **Articles:** `article`
- **Execution Pages:** `executionPage`
- **Delivered Value Pages:** `deliveredValuePage`
- **Technology Partners:** `technologyPartner`
- **Site Settings:** `siteSettings`

---

## Getting Help

### Sanity Access Issues:
- Contact project admin to get access
- Check you're using the correct account
- Verify project ID: `n627fp81`

### Content Not Appearing:
- Check if using Sanity data or fallback data
- Verify you clicked "Publish" in Sanity
- Clear browser cache
- Restart dev server

### Code Changes Not Working:
- Check file paths are correct
- Verify TypeScript types match
- Run `pnpm build` to check for errors
- Check browser console for errors

---

## Next Steps

1. **If you have Sanity access:**
   - Start Sanity Studio: `pnpm sanity dev`
   - Edit content in the web interface
   - Publish changes

2. **If you don't have Sanity access:**
   - Request access from project admin
   - Or edit code directly (developer workflow)
   - Consider migrating static content to Sanity later

3. **For new content:**
   - Create it in Sanity CMS (recommended)
   - Or add to static files (temporary solution)

---

**Need more help?** Check the other documentation files:
- `EDITING_SERVICES.md` - Detailed guide for editing services
- `DEVELOPER_HANDOFF.md` - Technical setup guide
- `COMPLETION_SUMMARY.md` - Project overview

