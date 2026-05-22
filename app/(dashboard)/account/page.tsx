import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { Button } from "@/components/shared/Button";
import Link from "next/link";

export default async function AccountPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen pt-32 pb-20 px-4">
      <div className="max-w-4xl mx-auto">
        <AnimatedSection>
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-4xl font-bold">Your Account</h1>
            <Button href="/api/auth/signout" variant="outline">
              Sign Out
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="col-span-1 md:col-span-2 space-y-6">
              <div className="glass-card rounded-2xl p-8">
                <h2 className="text-2xl font-semibold mb-6 flex items-center gap-3">
                  <span className="text-accent-purple">👤</span> Profile Details
                </h2>
                
                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-muted-foreground">Username</label>
                    <p className="text-lg font-medium">{session.user?.name}</p>
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground">Email Address</label>
                    <p className="text-lg font-medium">{session.user?.email}</p>
                  </div>
                </div>
              </div>

              <div className="glass-card rounded-2xl p-8">
                <h2 className="text-2xl font-semibold mb-6 flex items-center gap-3">
                  <span className="text-accent-teal">📊</span> Usage Stats
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-background border border-border">
                    <p className="text-sm text-muted-foreground mb-1">Documents</p>
                    <p className="text-3xl font-bold">0</p>
                  </div>
                  <div className="p-4 rounded-xl bg-background border border-border">
                    <p className="text-sm text-muted-foreground mb-1">Queries</p>
                    <p className="text-3xl font-bold">0</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-span-1 space-y-6">
              <div className="glass-card rounded-2xl p-8 bg-gradient-to-br from-accent-purple/10 to-accent-teal/10 border-accent-purple/20">
                <h3 className="text-xl font-bold mb-2">Upgrade to Pro</h3>
                <p className="text-sm text-muted-foreground mb-6">
                  Get unlimited document uploads, priority support, and advanced AI models.
                </p>
                <Button href="/pricing" className="w-full justify-center">
                  View Plans
                </Button>
              </div>

              <div className="glass-card rounded-2xl p-6">
                <h3 className="text-sm font-semibold text-muted-foreground mb-4 uppercase tracking-wider">Quick Links</h3>
                <ul className="space-y-3 text-sm">
                  <li>
                    <Link href="/contact" className="hover:text-accent-teal transition-colors">Contact Support</Link>
                  </li>
                  <li>
                    <Link href="#" className="hover:text-accent-teal transition-colors">Documentation</Link>
                  </li>
                  <li>
                    <Link href="#" className="hover:text-accent-teal transition-colors">API Keys</Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
}
