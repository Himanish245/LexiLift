import type { Metadata } from "next";
import { Literata, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const literata = Literata({
  subsets: ["latin"],
  variable: "--font-literata",
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "LexiLift — AI-Powered Knowledge Base",
    template: "%s | LexiLift",
  },
  description: "Transform your documents into an intelligent AI knowledge base with RAG-powered search and chat.",
};

import { VisualEditing } from "next-sanity/visual-editing";
import { draftMode } from "next/headers";
import { SmoothScrollProvider } from "@/components/shared/SmoothScrollProvider";
import { SanityLive } from "@/sanity/lib/live";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isEnabled: isDraftMode } = await draftMode();

  return (
    <html lang="en" className={`${literata.variable} ${plusJakartaSans.variable}`}>
      <body className="font-sans antialiased text-on-surface bg-surface">
        {isDraftMode && <VisualEditing />}
        <SmoothScrollProvider>
          {children}
        </SmoothScrollProvider>
        {isDraftMode && <SanityLive />}
      </body>
    </html>
  );
}
