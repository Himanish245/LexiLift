"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { GradientOrbs } from "@/components/animations/GradientOrbs";
import { Button } from "@/components/shared/Button";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res?.error) {
        setError(res.error);
        setLoading(false);
      } else {
        router.push("/account");
        router.refresh();
      }
    } catch (err) {
      setError("An unexpected error occurred");
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
              <span className="text-2xl">👋</span>
            </div>
            <h1 className="text-3xl font-bold mb-2">Welcome Back</h1>
            <p className="text-muted-foreground mb-8">
              Enter your credentials to access your account.
            </p>

            <form onSubmit={handleSubmit} className="space-y-5 text-left">
              {error && (
                <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center">
                  {error}
                </div>
              )}
              
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
                  className="w-full bg-background border border-border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-accent-purple transition-all"
                  placeholder="••••••••"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full gradient-button py-3 text-center disabled:opacity-50 mt-4"
              >
                {loading ? "Signing in..." : "Sign In"}
              </button>
            </form>

            <p className="mt-8 text-sm text-muted-foreground">
              Don't have an account?{" "}
              <Link href="/register" className="text-accent-teal hover:underline font-medium">
                Create one
              </Link>
            </p>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
