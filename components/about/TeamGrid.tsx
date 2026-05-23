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
    <div className="flex flex-wrap justify-center gap-8">
      {members.map((member, i) => (
        <AnimatedSection key={member.name} delay={i * 0.1}>
          <div className="group text-center w-full max-w-[260px]">
            <div className="relative w-48 h-48 mx-auto mb-6 rounded-full overflow-hidden border-2 border-border group-hover:border-primary transition-colors duration-300">
              {member.image ? (
                <Image
                  src={urlFor(member.image).width(400).height(400).url()}
                  alt={member.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center text-4xl font-serif font-bold text-primary">
                  {member.name.charAt(0)}
                </div>
              )}
            </div>
            <h3 className="text-xl font-serif font-bold text-foreground mb-1">{member.name}</h3>
            <p className="text-secondary text-sm font-medium mb-3">{member.role}</p>
            {member.bio && (
              <p className="text-muted-foreground text-sm line-clamp-3 mb-4">{member.bio}</p>
            )}
            {member.socialLinks && member.socialLinks.length > 0 && (
              <div className="flex justify-center gap-3">
                {member.socialLinks.map((social) => (
                  <a
                    key={social.platform}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {/* Just using initial for platform to save space, ideally use icons */}
                    <span className="text-xs uppercase font-bold tracking-wider">{social.platform.charAt(0)}</span>
                  </a>
                ))}
              </div>
            )}
          </div>
        </AnimatedSection>
      ))}
    </div>
  );
}
