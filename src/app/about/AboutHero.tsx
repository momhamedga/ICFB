"use client";
import { motion } from "framer-motion";
import { Sparkles, Shield, Cpu } from "lucide-react";

export default function AboutHero() {
    return (
        <section className="relative h-[65vh] md:h-[75vh] flex items-center justify-center overflow-hidden bg-[#003366]">
            {/* Background Animations */}
            <div className="absolute inset-0">
                <motion.div 
                    animate={{ 
                        scale: [1, 1.2, 1],
                        opacity: [0.2, 0.4, 0.2],
                        x: [0, 50, 0]
                    }}
                    transition={{ duration: 15, repeat: Infinity }}
                    className="absolute -top-20 -right-20 w-[500px] h-[500px] bg-[#E63946] rounded-full blur-[140px]" 
                />
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
            </div>

            <div className="relative z-10 text-center px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-white/5 backdrop-blur-2xl border border-white/10 text-[#E63946] text-[10px] font-black uppercase tracking-[0.5em] mb-10"
                >
                    <Cpu size={14} className="animate-pulse" /> 
                    Legacy of Innovation
                </motion.div>

                <motion.h1 
                    initial={{ opacity: 0, filter: "blur(20px)" }}
                    animate={{ opacity: 1, filter: "blur(0px)" }}
                    transition={{ duration: 1 }}
                    className="text-white text-7xl md:text-[11rem] font-black tracking-[ -0.05em] uppercase leading-[0.85]"
                >
                    ABO<span className="text-[#E63946]">UT</span>
                </motion.h1>

                <div className="mt-8 flex flex-col md:flex-row items-center justify-center gap-6">
                    <motion.p 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.5 }}
                        className="text-white font-bold tracking-[0.8em] uppercase text-[10px]"
                    >
                        Institutional Architects
                    </motion.p>
                    <div className="h-[1px] w-12 bg-[#E63946]/50 hidden md:block" />
                    <span className="text-white/40 text-[10px] font-black uppercase tracking-widest italic">Est. 2026</span>
                </div>
            </div>
        </section>
    );
}