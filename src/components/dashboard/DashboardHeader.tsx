// src/components/dashboard/DashboardHeader.tsx
import { motion } from "framer-motion";
import { Zap, LogOut } from "lucide-react";

export const DashboardHeader = ({ studentName, onLogout }: { studentName: string, onLogout: () => void }) => (
  <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10 md:mb-16">
    <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }}>
      <div className="flex items-center gap-2 text-[#E63946] mb-2">
        <Zap size={14} className="fill-current" />
        <span className="text-[10px] font-black uppercase tracking-[0.3em]">Student_Portal_v2</span>
      </div>
      <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-[#003366] leading-none">
        Welcome Back, <br className="md:hidden" />
        <span className="text-[#E63946] italic opacity-90">
          {studentName.split(' ')[0]}
        </span>
      </h1>
    </motion.div>

    <motion.button 
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onLogout}
      className="w-full md:w-auto group flex items-center justify-center gap-3 bg-white border-2 border-zinc-100 px-8 py-4 rounded-2xl hover:border-[#E63946] hover:bg-[#E63946] transition-all duration-300 shadow-sm"
    >
      <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500 group-hover:text-white">Disconnect</span>
      <LogOut size={18} className="text-[#E63946] group-hover:text-white" />
    </motion.button>
  </header>
);