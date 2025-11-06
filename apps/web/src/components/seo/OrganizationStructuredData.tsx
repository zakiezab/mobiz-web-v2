import Script from 'next/script'

export function OrganizationStructuredData() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://mobizinc.com'

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Mobiz',
    description: 'Enterprise execution partner for F500 technology leaders. We architect, build, and deploy mission-critical systems with zero handoffs.',
    url: siteUrl,
    logo: {
      '@type': 'ImageObject',
      url: `${siteUrl}/images/mobiz-logo.png`,
      width: 1243,
      height: 696,
    },
    foundingDate: '2010',
    sameAs: [
      'https://www.linkedin.com/company/mobiz-inc/',
      'https://twitter.com/MobizInc',
    ],
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Houston',
      addressRegion: 'TX',
      addressCountry: 'US',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Business',
      availableLanguage: ['en'],
    },
  }

  return (
    <Script id="organization-schema" type="application/ld+json" strategy="afterInteractive">
      {JSON.stringify(schema)}
    </Script>
  )
}
