"use client";

import { motion } from "framer-motion";

export function MeshGradient({ className = "" }: { className?: string }) {
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`} aria-hidden="true">
      {/* Teal orb */}
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full opacity-10 mix-blend-screen gpu"
        style={{
          background: "radial-gradient(circle, rgba(13,148,136,0.3) 0%, transparent 70%)",
          filter: "blur(100px)",
          top: "-20%",
          left: "-10%",
        }}
        animate={{
          x: [0, 50, -40, 0],
          y: [0, -40, 30, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear",
        }}
      />
      {/* Violet orb */}
      <motion.div
        className="absolute w-[800px] h-[800px] rounded-full opacity-10 mix-blend-screen gpu"
        style={{
          background: "radial-gradient(circle, rgba(124,58,237,0.2) 0%, transparent 70%)",
          filter: "blur(120px)",
          bottom: "-20%",
          right: "-10%",
        }}
        animate={{
          x: [0, -60, 40, 0],
          y: [0, 50, -30, 0],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "linear",
        }}
      />
      {/* Blue orb */}
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full opacity-5 mix-blend-screen gpu"
        style={{
          background: "radial-gradient(circle, rgba(37,99,235,0.2) 0%, transparent 70%)",
          filter: "blur(90px)",
          top: "30%",
          right: "30%",
        }}
        animate={{
          x: [0, -30, 50, 0],
          y: [0, 40, -20, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    </div>
  );
}
