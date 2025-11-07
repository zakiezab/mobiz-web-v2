import { Metadata } from "next";
import { client } from "@/lib/sanity.client";
import { HOMEPAGE_QUERY } from "@/lib/sanity.queries";
import { AccountabilityGap } from "@/components/sections/AccountabilityGap";
import { ContactCTA } from "@/components/sections/ContactCTA";
import { DeliveredValue } from "@/components/sections/DeliveredValue";
import { Hero } from "@/components/sections/Hero";
import { IndustriesShowcase } from "@/components/sections/IndustriesShowcase";
import { ModelGrid } from "@/components/sections/ModelGrid";
import { PartnersBar } from "@/components/sections/PartnersBar";
import { RecognitionBar } from "@/components/sections/RecognitionBar";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { StatsBar } from "@/components/sections/StatsBar";
import Image from "next/image";

const HOMEPAGE_KEYWORDS = [
  "execution partner",
  "accountability gap",
  "enterprise technology execution",
  "azure implementation partner",
  "mobiz execution model",
];

// Fallback data for resilience
const FALLBACK_DATA = {
  heroMetrics: [
    { value: "100%", label: "Accountability" },
    { value: "$2B+", label: "Value Delivered" },
    { value: "120+", label: "Handoffs" },
  ],
  statsItems: [
    { label: "Cloud Transformation", image: "/images/icons/ico-cloud2.png" },
    { label: "AI/ML Platforms", image: "/images/icons/ico-ai.png" },
    { label: "Digital Product Engineering", image: "/images/icons/ico-edit.png" },
    { label: "Core System Modernization", image: "/images/icons/ico-system2.png" },
  ],
  accountabilityGapTitle: "The Accountability Gap",
  accountabilityGapBody:
    "Traditional consulting is broken. Strategy firms deliver PowerPoints, then leave. System integrators deliver billable hours, but not the outcome. This creates an accountability gap where transformation fails. We close that gap.",
  modelItems: [
    {
      number: "01",
      title: "Clarity & Architecture",
      description:
        "We define the first-principles architecture and production roadmap. Technology-agnostic, built for your reality.",
    },
    {
      number: "02",
      title: "Velocity & Execution",
      description:
        "The team that designed it, builds it. We write the code, migrate the data, and integrate the systems.",
    },
    {
      number: "03",
      title: "Certainty & Deployment",
      description:
        'We own the "last mile" that others ignore. We\'re not done until you are live, stable, and scaled.',
    },
  ],
  deliveredStories: [
    {
      client: "Global Financial Services",
      metricValue: "2,000+",
      metricContext: "apps migrated",
      description:
        "Zero-downtime cloud transformation. $47M in savings. Designed, built, and deployed by one team.",
    },
    {
      client: "Sanofi (Featured by Microsoft)",
      metricValue: "6",
      metricContext: "months: concept to production",
      description:
        "AI platform for R&D, featured by Microsoft for its impact. Built and scaled by our team.",
      videoLink: {
        href: "#",
        label: "Watch the Microsoft Case Study",
      },
    },
    {
      client: "Global Manufacturer",
      metricValue: "140",
      metricContext: "facilities connected",
      description:
        "Smart factory platform, built and deployed globally. 87% gain in production efficiency.",
    },
  ],
  recognitionItems: [
    {
      label: "Clients",
      title: "30+ Fortune 500",
      source: "Execution Partners",
    },
    { label: "Value", title: "$2B+ Delivered", source: "In Production Value" },
    {
      label: "Velocity",
      title: "6-12 Months",
      source: "Strategy to Production",
    },
  ],
  services: [
    {
      number: "01",
      title: "Cloud Transformation",
      description:
        "Complete migrations, modernization, and cloud-native architecture executed with zero disruption.",
      outcome: "Outcome: 40% cost reduction",
    },
    {
      number: "02",
      title: "AI & Data Platforms",
      description:
        "From data architecture to production-grade models that turn your data into competitive advantage.",
      outcome: "Outcome: 3-6 month deployment",
    },
    {
      number: "03",
      title: "Digital Product Engineering",
      description:
        "Mission-critical customer experiences, platforms, and APIs engineered for enterprise performance.",
      outcome: "utcome: 2.3x faster time-to-market",
    },
    {
      number: "04",
      title: "Core System Modernization",
      description:
        "Replacing high-risk legacy systems and managing the complexity of ERP and SCM migrations end-to-end.",
      outcome: "→ Outcome: 100% on-time, on-budget",
    },
  ],
  partners: [
    { name: "Microsoft", color: "#0067B8", image: "/logo/microsoft.png" },
    { name: "AWS", color: "#FF9900", image: "/logo/aws.svg" },
    { name: "Google Cloud", color: "#4285F4", image: "/logo/googlecloud2.svg" },
    { name: "Databricks", color: "#FF3621", image: "/logo/databricks.svg" },
    { name: "Snowflake", color: "#00A1E0", image: "/logo/snowflake.svg" },
  ],
  industries: [
    {
      name: "Financial Services",
      description:
        "Core banking platforms modernized. Trading systems rebuilt. Risk engines deployed.",
    },
    {
      name: "Healthcare",
      description:
        "AI diagnostics operational. Patient platforms launched. Clinical systems integrated.",
    },
    {
      name: "Manufacturing",
      description:
        "Smart factories online. Supply chains digitized. Predictive maintenance running.",
    },
    {
      name: "Energy",
      description:
        "Grid systems modernized. Renewable platforms deployed. Carbon tracking operational.",
    },
    {
      name: "Retail",
      description:
        "Omnichannel platforms built. Inventory systems integrated. Customer experiences live.",
    },
    {
      name: "Government",
      description:
        "Citizen services digitized. Legacy systems replaced. Security frameworks implemented.",
    },
  ],
  contactTitle: "An outcome, not an opinion.",
  contactDescription:
    "Stop talking about transformation. Start executing it. We're ready to build. Let's start the conversation.",
  contactCtaLabel: "Start the Conversation",
};

export async function generateMetadata(): Promise<Metadata> {
  const homepage = await client.fetch(HOMEPAGE_QUERY);

  return {
    title: homepage?.seo?.title || "Mobiz - Strategy, Executed.",
    description:
      homepage?.seo?.description ||
      "We are the execution partner for F500 technology leaders. We don't just advise. We architect, build, and deploy the systems that define your future.",
    keywords: homepage?.seo?.keywords ?? HOMEPAGE_KEYWORDS,
  };
}

export default async function Home() {
  const homepage = await client.fetch(HOMEPAGE_QUERY);

  // Use Sanity data if available, otherwise fallback to hardcoded data
  const data = homepage || FALLBACK_DATA;
  // Force using fallback metrics so local edits reflect immediately
  const heroMetrics = FALLBACK_DATA.heroMetrics;
  const statsItems = FALLBACK_DATA.statsItems;
  const partners = FALLBACK_DATA.partners;
  // const heroMetrics = (homepage?.heroMetrics && homepage.heroMetrics.length > 0)
  //   ? homepage.heroMetrics
  //   : FALLBACK_DATA.heroMetrics;

  return (
    <>
      <Hero
        label="Strategy, Executed!"
        title="Strategy is speculation."
        highlight="Execution is truth."
        description="We are the execution partner for F500 technology leaders. We don't just advise. We architect, build, and deploy the systems that define your future."
        cta={{ label: "Start the Conversation", href: "#contact" }}
        metrics={heroMetrics}
      />
      {/* Spacer to push content below hero viewport */}
      <div className="relative z-0 h-dvh pointer-events-none" />
      <div className="relative z-10">
        {/* Gradient transition section - scrolls normally with page */}
        <div className="h-[400px] w-full bg-gradient-to-t from-white via-white/80 to-transparent dark:from-dark dark:via-dark/80 dark:to-transparent" />
        <div className="relative bg-white dark:bg-dark">
          <div className="absolute top-44 right-[-30%] motion-reduce:animate-pulse z-0 pointer-events-none">
            <Image
              src="/images/element01.png"
              alt="mobiz element"
              width={1367}
              height={1655}
              className="opacity-100"
            />
          </div>
          <div className="absolute bottom-[-30%] left-[-40%] -rotate-180 z-0 pointer-events-none">
            <Image
              src="/images/element01.png"
              alt="mobiz element"
              width={1367}
              height={1655}
              className="opacity-50"
            />
          </div>
          <div className="relative z-10">
            <StatsBar label="Currently Executing" items={statsItems} />
            <AccountabilityGap
              title={data.accountabilityGapTitle}
              body={data.accountabilityGapBody}
            />
            <ModelGrid
              id="model"
              label="Our Model"
              title="One Team. One Outcome."
              description="Our model eliminates the friction of handoffs. The team that designs your architecture is the team that builds your production system."
              items={data.modelItems}
            />
          </div>
        </div>
        <DeliveredValue
          id="delivered"
          label="Proof, Not Promises"
          title="Delivered Value."
          stories={data.deliveredStories}
        />
        <RecognitionBar items={data.recognitionItems} />
        <ServicesGrid
          id="services"
          label="Full-Stack Execution"
          title={
            <>
              We don't recommend.
              <br />
              We Execute.
            </>
          }
          description="Our model is not theoretical. We deliver complex, production-grade systems across four core execution pillars."
          services={data.services}
        />
        <PartnersBar
          label="Technology-Agnostic, Ecosystem-Deep"
          partners={partners}
        />
        <IndustriesShowcase
          id="industries-showcase"
          label="Industries We Execute In"
          title="Industries we're Transforming"
          description="Deep domain expertise is non-negotiable for execution. We build solutions that understand the physics of your industry."
          industries={data.industries}
        />
        {/* <IndustriesGrid
          id="industries"
          label="Industries We Execute In"
          title="Industries We're Transforming"
          description="Deep domain expertise is non-negotiable for execution. We build solutions that understand the physics of your industry."
          industries={data.industries}
        /> */}
        <ContactCTA
          title={
            <>
              An outcome,
              <br />
              not an opinion.
            </>
          }
          description={data.contactDescription}
          ctaLabel={data.contactCtaLabel}
        />
      </div>
    </>
  );
}
