"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { Sparkles, Clock, Award, BookmarkCheck, ChevronDown } from "lucide-react";
import { getFullImageUrl } from "@/lib/utils";

export default function HeroSection({ course }: { course: any }) {
  return (
    <section className="relative min-h-[70vh] md:min-h-[85vh] flex items-center overflow-hidden bg-[#003366]">
      
      {/* --- BACKGROUND LAYER (The Evolution Style) --- */}
      <div className="absolute inset-0">
        {/* Animated Red Glow */}
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 45, 0],
            opacity: [0.2, 0.4, 0.2] 
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-[#ef4444] rounded-full blur-[150px]" 
        />
        
        {/* Texture & Grid Overlay */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-30 mix-blend-overlay" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#001b3a_100%)] opacity-80" />
      </div>

      {/* --- CONTENT LAYER --- */}
      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full pt-32 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 md:gap-16 items-center">
          
          {/* Left: Course Info */}
          <div className="space-y-8 text-center lg:text-left order-2 lg:order-1">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-[#ef4444] text-[10px] font-black uppercase tracking-[0.4em] mx-auto lg:mx-0"
            >
              <Sparkles size={14} className="animate-pulse" /> 
              {course.category || "Professional Evolution"}
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-7xl lg:text-[6.5rem] font-black text-white leading-[0.9] tracking-tighter uppercase"
            >
              {/* تلوين آخر كلمة بستايل الـ Courses */}
              {course.title.split(' ').slice(0, -1).join(' ')} 
              <span className="text-[#ef4444]"> {course.title.split(' ').pop()}</span>
            </motion.h1>

            {/* Stats Grid - Hybrid Style */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="grid grid-cols-2 md:flex md:flex-wrap gap-4 md:gap-10 border-t border-white/10 pt-10"
            >
              <StatItem icon={<Clock size={20}/>} label="Duration" value={course.duration} />
              <StatItem icon={<Award size={20}/>} label="Level" value={`Lvl ${course.level}`} />
              <div className="col-span-2 md:col-span-1">
                <StatItem icon={<BookmarkCheck size={20}/>} label="Auth" value={course.accreditation || "ILM Approved"} />
              </div>
            </motion.div>
          </div>

          {/* Right: Modern Frame Image */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, rotate: 2 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            className="relative order-1 lg:order-2 group"
          >
            <div className="relative aspect-[4/3] rounded-[3rem] overflow-hidden border border-white/10 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.6)] z-20">
              <Image 
                src={getFullImageUrl(course.image_url)} 
                alt={course.title} 
                fill 
                className="object-cover scale-105 group-hover:scale-110 transition-transform duration-1000" 
                priority 
                unoptimized
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#003366]/80 via-transparent to-transparent opacity-60" />
            </div>
            
            {/* Decorative Frames */}
            <div className="absolute -bottom-6 -right-6 w-full h-full border border-[#ef4444]/30 rounded-[3rem] -z-10 hidden md:block" />
            <div className="absolute -top-6 -left-6 w-24 h-24 border-t-2 border-l-2 border-[#ef4444] rounded-tl-[3rem] -z-10 hidden md:block" />
          </motion.div>
        </div>
      </div>

      {/* Mobile Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/10 animate-bounce md:hidden">
        <ChevronDown size={30} />
      </div>
    </section>
  );
}

function StatItem({ icon, label, value }: any) {
  return (
    <div className="flex flex-col md:flex-row items-center lg:items-start md:items-center gap-3 md:gap-4 p-5 md:p-0 bg-white/[0.03] md:bg-transparent rounded-[2rem] border border-white/5 md:border-none">
      <div className="w-12 h-12 rounded-2xl bg-[#ef4444]/10 flex items-center justify-center border border-[#ef4444]/20 text-[#ef4444] shadow-[0_0_20px_rgba(239,68,68,0.1)]">
        {icon}
      </div>
      <div className="text-center md:text-left">
        <p className="text-white/30 text-[9px] font-black uppercase tracking-[0.2em] mb-1">{label}</p>
        <p className="text-white font-bold text-base md:text-lg tracking-tight">{value}</p>
      </div>
    </div>
  );
}