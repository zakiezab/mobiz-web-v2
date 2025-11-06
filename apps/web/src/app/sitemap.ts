import {MetadataRoute} from 'next'

import {client} from '@/lib/sanity.client'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [services, articles, caseStudies] = await Promise.all([
    client.fetch(
      `*[_type == "servicePage"]{"slug": slug.current, "updatedAt": _updatedAt}`,
    ),
    client.fetch(
      `*[_type == "article"]{"slug": slug.current, "updatedAt": _updatedAt}`,
    ),
    client.fetch(
      `*[_type == "caseStudy"]{"slug": slug.current, "updatedAt": _updatedAt}`,
    ),
  ]);

  const rawBaseUrl =
    process.env.NEXT_PUBLIC_SITE_URL && process.env.NEXT_PUBLIC_SITE_URL !== ''
      ? process.env.NEXT_PUBLIC_SITE_URL
      : 'https://mobizinc.com'
  const baseUrl = rawBaseUrl.replace(/\/$/, '')

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${baseUrl}/our-model`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/technology-partners`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/execution`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/delivered-value`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/case-studies`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/insights`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.5,
    },
    ...services.map((service: any) => ({
      url: `${baseUrl}/services/${service.slug}`,
      lastModified: service.updatedAt
        ? new Date(service.updatedAt)
        : new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    // Also include /execution/[slug] routes for the 4 main services
    ...services
      .filter((service: any) =>
        ['cloud-transformation', 'ai-data-platforms', 'digital-product-engineering', 'core-system-modernization'].includes(service.slug)
      )
      .map((service: any) => ({
        url: `${baseUrl}/execution/${service.slug}`,
        lastModified: service.updatedAt
          ? new Date(service.updatedAt)
          : new Date(),
        changeFrequency: "monthly" as const,
        priority: 0.8,
      })),
    // Include /delivered-value/[slug] routes (redirects to case studies)
    ...caseStudies.map((study: any) => ({
      url: `${baseUrl}/delivered-value/${study.slug}`,
      lastModified: study.updatedAt ? new Date(study.updatedAt) : new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    ...articles.map((article: any) => ({
      url: `${baseUrl}/insights/${article.slug}`,
      lastModified: article.updatedAt
        ? new Date(article.updatedAt)
        : new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    ...caseStudies.map((study: any) => ({
      url: `${baseUrl}/case-studies/${study.slug}`,
      lastModified: study.updatedAt ? new Date(study.updatedAt) : new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
