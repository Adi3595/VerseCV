"use client";

import { motion } from "framer-motion";

interface CinematicLoaderProps {
  onComplete: () => void;
}

export default function CinematicLoader({ onComplete }: CinematicLoaderProps) {
  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-background overflow-hidden"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 1.5, delay: 3, ease: "easeInOut" }}
      onAnimationComplete={onComplete}
    >
      {/* Background Starfield Zoom */}
      <motion.div 
        className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(230,57,70,0.1),transparent_60%)]"
        initial={{ scale: 1 }}
        animate={{ scale: 3, opacity: 0 }}
        transition={{ duration: 3, ease: "easeIn" }}
      />

      {/* Central Portal Opening */}
      <motion.div
        className="relative flex items-center justify-center w-0 h-0 bg-white shadow-[0_0_100px_50px_rgba(255,255,255,1)] rounded-full mix-blend-screen"
        initial={{ width: 0, height: 0, opacity: 0 }}
        animate={{ width: "200vw", height: "200vw", opacity: [0, 1, 0] }}
        transition={{ duration: 2.5, delay: 0.5, ease: "easeInOut" }}
      />

      {/* Logo Materialization */}
      <motion.div
        className="absolute z-10 text-center flex flex-col items-center"
        initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
        animate={{ opacity: [0, 1, 0], y: [20, 0, -20], filter: ["blur(10px)", "blur(0px)", "blur(10px)"] }}
        transition={{ duration: 3, times: [0, 0.5, 1], ease: "easeInOut" }}
      >
        <h3 className="text-xl font-outfit font-bold text-white tracking-widest uppercase">
          VerseCV
        </h3>
        <div className="w-12 h-1 bg-gradient-to-r from-primary to-secondary rounded-full" />
      </motion.div>
    </motion.div>
  );
}
