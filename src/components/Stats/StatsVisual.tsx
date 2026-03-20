"use client";
import { motion } from "framer-motion";

export const StatsVisual = () => (
  <div className="relative w-full max-w-[320px] md:max-w-[400px] aspect-square flex items-center justify-center">
    {/* هالة ضوئية أنعم */}
    <div className="absolute inset-0 bg-red-500/5 blur-[80px] rounded-full" />
    
    <motion.div 
      initial={{ scale: 0.9, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      animate={{ y: [0, -15, 0] }}
      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      className="relative z-20 w-48 h-48 md:w-72 md:h-72 bg-[#ef4444] rounded-[3rem] shadow-[0_40px_80px_-15px_rgba(239,68,68,0.3)] flex items-center justify-center overflow-hidden border border-white/20"
    >
      <div className="text-center z-10 px-4">
        <span className="text-white/40 font-black text-[8px] uppercase tracking-[0.4em] mb-2 block italic">Core_Node</span>
        <h1 className="text-white text-5xl md:text-7xl font-black italic tracking-tighter leading-none">
          ICFB<span className="text-red-300">.</span>
        </h1>
      </div>
      {/* رتوش جمالية بسيطة */}
      <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-white/10 blur-2xl rounded-full" />
    </motion.div>
  </div>
);