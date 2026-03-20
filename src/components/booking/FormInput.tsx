// src/components/booking/FormInput.tsx
import { motion } from "framer-motion";

export const FormInput = ({ label, icon, ...props }: any) => (
  <div className="group space-y-3 w-full">
    <label className="text-[10px] font-black uppercase text-white/20 tracking-[0.3em] ml-2 group-focus-within:text-red-500 transition-colors">
      {label}
    </label>
    <div className="flex items-center gap-4 p-5 md:p-6 bg-white/[0.02] border border-white/5 rounded-[2rem] focus-within:border-red-600/50 focus-within:bg-white/[0.05] transition-all duration-500">
      <div className="text-white/10 group-focus-within:text-red-500/50 transition-colors">{icon}</div>
      <input 
        {...props} 
        required 
        className="w-full bg-transparent outline-none font-bold text-white placeholder:text-white/5 text-sm md:text-base" 
      />
    </div>
  </div>
);