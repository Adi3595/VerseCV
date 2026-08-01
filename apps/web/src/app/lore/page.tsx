"use client";

import { motion } from "framer-motion";
import { Sparkles, History, Globe } from "lucide-react";

export default function LorePage() {
  const manifesto = [
    {
      title: "The Multiverse Hypothesis",
      icon: <Globe className="w-6 h-6 text-accent" />,
      content: "We believe that a single resume cannot capture the totality of human potential. You are not just a Software Engineer, or a Marketer, or a Manager. Depending on the timeline, you could be a Cyberpunk Netrunner, a 19th Century Industrialist, or a Galactic Commander. We built this engine to reveal those hidden realities."
    },
    {
      title: "Hyper-Intelligent Parsing",
      icon: <Sparkles className="w-6 h-6 text-primary" />,
      content: "Our AI doesn't just replace words with synonyms. It performs deep semantic mapping. It understands that 'managing a team of 5 developers' in a modern context translates perfectly to 'captaining a crew of 5 rogue scoundrels' in a space opera universe. The core skills remain, but the flavor changes."
    },
    {
      title: "The Timeline Continues",
      icon: <History className="w-6 h-6 text-secondary" />,
      content: "We are constantly expanding the multiverse. As new realities are discovered, they are added to our generator. Your career is no longer a linear path; it's a branching tree of infinite possibilities."
    }
  ];

  return (
    <main className="min-h-screen pt-32 pb-24 px-4 flex flex-col items-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl text-center mb-24"
      >
        <h1 className="text-5xl md:text-7xl font-outfit font-bold mb-6">
          The Manifesto
        </h1>
        <p className="text-xl text-white/60 max-w-2xl mx-auto">
          Why we built the Alternate Reality Engine.
        </p>
      </motion.div>

      <div className="max-w-3xl mx-auto w-full relative">
        {/* Vertical timeline line */}
        <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-accent to-transparent opacity-30 hidden md:block" />

        <div className="space-y-16">
          {manifesto.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: i * 0.2, duration: 0.5 }}
              className="relative pl-0 md:pl-24"
            >
              {/* Timeline dot */}
              <div className="absolute left-8 -translate-x-1/2 mt-1 hidden md:flex items-center justify-center w-12 h-12 rounded-full bg-black/50 border border-white/10 backdrop-blur-md z-10">
                {item.icon}
              </div>

              <div className="bg-white/5 border border-white/10 p-8 rounded-2xl hover:bg-white/10 transition-colors">
                <h3 className="text-2xl font-bold font-outfit mb-4 text-white">
                  {item.title}
                </h3>
                <p className="text-white/70 leading-relaxed text-lg">
                  {item.content}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}
