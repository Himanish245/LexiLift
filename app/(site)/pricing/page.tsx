import type { Metadata } from "next";
import { sanityFetch } from "@/sanity/lib/live";
import { pricingPageQuery } from "@/sanity/lib/queries";
import { PricingTiers } from "@/components/pricing/PricingTiers";
import { FAQSection } from "@/components/pricing/FAQSection";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import Image from "next/image";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const { data } = await sanityFetch({ query: pricingPageQuery });
  return {
    title: data?.seo?.metaTitle || "Pricing",
    description: data?.seo?.metaDescription || "Simple, transparent pricing for teams of all sizes.",
  };
}

export default async function PricingPage() {
  const { data } = await sanityFetch({ query: pricingPageQuery });

  const defaultTiers = [
    {
      name: "Starter",
      description: "For focused individual thinkers.",
      priceMonthly: "$0",
      interval: "/month",
      features: ["Up to 1,000 thoughts tracked", "Standard AI Librarian", "Mobile & Desktop Sync"],
      ctaText: "Start Free",
      ctaLink: "/contact",
    },
    {
      name: "Pro",
      description: "Expand your cognitive reach.",
      priceMonthly: "$12",
      interval: "/month",
      features: ["Unlimited digital notes", "Priority \"Hyper-Recall\" AI", "Advanced semantic search", "PDF & Web Annotation"],
      ctaText: "Get Started",
      ctaLink: "/contact",
      highlighted: true,
      badge: "Most Preferred",
    },
    {
      name: "Enterprise",
      description: "For teams and high-output studios.",
      priceMonthly: "Custom",
      interval: "",
      features: ["Collaborative knowledge graphs", "Dedicated success partner", "On-premise deployment"],
      ctaText: "Contact Sales",
      ctaLink: "/contact",
    },
  ];

  return (
    <>
      <section className="relative pt-32 pb-24 overflow-hidden bg-surface">
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8">
          <AnimatedSection className="text-center max-w-3xl mx-auto mb-20">
            <h3 className="text-[11px] font-bold tracking-widest uppercase text-[#a0735d] mb-6 font-sans">
              Sustainable Growth
            </h3>
            <h1 className="text-4xl md:text-5xl lg:text-[56px] font-serif font-semibold leading-[1.12] tracking-tight text-on-surface mb-8">
              {data?.headline || "Investment in clarity, not just software."}
            </h1>
            <p className="text-base md:text-lg text-on-surface-variant/90 leading-relaxed font-sans max-w-2xl mx-auto">
              {data?.subtitle || "Choose a plan that fits your current needs. Our human-centric AI grows with your thoughts, not your invoice."}
            </p>
          </AnimatedSection>
          <PricingTiers tiers={data?.tiers || defaultTiers} />
          
          {/* Image Banner Section */}
          <AnimatedSection delay={0.3} className="mt-24">
            <div className="relative w-full aspect-[21/9] md:aspect-[3/1] rounded-[2.5rem] overflow-hidden shadow-sm flex items-end p-8 md:p-16 group">
              <Image
                src="/pricing_banner.png"
                alt="Modern office with plants"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-surface/80 via-surface/30 to-transparent" />
              <div className="absolute inset-0 bg-surface/10 mix-blend-color" />
              <h2 className="relative z-10 text-3xl md:text-4xl lg:text-[40px] font-serif font-semibold text-on-surface max-w-xl leading-tight">
                Focus on what matters. We'll handle the connections.
              </h2>
            </div>
          </AnimatedSection>
        </div>
      </section>
      <FAQSection faqs={data?.faqs || []} />
    </>
  );
}
