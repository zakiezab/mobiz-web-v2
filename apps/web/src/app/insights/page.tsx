import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { client } from "@/lib/sanity.client";
import { ARTICLES_QUERY } from "@/lib/sanity.queries";
import { PageHero } from "@/components/sections/PageHero";
import { ContactCTA } from "@/components/sections/ContactCTA";

export const metadata: Metadata = {
  title: "Thought Leadership - Mobiz",
  description:
    "Insights on execution, technology transformation, and delivering value in enterprise environments.",
};

export default async function ThoughtLeadershipPage() {
  const articles = await client.fetch(ARTICLES_QUERY);

  return (
    <>
      <PageHero
        label="Thought Leadership"
        title="Insights from the Front Lines"
        description="Real-world perspectives on execution, technology transformation, and what it takes to deliver value in enterprise environments."
      />

      <section className="bg-white py-40">
        <div className="mx-auto w-full max-w-container px-20">
          {articles.length === 0 ? (
            <div className="max-w-4xl text-center">
              <p className="text-xl font-light text-gray-600">
                Thought leadership articles coming soon. Check back for insights
                from our execution experience.
              </p>
            </div>
          ) : (
            <div className="grid gap-16 md:grid-cols-2 lg:grid-cols-3">
              {articles.map((article: any) => (
                <article key={article._id} className="group">
                  <Link href={`/insights/${article.slug}`} className="block">
                    {article.heroImage?.asset?.url && (
                      <div className="relative mb-6 aspect-[16/9] overflow-hidden rounded-lg bg-gray-100">
                        <Image
                          src={article.heroImage.asset.url}
                          alt={
                            article.heroImage.asset.altText || article.title
                          }
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                          sizes="(min-width: 1280px) 400px, (min-width: 768px) 45vw, 100vw"
                        />
                      </div>
                    )}
                    <div className="space-y-4">
                      <time className="text-sm font-medium text-gray-500">
                        {new Date(article.publishedAt).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          },
                        )}
                      </time>
                      <h3 className="text-xl font-normal text-dark group-hover:text-primary transition-colors">
                        {article.title}
                      </h3>
                      {article.excerpt && (
                        <p className="text-base font-light leading-relaxed text-gray-600 line-clamp-3">
                          {article.excerpt}
                        </p>
                      )}
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      <ContactCTA
        title="Have a challenge you're tackling?"
        description="We're writing from experience, not theory. Let's discuss how we can help you execute your transformation."
        ctaLabel="Start the Conversation"
      />
    </>
  );
}
