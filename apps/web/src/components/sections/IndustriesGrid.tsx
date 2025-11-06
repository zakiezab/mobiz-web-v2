import { SectionHeader } from "@/components/sections/SectionHeader";

interface IndustryItem {
  name: string;
  description: string;
}

interface IndustriesGridProps {
  id?: string;
  label: string;
  title: string;
  description: string;
  industries: IndustryItem[];
}

export function IndustriesGrid({
  id,
  label,
  title,
  description,
  industries,
}: IndustriesGridProps) {
  return (
    <section id={id} className="bg-white py-40">
      <div className="mx-auto w-full max-w-container px-20">
        <div className="max-w-900 mb-20">
          <SectionHeader
            label={label}
            title={title}
            description={description}
          />
        </div>
        <div className="grid gap-16 md:grid-cols-3">
          {industries.map((industry) => (
            <div
              key={industry.name}
              className="p-8 bg-gray-50 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_32px_rgba(0,0,0,0.06)]"
            >
              <h4 className="text-lg font-medium text-dark mb-3">
                {industry.name}
              </h4>
              <p className="text-sm font-light leading-relaxed text-gray-600">
                {industry.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
