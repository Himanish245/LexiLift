"use client";

import { useState, useEffect } from "react";
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
  // Modal states
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [searchStep, setSearchStep] = useState(0);
  const [answer, setAnswer] = useState("");
  const [typedAnswer, setTypedAnswer] = useState("");

  // Keyboard shortcut listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Disable body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Typewriter effect for AI answers
  useEffect(() => {
    if (!answer) {
      setTypedAnswer("");
      return;
    }
    setTypedAnswer("");
    let index = 0;
    const interval = setInterval(() => {
      setTypedAnswer((prev) => prev + answer.charAt(index));
      index++;
      if (index >= answer.length) {
        clearInterval(interval);
      }
    }, 12); // Fast, snappy typing speed
    return () => clearInterval(interval);
  }, [answer]);

  // Simulated RAG Search Engine
  const handleSearch = (queryText: string) => {
    if (!queryText.trim()) return;
    setSearchQuery(queryText);
    setIsSearching(true);
    setSearchStep(0);
    setAnswer("");
    setTypedAnswer("");

    // Step-by-step semantic search pipeline simulation
    setTimeout(() => {
      setSearchStep(1);
      setTimeout(() => {
        setSearchStep(2);
        setTimeout(() => {
          setSearchStep(3);
          setIsSearching(false);
          
          const cleanQuery = queryText.toLowerCase();
          let matchedAnswer = "";
          
          if (cleanQuery.includes("what is") || cleanQuery.includes("lexilift") || cleanQuery.includes("introduce")) {
            matchedAnswer = "LexiLift is an AI-powered Knowledge Base platform. It allows you to upload documents (PDFs, docs, text, web links) and uses Retrieval-Augmented Generation (RAG) to let you search and chat with your files, giving instant cited answers.";
          } else if (cleanQuery.includes("doc") || cleanQuery.includes("pdf") || cleanQuery.includes("format") || cleanQuery.includes("support")) {
            matchedAnswer = "LexiLift supports a wide variety of formats including PDFs, Word documents (.docx), Markdown, plain text files, and public website URLs. All content is split, vectorized, and stored securely.";
          } else if (cleanQuery.includes("secure") || cleanQuery.includes("safe") || cleanQuery.includes("privacy") || cleanQuery.includes("encrypt")) {
            matchedAnswer = "Yes, security is our top priority. Your documents are encrypted both in transit (TLS 1.3) and at rest. We offer enterprise-grade role-based access control (RBAC) and data isolation so your information is never shared or used to train public models.";
          } else if (cleanQuery.includes("how") && (cleanQuery.includes("search") || cleanQuery.includes("rag") || cleanQuery.includes("work"))) {
            matchedAnswer = "We use semantic vector search. When you upload a document, we break it into smaller semantic chunks, generate vector embeddings, and store them. When you ask a question, our system finds the most relevant chunks and feeds them to the LLM to write a precise, cited answer.";
          } else if (cleanQuery.includes("free") || cleanQuery.includes("pricing") || cleanQuery.includes("cost") || cleanQuery.includes("trial")) {
            matchedAnswer = "Yes! Our free plan includes up to 50 document uploads, 100 AI queries per month, and basic integrations. No credit card is required to sign up.";
          } else if (cleanQuery.includes("slack") || cleanQuery.includes("notion") || cleanQuery.includes("integrate") || cleanQuery.includes("connect")) {
            matchedAnswer = "You can connect integrations in your dashboard. Simply click 'Add to Slack' or authorize Notion, select the channels/workspaces you want to index, and LexiLift will keep your knowledge base synchronized in real-time.";
          } else {
            matchedAnswer = `I searched your knowledge base for "${queryText}" but couldn't find a direct match. LexiLift is fully customizable, so you can upload your own documents to answer this question! Try asking about 'security', 'pricing', or 'Slack integration'.`;
          }
          setAnswer(matchedAnswer);
        }, 800);
      }, 700);
    }, 600);
  };

  return (
    <footer className="border-t border-border/50 bg-background relative z-40">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
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

          {/* Interactive AI Search Trigger Pill */}
          <button
            onClick={() => setIsOpen(true)}
            className="relative flex items-center gap-3 px-5 py-2.5 rounded-full glass-card text-xs font-semibold tracking-wide cursor-pointer overflow-hidden transition-all duration-300 hover:border-accent-purple/40 hover:shadow-lg hover:shadow-accent-purple/10 active:scale-95 group font-sora text-muted hover:text-foreground"
            aria-label="Ask LexiLift AI"
          >
            {/* Background Hover slide-in gradient overlay */}
            <span className="absolute inset-0 bg-gradient-to-r from-accent-purple/5 to-accent-teal/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            {/* Pulsing Status dot */}
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-teal opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-teal"></span>
            </span>

            <span>Ask LexiLift AI...</span>

            <kbd className="hidden sm:inline-flex items-center gap-0.5 h-5 select-none pointer-events-none rounded border border-border/80 bg-white/5 px-1.5 font-mono text-[9px] font-medium text-muted-foreground ml-1">
              ⌘K
            </kbd>
          </button>

          {/* Navigation & Social Links */}
          <div className="flex flex-col sm:flex-row items-center gap-6 md:gap-10">
            {/* Symmetrical spaced-out footer links */}
            <div className="flex items-center gap-8 md:gap-12">
              {footerLinks.map((link, index) => (
                <Link
                  key={`${link.label}-${index}`}
                  href={link.href}
                  className="text-sm text-muted hover:text-foreground transition-colors duration-200 font-medium"
                  {...(link.isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Social Links (only renders if present, separated by a thin line on desktop) */}
            {socialLinks && socialLinks.length > 0 && (
              <div className="flex items-center gap-4 sm:border-l sm:border-border/50 sm:pl-6">
                {socialLinks.map((social) => (
                  <a
                    key={social.platform}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-muted hover:text-accent-purple transition-colors duration-200 capitalize font-medium"
                  >
                    {social.platform}
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border/30 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} {siteName}. All rights reserved.
        </div>
      </div>

      {/* Floating Glassmorphic AI Search Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-background/85 backdrop-blur-md cursor-pointer"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Modal Container */}
          <div className="relative w-full max-w-lg bg-[#0e0e13]/90 border border-border/80 rounded-2xl p-6 shadow-2xl overflow-hidden glass-card transition-all duration-300 animate-in zoom-in-95 duration-200">
            
            {/* Ambient background glows */}
            <div className="absolute -top-24 -left-24 w-48 h-48 bg-accent-purple/15 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-accent-teal/15 rounded-full blur-3xl pointer-events-none" />
            
            {/* Header */}
            <div className="flex items-center justify-between mb-4 relative z-10">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-accent-teal animate-pulse" />
                <span className="font-sora text-xs font-semibold tracking-wider text-muted uppercase">LexiLift AI Agent</span>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-muted hover:text-foreground hover:bg-white/5 w-6 h-6 rounded-full flex items-center justify-center text-sm transition-all duration-200 cursor-pointer"
                aria-label="Close modal"
              >
                ✕
              </button>
            </div>

            {/* Title / Header text */}
            <div className="mb-4 relative z-10">
              <h3 className="font-sora text-lg font-bold text-foreground">
                How can I help you today?
              </h3>
              <p className="text-xs text-muted-foreground font-sans mt-1">
                Ask a question about LexiLift features, security, pricing, or integrations.
              </p>
            </div>

            {/* Search Input */}
            <div className="relative mb-5 z-10">
              <input
                type="text"
                placeholder="Type your question..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSearch(searchQuery);
                }}
                disabled={isSearching}
                className="w-full bg-[#07070a]/90 border border-border/80 focus:border-accent-purple/50 rounded-xl px-4 py-3 text-sm text-foreground placeholder-muted-foreground outline-none transition-all duration-200 focus:shadow-[0_0_15px_rgba(124,92,255,0.1)] pr-10 disabled:opacity-70 font-sans"
                autoFocus
              />
              <button
                onClick={() => handleSearch(searchQuery)}
                disabled={isSearching || !searchQuery.trim()}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-muted hover:text-accent-teal disabled:text-muted-foreground/30 p-1.5 transition-colors duration-200 cursor-pointer disabled:cursor-not-allowed"
                aria-label="Submit search"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4.5 h-4.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </button>
            </div>

            {/* Suggestion Chips */}
            {!isSearching && !answer && (
              <div className="mb-2 relative z-10 animate-in fade-in duration-300">
                <p className="text-xs text-muted font-sora mb-2.5">Suggested Questions:</p>
                <div className="flex flex-col gap-2">
                  {[
                    "What is LexiLift?",
                    "What documents are supported?",
                    "Is my data secure?",
                    "Is there a free trial?"
                  ].map((suggestion) => (
                    <button
                      key={suggestion}
                      onClick={() => handleSearch(suggestion)}
                      className="text-left text-xs text-muted-foreground hover:text-foreground bg-white/3 hover:bg-white/5 border border-border/50 hover:border-accent-purple/30 rounded-xl px-4 py-2.5 transition-all duration-200 cursor-pointer font-sora flex items-center justify-between group/chip"
                    >
                      <span>{suggestion}</span>
                      <span className="text-muted-foreground/0 group-hover/chip:text-accent-teal transition-all duration-200 text-xs translate-x-1 group-hover/chip:translate-x-0">
                        ➔
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Searching State / Retrieval Step Timeline */}
            {isSearching && (
              <div className="py-4 space-y-4 relative z-10 animate-in fade-in duration-150">
                <div className="flex items-center gap-3">
                  <div className={`h-2 w-2 rounded-full transition-all duration-300 ${searchStep >= 0 ? "bg-accent-teal shadow-[0_0_8px_var(--color-accent-teal)] scale-110" : "bg-muted/40"}`} />
                  <span className={`text-xs font-sora transition-colors duration-200 ${searchStep === 0 ? "text-foreground font-semibold" : "text-muted"}`}>
                    Analyzing search term syntax...
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className={`h-2 w-2 rounded-full transition-all duration-300 ${searchStep >= 1 ? "bg-accent-teal shadow-[0_0_8px_var(--color-accent-teal)] scale-110" : "bg-muted/40"}`} />
                  <span className={`text-xs font-sora transition-colors duration-200 ${searchStep === 1 ? "text-foreground font-semibold" : "text-muted"}`}>
                    Retrieving matching chunks from vector database...
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className={`h-2 w-2 rounded-full transition-all duration-300 ${searchStep >= 2 ? "bg-accent-purple shadow-[0_0_8px_var(--color-accent-purple)] scale-110" : "bg-muted/40"}`} />
                  <span className={`text-xs font-sora transition-colors duration-200 ${searchStep === 2 ? "text-foreground font-semibold" : "text-muted"}`}>
                    Generating summary with generative AI LLM...
                  </span>
                </div>
                <div className="h-1.5 w-full bg-border/40 rounded-full overflow-hidden mt-6">
                  <div 
                    className="h-full bg-gradient-to-r from-accent-teal to-accent-purple transition-all duration-300 ease-out"
                    style={{ width: `${(searchStep / 3) * 100}%` }}
                  />
                </div>
              </div>
            )}

            {/* Answer View */}
            {!isSearching && answer && (
              <div className="relative z-10 bg-[#07070a]/60 border border-border/50 rounded-xl p-4 mt-1 animate-in fade-in zoom-in-98 duration-350">
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-accent-purple font-sora">Retrieval Answer</span>
                  <span className="text-[10px] bg-accent-teal/10 text-accent-teal px-2 py-0.5 rounded font-mono font-semibold">CITED DOC</span>
                </div>
                <p className="text-sm text-foreground/90 leading-relaxed font-sans min-h-[50px] whitespace-pre-line">
                  {typedAnswer}
                  {typedAnswer.length < answer.length && (
                    <span className="inline-block w-1.5 h-3.5 bg-accent-teal ml-0.5 animate-pulse" />
                  )}
                </p>
                
                {typedAnswer.length >= answer.length && (
                  <div className="mt-5 pt-3 border-t border-border/40 flex justify-between items-center animate-in fade-in duration-300">
                    <button 
                      onClick={() => {
                        setSearchQuery("");
                        setAnswer("");
                        setTypedAnswer("");
                      }}
                      className="text-xs text-accent-teal hover:text-accent-teal/80 transition-colors duration-200 cursor-pointer font-sora flex items-center gap-1.5 font-semibold"
                    >
                      ← New question
                    </button>
                    <span className="text-[10px] text-muted font-sora">Latency: 1.2s</span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </footer>
  );
}
