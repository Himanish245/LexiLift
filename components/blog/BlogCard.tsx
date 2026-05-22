import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/sanity/lib/image";
import { formatDate } from "@/lib/utils";

interface BlogCardProps {
  post: {
    title: string;
    slug: { current: string };
    excerpt: string;
    coverImage?: any;
    publishedAt: string;
    author?: { name: string; image?: any };
    categories?: { title: string }[];
  };
}

import { SpotlightCard } from "@/components/animations/SpotlightCard";

export function BlogCard({ post }: BlogCardProps) {
  return (
    <SpotlightCard className="group h-full flex flex-col bg-card border border-border rounded-2xl overflow-hidden card-hover">
      <Link href={`/blog/${post.slug.current}`} className="flex flex-col h-full">
        <div className="relative w-full aspect-[16/9] overflow-hidden bg-muted/20">
          {post.coverImage ? (
            <Image
              src={urlFor(post.coverImage).width(600).height(340).url()}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-accent-purple/20 to-accent-teal/20" />
          )}
        </div>
        <div className="p-6 flex flex-col flex-1">
          <div className="flex items-center gap-2 mb-3">
            {post.categories?.slice(0, 2).map((cat) => (
              <span key={cat.title} className="text-xs font-semibold text-accent-teal uppercase tracking-wider">
                {cat.title}
              </span>
            ))}
            {post.categories?.length && <span className="text-muted-foreground/30">•</span>}
            <span className="text-xs text-muted-foreground">{formatDate(post.publishedAt)}</span>
          </div>
          <h3 className="text-xl font-bold text-white mb-2 group-hover:text-accent-purple transition-colors">
            {post.title}
          </h3>
          <p className="text-muted-foreground text-sm line-clamp-3 mb-6 flex-1">
            {post.excerpt}
          </p>
          <div className="flex items-center gap-3 mt-auto">
            {post.author?.image ? (
              <Image
                src={urlFor(post.author.image).width(32).height(32).url()}
                alt={post.author.name}
                width={32}
                height={32}
                className="rounded-full"
              />
            ) : (
              <div className="w-8 h-8 rounded-full bg-accent-purple/20 flex items-center justify-center text-xs font-bold text-accent-purple">
                {post.author?.name?.charAt(0) || "U"}
              </div>
            )}
            <span className="text-sm font-medium text-foreground/80">{post.author?.name || "Unknown"}</span>
          </div>
        </div>
      </Link>
    </SpotlightCard>
  );
}
