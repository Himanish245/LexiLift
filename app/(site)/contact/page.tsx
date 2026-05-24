import type { Metadata } from "next";
import { sanityFetch } from "@/sanity/lib/live";
import { contactPageQuery } from "@/sanity/lib/queries";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { ContactForm } from "@/components/contact/ContactForm";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const { data } = await sanityFetch({ query: contactPageQuery });
  return {
    title: data?.seo?.metaTitle || "Contact Us",
    description: data?.seo?.metaDescription || "Get in touch with the LexiLift team to see how we can help your organization.",
  };
}

export default async function ContactPage() {
  const { data } = await sanityFetch({ query: contactPageQuery });

  return (
    <>
      <section className="relative pt-32 pb-20 overflow-hidden bg-surface min-h-screen">
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8">
          <AnimatedSection className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="text-4xl md:text-5xl lg:text-[56px] font-serif font-semibold text-on-surface leading-[1.12] tracking-tight mb-6">
              {data?.headline || "Let's Talk"}
            </h1>
            <p className="text-base md:text-lg text-on-surface-variant/90 leading-relaxed font-sans max-w-2xl mx-auto">
              {data?.subtitle || "Whether you have a question about features, pricing, or anything else, our team is ready to answer all your questions."}
            </p>
          </AnimatedSection>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-start">
            {/* Left: Contact Form */}
            <AnimatedSection delay={0.1}>
              <h2 className="text-2xl md:text-3xl font-serif font-semibold text-on-surface mb-8">{data?.formHeading || "Send us a message"}</h2>
              <ContactForm />
            </AnimatedSection>

            {/* Right: Info / Calendar */}
            <AnimatedSection delay={0.2} className="space-y-8">
              <div>
                <h2 className="text-2xl md:text-3xl font-serif font-semibold text-on-surface mb-8">{data?.calendarHeading || "Book a Live Demo"}</h2>
                <div className="bg-white border border-outline-variant/40 rounded-[2rem] overflow-hidden shadow-sm min-h-[450px]">
                  <iframe
                    src="https://cal.com/himanish-wmy52u?embed=true&theme=light"
                    width="100%"
                    height="450"
                    frameBorder="0"
                    allow="camera;microphone"
                    style={{ border: "none", minHeight: "450px" }}
                    title="Schedule a call with LexiLift"
                  />
                </div>
              </div>

              {(data?.contactEmail || data?.contactPhone || data?.socialLinks?.length > 0) && (
                <div className="bg-white border border-outline-variant/40 rounded-[2rem] p-8 shadow-sm">
                  <h3 className="text-xl font-serif font-semibold text-on-surface mb-6">Direct Contact</h3>
                  <div className="space-y-5">
                    {data.contactEmail && (
                      <div className="flex items-center gap-4 group">
                        <div className="w-12 h-12 rounded-full bg-[#fcede8] flex items-center justify-center text-secondary group-hover:scale-105 transition-transform">
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                        </div>
                        <a href={`mailto:${data.contactEmail}`} className="text-[15px] font-medium text-on-surface-variant/90 hover:text-on-surface transition-colors">
                          {data.contactEmail}
                        </a>
                      </div>
                    )}
                    {data.contactPhone && (
                      <div className="flex items-center gap-4 group">
                        <div className="w-12 h-12 rounded-full bg-[#f4f3ef] border border-outline-variant/35 flex items-center justify-center text-on-surface-variant group-hover:scale-105 transition-transform">
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                        </div>
                        <a href={`tel:${data.contactPhone}`} className="text-[15px] font-medium text-on-surface-variant/90 hover:text-on-surface transition-colors">
                          {data.contactPhone}
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </AnimatedSection>
          </div>
        </div>
      </section>
    </>
  );
}
