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

export const STATIC_SERVICES: Record<string, StaticService> = {
  "azure-landing-zone": {
    slug: "azure-landing-zone",
    title: "Azure Landing Zone",
    category: "cloud-services",
    kicker: "Cloud Services /",
    heroHeadline: "Azure Managed Service Providers (MSP)",
    heroSubheadline:
      "Run, optimize and maintain your Azure environment with security and efficiency",
    heroImage: "/images/service-hero.png",
    problemHeadline: "Our Commitment: Operational Excellence & Continuous Growth",
    problemDescription:
      "At Mobiz, we help companies unlock the full potential of Microsoft Azure from day-to-day operations to strategic optimization of their cloud resources. With a team of certified specialists and deep expertise in complex projects we deliver continuous support, cost efficiency and accelerated innovation so your IT becomes a true growth driver.",
    solutionDescription:
      "We manage and optimize your Azure environment to keep it reliable, secure and aligned with your business objectives throughout its lifecycle.",
    capabilities: [
      {
        title: "24/7 Monitoring & Support",
        description:
          "Proactive issue detection and rapid incident response to minimize downtime. Our dedicated teams provide continuous monitoring and support for your business-critical applications and Azure services.",
      },
      {
        title: "Security & Compliance",
        description:
          "Ongoing assessments to protect data, reduce risks and stay aligned with Microsoft's best practices. We keep your Azure environment secure and compliant with industry standards.",
      },
      {
        title: "Cost Control & Optimization",
        description:
          "Right-size resources, eliminate waste and maximize return on your Azure investment. We monitor and fine-tune your cloud spending to ensure optimal cost efficiency.",
      },
      {
        title: "Automation & DevOps Enablement",
        description:
          "Implement continuous integration, deployment and operational automation to scale faster. We accelerate delivery and reliability through automation and DevOps best practices.",
      },
      {
        title: "Platform Health & Updates",
        description:
          "Keep your Azure and Microsoft solutions current, stable and secure. We manage platform updates and ensure your infrastructure stays aligned with the latest Microsoft releases.",
      },
      {
        title: "Strategic Cloud Guidance",
        description:
          "We help you plan and evolve your Azure architecture, prioritize workloads and create a clear roadmap for your cloud journey with expert guidance and best practices.",
      },
    ],
    proofKicker: "Local, Global and 24/7",
    proofContext: "The Power of a Single Point of Contact",
    proofBody:
      "With an account-based approach and presence across time zones, Mobiz is always ready to support your business wherever you are. Our dedicated customer teams provide you with a single point of contact for IT service management, cloud operations and application development, always looking ahead to support your future growth.\n\nThe result: 24/7 support for your business-critical applications and Azure services, 24/7 proactive and predictive monitoring to detect and resolve issues early, minimized downtime and reduced operational risks, outsourcing of functional and technical application management, expert support for new releases and platform updates, and proactive, solution-focused incident management.",
    ctaHeadline: "Simplify your cloud journey with trusted Azure Managed Services",
    ctaBody:
      "Contact us today to learn more about our Managed Azure Services and how we can help you achieve your cloud goals.",
    metaTitle: "Azure Landing Zone | Azure Managed Services | Mobiz",
    metaDescription:
      "Run, optimize and maintain your Azure environment with security and efficiency. 24/7 monitoring, security compliance, cost optimization, and automation with Mobiz Azure Managed Services.",
    metaKeywords: [
      "azure landing zone implementation",
      "enterprise azure foundation",
      "azure cloud adoption framework",
      "azure governance and security",
      "azure managed services",
      "azure msp",
      "azure managed service provider",
      "azure cloud operations",
      "azure 24/7 support",
      "azure cost optimization",
    ],
  },
};

