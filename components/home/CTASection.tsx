"use client";

import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { Button } from "@/components/shared/Button";

interface CTASectionProps {
  title?: string;
  highlight?: string;
  subtitle?: string;
  button?: { label: string; href: string; isExternal?: boolean };
}

export function CTASection({ title, subtitle, button }: CTASectionProps) {
  const displayTitle = title || "Ready to lift your perspective?";
  const displaySubtitle = subtitle || "Join 50,000+ teams who have found their digital sanctuary with LexiLift.";
  const displayButton = button || { label: "Start Your Journey", href: "/contact" };

  return (
    <section className="py-20 md:py-28 px-6 bg-surface">
      <AnimatedSection className="max-w-5xl mx-auto text-center bg-[#eae8e4] p-16 md:p-24 rounded-[2.5rem] relative overflow-hidden shadow-sm">
        <div className="relative z-10 flex flex-col items-center">
          
          {/* Title */}
          <h2 className="text-3xl md:text-4xl lg:text-[40px] font-serif font-bold leading-tight text-on-surface mb-5 max-w-2xl">
            {displayTitle}
          </h2>

          {/* Subtitle */}
          <p className="text-sm md:text-[15px] leading-relaxed text-on-surface-variant/90 max-w-xl mx-auto mb-10 font-sans">
            {displaySubtitle}
          </p>

          {/* Buttons */}
          <div className="flex flex-wrap gap-4 justify-center items-center">
            <Button
              href={displayButton.href}
              size="md"
              isExternal={displayButton.isExternal}
              className="bg-[#36664d] text-white hover:bg-[#2b513d] px-8 py-3.5 rounded-full text-sm font-semibold shadow-sm transition-colors border-none"
            >
              Start Your Journey
            </Button>
            
            <Button
              href="/contact"
              variant="secondary"
              size="md"
              className="bg-transparent border border-[#36664d] text-[#36664d] hover:bg-[#36664d]/5 px-8 py-3.5 rounded-full text-sm font-semibold shadow-sm transition-colors"
            >
              Talk to a Human
            </Button>
          </div>
        </div>
      </AnimatedSection>
    </section>
  );
}
