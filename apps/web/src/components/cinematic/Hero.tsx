"use client";

import { motion } from "framer-motion";
import { Upload } from "lucide-react";
import Link from "next/link";
import MagneticButton from "./MagneticButton";

export default function Hero() {

  return (
    <div className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden">
      
      {/* Hero Content */}
      <motion.div 
        className="flex flex-col items-center text-center z-30 px-4 mt-16 pointer-events-none"
      >
        <motion.h1 
          className="text-5xl md:text-8xl font-bold tracking-tight mb-6 font-outfit flex flex-col items-center"
        >
          <div className="overflow-hidden">
            <motion.span 
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="block"
            >
              One Resume.
            </motion.span>
          </div>
          <div className="overflow-hidden mt-2">
            <motion.span 
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="block bg-clip-text text-transparent bg-gradient-to-r from-white via-accent to-secondary drop-shadow-[0_0_30px_rgba(168,218,220,0.5)] pb-4"
            >
              Infinite Universes.
            </motion.span>
          </div>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-lg md:text-xl text-white/70 max-w-2xl mb-12"
        >
          Transform your professional identity into alternate realities while preserving the structure and meaning of your original resume.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="flex flex-col sm:flex-row gap-4 pointer-events-auto"
        >
          <Link href="/register">
            <MagneticButton className="px-8 py-4 font-bold text-lg text-white group shadow-[0_0_40px_rgba(230,57,70,0.3)]">
              <span className="relative">Upload Resume</span>
              <Upload className="relative w-5 h-5 group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
            </MagneticButton>
          </Link>
        </motion.div>
      </motion.div>


    </div>
  );
}
