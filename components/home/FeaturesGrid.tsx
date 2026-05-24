"use client";

import { AnimatedSection } from "@/components/shared/AnimatedSection";
import Image from "next/image";

export function FeaturesGrid() {
  return (
    <section className="relative py-20 md:py-28 px-6 max-w-7xl mx-auto bg-surface" id="platform">
      {/* Header */}
      <AnimatedSection>
        <div className="text-center mb-12 max-w-2xl mx-auto flex flex-col items-center">
          <div className="inline-flex items-center gap-2 bg-[#e8f0eb] text-[#36664d] px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-8">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" /></svg>
            Elevating Digital Connection
          </div>
          <h2 className="text-4xl md:text-5xl font-serif font-semibold text-on-surface mb-6 leading-tight">
            Features designed for <span className="text-[#36664d]">humanity</span> and clarity.
          </h2>
          <p className="text-base md:text-lg text-on-surface-variant/80 font-sans max-w-xl">
            We believe that technology should feel like a bridge, not a barrier. Discover how LexiLift fosters deep understanding through context and warmth.
          </p>
        </div>
      </AnimatedSection>

      {/* Hero Banner */}
      <AnimatedSection delay={0.1}>
        <div className="relative w-full aspect-[2/1] md:aspect-[2.5/1] rounded-[2.5rem] overflow-hidden mb-16 shadow-sm">
          <Image
            src="/abstract_hills_banner.png"
            alt="Abstract rolling hills"
            fill
            className="object-cover"
          />
        </div>
      </AnimatedSection>

      {/* 3 Value Props */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24">
        <AnimatedSection delay={0.2}>
          <div className="bg-white rounded-[2rem] p-8 md:p-10 shadow-sm border border-outline-variant/40 h-full">
            <div className="w-12 h-12 rounded-full bg-[#e8f0eb] text-[#36664d] flex items-center justify-center mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
            </div>
            <h3 className="text-xl font-serif font-bold text-on-surface mb-3">Absolute Clarity</h3>
            <p className="text-sm text-on-surface-variant/90 leading-relaxed">
              Eliminate the noise of digital clutter. Our interface prioritizes cognitive ease, surfacing exactly what you need when you need it.
            </p>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.3}>
          <div className="bg-white rounded-[2rem] p-8 md:p-10 shadow-sm border border-outline-variant/40 h-full">
            <div className="w-12 h-12 rounded-full bg-[#fcede8] text-[#a0735d] flex items-center justify-center mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
            </div>
            <h3 className="text-xl font-serif font-bold text-on-surface mb-3">Deep Connection</h3>
            <p className="text-sm text-on-surface-variant/90 leading-relaxed">
              Tools that encourage collaboration through empathy. Understand the sentiment behind the words for more meaningful team interactions.
            </p>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.4}>
          <div className="bg-white rounded-[2rem] p-8 md:p-10 shadow-sm border border-outline-variant/40 h-full">
            <div className="w-12 h-12 rounded-full bg-[#f4f3ef] text-[#5f5c52] flex items-center justify-center mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
            </div>
            <h3 className="text-xl font-serif font-bold text-on-surface mb-3">Pure Simplicity</h3>
            <p className="text-sm text-on-surface-variant/90 leading-relaxed">
              A digital sanctuary. No unnecessary steps, no hidden complexities. Just a fluid experience that moves at the pace of your thoughts.
            </p>
          </div>
        </AnimatedSection>
      </div>

      {/* Context-Aware Section */}
      <AnimatedSection delay={0.2}>
        <div className="bg-[#eae8e4] rounded-[2.5rem] p-8 md:p-16 mb-24 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="bg-white/80 backdrop-blur-sm rounded-[2rem] p-8 shadow-sm border border-white/50 space-y-6">
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-[#fcede8] text-[#a0735d] flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-xs font-bold font-serif">P</span>
              </div>
              <div className="bg-[#f4f3ef] p-4 rounded-2xl rounded-tl-none text-sm text-on-surface-variant/90">
                "I noticed your team often prefers brainstorming in the mornings. Should I reschedule the alignment meeting to honor that creative flow?"
              </div>
            </div>
            <div className="flex gap-4 justify-end">
              <div className="bg-[#e8f0eb] p-4 rounded-2xl rounded-tr-none text-sm text-[#36664d]">
                "That would be wonderful, thank you for noticing."
              </div>
              <div className="w-8 h-8 rounded-full bg-[#36664d] text-white flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-xs font-bold font-serif">A</span>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h4 className="text-[10px] font-bold tracking-widest uppercase text-[#a0735d] font-sans">
              Intelligent Empathy
            </h4>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-on-surface leading-tight">
              Context-Aware AI that <span className="text-[#a0735d]">Listens</span>
            </h2>
            <p className="text-sm text-on-surface-variant/90 leading-relaxed">
              LexiLift doesn't just process data; it understands team culture. By recognizing patterns in communication and energy, our AI acts as a gentle facilitator, ensuring that every voice is heard and every boundary is respected.
            </p>
            <ul className="space-y-3 pt-2">
              {[
                "Cultural Nuance Recognition",
                "Energy-Aware Scheduling",
                "Empathetic Summary Generation"
              ].map((item, idx) => (
                <li key={idx} className="flex items-center gap-3 text-sm text-on-surface-variant/90 font-medium">
                  <div className="w-5 h-5 rounded-full border border-[#36664d] text-[#36664d] flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  </div>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </AnimatedSection>

      {/* The Harmony of Productivity Grid */}
      <AnimatedSection delay={0.2}>
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-on-surface">
            The Harmony of Productivity
          </h2>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Mindful Focus */}
          <div className="lg:col-span-5 bg-white rounded-[2rem] p-8 md:p-10 shadow-sm border border-outline-variant/40 flex flex-col justify-between overflow-hidden min-h-[400px]">
            <div className="mb-8">
              <h3 className="text-2xl font-serif font-bold text-[#36664d] mb-4">Mindful Focus</h3>
              <p className="text-sm text-on-surface-variant/90 leading-relaxed">
                A workspace that breathes with you. When you enter focus mode, we gracefully silence non-essential notifications, creating a cocoon of productivity.
              </p>
            </div>
            <div className="relative w-full h-48 rounded-xl overflow-hidden mt-auto -mb-10 -mx-4 md:-mx-6 px-4 md:px-6 w-[calc(100%+2rem)] md:w-[calc(100%+3rem)]">
              <Image
                src="/laptop_desk.png"
                alt="Mindful focus workspace"
                fill
                className="object-cover object-top"
              />
            </div>
          </div>

          <div className="lg:col-span-7 flex flex-col gap-6">
            {/* Organic Categorization */}
            <div className="bg-[#f4f3ef] rounded-[2rem] p-8 md:p-10 shadow-sm border border-outline-variant/40 flex-1">
              <div className="flex gap-2 mb-6">
                <span className="bg-white/60 px-3 py-1 rounded-full text-xs font-semibold text-on-surface-variant/80">#Clarity</span>
                <span className="bg-[#fcede8] px-3 py-1 rounded-full text-xs font-semibold text-[#a0735d]">#Connection</span>
                <span className="bg-white/60 px-3 py-1 rounded-full text-xs font-semibold text-on-surface-variant/80">#Strategy</span>
              </div>
              <h3 className="text-2xl font-serif font-bold text-on-surface mb-3">Organic Categorization</h3>
              <p className="text-sm text-on-surface-variant/90 leading-relaxed">
                AI that tags content based on intent and emotion, not just keywords.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 flex-1">
              {/* Connect */}
              <div className="bg-[#8a5a44] rounded-[2rem] p-8 shadow-sm flex flex-col items-center justify-center text-center text-white min-h-[200px]">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mb-4"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" x2="15.42" y1="13.51" y2="17.49"/><line x1="15.41" x2="8.59" y1="6.51" y2="10.49"/></svg>
                <h3 className="text-xl font-serif font-bold mb-2">Connect</h3>
                <p className="text-xs text-white/80">Instant context for every call.</p>
              </div>

              {/* Private */}
              <div className="bg-[#36664d] rounded-[2rem] p-8 shadow-sm flex flex-col items-center justify-center text-center text-white min-h-[200px]">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mb-4"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>
                <h3 className="text-xl font-serif font-bold mb-2">Private</h3>
                <p className="text-xs text-white/80">Your thoughts are yours alone.</p>
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>
    </section>
  );
}
