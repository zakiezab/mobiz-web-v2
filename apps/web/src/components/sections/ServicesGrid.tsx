import Link from "next/link";
import type { ReactNode } from "react";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { TrendingUp } from "lucide-react";

interface ServiceItem {
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
  label,
  title,
  description,
  services,
}: ServicesGridProps) {
  return (
    <section id={id} className="bg-white dark:bg-dark py-40">
      <div className="mx-auto w-full max-w-container px-4 md:px-16 2xl:px-6">
        <div className="flex justify-end">
          <div className="max-w-900 mb-20">
            <SectionHeader
              label={label}
              title={title}
              description={description}
              align="right"
            />
          </div>
        </div>
        <div className="grid gap-8 md:gap-20 md:grid-cols-2">
          {services.map((service) => {
            const content = (
              <>
                <div className="w-12 h-12 md:w-20 md:h-20 bg-primary-300/20 border border-primary-300 rounded-2xl md:rounded-3xl flex items-center justify-center text-xl md:text-2xl !font-metrophobic text-primary dark:text-primary-100">
                  {service.number}
                </div>
                <div className="space-y-3">
                  <h3 className="!font-metrophobic text-gray-900 dark:text-secondary-100 text-3xl md:text-4xl leading-tight tracking-tighter mb-6">
                    {service.title}
                  </h3>
                  <p className="text-base md:text-xl font-light leading-relaxed text-gray-700 dark:text-secondary-100 max-w-prose">
                    {service.description}
                  </p>
                  <p className="flex items-center gap-2 mt-3 text-base md:text-xl text-primary">
                    {service.outcome}
                    <TrendingUp className="w-5 h-5" />
                  </p>
                </div>
              </>
            );

            if (service.href) {
              return (
                <Link
                  key={service.title}
                  href={service.href}
                  className="grid grid-cols-[auto_1fr] gap-8 group hover:bg-gray-50 dark:hover:bg-white/5 p-6 -m-6 rounded-lg transition-all"
                >
                  {content}
                </Link>
              );
            }

            return (
              <div
                key={service.title}
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
