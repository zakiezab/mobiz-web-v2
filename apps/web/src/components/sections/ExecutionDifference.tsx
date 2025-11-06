import Link from "next/link";

interface DifferenceItem {
  title: string;
  description: string;
  link?: {
    href: string;
    label: string;
  };
}

interface ExecutionDifferenceProps {
  title?: string;
  items?: DifferenceItem[];
}

const DEFAULT_ITEMS: DifferenceItem[] = [
  {
    title: "Zero Handoffs",
    description: "The Team That Designs, Builds",
  },
  {
    title: "Technology Agnostic",
    description: "Built on First Principles",
    link: {
      href: "/technology-partners",
      label: "View Our Partners",
    },
  },
  {
    title: "Outcome Guaranteed",
    description: "Finished in Production, Not PowerPoint",
  },
];

export function ExecutionDifference({
  title = "The Execution Difference",
  items = DEFAULT_ITEMS,
}: ExecutionDifferenceProps) {
  return (
    <section className="bg-white py-40">
      <div className="mx-auto w-full max-w-container px-20">
        <div className="max-w-900 mb-20">
          <h2 className="text-4xl font-extralight leading-tight tracking-tighter text-dark">
            {title}
          </h2>
        </div>
        <div className="grid gap-16 md:grid-cols-3">
          {items.map((item, index) => (
            <div key={index} className="space-y-4">
              <h3 className="text-2xl font-medium text-dark">{item.title}</h3>
              <p className="text-lg font-light leading-relaxed text-gray-600">
                {item.description}
              </p>
              {item.link && (
                <Link
                  href={item.link.href}
                  className="inline-block text-sm font-medium text-primary hover:text-secondary transition-colors border-b border-primary hover:border-secondary pt-2"
                >
                  {item.link.label} →
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
