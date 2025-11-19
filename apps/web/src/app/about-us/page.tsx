import { Metadata } from "next";
import Image from "next/image";
import type { ReactNode } from "react";
import { unstable_noStore as noStore } from "next/cache";
import { client } from "@/lib/sanity.client";
import { ABOUT_US_PAGE_QUERY } from "@/lib/sanity.queries";
import { PageHero } from "@/components/sections/PageHero";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { ContactCTA } from "@/components/sections/ContactCTA";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  let aboutUs = null;
  try {
    aboutUs = await client.fetch(ABOUT_US_PAGE_QUERY);
  } catch (error) {
    console.warn("Could not fetch About Us page from Sanity:", error);
  }

  return {
    title:
      aboutUs?.seo?.title ||
      "About Us - Mobiz | Pioneering diversity-driven, tech-fueled innovation",
    description:
      aboutUs?.seo?.description ||
      "Pioneering diversity-driven, tech-fueled innovation for a limitless future.",
    keywords:
      aboutUs?.seo?.keywords || [
        "about mobiz",
        "mobiz leadership",
        "technology consulting company",
        "diversity-driven innovation",
        "business transformation partner",
      ],
  };
}

const VALUES = [
  {
    title: "One Team",
    description:
      "All in, and stronger together when we collaborate and share knowledge across departments & offices around the world.",
  },
  {
    title: "Own It",
    description: "Be proactive and take accountability.",
  },
  {
    title: "Client Centric",
    description: "Approach every problem with our client in mind.",
  },
  {
    title: "Feedback Always",
    description: "Offer and invite feedback. Challenge is how we grow better.",
  },
];

const LEADERSHIP_TEAM = [
  {
    name: "Hamad Riaz",
    title: "Chief Executive Officer",
  },
  {
    name: "Brittany Jackson",
    title: "Chief of Staff",
  },
  {
    name: "Scott Ditchey",
    title: "Head of Strategy and Business Development",
  },
  {
    name: "Akber Gardezi",
    title: "Head of Data and AI",
  },
  {
    name: "Vitaliy Savranskiy",
    title: "Director of Engineering",
  },
  {
    name: "Adam Zachery",
    title: "Director of Cloud Solutions",
  },
  {
    name: "Vladimir Blatin",
    title: "Sales Engineering Director",
  },
  {
    name: "Igor Kochetkov",
    title: "ServiceNow Manager",
  },
];

const CERTIFICATIONS = [
  {
    category: "Microsoft",
    items: [
      "Windows Server and SQL Server Migration to Microsoft Azure",
      "Certification - Microsoft Azure Administrator",
      "Associate Certification - Azure Security Engineer",
      "Associate Certification - Azure Data Engineer",
    ],
  },
  {
    category: "Palo Alto Networks",
    items: [
      "PCNSE: Palo Alto Networks Certified Network Security Engineer",
      "PSE: Strata - Associate",
      "AMPLIFY Security Fundamentals Exam",
      "ASE (Accredited Sales Executive): Foundation",
    ],
  },
  {
    category: "ServiceNow",
    items: [
      "ServiceNow Certified Application Developer",
      "ServiceNow Certified System Administrator",
      "Certified Implementation Specialist - Event Management",
      "Certified Implementation Specialist - Service Provider",
    ],
  },
  {
    category: "Citrix",
    items: [
      "Citrix Virtual Apps and Desktops Service Integration with Microsoft Azure Certified",
      "Citrix Certified Associate - Virtualization",
      "Citrix Certified Associate App Delivery and Security",
    ],
  },
  {
    category: "HashiCorp",
    items: [
      "Hashicorp Sales 101",
      "Terraform Cloud Enterprise Implementation Foundations",
      "Consul Implementation Foundations",
      "Vault Implementation Foundations",
    ],
  },
];

const AWARDS = [
  "Minority Business Enterprise Certified",
  "Cisco Collaboration SaaS Specialization",
];

export default async function AboutUsPage() {
  // In development, disable caching to get fresh data from Sanity immediately
  if (process.env.NODE_ENV === "development") {
    noStore();
  }

  // Fetch About Us page data from Sanity
  let aboutUs: any = null;
  try {
    aboutUs = await client.fetch(ABOUT_US_PAGE_QUERY);
  } catch (error) {
    console.warn("Could not fetch About Us page from Sanity:", error);
  }

  // Helper function to format hero title with line breaks and strong tags
  const formatHeroTitle = (title: string | undefined): ReactNode => {
    if (!title) {
      return (
        <span>
          About Us
        </span>
      );
    }

    // Split by line breaks and process each line
    const lines = title.split("\n");
    return (
      <span>
        {lines.map((line, index) => {
          // Check if line contains ** for bold
          const parts = line.split(/(\*\*.*?\*\*)/g);
          return (
            <span key={index}>
              {parts.map((part, partIndex) => {
                if (part.startsWith("**") && part.endsWith("**")) {
                  return <strong key={partIndex}>{part.slice(2, -2)}</strong>;
                }
                return <span key={partIndex}>{part}</span>;
              })}
              {index < lines.length - 1 && <br />}
            </span>
          );
        })}
      </span>
    );
  };

  // Use Sanity data or fallback to static data
  const _heroLabel = aboutUs?.heroLabel || "About Us";
  const heroTitle = formatHeroTitle(aboutUs?.heroTitle);
  const heroDescription =
    aboutUs?.heroDescription ||
    "Pioneering diversity-driven, tech-fueled innovation for a limitless future.";

  const missionTitle = aboutUs?.missionTitle || "Our Mission";
  const missionContent =
    aboutUs?.missionContent || [
      "Our Mission is to empower businesses with best-in-class services and solutions that align with their strategic objectives and enable them to achieve their business goals.",
      "We have a passion for innovation and are committed to providing exceptional customer services and fostering long-term relationships with our clients. We strive to deliver measurable business value and exceed expectations at every turn.",
    ];

  const visionTitle = aboutUs?.visionTitle || "Our Vision";
  const visionContent =
    aboutUs?.visionContent ||
    "To be a leading provider of innovative and cutting-edge technology solutions while consistently delivering superior value to our customers and enabling them to achieve greatness.";

  const valuesTitle = aboutUs?.valuesTitle || "Our Values";
  const values = aboutUs?.values || VALUES;

  const _leadershipTitle = aboutUs?.leadershipTitle || "Meet the Leadership Team";
  const _leadershipDescription =
    aboutUs?.leadershipDescription ||
    "We are led by a world-class team of experts";
  const _leadershipTeam = aboutUs?.leadershipTeam || LEADERSHIP_TEAM;

  const certificationsTitle =
    aboutUs?.certificationsTitle || "Certifications & Awards";
  const certifications = aboutUs?.certifications || CERTIFICATIONS;
  const awards = aboutUs?.awards || AWARDS;

  const ctaTitle = aboutUs?.ctaTitle || "Ready to work with us?";
  const ctaDescription =
    aboutUs?.ctaDescription ||
    "Let's discuss how our team can help transform your business with innovative technology solutions.";
  const ctaLabel = aboutUs?.ctaLabel || "Start the Conversation";

  // Helper function to get image URL from Sanity asset
  const _getImageUrl = (imageAsset: any): string | undefined => {
    if (!imageAsset) return undefined;
    if (typeof imageAsset === "string") return imageAsset;
    if (imageAsset?.asset?.url) return imageAsset.asset.url;
    return undefined;
  };

  return (
    <>
      <PageHero
        // label={heroLabel}
        title={heroTitle}
        description={heroDescription}
        titleClassName="!font-metrophobic font-bold text-4xl md:text-9xl leading-tight tracking-tighter text-secondary-900 dark:text-secondary-100 mb-6"
        // height="full"
      />

      {/* Mission Section */}
      <section className="bg-gray-50 dark:bg-dark py-20 md:py-20">
        <div className="mx-auto w-full max-w-container px-4 md:px-16 2xl:px-6">
          <div className="flex justify-between w-full mx-auto border-b border-gray-200 dark:border-secondary-800 pb-12">
            <div className="w-full mb-4 flex">
              <SectionHeader
                title={missionTitle}
                align="left"
              // titleClassName="text-gray-900 dark:text-secondary-100 font-bold"
              />
            </div>
            <div className="w-full space-y-6">
              {missionContent.map((paragraph: string, index: number) => (
                <p
                  key={index}
                  className="text-xl font-light leading-relaxed text-gray-700 dark:text-secondary-200"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
          {/* Vision Section */}
          <div className="flex justify-between w-full mx-auto pt-12">
            <div className="w-full mb-4 flex">
              <SectionHeader
                title={visionTitle}
                align="left"
                // titleClassName="text-gray-900 dark:text-secondary-100 font-bold"
              />
            </div>
            <div className="w-full space-y-6">
              <p className="text-xl font-light leading-relaxed text-gray-700 dark:text-secondary-200">
                {visionContent}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="bg-gray-50 py-20 md:py-40">
        <div className="mx-auto w-full max-w-container px-4 md:px-16 2xl:px-6">
          <div className="mb-12 flex justify-center">
            <div className="max-w-4xl w-full">
              <SectionHeader
                title={valuesTitle}
                align="center"
                titleClassName="text-gray-900 dark:text-secondary-100 font-bold"
              />
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 max-w-container mx-auto">
            {values.map((value: any, index: number) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 shadow-xl flex flex-col gap-2"
              >
                <h3 className="text-3xl font-bold text-gray-900 mb-3">
                  {value.title}
                </h3>
                <p className="text-base leading-relaxed text-gray-600">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Team Section */}
      {/* <section className="bg-white py-20 md:py-40">
        <div className="mx-auto w-full max-w-container px-4 md:px-16 2xl:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="mb-12 flex justify-center">
              <SectionHeader
                title={_leadershipTitle}
                description={_leadershipDescription}
                align="center"
                titleClassName="text-gray-900 dark:text-secondary-100 font-bold"
                descriptionClassName="text-gray-600 dark:text-secondary-200"
              />
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {_leadershipTeam.map((member: any, index: number) => {
                const memberImageUrl = _getImageUrl(member.image);
                return (
                  <div
                    key={index}
                    className="bg-gray-50 dark:bg-secondary-800/20 border border-gray-100 dark:border-secondary-800 p-6 rounded-2xl"
                  >
                    {memberImageUrl && (
                      <div className="relative w-full aspect-square mb-4 rounded-lg overflow-hidden">
                        <Image
                          src={memberImageUrl}
                          alt={member.name || `Team member ${index + 1}`}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        />
                      </div>
                    )}
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                      {member.name}
                    </h3>
                    <p className="text-base font-light text-gray-600 dark:text-secondary-200 mb-2">
                      {member.title}
                    </p>
                    {member.bio && (
                      <p className="text-sm font-light leading-relaxed text-gray-600 dark:text-secondary-300">
                        {member.bio}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section> */}

      {/* Certifications & Awards Section */}
      <section className="bg-white py-20 md:py-40">
        <div className="mx-auto w-full max-w-container px-4 md:px-16 2xl:px-6">
          <div className="mb-12 flex justify-center">
            <SectionHeader
              title={certificationsTitle}
              align="center"
              titleClassName="text-gray-900 dark:text-secondary-100 font-bold"
            />
          </div>

          {/* Certifications */}
          {certifications.length > 0 && (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-12">
              {certifications.map((cert: any, index: number) => {
                const categoryImageUrl = cert.image?.asset?.url;
                return (
                  <div
                    key={index}
                    className="bg-gray-50  border border-gray-200  p-6 rounded-2xl"
                  >
                    {categoryImageUrl && (
                      <div className="relative w-full max-w-[200px] h-20 mb-4">
                        <Image
                          src={categoryImageUrl}
                          alt={cert.category || `Category ${index + 1}`}
                          fill
                          className="object-contain"
                          sizes="(max-width: 768px) 200px, 200px"
                        />
                      </div>
                    )}
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">
                      {cert.category}
                    </h3>
                    <ul className="space-y-4 list-none">
                    {cert.items.map((item: any, itemIndex: number) => {
                      const itemImageUrl = item.image?.asset?.url;
                      return (
                        <li
                          key={itemIndex}
                          className="flex items-center gap-3 text-sm font-normal text-gray-600"
                        >
                          {itemImageUrl && (
                            <div className="relative w-12 h-12 flex-shrink-0">
                              <Image
                                src={itemImageUrl}
                                alt={item.name || `Certification ${itemIndex + 1}`}
                                fill
                                className="object-contain"
                                sizes="48px"
                              />
                            </div>
                          )}
                          <span className="flex-1">{item.name || item}</span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
                );
              })}
            </div>
          )}

          {/* Awards */}
          {awards && awards.length > 0 && (
            <div className="w-full mx-auto">
              <div className="grid gap-4 md:grid-cols-2">
                {awards.map((award: any, index: number) => {
                  // Handle both old format (string) and new format (object with name and image)
                  const awardName = typeof award === 'string' ? award : award?.name;
                  const awardImageUrl = typeof award === 'object' && award?.image?.asset?.url ? award.image.asset.url : undefined;
                  
                  return (
                    <div
                      key={index}
                      className="flex flex-col gap-0 border border-gray-200 p-6 rounded-2xl text-center w-full"
                    >
                      <p className="text-2xl font-semibold text-gray-900">
                        {awardName}
                      </p>
                      {awardImageUrl && (
                        <div className="relative w-full max-w-[400px] h-[400px] mx-auto">
                          <Image
                            src={awardImageUrl}
                            alt={awardName || `Award ${index + 1}`}
                            fill
                            className="object-contain"
                            sizes="(max-width: 768px) 400px, 200px"
                          />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </section>

      <ContactCTA
        title={ctaTitle}
        description={ctaDescription}
        ctaLabel={ctaLabel}
      />
    </>
  );
}

