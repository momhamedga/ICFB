"use client";
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

export const ServiceIcon = ({ icon: Icon, title, index }: { icon: LucideIcon, title: string, index: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
    whileHover={{ y: -8 }}
    className="flex flex-col items-center group cursor-pointer touch-none"
  >
    {/* Icon Container with Neon Glow */}
    <div className="relative w-20 h-20 md:w-28 md:h-28 mb-6 flex items-center justify-center">
      {/* Background Glass Layer */}
      <div className="absolute inset-0 bg-white/5 rounded-[2.5rem] border border-white/10 group-hover:scale-110 group-hover:bg-white group-hover:shadow-[0_0_40px_rgba(255,255,255,0.3)] transition-all duration-700 ease-[0.16, 1, 0.3, 1]" />
      
      {/* Dynamic Border Ring */}
      <div className="absolute inset-[-4px] border border-rose-500/0 group-hover:border-rose-500/40 rounded-[2.8rem] transition-all duration-700 scale-90 group-hover:scale-100" />
      
      <Icon className="relative z-10 w-8 h-8 md:w-10 md:h-10 text-white group-hover:text-[#002a54] transition-colors duration-500" strokeWidth={1.5} />
      
      {/* Mobile Subtle Pulse */}
      <div className="absolute inset-0 rounded-[2.5rem] bg-rose-500/10 opacity-0 group-active:opacity-100 md:group-hover:opacity-0 transition-opacity" />
    </div>
    
    <h3 className="text-zinc-400 font-black text-[9px] md:text-[11px] uppercase tracking-[0.3em] text-center max-w-[120px] group-hover:text-white transition-colors leading-relaxed">
      {title.replace(' ', '_')}
    </h3>
  </motion.div>
);