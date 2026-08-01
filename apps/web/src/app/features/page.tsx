"use client";

import { motion } from "framer-motion";
import LiquidGlassCard from "@/components/cinematic/LiquidGlassCard";

export default function FeaturesPage() {
  return (
    <main className="min-h-screen pt-32 pb-24 px-4 flex flex-col items-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl text-center mb-16"
      >
        <h1 className="text-5xl md:text-7xl font-outfit font-bold mb-6">
          The Engine
        </h1>
        <p className="text-xl text-white/60 max-w-2xl mx-auto">
          Our AI dissects your timeline, skills, and achievements, then reconstructs them seamlessly into over 100 different universe themes.
        </p>
      </motion.div>

      {/* Premium Bento Grid */}
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto text-left w-full"
      >
        {/* Large Bento Box */}
        <LiquidGlassCard className="md:col-span-2 h-[400px] flex flex-col justify-between group">
          <div className="relative z-10">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white/10 mb-4 border border-white/20 text-xl group-hover:scale-110 transition-transform">
              🧠
            </div>
            <h3 className="text-2xl font-bold mb-2 text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-accent transition-colors">
              Hyper-Intelligent Extraction
            </h3>
            <p className="text-white/60 max-w-sm">
              Our NLP pipeline doesn't just read your resume; it understands the semantic meaning of your career trajectory, ensuring zero context is lost when translating to a new universe.
            </p>
          </div>
          {/* Abstract Data Viz */}
          <div className="absolute right-0 bottom-0 w-2/3 h-1/2 opacity-30 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
            <svg viewBox="0 0 200 100" className="w-full h-full stroke-accent/50 stroke-2 fill-none drop-shadow-[0_0_15px_rgba(168,218,220,0.5)]">
              <path d="M0,80 Q20,20 40,60 T80,40 T120,70 T160,30 T200,50" className="animate-[dash_10s_linear_infinite]" strokeDasharray="10 5" />
              <path d="M0,90 Q30,40 60,80 T120,50 T180,80 T200,60" className="stroke-secondary/40" />
            </svg>
          </div>
        </LiquidGlassCard>

        {/* Tall Side Box */}
        <LiquidGlassCard className="md:col-span-1 h-[400px] flex flex-col group">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white/10 mb-4 border border-white/20 text-xl group-hover:scale-110 transition-transform">
            🎨
          </div>
          <h3 className="text-2xl font-bold mb-2 text-white">Cinematic Typography</h3>
          <p className="text-white/60 mb-6">
            Every universe features a bespoke layout, utilizing premium fonts, precise kerning, and fluid responsive design.
          </p>
          {/* Abstract rotating wheel */}
          <div className="mt-auto relative w-full h-32 flex items-center justify-center overflow-hidden rounded-xl border border-white/5 bg-black/20">
            <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-primary via-secondary to-accent animate-[portal-spin_8s_linear_infinite] blur-md opacity-50 group-hover:opacity-100 transition-opacity" />
            <span className="absolute font-serif text-3xl font-bold text-white drop-shadow-md">Aa</span>
          </div>
        </LiquidGlassCard>

        {/* Wide Bottom Box */}
        <LiquidGlassCard className="md:col-span-3 h-64 flex items-center justify-between overflow-hidden group">
          <div className="max-w-lg z-10">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white/10 mb-4 border border-white/20 text-xl group-hover:scale-110 transition-transform">
              ⚡
            </div>
            <h3 className="text-2xl font-bold mb-2 text-white">Instant Export Engine</h3>
            <p className="text-white/60">
              Switch realities in real-time. Export pixel-perfect PDFs or editable Word documents instantly through our distributed Celery workers.
            </p>
          </div>
          {/* Export graphic */}
          <div className="relative w-64 h-full hidden md:flex items-center justify-center">
             <div className="w-32 h-40 bg-white/10 border border-white/20 rounded-lg shadow-2xl transform rotate-12 group-hover:rotate-0 transition-transform duration-500 ease-out flex flex-col p-4 gap-2 backdrop-blur-md">
                <div className="w-full h-2 bg-accent/50 rounded" />
                <div className="w-3/4 h-2 bg-white/30 rounded" />
                <div className="w-5/6 h-2 bg-white/30 rounded" />
                <div className="mt-auto self-end px-3 py-1 rounded bg-primary text-[10px] font-bold tracking-widest uppercase">PDF</div>
             </div>
          </div>
        </LiquidGlassCard>
      </motion.div>
    </main>
  );
}
