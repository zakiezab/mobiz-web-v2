import { Metadata } from "next";
import { client } from "@/lib/sanity.client";
import {
  DELIVERED_VALUE_PAGE_QUERY,
  CASE_STUDIES_QUERY,
} from "@/lib/sanity.queries";
import { PageHero } from "@/components/sections/PageHero";
import { CaseStudyFilter } from "@/components/sections/CaseStudyFilter";
import { ContactCTA } from "@/components/sections/ContactCTA";

const DELIVERED_VALUE_KEYWORDS = [
  "execution partner results",
  "mobiz case studies",
  "azure transformation success",
  "production ai outcomes",
  "enterprise digital execution",
];

export async function generateMetadata(): Promise<Metadata> {
  const pageData = await client.fetch(DELIVERED_VALUE_PAGE_QUERY);

  if (!pageData) {
    return {
      title: "Delivered Value - Mobiz",
      description:
        "Real results from real execution. See how we've delivered billions in value across industries through our unique execution model.",
      keywords: DELIVERED_VALUE_KEYWORDS,
    };
  }

  return {
    title: pageData.metaTitle || pageData.title,
    description: pageData.metaDescription,
    keywords: pageData.metaKeywords ?? DELIVERED_VALUE_KEYWORDS,
  };
}

export default async function DeliveredValuePage() {
  const pageData = await client.fetch(DELIVERED_VALUE_PAGE_QUERY);
  const caseStudies = await client.fetch(CASE_STUDIES_QUERY);

  // Use fallback data if no CMS data exists
  const heroKicker = pageData?.heroKicker || "Proof, Not Promises";
  const heroHeadline = pageData?.heroHeadline || "Delivered Value.";
  const heroSubheadline =
    pageData?.heroSubheadline ||
    "Strategy is speculation. Execution is truth. Here's the proof of what happens when you eliminate the accountability gap.";
  const storiesLabel = pageData?.storiesLabel || "Real Results";
  const storiesTitle =
    pageData?.storiesTitle || "Value Delivered in Production";
  const ctaHeadline = pageData?.ctaHeadline || "Ready for real results?";
  const ctaBody =
    pageData?.ctaBody ||
    "Stop paying for PowerPoints. Start getting outcomes. We're ready to execute your transformation.";
  const ctaLabel = pageData?.ctaLabel || "Start the Conversation";

  return (
    <>
      <PageHero
        label={heroKicker}
        title={heroHeadline}
        description={heroSubheadline}
      />

      <CaseStudyFilter
        caseStudies={caseStudies || []}
        label={storiesLabel}
        title={storiesTitle}
      />

      <ContactCTA
        title={ctaHeadline}
        description={ctaBody}
        ctaLabel={ctaLabel}
      />
    </>
  );
}
