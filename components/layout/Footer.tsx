"use client";

import Link from "next/link";

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
  footerLinks?: FooterLink[];
  socialLinks?: SocialLink[];
}

export function Footer({ siteName, footerLinks: _footerLinks, socialLinks: _socialLinks }: FooterProps) {
  const displaySiteName = siteName || "LexiLift";

  return (
    <footer className="relative z-40 bg-surface border-t border-outline-variant/30">
      <div className="max-w-7xl mx-auto px-6 md:px-8 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8">
          
          {/* Left Column: Brand & Copyright */}
          <div className="md:col-span-6 flex flex-col items-start space-y-5">
            <Link href="/" className="flex items-center group">
              <span className="font-serif text-2xl font-bold tracking-tight text-primary">
                {displaySiteName}
              </span>
            </Link>
            
            <p className="text-sm text-on-surface-variant/80 max-w-sm leading-relaxed font-sans">
              © {new Date().getFullYear()} {displaySiteName} AI. Cultivating clarity through thought.
            </p>
            
            {/* Social Icons */}
            <div className="flex items-center gap-3">
              {/* Share Icon */}
              <button 
                type="button"
                className="w-8.5 h-8.5 rounded-full border border-outline-variant/60 flex items-center justify-center text-on-surface-variant/85 hover:text-primary hover:border-primary/50 hover:bg-surface-container-low transition-all duration-300 cursor-pointer"
                aria-label="Share site"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="18" cy="5" r="3" />
                  <circle cx="6" cy="12" r="3" />
                  <circle cx="18" cy="19" r="3" />
                  <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                  <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
                </svg>
              </button>

              {/* Web/Globe Icon */}
              <button 
                type="button"
                className="w-8.5 h-8.5 rounded-full border border-outline-variant/60 flex items-center justify-center text-on-surface-variant/85 hover:text-primary hover:border-primary/50 hover:bg-surface-container-low transition-all duration-300 cursor-pointer"
                aria-label="Visit website"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="2" y1="12" x2="22" y2="12" />
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                </svg>
              </button>
            </div>
          </div>

          {/* Right Columns: Links */}
          <div className="md:col-span-6 grid grid-cols-3 gap-6 md:gap-8">
            
            {/* Column 1: Product */}
            <div className="space-y-4">
              <h4 className="text-[11px] tracking-[0.2em] font-semibold text-on-surface-variant/50 uppercase font-sans">
                Product
              </h4>
              <ul className="space-y-2.5 font-sans">
                <li>
                  <Link href="/#product" className="text-[13px] text-on-surface-variant/85 hover:text-primary transition-colors duration-200">
                    Product
                  </Link>
                </li>
                <li>
                  <Link href="/#guides" className="text-[13px] text-on-surface-variant/85 hover:text-primary transition-colors duration-200">
                    Product Guides
                  </Link>
                </li>
                <li>
                  <Link href="/pricing" className="text-[13px] text-on-surface-variant/85 hover:text-primary transition-colors duration-200">
                    Pricing
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 2: Company */}
            <div className="space-y-4">
              <h4 className="text-[11px] tracking-[0.2em] font-semibold text-on-surface-variant/50 uppercase font-sans">
                Company
              </h4>
              <ul className="space-y-2.5 font-sans">
                <li>
                  <Link href="/#community" className="text-[13px] text-on-surface-variant/85 hover:text-primary transition-colors duration-200">
                    Community
                  </Link>
                </li>
                <li>
                  <Link href="/#about" className="text-[13px] text-on-surface-variant/85 hover:text-primary transition-colors duration-200">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="text-[13px] text-on-surface-variant/85 hover:text-primary transition-colors duration-200">
                    Blog
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 3: Legal */}
            <div className="space-y-4">
              <h4 className="text-[11px] tracking-[0.2em] font-semibold text-on-surface-variant/50 uppercase font-sans">
                Legal
              </h4>
              <ul className="space-y-2.5 font-sans">
                <li>
                  <Link href="/privacy" className="text-[13px] text-on-surface-variant/85 hover:text-primary transition-colors duration-200">
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="text-[13px] text-on-surface-variant/85 hover:text-primary transition-colors duration-200">
                    Terms
                  </Link>
                </li>
              </ul>
            </div>

          </div>

        </div>
      </div>
    </footer>
  );
}
