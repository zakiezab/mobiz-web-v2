'use client'

import {useEffect, useRef, useState} from 'react'

type CountUpType = 'number' | 'percentage' | 'currency' | 'billions' | 'millions' | 'count'

interface UseCountUpOptions {
  end: number
  duration?: number
  type?: CountUpType
  suffix?: string
  prefix?: string
}

export function useCountUp({
  end,
  duration = 2000,
  type = 'number',
  suffix = '',
  prefix = '',
}: UseCountUpOptions) {
  const [count, setCount] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    if (!ref.current) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated.current) {
            setIsVisible(true)
            hasAnimated.current = true
          }
        })
      },
      {threshold: 0.5}
    )

    observer.observe(ref.current)

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [])

  useEffect(() => {
    if (!isVisible) return

    let startTimestamp: number | null = null
    let animationFrame: number

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp
      const progress = Math.min((timestamp - startTimestamp) / duration, 1)
      const current = Math.floor(progress * end)

      setCount(current)

      if (progress < 1) {
        animationFrame = window.requestAnimationFrame(step)
      }
    }

    animationFrame = window.requestAnimationFrame(step)

    return () => {
      if (animationFrame) {
        window.cancelAnimationFrame(animationFrame)
      }
    }
  }, [isVisible, end, duration])

  const formatValue = (value: number): string => {
    switch (type) {
      case 'currency':
        return `$${value}M`
      case 'billions':
        return `$${(value / 1000).toFixed(1)}B+`
      case 'percentage':
        return `${value}%`
      case 'millions':
        return `${value}M`
      case 'count':
        return `${value.toLocaleString()}+`
      default:
        return `${prefix}${value}${suffix}`
    }
  }

  return {ref, value: formatValue(count)}
}
