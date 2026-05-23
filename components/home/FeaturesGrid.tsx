"use client";

import { AnimatedSection } from "@/components/shared/AnimatedSection";

interface Feature {
  icon: string | React.ReactNode;
  title: string;
  description: string;
}

interface FeaturesGridProps {
  headline?: string;
  tagline?: string;
  features?: Feature[];
}

export function FeaturesGrid({ headline, tagline, features: _features }: FeaturesGridProps) {
  const displayHeadline = headline || "Cultivating Clarity";
  const displaySubtitle = tagline || "We designed LexiLift to feel less like a tool and more like a helpful librarian who understands your team&apos;s unique language.";

  return (
    <section className="relative py-20 md:py-28 px-6 max-w-7xl mx-auto bg-surface" id="platform">
      {/* Header */}
      <AnimatedSection>
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-[38px] font-serif font-semibold text-on-surface mb-4">
            {displayHeadline}
          </h2>
          <p className="text-sm md:text-[15px] leading-relaxed text-on-surface-variant/80 font-sans">
            {displaySubtitle}
          </p>
        </div>
      </AnimatedSection>

      {/* Asymmetric Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
        
        {/* Card 1: Seamless Collection (Wide, 2 cols on desktop) */}
        <AnimatedSection className="lg:col-span-2" delay={0.1}>
          <div className="bg-white border border-outline-variant/35 rounded-3xl p-8 md:p-10 shadow-[0_2px_8px_rgba(27,28,26,0.02)] h-full flex flex-col md:flex-row justify-between items-start md:items-center gap-8 group hover:border-primary/40 hover:shadow-[0_4px_16px_rgba(27,28,26,0.04)] transition-all duration-300">
            <div className="flex-1 space-y-5">
              {/* Badge Icon */}
              <div className="w-10 h-10 rounded-full bg-[#e8f0eb] flex items-center justify-center text-primary group-hover:scale-105 transition-transform duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </div>
              <div className="space-y-2.5">
                <h3 className="text-xl font-serif font-bold text-on-surface tracking-tight">
                  1. Seamless Collection
                </h3>
                <p className="text-on-surface-variant/85 leading-relaxed text-sm max-w-md font-sans">
                  Connect your existing tools—Slack, Notion, Drive—and let LexiLift gently absorb the context of your daily work without disruption.
                </p>
              </div>
            </div>
            
            {/* Schematic mock graphic on the right */}
            <div className="w-full md:w-auto flex justify-center flex-shrink-0">
              <div className="flex flex-col gap-2 bg-[#f4f3ef] border border-outline-variant/30 rounded-2xl p-5.5 w-full max-w-[220px] md:w-[200px] shadow-[inset_0_1px_3px_rgba(0,0,0,0.01)]">
                <div className="h-1.5 w-3/4 bg-[#dbdad6] rounded-full" />
                <div className="h-1.5 w-full bg-[#dbdad6] rounded-full" />
                <div className="h-1.5 w-5/6 bg-[#dbdad6] rounded-full" />
                <div className="h-1.5 w-1/2 bg-[#dbdad6] rounded-full" />
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Card 2: Contextual Synthesis (Narrow, 1 col) */}
        <AnimatedSection className="lg:col-span-1" delay={0.2}>
          <div className="bg-white border border-outline-variant/35 rounded-3xl p-8 md:p-10 shadow-[0_2px_8px_rgba(27,28,26,0.02)] h-full flex flex-col justify-between gap-8 group hover:border-primary/40 hover:shadow-[0_4px_16px_rgba(27,28,26,0.04)] transition-all duration-300">
            <div className="space-y-5">
              {/* Badge Icon */}
              <div className="w-10 h-10 rounded-full bg-[#fcede8] flex items-center justify-center text-secondary group-hover:scale-105 transition-transform duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 6v6l4 2" />
                </svg>
              </div>
              <div className="space-y-2.5">
                <h3 className="text-xl font-serif font-bold text-on-surface tracking-tight">
                  2. Contextual Synthesis
                </h3>
                <p className="text-on-surface-variant/85 leading-relaxed text-sm font-sans">
                  Our AI doesn&apos;t just index; it understands. It links related concepts across projects to build a holistic wisdom map.
                </p>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Card 3: Natural Inquiry (Narrow, 1 col) */}
        <AnimatedSection className="lg:col-span-1" delay={0.3}>
          <div className="bg-white border border-outline-variant/35 rounded-3xl p-8 md:p-10 shadow-[0_2px_8px_rgba(27,28,26,0.02)] h-full flex flex-col justify-between gap-8 group hover:border-primary/40 hover:shadow-[0_4px_16px_rgba(27,28,26,0.04)] transition-all duration-300">
            <div className="space-y-5">
              {/* Badge Icon */}
              <div className="w-10 h-10 rounded-full bg-[#f4f3ef] flex items-center justify-center text-[#5f5c52] group-hover:scale-105 transition-transform duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
              </div>
              <div className="space-y-2.5">
                <h3 className="text-xl font-serif font-bold text-on-surface tracking-tight">
                  3. Natural Inquiry
                </h3>
                <p className="text-on-surface-variant/85 leading-relaxed text-sm font-sans">
                  Ask questions in plain English. LexiLift responds with the nuanced clarity of a mentor, not just a search engine.
                </p>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Card 4: Shared Evolution (Wide, 2 cols on desktop, Forest Green) */}
        <AnimatedSection className="lg:col-span-2" delay={0.4}>
          <div className="bg-primary border border-primary/20 rounded-3xl p-8 md:p-10 shadow-[0_4px_12px_rgba(66,99,79,0.05)] h-full flex flex-col md:flex-row justify-between items-start md:items-center gap-8 group hover:shadow-[0_6px_20px_rgba(66,99,79,0.1)] transition-all duration-300">
            <div className="flex-1 space-y-5">
              {/* Badge Icon (White borders) */}
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white group-hover:scale-105 transition-transform duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </div>
              <div className="space-y-2.5">
                <h3 className="text-xl font-serif font-bold text-white tracking-tight">
                  4. Shared Evolution
                </h3>
                <p className="text-white/80 leading-relaxed text-sm max-w-md font-sans">
                  As your team grows, LexiLift evolves with you, ensuring that onboarding is instant and no critical insight is ever lost to turnover.
                </p>
              </div>
            </div>
            
            {/* White pill CTA button on the right */}
            <div className="w-full md:w-auto flex-shrink-0">
              <a
                href="/contact"
                className="inline-block text-center bg-white text-primary hover:bg-[#eae8e4] px-6 py-3 rounded-full text-xs font-semibold whitespace-nowrap shadow-sm hover:shadow transition-all duration-300 cursor-pointer w-full md:w-auto"
              >
                Explore Collaborative Hub
              </a>
            </div>
          </div>
        </AnimatedSection>

      </div>
    </section>
  );
}
