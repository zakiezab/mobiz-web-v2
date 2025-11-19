// 'use client'

import { SectionHeader } from "./SectionHeader";
import Image from 'next/image';

// import { useEffect, useRef, useState } from 'react'

interface IndustryItem {
  name: string;
  description: string;
}

// Icon mapping for each industry
const industryIcons: Record<string, string> = {
  'Financial Services': '/images/icons/ico-financial-services.png',
  'Healthcare': '/images/icons/ico-health.png',
  'Manufacturing': '/images/icons/ico-manufacturing.png',
  'Energy': '/images/icons/ico-energy.png',
  'Retail': '/images/icons/ico-retail.png',
  'Government': '/images/icons/ico-government.png',
};

interface IndustriesShowcaseProps {
  id?: string;
  label: string;
  title: string;
  description: string;
  industries: IndustryItem[];
}

export function IndustriesShowcase({
  id,
  label,
  title,
  description,
  industries,
}: IndustriesShowcaseProps) {
  // Commented out scroll hijacking - might need it later
  // const scrollContainerRef = useRef<HTMLDivElement>(null)
  // const sectionRef = useRef<HTMLElement>(null)
  // const [isScrollable, setIsScrollable] = useState(false)

  // useEffect(() => {
  //   const scrollContainer = scrollContainerRef.current
  //   const section = sectionRef.current
  //   if (!scrollContainer || !section) return

  //   // Check if content is scrollable
  //   const checkScrollable = () => {
  //     const isScrollable = scrollContainer.scrollHeight > scrollContainer.clientHeight
  //     setIsScrollable(isScrollable)
  //   }
  //   checkScrollable()
  //   window.addEventListener('resize', checkScrollable)

  //   let scrollTimeout: NodeJS.Timeout

  //   const handleWheel = (e: WheelEvent) => {
  //     if (!isScrollable) return

  //     const viewportHeight = window.innerHeight
  //     const containerRect = scrollContainer.getBoundingClientRect()

  //     // Only activate when the scroll container (cards area) is fully or mostly in view
  //     // Container top should be at or above viewport top, and at least 90% of container should be visible
  //     const containerTopInView = containerRect.top >= 0 && containerRect.top <= viewportHeight * 0.1
  //     const containerVisibleHeight = Math.min(containerRect.bottom, viewportHeight) - Math.max(containerRect.top, 0)
  //     const containerFullyVisible = containerVisibleHeight >= containerRect.height * 0.9

  //     // Only activate if scroll container is fully visible (90%+) and its top is near the top of viewport
  //     if (!containerTopInView || !containerFullyVisible) return

  //     // Check if we're at the end of vertical scroll
  //     const isAtEnd = scrollContainer.scrollTop + scrollContainer.clientHeight >= scrollContainer.scrollHeight - 1
  //     const isAtStart = scrollContainer.scrollTop <= 1

  //     // Check if first card is visible in the container viewport
  //     const firstCard = scrollContainer.firstElementChild as HTMLElement
  //     let firstCardVisible = false
  //     if (firstCard) {
  //       const firstCardRect = firstCard.getBoundingClientRect()
  //       // First card is visible if its top is at or near the container's top (within 20px)
  //       firstCardVisible = firstCardRect.top >= containerRect.top - 20 && firstCardRect.top <= containerRect.top + 20
  //     }

  //     // If scrolling down and not at end, scroll vertically within container
  //     if (e.deltaY > 0 && !isAtEnd) {
  //       e.preventDefault()
  //       scrollContainer.scrollTop += e.deltaY
  //       clearTimeout(scrollTimeout)
  //       scrollTimeout = setTimeout(() => {
  //         // Allow normal scroll after a brief pause
  //       }, 150)
  //     }
  //     // If scrolling up
  //     else if (e.deltaY < 0) {
  //       // If at start AND first card is visible at the top, allow normal page scrolling
  //       if (isAtStart && firstCardVisible) {
  //         // Allow normal scroll - don't prevent default
  //         return
  //       }
  //       // Otherwise, scroll within container
  //       else if (!isAtStart) {
  //         e.preventDefault()
  //         scrollContainer.scrollTop += e.deltaY
  //         clearTimeout(scrollTimeout)
  //         scrollTimeout = setTimeout(() => {
  //           // Allow normal scroll after a brief pause
  //         }, 150)
  //       }
  //     }
  //     // If at end and scrolling down, allow normal scroll (handled by not preventing default)
  //   }

  //   window.addEventListener('wheel', handleWheel, { passive: false })

  //   return () => {
  //     window.removeEventListener('wheel', handleWheel)
  //     window.removeEventListener('resize', checkScrollable)
  //     clearTimeout(scrollTimeout)
  //   }
  // }, [isScrollable])

  return (
    <section
      // ref={sectionRef}
      id={id}
      className="bg-secondary-100 dark:bg-dark py-20"
    >
      <div className="mx-auto w-full max-w-container px-4 md:px-16 2xl:px-6">
        <div className="flex flex-col gap-12 md:flex-row md:gap-12 justify-start">
          {/* Left Column - Header */}
          <div className="flex md:basis-5/12">
            <div className="max-w-900 mb-20">
              <SectionHeader
                label={label}
                title={title}
                description={description}
                align="left"
              />
            </div>
          </div>

          {/* Right Column - Industry Cards in 2 columns */}
          <div
            // ref={scrollContainerRef}
            className="grid grid-cols-1 md:grid-cols-2 gap-4 md:basis-7/12"
          >
            {industries.map((industry) => {
              const iconPath = industryIcons[industry.name];

              return (
                <div
                  key={industry.name}
                  className="bg-secondary-100 dark:bg-secondary-800/20 p-6 rounded-3xl flex flex-col gap-4 min-h-[280px] transition-all duration-300 hover:bg-secondary-200 dark:hover:bg-secondary-800/70 hover:scale-[1.02] group"
                >
                  {/* Icon */}
                  {iconPath && (
                    <div className="w-full flex flex-shrink-0 justify-end">
                      <Image
                        src={iconPath}
                        alt={`${industry.name} icon`}
                        width={48}
                        height={48}
                        className="transition-transform duration-300 group-hover:scale-110"
                      />
                    </div>
                  )}

                  {/* Content */}
                  <div className="flex flex-col gap-3 flex-grow justify-end">
                    <h3 className="font-metrophobic text-gray-900 dark:text-white text-3xl tracking-wide">
                      {industry.name}
                    </h3>
                    <p className="text-gray-600 dark:text-secondary-200 text-base md:text-xl font-light leading-relaxed tracking-wide">
                      {industry.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
