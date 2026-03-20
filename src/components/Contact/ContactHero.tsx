"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export default function ContactHero() {
  return (
    <section className="relative h-[60vh] md:h-[80vh] flex items-center justify-center overflow-hidden bg-[#003366]">
      {/* النمط المنقط الدقيق - مطابق للصورة */}
      <div 
        className="absolute inset-0 opacity-[0.12] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(#ffffff 0.8px, transparent 0.8px)`,
          backgroundSize: '14px 14px'
        }}
      />

      <div className="absolute inset-0 z-0">
        <motion.div 
          animate={{ opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#E63946] rounded-full blur-[180px] -translate-y-1/2 translate-x-1/4 opacity-10" 
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#001c30]" />
      </div>

      <div className="relative z-10 text-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-3 px-5 py-2 rounded-full border border-white/10 bg-black/20 backdrop-blur-md mb-10"
        >
          <Sparkles size={12} className="text-[#E63946]" /> 
          <span className="text-white/70 text-[10px] font-black uppercase tracking-[0.4em]">Professional Evolution</span>
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-white text-[16vw] md:text-[12rem] font-black tracking-tighter uppercase leading-[0.75] flex items-baseline justify-center"
        >
          <span>CONV</span>
          <span className="text-[#E63946]">ERT</span>
        </motion.h1>
        
        <motion.p className="text-white/40 mt-8 font-bold tracking-[0.8em] uppercase text-[10px] md:text-[12px]">
          Institutional Architects
        </motion.p>
      </div>
    </section>
  );
}