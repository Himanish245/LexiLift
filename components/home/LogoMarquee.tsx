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
  const hasLogos = logos && logos.length > 0;

  return (
    <section className="py-16 bg-surface">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <p className="text-[11px] tracking-[0.25em] uppercase text-on-surface-variant/50 text-center mb-8 font-semibold">
          Trusted by Visionary Teams At
        </p>
        
        <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10 lg:gap-16">
          {hasLogos ? (
            logos.map((item, i) => (
              <div key={`${item.name}-${i}`} className="flex-shrink-0 transition-opacity">
                {item.logo ? (
                  <Image
                    src={urlFor(item.logo).height(40).url()}
                    alt={item.name}
                    width={120}
                    height={40}
                    className="h-7 w-auto object-contain grayscale opacity-60 hover:opacity-90 transition-opacity duration-300"
                  />
                ) : (
                  <span className="text-sm font-semibold text-on-surface-variant/70">
                    {item.name}
                  </span>
                )}
              </div>
            ))
          ) : (
            // 5 neutral gray rounded blocks matching the screenshot mockup
            Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="w-28 h-8.5 bg-[#eae8e4]/70 rounded-md flex-shrink-0 transition-colors hover:bg-outline-variant/35"
              />
            ))
          )}
        </div>
      </div>
    </section>
  );
}
