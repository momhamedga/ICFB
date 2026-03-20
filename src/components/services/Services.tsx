"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { BookOpen, ShieldCheck, Crown, Activity, ArrowUpRight, Cpu } from "lucide-react";
import React, { memo, useRef } from "react";

// استيرادات المكونات - تأكد من وجود ملف CinematicCTA في المسار الصحيح
import { ServiceBadge, GridBackground } from "./ServiceVisuals"; 
import { CinematicButton } from "@/components/ui/CinematicCTA";

// ✅ حل الخطوط الحمراء بتعريف الواجهة بدقة
interface ServiceItem {
  id: string;
  title: string;
  tag: string;
  desc: string;
  icon: React.ElementType; 
}

const services: ServiceItem[] = [
  { id: "exec", title: "Executive_Mastery", tag: "Lvl_7_Protocol", desc: "Strategic leadership evolution for high-performance directors.", icon: Crown },
  { id: "clin", title: "Clinical_Integrity", tag: "Certified_UK", desc: "Advanced ethical oversight ensuring rigorous professional standards.", icon: ShieldCheck },
  { id: "cpd", title: "CPD_Architecture", tag: "Global_Std", desc: "Recognized development modules for lifelong academic excellence.", icon: BookOpen }
];

const ServiceCard = memo(({ service, index }: { service: ServiceItem, index: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // فيزيائية حركة سلسة جداً (Ultra-Smooth Physics)
  const mouseX = useSpring(x, { stiffness: 400, damping: 40 });
  const mouseY = useSpring(y, { stiffness: 400, damping: 40 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (rect) {
      x.set(e.clientX - rect.left);
      y.set(e.clientY - rect.top);
    }
  };

  const Icon = service.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-20px" }} // تحسين للموبايل ليبدأ الأنيميشن مبكراً
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      ref={cardRef}
      className="group relative h-full active:scale-[0.98] transition-transform" // تغذية راجعة للمس على الموبايل
    >
      {/* Card Body - Deep Navy Cinematic */}
      <div className="relative z-10 h-full min-h-[460px] rounded-[2.5rem] bg-[#002a54] p-8 md:p-10 flex flex-col justify-between overflow-hidden shadow-[0_20px_50px_rgba(0,42,84,0.3)] transition-all duration-500 group-hover:shadow-[0_40px_80px_rgba(220,38,38,0.2)]">
        
        {/* Cinematic Spotlight - أحمر خافت جداً يظهر فوق الكحلي */}
        <motion.div
          className="pointer-events-none absolute -inset-px rounded-[2.5rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: useTransform(
              [mouseX, mouseY],
              ([cx, cy]) => `radial-gradient(450px circle at ${cx}px ${cy}px, rgba(220, 38, 38, 0.15), transparent 65%)`
            ),
          }}
        />

        {/* Top UI Section */}
        <div className="relative z-20">
          <div className="flex justify-between items-start mb-12">
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 group-hover:border-red-500/50 group-hover:bg-red-500/10 transition-all duration-500">
              <Icon size={28} className="text-white group-hover:text-red-500 transition-colors" />
            </div>
            <ServiceBadge>{service.tag}</ServiceBadge>
          </div>

          <div className="space-y-4 text-left">
            <h3 className="text-4xl md:text-5xl font-black text-white leading-[0.85] tracking-tighter italic uppercase">
              {service.title.split('_')[0]} <br />
              <span className="text-red-600 group-hover:text-white transition-colors duration-500">
                 {service.title.split('_')[1]}
              </span>
            </h3>
            <p className="text-white/40 text-sm font-medium leading-relaxed max-w-[240px] group-hover:text-white/70 transition-colors">
              {service.desc}
            </p>
          </div>
        </div>

        {/* Bottom Action Section */}
        <div className="relative z-20 pt-8 border-t border-white/5 flex items-center justify-between">
            <CinematicButton>Access_Protocol</CinematicButton>
            <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:border-red-500 transition-colors">
              <ArrowUpRight size={18} className="text-white group-hover:text-red-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
            </div>
        </div>

        {/* Glass Reflection Effect */}
        <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />
      </div>
    </motion.div>
  );
});
ServiceCard.displayName = "ServiceCard";

export default function ServicesSection() {
  return (
    <section className="relative py-24 md:py-48 px-6 bg-white overflow-hidden selection:bg-red-600 selection:text-white">
      {/* ✅ GridBackground - تم تحسينها لتظهر بشكل ناعم جداً على الخلفية البيضاء */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none">
        <GridBackground /> 
      </div>
      
      {/* Cinematic Overlays */}
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-red-500/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-[#002a54]/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto max-w-7xl relative z-10 text-left">
        <header className="mb-24 relative">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="flex items-center gap-4 mb-8"
          >
            <div className="px-4 py-1.5 rounded-full border border-zinc-200 bg-white shadow-sm flex items-center gap-3">
               <Cpu className="text-red-600 animate-spin-slow" size={14} />
               <span className="text-zinc-900 font-black text-[10px] uppercase tracking-[0.3em]">Module_Interface_01</span>
            </div>
            <div className="h-[1px] w-20 bg-zinc-200" />
          </motion.div>

          <h2 className="text-[15vw] md:text-[10rem] font-black leading-[0.75] tracking-[-0.07em] italic uppercase text-[#002a54]">
            <span className="block drop-shadow-sm">icfb</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-[#002a54] animate-gradient-x">
              Services<span className="text-[#002a54]">.</span>
            </span>
          </h2>

        
        </header>

        {/* Mobile-Friendly Grid System */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-14">
          {services.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}