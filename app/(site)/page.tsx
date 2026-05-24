import type { Metadata } from "next";
import { sanityFetch } from "@/sanity/lib/live";
import { homePageQuery } from "@/sanity/lib/queries";
import { HeroSection } from "@/components/home/HeroSection";
import { LogoMarquee } from "@/components/home/LogoMarquee";
import { FeaturesGrid } from "@/components/home/FeaturesGrid";
import { CTASection } from "@/components/home/CTASection";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const { data } = await sanityFetch({ query: homePageQuery });
  return {
    title: data?.seo?.metaTitle || "LexiLift — AI-Powered Knowledge Base",
    description: data?.seo?.metaDescription || "Transform your documents into an intelligent AI knowledge base.",
  };
}

export default async function HomePage() {
  const { data } = await sanityFetch({ query: homePageQuery });

  // Fallback data when Sanity is empty
  const hero = {
    tagline: data?.heroTagline || "Intelligent Knowledge Hub",
    title: data?.heroTitle || "Transform Your Team's Knowledge into Shared Wisdom.",
    highlight: data?.heroHighlight || "",
    subtitle: data?.heroSubtitle || "The human-centric AI that turns scattered documentation into a living digital sanctuary for your organization's collective intelligence.",
    ctaPrimary: data?.heroCtaPrimary || { label: "Start Free Trial", href: "/contact" },
    ctaSecondary: data?.heroCtaSecondary || { label: "Watch Story", href: "/contact" },
  };

  const defaultFeatures = [
    { icon: "🔍", title: "Smart Search", description: "Semantic search across all your documents" },
    { icon: "💬", title: "AI Chat", description: "Ask questions, get instant cited answers" },
    { icon: "📄", title: "Doc Ingestion", description: "Upload PDFs, docs, web pages, and more" },
    { icon: "🔗", title: "Integrations", description: "Connect Slack, Notion, Drive & more" },
    { icon: "🔒", title: "Enterprise Security", description: "SOC 2, SSO, role-based access control" },
    { icon: "📊", title: "Analytics", description: "Track what your team searches for" },
  ];

  return (
    <>
      <HeroSection {...hero} />
      <LogoMarquee logos={data?.trustedByLogos || []} />
      <FeaturesGrid />
      <CTASection
        title={data?.ctaTitle}
        highlight={data?.ctaHighlight}
        subtitle={data?.ctaSubtitle}
        button={data?.ctaButton}
      />
    </>
  );
}
