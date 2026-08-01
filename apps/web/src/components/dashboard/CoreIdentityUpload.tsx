"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, FileText, CheckCircle2, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";

export default function CoreIdentityUpload() {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [targetUniverse, setTargetUniverse] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFile = e.dataTransfer.files[0];
      if (droppedFile.type === "application/pdf" || droppedFile.type === "application/json") {
        setFile(droppedFile);
      }
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleInitialize = async () => {
    if (!file || !targetUniverse.trim()) return;
    setIsUploading(true);
    
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("universe", targetUniverse.trim());

      // Fetch from local Next.js API route instead of fragile Python backend
      const res = await fetch(`/api/v1/resume/generate_variant`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const errText = await res.text();
        throw new Error(errText || "Failed to generate reality");
      }

      const data = await res.json();
      
      // Store in session storage so the editor can read it
      sessionStorage.setItem("multiverse_resume_data", JSON.stringify(data));
      
      router.push(`/editor?universe=${encodeURIComponent(targetUniverse.trim())}`);
    } catch (err) {
      console.error("Failed to generate:", err);
      alert("Error generating reality: " + (err as Error).message);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="w-full relative group">
      {/* Background Glow Effect */}
      <div className={`absolute -inset-1 bg-gradient-to-r from-primary to-accent rounded-3xl blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200 ${isDragging ? "opacity-60 scale-105 blur-xl" : ""}`} />
      
      <div 
        className={`relative bg-background/80 backdrop-blur-xl border-2 border-dashed ${isDragging ? "border-primary bg-primary/10" : "border-white/20"} rounded-3xl p-12 transition-all duration-300 flex flex-col items-center justify-center text-center`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => !file && !isUploading && fileInputRef.current?.click()}
      >
        <input 
          type="file"
          ref={fileInputRef}
          className="hidden"
          accept=".pdf,.json"
          onChange={handleFileSelect}
        />

        <AnimatePresence mode="wait">
          {!file ? (
            <motion.div
              key="upload-prompt"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="flex flex-col items-center cursor-pointer"
            >
              <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-6 border border-white/10 group-hover:scale-110 group-hover:border-primary/50 transition-all duration-500 relative">
                <Upload className="w-8 h-8 text-white/60 group-hover:text-primary transition-colors" />
                {/* Orbital dots */}
                <div className="absolute inset-0 border border-dashed border-white/20 rounded-full animate-[spin_10s_linear_infinite]" />
              </div>
              <h3 className="text-2xl font-outfit font-bold mb-2">Initialize Core Identity</h3>
              <p className="text-white/50 max-w-sm">
                Drag and drop your standard resume (PDF or JSON) to act as your base timeline.
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="file-ready"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center w-full"
            >
              <div className="flex items-center gap-4 bg-white/5 border border-white/10 px-6 py-4 rounded-2xl mb-8 w-full max-w-md relative overflow-hidden">
                <FileText className="w-8 h-8 text-primary" />
                <div className="flex-1 text-left truncate">
                  <p className="font-semibold text-white truncate">{file.name}</p>
                  <p className="text-xs text-white/50">{(file.size / 1024 / 1024).toFixed(2)} MB • Ready for processing</p>
                </div>
                <CheckCircle2 className="w-6 h-6 text-green-500" />
                
                {/* Progress bar effect if uploading */}
                {isUploading && (
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 2, ease: "linear" }}
                    className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-primary to-accent"
                  />
                )}
              </div>

              <div className="w-full max-w-md mb-8">
                <label className="block text-sm font-medium text-white/80 mb-2 pl-1">
                  Target Reality / Universe
                </label>
                <div className="relative">
                  <Sparkles className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                  <input 
                    type="text"
                    value={targetUniverse}
                    onChange={(e) => setTargetUniverse(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                    placeholder="e.g. 1920s Mafia, Cyberpunk, Jedi Knight..."
                  />
                </div>
              </div>

              <div className="flex gap-4">
                <button 
                  onClick={(e) => { e.stopPropagation(); setFile(null); setTargetUniverse(""); }}
                  disabled={isUploading}
                  className="px-6 py-3 rounded-xl border border-white/10 hover:bg-white/5 transition-colors text-white/70 disabled:opacity-50"
                >
                  Cancel
                </button>
                <button 
                  onClick={(e) => { e.stopPropagation(); handleInitialize(); }}
                  disabled={isUploading || !targetUniverse.trim()}
                  className="px-8 py-3 rounded-xl bg-primary text-white font-semibold flex items-center gap-2 hover:bg-primary/90 transition-all shadow-[0_0_20px_rgba(230,57,70,0.4)] hover:shadow-[0_0_30px_rgba(230,57,70,0.6)] disabled:opacity-50"
                >
                  {isUploading ? (
                    <>
                      <Sparkles className="w-5 h-5 animate-pulse" />
                      Parsing Reality...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5" />
                      Generate Reality
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
