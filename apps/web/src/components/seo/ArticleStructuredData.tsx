import Script from "next/script";

interface ArticleStructuredDataProps {
  type?: "Article" | "NewsArticle" | "BlogPosting";
  headline: string;
  description?: string | null;
  url: string;
  publishedAt?: string | null;
  modifiedAt?: string | null;
  imageUrl?: string | null;
  authorName?: string;
}

export function ArticleStructuredData({
  type = "Article",
  headline,
  description,
  url,
  publishedAt,
  modifiedAt,
  imageUrl,
  authorName = "Mobiz",
}: ArticleStructuredDataProps) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://mobizinc.com";

  const schema = {
    "@context": "https://schema.org",
    "@type": type,
    headline,
    description,
    url,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    author: {
      "@type": "Organization",
      name: authorName,
    },
    publisher: {
      "@type": "Organization",
      name: "Mobiz",
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/images/mobiz-logo.png`,
        width: 1243,
        height: 696,
      },
    },
    image: imageUrl ? [imageUrl] : undefined,
    datePublished: publishedAt ?? undefined,
    dateModified: modifiedAt ?? publishedAt ?? undefined,
  };

  return (
    <Script id={`article-schema-${encodeURIComponent(url)}`} type="application/ld+json" strategy="afterInteractive">
      {JSON.stringify(schema)}
    </Script>
  );
}
