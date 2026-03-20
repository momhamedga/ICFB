"use client";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

export const BenefitItem = ({ text, index }: { text: string; index: number }) => (
  <motion.div 
    initial={{ opacity: 0, x: 20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
    className="group flex items-center gap-5 p-5 rounded-[2rem] bg-zinc-50/50 border border-transparent hover:border-red-600/10 hover:bg-white hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] transition-all duration-500 cursor-default active:scale-95 md:active:scale-100"
  >
    <div className="relative flex-shrink-0 w-10 h-10 rounded-xl bg-[#002a54] flex items-center justify-center transition-all duration-500 group-hover:bg-red-600 group-hover:rotate-[360deg] shadow-lg shadow-[#002a54]/10">
      <Check className="w-5 h-5 text-white" strokeWidth={3} />
    </div>
    <span className="text-zinc-800 font-bold text-sm md:text-base tracking-tight leading-tight group-hover:text-red-600 transition-colors">
      {text}
    </span>
  </motion.div>
);