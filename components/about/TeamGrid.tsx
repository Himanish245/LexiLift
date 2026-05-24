import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { AnimatedSection } from "@/components/shared/AnimatedSection";

interface TeamMember {
  name: string;
  role: string;
  image?: any;
  bio?: string;
  socialLinks?: { platform: string; url: string }[];
}

interface TeamGridProps {
  members: TeamMember[];
}

export function TeamGrid({ members }: TeamGridProps) {
  if (!members?.length) return null;

  return (
    <div className="flex flex-wrap justify-center gap-10">
      {members.map((member, i) => (
        <AnimatedSection key={member.name} delay={i * 0.1}>
          <div className="group text-center w-full max-w-[280px] bg-white rounded-[2rem] p-8 shadow-sm border border-outline-variant/40 transition-all duration-300 hover:shadow-md hover:-translate-y-1">
            <div className="relative w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden border-4 border-[#f4f3ef] group-hover:border-[#36664d] transition-colors duration-300">
              {member.image ? (
                <Image
                  src={urlFor(member.image).width(400).height(400).url()}
                  alt={member.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              ) : (
                <div className="w-full h-full bg-[#fcede8] flex items-center justify-center text-3xl font-serif font-bold text-[#8a5a44]">
                  {member.name.charAt(0)}
                </div>
              )}
            </div>
            <h3 className="text-xl font-serif font-bold text-on-surface mb-1">{member.name}</h3>
            <p className="text-[#36664d] text-xs font-bold uppercase tracking-wider mb-4">{member.role}</p>
            {member.bio && (
              <p className="text-on-surface-variant/80 text-sm line-clamp-3 mb-6 leading-relaxed">{member.bio}</p>
            )}
          </div>
        </AnimatedSection>
      ))}
    </div>
  );
}
