import Link from "next/link";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { client } from "@/lib/sanity.client";
import { SERVICE_PAGE_QUERY } from "@/lib/sanity.queries";
import { PageHero } from "@/components/sections/PageHero";
import { ContactCTA } from "@/components/sections/ContactCTA";

const EXECUTION_SLUGS = [
  "cloud-transformation",
  "ai-data-platforms",
  "digital-product-engineering",
  "core-system-modernization",
] as const;

const EXECUTION_KEYWORD_MAP: Record<string, string[]> = {
  "cloud-transformation": [
    "enterprise cloud transformation partner",
    "azure cloud migration",
    "cloud modernization execution",
    "cloud transformation services",
    "mobiz cloud execution",
  ],
  "ai-data-platforms": [
    "production ai platform partner",
    "enterprise ai execution",
    "data platform modernization",
    "azure ai implementation",
    "mobiz ai platforms",
  ],
  "core-system-modernization": [
    "legacy system modernization services",
    "erp modernization partner",
    "core system transformation",
    "legacy modernization execution",
    "mobiz system modernization",
  ],
  "digital-product-engineering": [
    "enterprise digital product engineering",
    "product engineering partner",
    "digital platform execution",
    "customer experience engineering",
    "mobiz product engineering",
  ],
};

interface ExecutionPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return EXECUTION_SLUGS.map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({
  params,
}: ExecutionPageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = await client.fetch(SERVICE_PAGE_QUERY, { slug });

  if (!service) {
    return {
      title: "Service Not Found",
    };
  }

  return {
    title: service.metaTitle || service.title,
    description: service.metaDescription || service.heroSubheadline,
    keywords:
      service.metaKeywords ||
      EXECUTION_KEYWORD_MAP[slug] ||
      ["execution partner", "mobiz services"],
  };
}

export default async function ExecutionPage({ params }: ExecutionPageProps) {
  const { slug } = await params;

  // Validate that this is an execution route
  if (!EXECUTION_SLUGS.includes(slug as any)) {
    notFound();
  }

  const service = await client.fetch(SERVICE_PAGE_QUERY, { slug });

  if (!service) {
    notFound();
  }

  return (
    <>
      <PageHero
        label={service.kicker || "Execution /"}
        title={service.heroHeadline}
        description={service.heroSubheadline}
      />

      {service.problemHeadline && (
        <section className="bg-white py-40">
          <div className="mx-auto w-full max-w-container px-20">
            <div className="max-w-4xl">
              <h2 className="text-4xl font-extralight leading-tight tracking-tighter text-dark mb-8">
                {service.problemHeadline}
              </h2>
              {service.problemDescription && (
                <p className="text-xl font-light leading-relaxed text-gray-600 mb-12">
                  {service.problemDescription}
                </p>
              )}
              {service.solutionDescription && (
                <div className="bg-gray-50 p-8 rounded-lg">
                  <p className="text-lg font-medium text-dark mb-4">
                    Our Solution
                  </p>
                  <p className="text-base font-light leading-relaxed text-gray-700">
                    {service.solutionDescription}
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {service.capabilities && service.capabilities.length > 0 && (
        <section className="bg-gray-50 py-40">
          <div className="mx-auto w-full max-w-container px-20">
            <div className="max-w-4xl mb-20">
              <h2 className="text-4xl font-extralight leading-tight tracking-tighter text-dark mb-8">
                Core Capabilities
              </h2>
            </div>
            <div className="grid gap-16 md:grid-cols-2">
              {service.capabilities.map((capability: any, index: number) => (
                <div key={index} className="bg-white p-8 rounded-lg">
                  <h3 className="text-2xl font-normal text-dark mb-4">
                    {capability.title}
                  </h3>
                  {capability.description && (
                    <p className="text-base font-light leading-relaxed text-gray-600">
                      {capability.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {service.proofMetric && (
        <section className="bg-white py-40">
          <div className="mx-auto w-full max-w-container px-20">
            <div className="max-w-4xl text-center mx-auto">
              {service.proofKicker && (
                <p className="text-sm font-semibold uppercase tracking-wider text-primary mb-4">
                  {service.proofKicker}
                </p>
              )}
              <div className="text-6xl font-light text-primary mb-4">
                {service.proofMetric}
              </div>
              {service.proofContext && (
                <p className="text-xl font-medium text-dark mb-8">
                  {service.proofContext}
                </p>
              )}
              {service.proofBody && (
                <p className="text-lg font-light leading-relaxed text-gray-600 max-w-prose mx-auto">
                  {service.proofBody}
                </p>
              )}
              {service.proofCaseStudyLink && (
                <div className="mt-8">
                  <Link
                    href={`/case-studies/${service.proofCaseStudyLink.slug}`}
                    className="inline-block text-[15px] font-medium text-dark px-10 py-[18px] border-2 border-dark rounded-sm transition-all duration-200 hover:bg-dark hover:text-white"
                  >
                    View Case Study
                  </Link>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {service.ctaHeadline && (
        <ContactCTA
          title={service.ctaHeadline}
          description={
            service.ctaBody ||
            "Ready to transform your business? Let's start the conversation."
          }
          ctaLabel="Start the Conversation"
        />
      )}
    </>
  );
}
