interface SectionHeaderProps {
  tagline?: string;
  title: React.ReactNode;
  subtitle?: string;
  taglineColor?: "purple" | "teal";
  align?: "center" | "left";
}

export function SectionHeader({
  tagline,
  title,
  subtitle,
  taglineColor = "purple",
  align = "center",
}: SectionHeaderProps) {
  const alignClass = align === "center" ? "text-center" : "text-left";
  const taglineColorClass = taglineColor === "purple" ? "text-secondary" : "text-primary";

  return (
    <div className={`${alignClass} mb-12 md:mb-16`}>
      {tagline && (
        <p className={`text-xs tracking-[0.2em] uppercase ${taglineColorClass} mb-3`}>
          {tagline}
        </p>
      )}
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-balance">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-muted-foreground max-w-2xl mx-auto text-lg">
          {subtitle}
        </p>
      )}
    </div>
  );
}
