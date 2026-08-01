"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import MagneticButton from "./MagneticButton";

interface EmptyUniverseProps {
  onAction: () => void;
}

export default function EmptyUniverse({ onAction }: EmptyUniverseProps) {
  return (
    <div className="relative w-full h-[60vh] min-h-[400px] flex flex-col items-center justify-center overflow-hidden rounded-3xl border border-white/5 bg-background/50 backdrop-blur-sm group">
      
      {/* Dim Breathing Portal Background */}
      <motion.div 
        animate={{ 
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute w-[500px] h-[500px] bg-gradient-to-tr from-transparent via-white/5 to-transparent rounded-full blur-[80px]"
      />
      
      <div className="relative z-10 flex flex-col items-center text-center max-w-lg px-4">
        
        <div className="w-16 h-16 rounded-full border border-white/10 bg-white/5 flex items-center justify-center mb-8 shadow-[0_0_30px_rgba(255,255,255,0.05)]">
          <Sparkles className="w-6 h-6 text-white/50" />
        </div>

        <h3 className="text-3xl font-outfit font-bold text-white mb-4 tracking-wide">
          A blank universe awaits.
        </h3>
        
        <p className="text-zinc-400 max-w-sm mx-auto text-sm">
          You haven't generated any alternate realities yet. Upload your origin story and let the engine weave your legend across VerseCV.
        </p>

        <MagneticButton onClick={onAction} className="px-6 py-3 font-medium text-white shadow-[0_0_30px_rgba(255,255,255,0.1)]">
          Create First Universe
        </MagneticButton>
      </div>

      {/* Subtle Grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] opacity-20 pointer-events-none" />
    </div>
  );
}
