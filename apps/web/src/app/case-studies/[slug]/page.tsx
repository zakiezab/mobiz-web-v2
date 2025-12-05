import Image from "next/image";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { PortableText } from "@portabletext/react";
import { client } from "@/lib/sanity.client";
import { CASE_STUDY_QUERY } from "@/lib/sanity.queries";
import { ContactCTA } from "@/components/sections/ContactCTA";
import { CaseStudyStructuredData } from "@/components/seo/CaseStudyStructuredData";
import { ContentHero } from "@/components/sections/ContentHero";
import { ScrollFadeArrow } from "@/components/ui/ScrollFadeArrow";
import { ScrollColorTransition } from "@/components/sections/ScrollColorTransition";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { QuoteCarousel } from "@/components/sections/QuoteCarousel";
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
        image={caseStudy.featuredImage?.asset?.url}
      />
      <ScrollFadeArrow />
      <ScrollColorTransition
        fromBg="#130E23" // dark
        toBg="#FAFAFA" // gray-50
        fromText="#ffffff" // white
        toText="#221F1F" // gray-900
        transitionDistance={50} // Transition over 50% of viewport height
      >
        <article className="pb-0">
          <div className="mx-auto w-full max-w-container">
            {caseStudy.featuredMedia && (
              <div className="relative aspect-[16/9] overflow-hidden bg-gray-100">
                {caseStudy.featuredMedia.type === 'image' && caseStudy.featuredMedia.image?.asset?.url ? (
                  <Image
                    src={caseStudy.featuredMedia.image.asset.url}
                    alt={
                      caseStudy.featuredMedia.image.asset.altText || caseStudy.title
                    }
                    fill
                    className="object-cover"
                    sizes="(min-width: 1024px) 1024px, 100vw"
                    priority
                  />
                ) : caseStudy.featuredMedia.type === 'video' ? (
                  <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    controls
                    className="w-full h-full object-cover"
                    poster={caseStudy.featuredMedia.image?.asset?.url || caseStudy.featuredImage?.asset?.url}
                  >
                    {caseStudy.featuredMedia.videoFile?.asset?.url && (
                      <source src={caseStudy.featuredMedia.videoFile.asset.url} type="video/mp4" />
                    )}
                    {caseStudy.featuredMedia.videoUrl && !caseStudy.featuredMedia.videoFile?.asset?.url && (
                      <source src={caseStudy.featuredMedia.videoUrl} />
                    )}
                    Your browser does not support the video tag.
                  </video>
                ) : null}
              </div>
            )}
          </div>
          <div className="mx-auto w-full max-w-container px-0 md:px-16 2xl:px-6 flex flex-col gap-12">
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

              <section className="mx-auto flex flex-col md:flex-row gap-12 justify-between py-12 px-4 md:px-0 md:py-20">
                <div className="space-y-6 w-full md:w-1/2">
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
                  <div className="space-y-4 w-full md:w-1/2 text-center md:text-right">
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
                <div className="mx-auto w-full max-w-container px-0 md:px-16 2xl:px-6 flex flex-col gap-12">
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
                      <div className="w-full bg-secondary-300/20 border border-secondary-300/50 flex flex-col md:flex-row items-center justify-between p-6 md:p-8 rounded-none md:rounded-3xl backdrop-blur-sm shadow-lg">
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

              {caseStudy.results && (
                <section className="py-20">
                  <div className="mx-auto w-full max-w-container px-4 md:px-16 2xl:px-6 flex flex-col gap-12">
                    <div className="mx-auto">
                      <SectionHeader
                        title="Results"
                        align="left"
                        titleClassName="text-gray-900"
                      />
                      <div className="mt-8">
                        <PortableText
                          value={caseStudy.results}
                          components={{
                            block: {
                              h2: ({ children }) => (
                                <h2 className="!font-metrophobic text-3xl font-normal text-gray-800 mt-8 mb-4">
                                  {children}
                                </h2>
                              ),
                              h3: ({ children }) => (
                                <h3 className="!font-metrophobic text-2xl font-normal text-gray-800 mt-6 mb-3">
                                  {children}
                                </h3>
                              ),
                              p: ({ children }) => (
                                <p className="text-xl font-light leading-relaxed text-gray-800 mb-6">
                                  {children}
                                </p>
                              ),
                              normal: ({ children }) => (
                                <p className="text-xl font-light leading-relaxed text-gray-800 mb-6">
                                  {children}
                                </p>
                              ),
                              blockquote: ({ children }) => (
                                <blockquote className="border-l-4 border-primary pl-6 my-6 text-xl font-light italic text-gray-700">
                                  {children}
                                </blockquote>
                              ),
                            },
                            list: {
                              bullet: ({ children }) => (
                                <ul className="list-disc list-outside space-y-3 text-xl font-light text-gray-600 mb-6 pl-6">
                                  {children}
                                </ul>
                              ),
                              number: ({ children }) => (
                                <ol className="list-decimal list-outside space-y-3 text-xl font-light text-gray-600 mb-6 pl-6">
                                  {children}
                                </ol>
                              ),
                            },
                            listItem: {
                              bullet: ({ children }) => (
                                <li className="pl-2">{children}</li>
                              ),
                              number: ({ children }) => (
                                <li className="pl-2">{children}</li>
                              ),
                            },
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </section>
              )}

              {caseStudy.technologiesUsed && (
                <section className="py-12">
                  <div className="mx-auto w-full max-w-container px-4 md:px-16 2xl:px-6 flex flex-col gap-12">
                    <div className="w-full flex flex-col md:flex-col gap-4 text-center justify-center">
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
          <div>
            {caseStudy.clientQuotes && caseStudy.clientQuotes.length > 0 && (
              <section>
                <div className="mx-auto w-full max-w-container px-4 md:px-16 2xl:px-6 bg-gray-100 py-12">
                  <div className="max-w-4xl mx-auto">
                    <QuoteCarousel quotes={caseStudy.clientQuotes} />
                  </div>
                </div>
              </section>
            )}
          </div>
        </article>
        <section className="py-8 bg-gray-100">
          <div className="mx-auto w-full max-w-container px-4 md:px-16 2xl:px-6 flex justify-center">
            <Button
              variant="outline"
              href="/case-studies"
              className="items-center gap-2 !text-secondary-700 transition-colors font-medium rounded-lg border !border-secondary-200 bg-gray-50 hover:!bg-secondary-100 px-4 py-2"
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
