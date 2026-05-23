"use client";

import { motion, Variants, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import { useEffect } from "react";
import dynamic from "next/dynamic";
import { GradientOrbs } from "@/components/animations/GradientOrbs";
import { MeshGradient } from "@/components/animations/MeshGradient";
import { NoiseOverlay } from "@/components/animations/NoiseOverlay";
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
  const yBackgroundFast = useTransform(scrollY, [0, 1000], [0, 600]);
  const yBackgroundSlow = useTransform(scrollY, [0, 1000], [0, 200]);

  // Mouse follow glow state
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  // useSpring gives it that "slow, fluid follow" feel
  const smoothX = useSpring(mouseX, { damping: 40, stiffness: 50, mass: 2 });
  const smoothY = useSpring(mouseY, { damping: 40, stiffness: 50, mass: 2 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Offset by half the width/height of the glow (500px/2 = 250) to center it
      mouseX.set(e.clientX - 250);
      mouseY.set(e.clientY - 250);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

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
      <NoiseOverlay />
      
      {/* Deep parallax mesh gradient */}
      <motion.div style={{ y: yBackgroundFast }} className="absolute inset-0 z-0">
        <MeshGradient />
      </motion.div>

      {/* Slower parallax elements */}
      <motion.div style={{ y: yBackgroundSlow }} className="absolute inset-0 z-[1] pointer-events-none">
        <GradientOrbs />
        <ParticleNetwork className="z-[1]" />
        
        {/* Slow mouse-follow glow */}
        <motion.div
          className="fixed w-[500px] h-[500px] rounded-full pointer-events-none z-[2]"
          style={{
            background: "radial-gradient(circle, rgba(124,92,255,0.15) 0%, transparent 70%)",
            filter: "blur(50px)",
            x: smoothX,
            y: smoothY,
            left: 0,
            top: 0,
          }}
        />
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
          className="relative text-4xl md:text-5xl lg:text-7xl font-extrabold leading-tight mb-6"
        >
          {/* Glowing aura behind the text */}
          <motion.div 
            className="absolute top-1/2 left-1/2 w-[120%] h-[150%] rounded-full mix-blend-screen pointer-events-none -z-10"
            style={{
              background: "conic-gradient(from 0deg, var(--color-accent-teal), var(--color-accent-purple), var(--color-accent-pink), var(--color-accent-teal))",
              filter: "blur(60px)",
              opacity: 0.15,
              x: "-50%",
              y: "-50%"
            }}
            animate={{ 
              rotate: [0, 360],
              scale: [1, 1.05, 1] 
            }}
            transition={{ 
              rotate: { duration: 15, repeat: Infinity, ease: "linear" },
              scale: { duration: 4, repeat: Infinity, ease: "easeInOut" }
            }}
          />

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
            {subtitle.includes("Instant answers") ? (
              <>
                {subtitle.split("Instant answers")[0]}
                <span className="gradient-text font-semibold">Instant answers</span>
                {subtitle.split("Instant answers")[1]}
              </>
            ) : subtitle.includes("Instant Answers") ? (
              <>
                {subtitle.split("Instant Answers")[0]}
                <span className="gradient-text font-semibold">Instant Answers</span>
                {subtitle.split("Instant Answers")[1]}
              </>
            ) : (
              subtitle
            )}
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
