"use client";

import { useState, useEffect, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, Share2, Sparkles, RefreshCw, ArrowLeft, AlertTriangle, Fingerprint } from "lucide-react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

interface ResumeData {
  personal_info?: { name?: string; email?: string; phone?: string; role?: string };
  experience?: any[];
  education?: any[];
  skills?: string[];
  projects?: any[];
  theme?: string;
  accent?: string;
  name?: string;
  role?: string;
}

interface GenerateResponse {
  original_resume: ResumeData;
  transformed_resume: ResumeData;
  universe: string;
}

const fallbackTheme = "bg-slate-950 text-slate-300 border-slate-800";
const fallbackAccent = "text-slate-100";

function EditorContent() {
  const searchParams = useSearchParams();
  const urlUniverse = searchParams.get("universe") || "Unknown Reality";
  const router = useRouter();
  
  const [data, setData] = useState<GenerateResponse | null>(null);
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    // Read the generated data from sessionStorage
    const stored = sessionStorage.getItem("multiverse_resume_data");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setData(parsed);
      } catch (e) {
        console.error("Failed to parse stored resume data");
      }
    }
    
    // Simulate a brief cinematic load sequence before revealing the data
    const timer = setTimeout(() => {
      setIsInitializing(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  if (!isInitializing && !data) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 text-center">
        <AlertTriangle className="w-16 h-16 text-primary mb-6 animate-pulse" />
        <h1 className="text-4xl font-outfit font-bold mb-4">Timeline Lost</h1>
        <p className="text-white/60 max-w-md mb-8">
          We could not find your generated reality data. You may have refreshed the page or navigated here directly.
        </p>
        <Link href="/dashboard" className="px-8 py-3 rounded-xl bg-primary text-white font-semibold flex items-center gap-2 hover:bg-primary/90 transition-all">
          <ArrowLeft className="w-5 h-5" />
          Return to Dashboard
        </Link>
      </div>
    );
  }

  const original = data?.original_resume || {};
  const transformed = data?.transformed_resume || {};
  const universeName = data?.universe || urlUniverse;
  
  // Clean up data for display
  const origName = original.personal_info?.name || original.name || "Unknown";
  const origRole = original.personal_info?.role || original.role || "Professional";
  const origExp = original.experience || [];
  const origSkills = original.skills || [];

  const transName = transformed.personal_info?.name || transformed.name || origName;
  const transRole = transformed.personal_info?.role || transformed.role || origRole;
  const transExp = transformed.experience || [];
  const transSkills = transformed.skills || [];
  
  const theme = transformed.theme || fallbackTheme;
  const accent = transformed.accent || fallbackAccent;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Top Navigation */}
      <header className="h-16 border-b border-white/10 flex items-center justify-between px-6 bg-white/5 backdrop-blur-md sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <Link href="/dashboard" className="p-2 text-white/50 hover:text-white bg-white/5 hover:bg-white/10 rounded-xl transition-all mr-2">
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div className="flex items-center gap-3">
            <Image src="/logo.png" alt="VerseCV" width={28} height={28} className="rounded-md" />
            <span className="font-outfit font-bold tracking-wide text-lg">VerseCV</span>
          </div>
        </div>
        
        {/* Universe Indicator */}
        <div className="flex bg-black/40 rounded-full p-1 border border-white/10 px-6 py-2 shadow-[0_0_15px_rgba(255,255,255,0.05)]">
           <span className="text-white font-medium capitalize flex items-center gap-2">
             <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
             Reality: {universeName}
           </span>
        </div>

        <div className="flex gap-3">
          <button className="p-2 text-white/70 hover:text-white bg-white/5 hover:bg-white/10 rounded-xl transition-all">
            <Share2 className="w-4 h-4" />
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-accent text-accent-foreground font-semibold rounded-xl hover:bg-accent/90 transition-all">
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
        </div>
      </header>

      {/* Main Workspace */}
      <main className="flex-1 flex overflow-hidden relative">
        
        {/* Overlay while generating */}
        <AnimatePresence>
          {isInitializing && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-40 bg-background/90 backdrop-blur-md flex flex-col items-center justify-center"
            >
              <RefreshCw className="w-12 h-12 text-primary animate-spin mb-4" />
              <h3 className="text-2xl font-outfit font-bold text-white mb-2">Manifesting Timeline...</h3>
              <p className="text-white/60">Stabilizing dimensional parameters.</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Split Screen Container */}
        <div className="flex w-full p-6 gap-6 h-[calc(100vh-64px)] overflow-hidden">
          
          {/* Left: Original Resume */}
          <div className="w-1/2 h-full flex flex-col bg-white/5 border border-white/10 rounded-2xl overflow-hidden shadow-2xl relative">
            <div className="bg-white/5 py-3 px-6 border-b border-white/10 text-xs font-semibold text-white/50 tracking-widest uppercase flex items-center justify-between">
              <span>Core Identity</span>
              <span className="w-2 h-2 rounded-full bg-green-500" />
            </div>
            <div className="flex-1 overflow-y-auto p-12 bg-white text-black">
              <h1 className="text-5xl font-outfit font-bold mb-2">{origName}</h1>
              <h2 className="text-2xl font-outfit text-gray-600 mb-8 pb-4 border-b">{origRole}</h2>
              
              <h3 className="text-sm font-outfit font-bold uppercase tracking-widest text-gray-400 mb-6">Experience</h3>
              <div className="space-y-6 mb-10">
                {origExp.map((exp: any, i: number) => (
                  <div key={i} className="p-4 -mx-4 rounded-xl hover:bg-gray-50 transition-colors">
                    <div className="flex justify-between items-baseline mb-1">
                      <h4 className="font-outfit text-xl font-bold">{exp.position || exp.role}</h4>
                      <span className="text-sm text-gray-500 font-mono tracking-wider">{exp.years || exp.duration}</span>
                    </div>
                    <div className="text-gray-700 italic mb-3">{exp.company}</div>
                    <p className="text-gray-600 text-sm leading-relaxed">{exp.desc || exp.description}</p>
                  </div>
                ))}
              </div>

              <h3 className="text-sm font-outfit font-bold uppercase tracking-widest text-gray-400 mb-6">Skills</h3>
              <div className="flex flex-wrap gap-3">
                {origSkills.map((s: string, i: number) => (
                  <span key={i} className="px-4 py-2 bg-gray-100 border border-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors cursor-default shadow-sm">{s}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Generated Resume */}
          <div className="w-1/2 h-full flex flex-col bg-white/5 border border-white/10 rounded-2xl overflow-hidden shadow-2xl relative">
             <div className="bg-white/5 py-3 px-6 border-b border-white/10 text-xs font-semibold text-white/50 tracking-widest uppercase flex items-center justify-between">
              <span>{universeName} Reality</span>
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            </div>
            
            <div className={`flex-1 overflow-y-auto p-12 transition-colors duration-1000 ${theme}`}>
              <motion.div 
                layout 
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: { opacity: 0 },
                  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
                }}
              >
                <motion.h1 
                  layoutId="name" 
                  variants={{ hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1 } }}
                  className={`text-5xl font-outfit font-bold mb-2 ${accent} drop-shadow-lg`}
                >{transName}</motion.h1>
                <motion.h2 
                  layoutId="role" 
                  variants={{ hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1 } }}
                  className="text-2xl font-outfit opacity-80 mb-8 pb-4 border-b border-current/20"
                >{transRole}</motion.h2>
                
                <motion.h3 
                  layoutId="exp-title" 
                  variants={{ hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1 } }}
                  className="text-sm font-outfit font-bold uppercase tracking-widest opacity-50 mb-6"
                >Chronicles</motion.h3>
                <div className="space-y-6 mb-10">
                  {transExp.map((exp: any, i: number) => (
                    <motion.div 
                      layoutId={`exp-${i}`} 
                      key={i}
                      variants={{ hidden: { x: -20, opacity: 0 }, visible: { x: 0, opacity: 1 } }}
                      whileHover={{ scale: 1.02, x: 10 }}
                      className="p-4 rounded-xl hover:bg-white/5 transition-all cursor-default border border-transparent hover:border-white/10"
                    >
                      <div className="flex justify-between items-baseline mb-1">
                        <h4 className="font-outfit text-xl font-bold">{exp.position || exp.role}</h4>
                        <span className="text-sm opacity-60 font-mono tracking-wider">{exp.years || exp.duration}</span>
                      </div>
                      <div className="italic opacity-80 mb-3 text-accent">{exp.company}</div>
                      <p className="text-sm leading-relaxed opacity-90">{exp.desc || exp.description}</p>
                    </motion.div>
                  ))}
                </div>

                <motion.h3 
                  layoutId="skills-title" 
                  variants={{ hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1 } }}
                  className="text-sm font-outfit font-bold uppercase tracking-widest opacity-50 mb-6"
                >Arsenals</motion.h3>
                <div className="flex flex-wrap gap-3">
                  {transSkills.map((s: string, i: number) => (
                    <motion.span 
                      layoutId={`skill-${i}`} 
                      key={i} 
                      variants={{ hidden: { scale: 0.8, opacity: 0 }, visible: { scale: 1, opacity: 1 } }}
                      whileHover={{ scale: 1.1, rotate: [-2, 2, 0], backgroundColor: "rgba(255,255,255,0.1)" }}
                      className="px-4 py-2 border border-current/20 rounded-lg text-sm font-medium backdrop-blur-md bg-white/5 shadow-lg cursor-pointer transition-colors"
                    >{s}</motion.span>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
          
        </div>
      </main>
    </div>
  );
}

export default function EditorPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background flex items-center justify-center text-white"><RefreshCw className="animate-spin w-8 h-8" /></div>}>
      <EditorContent />
    </Suspense>
  );
}
