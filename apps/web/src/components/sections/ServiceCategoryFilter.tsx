"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "../ui/Button";

const CATEGORIES = [
  { value: "all", label: "All Services" },
  { value: "cloud-services", label: "Cloud Services" },
  { value: "data-ai", label: "Data & AI" },
  { value: "digital-engineering", label: "Digital Engineering" },
  { value: "modernization", label: "Modernization" },
];

export function ServiceCategoryFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeCategory = searchParams.get("category") || "all";

  const handleCategoryChange = (category: string) => {
    if (category === "all") {
      router.push("/services");
    } else {
      router.push(`/services?category=${category}`);
    }
  };

  return (
    <div className="sticky top-0 z-30 bg-gray-50 dark:bg-dark backdrop-blur-sm bg-opacity-95 dark:bg-opacity-95">
      <div className="mx-auto w-full max-w-container px-4 md:px-16 2xl:px-6 py-6 md:py-8">
        <div className="flex flex-wrap gap-3 md:gap-4">
          {CATEGORIES.map((category) => (
            <Button
              key={category.value}
              onClick={() => handleCategoryChange(category.value)}
              variant={activeCategory === category.value ? "primary" : "outline"}
              className={`px-6 py-3 md:px-8 md:py-4 rounded-lg font-medium transition-all duration-200 ${
                activeCategory === category.value
                  ? ""
                  : "bg-white dark:bg-secondary-800/50 text-gray-900 dark:text-secondary-100 border !border-secondary-600 !dark:border-secondary-100 hover:bg-gray-50 dark:hover:bg-secondary-800"
              }`}
            >
              {category.label}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
