"use client";

import { motion } from "framer-motion";

export function GradientOrbs() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {/* Large Sage Green orb - top left */}
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full opacity-35 mix-blend-multiply gpu"
        style={{
          background: "radial-gradient(circle, rgba(66,99,79,0.2) 0%, transparent 70%)",
          filter: "blur(80px)",
          top: "-10%",
          left: "-10%",
        }}
        animate={{
          x: [0, 30, -20, 0],
          y: [0, -20, 15, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
      />
      {/* Terracotta/Rust orb - bottom right */}
      <motion.div
        className="absolute w-[400px] h-[400px] rounded-full opacity-25 mix-blend-multiply gpu"
        style={{
          background: "radial-gradient(circle, rgba(140,78,55,0.12) 0%, transparent 70%)",
          filter: "blur(70px)",
          bottom: "-5%",
          right: "-5%",
        }}
        animate={{
          x: [0, -25, 15, 0],
          y: [0, 20, -10, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear",
        }}
      />
      {/* Smaller Sand/Warm Gold orb - center right */}
      <motion.div
        className="absolute w-[300px] h-[300px] rounded-full opacity-40 mix-blend-multiply gpu"
        style={{
          background: "radial-gradient(circle, rgba(224,213,196,0.3) 0%, transparent 70%)",
          filter: "blur(60px)",
          top: "40%",
          right: "20%",
        }}
        animate={{
          x: [0, -15, 25, 0],
          y: [0, 25, -15, 0],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    </div>
  );
}
