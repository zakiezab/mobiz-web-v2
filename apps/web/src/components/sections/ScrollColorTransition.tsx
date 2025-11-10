'use client'

import { useEffect, useRef, useState, createContext, useContext } from 'react'

interface ScrollColorTransitionProps {
  children: React.ReactNode
  fromBg?: string // Starting background color (dark theme)
  toBg?: string // Ending background color (light theme)
  fromText?: string // Starting text color (light)
  toText?: string // Ending text color (dark)
  transitionDistance?: number // Percentage of viewport height for transition (default: 50%)
}

// Context to share scroll progress with children
const ScrollProgressContext = createContext<number>(0)

export function useScrollProgress() {
  return useContext(ScrollProgressContext)
}

export function ScrollColorTransition({
  children,
  fromBg = '#130E23', // dark
  toBg = '#FAFAFA', // gray-50
  fromText = '#ffffff', // white/light
  toText = '#221F1F', // gray-900/dark
  transitionDistance = 50, // 50% of viewport height
}: ScrollColorTransitionProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [scrollProgress, setScrollProgress] = useState(0)
  const rafIdRef = useRef<number | null>(null)
  const entryPointRef = useRef<number | null>(null) // Store the sectionTop when it first enters viewport

  // Convert hex to RGB
  const hexToRgb = (hex: string): [number, number, number] => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    return result
      ? [
          parseInt(result[1], 16),
          parseInt(result[2], 16),
          parseInt(result[3], 16),
        ]
      : [0, 0, 0]
  }

  // Interpolate between two RGB colors
  const interpolateColor = (
    color1: [number, number, number],
    color2: [number, number, number],
    progress: number
  ): string => {
    const r = Math.round(color1[0] + (color2[0] - color1[0]) * progress)
    const g = Math.round(color1[1] + (color2[1] - color1[1]) * progress)
    const b = Math.round(color1[2] + (color2[2] - color1[2]) * progress)
    return `rgb(${r}, ${g}, ${b})`
  }

  useEffect(() => {
    if (!containerRef.current) return

    const calculateScrollProgress = () => {
      if (!containerRef.current) return

      const section = containerRef.current
      const rect = section.getBoundingClientRect()
      const windowHeight = window.innerHeight
      const sectionTop = rect.top
      const sectionBottom = rect.bottom

      let progress = 0

      // Calculate progress based on section position
      // Progress = 0: Section just entered viewport (dark background)
      // Progress = 1: Section has scrolled up by transitionDistance% (light background)
      
      // Check if section is completely below viewport (hasn't entered yet)
      if (sectionTop > windowHeight) {
        // Section hasn't entered viewport yet - start with dark (progress = 0)
        progress = 0
        entryPointRef.current = null // Reset entry point
      } 
      // Check if section is completely above viewport (scrolled past)
      else if (sectionBottom < 0) {
        // Section has scrolled completely past - fully light (progress = 1)
        progress = 1
      } 
      // Section is in viewport or intersecting
      else {
        // Store the sectionTop when it first enters viewport
        // This handles both cases: already visible on page load, or entering later
        if (entryPointRef.current === null) {
          // First time section is visible - store current position as entry point
          entryPointRef.current = sectionTop
        }
        
        // Calculate progress based on how much the section has moved from entry point
        // When sectionTop = entryPoint: progress = 0 (just entered, dark)
        // When sectionTop = entryPoint - transitionDistance: progress = 1 (scrolled up, light)
        
        const entryPoint = entryPointRef.current
        const scrollDistance = entryPoint - sectionTop // Positive when section has moved up
        const transitionDistancePx = windowHeight * (transitionDistance / 100)
        
        if (scrollDistance <= 0) {
          // Section is at or below entry point - hasn't started transitioning yet
          progress = 0
        } else if (scrollDistance >= transitionDistancePx) {
          // Section has scrolled past transition distance - fully light
          progress = 1
        } else {
          // Section is in transition zone - calculate progress
          progress = scrollDistance / transitionDistancePx
        }
      }

      setScrollProgress(progress)
    }

    const handleScroll = () => {
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current)
      }

      rafIdRef.current = requestAnimationFrame(() => {
        calculateScrollProgress()
      })
    }

    // Initial calculation
    calculateScrollProgress()

    // Listen to scroll events
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current)
      }
    }
  }, [transitionDistance])

  // Convert hex colors to RGB
  const fromBgRgb = hexToRgb(fromBg)
  const toBgRgb = hexToRgb(toBg)
  const fromTextRgb = hexToRgb(fromText)
  const toTextRgb = hexToRgb(toText)

  // Interpolate colors based on scroll progress
  // Ensure progress is clamped between 0 and 1
  const clampedProgress = Math.min(1, Math.max(0, scrollProgress))
  const currentBg = interpolateColor(fromBgRgb, toBgRgb, clampedProgress)
  const currentText = interpolateColor(fromTextRgb, toTextRgb, clampedProgress)

  return (
    <ScrollProgressContext.Provider value={clampedProgress}>
      <div
        ref={containerRef}
        style={{
          backgroundColor: currentBg,
          color: currentText,
          // Use a very short transition to make it feel instant and smooth
          transition: 'background-color 0.1s ease-out, color 0.1s ease-out',
        }}
        className="scroll-color-transition"
      >
        {children}
      </div>
    </ScrollProgressContext.Provider>
  )
}

