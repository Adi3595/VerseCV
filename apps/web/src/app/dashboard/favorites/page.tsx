"use client";

import { motion } from "framer-motion";
import { Star, ExternalLink, Sparkles } from "lucide-react";
import { useSession } from "@/lib/auth/client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import LiquidGlassCard from "@/components/cinematic/LiquidGlassCard";

export default function FavoritesPage() {
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
          if (data.history) {
            // Filter to only favorites
            setHistory(data.history.filter((h: any) => h.isFavorite));
          }
          setLoadingHistory(false);
        })
        .catch(err => {
          console.error("Failed to fetch history:", err);
          setLoadingHistory(false);
        });
    }
  }, [session]);

  const toggleFavorite = async (e: React.MouseEvent, item: any) => {
    e.stopPropagation();
    
    // Optimistic UI update (remove from list immediately)
    setHistory(prev => prev.filter(h => h.id !== item.id));

    try {
      await fetch(`/api/v1/resume/history/${item.id}/favorite`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isFavorite: false })
      });
    } catch (err) {
      console.error("Failed to toggle favorite:", err);
      // Revert on error (could be complex here since we removed it, usually best to just refetch, but for UX we just log it)
    }
  };

  const openHistoryItem = (item: any) => {
    const data = {
      original_resume: item.originalData,
      transformed_resume: item.transformedData,
      universe: item.universe
    };
    sessionStorage.setItem("multiverse_resume_data", JSON.stringify(data));
    router.push(`/editor?universe=${encodeURIComponent(item.universe)}`);
  };

  return (
    <>
      <motion.header 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12 mt-4"
      >
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-yellow-400/20 rounded-lg border border-yellow-400/30">
            <Star className="w-6 h-6 text-yellow-400" />
          </div>
          <h1 className="text-4xl font-outfit font-bold capitalize bg-clip-text text-transparent bg-gradient-to-r from-white to-white/50">
            Favorites
          </h1>
        </div>
        <p className="text-lg text-white/60">
          Your starred manifestations and favorite alternate timelines.
        </p>
      </motion.header>

      <section>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loadingHistory ? (
            <p className="text-white/50 col-span-3 text-center py-10">Searching the multiverse...</p>
          ) : history.length === 0 ? (
            <p className="text-white/50 col-span-3 text-center py-10 border border-white/10 border-dashed rounded-2xl">
              No favorites found. Go back to Manifestations and star a reality to save it here!
            </p>
          ) : (
            history.map((gen, i) => (
              <motion.div
                key={gen.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.1 }}
                className="h-full"
              >
                <LiquidGlassCard 
                  className="h-full flex flex-col justify-between group cursor-pointer border border-yellow-400/30 hover:border-yellow-400/60"
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
                            className="text-yellow-400 hover:text-white/30 transition-colors z-10 p-1"
                            title="Remove from favorites"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                            </svg>
                          </button>
                          <ExternalLink className="w-4 h-4 text-white/30 group-hover:text-white transition-colors" />
                        </div>
                      </div>
                      <h3 className="text-2xl font-outfit font-bold mb-2 text-yellow-50">{gen.universe}</h3>
                      <p className="text-sm text-white/50">{new Date(gen.createdAt).toLocaleDateString()}</p>
                    </div>
                    
                    <div className="mt-6 pt-4 border-t border-white/10 flex justify-end">
                      <span className="text-sm text-yellow-400 font-medium opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
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
