"use client";
import { motion } from "framer-motion";
import { Briefcase, Stethoscope, Target, HeartPulse, Users, Globe } from "lucide-react";

const STATS_ICONS = [
  { icon: Briefcase, label: "Executive" },
  { icon: Stethoscope, label: "Emergency" },
  { icon: Target, label: "Career" },
  { icon: HeartPulse, label: "Wellbeing" },
  { icon: Users, label: "Group" },
  { icon: Globe, label: "Team" },
];

export default function OverviewSection() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
      className="space-y-12 md:space-y-24"
    >
      {/* 📜 Quote Card: Ultra-Glassmorphism */}
      <div className="bg-white p-8 md:p-20 rounded-[3.5rem] shadow-[0_40px_100px_-30px_rgba(0,0,0,0.05)] border border-slate-50 relative overflow-hidden group">
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-slate-50 rounded-full blur-3xl group-hover:bg-red-50 transition-colors duration-700" />
        
        <h2 className="text-[#003366] font-black text-3xl md:text-5xl leading-[1.1] tracking-tight max-w-4xl relative z-10">
          Coaching is a partnership in a <span className="text-[#E63946] italic">thought-provoking</span> process that inspires clients to <span className="underline decoration-[6px] decoration-[#E63946]/20 underline-offset-[12px]">maximise potential</span>.
        </h2>

        <div className="mt-16 flex flex-col md:flex-row md:items-center gap-8 md:gap-12">
           <div className="flex items-baseline gap-4">
              <span className="text-6xl md:text-8xl font-black text-[#003366] tracking-tighter">88<span className="text-[#E63946]">%</span></span>
              <div className="h-12 w-[2px] bg-slate-100 hidden md:block" />
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] leading-relaxed">
                Productivity Boost <br/> Reported by ICF Protocol
              </p>
           </div>
        </div>
      </div>

      {/* 🔘 Icon Grid: Optimized for Mobile Touch */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
        {STATS_ICONS.map((s, i) => (
          <motion.div 
            whileHover={{ y: -8, backgroundColor: "#003366", color: "#ffffff" }}
            key={i} 
            className="p-8 bg-white rounded-[2.5rem] border border-slate-100 shadow-sm transition-all duration-500 flex flex-col items-center gap-5 group cursor-pointer"
          >
            <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-white/10 group-hover:text-white transition-all">
              <s.icon size={24} strokeWidth={2.5} />
            </div>
            <span className="font-black uppercase text-[9px] tracking-[0.2em] text-slate-500 group-hover:text-white/80 transition-colors">
              {s.label}
            </span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}