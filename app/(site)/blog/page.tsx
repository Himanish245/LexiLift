import type { Metadata } from "next";
import { sanityFetch } from "@/sanity/lib/client";
import { blogListQuery } from "@/sanity/lib/queries";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { BlogCard } from "@/components/blog/BlogCard";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Blog",
  description: "News, updates, and insights from the LexiLift team.",
};

export default async function BlogListPage() {
  const posts = await sanityFetch({ query: blogListQuery });

  return (
    <div className="pt-32 pb-24 px-4 max-w-7xl mx-auto">
      <AnimatedSection>
        <SectionHeader
          title="LexiLift Blog"
          subtitle="Insights, updates, and thoughts on AI and knowledge management."
          tagline="Blog"
          align="left"
        />
      </AnimatedSection>
      
      {posts?.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mt-12">
          {posts.map((post: any, i: number) => (
            <AnimatedSection key={post._id} delay={i * 0.1}>
              <BlogCard post={post} />
            </AnimatedSection>
          ))}
        </div>
      ) : (
        <AnimatedSection delay={0.2}>
          <div className="text-center py-20 bg-card border border-border rounded-3xl">
            <h3 className="text-2xl font-bold mb-2">No posts yet</h3>
            <p className="text-muted-foreground">Check back soon for updates!</p>
          </div>
        </AnimatedSection>
      )}
    </div>
  );
}
