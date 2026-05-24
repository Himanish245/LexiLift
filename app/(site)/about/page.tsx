import type { Metadata } from "next";
import { sanityFetch } from "@/sanity/lib/live";
import { aboutPageQuery } from "@/sanity/lib/queries";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
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
      {/* Hero Section */}
      <section className="relative pt-40 pb-20 overflow-hidden min-h-[50vh] flex flex-col items-center justify-center bg-surface">
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <AnimatedSection>
            <div className="inline-flex items-center gap-2 bg-[#e8f0eb] text-[#36664d] px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-8 shadow-sm">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" /></svg>
              Our Story
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-serif font-bold leading-tight mb-6 text-on-surface tracking-tight">
              {data?.headline || "We're building the future of"}{" "}
              <span className="text-[#36664d]">{data?.headlineHighlight || "knowledge work."}</span>
            </h1>
            <p className="text-lg md:text-xl text-on-surface-variant/80 font-sans max-w-2xl mx-auto">
              {data?.subtitle || "LexiLift was founded to solve a simple problem: teams spend too much time searching for information and too little time acting on it."}
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Mission and Story */}
      <section className="relative py-24 bg-surface">
        <div className="max-w-6xl mx-auto px-6">
          <AnimatedSection className="grid md:grid-cols-2 gap-8 items-stretch">
            <div className="bg-[#f4f3ef] rounded-[2.5rem] p-10 md:p-14 transition-all duration-300 shadow-sm border border-outline-variant/30 hover:bg-[#eae8e4]">
              <h2 className="text-3xl font-serif font-bold mb-6 text-[#8a5a44]">{data?.missionTitle || "Our Mission"}</h2>
              <div className="text-on-surface-variant/90 leading-relaxed font-sans text-sm md:text-base">
                <p>{data?.missionBody || "We believe that knowledge should flow freely within an organization. By leveraging advanced AI and retrieval-augmented generation, we're making it possible for anyone to instantly access the exact information they need, right when they need it."}</p>
              </div>
            </div>
            <div className="bg-white rounded-[2.5rem] p-10 md:p-14 transition-all duration-300 shadow-sm border border-outline-variant/40">
              <h2 className="text-3xl font-serif font-bold mb-6 text-[#36664d]">{data?.storyTitle || "Our Story"}</h2>
              <div className="text-on-surface-variant/90 leading-relaxed font-sans text-sm md:text-base">
                <p>{data?.storyBody || "Started in 2026, LexiLift grew out of our own frustration with scattered documentation, outdated wikis, and endless Slack searches. We built the tool we wanted to use, and now we're sharing it with the world."}</p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Values */}
      <section className="relative py-24 px-6 max-w-7xl mx-auto bg-surface">
        <AnimatedSection>
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif font-bold text-on-surface">Our Values</h2>
          </div>
        </AnimatedSection>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {(data?.values || defaultValues).map((value: any, i: number) => (
            <AnimatedSection key={value.title} delay={i * 0.1}>
              <div className="bg-white rounded-[2rem] p-10 h-full text-center border border-outline-variant/40 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-[#f4f3ef] flex items-center justify-center border border-outline-variant/30 text-[#8a5a44] text-2xl">
                  {value.icon}
                </div>
                <h3 className="text-xl font-serif font-bold mb-4 text-on-surface">{value.title}</h3>
                <p className="text-on-surface-variant/80 text-sm leading-relaxed">{value.description}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </section>

      {/* Team */}
      {data?.teamMembers?.length > 0 && (
        <section className="relative py-24 px-6 md:px-12 mt-20 overflow-hidden bg-[#eae8e4] rounded-[2.5rem] max-w-[1400px] mx-4 md:mx-8 lg:mx-12 xl:mx-auto mb-20 shadow-sm">
          <div className="max-w-5xl mx-auto relative z-10">
            <AnimatedSection>
              <div className="text-center mb-16 flex flex-col items-center">
                <div className="inline-flex items-center gap-2 bg-[#fbf9f5] text-[#8a5a44] px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-6 shadow-sm border border-outline-variant/30">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                  The Minds Behind LexiLift
                </div>
                <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#111827] mb-6">Meet the Team</h2>
                <p className="text-[#111827]/70 font-sans max-w-2xl mx-auto text-lg">
                  A small group of passionate engineers, designers, and thinkers dedicated to building the future of how teams interact with knowledge.
                </p>
              </div>
            </AnimatedSection>
            <TeamGrid 
              members={[
                ...(data?.teamMembers || []),
                {
                  name: "Alex Chen",
                  role: "Lead Designer",
                  bio: "Former product designer at a leading design agency.",
                  socialLinks: [
                    { platform: "Twitter", url: "https://twitter.com" },
                    { platform: "LinkedIn", url: "https://linkedin.com" }
                  ]
                }
              ]} 
            />
          </div>
        </section>
      )}
    </>
  );
}
