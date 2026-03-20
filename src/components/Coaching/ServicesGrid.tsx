"use client";
import { motion } from "framer-motion";
import { Users, Target, Briefcase, BarChart3, Lightbulb, TrendingUp } from "lucide-react";

const SERVICES = [
  { id: "01", label: "Executive", icon: Users, desc: "Leadership development for elite management." },
  { id: "02", label: "Strategic", icon: Target, desc: "High-level goal alignment and roadmapping." },
  { id: "03", label: "Corporate", icon: Briefcase, desc: "Institutional scaling and professional systems." },
  // ... بقية الداتا
];

export default function ServicesGrid() {
  return (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="grid grid-cols-1 md:grid-cols-3 gap-6"
    >
      {SERVICES.map((s, i) => (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          key={s.id}
          className="group relative p-8 bg-white border border-slate-100 rounded-[2.5rem] hover:border-[#E63946]/20 transition-all duration-500 overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-6 text-slate-50 font-black text-6xl group-hover:text-red-50 transition-colors">
            {s.id}
          </div>
          <div className="relative z-10">
             <div className="w-14 h-14 bg-[#003366]/5 rounded-2xl flex items-center justify-center text-[#003366] mb-8 group-hover:bg-[#E63946] group-hover:text-white transition-all duration-500">
                <s.icon size={26} />
             </div>
             <h3 className="text-xl font-black text-[#003366] uppercase tracking-tighter mb-4">{s.label}</h3>
             <p className="text-slate-500 text-sm leading-relaxed max-w-[200px]">{s.desc}</p>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}