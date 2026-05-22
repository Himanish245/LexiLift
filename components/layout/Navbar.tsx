"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { MobileMenu } from "./MobileMenu";
import { Button } from "@/components/shared/Button";
import { urlFor } from "@/sanity/lib/image";

interface NavLink {
  label: string;
  href: string;
  isExternal?: boolean;
}

interface NavbarProps {
  siteName: string;
  logo?: any;
  navLinks: NavLink[];
}

export function Navbar({ siteName, logo, navLinks }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
        className={`fixed top-4 left-4 right-4 z-50 mx-auto max-w-7xl rounded-2xl transition-all duration-300 ease-out ${
          scrolled
            ? "glass-card py-3 px-6 shadow-lg shadow-black/20"
            : "bg-transparent py-4 px-6"
        }`}
        style={{
          backdropFilter: scrolled ? "blur(16px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(16px)" : "none",
        }}
      >
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link 
            href="/" 
            className="flex items-center gap-2.5 group transition-transform duration-200 hover:scale-[1.02]"
          >
            <Image
              src="/logo.svg"
              alt={siteName}
              width={32}
              height={32}
              className="w-8 h-8 object-contain transition-transform duration-300 ease-out group-hover:rotate-[8deg]"
            />
            <span className="font-sora text-xl font-extrabold tracking-tight text-foreground">
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
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-muted hover:text-foreground transition-colors duration-200"
                {...(link.isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              >
                {link.label}
              </Link>
            ))}
          </div>

        {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-4">
            <Button href="/contact" size="sm">
              Contact Us
            </Button>
          </div>

          {/* Mobile Controls */}
          <div className="flex md:hidden items-center gap-3">
            <Button href="/contact" size="sm">
              Demo
            </Button>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="flex flex-col gap-1.5 p-2"
              aria-label="Toggle menu"
            >
              <motion.span
                animate={mobileOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                className="block w-5 h-0.5 bg-muted"
              />
              <motion.span
                animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
                className="block w-3.5 h-0.5 bg-muted"
              />
              <motion.span
                animate={mobileOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                className="block w-5 h-0.5 bg-muted"
              />
            </button>
          </div>
        </div>
      </motion.nav>

      <MobileMenu
        isOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
        navLinks={navLinks}
      />
    </>
  );
}
