"use client";

import { motion } from "framer-motion";
import { 
  Layers, 
  ArrowUpRight, 
  CheckCircle2, 
  Trophy, 
  Info, 
  Send 
} from "lucide-react";

// --- 1. Service Card (تصميم البطاقات مع استجابة لمس كاملة) ---
export function ServiceCard({ title, index }: { title: string; index: number }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      whileTap={{ scale: 0.95, rotate: index % 2 === 0 ? 0.5 : -0.5 }}
      transition={{ duration: 0.7, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
      className="group relative p-8 md:p-12 bg-white rounded-[3rem] border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden cursor-pointer select-none active:bg-slate-50"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-transparent to-[#E63946]/[0.03] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
      
      <div className="relative z-10">
        <div className="flex justify-between items-start mb-10">
          <span className="text-[11px] font-black text-[#003366] tracking-[0.4em] opacity-20">
            {index.toString().padStart(2, '0')}
          </span>
          <div className="p-4 bg-slate-50 text-[#003366] rounded-2xl group-hover:bg-[#E63946] group-hover:text-white transition-all duration-500 group-hover:rotate-[15deg] shadow-sm">
            <Layers className="w-5 h-5 md:w-6 md:h-6" />
          </div>
        </div>
        
        <h4 className="text-lg md:text-xl font-black text-[#003366] leading-[1.1] uppercase tracking-tighter group-hover:text-[#E63946] transition-colors">
          {title.split(" ").map((word, i) => (
            <span key={i} className="block">{word}</span>
          ))}
        </h4>

        <div className="mt-8 flex items-center gap-2 opacity-40 md:opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-500">
          <span className="text-[9px] font-black uppercase tracking-[0.3em] text-[#E63946]">Protocol_Entry</span>
          <ArrowUpRight size={14} className="text-[#E63946]" />
        </div>
      </div>
    </motion.div>
  );
}

// --- 2. Tab Trigger (أزرار التبديل السينمائية) ---
export function TabTrigger({ label, isActive, onClick }: any) {
  return (
    <button 
      onClick={onClick}
      className={`relative flex-1 py-5 md:py-7 rounded-full text-[10px] md:text-[11px] font-black uppercase tracking-[0.4em] transition-all duration-700 outline-none tap-highlight-transparent touch-manipulation ${
        isActive ? "text-white" : "text-white/30 hover:text-white/60"
      }`}
    >
      {isActive && (
        <motion.div 
          layoutId="activeGlow"
          className="absolute inset-0 bg-[#E63946] rounded-full shadow-[0_15px_40px_-5px_rgba(230,57,70,0.5)]"
          initial={false}
          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
        />
      )}
      <span className="relative z-10">{label}</span>
    </button>
  );
}

// --- 3. Mentoring Benefit (قائمة مزايا المنتورينج) ---
export function MentoringBenefit({ title, index }: { title: string; index: number }) {
  return (
    <motion.div 
      whileTap={{ x: 10 }}
      className="group flex items-center justify-between p-6 md:p-8 bg-white border border-slate-100 rounded-[2.5rem] shadow-sm active:shadow-inner transition-all duration-300"
    >
      <div className="flex items-center gap-6 md:gap-8">
        <div className="w-12 h-12 md:w-16 md:h-16 bg-[#003366] text-white rounded-[1.2rem] md:rounded-[1.5rem] flex items-center justify-center group-active:scale-95 transition-transform">
          <CheckCircle2 className="w-5 h-5 md:w-6 md:h-6" strokeWidth={1.5} />
        </div>
        <span className="text-sm md:text-xl font-black text-[#003366]/80 uppercase tracking-tight">
          {title}
        </span>
      </div>
      <ArrowUpRight className="text-slate-200 group-hover:text-[#E63946] transition-colors" size={18} />
    </motion.div>
  );
}

// --- 4. Corporate Sidebar (العمود الجانبي لقسم الشركات) ---
export function CorporateSidebar() {
  return (
    <div className="space-y-6">
      <div className="p-10 md:p-14 bg-white rounded-[3.5rem] shadow-[0_50px_100px_-30px_rgba(0,0,0,0.05)] border border-slate-50 relative overflow-hidden group">
        <div className="absolute -top-10 -right-10 w-40 h-40 border-[20px] border-slate-50 rounded-full opacity-50 group-hover:scale-110 transition-transform duration-700" />
        
        <h3 className="text-4xl font-black text-[#003366] leading-[0.9] uppercase tracking-tighter mb-8">
          Core <br/><span className="text-[#E63946]">Expertise.</span>
        </h3>
        <p className="text-slate-500 text-[15px] font-bold leading-relaxed tracking-tight">
          Tailoring in-house coaching and mentoring programmes for organisations and providing executive one-to-one coaching for leaders.
        </p>
      </div>

      <motion.div 
        whileHover={{ scale: 1.02 }}
        className="p-8 bg-[#E63946] rounded-[2.8rem] text-white shadow-xl shadow-red-900/20 flex items-center gap-6"
      >
        <div className="w-14 h-14 bg-white/20 rounded-2xl backdrop-blur-md flex items-center justify-center">
          <Trophy size={28} />
        </div>
        <p className="font-black text-[10px] md:text-[11px] uppercase leading-tight tracking-[0.2em]">
          Embedding a high-performance <br/> coaching culture.
        </p>
      </motion.div>
    </div>
  );
}

// --- 5. Mentoring Sidebar (العمود الجانبي لقسم المنتورينج) ---
export function MentoringSidebar() {
  return (
    <div className="space-y-10">
      <div className="relative">
        <span className="text-[100px] md:text-[120px] font-black text-slate-100 absolute -top-12 md:-top-16 -left-4 select-none leading-none z-0">03</span>
        <h2 className="text-5xl md:text-6xl font-black text-[#003366] relative z-10 leading-[0.9] tracking-tighter uppercase">
          Mentoring <br /><span className="text-[#E63946]">Group.</span>
        </h2>
      </div>
      
      <p className="text-lg md:text-xl font-bold text-slate-600 leading-snug italic border-l-[6px] border-[#E63946] pl-8">
        Critically examine your coaching product, develop your pitch, and build your online marketplace profile.
      </p>

      <div className="p-10 bg-[#001429] rounded-[3.5rem] text-white/90 border border-white/5 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#E63946]/10 blur-[50px]" />
        <h4 className="flex items-center gap-3 font-black uppercase tracking-[0.3em] text-[10px] text-[#E63946] mb-8">
          <Info size={16} /> Program Logistics
        </h4>
        <ul className="space-y-5">
          {["Interactive (3x 2.5hr modules)", "Product & Positioning Focus", "Online 2-way audio/vision", "Small group peer-testing"].map((item, i) => (
            <li key={i} className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-white/70">
              <div className="w-1.5 h-1.5 rounded-full bg-[#E63946]" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

// --- 6. Contact Section (فورم التواصل النهائي) ---
export function ContactSection() {
  return (
    <section className="mt-40 max-w-4xl mx-auto px-6 mb-20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="space-y-3">
          <label className="text-[10px] font-black text-[#003366]/40 uppercase tracking-[0.3em] ml-6">From_Name</label>
          <input 
            type="text" 
            placeholder="Enter_Identity"
            className="w-full p-8 bg-white border border-slate-100 rounded-[2.5rem] outline-none focus:border-[#E63946] transition-all font-bold text-[#003366] placeholder:text-slate-200"
          />
        </div>
        <div className="space-y-3">
          <label className="text-[10px] font-black text-[#003366]/40 uppercase tracking-[0.3em] ml-6">Reply_To</label>
          <input 
            type="email" 
            placeholder="Protocol@email.com"
            className="w-full p-8 bg-white border border-slate-100 rounded-[2.5rem] outline-none focus:border-[#E63946] transition-all font-bold text-[#003366] placeholder:text-slate-200"
          />
        </div>
      </div>
      <div className="mb-10 space-y-3">
        <label className="text-[10px] font-black text-[#003366]/40 uppercase tracking-[0.3em] ml-6">Coaching_Type</label>
        <input 
          type="text" 
          placeholder="EXECUTIVE / STRATEGIC / PERFORMANCE"
          className="w-full p-8 bg-white border border-slate-100 rounded-[2.5rem] outline-none focus:border-[#E63946] transition-all font-bold text-[#003366] placeholder:text-slate-200"
        />
      </div>
      
      <motion.button 
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full py-9 bg-[#003366] text-white rounded-[2.5rem] flex items-center justify-center gap-4 shadow-2xl transition-all group"
      >
        <span className="font-black uppercase tracking-[0.5em] text-xs md:text-sm">Initiate_Protocol</span>
        <Send size={18} className="group-hover:translate-x-2 group-hover:-translate-y-1 transition-transform" />
      </motion.button>
    </section>
  );
}