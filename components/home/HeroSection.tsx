"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/shared/Button";

interface HeroSectionProps {
  tagline?: string;
  title: string;
  highlight?: string;
  subtitle?: string;
  ctaPrimary?: { label: string; href: string; isExternal?: boolean };
  ctaSecondary?: { label: string; href: string; isExternal?: boolean };
}

export function HeroSection({
  tagline,
  title,
  highlight: _highlight,
  subtitle,
  ctaPrimary,
  ctaSecondary,
}: HeroSectionProps) {
  // Mock fallback values corresponding to the screenshot design
  const displayTagline = tagline || "Intelligent Knowledge Hub";
  const displayTitle = title || "Transform Your Team's Knowledge into Shared Wisdom.";
  const displaySubtitle = subtitle || "The human-centric AI that turns scattered documentation into a living digital sanctuary for your organization's collective intelligence.";
  const displayCtaPrimary = ctaPrimary || { label: "Start Free Trial", href: "/contact" };
  const displayCtaSecondary = ctaSecondary || { label: "Watch Story", href: "/contact" };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-28 pb-16 bg-surface">
      <div className="max-w-7xl mx-auto px-6 md:px-8 w-full z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Copy & Actions */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            className="lg:col-span-6 flex flex-col items-start text-left"
          >
            {/* Tagline Pill */}
            <div className="inline-block bg-[#f4f3ef] border border-outline-variant/35 text-on-surface-variant/80 px-4.5 py-1.5 rounded-full text-[13px] font-medium mb-8">
              {displayTagline}
            </div>

            {/* Headline */}
            <h1 className="text-4xl md:text-5xl lg:text-[56px] font-serif font-semibold text-on-surface leading-[1.12] tracking-tight mb-6">
              {displayTitle}
            </h1>

            {/* Subtext */}
            <p className="text-base md:text-lg text-on-surface-variant/90 max-w-xl mb-10 leading-relaxed font-sans">
              {displaySubtitle}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4">
              <Button
                href={displayCtaPrimary.href}
                size="lg"
                isExternal={displayCtaPrimary.isExternal}
                className="bg-primary text-on-primary hover:bg-primary-container text-[15px] font-semibold px-8 py-3.5 rounded-full shadow-sm"
              >
                {displayCtaPrimary.label}
              </Button>
              
              <Button
                href={displayCtaSecondary.href}
                variant="secondary"
                size="lg"
                isExternal={displayCtaSecondary.isExternal}
                className="bg-transparent border border-outline-variant/60 text-on-surface hover:bg-surface-container-low text-[15px] font-semibold px-6 py-3.5 rounded-full flex items-center gap-2"
              >
                {/* Play Icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-on-surface-variant/80"
                >
                  <polygon points="6 3 20 12 6 21 6 3" />
                </svg>
                {displayCtaSecondary.label}
              </Button>
            </div>
          </motion.div>

          {/* Right Column: Visual Showcase */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1], delay: 0.1 }}
            className="lg:col-span-6 flex justify-center items-center relative py-12"
          >
            {/* The Picture Frame & Image */}
            <div className="relative w-full max-w-[500px] aspect-[4/3] bg-[#758474] rounded-[2.5rem] rotate-[3.5deg] shadow-lg flex items-center justify-center p-5 group hover:rotate-[1.5deg] transition-all duration-500 ease-out">
              <div className="relative w-full h-full -rotate-[3.5deg] group-hover:-rotate-[1.5deg] transition-all duration-500 ease-out rounded-[1.8rem] overflow-hidden shadow-inner">
                <Image
                  src="/team_meeting.png"
                  alt="Team collaborating in a warm, modern office"
                  fill
                  sizes="(max-width: 768px) 100vw, 500px"
                  className="object-cover"
                  priority
                />
              </div>

              {/* Overlapping Insight Generated Widget */}
              <div className="absolute -bottom-6 -left-6 bg-white border border-outline-variant/40 rounded-2xl p-4 shadow-xl max-w-[250px] z-20 -rotate-[3.5deg] group-hover:-rotate-[1.5deg] transition-all duration-500 ease-out flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <div className="flex items-center justify-center w-6 h-6 rounded-full bg-[#fcede8] text-secondary">
                    {/* Sparkle SVG Icon */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="13"
                      height="13"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
                    </svg>
                  </div>
                  <span className="text-[13px] font-semibold text-on-surface leading-none">Insight Generated</span>
                </div>
                <p className="text-[11.5px] leading-relaxed text-on-surface-variant/90 italic font-serif">
                  &ldquo;The project history indicates a strong preference for iterative design...&rdquo;
                </p>
              </div>
            </div>

          </motion.div>
        </div>
      </div>
    </section>
  );
}
