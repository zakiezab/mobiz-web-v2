'use client'

import { useState, useRef, useEffect } from 'react';
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '../ui/Button';

type CaseStudyCard = {
  _id: string;
  slug: string;
  title?: string;
  kicker?: string;
  metricLarge?: string;
  metricContext?: string;
  industry?: string;
  executionType?: string;
  featuredImage?: {
    asset?: {
      url?: string;
      altText?: string;
    };
  };
};

interface CaseStudiesListProps {
  caseStudies: CaseStudyCard[];
}

const CATEGORY_OPTIONS = [
  { value: 'all', label: 'All' },
  { value: 'financial', label: 'Financial Services' },
  { value: 'healthcare', label: 'Healthcare' },
  { value: 'manufacturing', label: 'Manufacturing' },
  { value: 'energy', label: 'Energy' },
  { value: 'retail', label: 'Retail' },
  { value: 'cloud', label: 'Cloud Transformation' },
  { value: 'ai-data', label: 'AI & Data' },
  { value: 'digital-product', label: 'Digital Product' },
  { value: 'core-systems', label: 'Core Systems' },
];

export function CaseStudiesList({ caseStudies }: CaseStudiesListProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftChevron, setShowLeftChevron] = useState(false);
  const [showRightChevron, setShowRightChevron] = useState(false);

  // Check scroll position and update chevron visibility
  const checkScrollPosition = () => {
    if (!scrollContainerRef.current) return;

    const container = scrollContainerRef.current;
    const { scrollLeft, scrollWidth, clientWidth } = container;

    setShowLeftChevron(scrollLeft > 0);
    setShowRightChevron(scrollLeft < scrollWidth - clientWidth - 1);
  };

  useEffect(() => {
    checkScrollPosition();
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', checkScrollPosition);
      window.addEventListener('resize', checkScrollPosition);

      // Initial check after a brief delay to ensure DOM is ready
      const timeoutId = setTimeout(checkScrollPosition, 100);

      return () => {
        container.removeEventListener('scroll', checkScrollPosition);
        window.removeEventListener('resize', checkScrollPosition);
        clearTimeout(timeoutId);
      };
    }
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollContainerRef.current) return;

    const container = scrollContainerRef.current;
    const scrollAmount = 300; // pixels to scroll

    container.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  const filteredCaseStudies = caseStudies.filter((study) => {
    if (selectedCategory === 'all') return true;

    // Check if category matches industry
    if (study.industry === selectedCategory) return true;

    // Check if category matches execution type
    if (study.executionType === selectedCategory) return true;

    return false;
  });

  return (
    <>
      {/* Category Filter */}
      {caseStudies.length > 0 && (
        <div className="mb-8 md:mb-12 relative">
          {/* Left Gradient Overlay */}
          {showLeftChevron && (
            <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-gray-50 dark:from-dark to-transparent z-10 pointer-events-none" />
          )}

          {/* Right Gradient Overlay */}
          {showRightChevron && (
            <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-gray-50 dark:from-dark to-transparent z-10 pointer-events-none" />
          )}

          {/* Left Chevron */}
          {showLeftChevron && (
            <button
              onClick={() => scroll('left')}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-20 p-2 bg-white dark:bg-secondary-800 rounded-full shadow-lg hover:shadow-xl transition-shadow border border-gray-200 dark:border-secondary-700"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-5 h-5 text-gray-700 dark:text-secondary-200" />
            </button>
          )}

          {/* Right Chevron */}
          {showRightChevron && (
            <button
              onClick={() => scroll('right')}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-20 p-2 bg-white dark:bg-secondary-800 rounded-full shadow-lg hover:shadow-xl transition-shadow border border-gray-200 dark:border-secondary-700"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-5 h-5 text-gray-700 dark:text-secondary-200" />
            </button>
          )}

          {/* Scrollable Container */}
          <div
            ref={scrollContainerRef}
            className="overflow-x-auto scroll-smooth scrollbar-thin"
          >
            <div className="flex gap-3 md:gap-2 pb-0 px-12">
              {CATEGORY_OPTIONS.map((category) => {
                const isActive = selectedCategory === category.value;
                return (
                  <Button
                    key={category.value}
                    onClick={() => setSelectedCategory(category.value)}
                    className={`flex-shrink-0 px-4 md:px-6 py-2 md:py-3 text-sm md:text-sm transition-all duration-300 border ${isActive
                        ? 'bg-primary text-gray-50 border-primary-300'
                        : 'bg-transparent hover:bg-primary/20 !text-gray-600 dark:!text-secondary-300 hover:text-gray-900 dark:hover:text-secondary-100 border-none'
                      }`}
                  >
                    {category.label}
                  </Button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Results Count */}
      {caseStudies.length > 0 && (
        <div className="mb-8">
          <p className="text-sm font-light text-gray-600 dark:text-secondary-300">
            Showing {filteredCaseStudies.length} of {caseStudies.length}{" "}
            {filteredCaseStudies.length === 1 ? "case study" : "case studies"}
          </p>
        </div>
      )}

      {/* Case Studies Grid */}
      {filteredCaseStudies.length === 0 ? (
        <div className="max-w-3xl mx-auto text-center py-12">
          <p className="text-xl font-light text-gray-600 dark:text-secondary-200 mb-4">
            No case studies found matching the selected category.
          </p>
          <button
            onClick={() => setSelectedCategory('all')}
            className="text-primary dark:text-primary-100 hover:underline transition-colors"
          >
            Clear filter
          </button>
        </div>
      ) : (
        <div className="grid gap-4 md:gap-6 md:grid-cols-2 p-2">
          {filteredCaseStudies.map((study) => (
            <Link
              key={study._id}
              href={`/case-studies/${study.slug}`}
              className="group flex flex-col hover:bg-white dark:hover:bg-white/5 border border-gray-200 dark:border-secondary-800 p-6 hover:scale-105 hover:shadow-xl rounded-3xl transition-all duration-300"
            >
              {study.featuredImage?.asset?.url && (
                <div className="relative aspect-[16/9] overflow-hidden rounded-lg bg-gray-100 dark:bg-secondary-700 mb-4">
                  <Image
                    src={study.featuredImage.asset.url}
                    alt={study.featuredImage.asset.altText || study.title || "Case study"}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(min-width: 1024px) 480px, 100vw"
                  />
                </div>
              )}
              <div className="space-y-3 flex-grow flex flex-row justify-between ">
                <div className="w-full h-full">
                  {study.kicker && (
                    <div className="text-sm font-semibold uppercase tracking-wider text-primary">
                      {study.kicker}
                    </div>
                  )}
                  <h2 className="!font-metrophobic text-gray-900 dark:text-secondary-100 text-2xl md:text-3xl leading-tight tracking-tighter mb-4">
                    {study.title}
                  </h2>
                </div>
                <div className="w-full flex flex-col h-full items-end justify-between text-right !mt-0">
                  <div>
                  {study.metricLarge && (
                    <div className="!font-metrophobic text-4xl font-normal text-primary dark:text-primary-100">
                      {study.metricLarge}
                    </div>
                  )}
                  {study.metricContext && (
                    <p className="text-base md:text-base font-light leading-relaxed text-gray-500 dark:text-secondary-300 max-w-prose">
                      {study.metricContext}
                    </p>
                  )}
                  </div>
                  <Button variant="ghost" className="w-fit flex gap-2 !p-1 text-gray-500 dark:!text-secondary-200 group-hover:!text-primary group-hover:!bg-transparent transition-all duration-300">
                    View case study <ArrowRight className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </>
  );
}

