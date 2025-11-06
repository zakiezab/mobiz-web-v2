# Mobiz Content Intelligence System
## Technical Implementation with OpenAI Agent SDK

**Version:** 2.0 (OpenAI-Native)  
**Stack:** OpenAI Agent SDK + Vercel Platform  
**Timeline:** 12-week MVP implementation

---

## Architecture Overview (OpenAI-Native)

```
┌─────────────────────────────────────────────────────────────┐
│                    VERCEL PLATFORM                          │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌──────────────────────────────────────────────────────┐  │
│  │      INTELLIGENCE GATHERING (3x daily cron)          │  │
│  │                                                       │  │
│  │  ┌─────────┐  ┌─────────┐  ┌──────────────┐        │  │
│  │  │ X API   │  │NewsAPI  │  │  6 RSS Feeds │        │  │
│  │  │ Trends  │  │ Tech    │  │  (MS/ANTHR/  │        │  │
│  │  │         │  │ News    │  │   GCP)       │        │  │
│  │  └────┬────┘  └────┬────┘  └──────┬───────┘        │  │
│  │       └────────────┴──────────────┘                 │  │
│  │                    │                                 │  │
│  │         ┌──────────▼──────────┐                     │  │
│  │         │  Vercel Postgres    │                     │  │
│  │         │  Raw Signal Store   │                     │  │
│  │         └──────────┬──────────┘                     │  │
│  └────────────────────┼──────────────────────────────┘  │
│                       │                                  │
│  ┌────────────────────▼──────────────────────────────┐  │
│  │         OPENAI AGENT SDK ORCHESTRATION           │  │
│  │                                                   │  │
│  │  ┌───────────────────────────────────────────┐  │  │
│  │  │  CORRELATION AGENT                        │  │  │
│  │  │  Model: gpt-4o-mini                       │  │  │
│  │  │  Task: Analyze & prioritize signals       │  │  │
│  │  │  Tools: filter_signals, score_relevance   │  │  │
│  │  └───────────────┬───────────────────────────┘  │  │
│  │                  │                               │  │
│  │  ┌───────────────▼───────────────────────────┐  │  │
│  │  │  CONTENT GENERATION AGENT                 │  │  │
│  │  │  Model: gpt-4o                            │  │  │
│  │  │  Task: Draft LinkedIn + Blog content      │  │  │
│  │  │  Tools: generate_linkedin, generate_blog  │  │  │
│  │  └───────────────┬───────────────────────────┘  │  │
│  │                  │                               │  │
│  │  ┌───────────────▼───────────────────────────┐  │  │
│  │  │  REFINEMENT AGENT                         │  │  │
│  │  │  Model: gpt-4o                            │  │  │
│  │  │  Task: Add executive framing + field value│  │  │
│  │  │  Tools: add_executive_summary, add_cta    │  │  │
│  │  └───────────────┬───────────────────────────┘  │  │
│  │                  │                               │  │
│  │  ┌───────────────▼───────────────────────────┐  │  │
│  │  │  FORMATTING AGENT                         │  │  │
│  │  │  Model: gpt-4o-mini                       │  │  │
│  │  │  Task: Format for LinkedIn/Blog/Win-Wire  │  │  │
│  │  │  Tools: format_linkedin, format_blog      │  │  │
│  │  └───────────────┬───────────────────────────┘  │  │
│  └────────────────────┼──────────────────────────────┘  │
│                       │                                  │
│  ┌────────────────────▼──────────────────────────────┐  │
│  │         HUMAN REVIEW DASHBOARD                    │  │
│  │         (Next.js Interface)                       │  │
│  └────────────────────┬──────────────────────────────┘  │
│                       │                                  │
│  ┌────────────────────▼──────────────────────────────┐  │
│  │         PUBLISHING AGENTS                         │  │
│  │  Model: gpt-4o-mini                              │  │
│  │  Tools: publish_linkedin, publish_blog            │  │
│  └────────────────────┬──────────────────────────────┘  │
│                       │                                  │
│  ┌────────────────────▼──────────────────────────────┐  │
│  │     LinkedIn API | WordPress API | Email Queue    │  │
│  └───────────────────────────────────────────────────┘  │
│                                                          │
└──────────────────────────────────────────────────────────┘
```

---

## OpenAI Agent Architecture

### Why OpenAI Agent SDK?

**Benefits:**
- **Single provider:** Simplified debugging, billing, and support
- **Function calling:** Native tool integration for agents
- **Assistants API:** Built-in memory and thread management
- **Swarm framework:** Multi-agent orchestration (if needed)
- **Model variety:** o1 for reasoning, GPT-4o for content, GPT-4o-mini for filtering
- **Structured outputs:** JSON mode for reliable parsing
- **Better cost control:** Single dashboard for all AI spend

### Agent Role Definitions

We'll use OpenAI's **Assistants API** with function calling to create specialized agents:

#### 1. **Correlation Agent** (Marketing Operations Analyst)
**Model:** `gpt-4o-mini` (fast, cheap, sufficient for classification)  
**Purpose:** Analyze signals from 8 sources and prioritize content opportunities  
**Tools:**
- `analyze_signals` - Takes all signals and returns HOT/WARM/COOL classification
- `calculate_relevance_score` - Scores topics on Microsoft/Azure/B2B relevance
- `identify_correlations` - Finds topics appearing across multiple sources

**System Prompt:**
```
You are the Marketing Operations Analyst for Mobiz Inc., a Microsoft Azure partner.

Your role is to analyze intelligence signals from X, NewsAPI, and company RSS feeds, 
then identify content opportunities that align with Mobiz's B2B marketing strategy.

Prioritization criteria:
- Microsoft ecosystem relevance (Azure, Fabric, OpenAI Service)
- Enterprise AI use cases (manufacturing, logistics)
- Partner field enablement value
- Timeliness and trending momentum

Classify signals as:
- HOT: 3+ sources OR breaking Microsoft news (publish in 24h)
- WARM: 2 sources OR significant announcement (publish this week)
- COOL: Single source (monitor only)
```

#### 2. **Content Generation Agent** (Thought Leadership Manager)
**Model:** `gpt-4o` (high quality for creative content)  
**Purpose:** Draft LinkedIn posts and blog articles  
**Tools:**
- `generate_linkedin_post` - Creates 150-300 word LinkedIn posts
- `generate_blog_article` - Creates 800-1200 word technical articles
- `generate_winwire_snippet` - Creates 2-3 sentence field enablement snippets

**System Prompt:**
```
You are the Thought Leadership Manager for Mobiz Inc.

Your role is to create technical content that positions Mobiz as the leading 
Azure AI implementation partner for manufacturing and logistics companies.

Content principles:
- Focus on real use cases, not feature lists
- Technical depth balanced with business value
- Always include "why Microsoft field reps should care"
- Avoid marketing fluff - be specific and actionable
- Target audience: Microsoft account executives and enterprise IT leaders

Tone: Professional, authoritative, helpful (not promotional)
```

#### 3. **Refinement Agent** (CMO)
**Model:** `gpt-4o` (strategic thinking for executive framing)  
**Purpose:** Add executive summary and field value proposition  
**Tools:**
- `add_executive_summary` - Adds 100-word executive summary
- `add_field_value` - Adds "Why Microsoft Field Should Care" section
- `optimize_for_acr` - Ensures Azure consumption tie-in

**System Prompt:**
```
You are the CMO of Mobiz Inc.

Your role is to review technical drafts and add strategic framing that resonates 
with C-level executives and Microsoft partner sellers.

Add to every piece:
1. Executive summary that answers "Why does this matter for my business?"
2. Clear connection to Azure consumption and partner co-sell opportunities
3. Actionable next steps for both prospects and Microsoft field

Maintain technical credibility while elevating business impact.
```

#### 4. **Formatting Agent** (Digital Producer)
**Model:** `gpt-4o-mini` (simple formatting task)  
**Purpose:** Format content for specific platforms  
**Tools:**
- `format_for_linkedin` - Applies LinkedIn best practices (hashtags, line breaks)
- `format_for_blog` - Applies blog formatting (headers, bullets, CTAs)
- `format_for_email` - Creates Win-Wire email snippet

**System Prompt:**
```
You are the Digital Producer for Mobiz Inc.

Your role is to format approved content for each distribution channel:

LinkedIn:
- Add 3-5 relevant hashtags (#Azure, #AI, #Manufacturing, etc.)
- Use line breaks for readability
- Add emojis sparingly (1-2 max)
- Include clear CTA with link

Blog:
- Add H2/H3 headers for scannability
- Use bullet points for lists
- Include "Key Takeaways" section
- Add meta description for SEO

Win-Wire:
- Keep to 2-3 sentences max
- Start with "New:" or "Updated:"
- End with blog link
```

---

## Implementation with OpenAI SDK

### Setup & Installation

```bash
# Initialize Next.js project
npx create-next-app@latest mobiz-intelligence --typescript --tailwind --app

cd mobiz-intelligence

# Install OpenAI SDK
npm install openai

# Install other dependencies
npm install @vercel/postgres @vercel/kv
npm install twitter-api-v2 axios rss-parser
npm install zod date-fns
```

### OpenAI Configuration

```typescript
// lib/openai/config.ts
import OpenAI from 'openai';

export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Model configurations
export const MODELS = {
  CORRELATION: 'gpt-4o-mini',      // Fast & cheap for filtering
  GENERATION: 'gpt-4o',            // High quality for content
  REFINEMENT: 'gpt-4o',            // Strategic thinking
  FORMATTING: 'gpt-4o-mini',       // Simple formatting
  REASONING: 'o1-mini',            // If complex reasoning needed (optional)
} as const;

// Cost tracking
export const MODEL_COSTS = {
  'gpt-4o-mini': { input: 0.15, output: 0.60 },      // per 1M tokens
  'gpt-4o': { input: 2.50, output: 10.00 },          // per 1M tokens
  'o1-mini': { input: 3.00, output: 12.00 },         // per 1M tokens
};
```

### Agent 1: Correlation Agent (with Assistants API)

```typescript
// lib/openai/agents/correlation.ts
import { openai, MODELS } from '../config';

export async function createCorrelationAgent() {
  const assistant = await openai.beta.assistants.create({
    name: "Mobiz Marketing Operations Analyst",
    instructions: `You are the Marketing Operations Analyst for Mobiz Inc., a Microsoft Azure partner.

Your role is to analyze intelligence signals and identify content opportunities.

Prioritization criteria:
- Microsoft ecosystem relevance (Azure, Fabric, OpenAI Service)
- Enterprise AI use cases (manufacturing, logistics)
- Partner field enablement value
- Timeliness and trending momentum

Classify signals as:
- HOT: 3+ sources OR breaking Microsoft news (publish in 24h)
- WARM: 2 sources OR significant announcement (publish this week)
- COOL: Single source (monitor only)

Always output structured JSON with your analysis.`,
    model: MODELS.CORRELATION,
    tools: [
      {
        type: "function",
        function: {
          name: "analyze_signals",
          description: "Analyze intelligence signals and classify by priority",
          parameters: {
            type: "object",
            properties: {
              signals: {
                type: "array",
                description: "Array of signals from various sources",
                items: {
                  type: "object",
                  properties: {
                    source: { type: "string" },
                    title: { type: "string" },
                    description: { type: "string" },
                    url: { type: "string" },
                    published_at: { type: "string" }
                  }
                }
              }
            },
            required: ["signals"]
          }
        }
      }
    ],
    response_format: { type: "json_object" }
  });

  return assistant;
}

export async function correlateSignals(signals: any[]) {
  // Create assistant
  const assistant = await createCorrelationAgent();

  // Create thread
  const thread = await openai.beta.threads.create();

  // Add message with all signals
  await openai.beta.threads.messages.create(thread.id, {
    role: "user",
    content: `Analyze these signals and identify content opportunities:

${JSON.stringify({ signals }, null, 2)}

Return a JSON object with:
{
  "hot_signals": [...],
  "warm_signals": [...],
  "cool_signals": [...],
  "summary": {
    "total_analyzed": number,
    "hot_count": number,
    "warm_count": number,
    "cool_count": number
  }
}

For each signal include:
- topic_title
- priority (HOT/WARM/COOL)
- confidence (0-1)
- source_count
- recommended_angles
- content_suggestions
- tags
`
  });

  // Run assistant
  const run = await openai.beta.threads.runs.create(thread.id, {
    assistant_id: assistant.id
  });

  // Wait for completion
  let runStatus = await openai.beta.threads.runs.retrieve(thread.id, run.id);
  
  while (runStatus.status !== 'completed') {
    await new Promise(resolve => setTimeout(resolve, 1000));
    runStatus = await openai.beta.threads.runs.retrieve(thread.id, run.id);
  }

  // Get response
  const messages = await openai.beta.threads.messages.list(thread.id);
  const response = messages.data[0].content[0];
  
  if (response.type === 'text') {
    return JSON.parse(response.text.value);
  }

  throw new Error('Unexpected response type');
}
```

### Agent 2: Content Generation Agent

```typescript
// lib/openai/agents/content-generation.ts
import { openai, MODELS } from '../config';

export async function createContentAgent() {
  return await openai.beta.assistants.create({
    name: "Mobiz Thought Leadership Manager",
    instructions: `You are the Thought Leadership Manager for Mobiz Inc.

Create technical content that positions Mobiz as the leading Azure AI implementation 
partner for manufacturing and logistics companies.

Content principles:
- Focus on real use cases, not feature lists
- Technical depth balanced with business value
- Always include "why Microsoft field reps should care"
- Avoid marketing fluff - be specific and actionable
- Target: Microsoft account executives and enterprise IT leaders

Tone: Professional, authoritative, helpful (not promotional)`,
    model: MODELS.GENERATION,
    tools: [
      {
        type: "function",
        function: {
          name: "generate_linkedin_post",
          description: "Generate a LinkedIn post (150-300 words)",
          parameters: {
            type: "object",
            properties: {
              topic: { type: "string" },
              key_points: { type: "array", items: { type: "string" } },
              target_audience: { type: "string" }
            },
            required: ["topic", "key_points"]
          }
        }
      },
      {
        type: "function",
        function: {
          name: "generate_blog_article",
          description: "Generate a blog article (800-1200 words)",
          parameters: {
            type: "object",
            properties: {
              topic: { type: "string" },
              sources: { type: "array", items: { type: "object" } },
              use_case: { type: "string" }
            },
            required: ["topic", "sources"]
          }
        }
      }
    ]
  });
}

export async function generateLinkedInPost(topic: any) {
  const assistant = await createContentAgent();
  const thread = await openai.beta.threads.create();

  await openai.beta.threads.messages.create(thread.id, {
    role: "user",
    content: `Create a LinkedIn post about: ${topic.topic_title}

Key points from correlation analysis:
${JSON.stringify(topic, null, 2)}

Requirements:
- 150-300 words
- Hook that grabs Microsoft field reps' attention
- Explain what changed and why it matters
- Include specific use case example
- End with clear CTA
- Professional but engaging tone

Structure:
1. Opening hook (why this matters now)
2. Context (what changed)
3. Value proposition (how Mobiz leverages this)
4. CTA (link to blog or contact)

Do NOT include hashtags or emojis - formatting agent will add those.`
  });

  const run = await openai.beta.threads.runs.create(thread.id, {
    assistant_id: assistant.id
  });

  // Wait for completion
  let runStatus = await openai.beta.threads.runs.retrieve(thread.id, run.id);
  while (runStatus.status !== 'completed') {
    await new Promise(resolve => setTimeout(resolve, 1000));
    runStatus = await openai.beta.threads.runs.retrieve(thread.id, run.id);
  }

  const messages = await openai.beta.threads.messages.list(thread.id);
  const response = messages.data[0].content[0];
  
  if (response.type === 'text') {
    return response.text.value;
  }

  throw new Error('Unexpected response type');
}

export async function generateBlogArticle(topic: any) {
  const assistant = await createContentAgent();
  const thread = await openai.beta.threads.create();

  await openai.beta.threads.messages.create(thread.id, {
    role: "user",
    content: `Create a technical blog article about: ${topic.topic_title}

Signal data:
${JSON.stringify(topic, null, 2)}

Requirements:
- 800-1200 words
- Technical depth appropriate for enterprise architects
- Include a specific use case (manufacturing or logistics preferred)
- Architecture/implementation considerations
- Azure ecosystem integration points
- Key takeaways section at the end

Structure:
1. Introduction (why this matters for enterprise AI)
2. Technical Overview (what changed/launched)
3. Real-World Use Case Example
4. Implementation Considerations
5. Azure Integration Points
6. Key Takeaways
7. Next Steps / CTA

Tone: Technical but accessible, authoritative, helpful`
  });

  const run = await openai.beta.threads.runs.create(thread.id, {
    assistant_id: assistant.id
  });

  let runStatus = await openai.beta.threads.runs.retrieve(thread.id, run.id);
  while (runStatus.status !== 'completed') {
    await new Promise(resolve => setTimeout(resolve, 1000));
    runStatus = await openai.beta.threads.runs.retrieve(thread.id, run.id);
  }

  const messages = await openai.beta.threads.messages.list(thread.id);
  const response = messages.data[0].content[0];
  
  if (response.type === 'text') {
    return response.text.value;
  }

  throw new Error('Unexpected response type');
}
```

### Agent 3: Refinement Agent

```typescript
// lib/openai/agents/refinement.ts
import { openai, MODELS } from '../config';

export async function createRefinementAgent() {
  return await openai.beta.assistants.create({
    name: "Mobiz CMO",
    instructions: `You are the CMO of Mobiz Inc.

Review technical drafts and add strategic framing for C-level executives and 
Microsoft partner sellers.

Add to every piece:
1. Executive summary (100 words) - "Why does this matter for my business?"
2. Clear connection to Azure consumption and co-sell opportunities
3. Actionable next steps for prospects and Microsoft field

Maintain technical credibility while elevating business impact.`,
    model: MODELS.REFINEMENT
  });
}

export async function refineContent(draft: string, contentType: 'linkedin' | 'blog') {
  const assistant = await createRefinementAgent();
  const thread = await openai.beta.threads.create();

  const refinementPrompts = {
    linkedin: `Review this LinkedIn post draft and add:

1. Stronger opening hook focused on business value
2. Explicit "Why Microsoft field reps should care" angle
3. Stronger CTA

DRAFT:
${draft}

Return the refined version maintaining the same length (150-300 words).`,

    blog: `Review this blog article draft and add:

1. Executive Summary (100 words) at the very beginning
2. "Why Microsoft Field Should Care" sidebar/callout box
3. Explicit connections to Azure consumption (ACR) throughout
4. Stronger next steps with contact information

DRAFT:
${draft}

Return the complete refined article.`
  };

  await openai.beta.threads.messages.create(thread.id, {
    role: "user",
    content: refinementPrompts[contentType]
  });

  const run = await openai.beta.threads.runs.create(thread.id, {
    assistant_id: assistant.id
  });

  let runStatus = await openai.beta.threads.runs.retrieve(thread.id, run.id);
  while (runStatus.status !== 'completed') {
    await new Promise(resolve => setTimeout(resolve, 1000));
    runStatus = await openai.beta.threads.runs.retrieve(thread.id, run.id);
  }

  const messages = await openai.beta.threads.messages.list(thread.id);
  const response = messages.data[0].content[0];
  
  if (response.type === 'text') {
    return response.text.value;
  }

  throw new Error('Unexpected response type');
}
```

### Agent 4: Formatting Agent

```typescript
// lib/openai/agents/formatting.ts
import { openai, MODELS } from '../config';

export async function formatForLinkedIn(content: string): Promise<string> {
  const response = await openai.chat.completions.create({
    model: MODELS.FORMATTING,
    messages: [
      {
        role: "system",
        content: `You are a LinkedIn content formatter. Add proper formatting:

- Line breaks for readability (after each paragraph)
- 3-5 relevant hashtags at the end (#Azure #AI #Manufacturing etc.)
- Use 1 emoji max (optional, only if it adds value)
- Preserve all content, just improve formatting
- Keep it professional for B2B audience

Return ONLY the formatted post, no explanations.`
      },
      {
        role: "user",
        content: `Format this LinkedIn post:\n\n${content}`
      }
    ],
    temperature: 0.3
  });

  return response.choices[0].message.content || content;
}

export async function formatForBlog(content: string): Promise<string> {
  const response = await openai.chat.completions.create({
    model: MODELS.FORMATTING,
    messages: [
      {
        role: "system",
        content: `You are a blog content formatter. Apply proper formatting:

- Add H2 headers (##) for main sections
- Add H3 headers (###) for subsections
- Convert lists to markdown bullets
- Add a "Key Takeaways" section if not present
- Add horizontal rules (---) between major sections
- Preserve all technical content

Return ONLY the formatted markdown, no explanations.`
      },
      {
        role: "user",
        content: `Format this blog article:\n\n${content}`
      }
    ],
    temperature: 0.3
  });

  return response.choices[0].message.content || content;
}

export async function generateWinWireSnippet(topic: any, blogUrl: string): Promise<string> {
  const response = await openai.chat.completions.create({
    model: MODELS.FORMATTING,
    messages: [
      {
        role: "system",
        content: `You are creating Win-Wire newsletter snippets for Microsoft account executives.

Requirements:
- 2-3 sentences maximum
- Start with "New:" or "Updated:"
- Explain what changed and how reps can use it
- End with blog link
- Action-oriented, field-focused

Tone: Concise, helpful, energizing`
      },
      {
        role: "user",
        content: `Create Win-Wire snippet for:

Topic: ${topic.topic_title}
Description: ${topic.description}
Blog URL: ${blogUrl}

Format:
New: [What changed]. [How this helps reps close deals]. [Blog link]`
      }
    ],
    temperature: 0.5
  });

  return response.choices[0].message.content || '';
}
```

---

## Complete Content Pipeline

### End-to-End Workflow

```typescript
// lib/pipelines/content-pipeline.ts
import { correlateSignals } from '../openai/agents/correlation';
import { generateLinkedInPost, generateBlogArticle } from '../openai/agents/content-generation';
import { refineContent } from '../openai/agents/refinement';
import { formatForLinkedIn, formatForBlog, generateWinWireSnippet } from '../openai/agents/formatting';

export async function processTopicToContent(topic: any) {
  console.log(`🚀 Processing topic: ${topic.topic_title}`);
  
  // Step 1: Generate initial drafts (parallel)
  console.log('📝 Generating initial drafts...');
  const [linkedinDraft, blogDraft] = await Promise.all([
    generateLinkedInPost(topic),
    generateBlogArticle(topic)
  ]);

  // Step 2: Refine drafts (parallel)
  console.log('✨ Refining content...');
  const [linkedinRefined, blogRefined] = await Promise.all([
    refineContent(linkedinDraft, 'linkedin'),
    refineContent(blogDraft, 'blog')
  ]);

  // Step 3: Format for platforms (parallel)
  console.log('🎨 Formatting for platforms...');
  const [linkedinFinal, blogFinal] = await Promise.all([
    formatForLinkedIn(linkedinRefined),
    formatForBlog(blogRefined)
  ]);

  // Step 4: Generate Win-Wire snippet (if Microsoft-tagged)
  let winwireSnippet = null;
  if (topic.tags?.includes('Microsoft')) {
    console.log('📧 Generating Win-Wire snippet...');
    winwireSnippet = await generateWinWireSnippet(
      topic,
      'https://blog.mobiz.com/' // Will be real URL after publishing
    );
  }

  console.log('✅ Content pipeline complete!');

  return {
    linkedin: linkedinFinal,
    blog: blogFinal,
    winwire: winwireSnippet,
    metadata: {
      topic_id: topic.id,
      priority: topic.priority,
      tags: topic.tags,
      generated_at: new Date().toISOString()
    }
  };
}
```

---

## API Routes (Vercel)

### Cron Job: Data Collection

```typescript
// app/api/cron/collect-signals/route.ts
import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';
import { fetchXTrends } from '@/lib/collectors/x-api';
import { fetchNewsAPI } from '@/lib/collectors/news-api';
import { fetchAllRSS } from '@/lib/collectors/rss-feeds';

export const maxDuration = 60;

export async function GET(request: Request) {
  // Verify cron secret
  const authHeader = request.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    console.log('🔍 Starting intelligence gathering...');

    // Collect from all sources
    const [trends, news, rss] = await Promise.all([
      fetchXTrends(),
      fetchNewsAPI(),
      fetchAllRSS()
    ]);

    const allSignals = [...trends, ...news, ...rss];
    console.log(`📊 Collected ${allSignals.length} signals`);

    // Store in database
    for (const signal of allSignals) {
      await sql`
        INSERT INTO signals (source, title, description, url, published_at, metadata)
        VALUES (
          ${signal.source},
          ${signal.title},
          ${signal.description || ''},
          ${signal.url || ''},
          ${signal.publishedAt || new Date()},
          ${JSON.stringify(signal.metadata || {})}
        )
      `;
    }

    return NextResponse.json({
      success: true,
      collected: allSignals.length,
      breakdown: {
        x_trends: trends.length,
        news: news.length,
        rss: rss.length
      }
    });

  } catch (error) {
    console.error('❌ Collection failed:', error);
    return NextResponse.json(
      { error: 'Collection failed', details: error.message },
      { status: 500 }
    );
  }
}
```

### API: Correlation

```typescript
// app/api/correlate/route.ts
import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';
import { correlateSignals } from '@/lib/openai/agents/correlation';

export async function POST() {
  try {
    console.log('🔗 Starting signal correlation...');

    // Get signals from last 24 hours
    const { rows: signals } = await sql`
      SELECT * FROM signals 
      WHERE collected_at > NOW() - INTERVAL '24 hours'
      ORDER BY published_at DESC
    `;

    console.log(`📊 Analyzing ${signals.length} signals`);

    // Run OpenAI correlation agent
    const correlatedTopics = await correlateSignals(signals);

    // Store correlated topics
    for (const topic of correlatedTopics.hot_signals || []) {
      await sql`
        INSERT INTO correlated_topics 
        (priority, confidence, topic_title, description, source_count, 
         sources, recommended_angles, content_suggestions, tags, status)
        VALUES (
          'HOT',
          ${topic.confidence},
          ${topic.topic_title},
          ${topic.description},
          ${topic.source_count},
          ${JSON.stringify(topic.sources)},
          ${topic.recommended_angles},
          ${JSON.stringify(topic.content_suggestions || {})},
          ${topic.tags},
          'pending'
        )
      `;
    }

    for (const topic of correlatedTopics.warm_signals || []) {
      await sql`
        INSERT INTO correlated_topics 
        (priority, confidence, topic_title, description, source_count, 
         sources, recommended_angles, content_suggestions, tags, status)
        VALUES (
          'WARM',
          ${topic.confidence},
          ${topic.topic_title},
          ${topic.description},
          ${topic.source_count},
          ${JSON.stringify(topic.sources)},
          ${topic.recommended_angles},
          ${JSON.stringify(topic.content_suggestions || {})},
          ${topic.tags},
          'pending'
        )
      `;
    }

    return NextResponse.json({
      success: true,
      analyzed: signals.length,
      hot_signals: correlatedTopics.hot_signals?.length || 0,
      warm_signals: correlatedTopics.warm_signals?.length || 0,
      cool_signals: correlatedTopics.cool_signals?.length || 0
    });

  } catch (error) {
    console.error('❌ Correlation failed:', error);
    return NextResponse.json(
      { error: 'Correlation failed', details: error.message },
      { status: 500 }
    );
  }
}
```

### API: Generate Content

```typescript
// app/api/generate/route.ts
import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';
import { processTopicToContent } from '@/lib/pipelines/content-pipeline';

export const maxDuration = 300; // 5 minutes for content generation

export async function POST(request: Request) {
  try {
    const { topicId } = await request.json();

    console.log(`🎯 Generating content for topic ${topicId}`);

    // Get topic details
    const { rows: [topic] } = await sql`
      SELECT * FROM correlated_topics WHERE id = ${topicId}
    `;

    if (!topic) {
      return NextResponse.json({ error: 'Topic not found' }, { status: 404 });
    }

    // Run complete content pipeline
    const content = await processTopicToContent(topic);

    // Store drafts
    await sql`
      INSERT INTO content_drafts 
      (topic_id, content_type, content, model_used, metadata)
      VALUES 
      (${topicId}, 'linkedin', ${content.linkedin}, 'gpt-4o', ${JSON.stringify(content.metadata)}),
      (${topicId}, 'blog', ${content.blog}, 'gpt-4o', ${JSON.stringify(content.metadata)})
    `;

    if (content.winwire) {
      await sql`
        INSERT INTO content_drafts 
        (topic_id, content_type, content, model_used, metadata)
        VALUES 
        (${topicId}, 'winwire', ${content.winwire}, 'gpt-4o-mini', ${JSON.stringify(content.metadata)})
      `;
    }

    // Update topic status
    await sql`
      UPDATE correlated_topics 
      SET status = 'drafted' 
      WHERE id = ${topicId}
    `;

    return NextResponse.json({
      success: true,
      content: {
        linkedin: content.linkedin,
        blog: content.blog.substring(0, 500) + '...', // Truncate for response
        winwire: content.winwire
      }
    });

  } catch (error) {
    console.error('❌ Content generation failed:', error);
    return NextResponse.json(
      { error: 'Generation failed', details: error.message },
      { status: 500 }
    );
  }
}
```

---

## Cost Analysis (OpenAI-Only)

### Model Selection Strategy

| Task | Model | Cost per 1M tokens | When to Use |
|------|-------|-------------------|-------------|
| **Correlation** | gpt-4o-mini | $0.15 input / $0.60 output | Filtering, classification, scoring |
| **Content Draft** | gpt-4o | $2.50 input / $10.00 output | Creative content generation |
| **Refinement** | gpt-4o | $2.50 input / $10.00 output | Strategic framing |
| **Formatting** | gpt-4o-mini | $0.15 input / $0.60 output | Simple text formatting |
| **Complex Reasoning** | o1-mini | $3.00 input / $12.00 output | Only if multi-step logic needed |

### Monthly Cost Estimate (10 content pieces)

**Intelligence Gathering:**
- X API: $100/month
- NewsAPI: $0 (free tier)
- RSS: $0

**OpenAI API Costs:**

Per content piece pipeline:
```
Correlation (gpt-4o-mini):
- Input: ~5,000 tokens × $0.15 = $0.00075
- Output: ~2,000 tokens × $0.60 = $0.0012
- Subtotal: ~$0.002

Content Generation (gpt-4o):
- LinkedIn: ~500 input + 300 output = ~$0.004
- Blog: ~1,000 input + 1,200 output = ~$0.015
- Subtotal: ~$0.019

Refinement (gpt-4o):
- LinkedIn: ~400 input + 350 output = ~$0.005
- Blog: ~1,500 input + 1,500 output = ~$0.019
- Subtotal: ~$0.024

Formatting (gpt-4o-mini):
- LinkedIn: ~400 input + 350 output = ~$0.0003
- Blog: ~1,500 input + 1,500 output = ~$0.001
- Subtotal: ~$0.0013

Total per content piece: ~$0.046
```

**Monthly Total (10 pieces):**
- OpenAI API: ~$0.50/month (negligible!)
- X API: $100/month
- Vercel Pro: $20/month
- Vercel Postgres: $10/month

**Total: ~$130/month**

💡 **Key Insight:** OpenAI costs are remarkably low. The real cost is X API access.

---

## Optimization Strategies

### 1. Prompt Caching (OpenAI)

OpenAI now supports prompt caching to reduce costs:

```typescript
const response = await openai.chat.completions.create({
  model: 'gpt-4o',
  messages: [
    {
      role: "system",
      content: systemPrompt, // This will be cached
      cache_control: { type: "ephemeral" }
    },
    {
      role: "user",
      content: userMessage
    }
  ]
});
```

**Savings:** Up to 50% on input tokens for repeated system prompts.

### 2. Structured Outputs

Force JSON mode for reliable parsing (no retry costs):

```typescript
const response = await openai.chat.completions.create({
  model: 'gpt-4o-mini',
  messages: [...],
  response_format: { type: "json_object" }
});
```

### 3. Streaming for Long Content

Stream blog articles to show progress and catch errors early:

```typescript
const stream = await openai.chat.completions.create({
  model: 'gpt-4o',
  messages: [...],
  stream: true
});

for await (const chunk of stream) {
  process.stdout.write(chunk.choices[0]?.delta?.content || '');
}
```

### 4. Parallel Processing

Run independent tasks in parallel:

```typescript
// ✅ Good: Parallel
const [linkedin, blog] = await Promise.all([
  generateLinkedInPost(topic),
  generateBlogArticle(topic)
]);

// ❌ Bad: Sequential
const linkedin = await generateLinkedInPost(topic);
const blog = await generateBlogArticle(topic); // Waits unnecessarily
```

---

## Testing & Debugging

### Unit Test Example

```typescript
// __tests__/agents/correlation.test.ts
import { correlateSignals } from '@/lib/openai/agents/correlation';

describe('Correlation Agent', () => {
  it('should identify HOT signals with 3+ sources', async () => {
    const mockSignals = [
      { source: 'x_api', title: 'Azure AI trending', ... },
      { source: 'news_api', title: 'Microsoft announces Azure AI', ... },
      { source: 'microsoft_rss', title: 'New Azure AI features', ... }
    ];

    const result = await correlateSignals(mockSignals);

    expect(result.hot_signals.length).toBeGreaterThan(0);
    expect(result.hot_signals[0].source_count).toBeGreaterThanOrEqual(3);
    expect(result.hot_signals[0].priority).toBe('HOT');
  });

  it('should classify single-source signals as COOL', async () => {
    const mockSignals = [
      { source: 'news_api', title: 'Random tech news', ... }
    ];

    const result = await correlateSignals(mockSignals);

    expect(result.cool_signals.length).toBeGreaterThan(0);
  });
});
```

### Debug Mode

```typescript
// Enable verbose logging
process.env.DEBUG = 'openai:*';

// Track token usage
import { openai } from './config';

const response = await openai.chat.completions.create({
  model: 'gpt-4o',
  messages: [...],
});

console.log('Token usage:', response.usage);
// { prompt_tokens: 150, completion_tokens: 300, total_tokens: 450 }
```

---

## Environment Variables

```bash
# OpenAI
OPENAI_API_KEY=sk-...

# X API
X_BEARER_TOKEN=...

# NewsAPI
NEWS_API_KEY=...

# LinkedIn
LINKEDIN_ACCESS_TOKEN=...
LINKEDIN_ORG_ID=...

# WordPress
WORDPRESS_URL=https://yourblog.com
WP_USERNAME=...
WP_APP_PASSWORD=...

# Vercel (auto-populated)
POSTGRES_URL=...
POSTGRES_URL_NON_POOLING=...
KV_URL=...
KV_REST_API_URL=...

# Cron Security
CRON_SECRET=random_secret_string

# Optional: OpenAI Organization
OPENAI_ORG_ID=org-...
```

---

## Deployment Checklist

### Pre-Deployment
- [ ] OpenAI API key created and tested
- [ ] Assistants created in OpenAI dashboard
- [ ] X API access configured
- [ ] Database schema deployed to Vercel Postgres
- [ ] All environment variables set
- [ ] LinkedIn/WordPress credentials validated

### Deploy to Vercel
```bash
# Deploy
vercel --prod

# Set environment variables
vercel env add OPENAI_API_KEY production

# Verify cron jobs
vercel cron ls
```

### Post-Deployment
- [ ] Test data collection endpoint
- [ ] Verify cron jobs running
- [ ] Run correlation on sample data
- [ ] Generate test content
- [ ] Review costs in OpenAI dashboard
- [ ] Set up billing alerts

---

## Monitoring

### OpenAI Dashboard
- Monitor API usage: https://platform.openai.com/usage
- Track costs by model
- Review rate limits
- Check error rates

### Custom Logging

```typescript
// lib/monitoring/logger.ts
import { sql } from '@vercel/postgres';

export async function logAgentRun(
  agent: string,
  model: string,
  tokens: { prompt: number; completion: number },
  duration: number,
  cost: number
) {
  await sql`
    INSERT INTO agent_logs (agent, model, prompt_tokens, completion_tokens, duration_ms, cost)
    VALUES (${agent}, ${model}, ${tokens.prompt}, ${tokens.completion}, ${duration}, ${cost})
  `;
}

// Usage
const start = Date.now();
const response = await openai.chat.completions.create({...});
const duration = Date.now() - start;

await logAgentRun(
  'content_generation',
  'gpt-4o',
  { prompt: response.usage.prompt_tokens, completion: response.usage.completion_tokens },
  duration,
  calculateCost(response.usage)
);
```

---

## Next Steps

1. **Week 1-2:** Set up OpenAI Assistants and test each agent
2. **Week 3-4:** Integrate with data collection pipeline
3. **Week 5-6:** Build human review dashboard
4. **Week 7-8:** Add publishing integrations
5. **Week 9-12:** Optimize and scale

---

**This architecture is production-ready and cost-efficient using OpenAI exclusively!** 

The simplicity of a single provider makes debugging, billing, and maintenance much easier than multi-provider setups.
