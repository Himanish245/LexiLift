import type { Metadata } from "next";
import { client } from "@/sanity/lib/client";
import { contactPageQuery } from "@/sanity/lib/queries";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { GradientOrbs } from "@/components/animations/GradientOrbs";
import { ContactForm } from "@/components/contact/ContactForm";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const data = await client.fetch(contactPageQuery);
  return {
    title: data?.seo?.metaTitle || "Contact Us",
    description: data?.seo?.metaDescription || "Get in touch with the LexiLift team to see how we can help your organization.",
  };
}

export default async function ContactPage() {
  const data = await client.fetch(contactPageQuery);

  return (
    <>
      <section className="relative pt-32 pb-20 overflow-hidden">
        <GradientOrbs />
        <div className="relative z-10 max-w-7xl mx-auto px-4">
          <AnimatedSection className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              {data?.headline || "Let's Talk"}
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground">
              {data?.subtitle || "Whether you have a question about features, pricing, or anything else, our team is ready to answer all your questions."}
            </p>
          </AnimatedSection>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-start">
            {/* Left: Contact Form */}
            <AnimatedSection delay={0.1}>
              <h2 className="text-2xl font-bold mb-6">{data?.formHeading || "Send us a message"}</h2>
              <ContactForm />
            </AnimatedSection>

            {/* Right: Info / Calendar */}
            <AnimatedSection delay={0.2} className="space-y-12">
              <div>
                <h2 className="text-2xl font-bold mb-6">{data?.calendarHeading || "Book a Live Demo"}</h2>
                <div className="bg-card border border-border rounded-2xl p-8 min-h-[400px] flex items-center justify-center text-center">
                  {data?.calendarEmbedUrl ? (
                    <div className="w-full h-full relative">
                      {/* Normally you'd embed an iframe here based on the URL */}
                      <p className="text-muted-foreground">Calendar embed goes here for: {data.calendarEmbedUrl}</p>
                    </div>
                  ) : (
                    <div>
                      <div className="w-16 h-16 rounded-full bg-accent-purple/20 flex items-center justify-center text-2xl mx-auto mb-4">
                        📅
                      </div>
                      <h3 className="text-xl font-bold mb-2">Schedule a Call</h3>
                      <p className="text-muted-foreground mb-6">Pick a time that works for you and we'll show you how LexiLift works.</p>
                      <a href="https://cal.com" target="_blank" rel="noopener noreferrer" className="inline-block gradient-button px-6 py-2">
                        Open Calendar
                      </a>
                    </div>
                  )}
                </div>
              </div>

              {(data?.contactEmail || data?.contactPhone || data?.socialLinks?.length > 0) && (
                <div className="bg-card border border-border rounded-2xl p-8">
                  <h3 className="text-xl font-bold mb-6">Direct Contact</h3>
                  <div className="space-y-4">
                    {data.contactEmail && (
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-accent-teal/10 flex items-center justify-center text-accent-teal">
                          ✉️
                        </div>
                        <a href={`mailto:${data.contactEmail}`} className="text-foreground hover:text-accent-teal transition-colors">
                          {data.contactEmail}
                        </a>
                      </div>
                    )}
                    {data.contactPhone && (
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-accent-purple/10 flex items-center justify-center text-accent-purple">
                          📞
                        </div>
                        <a href={`tel:${data.contactPhone}`} className="text-foreground hover:text-accent-purple transition-colors">
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
