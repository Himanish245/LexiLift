"use client";

import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { Button } from "@/components/shared/Button";

interface CTASectionProps {
  title?: string;
  subtitle?: string;
  button?: { label: string; href: string; isExternal?: boolean };
}

export function CTASection({ title, subtitle, button }: CTASectionProps) {
  const displayTitle = title || "Ready to cultivate your team's wisdom?";
  const displaySubtitle = subtitle || "Join over 500+ forward-thinking teams using LexiLift to transform their digital environment into a sanctuary for thought.";
  const displayButton = button || { label: "Get Started for Free", href: "/contact" };

  return (
    <section className="py-20 md:py-28 px-6 bg-surface">
      <AnimatedSection className="max-w-5xl mx-auto text-center bg-gradient-to-tr from-[#eae8e4]/60 via-[#f4f3ef] to-[#fcede8] border border-outline-variant/35 p-12 md:p-20 rounded-[2.5rem] relative overflow-hidden shadow-sm">
        <div className="relative z-10 flex flex-col items-center">
          
          {/* Title */}
          <h2 className="text-3xl md:text-[40px] font-serif font-semibold leading-tight text-on-surface mb-5 max-w-xl">
            {displayTitle}
          </h2>

          {/* Subtitle */}
          <p className="text-sm md:text-[15px] leading-relaxed text-on-surface-variant/85 max-w-xl mx-auto mb-8 font-sans">
            {displaySubtitle}
          </p>

          {/* Buttons */}
          <div className="flex flex-wrap gap-4 justify-center items-center">
            <Button
              href={displayButton.href}
              size="md"
              isExternal={displayButton.isExternal}
              className="bg-primary text-on-primary hover:bg-primary-container px-7 py-3 rounded-full text-sm font-semibold shadow-sm"
            >
              {displayButton.label}
            </Button>
            
            <Button
              href="/contact"
              variant="secondary"
              size="md"
              className="bg-white border border-outline-variant/60 text-on-surface hover:bg-surface-container-low px-7 py-3 rounded-full text-sm font-semibold shadow-sm"
            >
              Book a Demo
            </Button>
          </div>

          {/* Small Note */}
          <p className="text-[12px] text-on-surface-variant/50 mt-4.5 font-medium font-sans">
            No credit card required. 14-day free trial.
          </p>
          
        </div>
      </AnimatedSection>
    </section>
  );
}
