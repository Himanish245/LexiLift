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

export function BlogCard({ post }: BlogCardProps) {
  // Use category or default to Productivity
  const category = post.categories?.[0]?.title || "Article";

  return (
    <div className="group h-full flex flex-col bg-white border border-outline-variant/30 rounded-[2.5rem] p-6 shadow-sm hover:shadow-md transition-shadow">
      <Link href={`/blog/${post.slug.current}`} className="flex flex-col h-full">
        <div className="relative w-full aspect-[4/3] rounded-[1.5rem] overflow-hidden mb-6">
          {post.coverImage ? (
            <Image
              src={urlFor(post.coverImage).width(600).height(450).url()}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-[#36664d]/10 to-[#8a5a44]/10" />
          )}
        </div>
        
        <div className="flex flex-col flex-1">
          <div className="mb-4">
            <span className="inline-block px-3 py-1 bg-[#fcede8] text-[#8a5a44] text-[10px] uppercase font-bold tracking-wider rounded-full">
              {category}
            </span>
          </div>
          
          <h3 className="text-xl md:text-2xl font-serif font-bold text-[#111827] mb-3 leading-tight group-hover:text-[#36664d] transition-colors">
            {post.title}
          </h3>
          
          <p className="text-[#111827]/70 text-sm leading-relaxed line-clamp-3 mb-6 flex-1">
            {post.excerpt}
          </p>
          
          <div className="flex items-center justify-between mt-auto pt-4 border-t border-outline-variant/20">
            <span className="text-[11px] text-[#111827]/50 font-medium uppercase tracking-wider">{formatDate(post.publishedAt)}</span>
            <span className="text-[13px] font-semibold text-[#36664d] flex items-center gap-1 group-hover:gap-2 transition-all">
              Read More
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
}
