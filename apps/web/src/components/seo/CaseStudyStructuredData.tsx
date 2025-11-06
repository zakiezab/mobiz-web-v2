import Script from "next/script";

interface CaseStudyStructuredDataProps {
  headline: string;
  description?: string | null;
  url: string;
  industry?: string | null;
  metric?: string | null;
  metricContext?: string | null;
  imageUrl?: string | null;
  datePublished?: string | null;
}

export function CaseStudyStructuredData({
  headline,
  description,
  url,
  industry,
  metric,
  metricContext,
  imageUrl,
  datePublished,
}: CaseStudyStructuredDataProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "CaseStudy",
    name: headline,
    description,
    url,
    industry,
    about: metricContext,
    identifier: metric,
    author: {
      "@type": "Organization",
      name: "Mobiz",
      url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://mobizinc.com",
    },
    image: imageUrl ? [imageUrl] : undefined,
    datePublished: datePublished ?? undefined,
  };

  return (
    <Script id={`case-study-schema-${encodeURIComponent(url)}`} type="application/ld+json" strategy="afterInteractive">
      {JSON.stringify(schema)}
    </Script>
  );
}
