import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { Button } from "@/components/shared/Button";
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
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto relative z-10 items-stretch">
      {tiers.map((tier, i) => (
        <AnimatedSection key={tier.name} delay={i * 0.1}>
          <div
            className={cn(
              "relative h-full flex flex-col border rounded-[2rem] p-8 md:p-10 transition-all duration-300",
              tier.highlighted
                ? "bg-[#eae8e4] border-outline-variant shadow-sm z-10 transform md:-translate-y-2"
                : "bg-white border-outline-variant/40 shadow-sm"
            )}
          >
            {tier.badge && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#8a5a44] text-white text-[10px] font-semibold px-4 py-1.5 rounded-full uppercase tracking-wider shadow-sm">
                {tier.badge}
              </div>
            )}
            
            <div className="mb-6">
              <h3 className="text-xl md:text-2xl font-serif font-bold text-on-surface mb-2">{tier.name}</h3>
              {tier.description && (
                <p className="text-on-surface-variant/80 text-sm h-10 font-medium">
                  {tier.description}
                </p>
              )}
            </div>

            <div className="mb-8">
              <div className="flex items-baseline gap-1">
                <span className={cn(
                  "text-5xl md:text-6xl font-serif font-semibold tracking-tight",
                  tier.highlighted ? "text-[#36664d]" : "text-on-surface"
                )}>
                  {tier.priceMonthly}
                </span>
                <span className="text-on-surface-variant/70 font-medium text-sm">
                  {tier.interval}
                </span>
              </div>
            </div>

            <div className="flex-1 mb-10">
              <ul className="space-y-4">
                {tier.features.map((feature, j) => (
                  <li key={j} className="flex items-start gap-3 text-sm text-on-surface-variant/90 font-medium">
                    <div className="mt-0.5 w-5 h-5 rounded-full border border-[#36664d] text-[#36664d] flex items-center justify-center flex-shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                    </div>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <Button
              href={tier.ctaLink || "/contact"}
              variant={tier.highlighted ? "primary" : "secondary"}
              className={cn(
                "w-full rounded-full py-6 font-semibold shadow-sm",
                tier.highlighted 
                  ? "bg-[#8a5a44] text-white hover:bg-[#724a38] border-none" 
                  : "bg-transparent border border-[#36664d] text-on-surface hover:bg-[#36664d]/5"
              )}
            >
              {tier.ctaText || "Get Started"}
            </Button>
          </div>
        </AnimatedSection>
      ))}
    </div>
  );
}
