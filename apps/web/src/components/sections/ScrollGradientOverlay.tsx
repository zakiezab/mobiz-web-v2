'use client'

import { useEffect, useState } from 'react'

interface ScrollGradientOverlayProps {
  className?: string
  gradientClassName?: string
}

/**
 * Client component that adds a gradient overlay that fades in based on scroll progress.
 * This overlay is fixed at the top of the viewport and covers the entire screen.
 * It fades in as the user scrolls down (opacity 0 to 1 over first viewport height).
 */
export function ScrollGradientOverlay({ 
  className = '',
  gradientClassName = ''
}: ScrollGradientOverlayProps) {
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight
      const scrollY = window.scrollY
      // Calculate opacity based on scroll (0 to 1 over first viewport height)
      const progress = Math.min(scrollY / windowHeight, 1)
      setScrollProgress(progress)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // Initial calculation
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div 
      className={`fixed top-0 left-0 right-0 h-[20vh] pointer-events-none z-0 ${className}`}
      aria-hidden="true"
    >
      {/* Gradient overlay that fades in as you scroll - covers top 20% of viewport */}
      <div
        className={`absolute inset-0 bg-gradient-to-b from-secondary-300/60 via-secondary-300/20 to-transparent dark:from-dark/80 dark:via-dark/10 dark:to-transparent ${gradientClassName}`}
        style={{ opacity: scrollProgress }}
      />
    </div>
  )
}

