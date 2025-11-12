# Mobiz Website - Frontend Structure

## Table of Contents
1. [Site Map & Routes](#site-map--routes)
2. [Navigation Structure](#navigation-structure)
3. [Page Structure](#page-structure)
4. [Component Hierarchy](#component-hierarchy)
5. [Folder Structure](#folder-structure)
6. [Data Flow](#data-flow)
7. [Key Features](#key-features)

---

## Site Map & Routes

### Main Pages
```
/ (Homepage)
├── /our-model (Our Model)
├── /execution (Execution Hub)
│   └── /execution/[slug] (Individual Service Pages)
│       ├── /execution/cloud-transformation
│       ├── /execution/ai-data-platforms
│       ├── /execution/digital-product-engineering
│       └── /execution/core-system-modernization
├── /services (Services Listing)
│   └── /services/[slug] (Individual Service Pages)
│       ├── /services/azure-landing-zone
│       └── ... (dynamic from Sanity CMS)
├── /delivered-value (Delivered Value)
│   └── /delivered-value/[slug] (Individual Case Studies)
├── /case-studies (Case Studies Listing)
│   └── /case-studies/[slug] (Individual Case Study)
├── /insights (Insights/Thought Leadership)
│   └── /insights/[slug] (Individual Article)
├── /thought-leadership (Redirects to /insights)
├── /technology-partners (Technology Partners)
└── /privacy (Privacy Policy)
```

### API Routes
```
/api/contact (Contact Form Submission)
/api/preview (Sanity Preview Mode)
```

### Special Routes
```
/robots.txt (Robots.txt)
/sitemap.xml (XML Sitemap)
```

---

## Navigation Structure

### Main Navigation (Header)
- **Logo** → `/` (Homepage)
- **Services** → `/services`
- **Execution** → `/execution`
- **Delivered Value** → `/delivered-value`
- **Insights** → `/insights`
- **Contact CTA Button** → `#contact` (smooth scroll to contact section)

### Footer Navigation
- **Company Links**
- **Service Links**
- **Resource Links**
- **Social Media Links**
- **Legal Links** (Privacy Policy)

### Mobile Navigation
- Hamburger menu with full-page overlay
- Same links as main navigation
- Smooth fade-in transition
- "X" animation on close

---

## Page Structure

### 1. Homepage (`/`)
**Location:** `apps/web/src/app/page.tsx`

**Sections:**
1. **Hero Section** (`Hero.tsx`)
   - Title: "Strategy is speculation. Execution is truth."
   - Description
   - Metrics (4 metrics)
   - CTA Button

2. **Stats Bar** (`StatsBar.tsx`)
   - 4 stat items with icons
   - Scroll-to-scale animation
   - Bounce animation on scroll

3. **Accountability Gap** (`AccountabilityGap.tsx`)
   - Title with scroll-based blur animation
   - Description

4. **Model Grid** (`ModelGrid.tsx`)
   - 4 execution model items
   - Horizontal scroll (scroll hijacking)
   - Section header with right alignment

5. **Services Grid** (`ServicesGrid.tsx`)
   - Service items (from Sanity CMS)
   - Grid layout (2 columns)
   - Section header: "We don't recommend. We Execute."

6. **Delivered Value** (`DeliveredValue.tsx`)
   - Case study cards
   - Video links
   - Metrics display

7. **Partners Bar** (`PartnersBar.tsx`)
   - Technology partner logos
   - Scroll animation

8. **Industries Showcase** (`IndustriesShowcase.tsx`)
   - Industry cards (2 columns)
   - Vertical scrollable

9. **Recognition Bar** (`RecognitionBar.tsx`)
   - Recognition items
   - Scroll-to-scale animation

10. **Contact CTA** (`ContactCTA.tsx`)
    - Title: "An outcome, not an opinion."
    - Contact form modal
    - Smooth scroll from navigation

### 2. Services Page (`/services`)
**Location:** `apps/web/src/app/services/page.tsx`

**Sections:**
1. **Page Hero** (`PageHero.tsx`)
   - Title and description
   - Custom styling (text-2xl)

2. **Service Category Filter** (`ServiceCategoryFilter.tsx`)
   - Filter buttons (All, Cloud Services, Data & AI, etc.)
   - Sticky header

3. **Services Grid** (`ServicesGrid.tsx`)
   - Filtered services
   - Grid layout (2 columns)
   - Links to individual service pages

### 3. Service Detail Page (`/services/[slug]`)
**Location:** `apps/web/src/app/services/[slug]/page.tsx`

**Sections:**
1. **Content Hero** (`ContentHero.tsx`)
   - Hero image (with parallax effect)
   - Title and description
   - Scroll fade arrow (`ScrollFadeArrow.tsx`)

2. **Problem Section** (`ScrollColorTransition.tsx`)
   - Scroll-based color transition (dark to light)
   - Problem headline and description
   - Solution description

3. **Core Capabilities**
   - Capability cards (2 columns)
   - Optional images for each capability
   - Title and description

4. **Features Section** (Optional)
   - Kicker, title, description
   - Main image
   - Feature items grid (2-3 columns)
   - Each item has image, title, description

5. **Additional Sections** (Optional, multiple)
   - Kicker, title, description
   - Image or video
   - Alignment options (start/center/end)
   - Image positioning based on alignment

6. **Proof Section**
   - Proof kicker, metric, context, body
   - Case study link button

7. **Related Services**
   - Services from same category
   - Grid layout (3 columns)
   - Line-clamp-2 for descriptions

8. **Contact CTA** (`ContactCTA.tsx`)

### 4. Execution Hub (`/execution`)
**Location:** `apps/web/src/app/execution/page.tsx`

**Sections:**
1. **Page Hero** (`PageHero.tsx`)
2. **Services Grid** (`ServicesGrid.tsx`)
3. **Execution Difference** (`ExecutionDifference.tsx`)
4. **Engagement Models** (`EngagementModels.tsx`)
5. **Contact CTA** (`ContactCTA.tsx`)

### 5. Our Model (`/our-model`)
**Location:** `apps/web/src/app/our-model/page.tsx`

**Sections:**
1. **Page Hero** (`PageHero.tsx`)
2. **Model Grid** (`ModelGrid.tsx`)
3. **Principle Grid** (`PrincipleGrid.tsx`)
4. **Timeline** (`Timeline.tsx`)
5. **Contact CTA** (`ContactCTA.tsx`)

### 6. Case Studies (`/case-studies`)
**Location:** `apps/web/src/app/case-studies/page.tsx`

**Sections:**
1. **Page Hero** (`PageHero.tsx`)
2. **Case Study Filter** (`CaseStudyFilter.tsx`)
3. **Case Study Cards Grid**
4. **Contact CTA** (`ContactCTA.tsx`)

### 7. Case Study Detail (`/case-studies/[slug]`)
**Location:** `apps/web/src/app/case-studies/[slug]/page.tsx`

**Sections:**
1. **Hero Section**
2. **Challenge Section**
3. **Solution Section**
4. **Results Section**
5. **Technologies Used**
6. **Contact CTA** (`ContactCTA.tsx`)

### 8. Insights (`/insights`)
**Location:** `apps/web/src/app/insights/page.tsx`

**Sections:**
1. **Page Hero** (`PageHero.tsx`)
2. **Article Cards Grid**
3. **Contact CTA** (`ContactCTA.tsx`)

### 9. Article Detail (`/insights/[slug]`)
**Location:** `apps/web/src/app/insights/[slug]/page.tsx`

**Sections:**
1. **Hero Image**
2. **Article Content** (PortableText)
3. **Contact CTA** (`ContactCTA.tsx`)

### 10. Technology Partners (`/technology-partners`)
**Location:** `apps/web/src/app/technology-partners/page.tsx`

**Sections:**
1. **Page Hero** (`PageHero.tsx`)
2. **Partner Grid** (`PartnerGrid.tsx`)
3. **Contact CTA** (`ContactCTA.tsx`)

---

## Component Hierarchy

### Layout Components
```
RootLayout (layout.tsx)
├── ThemeProvider
│   ├── ScrollProgress
│   ├── Navigation
│   │   ├── Logo
│   │   ├── Navigation Links
│   │   ├── Contact Button
│   │   └── Hamburger Menu
│   │       └── Mobile Menu Overlay
│   ├── Main (children)
│   └── Footer
│       ├── Logo
│       ├── Navigation Links
│       └── Social Links
└── GA4WithConsent
└── OrganizationStructuredData
```

### Section Components
```
Hero
├── Title
├── Description
├── Metrics (4 items)
└── CTA Button

StatsBar
├── Stat Items (4 items)
│   ├── Icon (with bounce animation)
│   ├── Value
│   └── Label
└── Scroll-to-scale animation

AccountabilityGap
├── Title (with scroll blur animation)
└── Description

ModelGrid
├── SectionHeader (right aligned)
└── Model Items (horizontal scroll)
    ├── Number
    ├── Title
    └── Description

ServicesGrid
├── SectionHeader
└── Service Items (grid)
    ├── Number
    ├── Title
    ├── Description
    └── Outcome (optional)

ContentHero
├── Hero Image (parallax)
├── Title
├── Description
└── Scroll Fade Arrow

ScrollColorTransition
└── Children (with color interpolation)

SectionHeader
├── Label (optional)
├── Title (TextAnimate with scroll blur)
└── Description (optional)

ContactCTA
├── Title
├── Description
└── Contact Form Modal
    └── Form Fields
```

### UI Components
```
Button
├── Primary variant
├── Outline variant
└── Custom styles

ContactForm
├── Name field
├── Email field
├── Message field
└── Submit button

Modal
├── Overlay
├── Content
└── Close button

ScrollFadeArrow
└── Arrow icon (fades on scroll)

ScrollProgress
└── Progress bar (top of page)
```

---

## Folder Structure

```
apps/web/src/
├── app/                          # Next.js App Router
│   ├── api/                      # API Routes
│   │   ├── contact/              # Contact form API
│   │   └── preview/              # Sanity preview API
│   ├── case-studies/             # Case Studies
│   │   ├── [slug]/               # Dynamic case study pages
│   │   └── page.tsx              # Case studies listing
│   ├── delivered-value/          # Delivered Value
│   │   ├── [slug]/               # Dynamic delivered value pages
│   │   └── page.tsx              # Delivered value listing
│   ├── execution/                # Execution Hub
│   │   ├── [slug]/               # Dynamic execution pages
│   │   └── page.tsx              # Execution hub page
│   ├── insights/                 # Insights/Articles
│   │   ├── [slug]/               # Dynamic article pages
│   │   └── page.tsx              # Articles listing
│   ├── our-model/                # Our Model page
│   ├── privacy/                  # Privacy Policy
│   ├── services/                 # Services
│   │   ├── [slug]/               # Dynamic service pages
│   │   └── page.tsx              # Services listing
│   ├── technology-partners/      # Technology Partners
│   ├── thought-leadership/       # Thought Leadership (redirects)
│   ├── layout.tsx                # Root layout
│   ├── page.tsx                  # Homepage
│   ├── not-found.tsx             # 404 page
│   ├── robots.ts                 # Robots.txt
│   └── sitemap.ts                # XML Sitemap
├── components/
│   ├── layout/                   # Layout components
│   │   ├── Footer.tsx
│   │   └── Navigation.tsx
│   ├── sections/                 # Section components
│   │   ├── AccountabilityGap.tsx
│   │   ├── CaseStudyFilter.tsx
│   │   ├── ContactCTA.tsx
│   │   ├── ContentHero.tsx
│   │   ├── DeliveredValue.tsx
│   │   ├── EngagementModels.tsx
│   │   ├── ExecutionDifference.tsx
│   │   ├── Hero.tsx
│   │   ├── IndustriesGrid.tsx
│   │   ├── IndustriesShowcase.tsx
│   │   ├── ModelGrid.tsx
│   │   ├── PageHero.tsx
│   │   ├── PartnerGrid.tsx
│   │   ├── PartnersBar.tsx
│   │   ├── PrincipleGrid.tsx
│   │   ├── RecognitionBar.tsx
│   │   ├── ScrollColorTransition.tsx
│   │   ├── ScrollGradientOverlay.tsx
│   │   ├── SectionHeader.tsx
│   │   ├── ServiceCategoryFilter.tsx
│   │   ├── ServicesGrid.tsx
│   │   └── StatsBar.tsx
│   ├── seo/                      # SEO components
│   │   ├── ArticleStructuredData.tsx
│   │   ├── CaseStudyStructuredData.tsx
│   │   └── OrganizationStructuredData.tsx
│   ├── providers/                # Context providers
│   │   └── ThemeProvider.tsx
│   └── ui/                       # UI components
│       ├── Button.tsx
│       ├── ContactForm.tsx
│       ├── ConsentBanner.tsx
│       ├── GA4WithConsent.tsx
│       ├── Label.tsx
│       ├── Modal.tsx
│       ├── ScrollFadeArrow.tsx
│       └── ScrollProgress.tsx
├── lib/                          # Utilities and helpers
│   ├── sanity.client.ts          # Sanity client
│   ├── sanity.queries.ts         # Sanity GROQ queries
│   ├── sanity.types.ts           # Sanity TypeScript types
│   ├── static-services.ts        # Static service data
│   └── services.ts               # Service helpers
├── registry/                     # Magic UI components
│   └── magicui/                  # Third-party UI components
└── sanity/                       # Sanity CMS
    ├── schemas/                  # Sanity schemas
    │   ├── servicePage.ts
    │   ├── caseStudy.ts
    │   ├── article.ts
    │   └── ...
    └── ...
```

---

## Data Flow

### Sanity CMS Integration

**Content Types:**
1. **Homepage** (`homepage`)
   - Hero metrics
   - Stats items
   - Services
   - Partners
   - Industries
   - Recognition items

2. **Service Pages** (`servicePage`)
   - Hero section
   - Problem section
   - Core capabilities
   - Features section
   - Additional sections
   - Proof section
   - CTA section

3. **Case Studies** (`caseStudy`)
   - Hero section
   - Challenge
   - Solution
   - Results
   - Technologies used

4. **Articles** (`article`)
   - Hero image
   - Title
   - Excerpt
   - Body content (PortableText)

5. **Engagement Models** (`engagementModel`)
   - Title
   - Summary
   - Pillars
   - CTA label

6. **Technology Partners** (`technologyPartner`)
   - Name
   - Logo
   - Website
   - Excerpt
   - Categories

### Data Fetching Flow

```
Page Component
├── Server Component (async)
├── Fetch from Sanity CMS
│   ├── Use client.fetch()
│   ├── GROQ queries
│   └── Handle errors with fallback data
├── Static Fallback Data
│   └── apps/web/src/lib/static-services.ts
└── Render Components
    ├── Pass data as props
    └── Client Components for interactivity
```

### Static vs Dynamic Data

**Static Data:**
- Fallback services (`STATIC_SERVICES`)
- Default homepage data (`FALLBACK_DATA`)
- Service keywords map
- Category labels

**Dynamic Data (Sanity CMS):**
- All service pages
- Case studies
- Articles
- Homepage content
- Engagement models
- Technology partners

---

## Key Features

### 1. Theme System
- **Dark/Light Mode Toggle**
- Uses `next-themes`
- Dark theme is default
- Smooth theme transitions
- Theme persisted in localStorage

### 2. Scroll Animations
- **Scroll-to-scale** (StatsBar, RecognitionBar)
- **Scroll-based blur** (TextAnimate)
- **Scroll-based color transition** (ScrollColorTransition)
- **Scroll fade arrow** (ScrollFadeArrow)
- **Scroll progress bar** (ScrollProgress)
- **Scroll gradient overlay** (ScrollGradientOverlay)

### 3. Navigation
- **Fixed header** with scroll effects
- **Hamburger menu** (mobile)
- **Smooth scroll** to sections
- **Active link highlighting**
- **Logo changes** based on theme

### 4. Forms
- **Contact form modal**
- **Smooth slide-up animation**
- **Form validation**
- **API route** for form submission
- **Success/error states**

### 5. Image Optimization
- **Next.js Image component**
- **Sanity CDN integration**
- **Responsive images**
- **Lazy loading**
- **Image optimization**

### 6. SEO
- **Dynamic metadata** (title, description, keywords)
- **Structured data** (JSON-LD)
- **XML Sitemap**
- **Robots.txt**
- **Open Graph tags**

### 7. Performance
- **Static Site Generation (SSG)**
- **Incremental Static Regeneration (ISR)**
- **Image optimization**
- **Code splitting**
- **Lazy loading**

### 8. Responsive Design
- **Mobile-first approach**
- **Breakpoints:**
  - Mobile: `< 768px`
  - Tablet: `768px - 1024px`
  - Desktop: `> 1024px`
  - Large Desktop: `> 1280px` (2xl)
- **Responsive padding:** `px-4 md:px-16 2xl:px-6`

### 9. Accessibility
- **Semantic HTML**
- **ARIA labels**
- **Keyboard navigation**
- **Focus states**
- **Screen reader support**

### 10. Content Management
- **Sanity CMS integration**
- **Preview mode**
- **Draft content support**
- **Webhook integration**
- **Static fallback data**

---

## Component Usage Patterns

### Server Components (Default)
- All page components
- Data fetching
- Static content
- SEO metadata

### Client Components (`'use client'`)
- Interactive components
- Scroll animations
- Theme toggler
- Forms
- Modals
- Navigation

### Shared Components
- Layout components (Navigation, Footer)
- Section components (Hero, StatsBar, etc.)
- UI components (Button, Modal, etc.)

---

## Styling

### Tailwind CSS
- **Utility-first CSS**
- **Custom theme colors**
- **Custom fonts** (Libre Franklin, Metrophobic)
- **Dark mode support**
- **Responsive utilities**

### Custom Classes
- `max-w-container` (1600px)
- `max-w-content` (1200px)
- `max-w-prose` (720px)
- Font utilities (`!font-metrophobic`)
- Section label styles

### Animations
- **CSS transitions** (smooth color changes)
- **CSS animations** (bounce, pulse)
- **Scroll-based animations** (JavaScript)
- **Framer Motion** (if used)

---

## API Routes

### `/api/contact`
- **Method:** POST
- **Purpose:** Handle contact form submissions
- **Response:** JSON
- **Error handling:** Try-catch with error responses

### `/api/preview`
- **Method:** GET
- **Purpose:** Enable Sanity preview mode
- **Parameters:** `secret`, `slug`
- **Response:** Redirect to preview page

---

## Environment Variables

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=n627fp81
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
NEXT_PUBLIC_SITE_URL=https://mobizinc.com
SANITY_PREVIEW_SECRET=your-secret-key
GA_TRACKING_ID=your-ga-id
```

---

## Build & Deployment

### Build Process
1. **Type checking** (TypeScript)
2. **Linting** (ESLint)
3. **Building** (Next.js)
4. **Static generation** (SSG)
5. **Optimization** (images, code splitting)

### Deployment
- **Vercel** (recommended)
- **Static export** (optional)
- **Environment variables** (required)
- **Webhook integration** (Sanity → Vercel)

---

## Development Workflow

### Local Development
```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev

# Run Sanity Studio
pnpm sanity:dev

# Build for production
pnpm build

# Start production server
pnpm start
```

### Content Updates
1. **Edit in Sanity CMS** (preferred)
2. **Edit static data** (fallback)
3. **Restart dev server** (if needed)
4. **Hard refresh browser** (clear cache)

### Code Updates
1. **Edit components**
2. **Hot reload** (automatic)
3. **Check browser console** (errors)
4. **Test on different devices**

---

## Testing

### Test Files
- Component tests (`__tests__/`)
- Unit tests
- Integration tests
- E2E tests (Playwright)

### Test Commands
```bash
# Run tests
pnpm test

# Watch mode
pnpm test:watch

# E2E tests
pnpm test:e2e
```

---

## Documentation

### Available Docs
- `HOW_TO_EDIT_CONTENT.md` - Content editing guide
- `SANITY_SERVICE_PAGE_GUIDE.md` - Service page guide
- `TROUBLESHOOTING_SANITY_UPDATES.md` - Troubleshooting guide
- `WHY_CHANGES_NOT_REFLECTING.md` - Update issues guide
- `WEBSITE_STRUCTURE.md` - This file

### Additional Resources
- Sanity CMS documentation
- Next.js documentation
- Tailwind CSS documentation
- React documentation

---

## Future Enhancements

### Planned Features
- [ ] Blog/Article comments
- [ ] Search functionality
- [ ] Multi-language support
- [ ] Advanced filtering
- [ ] Video embeds optimization
- [ ] Performance monitoring
- [ ] Analytics dashboard
- [ ] A/B testing

### Potential Improvements
- [ ] Component library documentation
- [ ] Storybook integration
- [ ] Automated testing
- [ ] Performance optimization
- [ ] Accessibility improvements
- [ ] SEO enhancements

---

## Support & Maintenance

### Common Issues
1. **Content not updating** - Check Sanity CMS, restart dev server
2. **Build errors** - Check TypeScript/ESLint errors
3. **Image not loading** - Check Sanity CDN, image URLs
4. **Theme not working** - Check ThemeProvider, localStorage
5. **Scroll animations not working** - Check client component, scroll listeners

### Getting Help
- Check documentation files
- Review error messages
- Check browser console
- Check Sanity CMS status
- Review build logs

---

## Version Information

- **Next.js:** 15.1.5
- **React:** 18.2.0
- **TypeScript:** Latest
- **Tailwind CSS:** Latest
- **Sanity CMS:** 4.12.0
- **Node.js:** 20+

---

## License

Proprietary - Mobiz Inc.

---

**Last Updated:** 2024
**Maintained By:** Mobiz Development Team

