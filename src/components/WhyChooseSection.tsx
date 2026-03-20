"use client";

import { motion } from "framer-motion";
import { Check, ArrowRight, ShieldCheck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const benefits = [
  "Develop Highly Effective Coaches",
  "Mentors Through High-Quality Coaching",
  "Mentoring Accredited Programmes",
  "Support Continual Professional Development",
  "Increase Global Recognition"
];

export default function WhyChooseSection() {
  return (
    <section className="relative py-24 px-6 md:px-20 bg-white overflow-hidden">
      {/* Background Accent - لمسة ضوئية خلفية هادئة */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-rose-50/50 rounded-full blur-[100px] -z-10" />
      
      <div className="container mx-auto max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          
          {/* Left Side: Creative Image with Layered Depth */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            {/* الديكور الأحمر خلف الصورة - أسلوب هندسي حديث */}
            <div className="absolute -bottom-4 -left-4 w-2/3 h-2/3 border-b-8 border-l-8 border-[#d32f2f]/20 rounded-bl-[60px] -z-10" />
            
            <div className="relative z-10 rounded-[50px] overflow-hidden border-[12px] border-white shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] group">
              <Image 
                src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2070" 
                alt="Academy Excellence"
                width={600}
                height={700}
                className="object-cover h-[550px] w-full transition-transform duration-[2s] group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-[#d32f2f]/20 to-transparent" />
            </div>

            {/* Floating Experience Badge - Glassmorphism Re-imagined */}
            <motion.div 
              initial={{ x: -20, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="absolute -left-10 top-1/4 z-20 bg-white/70 backdrop-blur-2xl p-6 rounded-[30px] shadow-2xl border border-white/50 flex flex-col items-center justify-center min-w-[140px]"
            >
              <div className="flex items-baseline">
                <span className="text-5xl font-black text-[#d32f2f]">5</span>
                <span className="text-xl font-black text-[#d32f2f]">+</span>
              </div>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 mt-1 leading-tight text-center">
                Years of <br /> Excellence
              </p>
            </motion.div>

            {/* Secondary Badge - Global Standards */}
            <motion.div 
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 4 }}
              className="absolute -right-6 bottom-12 z-20 bg-zinc-900 text-white p-5 rounded-2xl shadow-xl flex items-center gap-3"
            >
              <ShieldCheck className="text-rose-400 w-5 h-5" />
              <span className="text-xs font-bold tracking-wide">UK Standards Accredited</span>
            </motion.div>
          </motion.div>

          {/* Right Side: Content with Typography focus */}
          <div className="flex flex-col">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-[2px] bg-[#d32f2f]" />
                <span className="text-[#d32f2f] font-black text-xs uppercase tracking-[0.3em]">
                  Elite Education
                </span>
              </div>
              
              <h2 className="text-5xl md:text-6xl font-black text-zinc-900 mb-8 leading-[1.05] tracking-tighter">
                Why Choose Our <br />
                <span className="text-[#d32f2f] italic">Legacy?</span>
              </h2>
              
              <p className="text-zinc-500 font-medium leading-relaxed mb-10 text-lg">
                The International Coaching Federation of British (ICFB) is a global pioneer in professional training. We offer ILM-accredited pathways tailored for visionary leaders.
              </p>
            </motion.div>

            {/* Interactive Benefits List */}
            <div className="grid gap-4 mb-12">
              {benefits.map((benefit, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group flex items-center gap-4 p-4 rounded-2xl hover:bg-rose-50 transition-all duration-300 cursor-default"
                >
                  <div className="w-6 h-6 rounded-lg bg-[#d32f2f] flex items-center justify-center rotate-45 group-hover:rotate-0 transition-transform duration-500 shadow-lg shadow-rose-200">
                    <Check className="-rotate-45 group-hover:rotate-0 transition-transform w-3.5 h-3.5 text-white" />
                  </div>
                  <span className="text-zinc-800 font-bold text-sm tracking-tight">
                    {benefit}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* Premium CTA */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link href={`/about`}>
                  <button className="relative overflow-hidden group bg-zinc-900 text-white px-10 py-5 rounded-2xl font-black text-sm uppercase tracking-widest shadow-2xl flex items-center gap-4 transition-all hover:bg-[#d32f2f]">
                <span>Discover Our History</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                {/* Glossy Overlay effect on hover */}
                <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white/10 opacity-40 group-hover:animate-shine" />
              </button>
              </Link>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}