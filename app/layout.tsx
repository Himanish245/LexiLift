import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
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

export const metadata: Metadata = {
  title: {
    default: "LexiLift — AI-Powered Knowledge Base",
    template: "%s | LexiLift",
  },
  description: "Transform your documents into an intelligent AI knowledge base with RAG-powered search and chat.",
};

import { VisualEditing } from "next-sanity";
import { draftMode } from "next/headers";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isDraftMode = draftMode().isEnabled;

  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body className="font-sans">
        {isDraftMode && <VisualEditing />}
        {children}
      </body>
    </html>
  );
}
