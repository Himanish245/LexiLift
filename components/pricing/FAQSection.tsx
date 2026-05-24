"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { cn } from "@/lib/utils";

interface FAQ {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  faqs: FAQ[];
}

export function FAQSection({ faqs }: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const defaultFaqs = [
    { question: "Can I change plans later?", answer: "Yes, you can upgrade or downgrade your plan at any time from your account settings." },
    { question: "Is my data secure?", answer: "We use enterprise-grade encryption and comply with all major privacy frameworks to keep your thoughts safe." },
    { question: "What is \"Hyper-Recall\"?", answer: "Our advanced AI feature that finds semantic connections across your entire knowledge base, surfacing relevant insights instantly." }
  ];

  const displayFaqs = faqs?.length ? faqs : defaultFaqs;

  return (
    <section className="py-24 px-6 max-w-3xl mx-auto bg-surface">
      <AnimatedSection>
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-on-surface text-center mb-12">
          Curious about LexiLift?
        </h2>
        <div className="space-y-4">
          {displayFaqs.map((faq, i) => (
            <div
              key={i}
              className="bg-[#f4f3ef] rounded-2xl overflow-hidden transition-all duration-300 hover:bg-[#eae8e4]"
            >
              <button
                className="w-full px-8 py-6 flex items-center justify-between text-left focus:outline-none"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
              >
                <span className="font-serif font-bold text-lg md:text-xl text-on-surface">{faq.question}</span>
                <span
                  className={cn(
                    "text-on-surface-variant/70 transition-transform duration-300 flex-shrink-0 ml-4",
                    openIndex === i ? "rotate-180" : "rotate-0"
                  )}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
                </span>
              </button>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <div className="px-8 pb-8 pt-2 text-on-surface-variant/90 text-[15px] leading-relaxed font-sans font-medium">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </AnimatedSection>
    </section>
  );
}
