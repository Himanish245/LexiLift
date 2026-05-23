import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";

interface Logo {
  name: string;
  logo?: any;
}

interface LogoMarqueeProps {
  logos: Logo[];
}

export function LogoMarquee({ logos }: LogoMarqueeProps) {
  if (!logos?.length) return null;

  // Triple the logos for seamless infinite scroll
  const tripled = [...logos, ...logos, ...logos];

  return (
    <section className="py-12 border-y border-border/30">
      <p className="text-xs tracking-[0.15em] uppercase text-muted-foreground text-center mb-8">
        Trusted by innovative teams
      </p>
      <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <div className="flex animate-marquee gap-20 items-center">
          {tripled.map((item, i) => (
            <div key={`${item.name}-${i}`} className="flex-shrink-0 opacity-40 hover:opacity-70 transition-opacity">
              {item.logo ? (
                <Image
                  src={urlFor(item.logo).height(40).url()}
                  alt={item.name}
                  width={120}
                  height={40}
                  className="h-8 w-auto object-contain"
                />
              ) : (
                <span className="text-sm text-muted-foreground font-medium whitespace-nowrap">
                  {item.name}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
