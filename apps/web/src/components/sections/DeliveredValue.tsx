"use client";

import { SectionHeader } from "@/components/sections/SectionHeader";
import { useCountUp } from "@/hooks/useCountUp";
import { ArrowUpRight } from "lucide-react";

interface DeliveredStory {
  client: string;
  metricValue: string;
  metricContext: string;
  description: string;
  videoLink?: {
    href: string;
    label: string;
  };
}

interface DeliveredValueProps {
  id?: string;
  label: string;
  title: string;
  stories: DeliveredStory[];
}

function StoryCard({ story }: { story: DeliveredStory }) {
  // Parse the metric value to determine animation type
  const metricValue = story.metricValue;
  let end = 0;
  let type:
    | "number"
    | "percentage"
    | "currency"
    | "billions"
    | "millions"
    | "count" = "number";
  let suffix = "";

  if (metricValue.includes("+")) {
    // Count type: "2,000+" -> 2000
    end = parseInt(metricValue.replace(/[^0-9]/g, ""));
    type = "count";
  } else {
    // Simple number: "6" -> 6
    end = parseInt(metricValue.replace(/[^0-9]/g, ""));
    suffix = "";
  }

  const counter = useCountUp({ end, type, suffix });

  return (
    <div className="flex flex-col gap-8 md:gap-12 p-8 bg-gray-50 dark:bg-secondary-600/60 transition-all duration-300 rounded-3xl hover:-translate-y-2 hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)]">
      <div>
        <div className="text-base uppercase tracking-wider text-gray-500 dark:text-secondary-300 mb-5">
          {story.client}
        </div>
        <div className="flex flex-col gap-2 mb-5">
          <span
            ref={counter.ref}
            className="!!font-metrophobic text-gray-900 dark:text-secondary-100 text-5xl md:text-7xl leading-tight tracking-tighter"
          >
            {counter.value}
          </span>
          <span className="text-xl font-normal text-gray-600 dark:text-secondary-200">
            {story.metricContext}
          </span>
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <p className="text-xl font-light leading-relaxed text-gray-700 dark:text-secondary-100">
          {story.description}
        </p>
        {story.videoLink && (
          <a
            href={story.videoLink.href}
            className="flex items-center gap-1 mt-3 text-sm font-medium text-primary hover:text-primary-300 transition-colors duration-200"
          >
            {story.videoLink.label} →
            <ArrowUpRight className="w-5 h-5" />
          </a>
        )}
      </div>
    </div>
  );
}

export function DeliveredValue({
  id,
  label,
  title,
  stories,
}: DeliveredValueProps) {
  return (
    <section id={id} className="bg-white dark:bg-dark py-40">
      <div className="relative mx-auto w-full max-w-container px-4 md:px-16 2xl:px-6 flex flex-col justify-start ">
        <div className="max-w-900 mb-20">
          <SectionHeader
            label={label}
            title={title}
            align="left"
          />
        </div>
        <div className="grid gap-16 md:grid-cols-3">
          {stories.map((story) => (
            <StoryCard key={story.client} story={story} />
          ))}
        </div>
      </div>
    </section>
  );
}
