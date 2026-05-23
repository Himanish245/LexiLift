"use client";

import { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import type { Engine } from "tsparticles-engine";

interface ParticleNetworkProps {
  className?: string;
}

export function ParticleNetwork({ className = "" }: ParticleNetworkProps) {
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  return (
    <Particles
      className={`absolute inset-0 ${className}`}
      init={particlesInit}
      options={{
        fullScreen: false,
        fpsLimit: 30,
        particles: {
          number: {
            value: 50,
            density: { enable: true },
          },
          color: {
            value: ["#0d9488", "#7c3aed", "#2563eb"],
          },
          links: {
            enable: true,
            color: "#0d9488",
            distance: 130,
            opacity: 0.15,
            width: 0.5,
            shadow: { enable: true, color: "#0d9488", blur: 2 }
          },
          move: {
            enable: true,
            speed: 0.5,
            direction: "none",
            outModes: { default: "bounce" },
          },
          opacity: {
            value: { min: 0.1, max: 0.4 },
          },
          size: {
            value: { min: 0.5, max: 2 },
          },
          shadow: {
            enable: true,
            blur: 5,
            color: "#0d9488",
          },
        },
        interactivity: {
          events: {
            onHover: {
              enable: true,
              mode: "grab",
            },
          },
          modes: {
            grab: {
              distance: 140,
              links: {
                opacity: 0.3,
              },
            },
          },
        },
        detectRetina: true,
      }}
    />
  );
}
