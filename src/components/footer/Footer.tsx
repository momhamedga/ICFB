"use client";

import { useActionState, memo } from "react";
import { motion } from "framer-motion";
import { Facebook, Instagram, Linkedin, Globe, ShieldCheck, ArrowRight, Loader2, ArrowUp, Zap, Cpu, Terminal, Fingerprint, Activity } from "lucide-react";
import Image from "next/image";
import { subscribeAction } from "@/app/actions/newsletter";

export default function UltraFooter() {
  const [state, formAction, isPending] = useActionState(subscribeAction, null);
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="relative bg-[#001b3a] pt-24 pb-10 overflow-hidden selection:bg-red-600/30">
      
      {/* 🌌 Cinematic Background System */}
      <div className="absolute inset-0 z-0">
        {/* Deep Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_50%_-20%,_rgba(220,38,38,0.15)_0%,_transparent_50%)]" />
        
        {/* Dynamic Grid */}
        <div className="absolute inset-0 opacity-[0.07] [mask-image:radial-gradient(ellipse_at_center,black,transparent_80%)]" 
             style={{ backgroundImage: `linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)`, backgroundSize: '50px 50px' }} />
        
        {/* Cinematic Grain/Noise */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      </div>

      <div className="container mx-auto max-w-7xl px-6 relative z-10">
        
        {/* 🚀 Top Section: The Vision Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-12 mb-24">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <div className="flex items-center gap-3 text-red-500 mb-6">
              <Cpu size={18} className="animate-spin-slow" />
              <span className="text-[10px] font-black uppercase tracking-[0.5em]">Neural_Core_Active</span>
            </div>
            <h2 className="text-6xl md:text-[10rem] font-black text-white leading-[0.75] tracking-[-0.08em] uppercase italic">
              Level_ <br /> <span className="text-red-600 not-italic">Infinite<span className="text-white/10">_</span></span>
            </h2>
          </motion.div>

          {/* Minimalist Newsletter Terminal */}
          <div className="w-full lg:w-96 space-y-6">
            <div className="flex items-center gap-2 text-zinc-500 font-mono text-[9px] uppercase tracking-widest">
              <Terminal size={12} /> Executing: Newsletter_Sync
            </div>
            <form action={formAction} className="relative group">
              <input 
                name="email" type="email" required placeholder="User@Terminal_Identity..."
                className="w-full bg-white/[0.03] border border-white/10 rounded-xl py-6 px-8 text-white focus:outline-none focus:border-red-600/40 transition-all font-mono text-[10px] backdrop-blur-3xl"
              />
              <button 
                disabled={isPending}
                className="absolute right-3 top-3 bottom-3 aspect-square bg-red-600 text-white rounded-lg flex items-center justify-center hover:bg-red-500 transition-all active:scale-90"
              >
                {isPending ? <Loader2 className="animate-spin" size={16}/> : <Fingerprint size={18} />}
              </button>
            </form>
          </div>
        </div>

        {/* 🔗 The "Action Hub" - بديل اللينكات التقليدية */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-24">
          <ActionTile icon={Activity} label="Live_System_Metrics" value="99.9%" color="text-emerald-500" />
          <ActionTile icon={Globe} label="Global_Nodes" value="12" color="text-blue-500" />
          <ActionTile icon={ShieldCheck} label="Security_Level" value="Tier_A" color="text-red-600" />
          <ActionTile icon={Zap} label="Response_Time" value="14ms" color="text-amber-500" />
        </div>

        {/* 🏁 Footer Terminal Status Bar */}
        <div className="pt-10 border-t border-white/[0.05] flex flex-col md:flex-row items-center justify-between gap-12">
          
          {/* Identity & Socials */}
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="relative group">
                <Image src="/images/icfb-logo.webp" alt="ICFB" width={60} height={60} className="grayscale brightness-200 opacity-20 group-hover:opacity-100 transition-all duration-700" />
                <div className="absolute inset-0 bg-red-600/20 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity rounded-full" />
            </div>
            
            <div className="flex gap-8">
              <SocialIcon Icon={Facebook} />
              <SocialIcon Icon={Instagram} />
              <SocialIcon Icon={Linkedin} />
            </div>
          </div>

          {/* System Return Control */}
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={scrollToTop}
            className="group relative flex items-center justify-center w-full md:w-20 h-20 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-red-600/30 transition-all duration-500"
          >
            <ArrowUp size={24} className="text-zinc-500 group-hover:text-red-600 transition-colors z-10" />
            <div className="absolute inset-0 bg-gradient-to-t from-red-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-[inherit]" />
          </motion.button>

        </div>

        {/* Floating System Version (Cinematic Detail) */}
        <div className="mt-12 text-center">
            <span className="text-white/[0.03] text-[12vw] font-black pointer-events-none select-none tracking-tighter">ICFB_2026</span>
        </div>
      </div>
    </footer>
  );
}

// مكون الـ Action Tiles المودرن
const ActionTile = ({ icon: Icon, label, value, color }: { icon: any, label: string, value: string, color: string }) => (
  <motion.div 
    whileHover={{ y: -10, backgroundColor: "rgba(255,255,255,0.05)" }}
    className="p-6 md:p-8 bg-white/[0.02] border border-white/5 rounded-[2rem] flex flex-col items-center gap-4 transition-all duration-500 group"
  >
    <div className={`p-4 rounded-2xl bg-zinc-900/50 ${color} transition-transform group-hover:scale-110`}>
      <Icon size={24} strokeWidth={1.5} />
    </div>
    <div className="text-center">
      <div className="text-white text-xl md:text-2xl font-black italic tracking-tighter">{value}</div>
      <div className="text-zinc-600 text-[8px] font-black uppercase tracking-[0.3em] mt-1">{label}</div>
    </div>
  </motion.div>
);

const SocialIcon = ({ Icon }: { Icon: any }) => (
    <a href="#" className="text-zinc-600 hover:text-white transition-colors">
        <Icon size={18} strokeWidth={1.5} />
    </a>
);