import {notFound} from 'next/navigation'

import {client} from '@/lib/sanity.client'
import {SERVICE_PAGE_QUERY, ENGAGEMENT_MODELS_QUERY, TECHNOLOGY_PARTNERS_QUERY} from '@/lib/sanity.queries'
import type {ServicePage, EngagementModel, TechnologyPartner} from '@/lib/sanity.types'

export async function getServicePage(slug: string) {
  try {
    const service = await client.fetch<ServicePage>(
      SERVICE_PAGE_QUERY,
      {slug},
      {next: {revalidate: 3600}}
    )

    if (!service) {
      notFound()
    }

    return service
  } catch (error) {
    console.error('Failed to fetch service page:', error)
    throw error
  }
}

export async function getEngagementModels() {
  try {
    const models = await client.fetch<EngagementModel[]>(
      ENGAGEMENT_MODELS_QUERY,
      {},
      {next: {revalidate: 3600}}
    )

    return models || []
  } catch (error) {
    console.error('Failed to fetch engagement models:', error)
    throw error
  }
}

export async function getTechnologyPartners() {
  try {
    const partners = await client.fetch<TechnologyPartner[]>(
      TECHNOLOGY_PARTNERS_QUERY,
      {},
      {next: {revalidate: 3600}}
    )

    return partners || []
  } catch (error) {
    console.error('Failed to fetch technology partners:', error)
    throw error
  }
}
