"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { GradientOrbs } from "@/components/animations/GradientOrbs";
import { signIn } from "next-auth/react";

export default function RegisterPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const username = formData.get("username") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Registration failed");
      }

      // Automatically sign in after successful registration
      const signInRes = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (signInRes?.error) {
        throw new Error(signInRes.error);
      }

      router.push("/account");
      router.refresh();
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred");
      setLoading(false);
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden py-24 px-4">
      <GradientOrbs />
      <div className="w-full max-w-md relative z-10">
        <AnimatedSection>
          <div className="glass-card rounded-3xl p-8 md:p-10 text-center">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent-purple to-accent-teal mx-auto mb-6 flex items-center justify-center">
              <span className="text-2xl">✨</span>
            </div>
            <h1 className="text-3xl font-bold mb-2">Create an Account</h1>
            <p className="text-muted-foreground mb-8">
              Join LexiLift to start building your knowledge base.
            </p>

            <form onSubmit={handleSubmit} className="space-y-5 text-left">
              {error && (
                <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center">
                  {error}
                </div>
              )}
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Username</label>
                <input
                  name="username"
                  type="text"
                  required
                  className="w-full bg-background border border-border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-accent-purple transition-all"
                  placeholder="johndoe"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Email Address</label>
                <input
                  name="email"
                  type="email"
                  required
                  className="w-full bg-background border border-border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-accent-purple transition-all"
                  placeholder="name@example.com"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Password</label>
                <input
                  name="password"
                  type="password"
                  required
                  minLength={6}
                  className="w-full bg-background border border-border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-accent-purple transition-all"
                  placeholder="••••••••"
                />
                <p className="text-xs text-muted-foreground mt-1">Must be at least 6 characters</p>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full gradient-button py-3 text-center disabled:opacity-50 mt-4"
              >
                {loading ? "Creating Account..." : "Sign Up"}
              </button>
            </form>

            <p className="mt-8 text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link href="/login" className="text-accent-purple hover:underline font-medium">
                Sign in
              </Link>
            </p>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
