'use client'

import { useEffect, useRef, useState } from 'react'
import { SectionHeader } from "@/components/sections/SectionHeader";

interface ModelItem {
  number: string;
  title: string;
  description: string;
}

interface ModelGridProps {
  id?: string;
  label: string;
  title: string;
  description: string;
  items: ModelItem[];
}

export function ModelGrid({
  id,
  label,
  title,
  description,
  items,
}: ModelGridProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const [isScrollable, setIsScrollable] = useState(false)

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current
    const section = sectionRef.current
    if (!scrollContainer || !section) return

    // Check if content is scrollable
    const checkScrollable = () => {
      const isScrollable = scrollContainer.scrollWidth > scrollContainer.clientWidth
      setIsScrollable(isScrollable)
    }
    checkScrollable()
    window.addEventListener('resize', checkScrollable)

    let isScrolling = false
    let scrollTimeout: NodeJS.Timeout

    const handleWheel = (e: WheelEvent) => {
      if (!isScrollable) return

      // Check if the scroll container (items) is in view
      const containerRect = scrollContainer.getBoundingClientRect()
      
      // Only activate when scroll container is significantly visible in viewport
      // Check if container top is above viewport bottom and container bottom is below viewport top
      const containerInView = containerRect.top < window.innerHeight && containerRect.bottom > 0
      
      // More precise: check if scroll container is at least partially visible
      // Only hijack scroll when container is reasonably visible (at least 30% of viewport height)
      const viewportHeight = window.innerHeight
      const containerVisibleHeight = Math.min(containerRect.bottom, viewportHeight) - Math.max(containerRect.top, 0)
      const isSignificantlyVisible = containerVisibleHeight > viewportHeight * 0.3
      
      if (!containerInView || !isSignificantlyVisible) return

      // Check if we're at the end of horizontal scroll
      const isAtEnd = scrollContainer.scrollLeft + scrollContainer.clientWidth >= scrollContainer.scrollWidth - 1
      const isAtStart = scrollContainer.scrollLeft <= 1

      // If scrolling down and not at end, scroll horizontally
      if (e.deltaY > 0 && !isAtEnd) {
        e.preventDefault()
        scrollContainer.scrollLeft += e.deltaY
        isScrolling = true
        clearTimeout(scrollTimeout)
        scrollTimeout = setTimeout(() => {
          isScrolling = false
        }, 150)
      }
      // If scrolling up and not at start, scroll horizontally
      else if (e.deltaY < 0 && !isAtStart) {
        e.preventDefault()
        scrollContainer.scrollLeft += e.deltaY
        isScrolling = true
        clearTimeout(scrollTimeout)
        scrollTimeout = setTimeout(() => {
          isScrolling = false
        }, 150)
      }
      // If at end and scrolling down, allow normal scroll
      // If at start and scrolling up, allow normal scroll
    }

    window.addEventListener('wheel', handleWheel, { passive: false })

    return () => {
      window.removeEventListener('wheel', handleWheel)
      window.removeEventListener('resize', checkScrollable)
      clearTimeout(scrollTimeout)
    }
  }, [isScrollable])

  return (
    <section ref={sectionRef} id={id} className="py-40">
      <div className="mx-auto w-full max-w-container px-20">
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
      </div>
      <div 
        ref={scrollContainerRef}
        className="flex gap-16 overflow-x-auto scrollbar-hide pl-[33vw] md:pl-[33vw] pr-20 md:pr-40"
      >
          {items.map((item) => (
            <div key={item.title} className="group flex flex-col gap-8 p-8 bg-gray-50 dark:bg-secondary-800/50 hover:bg-gray-100 dark:hover:bg-secondary-800 transition-all duration-300 rounded-3xl flex-shrink-0 w-[500px]">
              <div className="text-xl tracking-wider text-gray-500 dark:text-secondary-200 mb-5">
                {item.number}
              </div>
              <h3 className="!font-metrophobic text-gray-900 dark:text-secondary-100 text-5xl md:text-7xl leading-tight tracking-tighter mb-4">
                {item.title}
              </h3>
              <p className="text-xl font-light leading-relaxed text-gray-700 dark:text-secondary-100">
                {item.description}
              </p>
            </div>
          ))}
      </div>
      {/* <div className="grid gap-16 md:grid-cols-3">
          {items.map((item) => (
            <div key={item.title} className="pt-8 border-t-2">
              <div className="text-xs font-semibold tracking-wider text-gray-500 mb-5">
                {item.number}
              </div>
              <h3 className="text-[24px] font-normal text-dark mb-4">
                {item.title}
              </h3>
              <p className="text-base font-light leading-relaxed text-gray-600">
                {item.description}
              </p>
            </div>
          ))}
        </div> */}
    </section>
  );
}
