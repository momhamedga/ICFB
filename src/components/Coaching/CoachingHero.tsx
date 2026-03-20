"use client";
import { Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export default function CoachingHero() {
  return (
    <section className="relative h-[45vh] md:h-[65vh] flex items-center justify-center overflow-hidden bg-[#003366]">
      <div className="absolute inset-0 z-0">
        {/* Animated Aura */}
        <motion.div 
          animate={{ 
            scale: [1, 1.15, 1], 
            opacity: [0.4, 0.6, 0.4],
            rotate: [0, 5, 0]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute -top-24 -left-24 w-[500px] h-[500px] bg-[#E63946] rounded-full blur-[140px]" 
        />
        
        {/* Carbon Pattern Overlay */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-25 mix-blend-overlay pointer-events-none" />
        
        {/* Fade Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#003366]/40 to-[#003366]" />
      </div>

      <div className="relative z-10 text-center px-6">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 text-white/90 text-[10px] font-black uppercase tracking-[0.4em] mb-10"
        >
          <Sparkles size={14} className="text-[#E63946] animate-pulse" /> 
          Elite_Coaching_Protocol
        </motion.div>
        
        {/* Typography */}
        <motion.h1 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-white text-[15vw] md:text-[10rem] font-black tracking-tighter uppercase leading-[0.8]"
        >
          Coach<span className="text-[#E63946] italic">ing_</span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ delay: 0.5 }}
          className="text-white mt-10 font-bold tracking-[0.7em] uppercase text-[10px] md:text-sm max-w-xl mx-auto leading-relaxed"
        >
          Maximising Human Potential Through <br className="hidden md:block"/> Advanced Strategic Mentorship
        </motion.p>
      </div>
    </section>
  );
}