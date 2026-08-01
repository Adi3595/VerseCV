"use client";

import { useRef, useState, ReactNode } from "react";
import { motion, useSpring } from "framer-motion";

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

export default function MagneticButton({ children, className = "", onClick }: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const [hovering, setHovering] = useState(false);

  // Use springs to make the attraction feel natural and bouncy
  const springConfig = { stiffness: 150, damping: 15, mass: 0.1 };
  const x = useSpring(0, springConfig);
  const y = useSpring(0, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Magnetic pull distance
    const pullX = (e.clientX - centerX) * 0.3; // 30% pull strength
    const pullY = (e.clientY - centerY) * 0.3;

    x.set(pullX);
    y.set(pullY);
  };

  const handleMouseLeave = () => {
    setHovering(false);
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{ x, y }}
      whileTap={{ scale: 0.95 }}
      className={`relative group inline-flex items-center justify-center overflow-hidden rounded-2xl ${className}`}
    >
      {/* Spinning gradient border (shimmer) */}
      <div className="absolute inset-[-100%] z-0 animate-[portal-spin_3s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#00000000_50%,rgba(230,57,70,0.8)_100%)] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      {/* Inner background to mask the inner part of the border */}
      <div className="absolute inset-[1px] z-10 rounded-2xl bg-white/5 backdrop-blur-xl group-hover:bg-white/10 transition-colors" />

      {/* Button content */}
      <div className="relative z-20 flex items-center justify-center gap-2">
        {children}
      </div>
    </motion.button>
  );
}
