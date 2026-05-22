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
  return (
    <section className="py-20 md:py-32 px-4 max-w-7xl mx-auto">
      <AnimatedSection>
        <SectionHeader
          tagline={tagline || "Features"}
          title={headline || "Everything You Need"}
          taglineColor="teal"
        />
      </AnimatedSection>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {features.map((feature, i) => (
          <AnimatedSection key={feature.title} delay={i * 0.1}>
            <SpotlightCard className="bg-card border border-border rounded-2xl p-6 md:p-8 card-hover group h-full">
              <div className="text-3xl mb-4 group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold mb-2 text-foreground">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </SpotlightCard>
          </AnimatedSection>
        ))}
      </div>
    </section>
  );
}
