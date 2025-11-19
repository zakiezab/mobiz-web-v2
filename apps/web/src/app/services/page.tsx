import { Metadata } from "next";
import { client } from "@/lib/sanity.client";
import { ALL_SERVICES_QUERY, CATEGORIES_QUERY } from "@/lib/sanity.queries";
// Static services disabled - all services now come from Sanity CMS
// To restore, see static-services.backup.ts
import { PageHero } from "@/components/sections/PageHero";
import { ContactCTA } from "@/components/sections/ContactCTA";
import { CategoryServicesSection } from "@/components/sections/CategoryServicesSection";

const SERVICES_KEYWORDS = [
    "enterprise services",
    "cloud transformation services",
    "ai data platforms",
    "digital product engineering",
    "core system modernization",
    "azure landing zone",
    "execution partner",
];

// Default category labels (fallback if Sanity doesn't have categories)
const DEFAULT_CATEGORY_LABELS: Record<string, string> = {
    "cloud-services": "Cloud Services",
    "data-ai": "Data & AI",
    "digital-engineering": "Digital Engineering",
    "modernization": "Modernization",
};

// Default category descriptions (fallback)
const DEFAULT_CATEGORY_DESCRIPTIONS: Record<string, string> = {
    "cloud-services": "Explore our Cloud Services offerings. We deliver complex, production-grade systems with zero handoffs.",
    "data-ai": "Explore our Data & AI offerings. We deliver complex, production-grade systems with zero handoffs.",
    "digital-engineering": "Explore our Digital Engineering offerings. We deliver complex, production-grade systems with zero handoffs.",
    "modernization": "Explore our Modernization offerings. We deliver complex, production-grade systems with zero handoffs.",
};


const FALLBACK_SERVICES = [
    {
        number: "01",
        title: "Cloud Transformation",
        description:
            "Complete migrations, modernization, and cloud-native architecture executed with zero disruption.",
        outcome: "Outcome: 40% cost reduction",
        href: "/services/cloud-transformation",
    },
    {
        number: "02",
        title: "AI & Data Platforms",
        description:
            "From data architecture to production-grade models that turn your data into competitive advantage.",
        outcome: "Outcome: 3-6 month deployment",
        href: "/services/ai-data-platforms",
    },
    {
        number: "03",
        title: "Digital Product Engineering",
        description:
            "Mission-critical customer experiences, platforms, and APIs engineered for enterprise performance.",
        outcome: "Outcome: 2.3x faster time-to-market",
        href: "/services/digital-product-engineering",
    },
    {
        number: "04",
        title: "Core System Modernization",
        description:
            "Replacing high-risk legacy systems and managing the complexity of ERP and SCM migrations end-to-end.",
        outcome: "Outcome: 100% on-time, on-budget",
        href: "/services/core-system-modernization",
    },
];

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: "Services - Mobiz | Strategy, Executed.",
        description:
            "Full-stack execution services across cloud transformation, AI platforms, digital product engineering, and core system modernization. We don't just advise. We execute.",
        keywords: SERVICES_KEYWORDS,
    };
}

export default async function ServicesPage() {
    // Fetch all services from Sanity
    let sanityServices: any[] = [];
    try {
        sanityServices = await client.fetch(ALL_SERVICES_QUERY);
    } catch (error) {
        console.warn("Could not fetch services from Sanity:", error);
    }

    // Fetch categories from Sanity
    let sanityCategories: any[] = [];
    try {
        sanityCategories = await client.fetch(CATEGORIES_QUERY);
    } catch (error) {
        console.warn("Could not fetch categories from Sanity:", error);
    }

    // Only use Sanity services (static services disabled)
    const allServices = sanityServices;

    // Create category map from Sanity (or use defaults)
    const categoryMap: Record<string, { label: string; description: string; image?: string }> = {};
    
    // Initialize with defaults
    Object.keys(DEFAULT_CATEGORY_LABELS).forEach((key) => {
        const label = DEFAULT_CATEGORY_LABELS[key];
        const desc = DEFAULT_CATEGORY_DESCRIPTIONS[key];
        if (label && desc) {
            categoryMap[key] = {
                label,
                description: desc,
            };
        }
    });

    // Override with Sanity data if available
    sanityCategories.forEach((cat: any) => {
        if (cat.key && cat.label) {
            categoryMap[cat.key] = {
                label: cat.label,
                description: cat.description || DEFAULT_CATEGORY_DESCRIPTIONS[cat.key] || `Explore our ${cat.label} offerings. We deliver complex, production-grade systems with zero handoffs.`,
                image: cat.image?.asset?.url,
            };
        }
    });

    // Map services data and group by category
    const servicesByCategory: Record<string, any[]> = {};

    // Initialize all categories from categoryMap
    Object.keys(categoryMap).forEach((category) => {
        servicesByCategory[category] = [];
    });

    // Group services by category
    if (allServices && allServices.length > 0) {
        allServices.forEach((service: any, _index: number) => {
            const category = service.category || "cloud-services";
            if (!servicesByCategory[category]) {
                servicesByCategory[category] = [];
            }
            servicesByCategory[category].push({
                id: service._id || service.slug,
                number: String(servicesByCategory[category].length + 1).padStart(2, "0"),
                title: service.title,
                description: service.heroSubheadline || service.metaDescription,
                outcome: "",
                href: `/services/${service.slug}`,
            });
        });
    } else {
        // Use fallback services if no Sanity services
        FALLBACK_SERVICES.forEach((service, index) => {
            // Map fallback services to categories (you may need to adjust this)
            const category = "cloud-services"; // Default category for fallback
            if (!servicesByCategory[category]) {
                servicesByCategory[category] = [];
            }
            servicesByCategory[category].push({
                ...service,
                id: service.href || `fallback-${index}`,
                number: String(servicesByCategory[category].length + 1).padStart(2, "0"),
            });
        });
    }

    return (
        <>
            <PageHero
                // label="Our Services"
                title="Services"
                description="Full-stack execution services across cloud transformation, AI platforms, digital product engineering, and core system modernization. We don't just advise. We execute."
                image="/images/service-hero.png"
                parallaxSpeed={-0.4}
                titleClassName="!font-metrophobic font-bold text-4xl md:text-9xl leading-tight tracking-tighter text-secondary-900 dark:text-secondary-100 mb-6"
            />
            <div className="bg-gray-50 dark:bg-dark">
                {Object.entries(categoryMap).map(([categoryKey, category], index, array) => {
                    const categoryServices = servicesByCategory[categoryKey] || [];
                    
                    // Skip empty categories
                    if (categoryServices.length === 0) return null;

                    const isLast = index === array.length - 1;

                    return (
                        <CategoryServicesSection
                            key={categoryKey}
                            categoryKey={categoryKey}
                            categoryLabel={category.label}
                            services={categoryServices}
                            isLast={isLast}
                            image={category.image}
                            description={category.description}
                            index={index}
                        />
                    );
                })}
            </div>
            <ContactCTA
                title="Ready to execute?"
                description="Stop talking about transformation. Start executing it. We're ready to build. Let's start the conversation."
                ctaLabel="Start the Conversation"
            />
        </>
    );
}

