"use client";

import { useState } from "react";
import Link from "next/link";

interface CaseStudy {
  _id: string;
  title: string;
  slug: string;
  kicker?: string;
  cardHeadline?: string;
  metricLarge?: string;
  metricContext?: string;
  industry?: string;
  executionType?: string;
}

interface CaseStudyFilterProps {
  caseStudies: CaseStudy[];
  label?: string;
  title?: string;
}

const INDUSTRY_OPTIONS = [
  { value: "all", label: "All Industries" },
  { value: "financial", label: "Financial Services" },
  { value: "healthcare", label: "Healthcare" },
  { value: "manufacturing", label: "Manufacturing" },
  { value: "energy", label: "Energy" },
  { value: "retail", label: "Retail" },
];

const EXECUTION_TYPE_OPTIONS = [
  { value: "all", label: "All Services" },
  { value: "cloud", label: "Cloud Transformation" },
  { value: "ai-data", label: "AI & Data Platforms" },
  { value: "digital-product", label: "Digital Product Engineering" },
  { value: "core-systems", label: "Core System Modernization" },
];

export function CaseStudyFilter({
  caseStudies,
  label = "Real Results",
  title = "Value Delivered in Production",
}: CaseStudyFilterProps) {
  const [selectedIndustry, setSelectedIndustry] = useState("all");
  const [selectedExecutionType, setSelectedExecutionType] = useState("all");

  const filteredCaseStudies = caseStudies.filter((caseStudy) => {
    const industryMatch =
      selectedIndustry === "all" || caseStudy.industry === selectedIndustry;
    const executionTypeMatch =
      selectedExecutionType === "all" ||
      caseStudy.executionType === selectedExecutionType;
    return industryMatch && executionTypeMatch;
  });

  return (
    <section className="bg-gray-50 py-40">
      <div className="mx-auto w-full max-w-container px-20">
        {/* Header */}
        <div className="mb-16">
          <p className="text-[13px] font-medium uppercase tracking-[0.15em] text-gray-500 mb-4">
            {label}
          </p>
          <h2 className="text-4xl font-extralight leading-tight tracking-tighter text-dark mb-12">
            {title}
          </h2>

          {/* Filter Bar */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <label
                htmlFor="industry-filter"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Industry
              </label>
              <select
                id="industry-filter"
                value={selectedIndustry}
                onChange={(e) => setSelectedIndustry(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-sm text-base font-light text-dark focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              >
                {INDUSTRY_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex-1">
              <label
                htmlFor="execution-filter"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Execution Type
              </label>
              <select
                id="execution-filter"
                value={selectedExecutionType}
                onChange={(e) => setSelectedExecutionType(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-sm text-base font-light text-dark focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              >
                {EXECUTION_TYPE_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {(selectedIndustry !== "all" || selectedExecutionType !== "all") && (
              <div className="flex items-end">
                <button
                  onClick={() => {
                    setSelectedIndustry("all");
                    setSelectedExecutionType("all");
                  }}
                  className="px-6 py-3 text-sm font-medium text-gray-600 hover:text-dark transition-colors whitespace-nowrap"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-8">
          <p className="text-sm font-light text-gray-600">
            Showing {filteredCaseStudies.length} of {caseStudies.length}{" "}
            {filteredCaseStudies.length === 1 ? "case study" : "case studies"}
          </p>
        </div>

        {/* Case Studies Grid */}
        <div
          key={`${selectedIndustry}-${selectedExecutionType}`}
          className="grid gap-12 md:grid-cols-2 lg:grid-cols-3 transition-opacity duration-300"
        >
            {filteredCaseStudies.length > 0 ? (
              filteredCaseStudies.map((caseStudy) => (
                <Link
                  key={caseStudy._id}
                  href={`/case-studies/${caseStudy.slug}`}
                  className="bg-white p-8 rounded-lg hover:shadow-lg transition-all group"
                >
                  {caseStudy.kicker && (
                    <p className="text-xs font-semibold uppercase tracking-wider text-primary mb-3">
                      {caseStudy.kicker}
                    </p>
                  )}

                  {caseStudy.metricLarge && (
                    <div className="mb-4">
                      <div className="text-4xl font-light text-primary mb-1">
                        {caseStudy.metricLarge}
                      </div>
                      {caseStudy.metricContext && (
                        <p className="text-sm font-medium text-dark">
                          {caseStudy.metricContext}
                        </p>
                      )}
                    </div>
                  )}

                  <h3 className="text-xl font-medium text-dark mb-3 group-hover:text-primary transition-colors">
                    {caseStudy.cardHeadline || caseStudy.title}
                  </h3>

                  <div className="flex gap-2 flex-wrap mt-4">
                    {caseStudy.industry && (
                      <span className="text-xs px-3 py-1 bg-gray-100 text-gray-700 rounded-full">
                        {INDUSTRY_OPTIONS.find(
                          (opt) => opt.value === caseStudy.industry
                        )?.label || caseStudy.industry}
                      </span>
                    )}
                    {caseStudy.executionType && (
                      <span className="text-xs px-3 py-1 bg-gray-100 text-gray-700 rounded-full">
                        {EXECUTION_TYPE_OPTIONS.find(
                          (opt) => opt.value === caseStudy.executionType
                        )?.label || caseStudy.executionType}
                      </span>
                    )}
                  </div>

                  <p className="text-sm font-medium text-primary mt-4 group-hover:underline">
                    Read the story →
                  </p>
                </Link>
              ))
            ) : (
              <div className="col-span-full text-center py-20">
                <p className="text-xl font-light text-gray-600 mb-4">
                  No case studies found matching your filters.
                </p>
                <button
                  onClick={() => {
                    setSelectedIndustry("all");
                    setSelectedExecutionType("all");
                  }}
                  className="text-primary hover:text-secondary transition-colors underline"
                >
                  Clear all filters
                </button>
              </div>
            )}
        </div>
      </div>
    </section>
  );
}
