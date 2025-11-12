import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { groq } from "next-sanity";
import { unstable_noStore as noStore } from "next/cache";
import { client } from "@/lib/sanity.client";
import { SERVICE_PAGE_QUERY, ALL_SERVICES_QUERY } from "@/lib/sanity.queries";
import { STATIC_SERVICES } from "@/lib/static-services";
import { ContactCTA } from "@/components/sections/ContactCTA";
import { ContentHero } from "@/components/sections/ContentHero";
import { ScrollColorTransition } from "@/components/sections/ScrollColorTransition";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { ScrollFadeArrow } from "@/components/ui/ScrollFadeArrow";

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

// Revalidate the page every 60 seconds (1 minute) to get fresh content from Sanity
// In development, you may need to restart the dev server to see changes immediately
// In production, changes will appear within 60 seconds
export const revalidate = 60;

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
    // Fetch from Sanity - in development, CDN is disabled for fresh data
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

  // In development, disable caching to get fresh data from Sanity immediately
  // This ensures changes in Sanity appear without restarting the dev server
  if (process.env.NODE_ENV === 'development') {
    noStore();
  }

  // Check static services first
  let service: any = STATIC_SERVICES[slug];

  // Fall back to Sanity if not found in static services
  if (!service) {
    try {
      // Fetch from Sanity - in development, CDN is disabled and noStore() ensures fresh data
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
  // Default fallback image if no image is provided
  const DEFAULT_HERO_IMAGE = "/images/service-hero.png";
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

  // Use default image if no hero image is provided
  if (!heroImage) {
    heroImage = DEFAULT_HERO_IMAGE;
  }

  // Helper function to get image URL from Sanity asset
  const getImageUrl = (imageAsset: any): string | undefined => {
    if (!imageAsset) return undefined;
    if (typeof imageAsset === 'string') return imageAsset;
    if (imageAsset?.asset?.url) return imageAsset.asset.url;
    return undefined;
  };

  // Fetch other services from the same category
  let relatedServices: any[] = [];
  if (service.category) {
    try {
      // Get services from Sanity - in development, CDN is disabled for fresh data
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
      {/* Scroll-based gradient overlay - fixed at top of viewport, fades in on scroll */}
      {/* <ScrollGradientOverlay /> */}

      <ContentHero
        label={heroLabel}
        title={service.heroHeadline}
        description={service.heroSubheadline}
        image={heroImage}
        parallaxSpeed={-0.4}
      />
      <ScrollFadeArrow />
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
                <div className="w-full bg-secondary-300/20 border border-secondary-300/50 flex flex-col md:flex-row items-center justify-between p-6 md:p-8 rounded-3xl backdrop-blur-sm shadow-lg">
                  <p className="!font-metrophobic w-full md:w-1/2 text-4xl md:text-6xl font-bold mb-4" style={{ color: 'inherit' }}>
                    Our Solution
                  </p>
                  <div className="w-full md:w-1/2 text-lg leading-relaxed whitespace-pre-line text-gray-600 font-normal">
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
              {service.capabilities.map((capability: any, index: number) => {
                const capabilityImageUrl = getImageUrl(capability.image);
                return (
                  <div key={index} className="flex flex-row items-start gap-4 bg-secondary-300/10 border border-secondary-300/50 p-6 md:p-8 rounded-3xl">
                    {capabilityImageUrl && (
                      <div className="relative w-full h-[200px] mb-6 rounded-xl overflow-hidden">
                        <Image
                          src={capabilityImageUrl}
                          alt={capability.title || `Capability ${index + 1}`}
                          fill
                          className="object-contain"
                          sizes="w-[200px] h-[200px]"
                        />
                      </div>
                    )}
                    <div className="flex flex-col gap-2">
                      <h3 className="text-3xl font-bold text-gray-800 mb-4">
                        {capability.title}
                      </h3>
                      {capability.description && (
                        <p className="text-lg leading-relaxed text-gray-800 font-normal">
                          {capability.description}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Features Section */}
      {service.featuresSection && (
        <section className="bg-gray-50 py-20 md:py-40">
          <div className="mx-auto w-full max-w-container px-4 md:px-16 2xl:px-6">
            <div className="mb-12 flex justify-center">
              <div className="max-w-4xl w-full">
                <SectionHeader
                  label={service.featuresSection.kicker}
                  title={service.featuresSection.title}
                  description={service.featuresSection.description}
                  align="center"
                  titleClassName="text-gray-900 dark:text-secondary-100"
                  descriptionClassName="text-gray-600 dark:text-secondary-200"
                />
              </div>
            </div>

            {service.featuresSection.image && getImageUrl(service.featuresSection.image) && (
              <div className="mb-12 flex justify-center">
                <div className="relative w-full max-w-4xl h-96 rounded-2xl overflow-hidden">
                  <Image
                    src={getImageUrl(service.featuresSection.image)!}
                    alt={service.featuresSection.title || "Features section image"}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 1200px"
                  />
                </div>
              </div>
            )}

            {service.featuresSection.items && service.featuresSection.items.length > 0 && (
              <div className="grid gap-6 md:gap-8 md:grid-cols-2 lg:grid-cols-3">
                {service.featuresSection.items.map((item: any, index: number) => {
                  const itemImageUrl = getImageUrl(item.image);
                  return (
                    <div key={index} className="bg-gray-50 p-6 rounded-2xl">
                      {itemImageUrl && (
                        <div className="relative w-full h-48 mb-4 rounded-lg overflow-hidden">
                          <Image
                            src={itemImageUrl}
                            alt={item.title || `Feature ${index + 1}`}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          />
                        </div>
                      )}
                      <h3 className="text-xl font-bold text-gray-900 dark:text-secondary-100 mb-2">
                        {item.title}
                      </h3>
                      {item.description && (
                        <p className="text-base leading-relaxed text-gray-700 dark:text-secondary-200">
                          {item.description}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </section>
      )}

      {/* Additional Sections */}
      {service.additionalSections && service.additionalSections.length > 0 && (
        <>
          {service.additionalSections.map((section: any, sectionIndex: number) => {
            const mediaImageUrl = section.media?.type === 'image' ? getImageUrl(section.media.image) : undefined;
            const videoUrl = section.media?.type === 'video'
              ? (section.media.videoUrl || (section.media.videoFile?.asset?.url))
              : undefined;

            return (
              <section key={sectionIndex} className={`bg-gray-50 py-20 md:py-40`}>
                <div className="mx-auto w-full max-w-container px-4 md:px-16 2xl:px-6">
                  {section.alignment === 'center' ? (
                    // Center alignment: image below text
                    <div className="w-full max-w-4xl mx-auto">
                      {section.kicker && (
                        <div className="section-label mb-4 text-center">
                          {section.kicker}
                        </div>
                      )}
                      <SectionHeader
                        title={section.title}
                        description={section.description}
                        align="center"
                        titleClassName="text-gray-900 dark:text-secondary-100"
                        descriptionClassName="text-gray-600 dark:text-secondary-200"
                      />

                      {/* Media Display - Below for center */}
                      {mediaImageUrl && (
                        <div className="mt-8 flex justify-center">
                          <div className="relative w-full max-w-4xl h-96 rounded-2xl overflow-hidden">
                            <Image
                              src={mediaImageUrl}
                              alt={section.title || `Section ${sectionIndex + 1} image`}
                              fill
                              className="object-contain"
                              sizes="(max-width: 768px) 100vw, 1200px"
                            />
                          </div>
                        </div>
                      )}

                      {videoUrl && (
                        <div className="mt-8 flex justify-center">
                          <div className="relative w-full max-w-4xl aspect-video rounded-2xl overflow-hidden">
                            {/* Check if it's a YouTube or Vimeo URL */}
                            {(() => {
                              const isYouTube = videoUrl.includes('youtube.com') || videoUrl.includes('youtu.be');
                              const isVimeo = videoUrl.includes('vimeo.com');

                              if (isYouTube) {
                                // Extract YouTube video ID
                                const youtubeId = videoUrl.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/)?.[1];
                                if (youtubeId) {
                                  return (
                                    <iframe
                                      src={`https://www.youtube.com/embed/${youtubeId}`}
                                      className="w-full h-full"
                                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                      allowFullScreen
                                      title={section.title || `Video ${sectionIndex + 1}`}
                                    />
                                  );
                                }
                              }

                              if (isVimeo) {
                                // Extract Vimeo video ID
                                const vimeoId = videoUrl.match(/vimeo\.com\/(\d+)/)?.[1];
                                if (vimeoId) {
                                  return (
                                    <iframe
                                      src={`https://player.vimeo.com/video/${vimeoId}`}
                                      className="w-full h-full"
                                      allow="autoplay; fullscreen; picture-in-picture"
                                      allowFullScreen
                                      title={section.title || `Video ${sectionIndex + 1}`}
                                    />
                                  );
                                }
                              }

                              // For direct video files or other URLs
                              return (
                                <video
                                  src={videoUrl}
                                  controls
                                  className="w-full h-full object-cover"
                                >
                                  Your browser does not support the video tag.
                                </video>
                              );
                            })()}
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    // Start or End alignment: image and text side by side (if image exists)
                    // End: image on left, text on right
                    // Start: image on right, text on left
                    // If no image: text takes full width with proper alignment
                    (mediaImageUrl || videoUrl) ? (
                      // Has image/video: side-by-side layout
                      <div className="w-full max-w-container mx-auto flex flex-col md:flex-row gap-8 md:gap-12 items-center">
                        {/* Text Content - Left for start, Right for end */}
                        <div className={`w-full md:w-1/2 ${section.alignment === 'end' ? 'md:order-2 md:text-right' : 'md:order-1 md:text-left'}`}>
                          {section.kicker && (
                            <div className={`section-label mb-4 ${section.alignment === 'end' ? 'md:text-right' : 'md:text-left'}`}>
                              {section.kicker}
                            </div>
                          )}
                          <SectionHeader
                            title={section.title}
                            description={section.description}
                            align={section.alignment === 'end' ? 'right' : 'left'}
                            titleClassName="text-gray-900 dark:text-secondary-100"
                            descriptionClassName="text-gray-600 dark:text-secondary-200"
                          />
                        </div>

                        {/* Media Display - Right for start, Left for end */}
                        <div className={`w-full md:w-1/2 ${section.alignment === 'end' ? 'md:order-1' : 'md:order-2'}`}>
                          {mediaImageUrl && (
                            <div className="relative w-full h-96 rounded-2xl overflow-hidden">
                              <Image
                                src={mediaImageUrl}
                                alt={section.title || `Section ${sectionIndex + 1} image`}
                                fill
                                className="object-contain"
                                sizes="(max-width: 768px) 100vw, 50vw"
                              />
                            </div>
                          )}

                          {videoUrl && (
                            <div className="relative w-full aspect-video rounded-2xl overflow-hidden">
                              {/* Check if it's a YouTube or Vimeo URL */}
                              {(() => {
                                const isYouTube = videoUrl.includes('youtube.com') || videoUrl.includes('youtu.be');
                                const isVimeo = videoUrl.includes('vimeo.com');

                                if (isYouTube) {
                                  // Extract YouTube video ID
                                  const youtubeId = videoUrl.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/)?.[1];
                                  if (youtubeId) {
                                    return (
                                      <iframe
                                        src={`https://www.youtube.com/embed/${youtubeId}`}
                                        className="w-full h-full"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                        title={section.title || `Video ${sectionIndex + 1}`}
                                      />
                                    );
                                  }
                                }

                                if (isVimeo) {
                                  // Extract Vimeo video ID
                                  const vimeoId = videoUrl.match(/vimeo\.com\/(\d+)/)?.[1];
                                  if (vimeoId) {
                                    return (
                                      <iframe
                                        src={`https://player.vimeo.com/video/${vimeoId}`}
                                        className="w-full h-full"
                                        allow="autoplay; fullscreen; picture-in-picture"
                                        allowFullScreen
                                        title={section.title || `Video ${sectionIndex + 1}`}
                                      />
                                    );
                                  }
                                }

                                // For direct video files or other URLs
                                return (
                                  <video
                                    src={videoUrl}
                                    controls
                                    className="w-full h-full object-cover"
                                  >
                                    Your browser does not support the video tag.
                                  </video>
                                );
                              })()}
                            </div>
                          )}
                        </div>
                      </div>
                    ) : (
                      // No image/video: text only with proper alignment and full width
                      <div className={`w-full max-w-container mx-auto ${section.alignment === 'end' ? 'text-right' : section.alignment === 'start' ? 'text-left' : 'text-center'}`}>
                        {section.kicker && (
                          <div className={`section-label mb-4 ${section.alignment === 'end' ? 'text-right' : section.alignment === 'start' ? 'text-left' : 'text-center'}`}>
                            {section.kicker}
                          </div>
                        )}
                        <SectionHeader
                          title={section.title}
                          description={section.description}
                          align={section.alignment === 'end' ? 'right' : section.alignment === 'start' ? 'left' : 'center'}
                          titleClassName="text-gray-900 dark:text-secondary-100"
                          descriptionClassName="text-gray-600 dark:text-secondary-200"
                        />
                      </div>
                    )
                  )}
                </div>
              </section>
            );
          })}
        </>
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
                  >
                    <Button
                      variant="primary"
                      className="flex items-center gap-2"
                    >
                      View Case Study
                      <ArrowUpRight />
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {relatedServices.length > 0 && (
        <section className="bg-secondary-100 dark:bg-dark py-8 md:py-12">
          <div className="mx-auto w-full max-w-container px-4 md:px-16 2xl:px-6">
            <div className="mb-12 md:mb-20">
              <h2 className="!font-metrophobic text-4xl md:text-5xl font-bold leading-tight tracking-tighter text-gray-900 dark:text-secondary-100 mb-4">
                Other {categoryLabel || "Services"}
              </h2>
              <p className="text-xl font-light leading-relaxed text-gray-600 dark:text-secondary-300 max-w-3xl">
                Explore our other {categoryLabel?.toLowerCase() || "services"} to discover how we can help transform your business.
              </p>
            </div>
            <div className="grid gap-8 md:gap-20 md:grid-cols-3">
              {relatedServices.map((service, index) => {
                const uniqueKey = service.id || service.href || `${service.title}-${index}`;

                const content = (
                  <>
                    <div className="w-8 h-8 md:w-12 md:h-12 bg-primary-300/20 border border-primary-300 rounded-xl md:rounded-xl flex items-center justify-center text-lg md:text-xl !font-metrophobic text-primary dark:text-primary-100">
                      {service.number}
                    </div>
                    <div className="space-y-2">
                      <h3 className="!font-metrophobic text-gray-900 dark:text-secondary-100 text-xl md:text-2xl leading-tight tracking-tighter mb-2">
                        {service.title}
                      </h3>
                      {service.description && (
                        <p className="text-base font-light leading-relaxed text-gray-700 dark:text-secondary-100 max-w-prose line-clamp-2">
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
                    className="grid grid-cols-[auto_1fr] gap-8 group bg-gray-50/50 hover:bg-white dark:bg-secondary-600/20 dark:hover:bg-secondary-800 border border-secondary-200 dark:border-secondary-800 p-6 -m-6 rounded-3xl transition-all"
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
