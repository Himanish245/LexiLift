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
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-4 left-4 right-4 z-50 mx-auto max-w-7xl rounded-2xl transition-all duration-500 ${
          scrolled
            ? "glass-card py-3 px-6 shadow-lg shadow-black/20"
            : "bg-transparent py-4 px-6"
        }`}
        style={{
          backdropFilter: scrolled ? "blur(16px)" : "none",
        }}
      >
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            {logo ? (
              <Image
                src={urlFor(logo).width(32).height(32).url()}
                alt={siteName}
                width={32}
                height={32}
                className="rounded-lg"
              />
            ) : (
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent-purple to-accent-teal" />
            )}
            <span className="text-lg font-bold text-white">{siteName}</span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-muted hover:text-white transition-colors duration-200"
                {...(link.isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-4">
            <Link href="/contact" className="text-sm text-muted hover:text-white transition-colors">
              Log in
            </Link>
            <Button href="/contact" size="sm">
              Book a Demo
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
