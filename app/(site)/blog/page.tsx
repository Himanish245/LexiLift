import type { Metadata } from "next";
import { sanityFetch } from "@/sanity/lib/live";
import { blogListQuery } from "@/sanity/lib/queries";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { BlogCard } from "@/components/blog/BlogCard";
import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/sanity/lib/image";
import { formatDate } from "@/lib/utils";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Resources | LexiLift",
  description: "News, updates, and insights from the LexiLift team.",
};

export default async function BlogListPage() {
  const { data: posts } = await sanityFetch({ query: blogListQuery });

  const featuredPost = posts?.[0];
  const gridPosts = posts?.slice(1) || [];

  const categories = [
    { name: "All Articles", active: true },
    { name: "Knowledge Management", active: false },
    { name: "AI Ethics", active: false },
    { name: "Team Culture", active: false },
    { name: "Productivity", active: false },
  ];

  return (
    <div className="pt-32 pb-24 px-4 md:px-8 bg-[#fbf9f5] min-h-screen">
      
      {/* Filters */}
      <div className="max-w-[1200px] mx-auto mb-10 overflow-x-auto no-scrollbar">
        <div className="flex items-center gap-3 min-w-max pb-2">
          {categories.map((cat) => (
            <button
              key={cat.name}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${
                cat.active 
                  ? "bg-[#36664d] text-white shadow-sm" 
                  : "bg-white text-[#111827]/70 hover:bg-gray-50 border border-outline-variant/30"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Featured Post */}
      {featuredPost && (
        <AnimatedSection>
          <div className="flex flex-col lg:flex-row gap-0 max-w-[1200px] mx-auto mb-20 relative">
            {/* Left: Image container */}
            <div className="w-full lg:w-3/5 bg-[#6b7c67] rounded-t-[2.5rem] lg:rounded-tr-none lg:rounded-l-[3rem] p-8 md:p-14 min-h-[300px] lg:min-h-[500px] relative flex items-center justify-center z-0">
               <div className="relative w-full aspect-video shadow-2xl rounded-xl overflow-hidden">
                  {featuredPost.coverImage ? (
                    <Image
                      src={urlFor(featuredPost.coverImage).width(1200).height(800).url()}
                      alt={featuredPost.title}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-[#8a5a44]/20" />
                  )}
               </div>
            </div>
            
            {/* Right: Content container */}
            <div className="w-full lg:w-[45%] bg-white rounded-b-[2.5rem] lg:rounded-[3rem] p-10 md:p-14 lg:-ml-12 shadow-[0_8px_30px_rgb(0,0,0,0.06)] z-10 my-auto border border-outline-variant/20">
               <div className="flex items-center gap-2 mb-6">
                 <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#8a5a44]"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                 <span className="text-[#8a5a44] text-[11px] font-bold uppercase tracking-wider">Featured Insight</span>
               </div>
               <h2 className="text-3xl lg:text-5xl font-serif font-bold text-[#111827] mb-6 leading-[1.15]">
                 {featuredPost.title}
               </h2>
               <p className="text-[#111827]/70 font-sans text-base lg:text-lg mb-8 leading-relaxed line-clamp-3">
                 {featuredPost.excerpt}
               </p>
               <div className="flex items-center gap-4 mb-8">
                 <div className="w-12 h-12 rounded-full overflow-hidden bg-[#a1b89f] flex items-center justify-center flex-shrink-0 text-[#36664d] font-bold">
                   {featuredPost.author?.image ? (
                     <Image
                       src={urlFor(featuredPost.author.image).width(48).height(48).url()}
                       alt={featuredPost.author.name}
                       width={48}
                       height={48}
                       className="object-cover"
                     />
                   ) : (
                     featuredPost.author?.name?.charAt(0) || "U"
                   )}
                 </div>
                 <div>
                   <p className="text-sm font-semibold text-[#111827]">{featuredPost.author?.name || "Elena Moretti"}</p>
                   <p className="text-xs text-[#111827]/60">Lead Strategist • 8 min read</p>
                 </div>
               </div>
               <Link href={`/blog/${featuredPost.slug.current}`} className="text-[#36664d] font-bold flex items-center gap-2 hover:gap-3 transition-all">
                 Read the Article <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
               </Link>
            </div>
          </div>
        </AnimatedSection>
      )}

      {/* Posts Grid */}
      <div className="max-w-[1200px] mx-auto mb-24">
        {gridPosts?.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {gridPosts.map((post: any, i: number) => (
              <AnimatedSection key={post._id} delay={i * 0.1}>
                <BlogCard post={post} />
              </AnimatedSection>
            ))}
          </div>
        ) : !featuredPost ? (
          <AnimatedSection delay={0.2}>
            <div className="text-center py-20 bg-white border border-outline-variant/30 rounded-3xl shadow-sm">
              <h3 className="text-2xl font-serif font-bold text-[#111827] mb-2">No posts yet</h3>
              <p className="text-[#111827]/60">Check back soon for updates!</p>
            </div>
          </AnimatedSection>
        ) : null}
      </div>

      {/* Subscribe CTA */}
      <AnimatedSection>
        <section className="bg-[#5c6e58] rounded-[3rem] max-w-[1200px] mx-auto py-20 md:py-24 px-6 text-center shadow-lg relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-tr from-[#36664d]/40 to-transparent pointer-events-none"></div>
          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-white mb-6">Subscribe to the Lift Letter</h2>
            <p className="text-white/80 font-sans text-base md:text-lg mb-10 max-w-xl mx-auto leading-relaxed">
              Fortnightly reflections on knowledge, technology, and the human experience, delivered straight to your sanctuary.
            </p>
            <form className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-xl mx-auto w-full">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="w-full sm:flex-1 bg-white/10 border border-white/20 text-white placeholder-white/60 rounded-full px-6 py-4 focus:outline-none focus:ring-2 focus:ring-white/40 transition-all text-sm md:text-base" 
                required
              />
              <button 
                type="button" 
                className="w-full sm:w-auto bg-white text-[#5c6e58] font-bold rounded-full px-8 py-4 whitespace-nowrap hover:bg-[#fbf9f5] hover:shadow-md transition-all text-sm md:text-base"
              >
                Join the Circle
              </button>
            </form>
          </div>
        </section>
      </AnimatedSection>

    </div>
  );
}
