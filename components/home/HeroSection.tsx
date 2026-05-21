"use client";

import { motion } from "framer-motion";
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
  const stagger = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.15 },
    },
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24">
      {/* Background layers */}
      <GradientOrbs />
      <ParticleNetwork className="z-[1]" />

      {/* Content */}
      <motion.div
        variants={stagger}
        initial="hidden"
        animate="visible"
        className="relative z-10 text-center max-w-4xl mx-auto px-4"
      >
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
