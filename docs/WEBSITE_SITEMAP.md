# Mobiz Website - Visual Sitemap

## Site Structure Overview

```
┌─────────────────────────────────────────────────────────────┐
│                        HOMEPAGE (/)                          │
│  ┌───────────────────────────────────────────────────────┐  │
│  │  Hero Section                                         │  │
│  │  - Title: "Strategy is speculation. Execution is     │  │
│  │    truth."                                            │  │
│  │  - 4 Metrics                                          │  │
│  │  - CTA Button                                         │  │
│  └───────────────────────────────────────────────────────┘  │
│  ┌───────────────────────────────────────────────────────┐  │
│  │  Stats Bar (4 items)                                  │  │
│  └───────────────────────────────────────────────────────┘  │
│  ┌───────────────────────────────────────────────────────┐  │
│  │  Accountability Gap                                   │  │
│  └───────────────────────────────────────────────────────┘  │
│  ┌───────────────────────────────────────────────────────┐  │
│  │  Model Grid (Horizontal Scroll)                       │  │
│  └───────────────────────────────────────────────────────┘  │
│  ┌───────────────────────────────────────────────────────┐  │
│  │  Delivered Value (Case Studies)                       │  │
│  └───────────────────────────────────────────────────────┘  │
│  ┌───────────────────────────────────────────────────────┐  │
│  │  Recognition Bar                                      │  │
│  └───────────────────────────────────────────────────────┘  │
│  ┌───────────────────────────────────────────────────────┐  │
│  │  Services Grid                                        │  │
│  └───────────────────────────────────────────────────────┘  │
│  ┌───────────────────────────────────────────────────────┐  │
│  │  Partners Bar                                         │  │
│  └───────────────────────────────────────────────────────┘  │
│  ┌───────────────────────────────────────────────────────┐  │
│  │  Industries Showcase                                  │  │
│  └───────────────────────────────────────────────────────┘  │
│  ┌───────────────────────────────────────────────────────┐  │
│  │  Contact CTA                                          │  │
│  └───────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                              │
                              ├─────────────────────────────────┐
                              │                                 │
                              ▼                                 ▼
        ┌─────────────────────────────┐         ┌─────────────────────────────┐
        │    SERVICES (/services)      │         │   EXECUTION (/execution)    │
        │  ┌────────────────────────┐  │         │  ┌────────────────────────┐ │
        │  │ Page Hero              │  │         │  │ Page Hero              │ │
        │  └────────────────────────┘  │         │  └────────────────────────┘ │
        │  ┌────────────────────────┐  │         │  ┌────────────────────────┐ │
        │  │ Category Filter        │  │         │  │ Services Grid          │ │
        │  └────────────────────────┘  │         │  └────────────────────────┘ │
        │  ┌────────────────────────┐  │         │  ┌────────────────────────┐ │
        │  │ Services Grid          │  │         │  │ Execution Difference   │ │
        │  └────────────────────────┘  │         │  └────────────────────────┘ │
        └─────────────────────────────┘         │  ┌────────────────────────┐ │
                    │                           │  │ Engagement Models      │ │
                    │                           │  └────────────────────────┘ │
                    ▼                           │  ┌────────────────────────┐ │
        ┌─────────────────────────────┐         │  │ Contact CTA            │ │
        │  SERVICE DETAIL             │         │  └────────────────────────┘ │
        │  (/services/[slug])         │         └─────────────────────────────┘
        │  ┌────────────────────────┐ │                      │
        │  │ Content Hero           │ │                      ▼
        │  │ - Hero Image (parallax)│ │         ┌─────────────────────────────┐
        │  │ - Title & Description  │ │         │  EXECUTION DETAIL           │
        │  │ - Scroll Fade Arrow    │ │         │  (/execution/[slug])        │
        │  └────────────────────────┘ │         │  ┌────────────────────────┐ │
        │  ┌────────────────────────┐ │         │  │ Service-specific page  │ │
        │  │ Problem Section        │ │         │  │ - Cloud Transformation │
        │  │ (Scroll Color Trans)   │ │         │  │ - AI & Data Platforms  │
        │  └────────────────────────┘ │         │  │ - Digital Engineering  │
        │  ┌────────────────────────┐ │         │  │ - Core Modernization   │
        │  │ Core Capabilities      │ │         │  └────────────────────────┘ │
        │  │ - 2 columns grid       │ │         └─────────────────────────────┘
        │  │ - Optional images      │ │
        │  └────────────────────────┘ │
        │  ┌────────────────────────┐ │
        │  │ Features Section       │ │
        │  │ (Optional)             │ │
        │  │ - Main image           │ │
        │  │ - Items grid (2-3 cols)│ │
        │  └────────────────────────┘ │
        │  ┌────────────────────────┐ │
        │  │ Additional Sections    │ │
        │  │ (Optional, multiple)   │ │
        │  │ - Image/Video          │ │
        │  │ - Alignment options    │ │
        │  └────────────────────────┘ │
        │  ┌────────────────────────┐ │
        │  │ Proof Section          │ │
        │  │ - Metric, Context      │ │
        │  │ - Case Study Link      │ │
        │  └────────────────────────┘ │
        │  ┌────────────────────────┐ │
        │  │ Related Services       │ │
        │  │ - Same category        │ │
        │  │ - 3 columns grid       │ │
        │  └────────────────────────┘ │
        │  ┌────────────────────────┐ │
        │  │ Contact CTA            │ │
        │  └────────────────────────┘ │
        └─────────────────────────────┘
                              │
                              ├─────────────────────────────────┐
                              │                                 │
                              ▼                                 ▼
        ┌─────────────────────────────┐         ┌─────────────────────────────┐
        │  CASE STUDIES               │         │  DELIVERED VALUE            │
        │  (/case-studies)            │         │  (/delivered-value)         │
        │  ┌────────────────────────┐ │         │  ┌────────────────────────┐ │
        │  │ Page Hero              │ │         │  │ Page Hero              │ │
        │  └────────────────────────┘ │         │  └────────────────────────┘ │
        │  ┌────────────────────────┐ │         │  ┌────────────────────────┐ │
        │  │ Case Study Filter      │ │         │  │ Delivered Value Cards  │ │
        │  └────────────────────────┘ │         │  └────────────────────────┘ │
        │  ┌────────────────────────┐ │         └─────────────────────────────┘
        │  │ Case Study Grid        │ │                      │
        │  └────────────────────────┘ │                      ▼
        └─────────────────────────────┘         ┌─────────────────────────────┐
                    │                           │  DELIVERED VALUE DETAIL     │
                    ▼                           │  (/delivered-value/[slug])  │
        ┌─────────────────────────────┐         │  (Redirects to case study) │
        │  CASE STUDY DETAIL          │         └─────────────────────────────┘
        │  (/case-studies/[slug])     │
        │  ┌────────────────────────┐ │
        │  │ Hero Section           │ │
        │  └────────────────────────┘ │
        │  ┌────────────────────────┐ │
        │  │ Challenge              │ │
        │  └────────────────────────┘ │
        │  ┌────────────────────────┐ │
        │  │ Solution               │ │
        │  └────────────────────────┘ │
        │  ┌────────────────────────┐ │
        │  │ Results                │ │
        │  └────────────────────────┘ │
        │  ┌────────────────────────┐ │
        │  │ Technologies Used      │ │
        │  └────────────────────────┘ │
        │  ┌────────────────────────┐ │
        │  │ Contact CTA            │ │
        │  └────────────────────────┘ │
        └─────────────────────────────┘
                              │
                              ├─────────────────────────────────┐
                              │                                 │
                              ▼                                 ▼
        ┌─────────────────────────────┐         ┌─────────────────────────────┐
        │  INSIGHTS                   │         │  OUR MODEL                  │
        │  (/insights)                │         │  (/our-model)               │
        │  ┌────────────────────────┐ │         │  ┌────────────────────────┐ │
        │  │ Page Hero              │ │         │  │ Page Hero              │ │
        │  └────────────────────────┘ │         │  └────────────────────────┘ │
        │  ┌────────────────────────┐ │         │  ┌────────────────────────┐ │
        │  │ Article Cards Grid     │ │         │  │ Model Grid             │ │
        │  └────────────────────────┘ │         │  └────────────────────────┘ │
        └─────────────────────────────┘         │  ┌────────────────────────┐ │
                    │                           │  │ Principle Grid         │ │
                    ▼                           │  └────────────────────────┘ │
        ┌─────────────────────────────┐         │  ┌────────────────────────┐ │
        │  ARTICLE DETAIL             │         │  │ Timeline               │ │
        │  (/insights/[slug])         │         │  └────────────────────────┘ │
        │  ┌────────────────────────┐ │         │  ┌────────────────────────┐ │
        │  │ Hero Image             │ │         │  │ Contact CTA            │ │
        │  └────────────────────────┘ │         │  └────────────────────────┘ │
        │  ┌────────────────────────┐ │         └─────────────────────────────┘
        │  │ Article Content        │ │
        │  │ (PortableText)         │ │
        │  └────────────────────────┘ │
        │  ┌────────────────────────┐ │
        │  │ Contact CTA           │ │
        │  └────────────────────────┘ │
        └─────────────────────────────┘
                              │
                              ▼
        ┌─────────────────────────────┐
        │  TECHNOLOGY PARTNERS        │
        │  (/technology-partners)     │
        │  ┌────────────────────────┐ │
        │  │ Page Hero              │ │
        │  └────────────────────────┘ │
        │  ┌────────────────────────┐ │
        │  │ Partner Grid           │ │
        │  └────────────────────────┘ │
        │  ┌────────────────────────┐ │
        │  │ Contact CTA            │ │
        │  └────────────────────────┘ │
        └─────────────────────────────┘
```

## Navigation Flow

```
┌─────────────────────────────────────────────────────────────┐
│                      NAVIGATION HEADER                       │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐   │
│  │  Logo    │  │ Services │  │Execution │  │Delivered │   │
│  │    ↓     │  │    ↓     │  │    ↓     │  │  Value   │   │
│  │  Home    │  │ Services │  │Execution │  │  Case    │   │
│  └──────────┘  └──────────┘  └──────────┘  │ Studies  │   │
│                                              └──────────┘   │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐                 │
│  │ Insights │  │  Theme   │  │  Menu    │                 │
│  │    ↓     │  │ Toggler  │  │ (Mobile) │                 │
│  │ Articles │  │          │  │          │                 │
│  └──────────┘  └──────────┘  └──────────┘                 │
│                                                             │
│  ┌──────────────────────────────────────────────────────┐  │
│  │            CONTACT BUTTON                            │  │
│  │         (Smooth scroll to #contact)                  │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

## Component Hierarchy

```
RootLayout
├── ThemeProvider
│   ├── ScrollProgress (top progress bar)
│   ├── Navigation (fixed header)
│   │   ├── Logo (theme-aware)
│   │   ├── Navigation Links
│   │   ├── Theme Toggler
│   │   └── Hamburger Menu (mobile)
│   │       └── Full-page Overlay
│   ├── Main Content
│   │   └── Page Components
│   │       ├── Homepage
│   │       ├── Services
│   │       ├── Execution
│   │       ├── Case Studies
│   │       └── ...
│   └── Footer
│       ├── Logo
│       ├── Navigation Links
│       ├── Social Links
│       └── Legal Links
├── GA4WithConsent (analytics)
└── OrganizationStructuredData (SEO)
```

## Data Flow

```
┌─────────────────────────────────────────────────────────────┐
│                    SANITY CMS (Content)                      │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐   │
│  │ Homepage │  │ Services │  │Case      │  │ Articles │   │
│  │  Data    │  │  Pages   │  │Studies   │  │          │   │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘   │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐                 │
│  │Engagement│  │Technology│  │ Execution│                 │
│  │ Models   │  │ Partners │  │  Pages   │                 │
│  └──────────┘  └──────────┘  └──────────┘                 │
└─────────────────────────────────────────────────────────────┘
                              │
                              │ GROQ Queries
                              ▼
┌─────────────────────────────────────────────────────────────┐
│              NEXT.JS SERVER COMPONENTS                       │
│  ┌────────────────────────────────────────────────────────┐  │
│  │  Server Components (async functions)                   │  │
│  │  - Fetch data from Sanity                             │  │
│  │  - Handle fallback data                               │  │
│  │  - Generate metadata                                  │  │
│  │  - Static generation (SSG)                            │  │
│  └────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                              │
                              │ Props
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                  REACT COMPONENTS                            │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐   │
│  │  Hero    │  │  Stats   │  │ Services │  │ Contact  │   │
│  │ Section  │  │   Bar    │  │  Grid    │  │   CTA    │   │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘   │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐   │
│  │  Model   │  │ Partners │  │ Industries│ │  Footer  │   │
│  │  Grid    │  │   Bar    │  │ Showcase  │ │          │   │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘   │
└─────────────────────────────────────────────────────────────┘
                              │
                              │ Render
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    BROWSER (Client)                          │
│  ┌────────────────────────────────────────────────────────┐  │
│  │  - HTML Rendering                                       │  │
│  │  - CSS Styling (Tailwind)                              │  │
│  │  - JavaScript Interactions                             │  │
│  │  - Scroll Animations                                   │  │
│  │  - Theme Switching                                     │  │
│  │  - Form Handling                                       │  │
│  └────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

## Page Types

### 1. Static Pages
- Homepage (`/`)
- Our Model (`/our-model`)
- Execution Hub (`/execution`)
- Services Listing (`/services`)
- Case Studies Listing (`/case-studies`)
- Insights Listing (`/insights`)
- Technology Partners (`/technology-partners`)
- Privacy Policy (`/privacy`)

### 2. Dynamic Pages (SSG)
- Service Detail (`/services/[slug]`)
- Case Study Detail (`/case-studies/[slug]`)
- Article Detail (`/insights/[slug]`)
- Execution Detail (`/execution/[slug]`)
- Delivered Value Detail (`/delivered-value/[slug]`)

### 3. API Routes
- Contact Form (`/api/contact`)
- Preview Mode (`/api/preview`)

### 4. Special Routes
- Sitemap (`/sitemap.xml`)
- Robots (`/robots.txt`)
- 404 Page (`/not-found`)

## Component Categories

### Layout Components
- `Navigation.tsx` - Header navigation
- `Footer.tsx` - Footer navigation
- `ThemeProvider.tsx` - Theme context
- `ScrollProgress.tsx` - Scroll progress bar

### Section Components
- `Hero.tsx` - Homepage hero
- `PageHero.tsx` - Page hero sections
- `ContentHero.tsx` - Content page hero
- `StatsBar.tsx` - Statistics bar
- `ServicesGrid.tsx` - Services grid
- `ModelGrid.tsx` - Model grid
- `PartnersBar.tsx` - Partners bar
- `RecognitionBar.tsx` - Recognition bar
- `ContactCTA.tsx` - Contact call-to-action
- `AccountabilityGap.tsx` - Accountability gap section
- `DeliveredValue.tsx` - Delivered value section
- `IndustriesShowcase.tsx` - Industries showcase
- `SectionHeader.tsx` - Section header
- `ScrollColorTransition.tsx` - Scroll color transition
- `ScrollGradientOverlay.tsx` - Scroll gradient overlay

### UI Components
- `Button.tsx` - Button component
- `ContactForm.tsx` - Contact form
- `Modal.tsx` - Modal component
- `ScrollFadeArrow.tsx` - Scroll fade arrow
- `Label.tsx` - Label component

### SEO Components
- `OrganizationStructuredData.tsx` - Organization schema
- `CaseStudyStructuredData.tsx` - Case study schema
- `ArticleStructuredData.tsx` - Article schema

## Key Features

### 1. Scroll Animations
- Scroll-to-scale (StatsBar, RecognitionBar)
- Scroll-based blur (TextAnimate)
- Scroll color transition (ScrollColorTransition)
- Scroll fade arrow (ScrollFadeArrow)
- Scroll progress bar (ScrollProgress)

### 2. Theme System
- Dark/Light mode toggle
- Theme persistence (localStorage)
- Smooth theme transitions
- Theme-aware components

### 3. Navigation
- Fixed header
- Smooth scroll to sections
- Hamburger menu (mobile)
- Active link highlighting

### 4. Forms
- Contact form modal
- Form validation
- API integration
- Success/error states

### 5. Image Optimization
- Next.js Image component
- Sanity CDN integration
- Responsive images
- Lazy loading

### 6. SEO
- Dynamic metadata
- Structured data (JSON-LD)
- XML Sitemap
- Robots.txt
- Open Graph tags

## Responsive Breakpoints

- **Mobile:** `< 768px`
- **Tablet:** `768px - 1024px`
- **Desktop:** `> 1024px`
- **Large Desktop:** `> 1280px` (2xl)

## Content Management

### Sanity CMS Content Types
1. **Homepage** - Homepage content
2. **Service Pages** - Service detail pages
3. **Case Studies** - Case study pages
4. **Articles** - Article/blog pages
5. **Engagement Models** - Engagement model data
6. **Technology Partners** - Partner data

### Static Fallback Data
- `static-services.ts` - Static service data
- `FALLBACK_DATA` - Homepage fallback data
- Service keywords map
- Category labels

## Build & Deployment

### Build Process
1. Type checking (TypeScript)
2. Linting (ESLint)
3. Building (Next.js)
4. Static generation (SSG)
5. Optimization (images, code splitting)

### Deployment
- **Platform:** Vercel (recommended)
- **Environment:** Production
- **Webhooks:** Sanity → Vercel
- **CDN:** Vercel Edge Network

---

**Last Updated:** 2024
**Version:** 1.0.0

