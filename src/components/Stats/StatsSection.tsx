"use client";
import { motion } from "framer-motion";
import { Users, ShieldCheck, FileCheck } from "lucide-react";
import StatCard from "./StatCard";
import { StatsVisual } from "./StatsVisual";

export default function StatsSection() {
  return (
    <section className="relative py-16 md:py-32 bg-[#fafafa] overflow-hidden">
      
      {/* Background Grid - تقليل الكثافة لراحة العين */}
      <div className="absolute inset-0 opacity-[0.015] pointer-events-none" 
           style={{ backgroundImage: `radial-gradient(#002b5c 1px, transparent 1px)`, backgroundSize: '32px 32px' }} />

      <div className="container mx-auto max-w-6xl px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* النص: احترافي، متزن، وغير ضخم */}
          <div className="space-y-6 md:space-y-8 text-center lg:text-left">
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 border border-red-100"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse" />
              <span className="text-[9px] font-black uppercase tracking-widest text-red-600">ICfB</span>
            </motion.div>
            
            <h2 className="text-5xl md:text-7xl font-black text-[#002b5c] leading-[1.1] tracking-tight uppercase">
              The Way <br/> 
              <span className="text-red-600 italic">We_Do_Things.</span>
            </h2>
            
            <p className="max-w-lg mx-auto lg:mx-0 text-zinc-500 text-lg md:text-xl font-medium leading-relaxed border-l-4 border-red-600 pl-6 italic">
              Unique courses reflecting our core beliefs of respect, rigour, and professional success.
            </p>
          </div>

          {/* التفاعل: نظام الكروت المتجاوب (Responsive Grid for Mobile) */}
          <div className="relative flex items-center justify-center h-[500px] md:h-[600px] w-full">
            
            <StatsVisual />

            {/* الكروت: استخدام إحداثيات مدروسة تمنع الـ Overlap في الشاشات الصغيرة */}
            {/* تم تصغير الـ Scale وتعديل الـ Positions */}
            
            {/* كرت الأعضاء */}
            <StatCard 
              icon={Users} 
              label="Members" 
              value="1,250" 
              delay={0.2} 
              className="-top-4 left-0 md:top-10 md:left-4 z-30 scale-90 md:scale-100 shadow-xl" 
            />
            
            {/* كرت الأمان */}
            <StatCard 
              icon={ShieldCheck} 
              label="Secured" 
              value="100%" 
              delay={0.4} 
              className="-bottom-4 left-4 md:bottom-10 md:left-12 z-10 scale-90 md:scale-100" 
            />
            
            {/* كرت الشهادات (البطل) */}
            <StatCard 
              icon={FileCheck} 
              label="Verified" 
              value="4" 
              delay={0.6} 
              className="top-1/2 -translate-y-1/2 -right-2 md:top-20 md:-right-4 z-40 scale-100 md:scale-110 shadow-2xl" 
              highlight 
            />

            {/* خط المدار الخفي - يعطي هيكلية بصرية بدون زحمة */}
            <div className="absolute w-[80%] h-[80%] border border-dashed border-zinc-200 rounded-full -z-10 opacity-40 md:block hidden" />
          </div>

        </div>
      </div>
    </section>
  );
}