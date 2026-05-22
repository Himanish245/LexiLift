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
    <div className="bg-card border border-border rounded-2xl p-8">
      {status === "success" ? (
        <div className="text-center py-12">
          <div className="w-16 h-16 rounded-full bg-accent-teal/20 text-accent-teal flex items-center justify-center text-2xl mx-auto mb-4">
            ✓
          </div>
          <h3 className="text-2xl font-bold mb-2">Message Sent!</h3>
          <p className="text-muted-foreground mb-6">
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
              <label htmlFor="firstName" className="text-sm font-medium text-foreground">First Name</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                required
                className="w-full bg-background border border-border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-accent-purple transition-all"
                placeholder="Jane"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="lastName" className="text-sm font-medium text-foreground">Last Name</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                required
                className="w-full bg-background border border-border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-accent-purple transition-all"
                placeholder="Doe"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium text-foreground">Work Email</label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="w-full bg-background border border-border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-accent-purple transition-all"
              placeholder="jane@company.com"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="companySize" className="text-sm font-medium text-foreground">Company Size</label>
            <select
              id="companySize"
              name="companySize"
              className="w-full bg-background border border-border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-accent-purple transition-all text-foreground appearance-none"
            >
              <option value="1-10">1-10 employees</option>
              <option value="11-50">11-50 employees</option>
              <option value="51-200">51-200 employees</option>
              <option value="201-500">201-500 employees</option>
              <option value="501+">501+ employees</option>
            </select>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="message" className="text-sm font-medium text-foreground">How can we help?</label>
            <textarea
              id="message"
              name="message"
              required
              rows={4}
              className="w-full bg-background border border-border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-accent-purple transition-all resize-none"
              placeholder="Tell us about your team's knowledge management challenges..."
            />
          </div>

          <button
            type="submit"
            disabled={status === "submitting"}
            className="w-full gradient-button py-3 text-center disabled:opacity-50"
          >
            {status === "submitting" ? "Sending..." : "Send Message"}
          </button>
        </form>
      )}
    </div>
  );
}
