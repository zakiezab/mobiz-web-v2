# Mobiz Website Redesign - Master Planning Document

**Project Vision:** An elite engineering firm shouldn't use a commodity, off-the-shelf solution. The stack itself should be a testament to your "first-principles" approach.

---

## Technology Stack

### The "Engineering-First" Stack

#### Front-End Framework: Next.js (built on React)
- **What it is:** A React framework for building high-performance, server-rendered and static-generated (SSG) websites.
- **Why it's right for Mobiz:**
  - **Peak Performance:** Next.js generates static HTML files from your content. This makes your site blazingly fast and secure, which is a direct reflection of your engineering quality.
  - **Industry Standard:** It's the trusted, battle-tested standard for companies like Vercel, auth0, and even parts of AWS. It signals you're at the forefront of technology.
  - **Developer-Friendly:** Your own team (or partners) will love working with it. It's a modern, powerful, and respected toolset.

#### Headless CMS: Sanity.io
- **What it is:** A high-performance API that stores your content. The "Studio" (your editing interface) is an open-source React app that you control and can customize.
- **Why it's right for Mobiz:**
  - **It's a "Builder's" CMS:** Unlike a "black box" like Contentful, Sanity's open-source studio means you can build your perfect editing experience. This aligns perfectly with your "first-principles" and "builder" mentality.
  - **Extreme Flexibility:** It's fantastic for structured content. You can define your "Thought Leadership" articles, "Case Studies," and "Service Pages" as clean data models, which your marketing team can then use.
  - **Powerful & Fast:** It has an incredible query language (GROQ) and a real-time API, making it a joy to work with from a developer's perspective.

#### Hosting / Deployment: Vercel
- **What it is:** A hosting platform built by the creators of Next.js.
- **Why it's right for Mobiz:**
  - **Seamless Workflow:** It is purpose-built to host Next.js apps. You connect your Git repository (like GitHub), and it deploys your site automatically across a global CDN every time you (or your CMS) make a change.
  - **It's the "No-Brainer":** It's the path of least resistance to get the best possible performance out of a Next.js site. Using Vercel for a Next.js app is like using the official, high-performance solution.

---

## Site Architecture

### Information Architecture Principles

**CRITICAL DECISION: Engagement Models Are Informational Only**

Engagement models (End-to-End, Acceleration, Capability Build, Embedded Partner) appear ONLY on the `/execution` parent page as informational content. They do NOT get their own child pages.

**Strategic Reasoning:**
1. **User Intent: Clients Buy Solutions, Not Contracts**
   - Prospects arrive with a problem ("Our cloud migration is failing")
   - They're shopping for the service that solves it (`/execution/cloud-transformation`)
   - Engagement models are the "how do I buy" question (commercial wrapper)
   - Creating separate pages forces clients to learn internal jargon before you've proven you can solve their problem

2. **Information Architecture: Logistics, Not Services**
   - Pillars (Cloud, AI, Digital Product, Core Systems) = WHAT we do
   - Models (End-to-End, Acceleration, etc.) = HOW we package/sell it
   - Models are features of execution services, not standalone services
   - They belong on the parent page describing execution services

3. **Brand Alignment: Velocity, Not Process**
   - Separate engagement model pages = "Let's have a 6-week discovery to plan a 12-week discovery"
   - This screams traditional, process-heavy consulting (opposite of our brand)
   - Our brand = velocity and outcomes
   - Present models as: "Here are 4 ways we can start next Monday" (confident, direct, respects client's time)

**The Correct Structure:**
- `/execution` (Parent Hub): "What do you do?" (4 Pillars) + "How do I buy it?" (4 Models - informational)
- `/execution/[child]`: "How exactly will you solve my specific problem?"
- `/our-model`: "What is your delivery process that makes you different?"

### Core Pages

#### 1. Home Page (/)
- **Purpose:** Tell the entire brand story in one scroll. Introduce the problem, solution, proof, and what we do.
- **Sections:**
  1. **Hero:** "Strategy is speculation. Execution is truth."
  2. **Stats Bar:** "Currently Executing: Cloud, AI, Digital Products..."
  3. **The Core Problem:** "The Accountability Gap"
  4. **The Solution:** "Our Model: One Team. One Outcome." (3-step overview linking to /our-model)
  5. **The Proof:** "Delivered Value" (Mini case studies, NO testimonials)
  6. **Recognition:** Social proof (F500 Clients, $2B+ Value, 6-12 Months)
  7. **What We Do:** "Full-Stack Execution" (4 core service pillars, linking to /execution)
  8. **Technology:** "Technology-Agnostic, Ecosystem-Deep" (Logo bar, linking to /technology-partners)
  9. **Industries:** "Industries We Execute In"
  10. **CTA:** "An Outcome, Not an Opinion."

#### 2. Our Model (/our-model)
- **Purpose:** Deep dive into HOW we work, proving its value
- **Sections:**
  1. **Hero:** "The Path to Production."
  2. **The Process:** 4-step timeline: Clarity, Velocity, Certainty, Scale
  3. **The Principles:** Execution principles (Zero Handoffs, Technology Agnostic, Velocity, Outcome Guaranteed)
  4. **CTA:** "An Outcome, Not an Opinion."

#### 3. Execution - Parent Hub (/execution)
- **Purpose:** Primary capability hub. Reinforces WHAT (services) connected to WHY (model)
- **Sections:**
  1. **Hero:** "From the C-Suite to the Codebase"
     - Sub-headline: "Our model is not theoretical. We deliver complex, production-grade systems across four core execution pillars. We don't just advise on 'what.' We own the 'how.'"
  2. **Core Execution Pillars:** 4-quadrant grid (cards link to child pages)
     - Cloud Transformation
     - AI & Data Platforms
     - Digital Product Engineering
     - Core System Modernization
  3. **The Execution Difference:** 3-column layout reinforcing brand pillars
     - Zero Handoffs: "The Team That Designs, Builds"
     - Technology Agnostic: "Built on First Principles" (links to /technology-partners)
     - Outcome Guaranteed: "Finished in Production, Not PowerPoint"
  4. **Engagement Models:** 2x2 grid (INFORMATIONAL ONLY - NO CHILD PAGES)
     - End-to-End Transformation
     - Strategic Acceleration
     - Capability Build
     - Embedded Execution Partner
  5. **CTA:** "An Outcome, Not an Opinion."

#### 3.1 Cloud Transformation (/execution/cloud-transformation)
- **Purpose:** Deep-dive proving specific cloud expertise (template for other service pages)
- **Sections:**
  1. **Hero:** "Beyond 'Lift & Shift.' Cloud-Native Certainty."
     - Sub-headline: Complex cloud transformations with zero disruption, fixed timelines, guaranteed outcomes
  2. **The Problem: The Cloud "Stall"** (2-column: Problem vs. Mobiz Model)
     - Why most migrations fail (lift & shift, accountability gap)
     - How our model ensures app, data, infrastructure transformed together
  3. **Core Capabilities:** Grid of specific capabilities
     - Application Modernization
     - Multi-Cloud Architecture
     - Zero-Downtime Migration
     - Cloud-Native Engineering
     - FinOps & Cost Certainty
  4. **Proof of Value:** Single powerful case study with metrics
     - Links to full story in /delivered-value
  5. **CTA:** "Ready to Execute Your Cloud Strategy?"

#### 3.2 AI & Data Platforms (/execution/ai-data-platforms)
- **Purpose:** TBD - Use Cloud Transformation template
- **Sections:** TBD

#### 3.3 Digital Product Engineering (/execution/digital-product-engineering)
- **Purpose:** TBD - Use Cloud Transformation template
- **Sections:** TBD

#### 3.4 Core System Modernization (/execution/core-system-modernization)
- **Purpose:** TBD - Use Cloud Transformation template
- **Sections:** TBD

#### 4. Delivered Value (/delivered-value)
- **Purpose:** Portfolio page. Objective, factual proof.
- **Sections:**
  1. **Hero:** "Value, Delivered. Proof, Not Promises."
     - Sub-headline: "We measure success in production systems, not PowerPoints."
  2. **Filter & Portfolio Grid:** Filterable case study cards
     - Filter by Industry (Financial Services, Healthcare, Manufacturing, Energy, Retail)
     - Filter by Execution (Cloud, AI & Data, Digital Product, Core Systems)
     - Card format: Kicker, Headline, Large Metric, Context, Tag, CTA
     - Example cards provided in brief (Financial Services: $47M savings, Healthcare: 6 months concept-to-production, etc.)
  3. **CTA:** "Ready to Build Your Proof Point?"

#### 4.1 Case Study Pages (/delivered-value/[case-study-slug])
- **Purpose:** Individual case study details
- **Sections:** TBD (based on standard case study template)

#### 5. Thought Leadership (/thought-leadership)
- **Purpose:** Establish "assured, expert partner" voice. Top-of-funnel content.
- **Sections:**
  1. **Hero:** "Execution is our truth. This is our perspective."
     - Sub-headline: "Authoritative insights from the front lines of technology execution. We write for leaders who build."
  2. **Featured Content:** Large hero block for most important pillar asset
     - Example: "The Accountability Gap" whitepaper
  3. **Insights Feed:** 3-column grid of article cards (paginated)
     - Tag, Headline, Excerpt, CTA
     - Example articles: "The Physics of Vendor Selection," "Your AI Strategy is a Hallucination," "Zero Handoffs as a Forcing Function," "The True Cost of a Stalled Migration"
  4. **CTA:** "Get Perspective on Your Project"

#### 5.1 Article Pages (/thought-leadership/[article-slug])
- **Purpose:** Individual thought leadership articles
- **Sections:** TBD

#### 6. Technology & Partners (/technology-partners)
- **Purpose:** The "audit" page. Validates specialization without leading with it.
- **Sections:**
  1. **Hero:** "Technology-Agnostic. Ecosystem-Deep."
  2. **Content:** "Enterprise-Ready Expertise"
     - Explains WHY we have certifications (compliance, audit, execution certainty)
     - Copy: "Our model is built on first-principles engineering and is technology-agnostic. We recommend the right stack for your unique constraints and goals, not our partner quotas."
  3. **Partner Grid:** Factual grid of logos and specialization levels
     - Microsoft, AWS, GCP, etc.
  4. **CTA:** Simple footer CTA

#### 7. Contact
- **Purpose:** Start the conversation with qualified leads
- **Implementation:** Final CTA section on every page, directing to simple "Start the Conversation" page or contact form
- **Information to Capture:**
  - Name, Title, Company
  - Challenge/Opportunity
  - Preferred Contact Method
- **Integration Points:** TBD (CRM, calendar scheduling)

---

## Brand & Design Direction

### Core Brand Identity

**Positioning:** The Execution Partner for F500 Technology Leaders

**Core Message:** Strategy is speculation. **Execution is truth.**

**Brand Tagline:** Strategy, Executed.

**Core Problem We Solve:** "The Accountability Gap"—the void between strategy firms that deliver PowerPoints and system integrators that deliver billable hours.

**Our Solution:** "The Mobiz Model"—a single, integrated team that owns the outcome from strategic architecture to production-ready systems. **Zero Handoffs. 100% Accountability.**

### Target Audience

**Primary:** Fortune 500 Technology Executives (CTO, CIO, VP of Engineering, VP of Digital Transformation)

**Psychographics:**
- Experienced leaders, not first-time buyers
- Have been burned by the "Accountability Gap" before
- Skeptical of "innovation theater" and vendor-speak
- Value certainty, velocity, and understanding of real-world constraints (legacy tech, politics, compliance)
- See themselves as "builders" and "operators," not just "managers"

### Brand Voice & Tone

Our voice is that of an assured, expert partner. We are peers with our clients.

**We Are:**
- **Declarative** (We close the gap.)
- **Confident** (Execution is truth.)
- **Assured** (Our model delivers...)
- **Peer-to-Peer** (We partner with leaders...)
- **Concise & Sophisticated** (Clarity. Velocity. Certainty.)
- **Accountable** (We own the outcome.)

**We Are NOT:**
- **Descriptive** (We are a firm that...)
- **Arrogant** (We are the best.)
- **Defensive** (We don't just plan...)
- **Salesy** (We can help you...)
- **Jargony** (Synergistic, end-to-end...)
- **Aggressive** (We dominate...)

### Key Messaging Pillars

**1. Accountability (The "Why")**
- Headline: The Accountability Gap
- Message: Traditional consulting models are broken. Strategy firms and integrators create a gap where execution fails. We close it. The team that architects the vision is the team that builds the reality.

**2. Velocity (The "How")**
- Headline: One Team. One Outcome.
- Message: Our model eliminates the friction of handoffs. By integrating architects and engineers, we compress timelines from years to months. We deliver value with velocity.

**3. Certainty (The "What")**
- Headline: An Outcome, Not an Opinion.
- Message: Our work isn't finished with a PowerPoint. It's finished when your system is in production, scaled, and delivering measurable value. We don't just deploy; we guarantee the outcome.

### Vendor & Technology Positioning

**The Challenge:** We are "Vendor Agnostic" (core philosophy) but must show "Vendor Specialization" (client requirement for audits).

**The Solution:**
1. **Primary Message (Agnostic):** Lead with our model, not technology. Vendor-agnostic recommendations based on physics and client reality, not partner incentives.
2. **Validation Message (Specialized):** Dedicated "Technology & Partners" page for validation (auditors, technical buyers).

**Sample Copy for "Technology & Partners" Page:**
- **Headline:** Technology-Agnostic. Ecosystem-Deep.
- **Body:** "Our model is built on first-principles engineering and is technology-agnostic. We recommend the right stack for your unique constraints and goals, not our partner quotas."
- **Sub-Headline:** Enterprise-Ready Expertise
- **Body:** "To deliver with certainty, our teams maintain deep, certified expertise across the mission-critical platforms our clients rely on. This ensures seamless execution, deep integration, and full compliance with enterprise audit requirements."

### Visual Identity (TBD)
- **Color Palette:**
- **Typography:**
- **Imagery Style:**
- **Motion/Animation:**

---

## Content Strategy

### Current State (From mobizinc.com)
**What Mobiz Does:**
- IT solutions consultancy focused on digital transformation
- Cloud infrastructure and network automation (Azure specialist)
- Data protection and cybersecurity
- Data & AI solutions
- ServiceNow services
- Microsoft Business Applications

**Key Credentials:**
- 14+ years in business (founded 2008)
- Global presence (HQ: California, offices in multiple regions including GCC)
- 100+ technologists
- Microsoft Partner
- Notable clients: Sanofi, enterprise healthcare, pharmaceutical, travel, retail, warehousing, entertainment

**Core Values:**
- One Team: Collaboration across global offices
- Own It: Proactive accountability
- Client Centric: Problem-solving focused on client needs
- Feedback Always: Growth through constructive feedback

### Content Models for Sanity CMS

#### Service Page Schema (Execution Child Pages)
```typescript
{
  name: 'servicePage',
  title: 'Service Page',
  type: 'document',
  fields: [
    { name: 'title', type: 'string', required: true },
    { name: 'slug', type: 'slug', required: true },
    { name: 'kicker', type: 'string' }, // e.g., "Execution /"
    { name: 'hero_headline', type: 'string', required: true },
    { name: 'hero_subheadline', type: 'text', required: true },
    
    // The Problem Section (2-column)
    { name: 'problem_headline', type: 'string' },
    { name: 'problem_description', type: 'text' },
    { name: 'solution_description', type: 'text' },
    
    // Core Capabilities
    {
      name: 'capabilities',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'title', type: 'string' },
          { name: 'description', type: 'text' }
        ]
      }]
    },
    
    // Proof of Value (Mini Case Study)
    { name: 'proof_kicker', type: 'string' },
    { name: 'proof_metric', type: 'string' },
    { name: 'proof_context', type: 'string' },
    { name: 'proof_body', type: 'text' },
    { name: 'proof_case_study_link', type: 'reference', to: [{ type: 'caseStudy' }] },
    
    // CTA
    { name: 'cta_headline', type: 'string' },
    { name: 'cta_body', type: 'text' },
    { name: 'cta_button_text', type: 'string' },
    
    // Meta
    { name: 'meta_title', type: 'string' },
    { name: 'meta_description', type: 'text' },
  ]
}
```

#### Case Study Schema
```typescript
{
  name: 'caseStudy',
  title: 'Case Study',
  type: 'document',
  fields: [
    { name: 'title', type: 'string', required: true },
    { name: 'slug', type: 'slug', required: true },
    
    // Card Display
    { name: 'kicker', type: 'string', required: true }, // e.g., "Global Financial Services"
    { name: 'card_headline', type: 'string', required: true },
    { name: 'metric_large', type: 'string', required: true }, // e.g., "$47M"
    { name: 'metric_context', type: 'string', required: true }, // e.g., "Annual Savings Realized"
    
    // Filters/Tags
    {
      name: 'industry',
      type: 'string',
      options: {
        list: [
          { title: 'Financial Services', value: 'financial' },
          { title: 'Healthcare', value: 'healthcare' },
          { title: 'Manufacturing', value: 'manufacturing' },
          { title: 'Energy', value: 'energy' },
          { title: 'Retail', value: 'retail' }
        ]
      }
    },
    {
      name: 'execution_type',
      type: 'string',
      options: {
        list: [
          { title: 'Cloud Transformation', value: 'cloud' },
          { title: 'AI & Data', value: 'ai-data' },
          { title: 'Digital Product', value: 'digital-product' },
          { title: 'Core Systems', value: 'core-systems' }
        ]
      }
    },
    
    // Full Story Content
    { name: 'challenge', type: 'text' },
    { name: 'solution', type: 'text' },
    { name: 'results', type: 'array', of: [{ type: 'block' }] },
    { name: 'technologies_used', type: 'array', of: [{ type: 'string' }] },
    { name: 'client_quote', type: 'text' },
    { name: 'quote_attribution', type: 'string' },
    { name: 'featured_image', type: 'image' },
    
    // Related Content
    { name: 'related_services', type: 'array', of: [{ type: 'reference', to: [{ type: 'servicePage' }] }] },
    
    // Meta
    { name: 'meta_title', type: 'string' },
    { name: 'meta_description', type: 'text' },
  ]
}
```

#### Article Schema (Thought Leadership)
```typescript
{
  name: 'article',
  title: 'Article',
  type: 'document',
  fields: [
    { name: 'title', type: 'string', required: true },
    { name: 'slug', type: 'slug', required: true },
    { name: 'headline', type: 'string', required: true },
    { name: 'excerpt', type: 'text', required: true },
    
    // Categorization
    {
      name: 'tag',
      type: 'string',
      options: {
        list: [
          { title: 'Engineering', value: 'engineering' },
          { title: 'AI & Data', value: 'ai-data' },
          { title: 'Leadership', value: 'leadership' },
          { title: 'Cloud', value: 'cloud' }
        ]
      }
    },
    { name: 'is_featured', type: 'boolean', description: 'Show as featured content on Thought Leadership page' },
    
    // Content
    { name: 'body', type: 'array', of: [{ type: 'block' }], required: true },
    { name: 'featured_image', type: 'image' },
    
    // Metadata
    { name: 'author', type: 'string' },
    { name: 'published_date', type: 'datetime' },
    
    // Related Content
    { name: 'related_articles', type: 'array', of: [{ type: 'reference', to: [{ type: 'article' }] }] },
    { name: 'related_services', type: 'array', of: [{ type: 'reference', to: [{ type: 'servicePage' }] }] },
    
    // Meta
    { name: 'meta_title', type: 'string' },
    { name: 'meta_description', type: 'text' },
  ]
}
```

#### Engagement Model Schema (For /execution parent page)
```typescript
{
  name: 'engagementModel',
  title: 'Engagement Model',
  type: 'document',
  fields: [
    { name: 'kicker', type: 'string', required: true }, // e.g., "Transformation"
    { name: 'title', type: 'string', required: true },
    { name: 'body', type: 'text', required: true },
    { name: 'order', type: 'number', description: 'Display order on page' }
  ]
}
```

#### Technology Partner Schema
```typescript
{
  name: 'technologyPartner',
  title: 'Technology Partner',
  type: 'document',
  fields: [
    { name: 'name', type: 'string', required: true },
    { name: 'logo', type: 'image', required: true },
    { name: 'specialization_level', type: 'string' }, // e.g., "Gold Partner", "Advanced Tier"
    { name: 'certifications', type: 'array', of: [{ type: 'string' }] },
    { name: 'order', type: 'number', description: 'Display order on page' }
  ]
}
```

#### Site Settings Schema
```typescript
{
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    // Homepage Stats Bar
    { name: 'stats_currently_executing', type: 'string' },
    
    // Recognition/Social Proof
    { name: 'f500_clients_count', type: 'string' },
    { name: 'value_delivered', type: 'string' },
    { name: 'typical_timeline', type: 'string' },
    
    // Industries
    { name: 'industries', type: 'array', of: [{ type: 'string' }] },
    
    // Contact/CTA
    { name: 'primary_cta_text', type: 'string' },
    { name: 'primary_cta_url', type: 'string' },
    
    // SEO
    { name: 'default_meta_title', type: 'string' },
    { name: 'default_meta_description', type: 'text' },
    { name: 'og_image', type: 'image' }
  ]
}
```

---

## Technical Implementation Notes

### Next.js Configuration
- TypeScript for type safety
- App Router (Next.js 13+)
- Server Components for performance
- Image optimization with next/image
- Dynamic routes for content types

### Sanity Integration
- Real-time preview
- GROQ queries for efficient data fetching
- Image CDN with automatic optimization
- Content validation schemas

### Performance Targets
- Lighthouse score: 95+ across all metrics
- First Contentful Paint: <1.5s
- Time to Interactive: <3s
- Core Web Vitals: All "Good"

### SEO Strategy
- Dynamic meta tags per page
- Structured data (JSON-LD)
- XML sitemap generation
- OpenGraph & Twitter cards
- Analytics integration (Google Analytics 4)

---

## Project Phases

### Phase 1: Foundation & Infrastructure
- [ ] Initialize Next.js project
- [ ] Configure TypeScript & ESLint
- [ ] Set up Sanity CMS
- [ ] Define content schemas
- [ ] Configure Vercel deployment
- [ ] Set up Git repository

### Phase 2: Design & Content Architecture
- [ ] Finalize page structure
- [ ] Define brand guidelines
- [ ] Create design system/component library
- [ ] Write core messaging
- [ ] Define content requirements

### Phase 3: Development
- [ ] Build core page templates
- [ ] Implement Sanity integration
- [ ] Create reusable components
- [ ] Implement navigation & routing
- [ ] Add animations/interactions
- [ ] Optimize for performance

### Phase 4: Content Population
- [ ] Populate Sanity with content
- [ ] Add case studies
- [ ] Migrate relevant blog content
- [ ] Add team information
- [ ] Optimize images

### Phase 5: Launch Preparation
- [ ] SEO optimization
- [ ] Performance testing
- [ ] Cross-browser testing
- [ ] Accessibility audit
- [ ] Analytics setup
- [ ] DNS configuration
- [ ] SSL certificate

### Phase 6: Post-Launch
- [ ] Monitor performance
- [ ] Gather user feedback
- [ ] Iterate based on data
- [ ] Content updates

---

## Key Questions to Answer

1. **Visual Identity & Design**
   - How do we visually communicate "first-principles engineering" and "Zero Handoffs"?
   - What's the right balance of sophistication vs. accessibility?
   - Color palette: Bold/confident or refined/sophisticated?
   - Typography: Modern/technical or classic/authoritative?
   - Motion/animation: Subtle or bold?

2. **Content & Case Studies**
   - Which case studies beyond Sanofi should be featured?
   - Do we have measurable outcomes (time saved, cost reduced, velocity increased) for each?
   - Do we have client quotes/testimonials?
   - What F500 client logos can we show (with permission)?

3. **Technical & Operational**
   - What CRM are you using for lead capture?
   - Do you want calendar scheduling (Calendly, HubSpot, etc.) integration?
   - What analytics platform (GA4, Mixpanel, etc.)?
   - Any marketing automation (HubSpot, Marketo, etc.)?

4. **Conversion & Lead Qualification**
   - What's the typical buyer journey for F500 executives?
   - What proof points do they need to see before reaching out?
   - How do we qualify leads (company size, role, challenge type)?
   - What's the primary CTA: "Schedule a Call," "Talk to Our Team," "See How We Work"?

5. **Competitive Differentiation**
   - Who are the competitors we're positioning against? (Strategy firms: McKinsey, BCG? SIs: Accenture, Deloitte?)
   - What's the one thing we want CTOs to remember after visiting the site?

6. **Technology Partners Page**
   - Which partnerships/certifications are most important for audits?
   - Microsoft (Azure) - what level (Partner, Gold, etc.)?
   - AWS, GCP - any specializations?
   - ServiceNow - partnership level?
   - Others?

---

## Notes & Ideas

### Home Page Concept: Initial Wireframe Ideas

**Hero Section**
- Bold, declarative headline: "Strategy is speculation. Execution is truth."
- Sub-headline: "Strategy, Executed."
- No generic hero image—consider: Clean, confident visual (minimal, technical, sophisticated)
- CTA: "Talk to Our Team" (primary) / "See How We Work" (secondary)

**Section 1: The Problem (The Accountability Gap)**
- Headline: "The Accountability Gap"
- Visual: Split-screen showing the traditional broken model
  - Left: Strategy firms → PowerPoint decks
  - Right: System integrators → Billable hours
  - Center: THE GAP (where execution fails)
- Copy: Brief, declarative explanation of the problem
- No bullet points—prose that builds the case

**Section 2: The Solution (The Mobiz Model)**
- Headline: "The Mobiz Model"
- Sub-headline: "Zero Handoffs. 100% Accountability."
- Visual: Integrated model—architects + engineers in one team
- Copy: The team that architects the vision is the team that builds the reality
- Three key phrases: Accountability. Velocity. Certainty.

**Section 3: The Three Pillars (Expanded)**
- Three columns or sections, each with:
  - Pillar name + "The Why/How/What"
  - Concise, sophisticated copy (2-3 sentences max)
  - Visual representation of each concept
  
**Section 4: Proof (Featured Case Study)**
- Headline: "An Outcome, Not an Opinion."
- Featured: Sanofi story
  - The Challenge
  - The Approach
  - The Outcome: "1/3 the time. 1/3 the budget. From 6 months to hours."
- CTA: "See More Case Studies" or "Read the Full Story"

**Section 5: Who We Serve**
- Headline: "The Execution Partner for F500 Technology Leaders"
- Brief description of target audience (CTOs, CIOs, VPs)
- Optional: Client logos (if available and approved)

**Final CTA Section**
- Headline: "Close the Gap"
- CTA: "Talk to Our Team"
- Simple, clean, confident

---

### Visual Design Inspiration

**Typography:**
- Consider: Sharp, modern sans-serif for headlines (Inter, Söhne, ABC Favorit)
- Body: Readable, sophisticated (System stack or same font family)
- Large type sizes—confident, declarative

**Color Palette Ideas:**
- Option 1: Bold & Confident (Deep blue or black + vibrant accent)
- Option 2: Refined & Sophisticated (Charcoal, white, subtle accent)
- Option 3: Technical & Precise (Monochromatic with technical accent)

**Imagery Style:**
- No stock photos of people in suits shaking hands
- Consider: Abstract/technical visualization, clean diagrams, data visualizations
- Or: Real work—actual infrastructure diagrams, code, architecture
- Photography (if used): Real team, real environments, authentic

**Animation/Motion:**
- Subtle, sophisticated
- Purpose-driven (illustrate concepts like "Zero Handoffs")
- Performance-first (doesn't slow page load)

---

## Document Summary & Status

### What's Complete

✅ **Brand Strategy Integrated**
- Core positioning: "The Execution Partner for F500 Technology Leaders"
- Problem/Solution framework: The Accountability Gap → The Mobiz Model
- Three messaging pillars: Accountability, Velocity, Certainty
- Voice & tone guidelines fully defined
- Vendor positioning strategy (agnostic primary, specialized validation)

✅ **Complete Site Architecture**
- 7 main pages + child pages for services, case studies, articles
- Full section-by-section breakdown for each page
- Copy direction and content examples provided
- Critical IA decision documented (engagement models informational only)

✅ **Content Schemas Defined**
- TypeScript-ready Sanity schemas for all content types
- Service pages, case studies, articles, engagement models, tech partners, site settings
- Includes filtering, tagging, and relational content structure

✅ **Technical Foundation**
- Stack confirmed: Next.js + Sanity + Vercel
- Performance targets defined
- SEO strategy outlined
- Implementation approach documented

### What's Next

**Immediate Next Steps (Choose Your Path):**

**Path 1: Start Building (Technical)**
1. Initialize Next.js project with TypeScript, Tailwind, App Router
2. Set up Sanity studio with the defined schemas
3. Configure Vercel deployment pipeline
4. Build component library (Hero, CTAs, Cards, Grids)
5. Create page templates for each main page

**Path 2: Content Development (Strategic)**
1. Write full copy for home page (all 10 sections)
2. Complete copy for remaining 3 service child pages (AI & Data, Digital Product, Core Systems)
3. Develop 8-10 case study stories with metrics
4. Create 6-8 thought leadership articles
5. Gather and prepare all imagery/assets

**Path 3: Visual Design (Creative)**
1. Define complete brand guidelines (colors, typography, spacing)
2. Create design system/component library in Figma
3. Design high-fidelity mockups for key pages
4. Define animation/interaction patterns
5. Create image/illustration style guide

**Path 4: Parallel Execution (Recommended)**
- Technical team: Begin Path 1 (infrastructure + components)
- Content team: Begin Path 2 (copywriting + asset gathering)
- Design team: Begin Path 3 (visual system)
- Regular sync to ensure alignment

### Open Questions to Resolve

1. **Visual Design Decisions**
   - Color palette selection (3 options proposed)
   - Typography choices (modern vs. classic)
   - Animation/motion approach (subtle vs. bold)
   - Photography/imagery direction (abstract vs. authentic)

2. **Content Gaps**
   - Full copy needed for 3 service pages (AI & Data, Digital Product, Core Systems)
   - 8-10 case studies with specific metrics
   - 6-8 thought leadership articles
   - Client logos and permissions
   - Team photos and bios

3. **Technical Integration**
   - CRM platform for lead capture
   - Calendar scheduling integration
   - Analytics platform (GA4, Mixpanel, etc.)
   - Marketing automation tools
   - Form handling

4. **Business Details**
   - Technology partner certifications (Microsoft level, AWS/GCP specializations)
   - Specific F500 client logos (with permissions)
   - Exact metrics for social proof ($XB value delivered, etc.)
   - Industries list for homepage

---

*This is your complete planning document. All strategic decisions are documented. Ready to execute.*

