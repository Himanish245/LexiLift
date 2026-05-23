"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { MobileMenu } from "./MobileMenu";
import { Button } from "@/components/shared/Button";

interface NavLink {
  label: string;
  href: string;
  isExternal?: boolean;
}

interface NavbarProps {
  siteName: string;
  logo?: unknown;
  navLinks: NavLink[];
}

export function Navbar({ siteName: _siteName, logo: _logo, navLinks }: NavbarProps) {
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
        className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ease-out ${
          scrolled
            ? "bg-surface/90 py-3 px-6 shadow-sm border-b border-outline-variant/30"
            : "bg-transparent py-5 px-6"
        }`}
        style={{
          backdropFilter: scrolled ? "blur(16px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(16px)" : "none",
        }}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <Link 
            href="/" 
            className="flex items-center group transition-transform duration-200 hover:scale-[1.02]"
          >
            <span className="font-serif text-2xl font-bold tracking-tight text-primary">
              LexiLift
            </span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = link.label === "Platform";
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative text-sm font-medium transition-colors duration-200 py-1 ${
                    isActive
                      ? "text-primary border-b-2 border-primary font-semibold"
                      : "text-on-surface-variant hover:text-on-surface"
                  }`}
                  {...(link.isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-6">
            <Link
              href="/contact"
              className="text-sm font-medium text-on-surface-variant hover:text-on-surface transition-colors duration-200"
            >
              Login
            </Link>
            <Button href="/contact" size="sm" className="bg-primary text-on-primary hover:bg-primary-container">
              Get Started
            </Button>
          </div>

          {/* Mobile Controls */}
          <div className="flex md:hidden items-center gap-3">
            <Button href="/contact" size="sm" className="bg-primary text-on-primary">
              Get Started
            </Button>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="flex flex-col gap-1.5 p-2"
              aria-label="Toggle menu"
            >
              <motion.span
                animate={mobileOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                className="block w-5 h-0.5 bg-on-surface-variant"
              />
              <motion.span
                animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
                className="block w-3.5 h-0.5 bg-on-surface-variant"
              />
              <motion.span
                animate={mobileOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                className="block w-5 h-0.5 bg-on-surface-variant"
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
