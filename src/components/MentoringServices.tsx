"use client";

import { motion } from "framer-motion";
import { 
  GraduationCap, Award, Brain, Target, 
  UserCircle, Rocket, HeartPulse, Users2, 
  Flag, LayoutDashboard, Share2
} from "lucide-react";

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
    <section className="relative py-32 px-6 bg-[#002a54] overflow-hidden">
      {/* 1. طبقة الـ Mesh Gradient - الروح الجديدة للخلفية */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#d32f2f]/20 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-600/20 blur-[120px] rounded-full" />
      </div>

      {/* 2. طبقة الشبكة الهندسية (Grid Pattern) لتعزيز الـ UI Modern */}
      <div 
        className="absolute inset-0 z-0 opacity-[0.05]" 
        style={{ backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`, backgroundSize: '50px 50px' }}
      />

      <div className="container mx-auto max-w-6xl relative z-10">
        {/* Header Section */}
        <div className="text-center mb-20">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-rose-400 font-black text-sm uppercase tracking-[0.5em] mb-4 block"
          >
            #Mentoring
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="text-4xl md:text-7xl font-black text-white tracking-tighter"
          >
            #Homeofcoaching <span className="text-rose-500 italic">#coachingworks</span>
          </motion.h2>
        </div>

        {/* The Glass Matrix Container - تطوير الـ Glass Effect */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="relative p-[1px] bg-gradient-to-b from-white/20 via-white/5 to-transparent rounded-[40px] shadow-[0_20px_50px_rgba(0,0,0,0.3)]"
        >
          {/* الطبقة الزجاجية الأساسية */}
          <div className="bg-[#001b3a]/60 backdrop-blur-[20px] rounded-[39px] p-8 md:p-20 border border-white/5 relative overflow-hidden">
            
            {/* إضاءة داخلية خفيفة تتحرك خلف الأيقونات */}
            <motion.div 
              animate={{ 
                x: [0, 100, 0], 
                y: [0, 50, 0] 
              }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              className="absolute top-0 left-0 w-64 h-64 bg-blue-500/10 blur-[80px] -z-10"
            />

            <div className="grid grid-cols-2 md:grid-cols-4 gap-y-16 gap-x-12">
              {services.map((item, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -10 }}
                  className="flex flex-col items-center group cursor-pointer"
                >
                  {/* Icon Container - تطوير الـ Glow */}
                  <div className="relative w-24 h-24 mb-6 flex items-center justify-center">
                    <div className="absolute inset-0 bg-white/5 rounded-[2rem] border border-white/10 group-hover:scale-110 group-hover:bg-white group-hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] transition-all duration-500" />
                    
                    <item.icon className="relative z-10 w-10 h-10 text-white group-hover:text-[#002a54] transition-colors duration-500" />
                    
                    {/* Ring Effect on Hover */}
                    <div className="absolute inset-[-4px] border border-rose-500/0 group-hover:border-rose-500/40 rounded-[2.2rem] transition-all duration-500 scale-90 group-hover:scale-100" />
                  </div>
                  
                  {/* Title */}
                  <h3 className="text-zinc-400 font-black text-[10px] md:text-xs uppercase tracking-[0.2em] text-center group-hover:text-white transition-colors">
                    {item.title}
                  </h3>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}