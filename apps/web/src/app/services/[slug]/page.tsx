import Link from "next/link";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { groq } from "next-sanity";
import { client } from "@/lib/sanity.client";
import { SERVICE_PAGE_QUERY, ALL_SERVICES_QUERY } from "@/lib/sanity.queries";
import { STATIC_SERVICES } from "@/lib/static-services";
import { PageHero } from "@/components/sections/PageHero";
import { ContactCTA } from "@/components/sections/ContactCTA";
import { ContentHero } from "@/components/sections/ContentHero";
import { ScrollColorTransition } from "@/components/sections/ScrollColorTransition";
import { SectionHeader } from "@/components/sections/SectionHeader";

const SERVICE_KEYWORD_MAP: Record<string, string[]> = {
  "cloud-transformation": [
    "enterprise cloud transformation partner",
    "azure cloud migration",
    "cloud modernization execution",
    "cloud transformation services",
  ],
  "ai-data-platforms": [
    "production ai platform partner",
    "enterprise ai execution",
    "data platform modernization",
    "azure ai implementation",
  ],
  "core-system-modernization": [
    "legacy system modernization services",
    "erp modernization partner",
    "core system transformation",
    "legacy modernization execution",
  ],
  "digital-product-engineering": [
    "enterprise digital product engineering",
    "product engineering partner",
    "digital platform execution",
    "customer experience engineering",
  ],
  "azure-landing-zone": [
    "azure landing zone implementation",
    "enterprise azure foundation",
    "azure cloud adoption framework",
    "azure governance and security",
    "azure managed services",
    "azure msp",
  ],
};

// Category labels for breadcrumb display
const CATEGORY_LABELS: Record<string, string> = {
  "cloud-services": "Cloud Services",
  "data-ai": "Data & AI",
  "digital-engineering": "Digital Engineering",
  "modernization": "Modernization",
};

interface ServicePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  // Get services from Sanity
  let sanityServices: any[] = [];
  try {
    sanityServices = await client.fetch(
      groq`*[_type == "servicePage"]{ "slug": slug.current }`
    );
  } catch (error) {
    console.warn("Could not fetch services from Sanity:", error);
  }

  // Combine Sanity services with static services
  const staticSlugs = Object.keys(STATIC_SERVICES).map((slug) => ({ slug }));
  const allServices = [...sanityServices, ...staticSlugs];

  // Remove duplicates
  const uniqueServices = Array.from(
    new Map(allServices.map((service) => [service.slug, service])).values()
  );

  return uniqueServices;
}

export async function generateMetadata({
  params,
}: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;

  // Check static services first
  const staticService = STATIC_SERVICES[slug];
  if (staticService) {
    return {
      title: staticService.metaTitle || staticService.title,
      description: staticService.metaDescription || staticService.heroSubheadline,
      keywords: staticService.metaKeywords || SERVICE_KEYWORD_MAP[slug] || ["execution partner", "mobiz services"],
    };
  }

  // Fall back to Sanity
  let service = null;
  try {
    service = await client.fetch(SERVICE_PAGE_QUERY, { slug });
  } catch (error) {
    console.warn("Could not fetch service from Sanity:", error);
  }

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
      SERVICE_KEYWORD_MAP[slug] ||
      ["execution partner", "mobiz services"],
  };
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params;

  // Check static services first
  let service = STATIC_SERVICES[slug];

  // Fall back to Sanity if not found in static services
  if (!service) {
    try {
      service = await client.fetch(SERVICE_PAGE_QUERY, { slug });
    } catch (error) {
      console.warn("Could not fetch service from Sanity:", error);
    }
  }

  if (!service) {
    notFound();
  }

  // Construct label with category if available
  const categoryLabel = service.category
    ? CATEGORY_LABELS[service.category]
    : null;
  const heroLabel = service.kicker
    ? service.kicker
    : categoryLabel
      ? `${categoryLabel} /`
      : "";

  // Get hero image - handle both static services (string path) and Sanity services (object with asset)
  let heroImage: string | undefined;

  // Check if service has heroImage property (works for both StaticService and Sanity service)
  if ('heroImage' in service && service.heroImage) {
    if (typeof service.heroImage === 'string') {
      // Static service - direct image path
      heroImage = service.heroImage;
    } else if (typeof service.heroImage === 'object' && service.heroImage !== null && 'asset' in service.heroImage) {
      // Sanity service - get URL from asset
      const sanityImage = service.heroImage as { asset?: { url?: string } };
      if (sanityImage.asset?.url) {
        heroImage = sanityImage.asset.url;
        // Sanity CDN URLs are already full URLs, so no need to modify
      }
    }
  }

  // Fetch other services from the same category
  let relatedServices: any[] = [];
  if (service.category) {
    try {
      // Get services from Sanity
      const sanityServices = await client.fetch(ALL_SERVICES_QUERY);

      // Convert static services to the same format
      const staticServicesArray = Object.values(STATIC_SERVICES).map((s) => ({
        _id: `static-${s.slug}`,
        title: s.title,
        slug: s.slug,
        category: s.category,
        heroHeadline: s.heroHeadline,
        heroSubheadline: s.heroSubheadline,
        metaDescription: s.metaDescription,
      }));

      // Combine and filter
      const allCategoryServices = [...sanityServices, ...staticServicesArray]
        .filter((s: any) => s.category === service.category && s.slug !== slug)
        .slice(0, 4); // Limit to 4 related services

      // Map to ServicesGrid format
      relatedServices = allCategoryServices.map((s: any, index: number) => ({
        id: s._id || s.slug,
        number: String(index + 1).padStart(2, "0"),
        title: s.title,
        description: s.heroSubheadline || s.metaDescription || "",
        outcome: "",
        href: `/services/${s.slug}`,
      }));
    } catch (error) {
      console.warn("Could not fetch related services:", error);
    }
  }

  return (
    <>
      <ContentHero
        label={heroLabel}
        title={service.heroHeadline}
        description={service.heroSubheadline}
        image={heroImage}
        parallaxSpeed={-0.4}
      />

      {service.problemHeadline && (
        <ScrollColorTransition
          fromBg="#130E23" // dark
          toBg="#FAFAFA" // gray-50
          fromText="#ffffff" // white
          toText="#221F1F" // gray-900
          transitionDistance={50} // Transition over 50% of viewport height
        >
          <section className="py-20 md:pt-60 md:pb-20">
            <div className="mx-auto w-full max-w-container px-4 md:px-16 2xl:px-6 flex flex-col gap-12">
              <div className="w-full flex justify-center">
                <div className="max-w-4xl">
                  <SectionHeader
                    // label={label}
                    title={service.problemHeadline}
                    description={service.problemDescription}
                    align="center"
                    titleClassName="text-gray-900 font-bold"
                    descriptionClassName="!text-gray-600 text-xl text-center leading-relaxe font-normal"
                  />
                  {/* <h2 className="!font-metrophobic text-4xl md:text-7xl font-bold text-center leading-tight tracking-tighter mb-8" style={{ color: 'inherit' }}>
                    {service.problemHeadline}
                  </h2>
                  {service.problemDescription && (
                    <p className="text-xl text-secondary-600 text-center leading-relaxed mb-12" style={{ color: 'inherit' }}>
                      {service.problemDescription}
                    </p>
                  )} */}
                </div>
              </div>
              {service.solutionDescription && (
                <div className="w-full bg-secondary-300/20 border border-secondary-300/50 flex items-center justify-between p-6 md:p-8 rounded-3xl backdrop-blur-sm shadow-lg">
                  <p className="!font-metrophobic w-1/2 text-6xl font-bold mb-4" style={{ color: 'inherit' }}>
                    Our Solution
                  </p>
                  <div className="w-1/2 text-lg leading-relaxed whitespace-pre-line text-gray-600 font-normal">
                    {service.solutionDescription}
                  </div>
                </div>
              )}
            </div>
          </section>
        </ScrollColorTransition>
      )}

      {service.capabilities && service.capabilities.length > 0 && (
        <section className="bg-gray-50 py-20 md:py-20">
          <div className="mx-auto w-full max-w-container px-4 md:px-16 2xl:px-6">
            <div className="mb-12 flex justify-center">
              <div className="max-w-4xl">
                <SectionHeader
                  // label={label}
                  title="Core Capabilities"
                  align="center"
                  titleClassName="text-gray-900"
                />
              </div>
            </div>
            {/* <div className="max-w-4xl mb-12 md:mb-20">
              <h2 className="text-4xl md:text-5xl font-bold leading-tight tracking-tighter text-gray-900 mb-8">
                Core Capabilities
              </h2>
            </div> */}
            <div className="grid gap-4 md:gap-8 md:grid-cols-2">
              {service.capabilities.map((capability: any, index: number) => (
                <div key={index} className="bg-secondary-300/10 border border-secondary-300/50 p-6 md:p-12 rounded-3xl">
                  <h3 className="text-3xl font-bold text-gray-800 mb-4">
                    {capability.title}
                  </h3>
                  {capability.description && (
                    <p className="text-lg leading-relaxed text-gray-800 font-normal">
                      {capability.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {(service.proofKicker || service.proofMetric || service.proofContext || service.proofBody) && (
        <section className="bg-gray-50 py-12 md:pt-20 md:pb-40">
          <div className="mx-auto w-full max-w-container px-4 md:px-16 2xl:px-6 flex justify-start items-center">
            <div className="text-left">
              <div className="section-label">
              {service.proofKicker}
              </div>
              {service.proofMetric && (
                <div className="!font-metrophobic text-7xl font-bold text-gray-900 mb-4 ">
                  {service.proofMetric}
                </div>
              )}
              <SectionHeader
                title={service.proofContext}
                description={service.proofBody}
                align="left"
                titleClassName="text-gray-900"
                descriptionClassName="!text-gray-600 text-xl leading-relaxe font-normal"
              />
              {/* {service.proofKicker && (
                <p className="text-sm font-semibold uppercase tracking-wider text-primary mb-4">
                  {service.proofKicker}
                </p>
              )}
              {service.proofContext && (
                <p className="text-xl font-medium text-gray-900 mb-8 ">
                  {service.proofContext}
                </p>
              )}
              {service.proofBody && (
                <div className="text-lg font-light leading-relaxed text-gray-700 max-w-prose mx-auto whitespace-pre-line">
                  {service.proofBody}
                </div>
              )} */}
              {service.proofCaseStudyLink && (
                <div className="mt-8">
                  <Link
                    href={`/case-studies/${service.proofCaseStudyLink.slug}`}
                    className="inline-block text-[15px] font-medium text-primary px-10 py-[18px] border-2 border-gray-900 dark:border-secondary-100 rounded-sm transition-all duration-200 hover:bg-gray-900 hover:text-white dark:hover:bg-secondary-100 dark:hover:text-dark"
                  >
                    View Case Study
                  </Link>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {relatedServices.length > 0 && (
        <section className="bg-gray-50 dark:bg-dark py-20 md:py-40">
          <div className="mx-auto w-full max-w-container px-4 md:px-16 2xl:px-6">
            <div className="mb-12 md:mb-20">
              <h2 className="text-4xl md:text-5xl font-extralight leading-tight tracking-tighter text-gray-900 dark:text-secondary-100 mb-4">
                Other {categoryLabel || "Services"}
              </h2>
              <p className="text-xl font-light leading-relaxed text-gray-700 dark:text-secondary-200 max-w-3xl">
                Explore our other {categoryLabel?.toLowerCase() || "services"} to discover how we can help transform your business.
              </p>
            </div>
            <div className="grid gap-8 md:gap-20 md:grid-cols-2">
              {relatedServices.map((service, index) => {
                const uniqueKey = service.id || service.href || `${service.title}-${index}`;

                const content = (
                  <>
                    <div className="w-8 h-8 md:w-12 md:h-12 bg-primary-300/20 border border-primary-300 rounded-xl md:rounded-xl flex items-center justify-center text-lg md:text-xl !font-metrophobic text-primary dark:text-primary-100">
                      {service.number}
                    </div>
                    <div className="space-y-3">
                      <h3 className="!font-metrophobic text-gray-900 dark:text-secondary-100 text-xl md:text-2xl leading-tight tracking-tighter mb-6">
                        {service.title}
                      </h3>
                      {service.description && (
                        <p className="text-base md:text-xl font-light leading-relaxed text-gray-700 dark:text-secondary-100 max-w-prose">
                          {service.description}
                        </p>
                      )}
                      {service.outcome && (
                        <p className="flex items-center gap-2 mt-3 text-base md:text-xl text-primary dark:text-primary-100">
                          {service.outcome}
                        </p>
                      )}
                    </div>
                  </>
                );

                return (
                  <Link
                    key={uniqueKey}
                    href={service.href || "#"}
                    className="grid grid-cols-[auto_1fr] gap-8 group hover:bg-white dark:hover:bg-white/5 border border-gray-100 dark:border-secondary-800 p-6 -m-6 rounded-3xl transition-all"
                  >
                    {content}
                  </Link>
                );
              })}
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
