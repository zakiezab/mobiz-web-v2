import { redirect } from "next/navigation";
import { Metadata } from "next";
import { client } from "@/lib/sanity.client";
import { CASE_STUDY_QUERY } from "@/lib/sanity.queries";

interface DeliveredValuePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: DeliveredValuePageProps): Promise<Metadata> {
  const { slug } = await params;
  const caseStudy = await client.fetch(CASE_STUDY_QUERY, { slug });

  if (!caseStudy) {
    return {
      title: "Case Study Not Found",
    };
  }

  // Return metadata for the redirect target
  return {
    title: caseStudy.seo?.title || caseStudy.title,
    description: caseStudy.seo?.description || caseStudy.cardHeadline,
  };
}

export default async function DeliveredValuePage({
  params,
}: DeliveredValuePageProps) {
  const { slug } = await params;

  // Permanent redirect (301) to case studies
  redirect(`/case-studies/${slug}`);
}
