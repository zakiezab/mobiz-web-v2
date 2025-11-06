# Mobiz Website: Developer Handoff & Implementation Guide

## Executive Summary

**Objective:** Convert 3 static HTML prototypes into a production-ready Next.js + Sanity + Vercel website.

**Approach:** "Execution-First" - The HTML files are not a website; they are a **visual system blueprint**. Your job is to componentize this design system and build it in Next.js.

**Timeline:** This document provides a phased approach with clear deliverables at each stage.

---

## Table of Contents

1. [Tech Stack Overview](#tech-stack-overview)
2. [Project Setup](#project-setup)
3. [The 3 HTML Prototypes (Your Blueprint)](#the-3-html-prototypes)
4. [Component Architecture](#component-architecture)
5. [Sanity CMS Setup](#sanity-cms-setup)
6. [Conversion Process (Phase 1)](#conversion-process-phase-1)
7. [Design Handoff Process](#design-handoff-process)
8. [Remaining Pages (Phase 2)](#remaining-pages-phase-2)
9. [Performance & SEO Requirements](#performance--seo-requirements)
10. [Deployment & Launch](#deployment--launch)

---

## Tech Stack Overview

### The "Engineering-First" Stack

This stack reflects Mobiz's first-principles approach to technology. Every choice is intentional.

**Front-End Framework:** Next.js 14+ (App Router)
- Why: Peak performance via static generation, server components, and intelligent caching
- Configuration: TypeScript, App Router, Server Components where possible

**Headless CMS:** Sanity.io
- Why: Open-source studio, GROQ query language, real-time preview, developer-friendly
- Configuration: Sanity Studio served separately via `pnpm sanity dev`

**Hosting/Deployment:** Vercel
- Why: Purpose-built for Next.js, global CDN, automatic deployments, zero-config

**Additional Tools:**
- **Styling:** Tailwind CSS (utility-first, matches the design system)
- **Version Control:** Git + GitHub
- **Package Manager:** pnpm (faster than npm/yarn)

---

## Project Setup

### Step 1: Initialize Next.js Project (pnpm)

```bash
pnpm create next-app@latest mobiz-website
```

**Configuration during setup:**
- ✅ TypeScript
- ✅ ESLint
- ✅ Tailwind CSS
- ✅ App Router
- ✅ `src/` directory
- ❌ Turbopack (not yet stable for production)

### Step 2: Enforce pnpm Usage

```bash
cd mobiz-website
echo "engine-strict=true" > .npmrc
```

This will stop accidental npm usage by erroring if someone installs with another package manager. Stay inside the project directory for the remaining steps.

### Step 3: Install Project Dependencies

```bash
pnpm add next-sanity @sanity/vision @sanity/image-url
pnpm add -D @sanity/cli
```

### Step 4: Initialize Sanity (Embedded Studio)

```bash
pnpm dlx sanity@latest init \
  --project-plan free \
  --create-project "Mobiz Website" \
  --dataset production \
  --output-path sanity
```

Accept the prompts to reuse the existing project and dataset if they already exist. This scaffolds a `sanity/` workspace used by both the embedded Studio and CLI tooling.

### Step 5: Run Sanity Studio Locally

The Studio is served via the Sanity CLI (not bundled inside Next.js) to keep the production build compatible with React 18 + Next 15:

```bash
pnpm sanity dev
```

This spins up the Studio at http://localhost:3333 with live updates. Use the CLI when editing content, and rely on the Next.js `/api/preview` endpoint for in-context previews.

### Step 6: Project Structure

Create this directory structure:

```
mobiz-website/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── layout.tsx          # Root layout (nav + footer)
│   │   ├── page.tsx            # Homepage
│   │   ├── our-model/
│   │   │   └── page.tsx
│   │   ├── technology-partners/
│   │   │   └── page.tsx
│   │   └── execution/
│   │       ├── page.tsx        # Parent hub (to be built)
│   │       └── [slug]/
│   │           └── page.tsx    # Dynamic service pages
│   ├── components/             # React components
│   │   ├── layout/
│   │   │   ├── Navigation.tsx
│   │   │   └── Footer.tsx
│   │   ├── sections/
│   │   │   ├── Hero.tsx
│   │   │   ├── StatsBar.tsx
│   │   │   ├── AccountabilityGap.tsx
│   │   │   └── ... (more sections)
│   │   └── ui/
│   │       ├── Button.tsx
│   │       ├── Card.tsx
│   │       └── ... (reusable elements)
│   ├── lib/
│   │   ├── sanity.client.ts    # Sanity client config
│   │   └── sanity.queries.ts   # GROQ queries
│   └── styles/
│       └── globals.css         # Global styles + Tailwind
├── sanity/
│   ├── schemas/                # Content schemas
│   │   ├── index.ts
│   │   ├── servicePage.ts
│   │   ├── caseStudy.ts
│   │   └── ... (more schemas)
│   ├── lib/
│   │   └── client.ts
├── sanity.config.ts            # Shared Sanity config (used by Studio & GROQ)
├── public/
│   └── ... (images, fonts, etc.)
└── package.json
```

### Step 7: Environment Variables

Create `.env.local`:

```bash
NEXT_PUBLIC_SANITY_PROJECT_ID="your-project-id"
NEXT_PUBLIC_SANITY_DATASET="production"
SANITY_API_TOKEN="your-api-token"
SANITY_PREVIEW_SECRET="long-random-string"
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
NEXT_PUBLIC_GA4_ID="G-XXXXXXXXXX"
RESEND_API_KEY="your-resend-key"
CONTACT_NOTIFICATION_EMAIL="hello@mobiz.com"
```

- Commit an `.env.example` with the variable names (no secrets) and keep `.env.local` out of version control.

### Step 8: Connect to Vercel

```bash
pnpm dlx vercel@latest login
pnpm dlx vercel@latest link
```

Follow the prompts to authenticate and connect your GitHub repository.

### Step 9: Local Development Workflow

- `pnpm dev` – runs the Next.js app (including `/studio`) on port 3000
- `pnpm exec sanity@latest start` – optional: runs the Studio in isolation if deeper debugging is required
- `pnpm exec sanity@latest dataset export production ./backups/production.tar.gz` – recommended for periodic backups

Troubleshooting:
- If you see `Command "npm" not found`, you attempted to install with npm. Use pnpm.
- If Studio fails to load, ensure `sanity.config.ts` exports a default config and that `NEXT_PUBLIC_SANITY_PROJECT_ID` is populated.

---

## The 3 HTML Prototypes

You have been provided with 3 HTML files that serve as your **visual system blueprint**:

### 1. `homepage.html`
**Location:** `docs/homepage.html`
**What it demonstrates:**
- Complete homepage (10 sections)
- Hero layout with metrics
- Stats bar animation
- Service pillars grid
- Contact CTA pattern
- Footer structure

**Your task:** Extract and componentize every section.

### 2. `how_we_work.html`
**Location:** `docs/how_we_work.html`
**What it demonstrates:**
- Page hero pattern (label + title + description)
- Timeline component (4-step process)
- Principles grid (3-column)
- Simple page structure

**Your task:** Create reusable `PageHero`, `Timeline`, and `PrincipleGrid` components.

### 3. `technology_partners.html`
**Location:** `docs/technology_partners.html`
**What it demonstrates:**
- Partner grid layout
- Partner card structure
- Content-focused page (no complex interactions)

**Your task:** Create `PartnerGrid` and `PartnerCard` components.

### Design System Extracted

From these 3 files, extract:

> Each prototype contains its own `<style>` block defining the typography, color tokens, and spacing variables listed below. Inspect them directly to avoid transcription drift.

**Typography:**
- Font: Libre Franklin (200, 300, 400, 500, 600 weights)
- H1: 48-72px, weight 200, letter-spacing -0.02em
- Strong in headlines: weight 500, color `--primary`
- Body: 16px, weight 300, line-height 1.6

**Colors (CSS Variables):**
```css
--primary: #D8242A;
--primary-dark: #B01E23;
--secondary: #613BFE;
--dark: #0A0A0A;
--white: #FFFFFF;
--gray-50 through --gray-900 (defined in files)
```

**Spacing Scale:**
```css
--space-xs: 8px;
--space-sm: 16px;
--space-md: 24px;
--space-lg: 40px;
--space-xl: 64px;
--space-2xl: 96px;
--space-3xl: 160px;
```

**Component Patterns:**
- Navigation: Fixed, blur backdrop, scroll effect
- Buttons: 2px border-radius, hover transform
- Cards: Minimal borders (1px), subtle shadows
- Grids: CSS Grid with auto-fill/minmax
- Animations: Smooth, subtle, performance-first

---

## Component Architecture

### Design System in Tailwind

Create a Tailwind config that matches the design system:

```typescript
// tailwind.config.ts
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#D8242A',
          dark: '#B01E23',
        },
        secondary: '#613BFE',
        dark: '#0A0A0A',
        gray: {
          50: '#FAFAFA',
          100: '#F4F4F4',
          200: '#E0E0E0',
          400: '#A1A1A1',
          500: '#737373',
          600: '#525252',
          700: '#303030',
          800: '#1A1A1A',
          900: '#0A0A0A',
        },
      },
      fontFamily: {
        sans: ['Libre Franklin', 'system-ui', 'sans-serif'],
      },
      spacing: {
        xs: '0.5rem',   // 8px
        sm: '1rem',     // 16px
        md: '1.5rem',   // 24px
        lg: '2.5rem',   // 40px
        xl: '4rem',     // 64px
        '2xl': '6rem',  // 96px
        '3xl': '10rem', // 160px
      },
      letterSpacing: {
        tighter: '-0.02em',
        wide: '0.01em',
        wider: '0.1em',
        widest: '0.15em',
      },
    },
  },
  plugins: [],
}
export default config
```

### Core Component Structure

**Layout Components:**
```typescript
// src/components/layout/Navigation.tsx
export function Navigation() {
  // Fixed nav with blur backdrop
  // Logo, menu items, CTA button
}

// src/components/layout/Footer.tsx
export function Footer() {
  // Footer grid with brand, links, copyright
}

// src/app/layout.tsx
export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <Navigation />
        {children}
        <Footer />
      </body>
    </html>
  )
}
```

**Section Components:**
```typescript
// src/components/sections/Hero.tsx
interface HeroProps {
  label?: string;
  title: string;
  description: string;
  ctaText?: string;
  ctaHref?: string;
}
export function Hero({ label, title, description, ctaText, ctaHref }: HeroProps) {
  // Reusable hero section
}

// src/components/sections/ServiceGrid.tsx
interface Service {
  title: string;
  description: string;
  href: string;
}
export function ServiceGrid({ services }: { services: Service[] }) {
  // 4-quadrant grid for services
}
```

**UI Components:**
```typescript
// src/components/ui/Button.tsx
interface ButtonProps {
  variant: 'primary' | 'outline';
  children: React.ReactNode;
  href?: string;
}
export function Button({ variant, children, href }: ButtonProps) {
  // Reusable button component
}

// src/components/ui/Card.tsx
export function Card({ children, className }: CardProps) {
  // Base card component
}
```

### Component Rendering Strategy

- **Server Components (default):** Any component that only reads props/data and renders markup. This keeps bundles lean and enables automatic streaming.
- **Client Components (`'use client'`):** Components requiring state, effects, browser APIs, event handlers, or context that depends on the DOM (e.g., navigation scroll listeners, carousels).
- **Hybrid Approach:** Compose client components inside server-rendered wrappers when only a small subsection needs interactivity.
- Always start server-first; add `'use client'` only when TypeScript/compiler errors signal missing client features.

---

## TypeScript & Tooling Standards

### Compiler Configuration

Enable strict typing and sensible defaults in `tsconfig.json`:

```jsonc
{
  "compilerOptions": {
    "target": "es2022",
    "lib": ["dom", "dom.iterable", "es2022"],
    "module": "esnext",
    "moduleResolution": "bundler",
    "jsx": "preserve",
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "allowJs": false,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "esModuleInterop": true,
    "incremental": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"],
      "@/sanity.config": ["./sanity.config.ts"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx"],
  "exclude": ["node_modules"]
}
```

### Sanity Schema Type Generation

Use the Sanity CLI to keep GROQ queries type-safe:

```bash
pnpm sanity schema extract --path=./.sanity/schema.json
pnpm sanity typegen generate \
  --schema=./.sanity/schema.json \
  --path=./src/lib/sanity.types.ts
```

- Run the commands above after any schema change (add a `pnpm typecheck:sanity` script).
- Import generated types (e.g., `import type { ServicePage } from '@/lib/sanity.types'`) inside GROQ helpers.
- Optionally add `pnpm sanity typegen generate --watch` to a parallel dev task for real-time updates.

### Linting & Formatting

- ESLint ships with `create-next-app`; extend it with `@sanity/eslint-config-studio` for schema files.
- Use Prettier (already included) with the default config; keep max line length at 100 for readability.

---

## Sanity CMS Setup

### Schema Definitions

Create schemas based on the planning document. Here are the key ones:

```typescript
// sanity/schemas/servicePage.ts
import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'servicePage',
  title: 'Service Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'kicker',
      title: 'Kicker (e.g., "Execution /")',
      type: 'string',
    }),
    defineField({
      name: 'hero_headline',
      title: 'Hero Headline',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'hero_subheadline',
      title: 'Hero Subheadline',
      type: 'text',
      validation: Rule => Rule.required(),
    }),
    // Problem Section
    defineField({
      name: 'problem_headline',
      title: 'Problem Headline',
      type: 'string',
    }),
    defineField({
      name: 'problem_description',
      title: 'Problem Description',
      type: 'text',
    }),
    defineField({
      name: 'solution_description',
      title: 'Solution Description',
      type: 'text',
    }),
    // Capabilities
    defineField({
      name: 'capabilities',
      title: 'Core Capabilities',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', type: 'string', title: 'Title' },
            { name: 'description', type: 'text', title: 'Description' },
          ],
        },
      ],
    }),
    // Proof of Value
    defineField({
      name: 'proof_kicker',
      title: 'Proof Kicker',
      type: 'string',
    }),
    defineField({
      name: 'proof_metric',
      title: 'Proof Metric (e.g., "$47M")',
      type: 'string',
    }),
    defineField({
      name: 'proof_context',
      title: 'Proof Context',
      type: 'string',
    }),
    defineField({
      name: 'proof_body',
      title: 'Proof Body',
      type: 'text',
    }),
    defineField({
      name: 'proof_case_study_link',
      title: 'Link to Case Study',
      type: 'reference',
      to: [{ type: 'caseStudy' }],
    }),
    // CTA
    defineField({
      name: 'cta_headline',
      title: 'CTA Headline',
      type: 'string',
    }),
    defineField({
      name: 'cta_body',
      title: 'CTA Body',
      type: 'text',
    }),
    // SEO
    defineField({
      name: 'meta_title',
      title: 'Meta Title',
      type: 'string',
    }),
    defineField({
      name: 'meta_description',
      title: 'Meta Description',
      type: 'text',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'slug.current',
    },
  },
})
```

```typescript
// sanity/schemas/caseStudy.ts
import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'caseStudy',
  title: 'Case Study',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title' },
      validation: Rule => Rule.required(),
    }),
    // Card Display
    defineField({
      name: 'kicker',
      title: 'Kicker (e.g., "Global Financial Services")',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'card_headline',
      title: 'Card Headline',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'metric_large',
      title: 'Large Metric (e.g., "$47M")',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'metric_context',
      title: 'Metric Context',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    // Filters
    defineField({
      name: 'industry',
      title: 'Industry',
      type: 'string',
      options: {
        list: [
          { title: 'Financial Services', value: 'financial' },
          { title: 'Healthcare', value: 'healthcare' },
          { title: 'Manufacturing', value: 'manufacturing' },
          { title: 'Energy', value: 'energy' },
          { title: 'Retail', value: 'retail' },
        ],
      },
    }),
    defineField({
      name: 'execution_type',
      title: 'Execution Type',
      type: 'string',
      options: {
        list: [
          { title: 'Cloud Transformation', value: 'cloud' },
          { title: 'AI & Data', value: 'ai-data' },
          { title: 'Digital Product', value: 'digital-product' },
          { title: 'Core Systems', value: 'core-systems' },
        ],
      },
    }),
    // Full Story
    defineField({
      name: 'challenge',
      title: 'Challenge',
      type: 'text',
    }),
    defineField({
      name: 'solution',
      title: 'Solution',
      type: 'text',
    }),
    defineField({
      name: 'results',
      title: 'Results',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'technologies_used',
      title: 'Technologies Used',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'featured_image',
      title: 'Featured Image',
      type: 'image',
      options: { hotspot: true },
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'featured_image',
      subtitle: 'industry',
    },
  },
})
```

```typescript
// sanity/schemas/index.ts
import servicePage from './servicePage'
import caseStudy from './caseStudy'
import article from './article'
import engagementModel from './engagementModel'
import technologyPartner from './technologyPartner'
import siteSettings from './siteSettings'
import contactSubmission from './contactSubmission'

export const schemaTypes = [
  servicePage,
  caseStudy,
  article,
  engagementModel,
  technologyPartner,
  siteSettings,
  contactSubmission,
]
```

### Additional Schema Highlights

```typescript
// sanity/schemas/article.ts
export default defineType({
  name: 'article',
  title: 'Thought Leadership',
  type: 'document',
  fields: [
    defineField({ name: 'title', type: 'string', validation: Rule => Rule.required() }),
    defineField({ name: 'slug', type: 'slug', options: { source: 'title' } }),
    defineField({ name: 'publishedAt', type: 'datetime' }),
    defineField({ name: 'excerpt', type: 'text' }),
    defineField({ name: 'body', type: 'array', of: [{ type: 'block' }, { type: 'image', options: { hotspot: true } }] }),
    defineField({ name: 'seo', type: 'seo', options: { collapsible: true } }),
  ],
})
```

```typescript
// sanity/schemas/engagementModel.ts
export default defineType({
  name: 'engagementModel',
  title: 'Engagement Model',
  type: 'document',
  fields: [
    defineField({ name: 'title', type: 'string', validation: Rule => Rule.required() }),
    defineField({ name: 'summary', type: 'text', validation: Rule => Rule.required() }),
    defineField({ name: 'pillars', type: 'array', of: [{ type: 'string' }] }),
    defineField({ name: 'ctaLabel', type: 'string' }),
  ],
})
```

```typescript
// sanity/schemas/technologyPartner.ts
export default defineType({
  name: 'technologyPartner',
  title: 'Technology Partner',
  type: 'document',
  fields: [
    defineField({ name: 'name', type: 'string', validation: Rule => Rule.required() }),
    defineField({ name: 'logo', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'website', type: 'url' }),
    defineField({ name: 'excerpt', type: 'text' }),
    defineField({ name: 'categories', type: 'array', of: [{ type: 'string' }] }),
  ],
})
```

```typescript
// sanity/schemas/siteSettings.ts
export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({ name: 'title', type: 'string' }),
    defineField({ name: 'description', type: 'text' }),
    defineField({ name: 'defaultOgImage', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'contactEmail', type: 'email' }),
    defineField({ name: 'socialLinks', type: 'array', of: [{ type: 'object', fields: [
      { name: 'platform', type: 'string' },
      { name: 'url', type: 'url' },
    ] }] }),
  ],
})
```

```typescript
// sanity/schemas/contactSubmission.ts
export default defineType({
  name: 'contactSubmission',
  title: 'Contact Submission',
  type: 'document',
  fields: [
    defineField({ name: 'name', type: 'string' }),
    defineField({ name: 'email', type: 'email' }),
    defineField({ name: 'company', type: 'string' }),
    defineField({ name: 'message', type: 'text' }),
    defineField({ name: 'utm', type: 'object', fields: [
      { name: 'source', type: 'string' },
      { name: 'medium', type: 'string' },
      { name: 'campaign', type: 'string' },
    ] }),
    defineField({ name: 'submittedAt', type: 'datetime', initialValue: () => new Date().toISOString() }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'email',
    },
  },
})
```

> **Information Architecture Guardrail:** Engagement models are **informational only**. Do not create dedicated pages or routes for them; surface them as descriptive content blocks on the `/execution` hub page.

### Sanity Client Configuration

```typescript
// src/lib/sanity.client.ts
import { createClient } from 'next-sanity'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: '2024-01-01',
  useCdn: process.env.NODE_ENV === 'production',
})
```

### Example GROQ Queries

```typescript
// src/lib/sanity.queries.ts
import { groq } from 'next-sanity'

export const SERVICE_PAGE_QUERY = groq`
  *[_type == "servicePage" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    kicker,
    hero_headline,
    hero_subheadline,
    problem_headline,
    problem_description,
    solution_description,
    capabilities[] {
      title,
      description
    },
    proof_kicker,
    proof_metric,
    proof_context,
    proof_body,
    proof_case_study_link-> {
      title,
      slug,
      kicker,
      metric_large,
      metric_context
    },
    cta_headline,
    cta_body,
    meta_title,
    meta_description
  }
`

export const CASE_STUDIES_QUERY = groq`
  *[_type == "caseStudy"] | order(_createdAt desc) {
    _id,
    title,
    slug,
    kicker,
    card_headline,
    metric_large,
    metric_context,
    industry,
    execution_type,
    featured_image
  }
`

### Fetch Helpers with Error Handling

```typescript
// src/lib/services.ts
import { notFound } from 'next/navigation'
import { client } from '@/lib/sanity.client'
import { SERVICE_PAGE_QUERY } from '@/lib/sanity.queries'
import type { ServicePage } from '@/lib/sanity.types'

export async function getServicePage(slug: string) {
  try {
    const service = await client.fetch<ServicePage>(
      SERVICE_PAGE_QUERY,
      { slug },
      { next: { revalidate: 3600 } }
    )

    if (!service) {
      notFound()
    }

    return service
  } catch (error) {
    console.error('Failed to fetch service page:', error)
    throw error
  }
}
```

### Preview Mode & Draft Content

1. **Environment Variables**
   - `SANITY_PREVIEW_SECRET` – random string used to authorize previews
   - `NEXT_PUBLIC_SITE_URL` – absolute URL used when constructing preview redirects

2. **Preview Route**

```typescript
// src/app/api/preview/route.ts
import { draftMode } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const secret = searchParams.get('secret')
  const slug = searchParams.get('slug')

  if (secret !== process.env.SANITY_PREVIEW_SECRET || !slug) {
    return new NextResponse('Invalid preview request', { status: 401 })
  }

  draftMode().enable()
  return NextResponse.redirect(new URL(slug, process.env.NEXT_PUBLIC_SITE_URL))
}
```

3. **Preview Client**

```typescript
// src/lib/sanity.preview.ts
import { definePreview } from 'next-sanity/preview'
import { projectId, dataset } from '@/lib/sanity.client'

export const usePreview = definePreview({
  projectId,
  dataset,
  // Surface helpful console warnings during local dev
  onPublicAccessOnly: () => console.warn('Preview mode only works with SANITY_API_TOKEN set'),
})
```

4. **Preview Components**
   - Wrap preview pages/sections in a component that decides between `client` (draft) and `server` (published) data.
   - Example: `src/components/preview/PreviewWrapper.tsx` uses `usePreview` hook and shows a loading state while drafts stream in.

5. **Studio Configuration**
   - In Sanity Studio (`sanity.config.ts`), set the preview URL to `https://your-domain/api/preview`.
   - Add the Desk structure action so editors can click “Open Preview” for the current document.

---

## Testing & Quality Gates

### Tooling

```bash
pnpm add -D vitest @vitest/ui @testing-library/react @testing-library/jest-dom @testing-library/user-event jsdom
pnpm add -D playwright @playwright/test
```

Add scripts to `package.json`:

```jsonc
{
  "scripts": {
    "test": "vitest run",
    "test:watch": "vitest",
    "test:ui": "vitest --ui",
    "test:e2e": "playwright test",
    "test:e2e:headed": "playwright test --headed"
  }
}
```

- ESLint ships with Next.js (`pnpm lint`). Extend rules in `.eslintrc.js` as needed.

### Unit & Integration Tests (Vitest)

```typescript
// src/components/ui/__tests__/Button.test.tsx
import { render, screen } from '@testing-library/react'
import { Button } from '../Button'

describe('Button', () => {
  it('renders primary variant', () => {
    render(<Button variant="primary">Launch</Button>)
    const button = screen.getByRole('button', { name: /launch/i })
    expect(button).toHaveClass('bg-primary')
  })
})
```

- Keep one test file per component or section.
- Mock Sanity data with fixtures to avoid brittle tests.
- Gate pull requests with `pnpm test` in CI.

### End-to-End Tests (Playwright)

- Focus on critical flows: homepage load, navigation to `/execution/cloud-transformation`, contact form submit.
- Use `tests/e2e/*.spec.ts` convention; rely on `playwright.config.ts` for environment setup.
- Record traces for failed runs (`--trace on-first-retry`) to speed up debugging.

Visual regression (Chromatic/Playwright snapshots) can be introduced in Phase 2 once the component library stabilizes.

---

## Git Workflow & Collaboration

- **Default branch:** `main` (protected). All work lands via PR.
- **Branch naming:** `feature/<ticket-id>-short-description` or `fix/<ticket-id>-short-description`.
- **Commit style:** Conventional commits optional, but keep messages imperative and scoped (e.g., `feat: add partner grid preview`).
- **Pull requests:** Target ≤ 400 lines changed. Include screenshots for visual updates and list impacted routes.
- **Review checklist:** Ensure `pnpm lint`, `pnpm test`, and `pnpm test:e2e --headed --project=chromium` pass locally before requesting review.
- **Merging:** Require at least one reviewer approval plus green CI. Squash merge preferred to keep history clean.

---

## Conversion Process (Phase 1)

### Your Task: Convert 3 HTML Pages to Next.js

This is your **Phase 1 deliverable**. You will prove the tech stack works and create the component library.

#### Task 1.1: Set Up Project
- ✅ Initialize Next.js with TypeScript and Tailwind
- ✅ Install and configure Sanity
- ✅ Set up Vercel deployment
- ✅ Create project structure (see above)

**Deliverable:** Running Next.js app connected to Sanity, deployed to Vercel preview URL.

---

#### Task 1.2: Extract Design System
- ✅ Create Tailwind config with design tokens
- ✅ Set up global styles (`globals.css`)
- ✅ Import Libre Franklin font
- ✅ Define CSS variables as Tailwind theme

**Deliverable:** Design system documented and implemented in Tailwind.

---

#### Task 1.3: Build Layout Components
- ✅ Create `Navigation` component (fixed nav with blur, scroll effect)
- ✅ Create `Footer` component (grid layout, links)
- ✅ Create root `layout.tsx` with Navigation + Footer
- ✅ Test on all 3 pages

**Code Example:**

```typescript
// src/components/layout/Navigation.tsx
'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'

export function Navigation() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all ${scrolled ? 'py-5 shadow-sm' : 'py-7'} bg-white/95 backdrop-blur-xl`}>
      <div className="max-w-[1600px] mx-auto px-20 flex items-center justify-between">
        <Link href="/" className="text-2xl font-semibold text-primary -tracking-tight">
          mobiz
        </Link>
        <ul className="flex gap-12">
          <li><Link href="/our-model" className="text-sm text-gray-700 hover:text-dark transition-colors">Our Model</Link></li>
          <li><Link href="/execution" className="text-sm text-gray-700 hover:text-dark transition-colors">Execution</Link></li>
          <li><Link href="/delivered-value" className="text-sm text-gray-700 hover:text-dark transition-colors">Delivered Value</Link></li>
          <li><Link href="/technology-partners" className="text-sm text-gray-700 hover:text-dark transition-colors">Technology & Partners</Link></li>
        </ul>
        <Link 
          href="/#contact" 
          className="text-sm font-medium px-7 py-3 border-[1.5px] border-dark rounded-sm hover:bg-dark hover:text-white transition-all"
        >
          Start the Conversation
        </Link>
      </div>
    </nav>
  )
}
```

**Deliverable:** Functional Navigation and Footer on all pages.

---

#### Task 1.4: Componentize Homepage

Break down `homepage.html` into these components:

**Section Components:**
- `Hero.tsx` - Hero with metrics
- `StatsBar.tsx` - "Currently Executing" bar
- `AccountabilityGap.tsx` - Problem statement (2-column)
- `MobizModel.tsx` - Solution explanation (3 pillars)
- `ServiceGrid.tsx` - 4 service pillars
- `ProofSection.tsx` - Mini case studies
- `RecognitionBar.tsx` - Social proof stats
- `TechnologyBar.tsx` - Partner logo bar
- `IndustriesGrid.tsx` - Industries section
- `ContactCTA.tsx` - Final CTA section

**Page Structure:**
```typescript
// src/app/page.tsx
import { Hero } from '@/components/sections/Hero'
import { StatsBar } from '@/components/sections/StatsBar'
// ... import all sections

export default function HomePage() {
  return (
    <>
      <Hero 
        label="The Execution Partner for F500 Technology Leaders"
        title="Strategy is speculation. <strong>Execution is truth.</strong>"
        description="We don't just advise on digital transformation. We architect, build, and deploy production-grade systems. Zero handoffs. 100% accountability."
        ctaText="Start the Conversation"
        ctaHref="/#contact"
      />
      <StatsBar />
      <AccountabilityGap />
      <MobizModel />
      <ServiceGrid />
      <ProofSection />
      <RecognitionBar />
      <TechnologyBar />
      <IndustriesGrid />
      <ContactCTA />
    </>
  )
}
```

**Deliverable:** Complete homepage built with React components, matching the HTML design pixel-perfect.

---

#### Task 1.5: Componentize "Our Model" Page

Break down `how_we_work.html`:

**Section Components:**
- `PageHero.tsx` - Reusable page hero (label + title + description)
- `Timeline.tsx` - 4-step process timeline
- `PrincipleGrid.tsx` - 3-column principles grid

**Page Structure:**
```typescript
// src/app/our-model/page.tsx
import { PageHero } from '@/components/sections/PageHero'
import { Timeline } from '@/components/sections/Timeline'
import { PrincipleGrid } from '@/components/sections/PrincipleGrid'

export default function OurModelPage() {
  return (
    <>
      <PageHero 
        label="How We Work"
        title="The Path to <strong>Production.</strong>"
        description="Our model eliminates the accountability gap. The senior architects who design your solution are the same engineers who write the code, deploy the system, and own the outcome."
      />
      <Timeline />
      <PrincipleGrid />
      <ContactCTA 
        headline="An Outcome, Not an Opinion."
        body="Ready to see how our model delivers velocity?"
      />
    </>
  )
}
```

**Deliverable:** Complete "Our Model" page built with reusable components.

---

#### Task 1.6: Componentize "Technology & Partners" Page

Break down `technology_partners.html`:

**Section Components:**
- `PartnerGrid.tsx` - Grid of partner cards
- `PartnerCard.tsx` - Individual partner card

**Page Structure:**
```typescript
// src/app/technology-partners/page.tsx
import { PageHero } from '@/components/sections/PageHero'
import { PartnerGrid } from '@/components/sections/PartnerGrid'

export default function TechnologyPartnersPage() {
  return (
    <>
      <PageHero 
        label="Our Philosophy"
        title="Technology-Agnostic. <strong>Ecosystem-Deep.</strong>"
        description="Our model is built on first-principles engineering. We recommend the right stack for your unique constraints and goals, not our partner quotas."
      />
      <section className="py-32 bg-gray-50">
        <div className="max-w-[1200px] mx-auto px-20">
          <h2 className="text-4xl font-extralight -tracking-tight mb-5">
            Enterprise-Ready Expertise
          </h2>
          <p className="text-lg font-light text-gray-600 max-w-3xl mb-16">
            To deliver with certainty, our teams maintain deep, certified expertise across the mission-critical platforms our clients rely on.
          </p>
          <PartnerGrid />
        </div>
      </section>
    </>
  )
}
```

**Deliverable:** Complete "Technology & Partners" page.

---

### Phase 1 Success Criteria

At the end of Phase 1, you should have:

✅ Next.js + Sanity + Vercel stack fully operational
✅ 3 pages live and pixel-perfect to the HTML prototypes
✅ Complete component library extracted and reusable
✅ Design system implemented in Tailwind
✅ Sanity CMS connected (schemas created, no content yet)
✅ Deployed to Vercel with preview URL

**Demo to stakeholders:** Show the 3 pages live on Vercel.

---

## Design Handoff Process

### For the Designer

**Your HTML prototyping is done.** You've successfully created the visual system.

**Next steps:**

1. **Move to Figma** (or your design tool of choice)
2. **Import the design system:**
   - Typography (Libre Franklin weights)
   - Color palette (red, purple, grays)
   - Spacing scale
   - Component styles (buttons, cards, grids)
3. **Design the remaining pages** using the established system:
   - `/execution` - Parent hub page
   - `/delivered-value` - Portfolio page with filters
   - Individual case study page template
   - Thought leadership page

**Key principle:** You're not starting from scratch. You're applying the system you created to new page layouts.

### Design → Developer Handoff

When the designer completes a new page in Figma:

1. **Designer exports:**
   - Figma file link
   - Component specifications (spacing, sizing, behavior)
   - Any new components not in the existing system
   - Copy/content (in collaboration with content team)

2. **Developer receives:**
   - Figma link
   - Written specification document
   - Content (from Sanity or markdown)

3. **Developer builds:**
   - Reuses existing components where possible
   - Creates new components if needed
   - Pulls content from Sanity
   - Matches design pixel-perfect

**Timeline:** Each page should take 3-5 days from Figma completion to live deployment.

---

## Remaining Pages (Phase 2)

After Phase 1 is complete, build these pages:

### Page 4: `/execution` (Parent Hub)

**Content Reference:** `What_we_Do.md` (already provided)

**Sections:**
1. Hero: "From the C-Suite to the Codebase"
2. Core Execution Pillars (4-quadrant grid - links to children)
3. The Execution Difference (3-column)
4. Engagement Models (2x2 grid - INFORMATIONAL ONLY)
5. CTA

**Data Source:** Mostly static content, engagement models from Sanity

**Complexity:** Medium

---

### Page 5-8: `/execution/[slug]` (Service Child Pages)

**Content Reference:** `Cloud_Transformation.md` (template provided)

**Pages to build:**
- `/execution/cloud-transformation` (copy provided)
- `/execution/ai-data-platforms` (copy TBD)
- `/execution/digital-product-engineering` (copy TBD)
- `/execution/core-system-modernization` (copy TBD)

**Data Source:** Sanity (`servicePage` schema)

**Complexity:** Medium (dynamic page, pull from Sanity)

---

### Page 9: `/delivered-value` (Portfolio)

**Content Reference:** `Delivered_Value.md` (already provided)

**Sections:**
1. Hero: "Value, Delivered. Proof, Not Promises."
2. Filter bar (Industry, Execution Type)
3. Case study grid (filterable, client-side)
4. CTA

**Data Source:** Sanity (`caseStudy` schema)

**Complexity:** High (filtering logic, dynamic grid)

**Implementation Notes:**
- Use React state for filter management
- Consider using Framer Motion for smooth filter animations
- Case study cards link to `/delivered-value/[slug]`

---

### Page 10: `/delivered-value/[slug]` (Individual Case Study)

**Content Reference:** Standard case study template

**Sections:**
1. Hero (kicker + headline + large metric)
2. Challenge
3. Solution
4. Results (formatted, visual)
5. Technologies used
6. Related case studies
7. CTA

**Data Source:** Sanity (`caseStudy` schema)

**Complexity:** Medium

---

### Page 11: `/thought-leadership` (Insights Hub)

**Content Reference:** `Thought_Leadership.md` (already provided)

**Sections:**
1. Hero: "Execution is our truth. This is our perspective."
2. Featured content (large block)
3. Article grid (3-column, paginated)
4. CTA

**Data Source:** Sanity (`article` schema)

**Complexity:** Medium

---

### Page 12: `/thought-leadership/[slug]` (Individual Articles)

**Sections:**
1. Article hero (tag + headline + author + date)
2. Article body (rich text from Sanity)
3. Related articles
4. CTA

**Data Source:** Sanity (`article` schema)

**Complexity:** Low-Medium

---

## Performance & SEO Requirements

### Performance Targets

These are **non-negotiable**:

- **Lighthouse Score:** 95+ across all metrics (Performance, Accessibility, Best Practices, SEO)
- **First Contentful Paint (FCP):** < 1.5s
- **Time to Interactive (TTI):** < 3s
- **Cumulative Layout Shift (CLS):** < 0.1
- **Largest Contentful Paint (LCP):** < 2.5s

### How to Achieve This

1. **Use Next.js Image Optimization:**
   ```typescript
   import Image from 'next/image'
   
   <Image 
     src="/hero-image.jpg"
     alt="Description"
     width={1200}
     height={600}
     priority // for above-fold images
   />
   ```

2. **Server Components by Default:**
   - Only use `'use client'` when necessary (interactions, state)
   - Most pages should be Server Components

3. **Dynamic Imports for Heavy Components:**
   ```typescript
   import dynamic from 'next/dynamic'
   
   const HeavyChart = dynamic(() => import('@/components/HeavyChart'), {
     loading: () => <div>Loading...</div>,
   })
   ```

4. **Optimize Fonts:**
   ```typescript
   // next.config.js
   const nextConfig = {
     optimizeFonts: true,
   }
   ```

5. **Static Generation Where Possible:**
   - Homepage: Static
   - Our Model: Static
   - Technology & Partners: Static
   - Service Pages: Static (regenerate on content change)
   - Case Studies: Static (ISR with revalidation)

### SEO Implementation

**1. Metadata for Every Page:**

```typescript
// src/app/page.tsx
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Mobiz | Strategy, Executed.',
  description: 'The execution partner for F500 technology leaders. We architect, build, and deploy production-grade systems. Zero handoffs. 100% accountability.',
  openGraph: {
    title: 'Mobiz | Strategy, Executed.',
    description: 'The execution partner for F500 technology leaders.',
    images: ['/og-image.jpg'],
  },
}
```

**2. Dynamic Metadata for Content Pages:**

```typescript
// src/app/execution/[slug]/page.tsx
export async function generateMetadata({ params }): Promise<Metadata> {
  const service = await client.fetch(SERVICE_PAGE_QUERY, { slug: params.slug })
  
  return {
    title: service.meta_title || service.title,
    description: service.meta_description,
    openGraph: {
      title: service.meta_title || service.title,
      description: service.meta_description,
    },
  }
}
```

**3. Structured Data (JSON-LD):**

```typescript
// src/components/StructuredData.tsx
export function StructuredData() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Mobiz',
    url: 'https://mobizinc.com',
    logo: 'https://mobizinc.com/logo.png',
    description: 'The execution partner for F500 technology leaders.',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Houston',
      addressRegion: 'TX',
      addressCountry: 'US',
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}
```

**4. Sitemap Generation:**

```typescript
// src/app/sitemap.ts
import { client } from '@/lib/sanity.client'

export default async function sitemap() {
  const services = await client.fetch(`*[_type == "servicePage"]{ slug }`)
  const caseStudies = await client.fetch(`*[_type == "caseStudy"]{ slug }`)
  
  return [
    { url: 'https://mobizinc.com', lastModified: new Date() },
    { url: 'https://mobizinc.com/our-model', lastModified: new Date() },
    ...services.map(s => ({
      url: `https://mobizinc.com/execution/${s.slug.current}`,
      lastModified: new Date(),
    })),
    ...caseStudies.map(c => ({
      url: `https://mobizinc.com/delivered-value/${c.slug.current}`,
      lastModified: new Date(),
    })),
  ]
}
```

---

## Analytics, Contact & CRM

### GA4 (Phase 1)

```bash
pnpm add @next/third-parties
```

```typescript
// src/app/layout.tsx
import { GoogleAnalytics } from '@next/third-parties/google'

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA4_ID!} />
      </body>
    </html>
  )
}
```

- Require consent before loading analytics (use `next/script` with a consent manager or integrate `cookie-consent` during Phase 1).
- Track key events (`lead_form_submit`, `cta_click`) via `window.gtag` helpers.
- Add `NEXT_PUBLIC_GA4_ID` to `.env.local` and Vercel.

### Contact Form Flow

1. **Front-end** – Use a controlled React form component that posts to `/api/contact`.
2. **API Route** – Store submissions in Sanity and fire an email via Resend.

```bash
pnpm add resend
```

```typescript
// src/app/api/contact/route.ts
import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { client } from '@/lib/sanity.client'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
  const body = await request.json()

  await client.create({
    _type: 'contactSubmission',
    ...body,
    submittedAt: new Date().toISOString(),
  })

  await resend.emails.send({
    from: 'Mobiz Website <hello@mobiz.com>',
    to: process.env.CONTACT_NOTIFICATION_EMAIL!,
    subject: `New lead from ${body.name}`,
    html: `<p>${body.message}</p>`,
  })

  return NextResponse.json({ ok: true })
}
```

- Capture UTM parameters on the client and append them to the payload.
- Validate inputs with `zod` (server-side) and show optimistic UI feedback.

### Dynamics CRM (Phase 2)

- Implement a background job (Edge Function or queue) that pushes `contactSubmission` documents into Microsoft Dynamics.
- Use Sanity webhooks (`contactSubmission` create events) to trigger the sync.
- Map GA4 client IDs/UTMs to CRM fields so attribution data survives the pipeline.

---

## Deployment & Launch

### Vercel Deployment

**Automatic Deployments:**
- Every push to `main` branch → Production deployment
- Every PR → Preview deployment
- Sanity content changes → Trigger revalidation via webhook

**Environment Variables on Vercel:**
```
NEXT_PUBLIC_SANITY_PROJECT_ID
NEXT_PUBLIC_SANITY_DATASET
SANITY_API_TOKEN
NEXT_PUBLIC_SITE_URL
```

### Sanity Webhooks for Auto-Rebuild

Set up a webhook in Sanity that triggers Vercel rebuild on content changes:

```typescript
// In Sanity Studio, go to: Manage → API → Webhooks
// Webhook URL: https://api.vercel.com/v1/integrations/deploy/[your-hook-id]
// Trigger on: Create, Update, Delete
```

### Pre-Launch Checklist

Before going live:

- [ ] All pages built and tested
- [ ] Lighthouse scores 95+ on all pages
- [ ] SEO metadata complete
- [ ] Sitemap generated
- [ ] robots.txt configured
- [ ] Analytics integrated (GA4)
- [ ] 404 page designed and built
- [ ] Contact form functional (if applicable)
- [ ] Mobile responsive on all pages
- [ ] Cross-browser tested (Chrome, Safari, Firefox, Edge)
- [ ] Sanity Studio populated with content
- [ ] DNS configured to point to Vercel

### Launch Day

1. **Final content review** in Sanity Studio
2. **Merge to `main`** → Triggers production deployment
3. **Update DNS** to point to Vercel
4. **Monitor** deployment logs
5. **Test live site** on production URL
6. **Celebrate** 🎉

---

## Questions & Support

### Where to Get Help

**Next.js Documentation:** https://nextjs.org/docs  
**Sanity Documentation:** https://www.sanity.io/docs  
**Vercel Documentation:** https://vercel.com/docs  
**Tailwind CSS Documentation:** https://tailwindcss.com/docs

### Project-Specific Questions

For questions about:
- **Brand/design decisions** → Contact: Design Lead
- **Content/copy questions** → Contact: Content Team
- **Technical architecture** → Contact: Tech Lead
- **Sanity schemas/content model** → Contact: Tech Lead

---

## Summary: Your Action Plan

### Phase 1 (Weeks 1-2): Prove the Stack
1. Set up Next.js + Sanity + Vercel
2. Extract design system into Tailwind
3. Build Layout components (Nav + Footer)
4. Convert 3 HTML pages to React components
5. Deploy to Vercel preview
6. Demo to stakeholders

**Deliverable:** 3 live pages, proven tech stack

---

### Phase 2 (Weeks 3-5): Build Remaining Pages
1. Designer creates Figma designs for remaining pages
2. Content team populates Sanity with content
3. Developer builds 9 remaining pages
4. Test performance and SEO
5. Deploy each page as completed

**Deliverable:** Complete website

---

### Phase 3 (Week 6): Polish & Launch
1. Final QA across all pages
2. Lighthouse optimization
3. Content review and final edits
4. Pre-launch checklist
5. DNS cutover
6. Launch

**Deliverable:** Live production website

---

## Final Notes

This is an **execution-first process**. The HTML prototypes have done their job—they are the visual blueprint. Your mission is to turn that blueprint into a production-ready, high-performance Next.js application.

**Key principles:**
- Component reusability (build once, use everywhere)
- Performance first (95+ Lighthouse or it doesn't ship)
- Content-driven (Sanity powers everything)
- Brand-aligned (every detail matters)

The stack is elite. The design is confident. The content is declarative.

**Build with velocity. Deliver with certainty.**

---

*End of Document*
