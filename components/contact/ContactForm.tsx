"use client";

import { useState } from "react";
import { Button } from "@/components/shared/Button";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submitting");
    
    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: formData.get("firstName"),
          lastName: formData.get("lastName"),
          email: formData.get("email"),
          companySize: formData.get("companySize"),
          message: formData.get("message"),
        }),
      });

      if (!res.ok) throw new Error("Failed");
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="bg-white border border-outline-variant/40 rounded-[2rem] p-8 shadow-sm">
      {status === "success" ? (
        <div className="text-center py-12">
          <div className="w-16 h-16 rounded-full bg-[#fcede8] text-secondary flex items-center justify-center text-2xl mx-auto mb-4">
            ✓
          </div>
          <h3 className="text-2xl font-serif font-semibold text-on-surface mb-2">Message Sent!</h3>
          <p className="text-on-surface-variant/90 mb-6">
            We'll get back to you as soon as possible.
          </p>
          <Button href="#" onClick={(e: any) => { e.preventDefault(); setStatus("idle"); }} variant="outline">
            Send another message
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          {status === "error" && (
            <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
              Something went wrong. Please try again.
            </div>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="firstName" className="text-[13px] font-semibold text-on-surface-variant/80 uppercase tracking-wider">First Name</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                required
                className="w-full bg-[#fbf9f5] border border-outline-variant/40 rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-on-surface placeholder:text-on-surface-variant/40 shadow-sm"
                placeholder="Jane"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="lastName" className="text-[13px] font-semibold text-on-surface-variant/80 uppercase tracking-wider">Last Name</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                required
                className="w-full bg-[#fbf9f5] border border-outline-variant/40 rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-on-surface placeholder:text-on-surface-variant/40 shadow-sm"
                placeholder="Doe"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="email" className="text-[13px] font-semibold text-on-surface-variant/80 uppercase tracking-wider">Work Email</label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="w-full bg-[#fbf9f5] border border-outline-variant/40 rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-on-surface placeholder:text-on-surface-variant/40 shadow-sm"
              placeholder="jane@company.com"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="companySize" className="text-[13px] font-semibold text-on-surface-variant/80 uppercase tracking-wider">Company Size</label>
            <select
              id="companySize"
              name="companySize"
              className="w-full bg-[#fbf9f5] border border-outline-variant/40 rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-on-surface appearance-none shadow-sm"
            >
              <option value="1-10">1-10 employees</option>
              <option value="11-50">11-50 employees</option>
              <option value="51-200">51-200 employees</option>
              <option value="201-500">201-500 employees</option>
              <option value="501+">501+ employees</option>
            </select>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="message" className="text-[13px] font-semibold text-on-surface-variant/80 uppercase tracking-wider">How can we help?</label>
            <textarea
              id="message"
              name="message"
              required
              rows={4}
              className="w-full bg-[#fbf9f5] border border-outline-variant/40 rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none text-on-surface placeholder:text-on-surface-variant/40 shadow-sm"
              placeholder="Tell us about your team's knowledge management challenges..."
            />
          </div>

          <button
            type="submit"
            disabled={status === "submitting"}
            className="w-full bg-primary text-on-primary rounded-full hover:bg-primary-container py-3.5 text-center disabled:opacity-50 transition-all font-semibold shadow-sm"
          >
            {status === "submitting" ? "Sending..." : "Send Message"}
          </button>
        </form>
      )}
    </div>
  );
}
