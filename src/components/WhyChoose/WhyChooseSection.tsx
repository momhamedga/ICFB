"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ShieldCheck, Cpu, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { BenefitItem } from "./BenefitItem";
import GyroscopeWrapper from "../ui/GyroscopeWrapper";

const benefits = [
  "Develop Highly Effective Coaches",
  "Mentors Through High-Quality Coaching",
  "Mentoring Accredited Programmes",
  "Support Continual Professional Development",
  "Increase Global Recognition"
];

export default function WhyChooseSection() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // تأثير Parallax بسيط للصور في الديسكتوب يختفي في الموبايل للأداء
  const yImage = useTransform(scrollYProgress, [0, 1], [0, -50]);

  return (
    <section ref={containerRef} className="relative py-24 md:py-40 px-6 bg-white overflow-hidden selection:bg-red-600 selection:text-white">
      
      {/* Background Elements - Ultra Minimal */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#002a54]/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-red-600/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="container mx-auto max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-16 md:gap-24 items-center">
          
          {/* Left: Visual Architecture */}
          <motion.div className="relative order-2 lg:order-1">
            <motion.div 
              style={{ y: typeof window !== 'undefined' && window.innerWidth > 768 ? yImage : 0 }}
              className="relative z-10 rounded-[3rem] overflow-hidden bg-[#002a54] shadow-[0_40px_100px_-20px_rgba(0,42,84,0.25)] group"
            >
              <Image 
                src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2070" 
                alt="Academy Excellence"
                width={800}
                height={1000}
                className="object-cover h-[500px] md:h-[650px] w-full transition-transform duration-[3s] group-hover:scale-105 opacity-90 group-hover:opacity-100"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#002a54]/80 via-transparent to-transparent opacity-60" />
            </motion.div>

            {/* Floating Experience Badge - Mobile Optimized */}
            <GyroscopeWrapper>
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              className="absolute -left-4 -top-8 md:-left-12 md:top-20 z-20 bg-white p-6 md:p-8 rounded-[2.5rem] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] border border-zinc-100 flex flex-col items-center justify-center min-w-[130px] md:min-w-[160px]"
            >
              <div className="flex items-baseline gap-1">
                <span className="text-5xl md:text-6xl font-black text-[#002a54] tracking-tighter">5</span>
                <span className="text-2xl font-black text-red-600">+</span>
              </div>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 mt-2 text-center leading-none">
                Years of <br /> Excellence
              </p>
            </motion.div>
</GyroscopeWrapper>
            {/* Global Badge - Small Screen Safe */}
            <div className="absolute -right-2 md:-right-8 bottom-10 z-20 bg-[#002a54] text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-4 border border-white/10">
              <div className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center animate-pulse">
                <ShieldCheck size={16} />
              </div>
              <span className="text-[11px] font-black tracking-widest uppercase">UK_Standard_Accredited</span>
            </div>
          </motion.div>

          {/* Right: Typography & Strategy */}
          <div className="flex flex-col order-1 lg:order-2">
            <header className="space-y-6 md:space-y-8">
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="flex items-center gap-4"
              >
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-100 border border-zinc-200">
                  <Sparkles size={14} className="text-red-600" />
                  <span className="text-zinc-900 font-black text-[9px] uppercase tracking-[0.3em]">Elite_Education_v2</span>
                </div>
              </motion.div>
              
              <h2 className="text-6xl md:text-8xl font-black text-[#002a54] leading-[0.85] tracking-[-0.06em] italic uppercase">
                Why Choose <br />
                <span className="text-red-600 not-italic">Our Legacy<span className="text-[#002a54]">?</span></span>
              </h2>
              
              <p className="text-zinc-500 font-medium leading-relaxed text-lg md:text-xl max-w-xl">
                The <span className="text-[#002a54] font-bold">ICFB</span> is a global pioneer. We merge British academic rigor with high-performance coaching protocols.
              </p>
            </header>

            {/* Benefits Grid - Optimized for Mobile Scrolling */}
            <div className="grid grid-cols-1 gap-3 mt-12 mb-16">
              {benefits.map((benefit, index) => (
                <BenefitItem key={index} text={benefit} index={index} />
              ))}
            </div>

            {/* Premium CTA - UX Focused */}
            <motion.div
              whileHover={{ x: 5 }}
              whileTap={{ scale: 0.98 }}
              className="inline-block"
            >
              <Link href="/about" className="group relative flex items-center justify-between bg-[#002a54] text-white px-8 py-6 rounded-[2rem] overflow-hidden transition-all duration-500 hover:bg-red-600 shadow-[0_20px_40px_-10px_rgba(0,42,84,0.3)]">
                <span className="relative z-10 font-black text-sm uppercase tracking-[0.2em]">Discover Our History</span>
                <div className="relative z-10 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-red-600 transition-all duration-500">
                  <ArrowRight size={20} />
                </div>
                {/* Glossy Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:animate-shine transition-transform" />
              </Link>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}