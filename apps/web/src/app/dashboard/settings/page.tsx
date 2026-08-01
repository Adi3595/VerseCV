"use client";

import { motion } from "framer-motion";
import { Settings as SettingsIcon, Mail, User, Shield, Key, Sparkles } from "lucide-react";
import { useSession } from "@/lib/auth/client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import LiquidGlassCard from "@/components/cinematic/LiquidGlassCard";

export default function SettingsPage() {
  const { data: session, isPending } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!isPending && !session) {
      router.push("/login");
    }
  }, [session, isPending, router]);

  if (isPending || !session) return null;

  return (
    <>
      <motion.header 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12 mt-4"
      >
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-blue-400/20 rounded-lg border border-blue-400/30">
            <SettingsIcon className="w-6 h-6 text-blue-400" />
          </div>
          <h1 className="text-4xl font-outfit font-bold capitalize bg-clip-text text-transparent bg-gradient-to-r from-white to-white/50">
            Account Settings
          </h1>
        </div>
        <p className="text-lg text-white/60">
          Manage your core identity parameters and security.
        </p>
      </motion.header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Profile Info */}
        <div className="lg:col-span-2 space-y-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <LiquidGlassCard className="border-white/10 p-8">
              <h2 className="text-2xl font-bold font-outfit mb-6 flex items-center gap-2">
                <User className="w-5 h-5 text-primary" /> Profile details
              </h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-white/60 mb-2 pl-1">Display Name</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
                    <input 
                      type="text"
                      disabled
                      value={session.user.name || "Traveler"}
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white/50 cursor-not-allowed"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-white/60 mb-2 pl-1">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
                    <input 
                      type="email"
                      disabled
                      value={session.user.email}
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white/50 cursor-not-allowed"
                    />
                  </div>
                  <p className="text-xs text-white/40 mt-2 ml-1">Email changes are currently disabled to maintain timeline stability.</p>
                </div>
              </div>
            </LiquidGlassCard>
          </motion.div>
        </div>

        {/* Security & Subscription */}
        <div className="space-y-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <LiquidGlassCard className="border-white/10 p-6">
              <h2 className="text-xl font-bold font-outfit mb-4 flex items-center gap-2">
                <Shield className="w-4 h-4 text-primary" /> Security
              </h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/10">
                  <div className="flex items-center gap-3">
                    <Key className="w-4 h-4 text-white/50" />
                    <span className="text-sm">Password</span>
                  </div>
                  <button className="text-xs text-white/50 hover:text-white transition-colors" disabled>Change</button>
                </div>
              </div>
            </LiquidGlassCard>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <div className="p-6 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 border border-primary/30 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <Sparkles className="w-24 h-24" />
              </div>
              <h2 className="text-xl font-bold font-outfit mb-2 text-white">VerseCV Pro</h2>
              <p className="text-sm text-white/70 mb-6 relative z-10">
                You are currently traversing the multiverse on the free tier. Upgrade to unlock infinite realities.
              </p>
              <button className="w-full py-2 rounded-lg bg-white text-black font-semibold hover:bg-white/90 transition-colors relative z-10 text-sm">
                Upgrade Timeline
              </button>
            </div>
          </motion.div>
        </div>

      </div>
    </>
  );
}
