"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Clock, Star, Settings, ExternalLink, Sparkles, LogOut, LayoutGrid, Fingerprint } from "lucide-react";
import { useSession, signOut } from "@/lib/auth/client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import CoreIdentityUpload from "@/components/dashboard/CoreIdentityUpload";
import LiquidGlassCard from "@/components/cinematic/LiquidGlassCard";

export default function DashboardPage() {
  const { data: session, isPending } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!isPending && !session) {
      router.push("/login");
    }
  }, [session, isPending, router]);

  const handleLogout = async () => {
    await signOut();
    router.push("/login");
  };

  const recentGenerations = [
    { id: 1, universe: "Batman", date: "2 hours ago", status: "completed", accent: "text-zinc-400" },
    { id: 2, universe: "Cyberpunk", date: "5 hours ago", status: "completed", accent: "text-pink-500" },
    { id: 3, universe: "Pirate", date: "1 day ago", status: "completed", accent: "text-amber-500" },
  ];

  const displayName = session?.user?.name || (session?.user?.email ? session.user.email.split('@')[0] : "Traveler");

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col relative z-10">
      
      {/* Floating Header */}
      <header className="sticky top-6 z-50 w-full px-6 flex justify-center">
        <div className="w-full max-w-5xl flex items-center justify-between px-6 py-4 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 shadow-[0_0_30px_rgba(255,255,255,0.05)]">
          <div className="flex items-center gap-3">
            <Image src="/logo.svg" alt="VerseCV" width={28} height={28} className="rounded-md" />
            <span className="font-outfit font-bold tracking-wide">VerseCV</span>
          </div>
          
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/dashboard" className="text-white font-medium flex items-center gap-2">
              <LayoutGrid className="w-4 h-4 text-primary" />
              Manifestations
            </Link>
            <Link href="#" className="text-white/60 hover:text-white transition-colors flex items-center gap-2">
              <Star className="w-4 h-4" />
              Favorites
            </Link>
            <Link href="#" className="text-white/60 hover:text-white transition-colors flex items-center gap-2">
              <Settings className="w-4 h-4" />
              Settings
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 text-sm text-white/70">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold">
                {displayName.charAt(0).toUpperCase()}
              </div>
              <span>{displayName}</span>
            </div>
            <button 
              onClick={handleLogout} 
              className="p-2 bg-white/5 hover:bg-white/10 rounded-full text-white/70 hover:text-white transition-all border border-white/10"
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 w-full max-w-5xl mx-auto px-6 py-12 flex flex-col">
        
        {/* Welcome Section */}
        <motion.header 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16 text-center mt-8"
        >
          <h1 className="text-5xl md:text-6xl font-outfit font-bold mb-4 capitalize bg-clip-text text-transparent bg-gradient-to-r from-white to-white/50">
            Welcome, {displayName}.
          </h1>
          <p className="text-xl text-white/60 max-w-2xl mx-auto">
            Ready to explore another timeline? Upload your core identity to weave a new reality.
          </p>
        </motion.header>

        {/* Upload Section */}
        <section className="mb-24 flex justify-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="w-full max-w-3xl"
          >
            <CoreIdentityUpload />
          </motion.div>
        </section>

        {/* Recent Manifestations */}
        <section>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-3 mb-8"
          >
            <div className="p-2 bg-primary/20 rounded-lg border border-primary/30">
              <Clock className="w-5 h-5 text-primary" />
            </div>
            <h2 className="text-2xl font-bold">Recent Manifestations</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentGenerations.map((gen, i) => (
              <motion.div
                key={gen.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.1 }}
                className="h-full"
              >
                <LiquidGlassCard className="h-full flex flex-col justify-between group cursor-pointer border border-white/10 hover:border-white/30">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className={`text-xs font-semibold px-2 py-1 bg-white/5 rounded border border-white/10 uppercase tracking-wider ${gen.accent}`}>
                        {gen.status}
                      </span>
                      <ExternalLink className="w-4 h-4 text-white/30 group-hover:text-white transition-colors" />
                    </div>
                    <h3 className="text-2xl font-outfit font-bold mb-2">{gen.universe}</h3>
                    <p className="text-sm text-white/50">{gen.date}</p>
                  </div>
                  
                  <div className="mt-6 pt-4 border-t border-white/10 flex justify-end">
                    <span className="text-sm text-primary font-medium opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                      View Reality <Sparkles className="w-3 h-3" />
                    </span>
                  </div>
                </LiquidGlassCard>
              </motion.div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
