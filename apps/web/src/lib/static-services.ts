// Static service data for services that are not yet in Sanity CMS
// This allows creating service pages without Sanity access

export interface StaticService {
  slug: string;
  title: string;
  category: string;
  kicker?: string;
  heroHeadline: string;
  heroSubheadline: string;
  heroImage?: string; // Path to hero image (e.g., "/images/azure-landing-zone-hero.png")
  problemHeadline?: string;
  problemDescription?: string;
  solutionDescription?: string;
  capabilities?: Array<{
    title: string;
    description: string;
    image?: string; // Optional image path
  }>;
  featuresSection?: {
    kicker?: string;
    title: string;
    description?: string;
    image?: string; // Optional image path
    items?: Array<{
      image?: string; // Optional image path
      title: string;
      description?: string;
    }>;
  };
  additionalSections?: Array<{
    kicker?: string;
    title: string;
    description?: string;
    media?: {
      type: 'image' | 'video';
      image?: string; // Image path if type is 'image'
      videoUrl?: string; // Video URL if type is 'video'
      videoFile?: string; // Video file path if type is 'video'
    };
    alignment?: 'start' | 'center' | 'end';
  }>;
  proofKicker?: string;
  proofMetric?: string;
  proofContext?: string;
  proofBody?: string;
  proofCaseStudyLink?: {
    slug: string;
    title?: string;
  };
  ctaHeadline?: string;
  ctaBody?: string;
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string[];
}

// Static services are now disabled - all services come from Sanity CMS
// To restore dummy/static content, see static-services.backup.ts
// To add a new static service, copy the structure from the backup file and add it here
export const STATIC_SERVICES: Record<string, StaticService> = {
  // Empty - all services now come from Sanity CMS
  // To restore dummy content, copy STATIC_SERVICES_BACKUP from static-services.backup.ts
};

