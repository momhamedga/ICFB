// src/components/certificate/StatusBadge.tsx
import { motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";

export const StatusBadge = () => (
  <motion.div 
    initial={{ opacity: 0, y: -10 }}
    animate={{ opacity: 1, y: 0 }}
    className="inline-flex items-center gap-2 px-4 py-2 bg-rose-50/50 border border-rose-100 rounded-full mb-6 backdrop-blur-sm"
  >
    <ShieldCheck className="w-3.5 h-3.5 text-[#d32f2f]" />
    <span className="text-[#d32f2f] font-black text-[8px] md:text-[9px] uppercase tracking-[0.2em]">
      Official Verification Portal
    </span>
  </motion.div>
);