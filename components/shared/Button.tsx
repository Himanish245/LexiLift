import Link from "next/link";

interface ButtonProps {
  href?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void;
  type?: "button" | "submit" | "reset";
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  isExternal?: boolean;
  className?: string;
}

export function Button({
  href,
  onClick,
  type = "button",
  children,
  variant = "primary",
  size = "md",
  isExternal = false,
  className = "",
}: ButtonProps) {
  const baseStyles = "inline-flex items-center justify-center rounded-full font-medium transition-all duration-300 cursor-pointer";

  const variants = {
    primary: "gradient-button",
    secondary: "bg-card border border-border text-foreground hover:border-accent-purple/40 hover:shadow-[0_0_20px_rgba(124,92,255,0.1)]",
    outline: "border border-accent-purple/40 text-accent-purple hover:bg-accent-purple/10",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-2.5 text-sm",
    lg: "px-8 py-3 text-base",
  };

  const combinedClass = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`;

  if (href) {
    if (isExternal) {
      return (
        <a href={href} onClick={onClick} target="_blank" rel="noopener noreferrer" className={combinedClass}>
          {children}
        </a>
      );
    }
    return (
      <Link href={href} onClick={onClick as any} className={combinedClass}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick as any} className={combinedClass}>
      {children}
    </button>
  );
}
