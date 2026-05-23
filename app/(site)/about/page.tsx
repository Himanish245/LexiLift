import type { Metadata } from "next";
import { sanityFetch } from "@/sanity/lib/live";
import { aboutPageQuery } from "@/sanity/lib/queries";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { GradientOrbs } from "@/components/animations/GradientOrbs";
import { TeamGrid } from "@/components/about/TeamGrid";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const data = await sanityFetch({ query: aboutPageQuery });
  return {
    title: data?.seo?.metaTitle || "About Us",
    description: data?.seo?.metaDescription || "Our mission is to make organizational knowledge instantly accessible.",
  };
}

export default async function AboutPage() {
  const data = await sanityFetch({ query: aboutPageQuery });

  const defaultValues = [
    { icon: "⚡", title: "Speed", description: "Answers should be instant. We optimize for millisecond responses." },
    { icon: "🎯", title: "Accuracy", description: "Hallucinations are unacceptable. Every answer must be cited." },
    { icon: "🔒", title: "Security", description: "Your data is yours. We build with privacy and security first." },
  ];

  return (
    <>
      <section className="relative pt-32 pb-20 overflow-hidden">
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

      <section className="py-20 bg-card border-y border-border/50">
        <div className="max-w-4xl mx-auto px-4">
          <AnimatedSection className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-4">{data?.missionTitle || "Our Mission"}</h2>
              <div className="prose prose-invert text-muted-foreground">
                <p>{data?.missionBody || "We believe that knowledge should flow freely within an organization. By leveraging advanced AI and retrieval-augmented generation, we're making it possible for anyone to instantly access the exact information they need, right when they need it."}</p>
              </div>
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-4">{data?.storyTitle || "Our Story"}</h2>
              <div className="prose prose-invert text-muted-foreground">
                <p>{data?.storyBody || "Started in 2026, LexiLift grew out of our own frustration with scattered documentation, outdated wikis, and endless Slack searches. We built the tool we wanted to use, and now we're sharing it with the world."}</p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section className="py-24 px-4 max-w-7xl mx-auto">
        <AnimatedSection>
          <SectionHeader title="Our Values" />
        </AnimatedSection>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {(data?.values || defaultValues).map((value: any, i: number) => (
            <AnimatedSection key={value.title} delay={i * 0.1}>
              <div className="text-center">
                <div className="text-4xl mb-4">{value.icon}</div>
                <h3 className="text-xl font-bold mb-2">{value.title}</h3>
                <p className="text-muted-foreground">{value.description}</p>
              </div>
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
