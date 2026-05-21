"use client";

import { motion } from "framer-motion";

export function GradientOrbs() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {/* Large purple orb - top left */}
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full opacity-20"
        style={{
          background: "radial-gradient(circle, rgba(124,92,255,0.4) 0%, transparent 70%)",
          filter: "blur(80px)",
          top: "-10%",
          left: "-10%",
        }}
        animate={{
          x: [0, 30, -20, 0],
          y: [0, -20, 15, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      {/* Teal orb - bottom right */}
      <motion.div
        className="absolute w-[400px] h-[400px] rounded-full opacity-15"
        style={{
          background: "radial-gradient(circle, rgba(0,212,170,0.35) 0%, transparent 70%)",
          filter: "blur(70px)",
          bottom: "-5%",
          right: "-5%",
        }}
        animate={{
          x: [0, -25, 15, 0],
          y: [0, 20, -10, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      {/* Smaller purple orb - center right */}
      <motion.div
        className="absolute w-[300px] h-[300px] rounded-full opacity-10"
        style={{
          background: "radial-gradient(circle, rgba(124,92,255,0.3) 0%, transparent 70%)",
          filter: "blur(60px)",
          top: "40%",
          right: "20%",
        }}
        animate={{
          x: [0, -15, 25, 0],
          y: [0, 25, -15, 0],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
}
