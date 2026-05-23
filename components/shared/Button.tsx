import Link from "next/link";
import { MagneticWrapper } from "@/components/animations/MagneticWrapper";

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
    primary: "bg-primary text-on-primary hover:bg-primary/90",
    secondary: "bg-surface border border-outline text-on-surface hover:bg-surface-container shadow-sm",
    outline: "border border-primary text-primary hover:bg-primary/10",
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
        <MagneticWrapper>
          <a href={href} onClick={onClick} target="_blank" rel="noopener noreferrer" className={combinedClass}>
            {children}
          </a>
        </MagneticWrapper>
      );
    }
    return (
      <MagneticWrapper>
        <Link href={href} onClick={onClick as any} className={combinedClass}>
          {children}
        </Link>
      </MagneticWrapper>
    );
  }

  return (
    <MagneticWrapper>
      <button type={type} onClick={onClick as any} className={combinedClass}>
        {children}
      </button>
    </MagneticWrapper>
  );
}
