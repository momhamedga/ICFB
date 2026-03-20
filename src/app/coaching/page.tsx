"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Briefcase, HeartPulse, Target, Users, Globe, 
  Stethoscope, Sparkles, User, GraduationCap,
  DollarSign
} from "lucide-react";

// استدعاء المكون المنفصل
import BookingForm from "@/components/BookingForm";

type CoachingTab = "overview" | "coaches" | "booking";
const COACHING_SERVICES = [
  { label: "Business", icon: Briefcase }, // لاحظ مفيش أقواس < />
  { label: "Financial", icon: DollarSign },
];
export default function CoachingPage() {
  const [activeTab, setActiveTab] = useState<CoachingTab>("overview");

  return (
    <main className="min-h-screen bg-[#FDFDFD] pb-20 selection:bg-red-100">
      
      {/* --- Modern Creative Hero --- */}
      <section className="relative h-[40vh] md:h-[50vh] flex items-center justify-center overflow-hidden bg-[#003366]">
        <div className="absolute inset-0">
          <motion.div 
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: [0, 90, 0],
              opacity: [0.3, 0.5, 0.3] 
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute -top-20 -left-20 w-96 h-96 bg-[#E63946] rounded-full blur-[120px]" 
          />
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20" />
        </div>

        <div className="relative z-10 text-center px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white/80 text-xs font-bold uppercase tracking-[0.3em] mb-6"
          >
            <Sparkles size={14} className="text-[#E63946]" /> Empowering Your Journey
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-white text-6xl md:text-8xl font-black tracking-tighter uppercase leading-none"
          >
            Coach<span className="text-[#E63946]">ing</span>
          </motion.h1>
          <motion.p className="text-white/60 mt-4 font-medium tracking-[0.5em] uppercase text-sm">
            Maximising Potential
          </motion.p>
        </div>
      </section>

      {/* --- Content Hub --- */}
      <div className="max-w-6xl mx-auto px-4 -mt-16 relative z-20">
        
        {/* Floating Glass Tabs */}
        <div className="flex flex-col md:flex-row gap-3 p-3 bg-white/90 backdrop-blur-2xl rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-white/40">
          <TabButton 
            label="Overview" 
            isActive={activeTab === "overview"} 
            onClick={() => setActiveTab("overview")}
            activeClass="bg-[#003366] text-white shadow-lg shadow-blue-900/20"
          />
          <TabButton 
            label="Our Coaches" 
            isActive={activeTab === "coaches"} 
            onClick={() => setActiveTab("coaches")}
            activeClass="bg-[#E63946] text-white shadow-lg shadow-red-900/20"
          />
          <TabButton 
            label="Book Now" 
            isActive={activeTab === "booking"} 
            onClick={() => setActiveTab("booking")}
            activeClass="bg-[#E63946] text-white shadow-lg shadow-red-900/20"
          />
        </div>

        {/* --- Main Content Body --- */}
        <div className="mt-16">
          <AnimatePresence mode="wait">
            {activeTab === "overview" && <OverviewSection key="overview" />}
            {activeTab === "coaches" && <CoachesGrid key="coaches" />}
            {activeTab === "booking" && <BookingForm key="booking" />}
          </AnimatePresence>
        </div>
      </div>
    </main>
  );
}

// --- Component: Overview Section ---
function OverviewSection() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
      className="space-y-20"
    >
      <div className="bg-white p-10 md:p-16 rounded-[3rem] shadow-sm border border-gray-100 relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-32 h-32 bg-gray-50 rounded-bl-full -mr-10 -mt-10 group-hover:bg-red-50 transition-colors" />
        <p className="text-[#003366] font-black text-2xl md:text-3xl leading-snug max-w-4xl relative z-10">
          Coaching is a partnership in a thought-provoking process that inspires clients to <span className="text-[#E63946] underline decoration-4 underline-offset-8">maximise potential</span>."
        </p>
        <div className="mt-12 flex items-center gap-6">
           <div className="h-[2px] w-20 bg-[#E63946]" />
           <div className="flex items-baseline gap-2">
              <span className="text-4xl font-black text-[#003366]">88%</span>
              <span className="text-xs font-bold text-gray-400 uppercase tracking-widest leading-none">Productivity Boost <br/> with Coaching</span>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-8">
        {[
          { icon: <Briefcase />, label: "Executive" },
          { icon: <Stethoscope />, label: "Emergency" },
          { icon: <Target />, label: "Career" },
          { icon: <HeartPulse />, label: "Wellbeing" },
          { icon: <Users />, label: "Group" },
          { icon: <Globe />, label: "Team" },
        ].map((s, i) => (
          <motion.div whileHover={{ y: -10 }} key={i} className="p-8 bg-white rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-xl transition-all flex flex-col items-center gap-4 group">
            <div className="w-16 h-16 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-[#003366] group-hover:text-white transition-all">
              {React.cloneElement(s.icon as React.ReactElement, { size: 28 })}
            </div>
            <span className="font-black uppercase text-xs tracking-widest text-gray-500 group-hover:text-[#003366]">{s.label} Coaching</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

// --- Component: Coaches Grid (Modernized) ---
function CoachesGrid() {
  const coaches = [
    { name: "Judith Barton", role: "Executive Coach", icon: <User /> },
    { name: "Global Expert", role: "Mentor Supervisor", icon: <GraduationCap /> },
    { name: "Team Lead", role: "Business Strategist", icon: <Briefcase /> },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="grid md:grid-cols-3 gap-8"
    >
      {COACHING_SERVICES.map((s, i) => {
  const Icon = s.icon; // بنحول الـ Reference لمكون (Capital Letter)
  return (
    <div key={i} className="group">
      <div className="w-16 h-16 rounded-2xl bg-gray-50 flex items-center justify-center">
        {/* نمرر الخصائص مباشرة كأنها Component عادي */}
        <Icon size={28} className="group-hover:text-white transition-all" />
      </div>
      <span>{s.label} Coaching</span>
    </div>
  );
})}
    </motion.div>
  );
}

// --- Helper: Tab Button ---
function TabButton({ label, isActive, onClick, activeClass }: any) {
  return (
    <button 
      onClick={onClick}
      className={`flex-1 py-6 rounded-[2rem] text-sm md:text-lg font-black uppercase tracking-tighter transition-all duration-300 ${
        isActive ? activeClass : "text-gray-400 hover:text-[#003366] hover:bg-gray-50"
      }`}
    >
      {label}
    </button>
  );
}