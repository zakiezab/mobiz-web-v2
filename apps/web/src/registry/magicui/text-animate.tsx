"use client"

import { useEffect, useRef, useState } from "react"
import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface TextAnimateProps {
  children: ReactNode
  animation?: "blurIn" | "fadeIn" | "slideUp" | "slideDown"
  as?: keyof JSX.IntrinsicElements
  className?: string
  delay?: number
  duration?: number
  scrollBased?: boolean
  blurAmount?: number
}

export function TextAnimate({
  children,
  animation = "blurIn",
  as: Component = "span",
  className,
  delay = 0,
  duration = 0.6,
  scrollBased = false,
  blurAmount = 10,
}: TextAnimateProps) {
  const [scrollProgress, setScrollProgress] = useState(0)
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    if (scrollBased && animation === "blurIn") {
      const handleScroll = () => {
        const rect = element.getBoundingClientRect()
        const windowHeight = window.innerHeight
        const elementTop = rect.top
        const elementBottom = rect.bottom
        const elementHeight = rect.height
        
        // Calculate scroll-based blur that's continuously controlled by scroll position
        // Start blur when element is 300px below viewport
        const startPoint = windowHeight + 300
        // Complete blur removal when element reaches center of viewport (50%)
        const endPoint = windowHeight * 0.5
        
        let progress = 0
        
        // If element is above the start point (scrolled past or not yet approaching)
        if (elementTop > startPoint) {
          progress = 0
        }
        // If element is between start and end points (entering viewport)
        else if (elementTop > endPoint) {
          const distance = startPoint - elementTop
          const totalDistance = startPoint - endPoint
          progress = Math.min(1, Math.max(0, distance / totalDistance))
        }
        // If element has passed the end point (fully in view or scrolled past)
        else {
          progress = 1
        }
        
        setScrollProgress(progress)
      }

      // Initial calculation - use requestAnimationFrame to ensure DOM is ready
      requestAnimationFrame(() => {
        handleScroll()
      })
      
      window.addEventListener("scroll", handleScroll, { passive: true })
      window.addEventListener("resize", handleScroll)

      return () => {
        window.removeEventListener("scroll", handleScroll)
        window.removeEventListener("resize", handleScroll)
      }
    } else {
      // Original IntersectionObserver approach for non-scroll-based animations
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              setScrollProgress(1)
            }, delay * 1000)
          } else {
            setScrollProgress(0)
          }
        },
        { threshold: 0.1 }
      )

      observer.observe(element)

      return () => {
        observer.unobserve(element)
      }
    }
  }, [delay, scrollBased, animation])

  const getAnimationStyles = () => {
    switch (animation) {
      case "blurIn":
        if (scrollBased) {
          // Scroll-based: blur decreases as scrollProgress increases (0 to 1)
          const blur = blurAmount * (1 - scrollProgress)
          const opacity = scrollProgress
          return {
            opacity,
            filter: `blur(${blur}px)`,
            transform: "translateZ(0)", // Force GPU acceleration
          }
        } else {
          // Original approach
          const isVisible = scrollProgress >= 1
          return {
            opacity: isVisible ? 1 : 0,
            filter: isVisible ? "blur(0px)" : `blur(${blurAmount}px)`,
            transform: "translateZ(0)",
          }
        }
      case "fadeIn":
        return {
          opacity: scrollProgress,
        }
      case "slideUp":
        return {
          opacity: scrollProgress,
          transform: `translateY(${(1 - scrollProgress) * 1}rem)`,
        }
      case "slideDown":
        return {
          opacity: scrollProgress,
          transform: `translateY(${-(1 - scrollProgress) * 1}rem)`,
        }
      default:
        return {}
    }
  }

  const getAnimationClasses = () => {
    switch (animation) {
      case "blurIn":
        return ""
      case "fadeIn":
        return ""
      case "slideUp":
        return ""
      case "slideDown":
        return ""
      default:
        return ""
    }
  }

  return (
    <Component
      ref={ref as any}
      className={cn(
        "will-change-[opacity,filter,transform]",
        getAnimationClasses(),
        className
      )}
      style={{
        transition: scrollBased && animation === "blurIn" 
          ? "none" // No transition for scroll-based, update directly
          : `opacity ${duration}s cubic-bezier(0.4, 0, 0.2, 1), filter ${duration}s cubic-bezier(0.4, 0, 0.2, 1), transform ${duration}s cubic-bezier(0.4, 0, 0.2, 1)`,
        ...getAnimationStyles(),
      }}
    >
      {children}
    </Component>
  )
}

