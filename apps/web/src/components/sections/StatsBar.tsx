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
  const iconRefs = useRef<(HTMLDivElement | null)[]>([])
  const bouncedIconsRef = useRef<Set<number>>(new Set())

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

  // Set up scroll handler to trigger bounce animation when icons reach center
  useEffect(() => {
    if (normalizedItems.length === 0) return

    const handleScroll = () => {
      const viewportCenter = window.innerHeight * 0.5
      const threshold = window.innerHeight * 0.2 // Trigger when within 20% of viewport center

      iconRefs.current.forEach((iconRef, index) => {
        if (!iconRef || bouncedIconsRef.current.has(index)) return

        const rect = iconRef.getBoundingClientRect()
        const iconCenter = rect.top + rect.height / 2
        const distanceFromCenter = Math.abs(iconCenter - viewportCenter)

        // Trigger bounce when icon center is near viewport center
        if (distanceFromCenter < threshold && rect.top < window.innerHeight && rect.bottom > 0) {
          const imgElement = iconRef.querySelector('img')
          if (imgElement) {
            // Mark as bounced
            bouncedIconsRef.current.add(index)
            
            // Trigger animation with staggered delay
            imgElement.style.animation = `bounce-once 0.6s ease-out ${index * 0.15}s`
          }
        }
      })
    }

    // Check on mount and scroll
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
    }
  }, [normalizedItems.length])

  return (
    <section ref={sectionRef} className="bg-white dark:bg-dark py-16">
      <div className="flex items-center justify-center mx-auto w-full max-w-container px-4 md:px-24 text-center">
        <div 
          className="group relative w-fit border border-gray-200 dark:border-secondary-200/20 rounded-2xl p-4 bg-gradient-to-tl from-gray-50 dark:from-secondary-300/10 to-gray-100 dark:to-secondary-600/10 overflow-hidden"
          style={{ transform: `scale(${scrollProgress})` }}
        >
          {/* Hover overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-tl from-gray-200 dark:from-secondary-600 to-gray-300 dark:to-secondary-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
          
          {/* Content */}
          <div className="relative z-10 ">
            <div className="text-xs font-semibold uppercase tracking-widest text-gray-600 dark:text-secondary-200 mb-6">
              {label}
            </div>
            <div className="flex flex-col md:flex-row justify-center items-center gap-12 flex-wrap">
              {normalizedItems.map((item, index) => (
                <div 
                  key={item.label || index} 
                  ref={(el) => {
                    iconRefs.current[index] = el
                  }}
                  className="flex flex-col items-center gap-3"
                >
                  {item.image && (
                    <div className="relative w-12 h-12 flex items-center justify-center">
                      {/* Pulsing background effect */}
                      <div 
                        className="absolute inset-0 rounded-full bg-primary-300/50 animate-pulse-ring"
                        style={{ animationDelay: `${index * 0.3}s` }}
                      />
                      {/* Icon */}
                      <img 
                        src={item.image} 
                        alt={item.label}
                        width={48}
                        height={48}
                        className="relative z-10 w-full h-full object-contain"
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
