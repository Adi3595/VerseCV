"use client";

import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { useSession } from "@/lib/auth/client";
import { Sparkles, LogIn, LayoutDashboard, Fingerprint, User } from "lucide-react";

export default function FloatingNav() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [lastY, setLastY] = useState(0);

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest < 100) {
      setHidden(false);
    } else if (latest > lastY) {
      // Scrolling down
      setHidden(true);
    } else {
      // Scrolling up
      setHidden(false);
    }
    setLastY(latest);
  });

  const allowedPaths = ["/", "/features", "/pricing", "/lore"];
  if (!allowedPaths.includes(pathname)) {
    return null;
  }

  return (
    <motion.div
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: hidden ? -100 : 0, opacity: hidden ? 0 : 1 }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
      className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] w-full max-w-md px-4"
    >
      <div className="flex items-center justify-between px-6 py-3 rounded-full liquid-glass border border-white/10 shadow-[0_0_20px_rgba(255,255,255,0.05)] text-sm font-medium tracking-wide">
        <Link href="/" className="flex items-center gap-2 group">
          <Image src="/logo.png" alt="VerseCV" width={24} height={24} className="group-hover:scale-110 transition-transform rounded-sm" />
          <span className="hidden sm:inline">VerseCV</span>
        </Link>
        
        <div className="flex items-center gap-4 sm:gap-6">
          <Link href="/features" className="text-white/60 hover:text-white transition-colors flex items-center gap-1.5">
            <span className="hidden sm:inline">Features</span>
          </Link>
          <Link href="/pricing" className="text-white/60 hover:text-white transition-colors flex items-center gap-1.5">
            <span className="hidden sm:inline">Pricing</span>
          </Link>
          <Link href="/lore" className="text-white/60 hover:text-white transition-colors flex items-center gap-1.5">
            <span className="hidden sm:inline">Lore</span>
          </Link>
        </div>

        <Link href="/login" className="flex items-center justify-center w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 transition-colors border border-white/10">
          <User className="w-4 h-4 text-white/80" />
        </Link>
      </div>
    </motion.div>
  );
}
