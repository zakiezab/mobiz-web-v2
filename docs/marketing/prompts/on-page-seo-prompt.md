# On-Page SEO Optimization Prompt

## Purpose

This prompt reviews and optimizes page copy (H1, meta descriptions, opening paragraphs) to ensure:
1. Primary keyword integration from the keyword map
2. Mobiz voice consistency (declarative, confident, peer-to-peer)
3. Anchoring to brand pillars (Accountability Gap, Strategy vs Execution, Mobiz Model)
4. Optimal structure for search engines and user engagement

---

## Keyword Map Reference

Use this mapping for primary keyword targets:

| Page/Route | Primary Keyword Target |
|------------|----------------------|
| `/` | execution partner |
| `/our-model` | accountability gap in consulting |
| `/execution/cloud-transformation` | enterprise cloud transformation partner |
| `/execution/ai-data-platforms` | production AI platform partner |
| `/execution/core-system-modernization` | legacy system modernization services |
| `/execution/digital-product-engineering` | enterprise digital product engineering |

---

## The Prompt

```
You are an SEO copywriter specializing in B2B enterprise technology. Your task is to review and optimize page content for search engines while maintaining the Mobiz brand voice.

## CONTEXT

**Brand Voice:**
- Declarative and confident (not hedging or marketing fluff)
- Peer-to-peer tone (talking to equals, not prospects)
- Technical but accessible
- Focused on outcomes, not features

**Brand Pillars (must anchor to these):**
1. The Accountability Gap problem (strategy firms leave, system integrators bill hours)
2. Strategy vs. Execution philosophy (execution is truth, not speculation)
3. The Mobiz Model solution (Clarity → Velocity → Certainty, zero handoffs)

**Target Audience:**
- F500 CTOs, VPs of Engineering, Technology Directors
- Decision-makers tired of consultants who don't execute
- Leaders looking for accountability and production outcomes

---

## PAGE TO REVIEW

**URL:** [Insert page URL, e.g., /execution/cloud-transformation]
**Primary Keyword:** [Insert from keyword map, e.g., "enterprise cloud transformation partner"]

**Current Content:**

**H1:** [Insert current H1]

**Meta Title:** [Insert current meta title]

**Meta Description:** [Insert current meta description]

**Opening Paragraph (first 150 words):** [Insert opening paragraph]

---

## OPTIMIZATION TASKS

Please review and provide optimizations for:

### 1. H1 Headline
- Does it contain or naturally incorporate the primary keyword?
- Is it declarative and confident (not a question or weak statement)?
- Does it communicate clear value in ≤10 words?
- Does it avoid marketing clichés and buzzwords?

**Recommendation:**
[Provide optimized H1 with rationale]

### 2. Meta Title (50-60 characters)
- Does it include the primary keyword near the beginning?
- Does it include "Mobiz" for brand recognition?
- Is it compelling for click-through?
- Is it within character limit?

**Current length:** [X] characters
**Recommendation:**
[Provide optimized meta title]

### 3. Meta Description (150-160 characters)
- Does it answer "Why Mobiz?" in one compelling sentence?
- Does it include the primary keyword naturally?
- Does it include a value proposition or differentiator?
- Does it create urgency or interest?
- Does it end with a call to action or benefit statement?

**Current length:** [X] characters
**Recommendation:**
[Provide optimized meta description]

### 4. Opening Paragraph
- Does the first sentence contain the primary keyword?
- Does it immediately address the Accountability Gap or pain point?
- Does it differentiate Mobiz from competitors?
- Is it in the Mobiz voice (declarative, peer-to-peer, confident)?
- Does it avoid "we help" or "we can" language in favor of "we execute" or "we deliver"?

**Recommendation:**
[Provide optimized opening paragraph with annotations]

### 5. Keyword Density Check
- Is the primary keyword used 2-3 times in the first 300 words?
- Are semantic variations included (e.g., "cloud transformation" vs "cloud migration")?
- Is keyword usage natural, not stuffed?

**Analysis:**
[Provide keyword density analysis and recommendations]

### 6. Brand Pillar Integration
Which of the three pillars is this page anchored to?
- [ ] Accountability Gap
- [ ] Strategy vs Execution
- [ ] Mobiz Model

**Recommendation:**
[Suggest how to strengthen pillar integration if needed]

---

## OUTPUT FORMAT

Provide the optimized content in this format:

**OPTIMIZED H1:**
[New H1]

**OPTIMIZED META TITLE:**
[New meta title] (X characters)

**OPTIMIZED META DESCRIPTION:**
[New meta description] (X characters)

**OPTIMIZED OPENING PARAGRAPH:**
[New opening paragraph with primary keyword in first sentence]

**RATIONALE:**
[2-3 sentences explaining the key changes and why they improve SEO + brand alignment]

**SECONDARY RECOMMENDATIONS:**
- [Any additional suggestions for subheadings, CTAs, etc.]
```

---

## Usage Instructions

### For New Pages:

1. Fill in the page URL and primary keyword from the keyword map
2. Insert current/draft content (H1, meta title, meta description, opening paragraph)
3. Run the prompt through Claude Sonnet or GPT-4
4. Review recommendations and implement in Sanity CMS

### For Existing Pages:

1. Pull current content from the live page or Sanity
2. Run through the prompt
3. Compare old vs. new for measurable improvements
4. A/B test if significant traffic exists
5. Update in Sanity CMS

### Quality Checklist:

Before finalizing optimized content:
- [ ] Primary keyword appears in H1
- [ ] Primary keyword appears in first sentence of opening paragraph
- [ ] Meta title is 50-60 characters
- [ ] Meta description is 150-160 characters
- [ ] Copy uses Mobiz voice (declarative, confident, peer-to-peer)
- [ ] Copy avoids "we help," "we can," or hedging language
- [ ] Copy focuses on outcomes, not features
- [ ] Content anchors to at least one brand pillar
- [ ] No marketing clichés or buzzwords (e.g., "innovative," "cutting-edge," "solutions")

---

## Examples

### Example 1: Homepage

**Before:**
- H1: "Strategy, Executed."
- Meta Description: "Mobiz helps F500 companies transform their technology."

**After:**
- H1: "Your Execution Partner for Enterprise Technology"
- Meta Description: "Enterprise execution partner for F500 CTOs. We architect, build, and deploy mission-critical systems. Zero handoffs. Guaranteed outcomes. 150 chars"

**Why it's better:**
- H1 includes "execution partner" keyword
- Meta description answers "Why Mobiz?" and includes keyword
- Removed weak "helps" language
- Added concrete value prop (zero handoffs, guaranteed outcomes)

### Example 2: Cloud Transformation Page

**Before:**
- H1: "Cloud Transformation Services"
- Opening: "We offer cloud transformation services to help enterprises migrate to the cloud."

**After:**
- H1: "Enterprise Cloud Transformation Partner: Zero Downtime, Guaranteed Outcomes"
- Opening: "Enterprise cloud transformation fails 70% of the time because strategy firms deliver PowerPoints, then leave. We are the execution partner that architects, builds, and deploys your cloud migration from day one to production. Zero handoffs. Zero downtime. One accountable team."

**Why it's better:**
- H1 includes "enterprise cloud transformation partner" keyword + differentiator
- Opening addresses Accountability Gap immediately
- Uses "we are" (declarative) instead of "we offer" or "we help"
- Concrete promises (zero downtime, zero handoffs)
- Peer-to-peer voice

---

## Notes

- This prompt should be run on every core "money page" (homepage, service pages, key case studies)
- Article/blog posts have more flexibility but should still maintain voice and keyword focus
- Run quarterly reviews to ensure content hasn't drifted from SEO targets
- Test optimizations in staging before pushing to production
- Monitor rankings for primary keywords post-optimization

---

**Last Updated:** 2025-01-03
**Owner:** Marketing Team
**Related Docs:** `docs/marketing/AI-Enabled B2B.md`
