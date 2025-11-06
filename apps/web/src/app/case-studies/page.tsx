import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import { ContactCTA } from "@/components/sections/ContactCTA";
import { PageHero } from "@/components/sections/PageHero";
import { client } from "@/lib/sanity.client";
import { CASE_STUDIES_QUERY } from "@/lib/sanity.queries";

type CaseStudyCard = {
  _id: string;
  slug: string;
  title?: string;
  kicker?: string;
  metricLarge?: string;
  metricContext?: string;
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
        title="Proof, Not Promises"
        description="A selection of outcomes delivered in production. Zero handoffs. 100% accountability."
      />

      <section className="bg-white py-40">
        <div className="mx-auto w-full max-w-container px-20">
          {caseStudies.length === 0 ? (
            <div className="max-w-3xl text-center">
              <p className="text-xl font-light text-gray-600">
                Case studies are coming soon. Check back as we publish outcomes from our execution model.
              </p>
            </div>
          ) : (
            <div className="grid gap-16 md:grid-cols-2">
              {caseStudies.map((study) => (
                <article key={study._id} className="group rounded-lg border border-gray-100 bg-gray-50 p-8 transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)]">
                  <Link href={`/case-studies/${study.slug}`} className="block space-y-6">
                    {study.featuredImage?.asset?.url && (
                      <div className="relative aspect-[16/9] overflow-hidden rounded-md bg-white">
                        <Image
                          src={study.featuredImage.asset.url}
                          alt={study.featuredImage.asset.altText || study.title || "Case study"}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                          sizes="(min-width: 1024px) 480px, 100vw"
                        />
                      </div>
                    )}
                    <div className="space-y-4">
                      <div className="text-sm font-semibold uppercase tracking-wider text-secondary">
                        {study.kicker}
                      </div>
                      <h2 className="text-2xl font-light text-dark group-hover:text-primary">
                        {study.title}
                      </h2>
                      <div className="text-4xl font-light text-primary">
                        {study.metricLarge}
                      </div>
                      <p className="text-base font-light leading-relaxed text-gray-700">
                        {study.metricContext}
                      </p>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
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
