import Link from "next/link";
import type { ReactNode } from "react";

interface ServiceItem {
  id?: string;
  number: string;
  title: string;
  description: string;
  outcome: string;
  href?: string;
}

interface ServicesGridProps {
  id?: string;
  label: string;
  title: ReactNode;
  description: string;
  services: ServiceItem[];
}

export function ServicesGrid({
  id,
  label: _label,
  title: _title,
  description: _description,
  services,
}: ServicesGridProps) {
  return (
    <section id={id} className="bg-secondary-200 dark:bg-secondary-800 py-4 md:py-12">
      <div className="mx-auto w-full max-w-container px-4 md:px-16 2xl:px-6">
        {/* {showHeader && (
          <div className="mb-12 md:mb-20">
            <SectionHeader
              label={label}
              title={title}
              description={description}
              align="right"
            />
          </div>
        )} */}
        <div className="grid gap-16 md:gap-20 md:grid-cols-2 p-4">
          {services.map((service, index) => {
            // Use id, href, or fallback to title + index for unique key
            const uniqueKey = service.id || service.href || `${service.title}-${index}`;
            
            const content = (
              <>
                <div className="w-8 h-8 md:w-12 md:h-12 bg-primary-300/20 border border-primary-300 rounded-xl md:rounded-xl flex items-center justify-center text-sm md:text-xl !font-metrophobic text-primary dark:text-primary-100">
                  {service.number}
                </div>
                <div className="space-y-3">
                  <h3 className="!font-metrophobic text-gray-900 dark:text-secondary-100 text-2xl md:text-3xl leading-tight tracking-tighter mb-4">
                    {service.title}
                  </h3>
                  {service.description && (
                    <p className="text-base md:text-xl font-light leading-relaxed text-gray-500 dark:text-secondary-300 max-w-prose">
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

            if (service.href) {
              return (
                <Link
                  key={uniqueKey}
                  href={service.href}
                  className="grid grid-cols-[auto_1fr] gap-4 md:gap-8 group hover:bg-white dark:hover:bg-white/5 border border-gray-200 dark:border-secondary-800 p-4 -m-6 hover:scale-105 hover:shadow-xl rounded-3xl transition-all duration-300"
                >
                  {content}
                </Link>
              );
            }

            return (
              <div
                key={uniqueKey}
                className="grid grid-cols-[auto_1fr] gap-8"
              >
                {content}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
