"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Download } from "lucide-react";

interface ShareClientProps {
  data: any;
  universeName: string;
}

const fallbackTheme = "bg-slate-950 text-slate-300 border-slate-800";
const fallbackAccent = "text-slate-100";

export default function ShareClient({ data, universeName }: ShareClientProps) {
  const transName = data?.personal_info?.name || data?.name || "Professional";
  const transRole = data?.personal_info?.role || data?.role || "Explorer";
  const transExp = data?.experience || [];
  const transSkills = data?.skills || [];
  const transEdu = data?.education || [];
  const transProj = data?.projects || [];
  const transAchieve = data?.achievements || [];
  
  const theme = data?.theme || fallbackTheme;
  const accent = data?.accent || fallbackAccent;

  const handleExport = async () => {
    try {
      const html2canvas = (await import('html2canvas-pro')).default;
      const { jsPDF } = await import('jspdf');
      
      const element = document.getElementById("shared-resume");
      if (!element) return;
      
      const clone = element.cloneNode(true) as HTMLElement;
      clone.style.width = "800px";
      clone.style.height = "max-content";
      clone.style.overflow = "visible";
      clone.style.padding = "40px";
      clone.style.position = "absolute";
      clone.style.top = "-9999px";
      clone.style.backgroundColor = getComputedStyle(element).backgroundColor;
      
      document.body.appendChild(clone);
      
      const canvas = await html2canvas(clone, { scale: 2, useCORS: true, logging: false });
      const imgData = canvas.toDataURL('image/jpeg', 0.98);
      
      const pdf = new jsPDF({ unit: 'px', format: [canvas.width / 2, canvas.height / 2], orientation: 'portrait' });
      pdf.addImage(imgData, 'JPEG', 0, 0, canvas.width / 2, canvas.height / 2);
      pdf.save(`VerseCV_${universeName}_${transName}.pdf`);
      
      document.body.removeChild(clone);
    } catch (err) {
      console.error("PDF generation failed:", err);
      alert("Failed to export PDF.");
    }
  };

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center p-4 md:p-12 ${theme} relative`}>
      
      {/* Floating Header */}
      <div className="fixed top-0 left-0 w-full p-6 flex justify-between items-center z-50 pointer-events-none no-print">
        <Link href="/" className="pointer-events-auto flex items-center gap-3 bg-black/40 backdrop-blur-md rounded-2xl p-2 pr-4 border border-white/10 shadow-2xl hover:bg-black/60 transition-all">
          <Image src="/logo.svg" alt="VerseCV" width={32} height={32} className="rounded-xl" />
          <div>
            <div className="font-outfit font-bold text-white leading-tight">VerseCV</div>
            <div className="text-[10px] text-white/50 uppercase tracking-widest">Create Yours</div>
          </div>
        </Link>

        <button onClick={handleExport} className="pointer-events-auto flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/10 text-white font-semibold rounded-xl transition-all shadow-lg">
          <Download className="w-4 h-4" />
          <span>Save PDF</span>
        </button>
      </div>

      {/* Main Resume Content */}
      <div 
        id="shared-resume" 
        className="w-full max-w-4xl bg-black/20 backdrop-blur-3xl border border-current/10 rounded-3xl p-8 md:p-16 shadow-2xl mt-16 print:mt-0 print:border-none print:shadow-none print:max-w-none print:bg-transparent"
      >
        <div className="mb-6 flex items-center justify-between no-print">
          <div className="px-4 py-1.5 rounded-full border border-current/20 text-xs font-semibold tracking-widest uppercase flex items-center gap-2 opacity-80">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            {universeName} Timeline
          </div>
        </div>

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
            variants={{ hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1 } }}
            className={`text-6xl font-outfit font-bold mb-2 ${accent} drop-shadow-lg`}
          >{transName}</motion.h1>
          <motion.h2 
            variants={{ hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1 } }}
            className="text-3xl font-outfit opacity-80 mb-12 pb-6 border-b border-current/20"
          >{transRole}</motion.h2>
          
          <motion.h3 
            variants={{ hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1 } }}
            className="text-sm font-outfit font-bold uppercase tracking-widest opacity-50 mb-6"
          >Chronicles</motion.h3>
          <div className="space-y-8 mb-12">
            {transExp.map((exp: any, i: number) => (
              <motion.div 
                key={i}
                variants={{ hidden: { x: -20, opacity: 0 }, visible: { x: 0, opacity: 1 } }}
                className="group p-4 -mx-4 rounded-xl hover:bg-white/5 transition-all cursor-default border border-transparent hover:border-white/10"
              >
                <div className="flex justify-between items-baseline mb-2">
                  <h4 className="font-outfit text-2xl font-bold">{exp.position || exp.role}</h4>
                  <span className="text-sm opacity-60 font-mono tracking-wider">{exp.years || exp.duration}</span>
                </div>
                <div className="text-lg italic opacity-80 mb-4 text-accent">{exp.company}</div>
                <p className="text-base leading-relaxed opacity-90">{exp.desc || exp.description}</p>
              </motion.div>
            ))}
          </div>

          <motion.h3 
            variants={{ hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1 } }}
            className="text-sm font-outfit font-bold uppercase tracking-widest opacity-50 mb-6"
          >Arsenals</motion.h3>
          <div className="flex flex-wrap gap-3 mb-12">
            {transSkills.map((s: string, i: number) => (
              <motion.span 
                key={i} 
                variants={{ hidden: { scale: 0.8, opacity: 0 }, visible: { scale: 1, opacity: 1 } }}
                className="px-5 py-2.5 border border-current/20 rounded-xl text-sm font-medium backdrop-blur-md bg-white/5 shadow-lg transition-colors"
              >{s}</motion.span>
            ))}
          </div>

          {transEdu.length > 0 && (
            <>
              <motion.h3 
                variants={{ hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1 } }}
                className="text-sm font-outfit font-bold uppercase tracking-widest opacity-50 mb-6"
              >Academy</motion.h3>
              <div className="space-y-6 mb-12">
                {transEdu.map((edu: any, i: number) => (
                  <motion.div 
                    key={i}
                    variants={{ hidden: { x: -20, opacity: 0 }, visible: { x: 0, opacity: 1 } }}
                    className="p-4 -mx-4 rounded-xl hover:bg-white/5 transition-all cursor-default border border-transparent hover:border-white/10"
                  >
                    <div className="flex justify-between items-baseline mb-2">
                      <h4 className="font-outfit text-xl font-bold">{edu.degree}</h4>
                      <span className="text-sm opacity-60 font-mono tracking-wider">{edu.year}</span>
                    </div>
                    <div className="opacity-80 text-accent text-lg">{edu.institution}</div>
                  </motion.div>
                ))}
              </div>
            </>
          )}

          {transProj.length > 0 && (
            <>
              <motion.h3 
                variants={{ hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1 } }}
                className="text-sm font-outfit font-bold uppercase tracking-widest opacity-50 mb-6"
              >Missions</motion.h3>
              <div className="space-y-6 mb-12">
                {transProj.map((proj: any, i: number) => (
                  <motion.div 
                    key={i}
                    variants={{ hidden: { x: -20, opacity: 0 }, visible: { x: 0, opacity: 1 } }}
                    className="p-4 -mx-4 rounded-xl hover:bg-white/5 transition-all cursor-default border border-transparent hover:border-white/10"
                  >
                    <h4 className="font-outfit text-xl font-bold mb-2">{proj.name}</h4>
                    <p className="text-base leading-relaxed opacity-90">{proj.description}</p>
                  </motion.div>
                ))}
              </div>
            </>
          )}

          {transAchieve.length > 0 && (
            <>
              <motion.h3 
                variants={{ hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1 } }}
                className="text-sm font-outfit font-bold uppercase tracking-widest opacity-50 mb-6"
              >Honors & Conquests</motion.h3>
              <ul className="list-disc pl-5 space-y-3 opacity-90 text-base leading-relaxed">
                {transAchieve.map((achieve: string, i: number) => (
                  <motion.li 
                    key={i}
                    variants={{ hidden: { x: -20, opacity: 0 }, visible: { x: 0, opacity: 1 } }}
                  >
                    {achieve}
                  </motion.li>
                ))}
              </ul>
            </>
          )}
        </motion.div>
      </div>
    </div>
  );
}
