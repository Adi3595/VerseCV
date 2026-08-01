"use client";

import { useRef, useState, ReactNode } from "react";
import { motion } from "framer-motion";

interface LiquidGlassCardProps {
  children: ReactNode;
  className?: string;
}

export default function LiquidGlassCard({ children, className = "" }: LiquidGlassCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hovering, setHovering] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Calculate tilt angles based on mouse position relative to center
    const tiltX = (y / rect.height - 0.5) * -20; // max 10 deg tilt
    const tiltY = (x / rect.width - 0.5) * 20;

    setTilt({ x: tiltX, y: tiltY });
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => {
        setHovering(false);
        setTilt({ x: 0, y: 0 });
      }}
      style={{
        transformStyle: "preserve-3d"
      }}
      animate={{
        rotateX: tilt.x,
        rotateY: tilt.y,
        scale: hovering ? 1.02 : 1
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={`relative liquid-glass edge-glow rounded-3xl overflow-hidden transition-shadow duration-300 ${
        hovering ? "shadow-[0_20px_50px_rgba(230,57,70,0.15)]" : ""
      } ${className}`}
    >
      
      {/* Internal ambient lighting that moves slightly based on tilt */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent mix-blend-overlay pointer-events-none"
        animate={{
          opacity: hovering ? 0.8 : 0.3,
          background: `radial-gradient(circle at ${50 + tilt.y * 2}% ${50 + tilt.x * 2}%, rgba(255,255,255,0.1), transparent 50%)`
        }}
        transition={{ type: "tween", duration: 0.2 }}
      />
      
      {/* 3D lifted content wrapper */}
      <div style={{ transform: "translateZ(30px)" }} className="relative z-10 p-6 h-full">
        {children}
      </div>
    </motion.div>
  );
}
