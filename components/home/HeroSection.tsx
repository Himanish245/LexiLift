"use client";

import { motion, Variants, useScroll, useTransform } from "framer-motion";
import dynamic from "next/dynamic";
import { GradientOrbs } from "@/components/animations/GradientOrbs";
import { Button } from "@/components/shared/Button";

const ParticleNetwork = dynamic(
  () => import("@/components/animations/ParticleNetwork").then((m) => m.ParticleNetwork),
  { ssr: false }
);

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
  highlight,
  subtitle,
  ctaPrimary,
  ctaSecondary,
}: HeroSectionProps) {
  const { scrollY } = useScroll();
  const yBackground = useTransform(scrollY, [0, 1000], [0, 400]);

  const stagger: Variants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.15 },
    },
  };

  const fadeUp: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24">
      {/* Background layers */}
      <motion.div style={{ y: yBackground }} className="absolute inset-0 z-0">
        <GradientOrbs />
        <ParticleNetwork className="z-[1]" />
      </motion.div>

      {/* Content */}
      <motion.div
        variants={stagger}
        initial="hidden"
        animate="visible"
        className="relative z-10 text-center max-w-4xl mx-auto px-4 flex flex-col items-center"
      >
        <motion.div 
          variants={fadeUp}
          className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full glass-card mb-8 group hover:border-[var(--color-accent-purple)] transition-all duration-300 cursor-default"
        >
          <svg xmlns="http://www.w3.org/2000/svg" 
               width="1.2em" 
               height="1.2em" 
               viewBox="0 0 24 24" 
               fill="none" 
               stroke="currentColor" 
               strokeWidth="2" 
               strokeLinecap="round" 
               strokeLinejoin="round"
               className="text-[var(--color-accent-teal)] group-hover:rotate-12 transition-transform duration-300 flex-shrink-0">
            <path d="m11 17 2 2a1 1 0 1 0 3-3"/>
            <path d="m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 1 0 1 1-3-3l2.81-2.81a5.79 5.79 0 0 1 7.06-.87l.47.28a2 2 0 0 0 1.42.25L21 4"/>
            <path d="m21 3 1 11h-2"/>
            <path d="M3 3 2 14l6.5 6.5a1 1 0 1 0 3-3"/>
            <path d="M3 4h8"/>
          </svg>
          <span className="text-sm md:text-[20px] font-medium text-slate-200 leading-none">
            Join thousands of modern teams building a faster, smarter workplace.
          </span>
        </motion.div>

        {tagline && (
          <motion.p
            variants={fadeUp}
            className="text-xs tracking-[0.2em] uppercase text-accent-purple mb-4"
          >
            {tagline}
          </motion.p>
        )}
        <motion.h1
          variants={fadeUp}
          className="text-4xl md:text-5xl lg:text-7xl font-extrabold leading-tight mb-6"
        >
          {title}
          {highlight && (
            <>
              <br />
              <span className="gradient-text">{highlight}</span>
            </>
          )}
        </motion.h1>
        {subtitle && (
          <motion.p
            variants={fadeUp}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10"
          >
            {subtitle}
          </motion.p>
        )}
        <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 justify-center">
          {ctaPrimary && (
            <Button href={ctaPrimary.href} size="lg" isExternal={ctaPrimary.isExternal}>
              {ctaPrimary.label} →
            </Button>
          )}
          {ctaSecondary && (
            <Button href={ctaSecondary.href} variant="secondary" size="lg" isExternal={ctaSecondary.isExternal}>
              {ctaSecondary.label}
            </Button>
          )}
        </motion.div>
      </motion.div>
    </section>
  );
}
