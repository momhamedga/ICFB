// src/components/hero/CinematicCTA.tsx
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export const CinematicButton = ({ children, primary = false }: any) => (
  <motion.button
    whileHover={{ scale: 1.02, y: -2 }}
    whileTap={{ scale: 0.98 }}
    className={`
      relative group overflow-hidden px-10 py-5 rounded-[2rem] font-black text-[10px] uppercase tracking-[0.3em] transition-all duration-500
      ${primary 
        ? "bg-red-600 text-white shadow-[0_20px_40px_rgba(220,38,38,0.3)]" 
        : "bg-white/5 backdrop-blur-md border border-white/10 text-white hover:border-red-600/50"}
    `}
  >
    <span className="relative z-10 flex items-center gap-3">
      {children} <ArrowUpRight size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
    </span>
    {/* Cinematic Glow Effect */}
    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
  </motion.button>
);