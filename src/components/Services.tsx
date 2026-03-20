"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { MessageSquare, BookOpen, ArrowUpRight, ShieldCheck, Crown } from "lucide-react";
import Link from "next/link";
import React, { ReactNode } from "react";

interface Service {
  title: string;
  description: string;
  icon: ReactNode;
  link: string;
  tag: string;
}

const services: Service[] = [
  {
    title: "Executive Coaching",
    tag: "Level 7 Mastery",
    description: "Tailored leadership evolution for high-performance executives, focusing on strategic impact and psychological resilience.",
    icon: <Crown className="w-7 h-7" />,
    link: "/services/executive-coaching",
  },
  {
    title: "Clinical Supervision",
    tag: "UK Accredited",
    description: "Advanced ethical oversight for practitioners, ensuring rigorous standards of professional integrity and safety.",
    icon: <ShieldCheck className="w-7 h-7" />,
    link: "/services/clinical-supervision",
  },
  {
    title: "CPD Certification",
    tag: "Mastery Path",
    description: "Continuing Professional Development modules recognized by elite British federations for lifelong academic excellence.",
    icon: <BookOpen className="w-7 h-7" />,
    link: "/courses/cpd",
  }
];

const ServiceCard = ({ service, index }: { service: Service; index: number }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function onMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: index * 0.2, ease: [0.21, 0.47, 0.32, 0.98] }}
      onMouseMove={onMouseMove}
      className="group relative h-full"
    >
      {/* Deep Glassmorphism Container */}
      <div className="relative h-full z-10 overflow-hidden rounded-[40px] border border-white/30 bg-white/40 backdrop-blur-3xl p-10 flex flex-col transition-all duration-700 group-hover:border-rose-500/20 group-hover:shadow-[0_40px_80px_-20px_rgba(211,47,47,0.12)]">
        
        {/* Dynamic Spotlight Effect */}
        <motion.div
          className="pointer-events-none absolute -inset-px rounded-[40px] opacity-0 transition duration-500 group-hover:opacity-100"
          style={{
            background: useTransform(
              [mouseX, mouseY],
              ([x, y]) => `radial-gradient(800px circle at ${x}px ${y}px, rgba(211, 47, 47, 0.07), transparent 40%)`
            ),
          }}
        />

        {/* Header Section */}
        <div className="flex justify-between items-start mb-14">
          <div className="w-16 h-12 rounded-2xl bg-gradient-to-br from-[#d32f2f] to-[#8b1a1a] shadow-2xl shadow-rose-900/20 flex items-center justify-center text-white transition-all duration-700 group-hover:-rotate-6 group-hover:scale-110">
            {service.icon}
          </div>
          <span className="px-4 py-1.5 rounded-full bg-white/50 border border-zinc-100 text-[#d32f2f] text-[9px] font-black uppercase tracking-[0.2em]">
            {service.tag}
          </span>
        </div>

        {/* Content Section */}
        <h3 className="text-3xl font-black text-zinc-900 mb-6 leading-none tracking-tighter group-hover:text-[#d32f2f] transition-colors duration-500">
          {service.title}
        </h3>

        <p className="text-zinc-500 leading-relaxed font-medium mb-12 flex-1 text-base antialiased">
          {service.description}
        </p>


      </div>

      {/* Aesthetic Aura */}
      <div className="absolute -inset-2 bg-gradient-to-tr from-rose-50 to-amber-50 rounded-[45px] -z-10 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
    </motion.div>
  );
};

export default function ServicesSection() {
  return (
    <section className="relative py-40 px-6 md:px-20 overflow-hidden bg-transparent">
      <div className="container mx-auto max-w-7xl">
        
        {/* Section Header */}
        <div className="mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="flex items-center gap-3 mb-6"
            >
              <div className="w-12 h-0.5 bg-[#d32f2f]" />
              <span className="text-[#d32f2f] font-black text-xs uppercase tracking-[0.4em]">Elite Standards</span>
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-7xl font-black text-zinc-950 leading-[0.9] tracking-tighter"
            >
              Excellence in <br />
              <span className="text-[#d32f2f]">Professional</span> Directives.
            </motion.h2>
          </div>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-zinc-400 max-w-sm font-semibold text-lg leading-tight"
          >
            Pioneering British coaching methodologies for the global leadership market.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12 relative z-10">
          {services.map((service, index) => (
            <ServiceCard key={index} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}