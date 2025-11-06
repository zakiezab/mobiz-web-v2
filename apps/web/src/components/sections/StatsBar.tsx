'use client'

import { useEffect, useState, useRef } from 'react'

interface StatsItem {
  label: string
  image?: string
}

interface StatsBarProps {
  label: string
  items: StatsItem[] | string[]
}

export function StatsBar({ label, items }: StatsBarProps) {
  const [scrollProgress, setScrollProgress] = useState(0.8) // Start at 80% scale
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return
      
      const rect = sectionRef.current.getBoundingClientRect()
      const windowHeight = window.innerHeight
      
      // Calculate when element enters viewport from bottom
      // When element top is at viewport bottom, it's just entering
      // When element has scrolled 80% of viewport height, it should be at scale 1.0
      
      // Distance from element top to viewport bottom
      const distanceFromBottom = windowHeight - rect.top
      
      // Calculate progress: 0 when element starts entering, 1 when it's 80% visible
      // Target: 80% of viewport height = windowHeight * 0.8
      const targetDistance = windowHeight * 0.8
      const progress = Math.min(1, Math.max(0, distanceFromBottom / targetDistance))
      
      // Scale from 0.8 to 1.0 as progress goes from 0 to 1
      // When progress = 0 (just entering): scale = 0.8
      // When progress = 1 (80% visible): scale = 1.0
      const scale = 0.8 + (progress * 0.2)
      setScrollProgress(scale)
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // Initial calculation
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Support both old format (string[]) and new format (StatsItem[])
  const normalizedItems: StatsItem[] = items.map((item) =>
    typeof item === 'string' ? { label: item } : item
  )

  return (
    <section ref={sectionRef} className="bg-white dark:bg-dark py-16">
      <div className="flex justify-center mx-auto w-full max-w-container px-20 text-center">
        <div 
          className="group relative w-fit border border-gray-200 dark:border-secondary-200/20 rounded-2xl p-4 bg-gradient-to-tl from-gray-50 dark:from-secondary-300/10 to-gray-100 dark:to-secondary-600/10 overflow-hidden"
          style={{ transform: `scale(${scrollProgress})` }}
        >
          {/* Hover overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-tl from-gray-200 dark:from-secondary-600 to-gray-300 dark:to-secondary-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
          
          {/* Content */}
          <div className="relative z-10">
            <div className="text-xs font-semibold uppercase tracking-widest text-gray-600 dark:text-secondary-200 mb-6">
              {label}
            </div>
            <div className="flex justify-center items-center gap-12 flex-wrap">
              {normalizedItems.map((item, index) => (
                <div key={item.label || index} className="flex flex-col items-center gap-3">
                  {item.image && (
                    <div className="w-12 h-12 flex items-center justify-center">
                      <img 
                        src={item.image} 
                        alt={item.label}
                        width={48}
                        height={48}
                        className="w-full h-full object-contain"
                      />
                    </div>
                  )}
                  <div className="text-xs font-normal text-gray-700 dark:text-secondary-300">
                    {item.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
