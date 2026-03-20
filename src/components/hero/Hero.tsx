"use client";

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Play, Zap, ShieldCheck, Activity } from "lucide-react";
import Image from "next/image";
import { CinematicButton } from "../ui/CinematicCTA";
import { FloatingStatus } from "../ui/FloatingStatus";

export default function CinematicHero() {
  const { scrollY } = useScroll();
  
  // Parallax Effects
  const textY = useTransform(scrollY, [0, 500], [0, 100]);
  const imgScale = useTransform(scrollY, [0, 500], [1, 1.1]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-[#002a54] overflow-hidden selection:bg-red-600/30">
      
      {/* 🌌 Cinematic Background Layer */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,_rgba(220,38,38,0.08)_0%,_transparent_70%)]" />
        <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] pointer-events-none" />
        {/* Animated Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      </div>

      <div className="container mx-auto px-6 relative z-10 mt-20">
        <div className="flex flex-col items-center text-center max-w-5xl mx-auto">
          
          {/* Top Label - Pulse Effect */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3 px-5 py-2 rounded-full bg-white/[0.03] border border-white/5 mb-10 backdrop-blur-md"
          >
            <Activity size={12} className="text-red-600 animate-pulse" />
            <span className="text-[9px] font-black uppercase tracking-[0.5em] text-white/40">ICFB - BRITISH ACADEMY</span>
          </motion.div>

          {/* Headline - Split Text Feel */}
          <motion.div style={{ y: textY, opacity }}>
            <h1 className="text-[3.5rem] md:text-[8.5rem] font-black text-white leading-[0.85] tracking-[-0.05em] mb-10">
              ELITE <br />
              <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-b from-red-500 to-red-800">
                AUTHORITY_
              </span>
            </h1>
          </motion.div>

          {/* Content & Action System */}
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-12 items-end w-full"
          >
            {/* Left: Tactical Description */}
            <div className="text-center md:text-left space-y-6">
              <p className="text-zinc-500 text-sm md:text-lg font-medium leading-relaxed max-w-sm">
                Redefining human potential through British academic rigor and high-performance coaching protocols.
              </p>
              <div className="flex flex-wrap justify-center md:justify-start gap-4 pt-4">
                <CinematicButton primary>Initialize Session</CinematicButton>
                <CinematicButton>View Briefing</CinematicButton>
              </div>
            </div>

            {/* Right: Floating Visual Terminal */}
            <div className="relative group perspective-1000 hidden md:block">
               <motion.div 
                style={{ scale: imgScale }}
                className="relative z-10 aspect-video md:aspect-[16/10] rounded-[3rem] overflow-hidden border border-white/10 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)]"
               >
                 <Image 
                  src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070" 
                  alt="Strategic Leadership" fill className="object-cover grayscale hover:grayscale-0 transition-all duration-1000"
                 />
                 <div className="absolute inset-0 bg-gradient-to-t from-[#00050a] via-transparent to-transparent" />
                 
                 {/* Play Overlay */}
                 <div className="absolute inset-0 flex items-center justify-center group-hover:scale-110 transition-transform duration-700">
                    <div className="w-20 h-20 rounded-full bg-red-600/90 flex items-center justify-center backdrop-blur-md">
                      <Play fill="white" className="text-white ml-1" />
                    </div>
                 </div>
               </motion.div>

               {/* Absolute Floating Elements */}
               <div className="absolute -top-10 -right-10 z-20">
                 <FloatingStatus text="British_Stds" type="info" />
               </div>
               <div className="absolute -bottom-6 -left-10 z-20">
                 <FloatingStatus text="Uk_01_Core" subText="Uplink Success" type="success" delay={1} />
               </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* 📱 Mobile Experience Enhancement */}
      <div className="absolute bottom-10 left-0 w-full flex justify-center md:hidden px-6">
          <div className="w-full h-[1px] bg-white/5 relative">
              <motion.div 
                animate={{ left: ["0%", "100%"] }} 
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="absolute top-0 w-20 h-full bg-red-600 shadow-[0_0_15px_rgba(220,38,38,1)]" 
              />
          </div>
      </div>
    </section>
  );
}