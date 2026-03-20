"use client";

import React, { useReducer, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { Play,  LucideIcon } from "lucide-react";
import { SKILLS, STATS } from "@/states/uiStore";

// --- 1. Progress Bar Component ---
const SkillBar = ({ label, value, index, active }: { label: string; value: number; index: number; active: boolean }) => (
  <div className="space-y-3">
    <div className="flex justify-between items-end">
      <span className="text-xs font-black uppercase tracking-widest text-[#003366]">{label}</span>
      <span className="text-sm font-black text-[#E63946]">{value}%</span>
    </div>
    <div className="h-[6px] bg-zinc-100 rounded-full overflow-hidden">
      <motion.div 
        initial={{ width: 0 }}
        animate={active ? { width: `${value}%` } : {}}
        transition={{ duration: 1.5, delay: index * 0.1, ease: "circOut" }}
        className="h-full bg-gradient-to-r from-[#003366] to-[#E63946]"
      />
    </div>
  </div>
);

// --- 2. Stat Card Component (حل مشكلة الـ Type Error هنا) ---
const StatCard = ({ icon: Icon, count, label, index }: { icon: LucideIcon; count: string; label: string; index: number }) => (
  <motion.div 
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.1 }}
    className="space-y-6 group"
  >
    <div className="p-4 bg-zinc-50 rounded-2xl inline-block group-hover:bg-[#003366] transition-all duration-500">
      {/* هنا استبدلنا cloneElement بمكون Icon مباشر لتجنب الـ Type Error */}
      <Icon size={30} className="text-[#E63946] group-hover:text-white transition-colors duration-500" />
    </div>
    <div className="space-y-2">
      <h4 className="text-5xl font-black text-[#003366] tracking-tighter italic">{count}</h4>
      <p className="text-zinc-400 text-[11px] font-bold uppercase tracking-widest leading-relaxed">{label}</p>
    </div>
    <motion.div className="w-10 h-1 bg-[#E63946] group-hover:w-full transition-all duration-500" />
  </motion.div>
);


export default function WhyChooseUs() {
  const [activeProgress, startAnimation] = useReducer(() => true, false);
  const containerRef = React.useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.3 });

  useEffect(() => {
    if (isInView) startAnimation();
  }, [isInView]);

  return (
    <section ref={containerRef} className="py-32 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-32">
          {/* Left: Content */}
          <div className="space-y-10">
            <div className="space-y-6">
              <motion.div initial={{ width: 0 }} animate={isInView ? { width: 50 } : {}} className="h-1 bg-[#E63946]" />
              <h2 className="text-6xl font-black text-[#003366] leading-[0.9] uppercase italic tracking-tighter">
                Why <span className="text-[#E63946]">choose</span> us
              </h2>
              <p className="text-zinc-500 font-medium leading-relaxed max-w-xl">
                We provide the expertise and guidance needed to navigate complex business challenges with modern solutions.
              </p>
            </div>

            <div className="space-y-8">
              {SKILLS.map((skill, i) => (
                <SkillBar key={i} {...skill} index={i} active={activeProgress} />
              ))}
            </div>
          </div>

          {/* Right: Video UI */}
          <div className="relative group">
            <div className="absolute -inset-4 border-2 border-[#E63946]/10 rounded-[4rem] -z-10 rotate-2" />
            <div className="relative h-[550px] rounded-[3.5rem] overflow-hidden shadow-2xl border-4 border-white">
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1000')] bg-cover bg-center grayscale group-hover:grayscale-0 transition-all duration-700" />
              <div className="absolute inset-0 bg-[#003366]/20 group-hover:bg-transparent transition-all" />
              
              <motion.button 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="absolute inset-0 m-auto w-24 h-24 bg-[#E63946] rounded-full flex items-center justify-center text-white shadow-2xl z-20"
              >
                <Play fill="currentColor" size={32} />
              </motion.button>
              <div className="absolute bottom-0 right-0 w-40 h-40 bg-[#E63946]" style={{ clipPath: "polygon(100% 0, 0% 100%, 100% 100%)" }} />
            </div>
          </div>
        </div>

        {/* Lower Section: Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 border-t border-zinc-100 pt-20">
          {STATS.map((stat, i) => (
            <StatCard key={i} {...stat} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}