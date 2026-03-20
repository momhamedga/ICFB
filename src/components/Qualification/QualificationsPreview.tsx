"use client";

import { motion } from "framer-motion";
import { ArrowRight, Cpu } from "lucide-react";
import Link from "next/link";
import { memo } from "react";

// استيراد المكونات الذرية
import QualificationCard from "./QualificationCard";
import QualificationSkeleton from "@/components/ui/QualificationSkeleton";

interface Qualification {
  id: string | number;
  title: string;
  category: string;
  duration: string;
  image_url: string;
  badge?: string;
}

export default function QualificationsPreview({ 
  data, 
  initialData 
}: { 
  data?: Qualification[], 
  initialData?: Qualification[] 
}) {
  // دمج البيانات مع إعطاء الأولوية للبيانات المحدثة (Real-time data)
  const displayCourses = data?.length ? data : (initialData?.length ? initialData : []);
  const hasData = displayCourses.length > 0;

  return (
    <section className="relative py-24 md:py-44 px-6 bg-white overflow-hidden selection:bg-red-600 selection:text-white">
      
      {/* 🌌 Ultra-Modern Cinematic Background */}
      <div 
        className="absolute inset-0 z-0 opacity-[0.04] pointer-events-none" 
        style={{
          backgroundImage: `radial-gradient(#002a54 1px, transparent 1px)`,
          backgroundSize: '48px 48px'
        }} 
      />
      
      {/* Soft Glow Overlays */}
      <div className="absolute top-0 left-1/4 w-full h-full bg-gradient-to-b from-red-500/5 to-transparent blur-[120px] pointer-events-none" />

      <div className="container mx-auto max-w-7xl relative z-10">
        
        {/* 🏗️ Header System */}
        <header className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-10">
          <div className="max-w-3xl">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-4 mb-8"
            >
              <div className="px-5 py-2 rounded-full border border-zinc-200 bg-white/50 backdrop-blur-md shadow-sm flex items-center gap-3">
                 <Cpu className="text-red-600 animate-spin-slow" size={14} />
                 <span className="text-zinc-900 font-black text-[10px] uppercase tracking-[0.35em]">System_Protocol_v3</span>
              </div>
            </motion.div>
            
            <h2 className="text-[14vw] md:text-[9rem] font-black text-[#002a54] leading-[0.78] tracking-[-0.07em] italic uppercase">
              What We <br />
              <span className="text-red-600 not-italic">Provide<span className="text-[#002a54]">.</span></span>
            </h2>
          </div>

          <motion.div 
            whileHover={{ x: 10 }} 
            className="hidden md:block group"
          >
             <Link href="/qualifications" className="flex items-center gap-6 text-[#002a54] font-black text-sm uppercase tracking-[0.25em]">
                <span>Explore Full Catalog</span>
                <div className="w-16 h-16 rounded-[2rem] border border-zinc-200 flex items-center justify-center group-hover:bg-[#002a54] group-hover:border-[#002a54] group-hover:text-white transition-all duration-700 ease-[0.16, 1, 0.3, 1]">
                  <ArrowRight size={24} />
                </div>
             </Link>
          </motion.div>
        </header>

        {/* 📊 Data Grid Logic */}
        <div className="relative min-h-[400px]">
          {!hasData ? (
            <QualificationSkeleton />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-14 mb-20">
              {displayCourses.slice(0, 3).map((course, index) => (
                <QualificationCard key={course.id} course={course} index={index} />
              ))}
            </div>
          )}
        </div>

        {/* 📱 Mobile UI Optimization */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center justify-center md:hidden gap-8"
        >
          <div className="w-full h-[1px] bg-zinc-100" />
          <Link 
            href="/qualifications" 
            className="w-full text-center bg-[#002a54] text-white py-7 rounded-[2.5rem] font-black text-[10px] uppercase tracking-[0.4em] shadow-[0_25px_50px_-12px_rgba(0,42,84,0.4)] active:scale-95 transition-all duration-500"
          >
            Explore_Full_System
          </Link>
        </motion.div>
      </div>
    </section>
  );
}