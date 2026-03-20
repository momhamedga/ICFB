"use client";

import { motion } from "framer-motion";
import { 
  GraduationCap, Award, Brain, Target, 
  UserCircle, Rocket, HeartPulse, Users2, 
  Flag, LayoutDashboard, Share2
} from "lucide-react";
import { ServiceIcon } from "./ServiceIcon";

const services = [
  { icon: GraduationCap, title: "Qualifications" },
  { icon: Award, title: "CPD & Certifications" },
  { icon: Brain, title: "Coaching Skills" },
  { icon: Target, title: "Consultancy" },
  { icon: UserCircle, title: "Executive Coaching" },
  { icon: Rocket, title: "Career Coaching" },
  { icon: HeartPulse, title: "Wellbeing Coaching" },
  { icon: Users2, title: "Coaching Supervision" },
  { icon: Flag, title: "Leadership Training" },
  { icon: LayoutDashboard, title: "Organisational Dev" },
  { icon: Share2, title: "Group Coaching" },
  { icon: Target, title: "Team Coaching" }
];

export default function MentoringServices() {
  return (
    <section className="relative py-24 md:py-40 px-6 bg-[#001b3a]/98 overflow-hidden selection:bg-rose-500 selection:text-white">
      
      {/* 🌌 Cinematic Mesh Background v2 */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.3, 0.2] 
          }}
          transition={{ duration: 15, repeat: Infinity }}
          className="absolute -top-[20%] -left-[10%] w-[70%] h-[70%] bg-[#d32f2f]/10 blur-[150px] rounded-full" 
        />
        <div className="absolute -bottom-[20%] -right-[10%] w-[60%] h-[60%] bg-blue-600/10 blur-[150px] rounded-full" />
      </div>

      {/* 📏 Modern Engineering Grid */}
      <div 
        className="absolute inset-0 z-0 opacity-[0.07]" 
        style={{ 
          backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`, 
          backgroundSize: '60px 60px' 
        }}
      />

      <div className="container mx-auto max-w-7xl relative z-10">
        
        {/* Header System */}
        <header className="text-center mb-24 md:mb-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="inline-block px-6 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-8"
          >
            <span className="text-rose-400 font-black text-[10px] uppercase tracking-[0.5em]">
              #The_Coaching_Protocol
            </span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-9xl font-black text-white tracking-[-0.06em] leading-[0.9] uppercase italic"
          >
            Home of <br />
            <span className="text-rose-600 not-italic">Coaching.</span>
          </motion.h2>
        </header>

        {/* 🧊 The Matrix Container (Ultra-Modern Glass) */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="relative p-[1px] bg-gradient-to-br from-white/20 via-white/5 to-transparent rounded-[3rem] md:rounded-[5rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)]"
        >
          <div className="bg-[#001b3a]/40 backdrop-blur-[40px] rounded-[2.9rem] md:rounded-[4.9rem] p-10 md:p-24 border border-white/5 overflow-hidden">
            
            {/* Dynamic Internal Light Leak */}
            <motion.div 
              animate={{ 
                x: [-100, 100, -100], 
                y: [-50, 50, -50] 
              }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute top-0 left-0 w-[500px] h-[500px] bg-blue-500/10 blur-[120px] -z-10 pointer-events-none"
            />

            {/* Grid Architecture - Responsive for Mobile */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-16 md:gap-y-24 gap-x-8 md:gap-x-16">
              {services.map((item, index) => (
                <ServiceIcon key={index} {...item} index={index} />
              ))}
            </div>
          </div>
        </motion.div>

        {/* Cinematic Footer Hint */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-20 text-center"
        >
          <p className="text-white/20 font-black text-[10px] uppercase tracking-[0.8em]">
            Precision_Engineered_Coaching
          </p>
        </motion.div>
      </div>
    </section>
  );
}