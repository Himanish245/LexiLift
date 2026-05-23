import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { Button } from "@/components/shared/Button";

interface CTASectionProps {
  title?: string;
  highlight?: string;
  subtitle?: string;
  button?: { label: string; href: string; isExternal?: boolean };
}

export function CTASection({ title, highlight, subtitle, button }: CTASectionProps) {
  return (
    <section className="py-20 md:py-32 px-4 bg-gradient-to-b from-[#08080d] to-[#0d0d1f]">
      <AnimatedSection className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
          {title || "Ready to"}{" "}
          <span className="gradient-text">{highlight || "Supercharge"}</span>{" "}
          Your Knowledge?
        </h2>
        {subtitle && (
          <p className="text-muted-foreground text-lg mb-8 flex items-center justify-center gap-2 flex-wrap">
            {subtitle.includes("Join") && (
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="1.2em" 
                height="1.2em" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="#14532d" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                className="inline-block flex-shrink-0"
              >
                <path d="m11 17 2 2a1 1 0 1 0 3-3"/>
                <path d="m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 1 0 1 1-3-3l2.81-2.81a5.79 5.79 0 0 1 7.06-.87l.47.28a2 2 0 0 0 1.42.25L21 4"/>
                <path d="m21 3 1 11h-2"/>
                <path d="M3 3 2 14l6.5 6.5a1 1 0 1 0 3-3"/>
                <path d="M3 4h8"/>
              </svg>
            )}
            <span>{subtitle}</span>
          </p>
        )}
        {button && (
          <Button href={button.href} size="lg" isExternal={button.isExternal}>
            {button.label} →
          </Button>
        )}
      </AnimatedSection>
    </section>
  );
}
