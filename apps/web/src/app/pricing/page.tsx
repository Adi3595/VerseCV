"use client";

import { motion } from "framer-motion";
import LiquidGlassCard from "@/components/cinematic/LiquidGlassCard";
import { Check } from "lucide-react";

export default function PricingPage() {
  const tiers = [
    {
      name: "Mortal",
      price: "Free",
      description: "A glimpse into the multiverse.",
      features: [
        "3 Universe Generations",
        "Standard Export (PDF)",
        "Basic Typography",
        "Community Support",
      ],
      glow: "group-hover:bg-primary/20",
      buttonText: "Start Free",
      buttonClass: "bg-white/10 hover:bg-white/20 text-white",
    },
    {
      name: "Dimensional Traveler",
      price: "$12",
      period: "/month",
      description: "For those who frequently jump timelines.",
      features: [
        "Unlimited Generations",
        "Premium Export (PDF + DOCX)",
        "Cinematic Typography",
        "High-Res Portrait Generation",
        "Priority Support",
      ],
      glow: "group-hover:bg-accent/30",
      buttonText: "Upgrade Now",
      buttonClass: "bg-accent hover:bg-accent/90 text-background font-bold shadow-[0_0_20px_rgba(168,218,220,0.4)]",
      popular: true,
    },
    {
      name: "Time Lord",
      price: "$49",
      period: "/month",
      description: "Total mastery over space, time, and careers.",
      features: [
        "Everything in Traveler",
        "Custom Universe Creation",
        "API Access (100 req/mo)",
        "White-glove Resume Review",
        "Dedicated Quantum Support",
      ],
      glow: "group-hover:bg-primary/40",
      buttonText: "Contact Us",
      buttonClass: "bg-white/10 hover:bg-white/20 text-white",
    },
  ];

  return (
    <main className="min-h-screen pt-32 pb-24 px-4 flex flex-col items-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl text-center mb-16"
      >
        <h1 className="text-5xl md:text-7xl font-outfit font-bold mb-6">
          Fund your expedition.
        </h1>
        <p className="text-xl text-white/60 max-w-2xl mx-auto">
          Choose the level of access you need to traverse the multiverse.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto w-full relative z-10">
        {tiers.map((tier, i) => (
          <motion.div
            key={tier.name}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.15 }}
            className="h-full"
          >
            <LiquidGlassCard className="h-full flex flex-col relative group overflow-hidden border-white/10 hover:border-white/30 transition-all duration-500">
              {/* Glowing Background Effect */}
              <div className={`absolute top-0 right-0 w-64 h-64 blur-[100px] -translate-y-1/2 translate-x-1/2 rounded-full transition-colors duration-700 ${tier.glow}`} />
              
              {tier.popular && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-accent text-background text-xs font-bold px-4 py-1 rounded-b-lg uppercase tracking-wider">
                  Most Popular
                </div>
              )}

              <div className="relative z-10 flex flex-col h-full">
                <h3 className="text-2xl font-bold mb-2">{tier.name}</h3>
                <p className="text-white/60 mb-6 min-h-[48px]">{tier.description}</p>
                
                <div className="mb-8">
                  <span className="text-5xl font-outfit font-bold">{tier.price}</span>
                  {tier.period && <span className="text-white/50">{tier.period}</span>}
                </div>

                <ul className="space-y-4 mb-8 flex-1">
                  {tier.features.map((feature, j) => (
                    <li key={j} className="flex items-start gap-3">
                      <div className="mt-1 rounded-full p-1 bg-white/10">
                        <Check className="w-3 h-3 text-white" />
                      </div>
                      <span className="text-white/80 text-sm leading-relaxed">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button className={`w-full py-4 rounded-xl transition-all ${tier.buttonClass}`}>
                  {tier.buttonText}
                </button>
              </div>
            </LiquidGlassCard>
          </motion.div>
        ))}
      </div>
    </main>
  );
}
