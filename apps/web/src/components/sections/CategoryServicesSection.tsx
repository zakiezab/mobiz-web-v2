'use client'

import { TextAnimate } from "@/registry/magicui/text-animate";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Button } from "../ui/Button";

interface ServiceItem {
  id?: string;
  number: string;
  title: string;
  description: string;
  outcome: string;
  href?: string;
}

interface CategoryServicesSectionProps {
  categoryKey: string;
  categoryLabel: string;
  services: ServiceItem[];
  isLast: boolean;
  image?: string;
  description?: string;
  index: number;
}

export function CategoryServicesSection({
  categoryKey,
  categoryLabel,
  services,
  isLast: _isLast,
  image,
  description,
  index,
}: CategoryServicesSectionProps) {
  // Alternating background colors
  // Light mode: gray-50 (even) / white (odd)
  // Dark mode: secondary-900 (even) / dark (odd)
  const isEven = index % 2 === 0;
  const bgColor = isEven
    ? 'bg-gray-50 dark:bg-dark'
    : 'bg-secondary-100 dark:bg-secondary-900';
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const [titleOpacity, setTitleOpacity] = useState(1);
  const [titleTranslateY, setTitleTranslateY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current || !titleRef.current) return;

      const section = sectionRef.current;
      const rect = section.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Calculate scroll progress within the section
      // When section is at top of viewport: progress = 0
      // When section top has scrolled up by viewport height: progress = 1
      const sectionTop = rect.top;
      const scrollProgress = Math.max(0, Math.min(1, -sectionTop / windowHeight));

      // Title scrolls up and fades out as we scroll through the section
      // At progress 0: title is visible at bottom (translateY = 0, opacity = 1)
      // At progress 1: title is scrolled out at top (translateY = -100%, opacity = 0)
      const translateY = scrollProgress * -100;
      const opacity = 1 - scrollProgress;

      setTitleTranslateY(translateY);
      setTitleOpacity(opacity);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial calculation

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      key={categoryKey}
      className={`flex flex-col md:flex-row ${bgColor} snap-start`}
    >
      <div className="mx-auto w-full max-w-container px-4 md:px-16 2xl:px-6 py-12 md:py-24 flex-1 flex flex-col md:flex-row md:items-center gap-8 md:gap-12 lg:gap-16 relative border-b border-secondary-200 dark:border-gray-50/10">
        {/* Category Image and Title - Left side on desktop, top on mobile, scrolls up */}
        <div
          ref={titleRef}
          className="flex flex-col md:left-16 2xl:left-6 md:bottom-16 pb-8 md:pb-16 flex-shrink-0 z-10 transition-opacity duration-300 w-full md:w-auto"
          style={{
            transform: `translateY(${titleTranslateY}%)`,
            opacity: titleOpacity,
            willChange: 'transform, opacity',
          }}
        >
          <div className="w-full md:max-w-lg space-y-4 md:space-y-2">
            {/* Category Title and Description */}
            <div>
              <TextAnimate
                animation="blurIn"
                className={`section-title || ''}`}
                scrollBased={true}
                blurAmount={15}
              >
                {/* Category Image */}
                {image && (
                  <div className="relative w-full max-w-[200px] md:max-w-[300px] aspect-square rounded-lg overflow-hidden">
                    <Image
                      src={image}
                      alt={categoryLabel}
                      fill
                      className="object-contain"
                      sizes="(max-width: 768px) 200px, 300px"
                    />
                  </div>
                )}
                <h2 className="!font-metrophobic text-3xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tighter text-gray-900 dark:text-secondary-100 mb-4">
                  {categoryLabel}
                </h2>
                {description && (
                  <p className="text-base md:text-lg lg:text-xl font-light leading-tight tracking-wide text-gray-600 dark:text-secondary-300">
                    {description}
                  </p>
                )}
              </TextAnimate>
            </div>
          </div>
        </div>

        {/* Service Cards - Right side on desktop, below title on mobile */}
        <div className="w-full md:w-1/2 md:ml-auto">
          <div
            className="md:sticky md:top-16 md:max-h-[calc(100vh-6rem)] w-full overflow-y-auto scrollbar-hide pb-4"
          >
            <div className="flex flex-col gap-4 md:gap-6 lg:gap-8">
              {services.map((service, index) => {
                const uniqueKey = service.id || service.href || `${service.title}-${index}`;

                const content = (
                  <>
                    {/* <div className="w-8 h-8 md:w-12 md:h-12 bg-primary-300/20 border border-primary-300 rounded-xl md:rounded-xl flex items-center justify-center text-sm md:text-xl !font-metrophobic text-primary dark:text-primary-100 flex-shrink-0">
                      {service.number}
                    </div> */}
                    <div className="space-y-4 md:space-y-2 min-w-0">
                      <h3 className="!font-metrophobic text-gray-900 dark:text-secondary-100 text-xl md:text-2xl lg:text-3xl leading-tight tracking-tighter">
                        {service.title}
                      </h3>
                      {service.description && (
                        <p className="text-sm md:text-base lg:text-xl font-light leading-relaxed text-gray-500 dark:text-secondary-300 max-w-prose">
                          {service.description}
                        </p>
                      )}
                      {service.outcome && (
                        <p className="flex items-center gap-2 mt-2 md:mt-3 text-sm md:text-base lg:text-xl text-primary dark:text-primary-100">
                          {service.outcome}
                        </p>
                      )}
                      <div className="w-full flex items-center justify-end">
                        <Button className="!px-3 py-2 flex items-center justify-center bg-transparent group-hover:bg-primary transition-colors duration-300"><ArrowRight className="w-5 h-5" /></Button>
                      </div>
                    </div>
                  </>
                );

                return (
                  <Link
                    key={uniqueKey}
                    href={service.href || "#"}
                    className="w-full grid grid-cols-1 gap-4 md:gap-8 group bg-white dark:bg-secondary-800/50 hover:bg-white dark:hover:bg-white/5 border border-gray-200 dark:border-secondary-800 p-4 md:p-6 lg:p-8 rounded-2xl md:rounded-3xl transition-all duration-300"
                  >
                    {content}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

