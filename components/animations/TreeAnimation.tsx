"use client";

import React from "react";

export function TreeAnimation() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-[2.5rem]">
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes sway {
          0%, 100% { transform: rotate(0deg) scale(1); }
          50% { transform: rotate(3deg) scale(1.02); }
        }
        @keyframes sway-reverse {
          0%, 100% { transform: rotate(0deg) scale(1); }
          50% { transform: rotate(-3deg) scale(1.02); }
        }
        .animate-sway { animation: sway 12s ease-in-out infinite; }
        .animate-sway-reverse { animation: sway-reverse 14s ease-in-out infinite; }
        .animate-sway-fast { animation: sway 8s ease-in-out infinite; }
      `}} />

      {/* Top Left Branches */}
      <svg
        className="absolute -top-10 -left-10 w-[300px] md:w-[450px] h-auto opacity-15 text-[#36664d] origin-top-left animate-sway"
        viewBox="0 0 200 200"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M0,0 C50,20 80,60 120,120" />
        <path d="M30,15 C60,40 90,50 150,80" />
        <path d="M10,40 C40,70 60,110 80,160" />
        
        {/* Leaves */}
        <path d="M120,120 C130,110 140,120 120,130 C110,140 100,130 120,120 Z" fill="currentColor" opacity="0.5" />
        <path d="M150,80 C160,70 170,80 150,90 C140,100 130,90 150,80 Z" fill="currentColor" opacity="0.5" />
        <path d="M80,160 C90,150 100,160 80,170 C70,180 60,170 80,160 Z" fill="currentColor" opacity="0.5" />
        <path d="M50,70 C60,60 70,70 50,80 C40,90 30,80 50,70 Z" fill="currentColor" opacity="0.5" />
        <path d="M80,30 C90,20 100,30 80,40 C70,50 60,40 80,30 Z" fill="currentColor" opacity="0.5" />
      </svg>

      {/* Bottom Right Branches */}
      <svg
        className="absolute -bottom-10 -right-10 w-[300px] md:w-[450px] h-auto opacity-15 text-[#36664d] origin-bottom-right animate-sway-reverse"
        viewBox="0 0 200 200"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M200,200 C150,180 120,140 80,80" />
        <path d="M170,185 C140,160 110,150 50,120" />
        <path d="M190,160 C160,130 140,90 120,40" />
        
        {/* Leaves */}
        <path d="M80,80 C70,90 60,80 80,70 C90,60 100,70 80,80 Z" fill="currentColor" opacity="0.5" />
        <path d="M50,120 C40,130 30,120 50,110 C60,100 70,110 50,120 Z" fill="currentColor" opacity="0.5" />
        <path d="M120,40 C110,50 100,40 120,30 C130,20 140,30 120,40 Z" fill="currentColor" opacity="0.5" />
        <path d="M150,130 C140,140 130,130 150,120 C160,110 170,120 150,130 Z" fill="currentColor" opacity="0.5" />
        <path d="M120,170 C110,180 100,170 120,160 C130,150 140,160 120,170 Z" fill="currentColor" opacity="0.5" />
      </svg>

      {/* Additional subtle center drifting leaves */}
      <svg
        className="absolute top-[20%] left-[60%] w-12 h-12 opacity-10 text-[#a0735d] origin-center animate-sway-fast"
        viewBox="0 0 40 40"
        fill="currentColor"
      >
        <path d="M20,20 C30,10 40,20 20,30 C10,40 0,30 20,20 Z" />
      </svg>
      <svg
        className="absolute top-[70%] left-[20%] w-8 h-8 opacity-10 text-[#36664d] origin-center animate-sway-reverse"
        viewBox="0 0 40 40"
        fill="currentColor"
      >
        <path d="M20,20 C30,10 40,20 20,30 C10,40 0,30 20,20 Z" />
      </svg>
    </div>
  );
}
