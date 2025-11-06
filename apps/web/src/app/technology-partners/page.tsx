import {Metadata} from 'next'

import {PageHero} from '@/components/sections/PageHero'
import {PartnerGrid} from '@/components/sections/PartnerGrid'
import {getTechnologyPartners} from '@/lib/services'

export const revalidate = 3600 // ISR every hour

export const metadata: Metadata = {
  title: 'Technology & Partners - Mobiz',
  description:
    'Technology-agnostic execution with deep expertise across the platforms our enterprise clients rely on.',
  keywords: [
    'microsoft execution partner',
    'azure implementation partner',
    'technology ecosystem experts',
    'enterprise cloud partners',
    'mobiz technology partners',
  ],
}

export default async function TechnologyPartnersPage() {
  const partners = await getTechnologyPartners()

  return (
    <>
      <PageHero
        label="Our Philosophy"
        title={<span>Technology-Agnostic. <strong>Ecosystem-Deep.</strong></span>}
        description="Our model is built on first-principles engineering. We recommend the right stack for your unique constraints and goals, not our partner quotas."
      />
      <section className="bg-gray-50 py-24 md:py-32">
        <div className="page-container">
          <div className="mb-16 max-w-3xl">
            <h2 className="mb-5 text-4xl font-light text-dark md:text-5xl">
              Enterprise-Ready Expertise
            </h2>
            <p className="max-w-3xl text-lg text-gray-600">
              To deliver with certainty, our teams maintain deep, certified expertise across the mission-critical platforms our clients rely on. This ensures seamless execution, deep integration, and full compliance with enterprise audit requirements.
            </p>
          </div>
          <PartnerGrid partners={partners} />
        </div>
      </section>
    </>
  )
}
