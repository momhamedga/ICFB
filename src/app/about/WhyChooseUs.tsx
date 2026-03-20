"use client";

import React, { useReducer, useEffect, useRef } from "react";
import { motion, useInView, useSpring, useTransform } from "framer-motion";
import { Play, LucideIcon, Target, Zap } from "lucide-react";
import { SKILLS, STATS } from "@/states/uiStore";

// --- 1. Skill Bar Component (Interactive & Haptic) ---
const SkillBar = ({ label, value, index, active }: { label: string; value: number; index: number; active: boolean }) => (
  <motion.div 
    whileTap={{ scale: 0.98 }}
    className="group space-y-4 p-4 rounded-3xl transition-colors hover:bg-slate-50 active:bg-slate-100"
  >
    <div className="flex justify-between items-end">
      <div className="flex items-center gap-3">
        <div className="w-1.5 h-1.5 rounded-full bg-[#E63946] group-hover:scale-150 transition-transform" />
        <span className="text-[10px] md:text-xs font-black uppercase tracking-[0.3em] text-[#003366] opacity-60 group-hover:opacity-100">
          {label}
        </span>
      </div>
      <span className="text-sm font-black text-[#E63946] font-mono leading-none">
        {value}%
      </span>
    </div>
    <div className="h-[8px] bg-zinc-100 rounded-full overflow-hidden relative">
      <motion.div 
        initial={{ width: 0 }}
        animate={active ? { width: `${value}%` } : {}}
        transition={{ duration: 1.8, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
        className="h-full bg-gradient-to-r from-[#003366] via-[#E63946] to-[#E63946] relative"
      >
        {/* تأثير الوميض المتحرك داخل الشريط */}
        <motion.div 
          animate={{ x: ["-100%", "100%"] }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent w-1/2"
        />
      </motion.div>
    </div>
  </motion.div>
);

// --- 2. Stat Card Component (Animated Counter Design) ---
const StatCard = ({ icon: Icon, count, label, index }: { icon: LucideIcon; count: string; label: string; index: number }) => (
  <motion.div 
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.1, duration: 0.8 }}
    whileTap={{ y: -5 }}
    className="relative p-8 rounded-[3rem] bg-white border border-transparent hover:border-slate-100 hover:shadow-2xl hover:shadow-slate-200/50 transition-all duration-500 group overflow-hidden"
  >
    {/* أيقونة خلفية ضخمة شفافة */}
    <Icon className="absolute -right-4 -bottom-4 w-32 h-32 text-[#003366]/[0.02] group-hover:text-[#E63946]/[0.05] transition-colors" />

    <div className="relative z-10 space-y-6">
      <div className="w-14 h-14 bg-zinc-50 rounded-2xl flex items-center justify-center group-hover:bg-[#003366] transition-all duration-500 group-hover:rotate-[10deg] shadow-sm">
        <Icon className="w-6 h-6 text-[#E63946] group-hover:text-white transition-colors duration-500" />
      </div>
      <div className="space-y-1">
        <h4 className="text-5xl font-black text-[#003366] tracking-tighter italic group-hover:text-[#E63946] transition-colors">
          {count}
        </h4>
        <p className="text-zinc-400 text-[9px] font-black uppercase tracking-[0.4em] leading-relaxed">
          {label}
        </p>
      </div>
      <div className="h-1 w-8 bg-[#E63946] rounded-full group-hover:w-full transition-all duration-700" />
    </div>
  </motion.div>
);

export default function WhyChooseUs() {
  const [activeProgress, startAnimation] = useReducer(() => true, false);
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });

  // تأثير الـ Magnetic للفيديو
  const mouseX = useSpring(0, { stiffness: 100, damping: 30 });
  const mouseY = useSpring(0, { stiffness: 100, damping: 30 });
  const rotateX = useTransform(mouseY, [-300, 300], [10, -10]);
  const rotateY = useTransform(mouseX, [-300, 300], [-10, 10]);

  useEffect(() => {
    if (isInView) startAnimation();
  }, [isInView]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - (rect.left + rect.width / 2));
    mouseY.set(e.clientY - (rect.top + rect.height / 2));
  };

  return (
    <section ref={containerRef} className="py-24 md:py-40 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 md:gap-24 items-center mb-32 md:mb-48">
          
          {/* Left Side: Content & Skills (7 Columns) */}
          <div className="lg:col-span-7 space-y-16">
            <div className="space-y-8">
              <motion.div 
                initial={{ width: 0 }} 
                animate={isInView ? { width: 80 } : {}} 
                className="h-1.5 bg-[#E63946] rounded-full" 
              />
              <h2 className="text-5xl md:text-[5.5rem] font-black text-[#003366] leading-[0.85] uppercase italic tracking-tighter">
                Why Choose <br /> <span className="text-[#E63946] not-italic">Our Systems</span>
              </h2>
              <p className="text-zinc-500 text-sm md:text-lg font-bold leading-relaxed max-w-xl border-l-4 border-zinc-100 pl-6 italic">
                Architecting high-performance digital solutions with the precision of elite engineering and the soul of innovation.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {SKILLS.map((skill, i) => (
                <SkillBar key={i} {...skill} index={i} active={activeProgress} />
              ))}
            </div>
          </div>

          {/* Right Side: Cinematic Video Frame (5 Columns) */}
          <motion.div 
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            onMouseMove={handleMouseMove}
            onMouseLeave={() => { mouseX.set(0); mouseY.set(0); }}
            className="lg:col-span-5 relative group"
          >
            {/* الخلفية الزخرفية النيون */}
            <div className="absolute -inset-10 border border-[#E63946]/5 rounded-[5rem] -z-10 animate-pulse" />
            
            <div className="relative h-[500px] md:h-[650px] rounded-[4rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] border-8 border-white group-hover:border-[#E63946]/10 transition-colors duration-700">
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1200')] bg-cover bg-center grayscale contrast-125 group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#003366]/80 via-[#003366]/20 to-transparent group-hover:opacity-0 transition-opacity duration-700" />
              
              {/* زر التشغيل - Pulse Effect */}
              <div className="absolute inset-0 flex items-center justify-center z-20">
                <motion.button 
                  whileHover={{ scale: 1.15, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-28 h-28 bg-[#E63946] rounded-full flex items-center justify-center text-white shadow-[0_20px_50px_rgba(230,57,70,0.4)] relative overflow-hidden group/btn"
                >
                  <Play fill="currentColor" size={36} className="relative z-10 group-hover/btn:scale-125 transition-transform" />
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500" />
                </motion.button>
              </div>

              {/* تفاصيل تقنية على الحواف */}
              <div className="absolute top-10 left-10 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#E63946] animate-ping" />
                <span className="text-[10px] font-black text-white uppercase tracking-[0.4em] drop-shadow-lg">Live_Feed_01</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Lower Section: Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 border-t border-zinc-100 pt-20">
          {STATS.map((stat, i) => (
            <StatCard key={i} {...stat} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}