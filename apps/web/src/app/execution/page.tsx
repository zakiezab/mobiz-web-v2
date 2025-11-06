import { Metadata } from "next";
import { client } from "@/lib/sanity.client";
import {
  EXECUTION_PAGE_QUERY,
  ENGAGEMENT_MODELS_QUERY,
} from "@/lib/sanity.queries";
import { PageHero } from "@/components/sections/PageHero";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { ExecutionDifference } from "@/components/sections/ExecutionDifference";
import { EngagementModels } from "@/components/sections/EngagementModels";
import { ContactCTA } from "@/components/sections/ContactCTA";

const EXECUTION_KEYWORDS = [
  "enterprise execution partner",
  "cloud transformation partner",
  "production ai execution",
  "digital product engineering",
  "legacy system modernization",
];

// Mapping of service titles to execution slugs
const SERVICE_SLUG_MAP: Record<string, string> = {
  "Cloud Transformation": "/execution/cloud-transformation",
  "AI & Data Platforms": "/execution/ai-data-platforms",
  "Digital Product Engineering": "/execution/digital-product-engineering",
  "Core System Modernization": "/execution/core-system-modernization",
};

const FALLBACK_SERVICES = [
  {
    number: "01",
    title: "Cloud Transformation",
    description:
      "Complete migrations, modernization, and cloud-native architecture executed with zero disruption.",
    outcome: "→ Outcome: 40% cost reduction",
    href: "/execution/cloud-transformation",
  },
  {
    number: "02",
    title: "AI & Data Platforms",
    description:
      "From data architecture to production-grade models that turn your data into competitive advantage.",
    outcome: "→ Outcome: 3-6 month deployment",
    href: "/execution/ai-data-platforms",
  },
  {
    number: "03",
    title: "Digital Product Engineering",
    description:
      "Mission-critical customer experiences, platforms, and APIs engineered for enterprise performance.",
    outcome: "→ Outcome: 2.3x faster time-to-market",
    href: "/execution/digital-product-engineering",
  },
  {
    number: "04",
    title: "Core System Modernization",
    description:
      "Replacing high-risk legacy systems and managing the complexity of ERP and SCM migrations end-to-end.",
    outcome: "→ Outcome: 100% on-time, on-budget",
    href: "/execution/core-system-modernization",
  },
];

export async function generateMetadata(): Promise<Metadata> {
  const pageData = await client.fetch(EXECUTION_PAGE_QUERY);

  if (!pageData) {
    return {
      title: "Execution Hub - Mobiz",
      description:
        "Full-stack execution capabilities across cloud transformation, AI platforms, digital product engineering, and core system modernization.",
      keywords: EXECUTION_KEYWORDS,
    };
  }

  return {
    title: pageData.metaTitle || pageData.title,
    description: pageData.metaDescription,
    keywords: pageData.metaKeywords ?? EXECUTION_KEYWORDS,
  };
}

export default async function ExecutionHubPage() {
  const pageData = await client.fetch(EXECUTION_PAGE_QUERY);
  const engagementModels = await client.fetch(ENGAGEMENT_MODELS_QUERY);

  // Use fallback data if no CMS data exists
  const heroKicker = pageData?.heroKicker || "Execution Hub";
  const heroHeadline =
    pageData?.heroHeadline || "We don't recommend. We execute.";
  const heroSubheadline =
    pageData?.heroSubheadline ||
    "Our model is not theoretical. We deliver complex, production-grade systems across four core execution pillars.";
  const servicesLabel = pageData?.servicesLabel || "Full-Stack Execution";
  const servicesTitle = pageData?.servicesTitle || "Capabilities That Deliver";
  const servicesDescription =
    pageData?.servicesDescription ||
    "From strategy to production, we own the entire execution lifecycle. No handoffs, no excuses, just outcomes.";

  // Map services from Sanity and add href links
  const services = (pageData?.services || FALLBACK_SERVICES).map((service: any) => ({
    ...service,
    href: SERVICE_SLUG_MAP[service.title] || undefined,
  }));

  const ctaHeadline = pageData?.ctaHeadline || "Ready to execute?";
  const ctaBody =
    pageData?.ctaBody ||
    "Stop talking about transformation. Start executing it. We're ready to build. Let's start the conversation.";
  const ctaLabel = pageData?.ctaLabel || "Start the Conversation";

  return (
    <>
      <PageHero
        label={heroKicker}
        title={heroHeadline}
        description={heroSubheadline}
      />

      <ServicesGrid
        label={servicesLabel}
        title={servicesTitle}
        description={servicesDescription}
        services={services}
      />

      <ExecutionDifference />

      <EngagementModels models={engagementModels} />

      <ContactCTA
        title={ctaHeadline}
        description={ctaBody}
        ctaLabel={ctaLabel}
      />
    </>
  );
}
