import { SectionHeader } from "@/components/shared/SectionHeader";
import { AnimatedSection } from "@/components/shared/AnimatedSection";

interface Step {
  title: string;
  description: string;
  icon: string;
}

interface HowItWorksProps {
  headline?: string;
  steps: Step[];
}

export function HowItWorks({ headline, steps }: HowItWorksProps) {
  return (
    <section className="py-20 md:py-32 px-4 relative">
      <div className="max-w-7xl mx-auto">
        <AnimatedSection>
          <SectionHeader
            tagline="How It Works"
            title={headline || "Three Steps to Smarter Knowledge"}
            taglineColor="purple"
          />
        </AnimatedSection>
        <div className="flex flex-col md:flex-row gap-8 md:gap-4 items-center justify-center">
          {steps.map((step, i) => (
            <AnimatedSection key={step.title} delay={i * 0.15} className="flex items-center gap-4 md:gap-0">
              <div className="text-center flex-1 glass-card p-6 rounded-2xl card-hover">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[var(--color-accent-purple)] to-[var(--color-accent-teal)] flex items-center justify-center mx-auto mb-4 text-xl font-bold text-white shadow-[0_0_20px_rgba(0,212,170,0.4)]">
                  {i + 1}
                </div>
                <div className="text-3xl mb-3">{step.icon}</div>
                <h3 className="text-lg font-semibold mb-2 text-foreground">{step.title}</h3>
                <p className="text-muted-foreground text-sm max-w-[200px] mx-auto">{step.description}</p>
              </div>
              {i < steps.length - 1 && (
                <div className="hidden md:block text-muted-foreground/30 text-2xl mx-4">→</div>
              )}
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
