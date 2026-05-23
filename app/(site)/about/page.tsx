import type { Metadata } from "next";
import { sanityFetch } from "@/sanity/lib/live";
import { aboutPageQuery } from "@/sanity/lib/queries";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { GradientOrbs } from "@/components/animations/GradientOrbs";
import { MeshGradient } from "@/components/animations/MeshGradient";
import { NoiseOverlay } from "@/components/animations/NoiseOverlay";
import { SpotlightCard } from "@/components/animations/SpotlightCard";
import { TeamGrid } from "@/components/about/TeamGrid";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const { data } = await sanityFetch({ query: aboutPageQuery });
  return {
    title: data?.seo?.metaTitle || "About Us",
    description: data?.seo?.metaDescription || "Our mission is to make organizational knowledge instantly accessible.",
  };
}

export default async function AboutPage() {
  const { data } = await sanityFetch({ query: aboutPageQuery });

  const defaultValues = [
    { icon: "⚡", title: "Speed", description: "Answers should be instant. We optimize for millisecond responses." },
    { icon: "🎯", title: "Accuracy", description: "Hallucinations are unacceptable. Every answer must be cited." },
    { icon: "🔒", title: "Security", description: "Your data is yours. We build with privacy and security first." },
  ];

  return (
    <>
      <section className="relative pt-32 pb-20 overflow-hidden min-h-[60vh] flex items-center justify-center">
        <NoiseOverlay />
        <MeshGradient className="opacity-50" />
        <GradientOrbs />
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <AnimatedSection>
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-extrabold leading-tight mb-6">
              {data?.headline || "We're building the future of"}{" "}
              <span className="gradient-text">{data?.headlineHighlight || "knowledge work."}</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-12">
              {data?.subtitle || "LexiLift was founded to solve a simple problem: teams spend too much time searching for information and too little time acting on it."}
            </p>
          </AnimatedSection>
        </div>
      </section>

      <section className="relative py-24 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-[600px] bg-primary opacity-[0.03] blur-[100px] rounded-[100%] pointer-events-none -z-10" />
        <div className="max-w-5xl mx-auto px-4">
          <AnimatedSection className="grid md:grid-cols-2 gap-8 items-stretch">
            <div className="glass-card rounded-[24px] p-8 md:p-12 border-outline-variant/30 bg-[var(--color-card)]/40 relative overflow-hidden group hover:border-primary/30 transition-colors">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-secondary opacity-50 group-hover:opacity-100 transition-opacity" />
              <h2 className="text-3xl font-serif font-bold mb-6 text-foreground">{data?.missionTitle || "Our Mission"}</h2>
              <div className="prose prose-invert text-muted-foreground leading-relaxed">
                <p>{data?.missionBody || "We believe that knowledge should flow freely within an organization. By leveraging advanced AI and retrieval-augmented generation, we're making it possible for anyone to instantly access the exact information they need, right when they need it."}</p>
              </div>
            </div>
            <div className="glass-card rounded-[24px] p-8 md:p-12 border-outline-variant/30 bg-[var(--color-card)]/40 relative overflow-hidden group hover:border-primary/30 transition-colors">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-secondary to-primary opacity-50 group-hover:opacity-100 transition-opacity" />
              <h2 className="text-3xl font-serif font-bold mb-6 text-foreground">{data?.storyTitle || "Our Story"}</h2>
              <div className="prose prose-invert text-muted-foreground leading-relaxed">
                <p>{data?.storyBody || "Started in 2026, LexiLift grew out of our own frustration with scattered documentation, outdated wikis, and endless Slack searches. We built the tool we wanted to use, and now we're sharing it with the world."}</p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section className="relative py-24 px-4 max-w-7xl mx-auto">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-[600px] bg-secondary opacity-[0.03] blur-[100px] rounded-[100%] pointer-events-none -z-10" />
        <AnimatedSection>
          <SectionHeader title="Our Values" />
        </AnimatedSection>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
          {(data?.values || defaultValues).map((value: any, i: number) => (
            <AnimatedSection key={value.title} delay={i * 0.1}>
              <SpotlightCard className="glass-card rounded-[24px] p-8 card-hover group h-full bg-[var(--color-card)]/40 border-outline-variant/30 text-center">
                <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-white/10 to-transparent flex items-center justify-center border border-outline-variant/30 shadow-[0_4px_20px_rgba(0,0,0,0.03)] group-hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] group-hover:border-primary/30 transition-all duration-500">
                  <div className="text-3xl group-hover:scale-110 group-hover:-rotate-6 transition-transform duration-500">
                    {value.icon}
                  </div>
                </div>
                <h3 className="text-xl font-serif font-bold mb-3 tracking-tight">{value.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{value.description}</p>
              </SpotlightCard>
            </AnimatedSection>
          ))}
        </div>
      </section>

      {data?.teamMembers?.length > 0 && (
        <section className="py-24 px-4 bg-card/50 border-t border-border/50">
          <div className="max-w-7xl mx-auto">
            <AnimatedSection>
              <SectionHeader title="Meet the Team" />
            </AnimatedSection>
            <TeamGrid members={data.teamMembers} />
          </div>
        </section>
      )}
    </>
  );
}
