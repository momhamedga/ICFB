"use client";

import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface InfoCardProps {
  icon: LucideIcon;
  title: string;
  value: string;
  desc: string;
}

export const ContactInfo = ({ icon: Icon, title, value, desc }: InfoCardProps) => (
  <motion.div 
    whileHover={{ y: -5, x: 5 }} 
    whileTap={{ scale: 0.98 }} 
    className="group relative bg-white border border-zinc-100 p-6 md:p-8 rounded-[35px] md:rounded-[40px] cursor-pointer shadow-[0_10px_40px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)] transition-all duration-500"
  >
    <div className="flex flex-col md:flex-row items-center md:items-start text-center md:text-left gap-5 md:gap-7">
      
      {/* Container الأيقونة - خليناه أحمر صريح عشان يظهر على الأبيض */}
      <div className="w-16 h-16 md:w-20 md:h-20 rounded-[22px] md:rounded-[26px] bg-[#f8f9fa] flex items-center justify-center text-[#E63946] group-hover:bg-[#E63946] group-hover:text-white transition-all duration-500 shadow-inner">
        <Icon size={26} className="md:w-[32px] md:h-[32px]" />
      </div>

      <div className="flex-1">
        {/* العناوين بقت أغمق عشان التباين (Contrast) */}
        <h4 className="text-zinc-400 text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] mb-2 leading-none">
          {title}
        </h4>
        
        <p className="text-[#001c30] font-black text-xl md:text-2xl group-hover:text-[#E63946] transition-colors duration-300 leading-tight break-all md:break-normal">
          {value}
        </p>
        
        <p className="text-zinc-500 text-[11px] md:text-[12px] mt-2 font-bold tracking-tight opacity-70 group-hover:opacity-100 transition-opacity">
          {desc}
        </p>
      </div>
    </div>

    {/* لمسة جمالية: خط أحمر خفي يظهر عند الهوفر في أسفل الكارت */}
    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[3px] bg-[#E63946] rounded-full group-hover:w-1/3 transition-all duration-500" />
  </motion.div>
);