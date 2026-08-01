"use client";

import { useState } from "react";
import Hero from "@/components/cinematic/Hero";
import CinematicLoader from "@/components/cinematic/CinematicLoader";
import { motion, AnimatePresence } from "framer-motion";

export default function Home() {
  const [loading, setLoading] = useState(true);

  return (
    <main className="h-screen w-full overflow-hidden bg-transparent">
      <AnimatePresence>
        {loading && <CinematicLoader onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: loading ? 0 : 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="w-full"
      >
        <Hero />
      </motion.div>
    </main>
  );
}
