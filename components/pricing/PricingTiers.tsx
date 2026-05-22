import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { Button } from "@/components/shared/Button";
import { SpotlightCard } from "@/components/animations/SpotlightCard";
import { cn } from "@/lib/utils";

interface Tier {
  name: string;
  description?: string;
  priceMonthly: string;
  priceYearly?: string;
  interval?: string;
  features: string[];
  ctaText?: string;
  ctaLink?: string;
  highlighted?: boolean;
  badge?: string;
}

interface PricingTiersProps {
  tiers: Tier[];
}

export function PricingTiers({ tiers }: PricingTiersProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto px-4 relative z-10">
      {tiers.map((tier, i) => (
        <AnimatedSection key={tier.name} delay={i * 0.1}>
          <SpotlightCard
            className={cn(
              "relative h-full flex flex-col bg-card border rounded-3xl p-8 card-hover",
              tier.highlighted
                ? "border-accent-purple/50 shadow-[0_0_40px_rgba(124,92,255,0.15)]"
                : "border-border"
            )}
          >
            {tier.badge && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-accent-purple to-accent-teal text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider">
                {tier.badge}
              </div>
            )}
            
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-foreground mb-2">{tier.name}</h3>
              {tier.description && (
                <p className="text-muted-foreground text-sm h-10">
                  {tier.description}
                </p>
              )}
            </div>

            <div className="mb-8">
              <div className="flex items-baseline gap-1">
                <span className="text-4xl md:text-5xl font-extrabold text-foreground">
                  {tier.priceMonthly}
                </span>
                <span className="text-muted-foreground font-medium">
                  {tier.interval}
                </span>
              </div>
            </div>

            <div className="flex-1">
              <ul className="space-y-4 mb-8">
                {tier.features.map((feature, j) => (
                  <li key={j} className="flex items-start gap-3 text-sm text-foreground/80">
                    <span className="text-accent-teal flex-shrink-0 mt-0.5">✓</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <Button
              href={tier.ctaLink || "/contact"}
              variant={tier.highlighted ? "primary" : "secondary"}
              className="w-full"
            >
              {tier.ctaText || "Get Started"}
            </Button>
          </SpotlightCard>
        </AnimatedSection>
      ))}
    </div>
  );
}
