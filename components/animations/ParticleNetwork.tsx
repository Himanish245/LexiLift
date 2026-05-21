"use client";

import { useCallback } from "react";
import Particles from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import type { Engine } from "@tsparticles/engine";

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
        fpsLimit: 60,
        particles: {
          number: {
            value: 60,
            density: { enable: true },
          },
          color: {
            value: ["#7c5cff", "#00d4aa"],
          },
          links: {
            enable: true,
            color: "#7c5cff",
            distance: 150,
            opacity: 0.15,
            width: 1,
          },
          move: {
            enable: true,
            speed: 0.8,
            direction: "none",
            outModes: { default: "bounce" },
          },
          opacity: {
            value: { min: 0.2, max: 0.5 },
          },
          size: {
            value: { min: 1, max: 2.5 },
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
