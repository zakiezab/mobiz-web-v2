'use client'

import { useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'

import { Button } from '@/components/ui/Button'
import Image from 'next/image'

interface PageHeroProps {
  label: string
  title: ReactNode
  description: ReactNode
  image?: string
  parallaxSpeed?: number // Controls parallax effect: 0 = no movement, positive = slower scroll, negative = reverse scroll
  cta?: {
    label: string
    href: string
  }
  titleClassName?: string // Optional custom className for the title
  descriptionClassName?: string // Optional custom className for the description
  containerClassName?: string // Optional custom className for the content container
}

export function PageHero({
  label: _label,
  title,
  description,
  cta,
  image,
  parallaxSpeed = 0.4,
  titleClassName,
  descriptionClassName,
  containerClassName
}: PageHeroProps) {
  // Convert title to string for alt text
  const titleText = typeof title === 'string' ? title : 'Page hero';
  const sectionRef = useRef<HTMLElement>(null)
  const [scrollOffset, setScrollOffset] = useState(0)

  useEffect(() => {
    // If parallaxSpeed is 0, disable parallax effect
    if (parallaxSpeed === 0) {
      setScrollOffset(0)
      return
    }

    let rafId: number | null = null

    const handleScroll = () => {
      if (rafId) {
        window.cancelAnimationFrame(rafId)
      }

      rafId = window.requestAnimationFrame(() => {
        if (!sectionRef.current) return

        const section = sectionRef.current
        const rect = section.getBoundingClientRect()
        const scrollY = window.scrollY
        const windowHeight = window.innerHeight

        // Calculate when section enters viewport (when top of section reaches bottom of viewport)
        const sectionTop = section.offsetTop
        const sectionHeight = rect.height

        // Only calculate parallax when section is visible or recently scrolled past
        const sectionBottom = sectionTop + sectionHeight

        // Calculate scroll progress through the section
        // 0 = section hasn't entered viewport yet
        // 1 = section has completely scrolled past
        const scrollStart = sectionTop - windowHeight
        const scrollEnd = sectionBottom
        const scrollRange = scrollEnd - scrollStart

        if (scrollRange <= 0) {
          setScrollOffset(0)
          return
        }

        const scrollProgress = Math.max(0, Math.min(1, (scrollY - scrollStart) / scrollRange))

        // Parallax speed factor controls the movement:
        // - 0 = no movement (static image)
        // - Positive (e.g., 0.4) = image moves up slower than scroll (normal parallax)
        // - Negative (e.g., -0.4) = image moves down (reverse parallax, opposite direction)
        const speed = parallaxSpeed

        // Maximum parallax offset (how far image can move)
        // Use absolute value for calculation
        const maxParallaxOffset = sectionHeight * Math.abs(speed)

        // Calculate offset: 
        // - Positive speed: offset is positive -> translateY(-offset) moves image up (normal parallax)
        // - Negative speed: offset is negative -> translateY(-negative) = translateY(positive) moves image down (reverse)
        const offset = scrollProgress * maxParallaxOffset * (speed < 0 ? -1 : 1)

        setScrollOffset(offset)
      })
    }

    // Initial calculation
    handleScroll()

    // Listen to scroll events with throttling via requestAnimationFrame
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
      if (rafId) {
        window.cancelAnimationFrame(rafId)
      }
    }
  }, [parallaxSpeed])

  return (
    <section
      ref={sectionRef}
      className="relative h-[66vh] min-h-[400px] flex items-end bg-secondary-100 dark:bg-secondary-800 pt-20 pb-4 md:pt-32 md:pb-4 overflow-hidden"
    >
      {/* Background Image with Parallax Effect */}
      {image && (
        <div
          className="absolute z-0 w-full h-screen"
          style={{
            transform: `translateY(${-scrollOffset}px)`,
            willChange: 'transform',
          }}
        >
          <Image
            src={image}
            alt={titleText}
            fill
            className="object-contain"
            priority
            sizes="100vw"
          />
        </div>
      )}
      {/* Gradient Overlay */}
      <div
        className="absolute inset-0 h-full w-full bg-gradient-to-t from-gray-50 via-secondary/0 to-secondary-800/30 dark:from-dark dark:via-dark/80 dark:to-bgdark/0 pointer-events-none z-[1]"
      />
      {/* Content */}
      <div className={`relative z-10 mx-auto w-full max-w-container px-4 md:px-16 2xl:px-6 ${containerClassName || ''}`}>
        <div className="max-w-3xl space-y-8">
          {/* <p className="section-label">{label}</p> */}
          <h1 className={titleClassName || "!font-metrophobic font-bold text-4xl md:text-6xl leading-tight tracking-tighter text-secondary-900 dark:text-secondary-100 mb-6"}>
            {title}
          </h1>
          {description && (
            <p className={descriptionClassName || "section-description"}>
              {description}
            </p>
          )}
          {cta && <Button href={cta.href}>{cta.label}</Button>}
        </div>
      </div>
    </section>
  )
}
