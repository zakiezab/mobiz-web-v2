interface EngagementModel {
  title: string;
  summary: string;
  pillars?: string[];
  ctaLabel?: string;
}

interface EngagementModelsProps {
  title?: string;
  description?: string;
  models?: EngagementModel[];
}

const DEFAULT_MODELS: EngagementModel[] = [
  {
    title: "End-to-End Transformation",
    summary:
      "Complete ownership from architecture to production. We design, build, and deploy mission-critical systems with zero handoffs.",
    pillars: [
      "Strategy & Architecture",
      "Full-Stack Development",
      "Production Deployment",
      "Post-Launch Support",
    ],
  },
  {
    title: "Strategic Acceleration",
    summary:
      "Fast-track critical initiatives with embedded senior leadership. We bring strategy, architecture, and execution velocity.",
    pillars: [
      "Executive Partnership",
      "Technical Architecture",
      "Velocity Engineering",
      "Risk Mitigation",
    ],
  },
  {
    title: "Capability Build",
    summary:
      "Build specific capabilities within your organization. We deliver production systems while transferring knowledge.",
    pillars: [
      "Targeted Capabilities",
      "Knowledge Transfer",
      "Production Delivery",
      "Team Enablement",
    ],
  },
  {
    title: "Embedded Execution Partner",
    summary:
      "Integrated into your technology team. We operate as an extension of your organization with full accountability.",
    pillars: [
      "Team Integration",
      "Continuous Delivery",
      "Operational Excellence",
      "Shared Accountability",
    ],
  },
];

export function EngagementModels({
  title = "Engagement Models",
  description,
  models = DEFAULT_MODELS,
}: EngagementModelsProps) {
  return (
    <section className="bg-gray-50 py-40">
      <div className="mx-auto w-full max-w-container px-20">
        <div className="max-w-900 mb-20">
          <h2 className="text-4xl font-extralight leading-tight tracking-tighter text-dark mb-6">
            {title}
          </h2>
          {description && (
            <p className="text-xl font-light leading-relaxed text-gray-600">
              {description}
            </p>
          )}
        </div>
        <div className="grid gap-12 md:grid-cols-2">
          {models.map((model, index) => (
            <div
              key={index}
              className="bg-white p-10 rounded-lg space-y-6 hover:shadow-lg transition-shadow"
            >
              <h3 className="text-2xl font-medium text-dark">{model.title}</h3>
              <p className="text-base font-light leading-relaxed text-gray-600">
                {model.summary}
              </p>
              {model.pillars && model.pillars.length > 0 && (
                <ul className="space-y-2 pt-4 border-t border-gray-200">
                  {model.pillars.map((pillar, pillarIndex) => (
                    <li
                      key={pillarIndex}
                      className="text-sm font-light text-gray-700 flex items-start"
                    >
                      <span className="text-primary mr-2">→</span>
                      {pillar}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
