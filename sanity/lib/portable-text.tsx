"use client";

import { PortableText as PortableTextComponent } from "@portabletext/react";
import type { PortableTextComponents } from "@portabletext/react";
import Image from "next/image";
import { urlFor } from "./image";

const components: PortableTextComponents = {
  types: {
    image: ({ value }) => {
      if (!value?.asset) return null;
      return (
        <figure className="my-8 rounded-xl overflow-hidden">
          <Image
            src={urlFor(value).width(800).url()}
            alt={value.alt || "Blog image"}
            width={800}
            height={450}
            className="w-full h-auto"
          />
          {value.caption && (
            <figcaption className="text-sm text-muted-foreground mt-2 text-center">
              {value.caption}
            </figcaption>
          )}
        </figure>
      );
    },
    codeBlock: ({ value }) => (
      <pre className="bg-card border border-border rounded-xl p-4 my-6 overflow-x-auto">
        <code className="text-sm text-accent-teal font-mono">
          {value.code}
        </code>
      </pre>
    ),
  },
  block: {
    h2: ({ children }) => (
      <h2 className="text-2xl md:text-3xl font-bold mt-12 mb-4">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl md:text-2xl font-bold mt-8 mb-3">{children}</h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-lg font-semibold mt-6 mb-2">{children}</h4>
    ),
    normal: ({ children }) => (
      <p className="text-foreground/80 leading-relaxed mb-4">{children}</p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-2 border-accent-purple pl-4 my-6 text-muted italic">
        {children}
      </blockquote>
    ),
  },
  marks: {
    link: ({ children, value }) => (
      <a
        href={value?.href}
        target={value?.href?.startsWith("http") ? "_blank" : undefined}
        rel={value?.href?.startsWith("http") ? "noopener noreferrer" : undefined}
        className="text-accent-purple hover:text-accent-teal transition-colors underline"
      >
        {children}
      </a>
    ),
    code: ({ children }) => (
      <code className="bg-card px-1.5 py-0.5 rounded text-sm text-accent-teal font-mono">
        {children}
      </code>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc list-inside space-y-1 mb-4 text-foreground/80">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal list-inside space-y-1 mb-4 text-foreground/80">{children}</ol>
    ),
  },
};

interface PortableTextProps {
  value: any;
}

export function PortableText({ value }: PortableTextProps) {
  return <PortableTextComponent value={value} components={components} />;
}
