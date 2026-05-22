import Link from "next/link";
import Image from "next/image";

interface FooterLink {
  label: string;
  href: string;
  isExternal?: boolean;
}

interface SocialLink {
  platform: string;
  url: string;
}

interface FooterProps {
  siteName: string;
  footerLinks: FooterLink[];
  socialLinks: SocialLink[];
}

export function Footer({ siteName, footerLinks, socialLinks }: FooterProps) {
  return (
    <footer className="border-t border-border/50 bg-background">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Brand */}
          <div className="flex items-center gap-2.5 group">
            <Image
              src="/logo.svg"
              alt={siteName}
              width={24}
              height={24}
              className="w-6 h-6 object-contain transition-transform duration-300 ease-out group-hover:rotate-[8deg]"
            />
            <span className="font-sora text-lg font-extrabold tracking-tight text-foreground">
              {siteName === "LexiLift" ? (
                <>
                  Lexi
                  <span className="bg-gradient-to-r from-[#00F0FF] via-[#7c5cff] to-[#FF007A] bg-clip-text text-transparent">
                    Lift
                  </span>
                </>
              ) : (
                siteName
              )}
            </span>
          </div>

          {/* Links */}
          <div className="flex flex-wrap justify-center gap-6">
            {footerLinks.map((link, index) => (
              <Link
                key={`${link.label}-${index}`}
                href={link.href}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                {...(link.isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Social */}
          <div className="flex gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.platform}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted-foreground hover:text-accent-purple transition-colors capitalize"
              >
                {social.platform}
              </a>
            ))}
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border/30 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} {siteName}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
