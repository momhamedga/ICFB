"use client";

import { motion } from "framer-motion";

export const GlassMatrix = ({ children }: { children: React.ReactNode }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.98 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      className="relative p-[1px] bg-gradient-to-br from-white/20 via-white/5 to-transparent rounded-[3rem] md:rounded-[5rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] group"
    >
      {/* طبقة الزجاج الرئيسية مع Blur عالي جداً */}
      <div className="relative bg-[#001b3a]/40 backdrop-blur-[40px] rounded-[2.9rem] md:rounded-[4.9rem] p-10 md:p-24 border border-white/5 overflow-hidden">
        
        {/* إضاءة داخلية سينمائية تتحرك عشوائياً (Internal Light Leak) */}
        <motion.div 
          animate={{ 
            x: [-100, 100, -100], 
            y: [-50, 50, -50],
            opacity: [0.1, 0.2, 0.1]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute top-0 left-0 w-[600px] h-[600px] bg-blue-500/20 blur-[130px] -z-10 pointer-events-none"
        />

        {/* تأثير الـ Flare (وهج) يظهر عند الـ Hover في الديسكتوب فقط */}
        <div className="absolute inset-0 bg-gradient-to-tr from-rose-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none" />

        {/* محتوى الشبكة (الأيقونات) */}
        <div className="relative z-10">
          {children}
        </div>
      </div>

      {/* لمسة نهائية: حدود خارجية مضيئة خفيفة جداً */}
      <div className="absolute inset-0 rounded-[3rem] md:rounded-[5rem] border border-white/10 pointer-events-none" />
    </motion.div>
  );
};

export default GlassMatrix;