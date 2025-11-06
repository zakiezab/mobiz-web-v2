import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { PortableText } from "@portabletext/react";
import { client } from "@/lib/sanity.client";
import { ARTICLE_QUERY } from "@/lib/sanity.queries";
import { ContactCTA } from "@/components/sections/ContactCTA";
import { ArticleStructuredData } from "@/components/seo/ArticleStructuredData";

interface ArticlePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await client.fetch(ARTICLE_QUERY, { slug });

  if (!article) {
    return {
      title: "Article Not Found",
    };
  }

  return {
    title: article.seo?.title || article.title,
    description: article.seo?.description || article.excerpt,
    openGraph: {
      images:
        article.seo?.ogImage?.asset?.url
          ? [article.seo.ogImage.asset.url]
          : article.heroImage?.asset?.url
          ? [article.heroImage.asset.url]
          : [],
    },
    keywords: [
      "accountability gap",
      "execution partner",
      "mobiz insights",
      "enterprise technology leadership",
    ],
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = await client.fetch(ARTICLE_QUERY, { slug });

  if (!article) {
    notFound();
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://mobizinc.com";
  const articleUrl = `${siteUrl.replace(/\/$/, "")}/insights/${article.slug}`;

  return (
    <>
      <article className="bg-white py-24">
        <div className="mx-auto w-full max-w-container px-20">
          <div className="max-w-4xl mx-auto">
            <header className="mb-16">
              <time className="text-sm font-medium text-gray-500 mb-8 block">
                {new Date(article.publishedAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
              <h1 className="text-5xl font-extralight leading-tight tracking-tighter text-dark mb-8">
                {article.title}
              </h1>
              {article.excerpt && (
                <p className="text-xl font-light leading-relaxed text-gray-600">
                  {article.excerpt}
                </p>
              )}
            </header>

            {article.heroImage && (
              <div className="aspect-[16/9] bg-gray-100 rounded-lg mb-16 overflow-hidden">
                <Image
                  src={article.heroImage.asset.url}
                  alt={article.heroImage.asset.altText || article.title}
                  width={800}
                  height={450}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            <div className="prose prose-lg max-w-none">
              <PortableText
                value={article.body}
                components={{
                  block: {
                    h2: ({ children }) => (
                      <h2 className="text-3xl font-light text-dark mt-16 mb-8">
                        {children}
                      </h2>
                    ),
                    h3: ({ children }) => (
                      <h3 className="text-2xl font-light text-dark mt-12 mb-6">
                        {children}
                      </h3>
                    ),
                    p: ({ children }) => (
                      <p className="text-base font-light leading-relaxed text-gray-700 mb-6">
                        {children}
                      </p>
                    ),
                    normal: ({ children }) => (
                      <p className="text-base font-light leading-relaxed text-gray-700 mb-6">
                        {children}
                      </p>
                    ),
                  },
                }}
              />
            </div>
          </div>
        </div>
      </article>

      <ContactCTA
        title="Ready to put these insights into action?"
        description="These articles come from real execution experience. Let's discuss how we can apply these lessons to your transformation."
        ctaLabel="Start the Conversation"
      />
      <ArticleStructuredData
        type="BlogPosting"
        headline={article.title}
        description={article.excerpt}
        url={articleUrl}
        publishedAt={article.publishedAt}
        modifiedAt={article._updatedAt}
        imageUrl={article.heroImage?.asset?.url ?? article.seo?.ogImage?.asset?.url ?? undefined}
      />
    </>
  );
}
