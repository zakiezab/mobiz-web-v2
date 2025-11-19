import Image from "next/image";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { client } from "@/lib/sanity.client";
import { CASE_STUDY_QUERY } from "@/lib/sanity.queries";
import { ContactCTA } from "@/components/sections/ContactCTA";
import { CaseStudyStructuredData } from "@/components/seo/CaseStudyStructuredData";
import { ContentHero } from "@/components/sections/ContentHero";
import { ScrollFadeArrow } from "@/components/ui/ScrollFadeArrow";
import { ScrollColorTransition } from "@/components/sections/ScrollColorTransition";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/Button";

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
      <ContentHero
        label={caseStudy.kicker}
        title={caseStudy.title}
        industry={caseStudy.industry}
        executionType={caseStudy.executionType}
        parallaxSpeed={-0.4}
      />
      <ScrollFadeArrow />
      <ScrollColorTransition
        fromBg="#130E23" // dark
        toBg="#FAFAFA" // gray-50
        fromText="#ffffff" // white
        toText="#221F1F" // gray-900
        transitionDistance={50} // Transition over 50% of viewport height
      >
        <article className="py-20 md:py-20">
          <div className="mx-auto w-full max-w-container px-4 md:px-16 2xl:px-6 flex flex-col gap-12">
            <div className="w-full flex-col justify-center">

              {/* <header className="space-y-6 text-center">
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
              </header> */}


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

              <section className="max-w-4xl mx-auto flex gap-12 justify-between py-20">
                <div className="space-y-6 w-1/2">
                  {caseStudy.challenge && (
                    <div>
                      <SectionHeader
                        // label={label}
                        title="Challenge"
                        align="left"
                        titleClassName="text-gray-900"
                      />
                      <p className="text-xl font-light leading-relaxed text-gray-600">
                        {caseStudy.challenge}
                      </p>
                    </div>
                  )}
                </div>
                {(caseStudy.metricLarge || caseStudy.metricContext) && (
                  <div className="space-y-4 w-1/2 text-right">
                    <p className="text-sm font-semibold uppercase tracking-wider text-secondary">
                      Headline Result
                    </p>
                    {caseStudy.metricLarge && (
                      <div className="!font-metrophobic text-5xl md:text-8xl font-bold text-primary">
                        {caseStudy.metricLarge}
                      </div>
                    )}
                    {caseStudy.metricContext && (
                      <p className="text-xl font-medium text-dark">
                        {caseStudy.metricContext}
                      </p>
                    )}
                  </div>
                )}
              </section>

              <section className="py-20">
                <div className="mx-auto w-full max-w-container px-4 md:px-16 2xl:px-6 flex flex-col gap-12">
                  <div className="w-full flex justify-center">
                    {caseStudy.solution && (
                      // <div>
                      //   <SectionHeader
                      //     // label={label}
                      //     title="Solution"
                      //     align="center"
                      //     titleClassName="text-gray-900"
                      //   />
                      //   <p className="text-xl font-light leading-relaxed text-gray-600">
                      //     {caseStudy.solution}
                      //   </p>
                      // </div>
                      <div className="w-full bg-secondary-300/20 border border-secondary-300/50 flex flex-col md:flex-row items-center justify-between p-6 md:p-8 rounded-3xl backdrop-blur-sm shadow-lg">
                        <p className="!font-metrophobic w-full md:w-1/2 text-4xl md:text-6xl font-bold mb-4" style={{ color: 'inherit' }}>
                          Solution
                        </p>
                        <div className="w-full md:w-1/2 text-lg leading-relaxed whitespace-pre-line text-gray-600 font-normal">
                          {caseStudy.solution}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </section>

              {/* {caseStudy.results && (
                <section className="space-y-6">
                  <h2 className="text-2xl font-semibold text-dark">
                    Results
                  </h2>
                  <div className="prose prose-lg max-w-none">
                    <PortableText value={caseStudy.results} />
                  </div>
                </section>
              )} */}

              {caseStudy.technologiesUsed && (
                <section className="py-12">
                  <div className="mx-auto w-full max-w-container px-4 md:px-16 2xl:px-6 flex flex-col gap-12">
                    <div className="w-full flex flex-row md:flex-col gap-4 text-center justify-center">
                      <div className="w-full ">
                        <h2 className="text-2xl font-semibold text-dark">
                          Technologies Used
                        </h2>
                      </div>
                      <div className="w-full flex justify-center">
                        <ul className="flex flex-wrap gap-3">
                          {caseStudy.technologiesUsed.map((tech: string) => (
                            <li
                              key={tech}
                              className="rounded-lg border bg-secondary-100 border-secondary-200 px-6 py-2 text-base font-medium text-gray-700"
                            >
                              {tech}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </section>
              )}
            </div>
          </div>
        </article>
        <section className="py-8">
          <div className="mx-auto w-full max-w-container px-4 md:px-16 2xl:px-6 flex justify-center">
            <Button
              variant="outline"
              href="/case-studies"
              className="items-center gap-2 !text-secondary-700 hover:text-secondary-900 transition-colors font-medium rounded-lg border !border-secondary-200 bg-secondary-50 hover:!bg-primary-100 px-4 py-2"
            >
              <ArrowLeft className="w-4 h-4" /> Back to All Case Studies
            </Button>
          </div>
        </section>
      </ScrollColorTransition>
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
