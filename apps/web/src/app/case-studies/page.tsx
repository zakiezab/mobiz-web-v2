import { Metadata } from "next";
import { ContactCTA } from "@/components/sections/ContactCTA";
import { PageHero } from "@/components/sections/PageHero";
import { client } from "@/lib/sanity.client";
import { CASE_STUDIES_QUERY } from "@/lib/sanity.queries";
import { CaseStudiesList } from "@/components/sections/CaseStudiesList";

type CaseStudyCard = {
  _id: string;
  slug: string;
  title?: string;
  kicker?: string;
  metricLarge?: string;
  metricContext?: string;
  industry?: string;
  executionType?: string;
  featuredImage?: {
    asset?: {
      url?: string;
      altText?: string;
    };
  };
};

export const metadata: Metadata = {
  title: "Case Studies - Mobiz",
  description:
    "Evidence of execution. Explore case studies that showcase how we deliver measurable outcomes for enterprise clients.",
  keywords: [
    "mobiz case studies",
    "execution partner proof",
    "enterprise transformation results",
    "azure execution success",
    "accountability gap case study",
  ],
};

export const revalidate = 3600;

export default async function CaseStudiesPage() {
  const caseStudies = await client.fetch<CaseStudyCard[]>(CASE_STUDIES_QUERY);

  return (
    <>
      <PageHero
        label="Case Studies"
        title={<span>Proof, <br/><strong>Not Promises</strong></span>}
        description="A selection of outcomes delivered in production. Zero handoffs. 100% accountability."
        titleClassName="!font-metrophobic font-bold text-4xl md:text-9xl leading-tight tracking-tighter mb-6"
      />

      <section className="bg-gray-50 dark:bg-dark py-4 md:pt-12 md:pb-40">
        <div className="mx-auto w-full max-w-container px-4 md:px-16 2xl:px-6">
          {caseStudies.length === 0 ? (
            <div className="max-w-3xl mx-auto text-center">
              <p className="text-xl font-light text-gray-600 dark:text-secondary-200">
                Case studies are coming soon. Check back as we publish outcomes from our execution model.
              </p>
            </div>
          ) : (
            <CaseStudiesList caseStudies={caseStudies} />
          )}
        </div>
      </section>

      <ContactCTA
        title="Ready to create your own case study?"
        description="Let's discuss how our execution-first model can deliver measurable results for your organization."
        ctaLabel="Start the Conversation"
      />
    </>
  );
}
