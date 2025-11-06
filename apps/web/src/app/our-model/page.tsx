import type { Metadata } from "next";

import { PageHero } from "@/components/sections/PageHero";
import { Timeline } from "@/components/sections/Timeline";
import { PrincipleGrid } from "@/components/sections/PrincipleGrid";
import { ContactCTA } from "@/components/sections/ContactCTA";
import { getEngagementModels } from "@/lib/services";

export const metadata: Metadata = {
  title: "Closing the Accountability Gap | The Mobiz Execution Model",
  description:
    "Discover how Mobiz eliminates the accountability gap with a production-first execution model built on clarity, velocity, and certainty.",
  keywords: [
    "accountability gap",
    "execution partner",
    "mobiz model",
    "consulting accountability gap",
    "strategy to production",
  ],
};

const TIMELINE_ITEMS = [
  {
    number: "01",
    phase: "Phase 01",
    title: "Clarity: Strategic Architecture",
    description:
      'We start by defining the "physics" of the problem. We build a technology-agnostic architecture and an execution roadmap designed for your specific reality, constraints, and business case.',
    deliverables: [
      { title: "First-Principles Architecture" },
      { title: "Technology-Agnostic Roadmap" },
      { title: "Production Roadmap" },
      { title: "Fixed-Scope Business Case" },
    ],
  },
  {
    number: "02",
    phase: "Phase 02",
    title: "Velocity: Full-Stack Execution",
    description:
      "The team that designed the architecture begins building. We eliminate the friction of handoffs. We run parallel workstreams across infrastructure, data, and applications to deliver value with velocity.",
    deliverables: [
      { title: "Production-Ready Code" },
      { title: "System & Data Integration" },
      { title: "CI/CD & DevOps Automation" },
      { title: "Continuous Validation" },
    ],
  },
  {
    number: "03",
    phase: "Phase 03",
    title: "Certainty: Production Deployment",
    description:
      'We manage the "last mile" that others ignore. We own the deployment, data migration, and security validation. Our work is not done until your system is live and operating at scale.',
    deliverables: [
      { title: "Zero-Downtime Deployment" },
      { title: "Data Migration & Validation" },
      { title: "Security & Pen Testing" },
      { title: "Performance Tuning" },
    ],
  },
  {
    number: "04",
    phase: "Phase 04",
    title: "Scale: Guaranteed Outcome",
    description:
      "We validate the outcome against the original business case. We optimize for scale and enable your teams to own the new platform, ensuring the transformation is sustainable.",
    deliverables: [
      { title: "Production @ Scale" },
      { title: "Team Enablement & Handoff" },
      { title: "FinOps & Cost Optimization" },
      { title: "ROI & Business Case Validation" },
    ],
  },
];

const PRINCIPLES = [
  {
    title: "Zero Handoffs",
    description:
      "The senior team that architects the solution is the senior team that builds it. No knowledge loss. No excuses. 100% accountability.",
  },
  {
    title: "Technology Agnostic",
    description:
      "Our recommendations are based on first principles and your reality, not partner quotas. We build what works.",
  },
  {
    title: "Velocity over Volume",
    description:
      "We deploy small, senior teams who compress timelines. We measure progress in production code, not billable hours.",
  },
  {
    title: "Outcome Guaranteed",
    description:
      "We are not a staff augmentation firm. We commit to a fixed-scope outcome, and we deliver it. Our success is your production system.",
  },
  {
    title: "Full-Stack Ownership",
    description:
      "From the C-Suite presentation to the codebase commit. We operate and are accountable at every layer of the stack.",
  },
  {
    title: "Built for Reality",
    description:
      "We build solutions that navigate your real-world constraints: legacy tech, compliance, politics, and budgets.",
  },
];

export const revalidate = 3600; // ISR every hour

export default async function OurModelPage() {
  // For now, keeping static data as timeline and principles are more structured than current schema
  // In future, we could extend the schema to include timeline items and principles
  const engagementModels = await getEngagementModels();
  const primaryModel = engagementModels[0];
  const contactCtaLabel = primaryModel?.ctaLabel ?? "Start the Conversation";

  return (
    <>
      <PageHero
        label="Our Model"
        title={
          <span>
            The Path to <strong>Production.</strong>
          </span>
        }
        description={
          primaryModel?.summary ??
          "We close the accountability gap with a single, integrated model that owns the outcome from architecture to production. No handoffs. No excuses. Just a guaranteed result."
        }
      />
      <Timeline
        label="One Team. One Outcome."
        title="How we turn strategy into a production system."
        items={TIMELINE_ITEMS}
      />
      <PrincipleGrid
        label="How We Execute"
        title="Our execution principles."
        principles={PRINCIPLES}
      />
      <ContactCTA
        title="An Outcome, Not an Opinion."
        description="Stop buying recommendations. Start delivering results. We're ready to build."
        ctaLabel={contactCtaLabel}
      />
    </>
  );
}
