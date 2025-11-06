# Mobiz Inc. – AI-Enabled B2B Marketing Strategy v2.0
## Enhanced with Automated Content Intelligence Engine

---

## Strategy Objective
Create a scalable, AI-agent-augmented marketing framework to:
- Drive Microsoft field engagement
- Amplify Azure consumption alignment (ACR)
- Build brand equity through technical content
- Expand regional influence through thought leadership
- Maintain growth through digital demand generation

**NEW: Deploy automated content intelligence system that monitors ecosystem signals and generates timely, relevant thought leadership**

---

## Integration with Core Brand Strategy (see `Brand_Strategy_vNext.md`)

The automation stack is the distribution engine; the brand playbook remains the source of truth for tone, narrative, and proof points.

1. **Voice:** Every asset—human or machine generated—must ship in the Mobiz voice: declarative, confident, peer-to-peer.
2. **Story Spine:** Anchor deliverables to the three pillars outlined in the brand guide: the *Accountability Gap* problem, the *Strategy vs. Execution* philosophy, and the *Mobiz Model* (Clarity → Velocity → Certainty) solution.
3. **Keyword Alignment:** The philosophical and commercial keyword lists from the brand guide feed the engines’ filters so topic selection and on-page optimization reinforce our positioning.

---

## Core Pillars

### 1. Microsoft Field Engagement (Partner Marketing)
- **Goal:** Be top-of-mind for Microsoft account executives
- **Tactics:**
  - Bi-weekly "Win-Wire" newsletter
  - Regional highlights & relevant vertical stories
  - Show how Mobiz helps MS reps close ACR targets
  - Enablement PDFs and success story kits
  - Include Microsoft-funded programs (AMMP, DDP, etc.)

### 2. AI-Led Content Engine (Business & Technical Thought Leadership)
- **Goal:** Share use cases, not fluff
- **Format:** Weekly "Real Use Case" LinkedIn + Internal blog
- **Sources:**
  - GPT-4 for technical storytelling
  - Claude Sonnet for structured executive summaries
  - Gemini for visual formatting
- **Examples:**
  - Using Azure OpenAI for case classification
  - Forecasting in manufacturing with Microsoft Fabric
  - Chatbot architecture for global logistics firm

**NEW: Automated intelligence gathering from 8 strategic sources**

### 3. Digital Demand Generation (Lead Acquisition)
- **Goal:** Drive mid-funnel leads from C-level decision-makers
- **Tactics:**
  - ABM campaigns via LinkedIn Ads
  - Educational webinars for Azure use cases
  - Email drip series focused on common cloud migration blockers

### 4. AI Role Assignment Framework
Each marketing function is supported by a specialized LLM:

| Role Title                         | Primary Model   | Secondary Model     | Automated Tasks |
|-----------------------------------|-----------------|---------------------|-----------------|
| CMO                               | Claude Sonnet   | GPT-4               | Strategy review, executive framing |
| Head of Demand Gen                | GPT-4           | Gemini 2.5 Pro      | Lead scoring, campaign copy |
| Thought Leadership Manager        | GPT-4           | Claude Sonnet       | **Content intelligence correlation** |
| Partner Marketing Manager         | Claude Sonnet   | Grok Fast           | Win-Wire curation, field enablement |
| Digital Designer / Producer       | Gemini 2.5 Pro  | Grok Fast           | Visual formatting, presentation |
| Marketing Operations Analyst      | Grok Fast       | GPT-4               | **Signal monitoring, trend analysis** |

---

### 5. Foundational & Technical SEO (Defensive Motion)
- **Goal:** Make the “money pages” discoverable for high-intent commercial searches.
- **Immediate tasks:**
  - One-time technical setup (sitemap.xml, robots.txt, organization/article schema) in the web stack.
  - Keyword-to-page mapping (see table below) to lock each core route to a primary term.
  - Run the On-Page SEO Optimization prompt (Appendix) against static pages to update H1s, meta descriptions, and lead copy while keeping the Mobiz voice.
- **Keyword map snapshots:**
  - `/` → “execution partner”
  - `/our-model` → “accountability gap in consulting”
  - `/execution/cloud-transformation` → “enterprise cloud transformation partner”
  - `/execution/ai-data-platforms` → “production AI platform partner”
  - `/execution/core-system-modernization` → “legacy system modernization services”
  - `/execution/digital-product-engineering` → “enterprise digital product engineering”
- **Backlink plan:** when the content engine flags a HOT asset, a human owner distributes it to Microsoft field teams, Azure blogs, and vertical publications to secure relevant backlinks.

---

## NEW: Automated Content Intelligence System

### Architecture Overview

**The system monitors ecosystem signals 3x daily and generates content opportunities for human review and approval.**

```
┌─────────────────────────────────────────────────────────┐
│           INTELLIGENCE GATHERING LAYER                   │
│  (Runs 3x daily via Vercel Cron: 8am, 1pm, 6pm ET)     │
└─────────────────────────────────────────────────────────┘
                         │
        ┌────────────────┼────────────────┐
        │                │                │
    ┌───▼────┐    ┌──────▼──────┐   ┌───▼────┐
    │X Trends│    │  News APIs  │   │  RSS   │
    │  API   │    │             │   │ Feeds  │
    └───┬────┘    └──────┬──────┘   └───┬────┘
        │                │                │
        └────────────────┼────────────────┘
                         │
            ┌────────────▼────────────┐
            │  CORRELATION ENGINE     │
            │  (Grok Fast)            │
            │  Multi-source analysis  │
            └────────────┬────────────┘
                         │
            ┌────────────▼────────────┐
            │  PRIORITIZATION MATRIX  │
            │  Hot/Warm/Cool signals  │
            └────────────┬────────────┘
                         │
            ┌────────────▼────────────┐
            │  HUMAN REVIEW DASHBOARD │
            │  Approve/Edit/Reject    │
            └────────────┬────────────┘
                         │
        ┌────────────────┼────────────────┐
        │                │                │
    ┌───▼─────┐    ┌─────▼──────┐   ┌───▼────────┐
    │LinkedIn │    │    Blog    │   │  Win-Wire  │
    │Company  │    │   Auto-    │   │   Queue    │
    │  Page   │    │  Publish   │   │            │
    └─────────┘    └────────────┘   └────────────┘
```

### Intelligence Sources (8 Streams)

#### 1. Social Intelligence Layer
- **X API (Twitter Trends)**
  - Endpoint: `GET trends/place`
  - Focus: #Azure, #AI, #MicrosoftPartner, #OpenAI
  - Frequency: Every API call (3x daily)
  - Cost: $100/month (Basic tier)

#### 2. News Intelligence Layer
- **NewsAPI.org**
  - Category: Technology
  - Sources: TechCrunch, Wired, The Verge, Ars Technica
  - Keywords: Azure, Microsoft, AI, cloud, enterprise
  - Cost: Free tier (100 requests/day)

#### 3. Official Company Intelligence (RSS - Free)

**Microsoft Feeds:**
- Azure Blog: `https://azure.microsoft.com/blog/feed/`
- Microsoft AI Blog: `https://blogs.microsoft.com/ai/feed/`
- Microsoft Partner Network updates
- Azure OpenAI Service announcements

**Anthropic Feeds:**
- Anthropic News: `https://www.anthropic.com/news` (RSS)
- Claude release notes
- Research publications

**Google/GCP Feeds:**
- Google Cloud Blog: `https://cloud.google.com/blog/rss`
- Google AI Blog: `https://ai.googleblog.com/feeds/posts/default`
- Gemini product updates
- Vertex AI announcements

### Filter Keywords (Mobiz-Specific)

```javascript
const filterKeywords = {
  // Core ecosystem
  microsoft: ['Azure', 'Microsoft', 'Copilot', 'Fabric', 'Dynamics'],
  ai: ['OpenAI', 'Claude', 'Gemini', 'GPT', 'LLM', 'AI agent'],
  
  // Use cases
  verticals: [
    'manufacturing AI', 
    'logistics automation', 
    'supply chain intelligence',
    'case classification',
    'predictive maintenance'
  ],
  
  // Partner ecosystem
  partner: [
    'Microsoft partner', 
    'ACR', 
    'Azure consumption', 
    'co-sell',
    'ISV'
  ],
  
  // Technical
  technical: [
    'cloud migration',
    'enterprise AI',
    'data platform',
    'API integration',
    'hybrid cloud'
  ]
};
```

### Signal Correlation Matrix

**The Grok Fast model analyzes all sources and assigns priority scores:**

| Priority | Criteria | Action | Timeline |
|----------|----------|--------|----------|
| 🔥 **HOT** | 3+ sources align OR Microsoft official + trending | Generate content immediately | Publish within 24 hours |
| 🟡 **WARM** | 2 sources align OR single major announcement | Queue for weekly content | Publish within 7 days |
| 🔵 **COOL** | Single source OR weak signal | Monitor for correlation | Archive for future reference |

**Example HOT Signal:**
```
X Trends: "#AzureAI" trending (25k mentions)
NewsAPI: "Microsoft announces Azure AI features"
Microsoft RSS: Azure OpenAI Service update blog
→ PRIORITY: HOT
→ Content: "How New Azure AI Features Enable Manufacturing Use Cases"
→ Audience: Microsoft field + Mobiz prospects
→ Publish: Within 24 hours
```

**Example WARM Signal:**
```
NewsAPI: "Anthropic releases Claude 4"
Anthropic RSS: Claude 4 announcement
→ PRIORITY: WARM
→ Content: "Evaluating Claude 4 for Enterprise Azure Deployments"
→ Audience: Technical decision-makers
→ Publish: This week
```

### Content Generation Workflow

**For each HOT/WARM signal, the system generates:**

#### 1. LinkedIn Post (via GPT-4 - Thought Leadership Manager)
- **Length:** 150-300 words
- **Structure:**
  - Hook: Why Microsoft field should care
  - Context: What changed/launched
  - Value prop: How Mobiz leverages this for clients
  - CTA: Link to blog or contact
- **Hashtags:** 3-5 relevant (#Azure, #AI, etc.)
- **Tone:** Professional, value-focused, no fluff

#### 2. Blog Article (via GPT-4 + Claude Sonnet)
- **Length:** 800-1200 words
- **Structure:**
  - Executive summary (Claude Sonnet)
  - Technical deep-dive (GPT-4)
  - Real use case example
  - Implementation considerations
  - Call-to-action
- **SEO:** Optimized for Azure + use case keywords
- **Visuals:** Gemini generates diagram descriptions

#### 3. Win-Wire Snippet (if Microsoft-relevant)
- **Length:** 2-3 sentences
- **Focus:** How Microsoft reps can use this in conversations
- **Format:** "What changed + Why it matters for ACR"

### Multi-Model Content Pipeline

```
Signal Identified (HOT priority)
         ↓
┌────────────────────────────────────┐
│ STAGE 1: Initial Draft             │
│ Model: GPT-4 (Thought Leadership)  │
│ Task: Generate technical story     │
│ Output: Raw content + key points   │
└────────────┬───────────────────────┘
             ↓
┌────────────────────────────────────┐
│ STAGE 2: Executive Refinement      │
│ Model: Claude Sonnet (CMO)         │
│ Task: Add strategic framing        │
│ Output: Executive summary + field  │
│         value proposition          │
└────────────┬───────────────────────┘
             ↓
┌────────────────────────────────────┐
│ STAGE 3: Visual Formatting         │
│ Model: Gemini 2.5 Pro (Designer)   │
│ Task: Format for LinkedIn + blog   │
│ Output: Formatted content + visual │
│         recommendations            │
└────────────┬───────────────────────┘
             ↓
┌────────────────────────────────────┐
│ STAGE 4: Human Review              │
│ Dashboard: Approve/Edit/Reject     │
│ Options: Schedule or publish now   │
└────────────┬───────────────────────┘
             ↓
        [APPROVED]
             ↓
   ┌─────────┴──────────┐
   ↓                    ↓
[LinkedIn API]    [Blog CMS API]
Auto-publish      Auto-publish
Company Page      WordPress/Medium
```

### Technical Implementation (Vercel Stack)

**Core Technologies:**
- **Framework:** Next.js 14+ (App Router)
- **Deployment:** Vercel
- **AI SDK:** Vercel AI SDK (multi-provider support)
- **Database:** Vercel Postgres (stores signals, drafts, history)
- **Caching:** Vercel KV (Redis) for API response caching
- **Scheduling:** Vercel Cron Jobs (3x daily)

**API Integrations:**
```javascript
// Example structure
/api/
  ├─ intelligence/
  │  ├─ gather-x-trends      // X API integration
  │  ├─ gather-news          // NewsAPI integration
  │  ├─ gather-rss-feeds     // RSS parser for official blogs
  │  └─ correlate-signals    // Grok Fast correlation
  ├─ content/
  │  ├─ generate-linkedin    // GPT-4 → Claude → Gemini pipeline
  │  ├─ generate-blog        // Full article generation
  │  └─ generate-winwire     // Partner snippet generation
  ├─ publishing/
  │  ├─ linkedin-company     // LinkedIn Share API
  │  ├─ blog-cms             // WordPress/Medium API
  │  └─ newsletter-queue     // Win-Wire queue management
  └─ cron/
     └─ intelligence-sweep   // Runs 3x daily (8am, 1pm, 6pm ET)
```

**Vercel AI SDK Configuration:**
```javascript
import { createOpenAI } from '@ai-sdk/openai';
import { createAnthropic } from '@ai-sdk/anthropic';
import { createGoogleGenerativeAI } from '@ai-sdk/google';

// Configure providers
const openai = createOpenAI({ apiKey: process.env.OPENAI_API_KEY });
const anthropic = createAnthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
const google = createGoogleGenerativeAI({ apiKey: process.env.GOOGLE_API_KEY });

// Multi-model pipeline
const draft = await generateText({
  model: openai('gpt-4-turbo'),
  prompt: technicalDraftPrompt
});

const refined = await generateText({
  model: anthropic('claude-sonnet-4'),
  prompt: executiveRefinementPrompt(draft.text)
});

const formatted = await generateText({
  model: google('gemini-2.0-flash-exp'),
  prompt: visualFormattingPrompt(refined.text)
});
```

**AI Gateway Benefits:**
- **Caching:** Reduces duplicate API calls (saves ~30% costs)
- **Rate limiting:** Prevents runaway costs
- **Analytics:** Track model performance and costs
- **Fallbacks:** Auto-switch if primary provider is down

### Human Review Dashboard

**Interface Requirements:**

**Daily Intelligence Digest (3x per day):**
```
┌─────────────────────────────────────────────┐
│ Content Intelligence Digest                 │
│ Generated: Jan 15, 2025 - 8:00 AM ET       │
└─────────────────────────────────────────────┘

🔥 HOT SIGNALS (3)
──────────────────────────────────────────────
1. Azure AI Studio Update
   Sources: X Trend + Microsoft Blog + TechCrunch
   Priority: IMMEDIATE
   Draft ready: LinkedIn + Blog
   [Review] [Schedule] [Reject]

2. Manufacturing AI Trending
   Sources: X Trend + NewsAPI
   Priority: 24-HOUR
   Draft ready: LinkedIn only
   [Review] [Generate Blog] [Reject]

🟡 WARM SIGNALS (5)
──────────────────────────────────────────────
1. Claude 4 Release
   Sources: Anthropic Blog + NewsAPI
   Priority: THIS WEEK
   [Generate Content] [Archive]

[View All Cool Signals (12)] [Settings] [Analytics]
```

**Content Review Interface:**
```
┌─────────────────────────────────────────────┐
│ Review: Azure AI Studio Update              │
│ Signal: HOT | Generated: 5 minutes ago      │
└─────────────────────────────────────────────┘

LINKEDIN POST (247 words)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
[Editable text area with draft]

BLOG ARTICLE (1,043 words)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
[Editable text area with draft]

WIN-WIRE SNIPPET
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
[Editable text area with snippet]

METADATA
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Tags: [Microsoft] [Azure] [AI]
Target: Microsoft Field + Prospects
SEO Keywords: Azure AI Studio, manufacturing use cases

ACTIONS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
[✓ Approve All & Publish Now]
[📅 Approve & Schedule: _______]
[✏️ Edit Content]
[❌ Reject Signal]
```

### Content Tagging & Routing

**Automatic tagging system:**

| Tag | Content Focus | Route To |
|-----|---------------|----------|
| `[Microsoft]` | Azure/partner ecosystem | Win-Wire + LinkedIn + Blog |
| `[Anthropic]` | Claude implementations | Blog + LinkedIn (technical) |
| `[Google]` | GCP/Gemini updates | Blog (multi-cloud strategy) |
| `[Multi-cloud]` | Comparative content | Blog (thought leadership) |
| `[Use-Case]` | Customer stories | All channels |
| `[Technical]` | Deep implementation | Blog only |

**Routing Logic:**
```
IF [Microsoft] tag:
  → Win-Wire queue (bi-weekly newsletter)
  → LinkedIn (field engagement priority)
  → Blog (SEO + authority)

IF [Anthropic] OR [Google] tag:
  → LinkedIn (if trending)
  → Blog (always)
  → Skip Win-Wire (unless multi-cloud strategy)

IF [Use-Case] tag:
  → All channels (highest priority content)
```

### Success Metrics (Enhanced)

**Existing Metrics:**
- Pipeline-influenced by marketing (monthly)
- Azure usage influenced by Mobiz engagements
- LinkedIn reach/engagement on AI content
- Microsoft rep referrals (tracked via CRM tags)
- Conversion rates from ABM campaigns

**New Metrics (Automated System):**
- **Signal-to-content velocity:** Time from signal to published content
- **Multi-source correlation rate:** % of signals appearing in 2+ sources
- **Content approval rate:** % of AI-generated drafts approved by human
- **Model performance:** Quality scores by model (GPT-4 vs Claude vs Gemini)
- **Source value:** Which sources generate highest-engaging content
- **Publishing efficiency:** Reduction in content creation time (baseline vs. automated)
- **Cost per content piece:** API costs / published articles

**Target KPIs (90 days):**
- 12-15 HOT signals identified per month
- 8-10 published content pieces per month (from automated system)
- <2 hours from signal to draft generation
- <24 hours from HOT signal to publication (with approval)
- 70%+ human approval rate on first draft
- 30% reduction in content creation time vs. manual process

---

## Cost Analysis

### Monthly Operating Costs

**Intelligence Gathering:**
- X API (Basic tier): $100/month
- NewsAPI (Free tier): $0
- RSS feeds: $0
- **Subtotal: $100/month**

**AI Model Usage (estimated at 10-15 content pieces/month):**
- Grok Fast (correlation): ~$10/month
- GPT-4 (drafting): ~$20/month
- Claude Sonnet (refinement): ~$15/month
- Gemini 2.5 Pro (formatting): ~$10/month
- **Subtotal: ~$55/month**

**Infrastructure:**
- Vercel Pro plan: $20/month
- Vercel Postgres: $10/month (estimated)
- Vercel KV (caching): $5/month (estimated)
- **Subtotal: $35/month**

**Total Monthly Cost: ~$190/month**

**ROI Calculation:**
- Manual content creation: ~8-12 hours per piece × $100/hour = $800-1,200 per piece
- Automated system: ~1-2 hours review per piece × $100/hour = $100-200 per piece
- **Savings per piece: $600-1,000**
- **At 10 pieces/month: $6,000-10,000 saved**
- **Net savings after system costs: ~$5,800-9,800/month**

---

## Execution Timeline (Updated Phase 1 – 90 Days)

### Week 1–2: Foundation
- [x] Deploy Vercel infrastructure
- [x] Configure X API access (Basic tier)
- [x] Set up NewsAPI integration
- [x] Configure RSS feed parsers (Microsoft, Anthropic, Google)
- [x] Deploy Vercel AI SDK with multi-provider support
- [x] Build basic human review dashboard
- [x] Create filter keyword sets
- [x] Draft AI role specifications

### Week 3–4: Intelligence Layer
- [ ] Launch automated intelligence gathering (3x daily cron)
- [ ] Test Grok Fast correlation engine
- [ ] Validate signal prioritization matrix
- [ ] Fine-tune filter keywords based on first 50 signals
- [ ] Build signal archive database
- [ ] Create notification system for HOT signals

### Week 5–6: Content Generation
- [ ] Deploy multi-model content pipeline (GPT-4 → Claude → Gemini)
- [ ] Test LinkedIn post generation (5 drafts)
- [ ] Test blog article generation (3 drafts)
- [ ] Test Win-Wire snippet generation (5 drafts)
- [ ] Human review and quality benchmarking
- [ ] Iterate on prompts based on feedback

### Week 7–8: Publishing Integration
- [ ] Integrate LinkedIn Company Page API
- [ ] Integrate blog CMS (WordPress or Medium)
- [ ] Build Win-Wire newsletter queue system
- [ ] Test end-to-end workflow (signal → approval → publish)
- [ ] Publish first AI-generated content piece
- [ ] Monitor engagement metrics

### Week 9–12: Optimization & Scale
- [ ] Analyze first month of signals (HOT/WARM/COOL distribution)
- [ ] Optimize correlation prompts based on performance data
- [ ] A/B test different content formats
- [ ] Add AI Gateway for cost optimization
- [ ] Launch weekly "Real Use Case" series
- [ ] Host first MSFT-aligned webinar featuring automated insights
- [ ] Create Azure Funding FAQ resource
- [ ] Measure ROI and cost savings

---

## Risk Mitigation

| Risk | Mitigation Strategy |
|------|---------------------|
| **API rate limits exceeded** | Implement Vercel AI Gateway caching, monitor usage daily |
| **Low signal quality (too much noise)** | Continuously refine filter keywords, adjust correlation thresholds |
| **High rejection rate on drafts** | Track rejection reasons, iterate prompts monthly, consider fine-tuning |
| **X API cost overruns** | Set hard spending limits, reduce polling frequency if needed |
| **Model provider outages** | Use AI Gateway fallbacks, maintain secondary providers |
| **Content doesn't resonate with field** | Monthly feedback sessions with Microsoft reps, adjust Win-Wire format |
| **SEO performance below expectations** | Conduct keyword research, optimize metadata, track rankings |

---

## Future Enhancements (Phase 2 - Months 4-6)

### Advanced Intelligence
- **Sentiment analysis:** Track competitor mentions and market sentiment
- **Customer signal integration:** Monitor CRM for customer-specific triggers
- **Predictive trending:** ML model to predict which topics will trend
- **Regional filtering:** Customize content by geographic market

### Enhanced Automation
- **Auto-scheduling optimization:** AI determines best posting times
- **Dynamic A/B testing:** Automatically test headlines and CTAs
- **Performance feedback loop:** AI learns from engagement metrics
- **Voice and tone customization:** Fine-tune models on Mobiz brand voice

### Expanded Channels
- **YouTube Shorts:** Auto-generate video scripts from blog posts
- **Podcast snippets:** Convert articles to audio summaries
- **Email campaigns:** Auto-generate nurture sequences from top content
- **Slack/Teams bots:** Share Win-Wire content directly in partner channels

---

## Notes for AI Agents

**Core Principles:**
- Stay grounded in B2B, Microsoft-aligned problem solving
- Prioritize value-to-field (Microsoft) and value-to-client (Mobiz)
- Avoid fluff and feature pitching—focus on transformation outcomes
- Every piece of content must answer: "Why should a Microsoft rep care?"

**Content Quality Standards:**
- **Specificity over generality:** Use real examples, not generic statements
- **Data-driven:** Include metrics, benchmarks, ROI indicators when possible
- **Actionable:** Every piece should have clear next steps
- **Technical credibility:** Balance accessibility with technical depth
- **Partnership angle:** Always tie back to Microsoft ecosystem value

**Signal Evaluation Criteria:**
When correlating signals, prioritize topics that:
1. Directly impact Azure consumption (ACR alignment)
2. Enable Microsoft field conversations with prospects
3. Showcase Mobiz differentiation in the market
4. Provide technical depth (not just announcements)
5. Connect to specific vertical use cases (manufacturing, logistics, etc.)

---

## Appendix: Prompt Templates

### Correlation Prompt (Grok Fast)

```
You are a B2B marketing intelligence analyst for Mobiz, a Microsoft partner focused on Azure AI implementations for manufacturing and logistics.

Analyze the following intelligence signals and identify topics with HIGH business value:

X TRENDS:
{x_trends}

NEWS ARTICLES:
{news_articles}

MICROSOFT BLOG POSTS:
{microsoft_rss}

ANTHROPIC UPDATES:
{anthropic_rss}

GOOGLE/GCP UPDATES:
{google_rss}

TASK:
1. Identify topics that appear in 2+ sources (correlation)
2. Score each topic on these criteria:
   - Microsoft ecosystem relevance (0-10)
   - Azure consumption impact (0-10)
   - Technical depth opportunity (0-10)
   - Vertical use case potential (0-10)
   - Timeliness/urgency (0-10)

3. Classify as HOT (3+ sources OR score >40), WARM (2 sources OR score 30-40), or COOL (<30)

OUTPUT FORMAT (JSON):
{
  "hot_signals": [
    {
      "topic": "Azure AI Studio update",
      "sources": ["x_trends", "microsoft_rss", "news"],
      "scores": {
        "microsoft_relevance": 10,
        "acr_impact": 9,
        "technical_depth": 8,
        "vertical_potential": 9,
        "timeliness": 10
      },
      "total_score": 46,
      "recommended_angle": "How Microsoft field reps can position new AI features for manufacturing clients"
    }
  ],
  "warm_signals": [...],
  "cool_signals": [...]
}
```

### LinkedIn Post Prompt (GPT-4)

```
You are the Thought Leadership Manager for Mobiz, writing for a B2B audience of Microsoft account executives and enterprise decision-makers.

SIGNAL: {signal_topic}
SOURCES: {signal_sources}
KEY POINTS: {key_points}

Write a LinkedIn post (150-300 words) that:
1. Opens with a hook about why Microsoft field reps should care
2. Explains what changed/launched and why it matters
3. Connects to a specific use case (manufacturing or logistics preferred)
4. Includes a clear CTA
5. Uses 3-5 relevant hashtags

TONE: Professional, value-focused, no marketing fluff
AUDIENCE: Microsoft sellers and enterprise IT leaders
GOAL: Position Mobiz as the go-to Azure AI implementation partner

OUTPUT: Markdown formatted LinkedIn post
```

### Blog Article Prompt (GPT-4 + Claude Sonnet)

```
STAGE 1 (GPT-4 - Technical Draft):
You are writing a technical blog post for Mobiz's "Real Use Case" series.

TOPIC: {signal_topic}
SOURCES: {signal_sources}
TARGET AUDIENCE: Enterprise architects and technical decision-makers

Write an 800-1200 word article that includes:
1. Technical overview of the announcement/trend
2. Real-world implementation example (manufacturing or logistics)
3. Architecture considerations
4. Integration with Azure ecosystem
5. Key takeaways and next steps

STYLE: Technical but accessible, use specific examples, include code snippets if relevant

---

STAGE 2 (Claude Sonnet - Executive Refinement):
Review the technical draft and add:
1. Executive summary (100 words) at the beginning
2. "Why Microsoft Field Should Care" sidebar
3. ROI/business value framing throughout
4. Stronger connection to ACR and co-sell opportunities

OUTPUT: Complete blog article ready for publication
```

### Win-Wire Snippet Prompt (Claude Sonnet)

```
You are the Partner Marketing Manager creating content for the bi-weekly "Win-Wire" newsletter sent to Microsoft account executives.

TOPIC: {signal_topic}
BLOG LINK: {blog_url}

Write a 2-3 sentence snippet that:
1. States what changed (announcement/trend)
2. Explains how reps can use this in prospect conversations
3. Links to the full blog post for details

TONE: Concise, action-oriented, field-focused
GOAL: Make Microsoft reps smarter and more effective in their next customer call

OUTPUT: Plain text snippet
```

---

## Glossary

- **ACR:** Azure Consumed Revenue - Key metric for Microsoft partners
- **HOT signal:** High-priority topic appearing in 3+ sources requiring immediate content
- **WARM signal:** Medium-priority topic appearing in 2 sources for weekly content
- **COOL signal:** Low-priority single-source mention for monitoring
- **Win-Wire:** Bi-weekly newsletter for Microsoft field enablement
- **RSS:** Really Simple Syndication - Feed format for automated content monitoring
- **Vercel AI SDK:** Unified AI provider interface for multi-model applications
- **AI Gateway:** Vercel's caching and rate-limiting layer for AI API calls

---

**Document Version:** 2.0  
**Last Updated:** January 2025  
**Next Review:** After 90-day Phase 1 completion
