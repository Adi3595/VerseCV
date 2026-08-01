"use client";

import { motion } from "framer-motion";
import { Clock } from "lucide-react";
import { useSession } from "@/lib/auth/client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import CoreIdentityUpload from "@/components/dashboard/CoreIdentityUpload";
import LiquidGlassCard from "@/components/cinematic/LiquidGlassCard";

export default function DashboardPage() {
  const { data: session, isPending } = useSession();
  const router = useRouter();

  const [history, setHistory] = useState<any[]>([]);
  const [loadingHistory, setLoadingHistory] = useState(true);

  useEffect(() => {
    if (!isPending && !session) {
      router.push("/login");
    }
  }, [session, isPending, router]);

  useEffect(() => {
    if (session?.user) {
      fetch("/api/v1/resume/history")
        .then(res => res.json())
        .then(data => {
          if (data.history) setHistory(data.history);
          setLoadingHistory(false);
        })
        .catch(err => {
          console.error("Failed to fetch history:", err);
          setLoadingHistory(false);
        });
    }
  }, [session]);

  const displayName = session?.user?.name || (session?.user?.email ? session.user.email.split('@')[0] : "Traveler");

  const openHistoryItem = (item: any) => {
    const data = {
      original_resume: item.originalData,
      transformed_resume: item.transformedData,
      universe: item.universe
    };
    sessionStorage.setItem("multiverse_resume_data", JSON.stringify(data));
    router.push(`/editor?universe=${encodeURIComponent(item.universe)}`);
  };

  const toggleFavorite = async (e: React.MouseEvent, item: any) => {
    e.stopPropagation(); // prevent opening the item
    
    // Optimistic UI update
    setHistory(prev => prev.map(h => h.id === item.id ? { ...h, isFavorite: !h.isFavorite } : h));

    try {
      await fetch(`/api/v1/resume/history/${item.id}/favorite`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isFavorite: !item.isFavorite })
      });
    } catch (err) {
      console.error("Failed to toggle favorite:", err);
      // Revert on error
      setHistory(prev => prev.map(h => h.id === item.id ? { ...h, isFavorite: item.isFavorite } : h));
    }
  };

  return (
    <>
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
            {loadingHistory ? (
              <p className="text-white/50 col-span-3 text-center py-10">Syncing with timeline database...</p>
            ) : history.length === 0 ? (
              <p className="text-white/50 col-span-3 text-center py-10 border border-white/10 border-dashed rounded-2xl">
                No past realities found. Initialize your core identity above to begin.
              </p>
            ) : (
              history.map((gen, i) => (
                <motion.div
                  key={gen.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="h-full"
                >
                  <LiquidGlassCard 
                    className="h-full flex flex-col justify-between group cursor-pointer border border-white/10 hover:border-primary/50"
                  >
                    <div onClick={() => openHistoryItem(gen)} className="h-full flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <span className={`text-xs font-semibold px-2 py-1 bg-white/5 rounded border border-white/10 uppercase tracking-wider text-green-400`}>
                            archived
                          </span>
                          <div className="flex items-center gap-3">
                            <button 
                              onClick={(e) => toggleFavorite(e, gen)}
                              className="text-white/30 hover:text-yellow-400 transition-colors z-10 p-1"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill={gen.isFavorite ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={gen.isFavorite ? "text-yellow-400" : ""}>
                                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                              </svg>
                            </button>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white/30 group-hover:text-white transition-colors">
                              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line>
                            </svg>
                          </div>
                        </div>
                        <h3 className="text-2xl font-outfit font-bold mb-2">{gen.universe}</h3>
                        <p className="text-sm text-white/50">{new Date(gen.createdAt).toLocaleDateString()}</p>
                      </div>
                      
                      <div className="mt-6 pt-4 border-t border-white/10 flex justify-end">
                        <span className="text-sm text-primary font-medium opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                          Revisit Reality 
                          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="m21.64 3.64-1.28-1.28a1.21 1.21 0 0 0-1.72 0L2.36 18.64a1.21 1.21 0 0 0 0 1.72l1.28 1.28a1.2 1.2 0 0 0 1.72 0L21.64 5.36a1.2 1.2 0 0 0 0-1.72Z"></path>
                            <path d="m14 7 3 3"></path>
                            <path d="M5 6v4"></path>
                            <path d="M19 14v4"></path>
                            <path d="M10 2v2"></path>
                            <path d="M7 8H3"></path>
                            <path d="M21 16h-4"></path>
                            <path d="M11 3H9"></path>
                          </svg>
                        </span>
                      </div>
                    </div>
                  </LiquidGlassCard>
                </motion.div>
              ))
            )}
          </div>
        </section>
      </>
  );
}
