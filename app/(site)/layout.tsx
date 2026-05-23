import { sanityFetch } from "@/sanity/lib/live";
import { siteSettingsQuery } from "@/sanity/lib/queries";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await sanityFetch({ query: siteSettingsQuery });

  const defaultNavLinks = [
    { label: "Home", href: "/", isExternal: false },
    { label: "Pricing", href: "/pricing", isExternal: false },
    { label: "Blog", href: "/blog", isExternal: false },
    { label: "About", href: "/about", isExternal: false },
  ];

  const defaultFooterLinks = [
    { label: "Privacy", href: "/privacy", isExternal: false },
    { label: "Terms", href: "/terms", isExternal: false },
  ];

  return (
    <>
      <Navbar
        siteName={settings?.siteName || "LexiLift"}
        logo={settings?.logo}
        navLinks={settings?.navLinks || defaultNavLinks}
      />
      <main className="min-h-screen">{children}</main>
      <Footer
        siteName={settings?.siteName || "LexiLift"}
        footerLinks={settings?.footerLinks || defaultFooterLinks}
        socialLinks={settings?.socialLinks || []}
      />
    </>
  );
}
