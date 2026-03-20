"use client";
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { memo } from "react";

interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
  delay: number;
  className?: string;
  highlight?: boolean;
}

const StatCard = ({ icon: Icon, label, value, delay, className, highlight }: StatCardProps) => (
  <motion.div 
    initial={{ opacity: 0, scale: 0.95, y: 15 }}
    whileInView={{ opacity: 1, scale: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ delay, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    whileHover={{ y: -8, transition: { duration: 0.3 } }}
    className={`absolute p-5 md:p-6 rounded-[2rem] md:rounded-[2.5rem] backdrop-blur-xl border flex flex-col items-center justify-center min-w-[130px] md:min-w-[170px] transition-all active:scale-95 group overflow-hidden ${className} ${
      highlight 
      ? 'bg-white/95 border-red-100 shadow-[0_30px_60px_-15px_rgba(239,68,68,0.12)]' 
      : 'bg-white/80 border-white/60 shadow-[0_20px_40px_-10px_rgba(0,43,92,0.04)]'
    }`}
  >
    {/* تأثير ضوئي داخلي عند التحويم */}
    <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

    {/* الأيقونة: تم تبسيط الخلفية لتقليل التشتت */}
    <div className={`p-3 md:p-3.5 rounded-2xl mb-3.5 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 ${
      highlight 
      ? 'bg-red-600 text-white shadow-lg shadow-red-600/20' 
      : 'bg-zinc-100/80 text-[#002b5c]'
    }`}>
      <Icon size={22} strokeWidth={2.2} />
    </div>

    {/* القيمة: استجابة بصرية للـ Hover */}
    <div className={`text-2xl md:text-3xl font-black tracking-tighter mb-0.5 uppercase italic transition-colors duration-300 ${
      highlight ? 'text-[#002b5c]' : 'text-[#002b5c]'
    }`}>
      {value}
    </div>

    {/* النص التوضيحي: جعلناه أكثر نحافة (Minimalist) */}
    <div className="text-[9px] font-bold uppercase tracking-[0.25em] text-zinc-400/80">
      {label}
    </div>

    {/* لمعة خارجية (Border Glow) بسيطة جداً */}
    <div className={`absolute inset-0 rounded-[inherit] border opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none ${
      highlight ? 'border-red-200' : 'border-white'
    }`} />
  </motion.div>
);

export default memo(StatCard);