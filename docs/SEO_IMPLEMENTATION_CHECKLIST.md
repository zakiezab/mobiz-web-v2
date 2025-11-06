# SEO Implementation Checklist

## Overview

This checklist guides you through the final steps to complete SEO optimization for the Mobiz website, based on the keyword mapping from `docs/marketing/AI-Enabled B2B.md`.

**Status:** Technical foundation complete ✅
**Remaining:** Content population and validation

---

## ✅ Completed (Technical Foundation)

### Phase 1: Schema Updates
- [x] Added `metaKeywords` array field to `servicePage` schema
- [x] Added complete SEO object to `caseStudy` schema (title, description, keywords, ogImage)
- [x] Added `keywords` array to `homepage` SEO object
- [x] Added `keywords` array to `article` SEO object

### Phase 2: Structured Data Enhancements
- [x] Fixed Organization schema with proper logo (`/images/mobiz-logo.png`, 1243x696)
- [x] Added Organization description, contactPoint, foundingDate
- [x] Fixed Article schema logo and added `mainEntityOfPage`
- [x] Enhanced CaseStudy schema with `datePublished` field

### Phase 3: Automation & Routes
- [x] Created SEO metadata update script (`apps/web/scripts/update-seo-metadata.ts`)
- [x] Added `pnpm update:seo` command to package.json
- [x] Created `/thought-leadership` → `/insights` redirect
- [x] Created On-Page SEO Optimization prompt (`docs/marketing/prompts/on-page-seo-prompt.md`)
- [x] Build verification passed (no TypeScript errors)

---

## 📋 Phase 4: Content Population (TODO)

### Step 1: Run SEO Metadata Update Script

Update all Sanity documents with SEO keywords:

```bash
pnpm update:seo
```

**This will populate:**
- Homepage keywords
- 4 Service page keywords (cloud-transformation, ai-data-platforms, etc.)
- 8 Case study keywords (based on industry + execution type)
- Execution hub and Delivered Value page keywords
- Base keywords for articles

**Note:** The script only updates documents that don't already have keywords (safe to re-run).

---

### Step 2: Review & Customize in Sanity Studio

Visit **https://n627fp81.sanity.studio** and review each document:

#### Homepage (1 document)
- [ ] Review SEO keywords
- [ ] Verify meta title and description are set
- [ ] Ensure they align with "execution partner" keyword

#### Service Pages (4 documents)
For each service page:
- [ ] **Cloud Transformation**
  - Primary keyword: "enterprise cloud transformation partner"
  - Review meta title, description, keywords
  - Run through on-page SEO prompt

- [ ] **AI & Data Platforms**
  - Primary keyword: "production AI platform partner"
  - Review meta title, description, keywords
  - Run through on-page SEO prompt

- [ ] **Digital Product Engineering**
  - Primary keyword: "enterprise digital product engineering"
  - Review meta title, description, keywords
  - Run through on-page SEO prompt

- [ ] **Core System Modernization**
  - Primary keyword: "legacy system modernization services"
  - Review meta title, description, keywords
  - Run through on-page SEO prompt

#### Case Studies (8 documents)
For each case study:
- [ ] Verify SEO title, description, keywords are set
- [ ] Ensure `featuredImage` has alt text
- [ ] Add `ogImage` if different from featured image
- [ ] Verify industry and executionType tags are correct

#### Articles (variable count)
For each article:
- [ ] Customize SEO keywords (base keywords were added by script)
- [ ] Set meta title and description
- [ ] Add OG image
- [ ] Ensure keywords match article topic

---

### Step 3: On-Page Copy Optimization

Using `docs/marketing/prompts/on-page-seo-prompt.md`, review and optimize copy for:

#### Priority Pages:
1. [ ] Homepage (`/`)
   - Target: "execution partner"
   - Review H1, meta, opening paragraph

2. [ ] Our Model (`/our-model`)
   - Target: "accountability gap in consulting"
   - Review H1, meta, opening paragraph

3. [ ] Execution Hub (`/execution`)
   - Target: "enterprise execution partner"
   - Review H1, meta, opening paragraph

4. [ ] Each Service Page (`/execution/[slug]`)
   - See keywords in Step 2 above
   - Run through on-page SEO prompt

#### Quality Checks:
- [ ] H1 contains primary keyword
- [ ] First sentence of opening paragraph contains primary keyword
- [ ] Meta title is 50-60 characters
- [ ] Meta description is 150-160 characters
- [ ] Copy uses Mobiz voice (declarative, confident, peer-to-peer)
- [ ] Copy avoids "we help," "we can," or hedging language
- [ ] Content anchors to brand pillars (Accountability Gap, Strategy vs Execution, Mobiz Model)

---

## Phase 5: Technical Validation

### Step 1: Structured Data Testing

Test with **Google Rich Results Test**: https://search.google.com/test/rich-results

Test these pages:
- [ ] Homepage - Organization schema
- [ ] Sample article (`/insights/[slug]`) - Article schema
- [ ] Sample case study (`/case-studies/[slug]`) - CaseStudy schema

**Fix any validation errors:**
- Missing required fields
- Invalid image URLs
- Logo dimensions
- Date formats

---

### Step 2: Image Optimization

Ensure all images have proper SEO attributes:

#### Case Studies:
- [ ] All `featuredImage` fields have alt text
- [ ] OG images are 1200x630px (recommended)
- [ ] Images are optimized (< 200KB)

#### Articles:
- [ ] All `heroImage` fields have alt text
- [ ] OG images set for social sharing
- [ ] Images are optimized

#### Logo:
- [ ] Mobiz logo exists at `/public/images/mobiz-logo.png` (1243x696)
- [ ] Logo is optimized for web
- [ ] Logo has transparent background

---

### Step 3: Manual QA

#### Desktop Testing:
- [ ] Visit each core page, verify no "Coming Soon" or fallback text
- [ ] Verify all metadata displays correctly in browser tab
- [ ] Check social share previews (Facebook Sharing Debugger, Twitter Card Validator)

#### Mobile Testing:
- [ ] Homepage responsive
- [ ] /execution page responsive
- [ ] /delivered-value filters work on mobile
- [ ] Case study cards display correctly

#### Route Testing:
- [ ] `/thought-leadership` redirects to `/insights`
- [ ] `/delivered-value/[slug]` redirects to `/case-studies/[slug]`
- [ ] All 4 `/execution/[slug]` routes load content from Sanity
- [ ] `/not-found` (404 page) renders properly

#### Filter Testing:
- [ ] /delivered-value industry filter works
- [ ] /delivered-value execution type filter works
- [ ] Results count updates correctly
- [ ] "Clear filters" button works

---

## Phase 6: Pre-Production Setup

### Step 1: Environment Variables

Set production domain:

```bash
# In production .env
NEXT_PUBLIC_SITE_URL=https://mobizinc.com
```

**Impact:**
- Sitemap will use correct domain
- Structured data will reference correct URLs
- Canonical URLs will be set correctly

---

### Step 2: Sitemap & Robots

#### Verify Sitemap:
- [ ] Navigate to `/sitemap.xml`
- [ ] Verify all routes are present:
  - Static pages (/, /our-model, /execution, etc.)
  - Dynamic /execution/[slug] routes (4)
  - Dynamic /case-studies/[slug] routes (8)
  - Dynamic /insights/[slug] routes (all articles)
  - /delivered-value/[slug] routes (redirects)
- [ ] Verify lastModified dates are correct
- [ ] Verify priorities are set appropriately

#### Verify Robots.txt:
- [ ] Navigate to `/robots.txt`
- [ ] Verify sitemap URL is correct
- [ ] Verify appropriate disallow rules (/api/, /_next/)

---

### Step 3: Submit to Search Console

Once in production:

1. [ ] Add property to Google Search Console
2. [ ] Verify ownership (DNS or meta tag)
3. [ ] Submit `/sitemap.xml`
4. [ ] Monitor initial indexing
5. [ ] Check for crawl errors
6. [ ] Verify mobile usability

---

## Phase 7: Ongoing Monitoring

### Week 1 Post-Launch:
- [ ] Monitor Google Search Console for indexing status
- [ ] Check for any crawl errors
- [ ] Verify structured data validates in Search Console
- [ ] Monitor Core Web Vitals

### Week 2-4:
- [ ] Track keyword rankings for primary keywords:
  - "execution partner"
  - "accountability gap in consulting"
  - "enterprise cloud transformation partner"
  - "production AI platform partner"
  - "legacy system modernization services"
  - "enterprise digital product engineering"

### Monthly:
- [ ] Review search queries in Search Console
- [ ] Identify new keyword opportunities
- [ ] Update content based on performance
- [ ] Add internal links from high-performing pages

---

## Optional Enhancements (Future)

### Canonical URLs
- [ ] Add `metadata.alternates?.canonical` to all pages once final domain is confirmed
- [ ] Especially important if using staging/preview URLs

### URL Query State for Filters
- [ ] Add query params to `/delivered-value` filter state
- [ ] Enables shareable filtered views
- [ ] Better for analytics tracking

### Insights Pagination
- [ ] Implement pagination for `/insights` if article count grows
- [ ] Add featured content block per DEVELOPER_HANDOFF.md:1411

### Internal Linking
- [ ] Add internal links within article/case study body copy
- [ ] Link from case studies to related service pages
- [ ] Link from service pages to relevant case studies
- [ ] Improves site structure and SEO authority flow

---

## Success Criteria

SEO implementation is complete when:

- ✅ All 16+ Sanity documents have SEO keywords populated
- ✅ All meta titles are 50-60 characters
- ✅ All meta descriptions are 150-160 characters
- ✅ All primary keywords appear in H1s
- ✅ All images have alt text
- ✅ Google Rich Results Test passes for all structured data types
- ✅ Sitemap successfully submitted to Search Console
- ✅ No crawl errors in Search Console
- ✅ Mobile usability passes
- ✅ Core Web Vitals in "Good" range

---

## Tools & Resources

### Testing Tools:
- **Google Rich Results Test:** https://search.google.com/test/rich-results
- **Facebook Sharing Debugger:** https://developers.facebook.com/tools/debug/
- **Twitter Card Validator:** https://cards-dev.twitter.com/validator
- **Schema Markup Validator:** https://validator.schema.org/

### SEO Tools:
- **Google Search Console:** https://search.google.com/search-console
- **Google Analytics:** (if configured)
- **Ahrefs/SEMrush:** (for keyword tracking, if subscribed)

### Documentation:
- Keyword Map: `docs/marketing/AI-Enabled B2B.md`
- On-Page SEO Prompt: `docs/marketing/prompts/on-page-seo-prompt.md`
- Developer Handoff: `docs/DEVELOPER_HANDOFF.md`

---

## Commands Reference

```bash
# Run the SEO metadata update script
pnpm update:seo

# Start dev server to test locally
pnpm dev

# Build for production
pnpm build

# Run linting
pnpm lint

# Run tests
pnpm test
```

---

**Last Updated:** 2025-01-03
**Status:** Technical foundation complete, ready for content population
**Next Step:** Run `pnpm update:seo` and begin Sanity Studio reviews
