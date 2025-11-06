"use client";

import { useState } from "react";
import type { ReactNode } from "react";
import { Modal } from "@/components/ui/Modal";
import { Button } from "../ui/Button";
import { ArrowRight } from "lucide-react";

interface ContactCTAProps {
  title: ReactNode;
  description: string;
  ctaLabel: string;
}

export function ContactCTA({ title, description, ctaLabel }: ContactCTAProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <section className="bg-[url('/images/background02.png')] dark:bg-[url('/images/background.png')] bg-cover bg-bottom-left py-40" id="contact">
        <div className="w-full max-w-container mx-auto px-16 2xl:px-6 relative flex items-center justify-between">
          <h2 className="!font-metrophobic font-normal text-5xl md:text-7xl leading-tight tracking-tighter text-gray-900 dark:text-secondary-100 mb-6">
            {title}
          </h2>
          <div>
            <p className="text-[22px] font-light leading-relaxed text-gray-700 dark:text-secondary-200 max-w-prose mb-12">
              {description}
            </p>
            <Button
              onClick={() => setIsModalOpen(true)}
              className="gap-2 hover:gap-4 transition-all duration-300"
            >
              {ctaLabel}
              <ArrowRight className="w-5 h-5" />
            </Button>
            
          </div>
        </div>
      </section>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
