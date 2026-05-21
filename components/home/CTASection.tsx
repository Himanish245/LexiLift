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
          <p className="text-muted-foreground text-lg mb-8">{subtitle}</p>
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
