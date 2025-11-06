'use client'

import { Button } from '@/components/ui/Button'
import { useCountUp } from '@/hooks/useCountUp'
import { ArrowRight } from 'lucide-react'
import { useEffect, useState } from 'react'

interface HeroMetric {
  value: string
  label: string
}

interface HeroProps {
  label?: string
  title: string
  highlight: string
  description: string
  cta: {
    label: string
    href: string
  }
  metrics?: HeroMetric[]
}

function MetricDisplay({ value, label }: HeroMetric) {
  // Parse the metric value for animation
  let end = 0
  let type: 'number' | 'percentage' | 'currency' | 'billions' | 'count' = 'number'
  let suffix = ''

  if (value.includes('%')) {
    end = parseInt(value.replace(/[^0-9]/g, ''))
    type = 'percentage'
  } else if (value.includes('B+')) {
    end = parseFloat(value.replace(/[^0-9.]/g, '')) * 1000
    type = 'billions'
  } else if (value === 'Zero') {
    // Special case - just display "Zero"
    return (
      <div className="text-right pr-5 border-r-2 border-gray-300 dark:border-gray-200">
        <div className="text-4xl font-semibold text-primary mb-1">Zero</div>
        <div className="text-[11px] font-semibold uppercase tracking-wider text-gray-600 dark:text-gray-500">
          {label}
        </div>
      </div>
    )
  } else {
    end = parseInt(value.replace(/[^0-9]/g, ''))
  }

  const counter = useCountUp({ end, type, suffix })

  return (
    <div className="text-right">
      <div ref={counter.ref} className="!font-metrophobic text-7xl font-semibold text-primary mb-1">
        {counter.value}
      </div>
      <div className="text-md font-semibold text-gray-700 dark:text-secondary-100/80">
        {label}
      </div>
    </div>
  )
}

export function Hero({ label: _label, title, highlight, description, cta, metrics }: HeroProps) {
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight
      const scrollY = window.scrollY
      // Calculate opacity based on scroll (0 to 1 over first viewport height)
      const progress = Math.min(scrollY / windowHeight, 1)
      setScrollProgress(progress)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section className="fixed inset-0 min-h-screen flex items-end justify-center bg-white dark:bg-dark z-[1] bg-[url('/images/background02.png')] dark:bg-[url('/images/background.png')] bg-cover bg-bottom-left">
      {/* Gradient overlay that fades in as you scroll - inside section so it doesn't block interactions */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-gray-200/50 via-gray-300/50 to-gray-400/50 dark:from-secondary dark:via-dark dark:to-bgdark pointer-events-none"
        style={{ opacity: scrollProgress }}
      />
      <div className="w-full max-w-container px-16 2xl:px-6 relative z-10 flex justify-between pb-8">
        <div className="max-w-900">
          {/* {label && (
            <div className="text-xs font-semibold uppercase tracking-widest text-secondary mb-8">
              {label}
            </div>
          )} */}
          <h1 className="!font-metrophobic font-normal text-5xl md:text-7xl leading-tight tracking-tighter text-gray-900 dark:text-secondary-100 mb-6">
            {title} <strong className="!font-metrophobic text-gray-900 dark:text-secondary-100">{highlight}</strong>
          </h1>
          <p className="text-[22px] font-light leading-relaxed text-gray-700 dark:text-secondary-100 max-w-prose mb-12">
            {description}
          </p>
          <Button href={cta.href} className="flex items-center gap-2 hover:gap-4 shadow-none hover:shadow-[0_12px_32px_rgba(216,36,42,0.2)] transition-all duration-500">
            {cta.label}
            <ArrowRight className="w-5 h-5" />
          </Button>
        </div>

        {/* Hero Metrics Sidebar - show on lg+ instead of only 2xl */}
        {metrics && metrics.length > 0 && (
          <div className="hidden lg:flex right-20 bottom-0 flex-col gap-12">
            {metrics.map((metric) => (
              <MetricDisplay key={metric.label} value={metric.value} label={metric.label} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
