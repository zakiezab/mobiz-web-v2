import Image from "next/image";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { PortableText } from "@portabletext/react";
import { client } from "@/lib/sanity.client";
import { CASE_STUDY_QUERY } from "@/lib/sanity.queries";
import { ContactCTA } from "@/components/sections/ContactCTA";
import { CaseStudyStructuredData } from "@/components/seo/CaseStudyStructuredData";

interface CaseStudyPageProps {
  params: Promise<{ slug: string }>;
}

export const revalidate = 3600;

export async function generateMetadata({
  params,
}: CaseStudyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const caseStudy = await client.fetch(CASE_STUDY_QUERY, { slug });

  if (!caseStudy) {
    return {
      title: "Case Study Not Found",
    };
  }

  return {
    title: caseStudy.seo?.title || caseStudy.title,
    description: caseStudy.seo?.description || caseStudy.cardHeadline,
    openGraph: {
      images: caseStudy.featuredImage?.asset?.url
        ? [caseStudy.featuredImage.asset.url]
        : [],
    },
  };
}

export default async function CaseStudyPage({
  params,
}: CaseStudyPageProps) {
  const { slug } = await params;
  const caseStudy = await client.fetch(CASE_STUDY_QUERY, { slug });

  if (!caseStudy) {
    notFound();
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://mobizinc.com";
  const caseStudyUrl = `${siteUrl.replace(/\/$/, "")}/case-studies/${caseStudy.slug}`;

  return (
    <>
      <article className="bg-white py-24">
        <div className="mx-auto w-full max-w-container px-20">
          <div className="max-w-4xl mx-auto space-y-16">
            <header className="space-y-6 text-center">
              {caseStudy.kicker && (
                <p className="text-sm font-semibold uppercase tracking-widest text-secondary">
                  {caseStudy.kicker}
                </p>
              )}
              <h1 className="text-5xl font-extralight leading-tight tracking-tighter text-dark">
                {caseStudy.title}
              </h1>
              <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-gray-500">
                {caseStudy.industry && (
                  <span className="uppercase tracking-wider">
                    Industry: {caseStudy.industry}
                  </span>
                )}
                {caseStudy.executionType && (
                  <span className="uppercase tracking-wider">
                    Execution: {caseStudy.executionType}
                  </span>
                )}
              </div>
            </header>

            {caseStudy.featuredImage?.asset?.url && (
              <div className="relative aspect-[16/9] overflow-hidden rounded-lg bg-gray-100">
                <Image
                  src={caseStudy.featuredImage.asset.url}
                  alt={
                    caseStudy.featuredImage.asset.altText || caseStudy.title
                  }
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 1024px, 100vw"
                  priority
                />
              </div>
            )}

            <section className="grid gap-12 md:grid-cols-2">
              {(caseStudy.metricLarge || caseStudy.metricContext) && (
                <div className="space-y-4">
                  <p className="text-sm font-semibold uppercase tracking-wider text-secondary">
                    Headline Result
                  </p>
                  {caseStudy.metricLarge && (
                    <div className="text-5xl font-light text-primary">
                      {caseStudy.metricLarge}
                    </div>
                  )}
                  {caseStudy.metricContext && (
                    <p className="text-lg font-medium text-dark">
                      {caseStudy.metricContext}
                    </p>
                  )}
                </div>
              )}
              <div className="space-y-6">
                {caseStudy.challenge && (
                  <div>
                    <h2 className="text-xl font-semibold text-dark mb-2">
                      Challenge
                    </h2>
                    <p className="text-base font-light leading-relaxed text-gray-700">
                      {caseStudy.challenge}
                    </p>
                  </div>
                )}
                {caseStudy.solution && (
                  <div>
                    <h2 className="text-xl font-semibold text-dark mb-2">
                      Solution
                    </h2>
                    <p className="text-base font-light leading-relaxed text-gray-700">
                      {caseStudy.solution}
                    </p>
                  </div>
                )}
              </div>
            </section>

            {caseStudy.results && (
              <section className="space-y-6">
                <h2 className="text-2xl font-semibold text-dark">
                  Results
                </h2>
                <div className="prose prose-lg max-w-none">
                  <PortableText value={caseStudy.results} />
                </div>
              </section>
            )}

            {caseStudy.technologiesUsed && (
              <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-dark">
                  Technologies Used
                </h2>
                <ul className="flex flex-wrap gap-3">
                  {caseStudy.technologiesUsed.map((tech: string) => (
                    <li
                      key={tech}
                      className="rounded-sm border border-gray-200 bg-gray-50 px-4 py-2 text-sm text-gray-700"
                    >
                      {tech}
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </div>
        </div>
      </article>

      <ContactCTA
        title="Ready to deliver outcomes like these?"
        description="Let's discuss how our execution model can deliver measurable results for your organization."
        ctaLabel="Start the Conversation"
      />
      <CaseStudyStructuredData
        headline={caseStudy.title}
        description={caseStudy.cardHeadline ?? caseStudy.solution}
        url={caseStudyUrl}
        industry={caseStudy.industry}
        metric={caseStudy.metricLarge}
        metricContext={caseStudy.metricContext}
        imageUrl={caseStudy.featuredImage?.asset?.url}
      />
    </>
  );
}
