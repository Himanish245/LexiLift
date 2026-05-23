import type { Metadata } from "next";
import { Inter, Space_Grotesk, Sora } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isEnabled: isDraftMode } = await draftMode();

  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable} ${sora.variable}`}>
      <body className="font-sans">
        {isDraftMode && <VisualEditing />}
        <SmoothScrollProvider>
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
