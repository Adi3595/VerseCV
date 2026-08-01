"use client";

import { motion } from "framer-motion";

interface DynamicResumeMockupProps {
  universeId: string;
}

export default function DynamicResumeMockup({ universeId }: DynamicResumeMockupProps) {
  // Define different data structures for different universes
  const resumes = {
    original: {
      name: "John Doe",
      title: "Senior Software Engineer",
      font: "font-sans",
      bg: "bg-white text-slate-900 border-slate-200",
      accent: "text-blue-600",
      skills: ["React", "TypeScript", "Node.js", "System Design"],
      experience: "Led a team of 5 engineers to build a scalable microservices architecture."
    },
    batman: {
      name: "Bruce Wayne",
      title: "Silent Guardian",
      font: "font-sans uppercase tracking-widest",
      bg: "bg-zinc-950 text-zinc-300 border-zinc-800",
      accent: "text-white",
      skills: ["Martial Arts", "Forensics", "Stealth", "Engineering"],
      experience: "Engineered high-tech gadgets and maintained order in Gotham's shadows."
    },
    cyberpunk: {
      name: "V-Netrunner",
      title: "Elite Code Slicer",
      font: "font-outfit",
      bg: "bg-fuchsia-950/40 text-cyan-400 border-pink-500/50",
      accent: "text-pink-500",
      skills: ["Quickhacks", "ICE Breaker", "Cyberdeck Tuning", "Neural Jacking"],
      experience: "Bypassed ICE protocols and led a crew of 5 edgerunners in Night City."
    },
    pirate: {
      name: "Captain Jack",
      title: "Master of the Seven Seas",
      font: "font-serif",
      bg: "bg-amber-950/80 text-amber-200 border-amber-700/50",
      accent: "text-amber-500",
      skills: ["Navigation", "Swordplay", "Negotiation", "Plundering"],
      experience: "Captained the Black Pearl and outran the East India Trading Company."
    },
    knight: {
      name: "Sir Lancelot",
      title: "Knight of the Round Table",
      font: "font-serif",
      bg: "bg-slate-900 text-slate-300 border-slate-600",
      accent: "text-yellow-500",
      skills: ["Jousting", "Chivalry", "Sword Combat", "Horseback Riding"],
      experience: "Defended the realm and embarked on the quest for the Holy Grail."
    },
    wizard: {
      name: "Merlin",
      title: "Archmage of the Realm",
      font: "font-serif italic",
      bg: "bg-indigo-950/90 text-indigo-200 border-indigo-500/50",
      accent: "text-fuchsia-400",
      skills: ["Spellcasting", "Alchemy", "Divination", "Enchanting"],
      experience: "Advised the King and protected the kingdom with powerful ancient magic."
    },
    alien: {
      name: "Zorgon-7",
      title: "Fleet Commander",
      font: "font-outfit uppercase tracking-widest",
      bg: "bg-teal-950/80 text-green-400 border-green-500/50",
      accent: "text-green-300",
      skills: ["Warp Navigation", "Plasma Weaponry", "Telepathy", "Xenobiology"],
      experience: "Commanded the 7th Galactic Fleet during the Andromeda Skirmish."
    }
  };

  const data = resumes[universeId as keyof typeof resumes] || resumes.original;

  return (
    <motion.div
      layout
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      className={`relative w-80 md:w-96 p-8 rounded-2xl shadow-2xl border backdrop-blur-xl flex flex-col gap-6 z-20 ${data.bg} ${data.font}`}
    >
      <motion.div layout className="flex flex-col gap-1 border-b border-current/20 pb-4">
        <motion.h2 layout="position" className={`text-2xl md:text-3xl font-bold ${data.accent}`}>
          {data.name}
        </motion.h2>
        <motion.p layout="position" className="text-sm opacity-80 uppercase tracking-wider">
          {data.title}
        </motion.p>
      </motion.div>

      <motion.div layout className="flex flex-col gap-3">
        <motion.h3 layout="position" className="text-xs font-bold uppercase opacity-50">
          Core Arsenal
        </motion.h3>
        <motion.div layout className="flex flex-wrap gap-2">
          {data.skills.map(skill => (
            <motion.span 
              layout
              key={skill} 
              className="px-2 py-1 text-xs border border-current/20 rounded bg-current/5"
            >
              {skill}
            </motion.span>
          ))}
        </motion.div>
      </motion.div>

      <motion.div layout className="flex flex-col gap-2">
        <motion.h3 layout="position" className="text-xs font-bold uppercase opacity-50">
          Chronicles
        </motion.h3>
        <motion.p layout="position" className="text-sm leading-relaxed opacity-90">
          {data.experience}
        </motion.p>
      </motion.div>
      
      {/* Glossy overlay for realism */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-white/0 via-white/5 to-white/0 pointer-events-none mix-blend-overlay" />
    </motion.div>
  );
}
