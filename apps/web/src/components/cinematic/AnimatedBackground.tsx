"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function AnimatedBackground() {
  const [mounted, setMounted] = useState(false);
  const [particles, setParticles] = useState<{ id: number; size: number; left: string; delay: number; duration: number }[]>([]);

  useEffect(() => {
    setMounted(true);
    // Generate static particle data on mount to avoid hydration mismatch
    const generated = Array.from({ length: 40 }).map((_, i) => ({
      id: i,
      size: Math.random() * 4 + 1,
      left: `${Math.random() * 100}vw`,
      delay: Math.random() * 20,
      duration: Math.random() * 20 + 20
    }));
    setParticles(generated);
  }, []);

  return (
    <div className="fixed inset-0 w-screen h-screen z-[-10] overflow-hidden bg-background pointer-events-none">
      
      {/* 1. Aurora Gradient Blob */}
      <div className="absolute top-0 left-0 w-[150vw] h-[150vh] -translate-x-1/4 -translate-y-1/4 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-secondary/20 via-background/80 to-background opacity-80 animate-slow-pan" />
      
      {/* 2. Floating Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px] animate-float" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-accent/20 rounded-full blur-[150px] animate-float" style={{ animationDelay: '3s' }} />

      {/* 3. Drifting Particles */}
      {mounted && particles.map((p) => (
        <div 
          key={p.id}
          className="absolute bottom-[-10px] bg-white rounded-full opacity-0"
          style={{
            width: `${p.size}px`,
            height: `${p.size}px`,
            left: p.left,
            animation: `particle-drift ${p.duration}s linear ${p.delay}s infinite`,
            boxShadow: `0 0 ${p.size * 2}px rgba(255,255,255,0.8)`
          }}
        />
      ))}

      {/* 4. Deep Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_80%)]" />

    </div>
  );
}
