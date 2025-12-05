'use client'

import { useEffect, useState, useRef } from 'react'

interface RecognitionItem {
  label: string
  title: string
  source: string
}

interface RecognitionBarProps {
  items: RecognitionItem[]
}

export function RecognitionBar({items}: RecognitionBarProps) {
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

  // Calculate shadow opacity based on scrollProgress (0 to 1)
  // shadow-2xl equivalent: 0 25px 50px -12px rgba(0, 0, 0, 0.25)
  // We'll use secondary-600 color (#3C2C7F) with 0.4 base opacity, scaled by scrollProgress
  // Convert hex to rgb: #3C2C7F = rgb(60, 44, 127)
  const shadowOpacity = scrollProgress * 0.2
  const shadowStyle = {
    transform: `scale(${scrollProgress})`,
    boxShadow: `0 25px 50px -12px rgba(60, 44, 127, ${shadowOpacity})`, // secondary-600: #3C2C7F
  }

  return (
    <section ref={sectionRef} className="bg-gradient-to-t from-secondary-200 dark:from-secondary-800 to-white dark:to-dark py-16">
      <div className="mx-auto w-full max-w-container px-4 md:px-24 text-center">
        <div 
          className="grid gap-16 md:grid-cols-3 rounded-3xl p-8 bg-gradient-to-l from-gray-50 dark:from-secondary-300/50 to-gray-100 dark:to-secondary-600/10 border border-gray-200 dark:border-secondary-200/20"
          style={shadowStyle}
        >
          {items.map((item) => (
            <div key={item.label} className="text-center">
              <div className="text-base uppercase tracking-wider text-gray-500 dark:text-primary mb-5">
                {item.label}
              </div>
              <div className="!font-metrophobic text-3xl text-gray-900 dark:text-secondary-100 leading-tight tracking-tighter mb-2">
                {item.title}
              </div>
              <div className="text-base text-gray-600 dark:text-secondary-200">
                {item.source}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
