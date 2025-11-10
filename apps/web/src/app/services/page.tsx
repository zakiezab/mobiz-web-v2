import { Metadata } from "next";
import { client } from "@/lib/sanity.client";
import { ALL_SERVICES_QUERY } from "@/lib/sanity.queries";
import { STATIC_SERVICES } from "@/lib/static-services";
import { PageHero } from "@/components/sections/PageHero";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { ContactCTA } from "@/components/sections/ContactCTA";
import { ServiceCategoryFilter } from "@/components/sections/ServiceCategoryFilter";

const SERVICES_KEYWORDS = [
    "enterprise services",
    "cloud transformation services",
    "ai data platforms",
    "digital product engineering",
    "core system modernization",
    "azure landing zone",
    "execution partner",
];

// Category labels for display
const CATEGORY_LABELS: Record<string, string> = {
    "cloud-services": "Cloud Services",
    "data-ai": "Data & AI",
    "digital-engineering": "Digital Engineering",
    "modernization": "Modernization",
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

export default async function ServicesPage({
    searchParams,
}: {
    searchParams: Promise<{ category?: string }>;
}) {
    // Fetch all services from Sanity
    let sanityServices: any[] = [];
    try {
        sanityServices = await client.fetch(ALL_SERVICES_QUERY);
    } catch (error) {
        console.warn("Could not fetch services from Sanity:", error);
    }

    // Convert static services to the same format as Sanity services
    const staticServicesArray = Object.values(STATIC_SERVICES).map((service) => ({
        _id: `static-${service.slug}`,
        title: service.title,
        slug: service.slug,
        category: service.category,
        heroHeadline: service.heroHeadline,
        heroSubheadline: service.heroSubheadline,
        metaDescription: service.metaDescription,
    }));

    // Combine Sanity and static services
    const allServices = [...sanityServices, ...staticServicesArray];

    // Await searchParams (Next.js 15+)
    const params = await searchParams;

    // Filter by category if specified (ignore "all" and undefined)
    const selectedCategory = params.category;
    const filteredServices = selectedCategory && selectedCategory !== "all"
        ? allServices.filter(
            (service: any) => service.category === selectedCategory
        )
        : allServices;

    // Map services data to the format expected by ServicesGrid
    const services =
        filteredServices && filteredServices.length > 0
            ? filteredServices.map((service: any, index: number) => ({
                id: service._id || service.slug, // Use _id from Sanity or slug as unique identifier
                number: String(index + 1).padStart(2, "0"),
                title: service.title,
                description: service.heroSubheadline || service.metaDescription,
                outcome: "", // Services from Sanity don't have outcome field yet
                href: `/services/${service.slug}`,
            }))
            : FALLBACK_SERVICES.map((service, index) => ({
                ...service,
                id: service.href || `fallback-${index}`, // Add id to fallback services
            }));

    return (
        <>
            <PageHero
                label="Our Services"
                title="Services"
                description="Full-stack execution services across cloud transformation, AI platforms, digital product engineering, and core system modernization. We don't just advise. We execute."
                image="/images/service-hero.png"
                parallaxSpeed={-0.4}
                titleClassName="!font-metrophobic font-normal text-4xl md:text-9xl leading-tight tracking-tighter text-secondary-900 dark:text-secondary-100 mb-6"
            />
            <div className="bg-secondary-100 dark:bg-dark">
                <ServiceCategoryFilter />
                <ServicesGrid
                    label={
                        selectedCategory && selectedCategory !== "all" && CATEGORY_LABELS[selectedCategory]
                            ? CATEGORY_LABELS[selectedCategory]
                            : "Full-Stack Execution"
                    }
                    title="Services That Deliver"
                    description={
                        selectedCategory && selectedCategory !== "all" && CATEGORY_LABELS[selectedCategory]
                            ? `Explore our ${CATEGORY_LABELS[selectedCategory]} offerings. We deliver complex, production-grade systems with zero handoffs.`
                            : "Our model is not theoretical. We deliver complex, production-grade systems across four core execution pillars."
                    }
                    services={services}
                />
            </div>
            <ContactCTA
                title="Ready to execute?"
                description="Stop talking about transformation. Start executing it. We're ready to build. Let's start the conversation."
                ctaLabel="Start the Conversation"
            />
        </>
    );
}

