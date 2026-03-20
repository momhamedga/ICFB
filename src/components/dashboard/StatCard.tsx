// src/components/dashboard/StatCard.tsx
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  label: string;
  value: string;
  icon: LucideIcon;
  color: string; // سيفضل استخدام اللون الأحمر هنا
}

export const StatCard = ({ label, value, icon: Icon, color }: StatCardProps) => (
  <motion.div 
    whileTap={{ scale: 0.98 }}
    className="bg-white border border-zinc-200/60 p-6 rounded-[2rem] flex items-center gap-5 shadow-sm hover:shadow-md transition-shadow"
  >
    <div className="p-4 rounded-2xl bg-[#E63946]/5 text-[#E63946]">
      <Icon size={24} />
    </div>
    <div>
      <p className="text-[10px] font-black uppercase text-zinc-400 tracking-widest">{label}</p>
      <p className="text-xl font-bold text-[#003366] tracking-tight">{value}</p>
    </div>
  </motion.div>
);