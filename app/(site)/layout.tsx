import { sanityFetch } from "@/sanity/lib/live";
import { siteSettingsQuery } from "@/sanity/lib/queries";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: settings } = await sanityFetch({ query: siteSettingsQuery });

  const defaultNavLinks = [
    { label: "Platform", href: "/#platform", isExternal: false },
    { label: "Resources", href: "/#resources", isExternal: false },
    { label: "Pricing", href: "/pricing", isExternal: false },
    { label: "Company", href: "/#company", isExternal: false },
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
