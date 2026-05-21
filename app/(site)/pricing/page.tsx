import type { Metadata } from "next";
import { client } from "@/sanity/lib/client";
import { pricingPageQuery } from "@/sanity/lib/queries";
import { PricingTiers } from "@/components/pricing/PricingTiers";
import { FAQSection } from "@/components/pricing/FAQSection";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { GradientOrbs } from "@/components/animations/GradientOrbs";
import { AnimatedSection } from "@/components/shared/AnimatedSection";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const data = await client.fetch(pricingPageQuery);
  return {
    title: data?.seo?.metaTitle || "Pricing",
    description: data?.seo?.metaDescription || "Simple, transparent pricing for teams of all sizes.",
  };
}

export default async function PricingPage() {
  const data = await client.fetch(pricingPageQuery);

  const defaultTiers = [
    {
      name: "Starter",
      description: "Perfect for small teams getting started",
      priceMonthly: "$0",
      interval: "/mo",
      features: ["Up to 3 team members", "1,000 document queries", "Community support"],
      ctaText: "Start Free",
      ctaLink: "/contact",
    },
    {
      name: "Pro",
      description: "For growing teams that need more power",
      priceMonthly: "$49",
      interval: "/mo",
      features: ["Unlimited team members", "Unlimited queries", "Priority email support", "Advanced analytics"],
      ctaText: "Start Free Trial",
      ctaLink: "/contact",
      highlighted: true,
      badge: "MOST POPULAR",
    },
    {
      name: "Enterprise",
      description: "Custom solutions for large organizations",
      priceMonthly: "Custom",
      interval: "",
      features: ["Custom deployments", "Dedicated account manager", "SLA guarantees", "Custom integrations"],
      ctaText: "Contact Sales",
      ctaLink: "/contact",
    },
  ];

  return (
    <>
      <section className="relative pt-32 pb-20 overflow-hidden">
        <GradientOrbs />
        <div className="relative z-10 max-w-7xl mx-auto px-4">
          <AnimatedSection>
            <SectionHeader
              title={data?.headline || "Simple, Transparent Pricing"}
              subtitle={data?.subtitle || "Choose the right plan for your team's knowledge needs."}
              tagline="Pricing"
            />
          </AnimatedSection>
          <PricingTiers tiers={data?.tiers || defaultTiers} />
        </div>
      </section>
      <FAQSection faqs={data?.faqs || []} />
    </>
  );
}
