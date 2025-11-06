import type {ReactNode} from 'react'

import {Button} from '@/components/ui/Button'

interface PageHeroProps {
  label: string
  title: ReactNode
  description: ReactNode
  cta?: {
    label: string
    href: string
  }
}

export function PageHero({label, title, description, cta}: PageHeroProps) {
  return (
    <section className="bg-white py-24 md:py-32">
      <div className="page-container">
        <div className="max-w-3xl space-y-8">
          <p className="section-label">{label}</p>
          <h1 className="text-4xl font-light leading-tight tracking-tight text-dark md:text-5xl lg:text-6xl">
            {title}
          </h1>
          <p className="section-description">{description}</p>
          {cta && <Button href={cta.href}>{cta.label}</Button>}
        </div>
      </div>
    </section>
  )
}
