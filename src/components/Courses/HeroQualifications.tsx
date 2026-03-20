"use client";
import { motion } from "framer-motion";
import { Shield, Sparkles } from "lucide-react";

export default function HeroQualifications() {
  return (
    <section className="relative h-[50vh] md:h-[65vh] flex items-center justify-center overflow-hidden bg-[#003366]">
      {/* 🌌 Cinematic Background Logic */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Animated Red Aura */}
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
            opacity: [0.3, 0.5, 0.3] 
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-20 -left-20 w-96 h-96 bg-[#ef4444] rounded-full blur-[120px]" 
        />
        
        {/* Carbon Fiber Texture */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20 mix-blend-overlay" />
        
        {/* Bottom Fade to Content */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#003366]" />
      </div>

      <div className="relative z-10 text-center px-4">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-white/80 text-[10px] font-bold uppercase tracking-[0.4em] mb-8"
        >
          <Shield size={14} className="text-[#ef4444]" /> 
          ICFB_Professional_Standards
        </motion.div>

        {/* Main Title: Extreme Typography */}
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-white text-6xl md:text-[9rem] font-black tracking-tighter uppercase leading-none"
        >
          Qualifi<span className="text-[#ef4444]">cations_</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          className="text-white mt-6 font-medium tracking-[0.6em] uppercase text-[10px] md:text-xs"
        >
          Engineered for Elite Leadership
        </motion.p>
      </div>

      {/* Vertical Identity Bar Signature */}
      <div className="absolute left-8 bottom-10 hidden xl:flex flex-col items-center gap-6 pointer-events-none opacity-20">
        <div className="w-[1px] h-24 bg-gradient-to-t from-white to-transparent" />
        <span className="text-[8px] font-black text-white uppercase tracking-[1em] [writing-mode:vertical-rl]">
          Protocol_2026
        </span>
      </div>
    </section>
  );
}