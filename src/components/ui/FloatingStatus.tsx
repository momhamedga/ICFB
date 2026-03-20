"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Zap } from "lucide-react";

interface FloatingStatusProps {
  text: string;
  subText?: string;
  type?: "danger" | "success" | "info";
  delay?: number;
}

export const FloatingStatus = ({ 
  text, 
  subText = "Verified System", 
  type = "info", 
  delay = 0 
}: FloatingStatusProps) => {
  
  // تعريف الألوان بناءً على النوع بأسلوب الـ Ultra-Modern
  const statusStyles = {
    danger: "border-red-500/20 bg-red-500/5 text-red-500",
    success: "border-emerald-500/20 bg-emerald-500/5 text-emerald-500",
    info: "border-white/10 bg-white/5 text-white/90"
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20, scale: 0.9 }}
      animate={{ 
        opacity: 1, 
        x: 0, 
        scale: 1,
        y: [0, -10, 0] // أنيميشن الطفو المستمر
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
        delay: delay,
        opacity: { duration: 0.8, delay: delay },
        x: { duration: 0.8, delay: delay },
        scale: { duration: 0.8, delay: delay }
      }}
      className={`
        backdrop-blur-xl border p-4 md:p-5 rounded-[2.5rem] 
        shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)]
        flex items-center gap-4 group cursor-default
        ${statusStyles[type]}
      `}
    >
      {/* Icon Container with Neon Glow */}
      <div className="relative">
        <div className={`absolute inset-0 blur-lg opacity-40 group-hover:opacity-100 transition-opacity ${type === 'danger' ? 'bg-red-500' : 'bg-red-600'}`} />
        <div className="relative w-10 h-10 md:w-12 md:h-12 rounded-full bg-zinc-950 flex items-center justify-center border border-white/10">
          {type === "danger" ? <Zap size={18} fill="currentColor" /> : <ShieldCheck size={20} />}
        </div>
      </div>

      {/* Text Info */}
      <div className="flex flex-col pr-4">
        <span className="text-[10px] font-black uppercase tracking-[0.3em] opacity-40 mb-1">
          {subText}
        </span>
        <span className="text-xs md:text-sm font-black tracking-tight text-white whitespace-nowrap">
          {text}
        </span>
      </div>

      {/* Visual Tech Decor */}
      <div className="hidden md:block w-8 h-[1px] bg-gradient-to-r from-white/20 to-transparent" />
    </motion.div>
  );
};