import { SectionHeader } from "@/components/shared/SectionHeader";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { SpotlightCard } from "@/components/animations/SpotlightCard";

interface Feature {
  icon: string;
  title: string;
  description: string;
}

interface FeaturesGridProps {
  headline?: string;
  tagline?: string;
  features: Feature[];
}

export function FeaturesGrid({ headline, tagline, features }: FeaturesGridProps) {
  // Add gradient highlight to 'scale knowledge' if present
  const formattedHeadline = headline && headline.includes("scale knowledge") ? (
    <>
      {headline.split("scale knowledge")[0]}
      <span className="gradient-text font-extrabold">scale knowledge</span>
      {headline.split("scale knowledge")[1]}
    </>
  ) : (
    headline || "Everything You Need"
  );

  return (
    <section className="relative py-20 md:py-32 px-4 max-w-7xl mx-auto">
      {/* Subtle Background Glow for the whole section */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-[800px] bg-[var(--color-accent-teal)] opacity-[0.03] blur-[100px] rounded-[100%] pointer-events-none -z-10" />

      <AnimatedSection>
        <SectionHeader
          tagline={tagline || "Features"}
          title={formattedHeadline}
          taglineColor="teal"
        />
      </AnimatedSection>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {features.map((feature, i) => (
          <AnimatedSection key={feature.title} delay={i * 0.1}>
            <SpotlightCard className="glass-card rounded-[24px] p-8 card-hover group h-full bg-[var(--color-card)]/40 border-white/5 relative overflow-hidden">
              <div className="relative z-10">
                <div className="w-14 h-14 mb-6 rounded-2xl bg-gradient-to-br from-white/10 to-transparent flex items-center justify-center border border-white/10 shadow-[0_0_20px_rgba(13,148,136,0.1)] group-hover:shadow-[0_0_30px_rgba(13,148,136,0.25)] group-hover:border-[var(--color-accent-teal)]/30 transition-all duration-500">
                  <div className="text-2xl group-hover:scale-110 group-hover:-rotate-6 transition-transform duration-500">
                    {feature.icon}
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-3 text-foreground tracking-tight">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed text-sm">
                  {feature.description}
                </p>
              </div>
            </SpotlightCard>
          </AnimatedSection>
        ))}
      </div>
    </section>
  );
}
