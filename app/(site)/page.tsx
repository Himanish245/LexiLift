import type { Metadata } from "next";
import { client } from "@/sanity/lib/client";
import { homePageQuery } from "@/sanity/lib/queries";
import { HeroSection } from "@/components/home/HeroSection";
import { LogoMarquee } from "@/components/home/LogoMarquee";
import { FeaturesGrid } from "@/components/home/FeaturesGrid";
import { HowItWorks } from "@/components/home/HowItWorks";
import { CTASection } from "@/components/home/CTASection";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const data = await client.fetch(homePageQuery);
  return {
    title: data?.seo?.metaTitle || "LexiLift — AI-Powered Knowledge Base",
    description: data?.seo?.metaDescription || "Transform your documents into an intelligent AI knowledge base.",
  };
}

export default async function HomePage() {
  const data = await client.fetch(homePageQuery);

  // Fallback data when Sanity is empty
  const hero = {
    tagline: data?.heroTagline || "AI-Powered Knowledge Base",
    title: data?.heroTitle || "Your Knowledge,",
    highlight: data?.heroHighlight || "Supercharged with AI",
    subtitle: data?.heroSubtitle || "Transform your documents into an intelligent knowledge base. Instant answers powered by RAG retrieval.",
    ctaPrimary: data?.heroCtaPrimary || { label: "Get Started Free", href: "/contact" },
    ctaSecondary: data?.heroCtaSecondary || { label: "Watch Demo", href: "/contact" },
  };

  const defaultFeatures = [
    { icon: "🔍", title: "Smart Search", description: "Semantic search across all your documents" },
    { icon: "💬", title: "AI Chat", description: "Ask questions, get instant cited answers" },
    { icon: "📄", title: "Doc Ingestion", description: "Upload PDFs, docs, web pages, and more" },
    { icon: "🔗", title: "Integrations", description: "Connect Slack, Notion, Drive & more" },
    { icon: "🔒", title: "Enterprise Security", description: "SOC 2, SSO, role-based access control" },
    { icon: "📊", title: "Analytics", description: "Track what your team searches for" },
  ];

  const defaultSteps = [
    { icon: "📤", title: "Upload", description: "Add your docs, PDFs, web pages" },
    { icon: "⚡", title: "Index", description: "AI processes & indexes everything" },
    { icon: "💬", title: "Ask", description: "Get instant, cited answers" },
  ];

  return (
    <>
      <HeroSection {...hero} />
      <LogoMarquee logos={data?.trustedByLogos || []} />
      <FeaturesGrid
        headline={data?.featuresHeadline}
        tagline={data?.featuresTagline}
        features={data?.features || defaultFeatures}
      />
      <HowItWorks
        headline={data?.howItWorksHeadline}
        steps={data?.howItWorksSteps || defaultSteps}
      />
      <CTASection
        title={data?.ctaTitle}
        highlight={data?.ctaHighlight}
        subtitle={data?.ctaSubtitle || "Start for free. No credit card required."}
        button={data?.ctaButton || { label: "Get Started Free", href: "/contact" }}
      />
    </>
  );
}
