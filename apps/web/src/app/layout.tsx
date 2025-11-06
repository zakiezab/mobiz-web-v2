import type {Metadata} from 'next'
import {Libre_Franklin, Metrophobic} from 'next/font/google'

import {OrganizationStructuredData} from '@/components/seo/OrganizationStructuredData'
import {ConsentBanner} from '@/components/ui/ConsentBanner'
import {GA4WithConsent} from '@/components/ui/GA4WithConsent'
import {Footer} from '@/components/layout/Footer'
import {Navigation} from '@/components/layout/Navigation'
import {ScrollProgress} from '@/components/ui/ScrollProgress'
import {ThemeProvider} from '@/components/providers/ThemeProvider'
import './globals.css'

const libreFranklin = Libre_Franklin({
  subsets: ['latin'],
  variable: '--font-libre-franklin',
  weight: ['200', '300', '400', '500', '600'],
})

const metaphobic = Metrophobic({
  subsets: ['latin'],
  variable: '--font-metrophobic',
  weight: '400',
})

const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA4_ID

export const metadata: Metadata = {
  title: 'Mobiz | Strategy, Executed.',
  description:
    'The execution partner for F500 technology leaders. We architect, build, and deploy production-grade systems. Zero handoffs. 100% accountability.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="overflow-x-hidden" suppressHydrationWarning>
      <body className={`${libreFranklin.variable} ${metaphobic.variable} antialiased overflow-x-hidden`}>
        <ThemeProvider>
          <ScrollProgress />
          <Navigation />
          <main>{children}</main>
          <Footer />
          {/* <ConsentBanner /> */}
          {GA_TRACKING_ID ? <GA4WithConsent gaId={GA_TRACKING_ID} /> : null}
          <OrganizationStructuredData />
        </ThemeProvider>
      </body>
    </html>
  )
}
