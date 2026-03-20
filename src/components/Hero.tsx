"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Play, ArrowRight } from "lucide-react";
import Image from "next/image";

export default function HeroSection() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 100]);

  return (
    <section className="relative min-h-screen flex items-center pt-32 md:pt-20 overflow-hidden bg-white">
      <div className="absolute inset-0 hex-pattern opacity-40" />
      
      <div className="container mx-auto px-6 md:px-20 z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Content Side */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            <span className="inline-block px-4 py-1.5 bg-rose-50 text-[#d32f2f] text-xs md:text-sm font-black tracking-[0.2em] uppercase rounded-full mb-6">
              ICFB Global Academy
            </span>
            
            <h1 className="text-4xl md:text-7xl font-black text-zinc-900 leading-[1.1] tracking-tighter mb-8">
              International <br className="hidden md:block" /> 
              <span className="text-[#d32f2f] relative inline-block">
                Coaching
                <motion.svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 300 10" fill="none">
                  <motion.path d="M1 9C50 3 150 3 299 9" stroke="#d32f2f" strokeWidth="3" strokeLinecap="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 1, duration: 1 }} />
                </motion.svg>
              </span> <br className="hidden md:block" /> 
              Federation
            </h1>
            
            <p className="text-base md:text-lg text-zinc-500 max-w-lg mx-auto lg:mx-0 mb-10 leading-relaxed font-medium">
              Empowering the next generation of global leaders through elite British coaching standards and internationally recognized certifications.
            </p>

            <div className="flex flex-col sm:flex-row gap-5 items-center justify-center lg:justify-start">
              <button className="w-full sm:w-auto group relative bg-[#d32f2f] text-white px-10 py-4 rounded-2xl font-bold text-lg shadow-xl shadow-rose-600/20 hover:scale-105 transition-all flex items-center justify-center gap-3 overflow-hidden">
                <span className="relative z-10">Get Started</span>
                <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              </button>
              
              <button className="flex items-center gap-4 group p-2">
                <div className="w-12 h-12 rounded-full border-2 border-zinc-100 flex items-center justify-center group-hover:border-[#d32f2f] transition-colors relative">
                   <div className="absolute inset-0 rounded-full bg-rose-50 scale-0 group-hover:scale-100 transition-transform" />
                   <Play size={18} className="text-[#d32f2f] relative z-10 fill-[#d32f2f]" />
                </div>
                <span className="font-bold text-zinc-700">Watch Story</span>
              </button>
            </div>
          </motion.div>

          {/* Image Side */}
          <motion.div 
            style={{ y: y1 }}
            className="relative mt-10 lg:mt-0"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
          >
            <div className="absolute -top-10 -right-10 w-48 h-48 md:w-64 md:h-64 bg-rose-50 rounded-full blur-3xl opacity-60" />
            
            <div className="relative z-10 hero-shadow rounded-[30px] md:rounded-[40px] overflow-hidden border-[8px] md:border-[12px] border-white bg-zinc-100">
              <Image 
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop" 
                alt="Strategic Leadership"
                width={700}
                height={800}
                className="object-cover hover:scale-105 transition-transform duration-[2s]"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#d32f2f]/20 to-transparent opacity-60" />
            </div>

            {/* UK Accreditation Label */}
            <motion.div 
              className="absolute -right-6 top-10 glass-card p-3 md:p-4 rounded-xl shadow-2xl z-30 hidden xl:block border-l-4 border-[#d32f2f]"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 md:w-10 md:h-10 bg-rose-100 rounded-full flex items-center justify-center">
                  <span className="text-[#d32f2f] font-bold text-xs">UK</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[9px] md:text-[10px] font-black uppercase tracking-tighter text-zinc-400">Accredited by</span>
                  <span className="text-xs md:text-sm font-bold text-zinc-800">British Standards</span>
                </div>
              </div>
            </motion.div>

            {/* Floating Student Counter */}
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 4 }}
              className="absolute -left-6 bottom-10 glass-card p-4 md:p-6 rounded-2xl shadow-2xl z-20 hidden md:block"
            >
              <div className="flex items-center gap-4">
                <div className="bg-green-500 w-2 h-2 rounded-full animate-pulse" />
                <span className="font-bold text-xs md:text-sm text-zinc-800 text-nowrap">1,200+ Active Students</span>
              </div>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}