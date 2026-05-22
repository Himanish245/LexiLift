import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { sanityFetch } from "@/sanity/lib/client";
import { blogPostQuery, blogSlugsQuery } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import { PortableText } from "@/sanity/lib/portable-text";
import { formatDate } from "@/lib/utils";
import { AnimatedSection } from "@/components/shared/AnimatedSection";

export const revalidate = 60;

export async function generateStaticParams() {
  try {
    const slugs = await sanityFetch({ query: blogSlugsQuery });
    return slugs.map((slug: any) => ({ slug: slug.slug }));
  } catch (error) {
    console.error("Failed to fetch blog slugs for static generation:", error);
    return [];
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await sanityFetch({ query: blogPostQuery, params: { slug } });

  if (!post) return {};

  return {
    title: post.seo?.metaTitle || post.title,
    description: post.seo?.metaDescription || post.excerpt,
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await sanityFetch({ query: blogPostQuery, params: { slug } });

  if (!post) {
    notFound();
  }

  return (
    <article className="pt-32 pb-24 px-4 max-w-4xl mx-auto">
      <AnimatedSection>
        <Link href="/blog" className="text-accent-purple hover:text-accent-teal transition-colors text-sm font-semibold mb-8 inline-block">
          ← Back to Blog
        </Link>
        <div className="flex items-center gap-2 mb-6">
          {post.categories?.map((cat: any) => (
            <span key={cat.title} className="text-xs font-semibold text-accent-teal uppercase tracking-wider">
              {cat.title}
            </span>
          ))}
          {post.categories?.length && <span className="text-muted-foreground/30">•</span>}
          <span className="text-sm text-muted-foreground">{formatDate(post.publishedAt)}</span>
        </div>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-8">
          {post.title}
        </h1>
        <div className="flex items-center gap-4 mb-12 py-6 border-y border-border/50">
          {post.author?.image ? (
            <Image
              src={urlFor(post.author.image).width(48).height(48).url()}
              alt={post.author.name}
              width={48}
              height={48}
              className="rounded-full"
            />
          ) : (
            <div className="w-12 h-12 rounded-full bg-accent-purple/20 flex items-center justify-center text-lg font-bold text-accent-purple">
              {post.author?.name?.charAt(0) || "U"}
            </div>
          )}
          <div>
            <div className="font-bold text-foreground">{post.author?.name || "Unknown Author"}</div>
            {post.author?.role && <div className="text-sm text-muted-foreground">{post.author.role}</div>}
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection delay={0.1}>
        {post.coverImage && (
          <div className="relative w-full aspect-[21/9] rounded-2xl overflow-hidden mb-12">
            <Image
              src={urlFor(post.coverImage).width(1200).height(514).url()}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}
      </AnimatedSection>

      <AnimatedSection delay={0.2} className="prose prose-invert prose-lg max-w-none">
        {post.body ? (
          <PortableText value={post.body} />
        ) : (
          <p>No content available.</p>
        )}
      </AnimatedSection>
    </article>
  );
}
