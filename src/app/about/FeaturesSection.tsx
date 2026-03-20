"use client";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
import { Users, Briefcase, Award, ArrowUpRight, Fingerprint } from "lucide-react";
import React, { useRef, useState } from "react";

const features = [
  {
    title: "Expert People",
    tag: "HUMAN_LOGIC",
    description: "Our architects don't just code; they engineer digital destiny with surgical precision.",
    icon: <Users className="w-6 h-6 md:w-8 md:h-8" />,
    color: "#E63946"
  },
  {
    title: "Big Experience",
    tag: "LEGACY_NODE",
    description: "Decades of collective intelligence distilled into high-performance automation protocols.",
    icon: <Briefcase className="w-6 h-6 md:w-8 md:h-8" />,
    color: "#003366"
  },
  {
    title: "Quality First",
    tag: "ZERO_ERROR",
    description: "Committed to the absolute quality. We deliver systems that outlive the competition.",
    icon: <Award className="w-6 h-6 md:w-8 md:h-8" />,
    color: "#E63946"
  }
];

export default function FeaturesSection() {
  return (
    <section className=" py-24 md:py-40 relative overflow-hidden">
      {/* Blueprint Grid - تحسين الوضوح */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:30px_30px] md:bg-[size:50px_50px]" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header - Typography عنيف ومتحرك */}
        <div className="mb-20 md:mb-32">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="flex items-center gap-4 mb-6"
          >
            <div className="h-[2px] w-12 bg-[#E63946]" />
            <span className="text-[#E63946] font-black text-[10px] tracking-[0.6em] uppercase">
              System_Capabilities
            </span>
          </motion.div>
          
          <h2 className="text-6xl md:text-[9rem] font-black text-[#003366] uppercase leading-[0.8] tracking-tighter inline-block relative">
            Core <br /> 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-100 to-zinc-300">Protocols</span>
            {/* لمسة تقنية خلف العنوان */}
            <span className="absolute -right-12 top-0 text-[10px] font-mono text-zinc-300 rotate-90 hidden md:block">
              v3.0_STABLE
            </span>
          </h2>
        </div>

        {/* Grid الكروت مع دعم اللمس الكامل */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-t border-zinc-100/80">
          {features.map((feature, idx) => (
            <FeatureCard key={idx} feature={feature} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FeatureCard({ feature, index }: { feature: typeof features[0], index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // 3D Tilt Logic
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });
  
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"]);

  const handleMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    
    const xPct = (clientX - rect.left) / rect.width - 0.5;
    const yPct = (clientY - rect.top) / rect.height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMove}
      onTouchMove={handleMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => { 
        setIsHovered(false); 
        x.set(0); 
        y.set(0); 
      }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="relative group p-10 md:p-16 border-b md:border-b-0 md:border-r border-zinc-100 transition-colors duration-500 hover:bg-slate-50/50 touch-none active:bg-slate-100/80"
    >
      {/* تأثير الـ Scanline عند التحويم */}
      <AnimatePresence>
        {isHovered && (
          <motion.div 
            initial={{ top: "-100%" }}
            animate={{ top: "100%" }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            className="absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#E63946]/20 to-transparent z-0 pointer-events-none"
          />
        )}
      </AnimatePresence>

      {/* الرقم التسلسلي - عملاق وشفاف */}
      <span className="absolute top-10 right-10 text-9xl font-black text-[#003366]/[0.02] group-hover:text-[#E63946]/[0.05] transition-colors duration-700 pointer-events-none select-none">
        0{index + 1}
      </span>

      <div className="relative z-10 space-y-10" style={{ transform: "translateZ(60px)" }}>
        {/* Container الأيقونة - Magnetic Feel */}
        <motion.div 
          animate={{ 
            boxShadow: isHovered ? `0 20px 40px -10px ${feature.color}30` : "0 0 0px transparent"
          }}
          className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center rounded-[2rem] bg-white border border-zinc-100 transition-all duration-500 group-hover:border-[#E63946]/20 group-hover:rotate-[10deg]"
          style={{ color: feature.color }}
        >
          {feature.icon}
        </motion.div>

        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <Fingerprint className="w-3 h-3 text-[#E63946] opacity-40" />
            <span className="text-[10px] font-black text-zinc-400 tracking-[0.4em] uppercase">
              {feature.tag}
            </span>
          </div>
          
          <h3 className="text-3xl md:text-4xl font-black text-[#003366] uppercase group-hover:text-[#E63946] transition-colors duration-500 leading-none">
            {feature.title}
          </h3>
          
          <p className="text-zinc-500 text-sm md:text-base font-bold leading-relaxed max-w-[280px]">
            {feature.description}
          </p>
        </div>

        {/* زر التفاعل - Mobile Optimized */}
        <motion.div 
          className="pt-8 flex items-center gap-4 text-[#E63946] font-black text-[10px] uppercase tracking-[0.3em] opacity-40 group-hover:opacity-100 transition-all group-active:scale-95"
        >
          <span className="border-b-2 border-[#E63946]/20 group-hover:border-[#E63946] pb-1 transition-all">
            Access_Protocol
          </span>
          <div className="p-2 bg-[#E63946] text-white rounded-full group-hover:translate-x-2 transition-transform shadow-lg shadow-[#E63946]/20">
             <ArrowUpRight size={14} strokeWidth={3} />
          </div>
        </motion.div>
      </div>

      {/* لمسة إضاءة نيون خلفية تظهر في الموبايل عند الضغط */}
      <div className="absolute inset-0 bg-gradient-to-tr from-[#E63946]/[0.02] to-transparent opacity-0 group-active:opacity-100 transition-opacity" />
    </motion.div>
  );
}