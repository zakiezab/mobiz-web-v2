'use client'

import Script from 'next/script'

import {useConsent} from '@/hooks/useConsent'

interface GA4Props {
  gaId: string
}

export function GA4WithConsent({gaId}: GA4Props) {
  const {consent, hasConsented} = useConsent()

  // Don't render anything until user has made consent choice
  if (!hasConsented) {
    return null
  }

  // Only render GA if analytics consent is given
  if (!consent.analytics) {
    return null
  }

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-consent" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${gaId}', { anonymize_ip: true });
        `}
      </Script>
    </>
  )
}
