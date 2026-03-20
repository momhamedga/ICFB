"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  CheckCircle2, 
  Info, 
  ArrowUpRight, 
  Target, 
  Layers,
  Zap,
  Users,
  Monitor,
  Trophy,
  Sparkles
} from "lucide-react";

// --- Types ---
type ActiveTab = "services" | "mentoring";

// --- Data ---
const SERVICES_LIST = [
  "Coaching Consultancy", "Team Building Activities",
  "Creating a Coaching Culture", "Leadership Development",
  "Team Away Days", "Mentoring Schemes Setup",
  "Group Coaching Sessions", "Team Coaching Sessions",
  "Group Supervision", "Executive 1-to-1 Coaching",
  "Organisation Development", "Change Management", "Assessments"
];

const MENTORING_BENEFITS = [
  "Market analysis & client potential",
  "Bringing your coaching business 'alive'",
  "Insights from founder Judith Barton",
  "Turning ideas into effective action",
  "Peer-group approach testing"
];

export default function ServicesPage() {
  const [activeTab, setActiveTab] = useState<ActiveTab>("services");

  return (
    <main className="min-h-screen bg-[#FDFDFD] pb-32 selection:bg-red-100 overflow-hidden">
      
      {/* --- الهيرو المطابق للهوية البصرية (Master Hero) --- */}
      <section className="relative h-[45vh] md:h-[55vh] flex items-center justify-center overflow-hidden bg-[#003366]">
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
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white/80 text-[10px] font-bold uppercase tracking-[0.4em] mb-8"
          >
            <Sparkles size={14} className="text-[#E63946]" /> 
            Professional Evolution
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-white text-7xl md:text-[9rem] font-black tracking-tighter uppercase leading-none"
          >
            Serv<span className="text-[#E63946]">ices</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            className="text-white mt-6 font-medium tracking-[0.6em] uppercase text-xs"
          >
            Institutional Architects
          </motion.p>
        </div>
      </section>

      {/* --- Tab Switcher (Modern Glassmorphism) --- */}
      <div className="max-w-2xl mx-auto px-4 -mt-10 relative z-30 mb-20">
        <div className="flex p-2 bg-[#001429]/90 backdrop-blur-2xl rounded-[2.5rem] shadow-2xl border border-white/10">
          <TabTrigger 
            label="Corporate Services" 
            isActive={activeTab === "services"} 
            onClick={() => setActiveTab("services")} 
          />
          <TabTrigger 
            label="Business Mentoring" 
            isActive={activeTab === "mentoring"} 
            onClick={() => setActiveTab("mentoring")} 
          />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            {activeTab === "services" ? (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                {/* Left Info Column */}
                <div className="lg:col-span-4 space-y-6">
                  <div className="p-10 bg-white rounded-[3.5rem] border border-gray-100 shadow-[0_20px_60px_rgba(0,0,0,0.03)] relative overflow-hidden group">
                    <Target size={120} className="absolute -top-10 -right-10 opacity-[0.03] group-hover:rotate-12 transition-transform duration-700" />
                    <h3 className="text-3xl font-black text-[#003366] mb-6 leading-tight uppercase tracking-tighter">
                      Core <br/><span className="text-[#E63946]">Expertise.</span>
                    </h3>
                    <p className="text-gray-500 font-bold leading-relaxed text-sm">
                      Tailoring in-house coaching and mentoring programmes for organisations and providing executive one-to-one coaching for leaders.
                    </p>
                  </div>
                  
                  <motion.div 
                    whileHover={{ scale: 1.02 }}
                    className="p-8 bg-[#E63946] rounded-[2.8rem] text-white shadow-xl shadow-red-900/20 flex items-center gap-6"
                  >
                    <div className="p-4 bg-white/20 rounded-2xl backdrop-blur-md">
                      <Trophy size={28} />
                    </div>
                    <p className="font-black text-[10px] uppercase leading-tight tracking-[0.2em]">
                      Embedding a high-performance <br/> coaching culture.
                    </p>
                  </motion.div>
                </div>

                {/* Services Grid */}
                <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                  {SERVICES_LIST.map((service, idx) => (
                    <ServiceCard key={idx} title={service} index={idx + 1} />
                  ))}
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                {/* Mentoring Content */}
                <div className="lg:col-span-5 space-y-10">
                  <div className="relative">
                    <span className="text-[120px] font-black text-gray-100 absolute -top-16 -left-4 select-none leading-none">03</span>
                    <h2 className="text-6xl font-black text-[#003366] relative z-10 leading-[0.9] tracking-tighter uppercase">
                      Mentoring <br /><span className="text-[#E63946]">Group.</span>
                    </h2>
                  </div>
                  
                  <p className="text-xl font-bold text-gray-600 leading-snug italic border-l-[6px] border-[#E63946] pl-8">
                    Critically examine your coaching product, develop your pitch, and build your online marketplace profile.
                  </p>

                  <div className="p-10 bg-[#001429] rounded-[3.5rem] text-white/90 border border-white/5 shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-[#E63946]/10 blur-[50px]" />
                    <h4 className="flex items-center gap-3 font-black uppercase tracking-[0.3em] text-[10px] text-[#E63946] mb-8">
                      <Info size={16} /> Program Logistics
                    </h4>
                    <ul className="space-y-5">
                      {["Interactive (3x 2.5hr modules)", "Product & Positioning Focus", "Online 2-way audio/vision", "Small group peer-testing"].map((item, i) => (
                        <li key={i} className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-white/70">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#E63946]" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Benefits List */}
                <div className="lg:col-span-7 grid gap-4">
                  {MENTORING_BENEFITS.map((benefit, i) => (
                    <motion.div 
                      key={i}
                      whileHover={{ x: 10, backgroundColor: "#fff" }}
                      className="group p-8 bg-white/40 backdrop-blur-sm rounded-[2.5rem] border border-gray-100 hover:border-[#E63946]/20 transition-all flex items-center justify-between shadow-sm hover:shadow-xl"
                    >
                      <div className="flex items-center gap-8">
                        <div className="w-14 h-14 rounded-2xl bg-white shadow-sm flex items-center justify-center text-[#003366] group-hover:bg-[#E63946] group-hover:text-white transition-all group-hover:rotate-6">
                          <CheckCircle2 size={24} />
                        </div>
                        <span className="text-lg font-black text-[#003366]/80 group-hover:text-[#003366] transition-colors tracking-tight uppercase">
                          {benefit}
                        </span>
                      </div>
                      <ArrowUpRight className="text-gray-300 group-hover:text-[#E63946] transition-all" />
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </main>
  );
}

// --- المكونات الفرعية المحسنة ---

function ServiceCard({ title, index }: { title: string; index: number }) {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="p-8 bg-white rounded-[2.8rem] border border-gray-100 shadow-[0_10px_30px_rgba(0,0,0,0.02)] hover:shadow-2xl transition-all group relative overflow-hidden"
    >
      <div className="flex justify-between items-start mb-6">
        <span className="text-[10px] font-black text-[#E63946]/40 tracking-widest">
          {index.toString().padStart(2, '0')}
        </span>
        <div className="p-3 rounded-2xl bg-gray-50 text-[#003366]/20 group-hover:bg-[#E63946]/10 group-hover:text-[#E63946] transition-all group-hover:scale-110">
          <Layers size={18} />
        </div>
      </div>
      <h4 className="text-[15px] font-black text-[#003366]/90 group-hover:text-[#E63946] transition-colors leading-tight uppercase tracking-tight">
        {title}
      </h4>
    </motion.div>
  );
}

function TabTrigger({ label, isActive, onClick }: any) {
  return (
    <button 
      onClick={onClick}
      className={`relative flex-1 py-5 rounded-[2rem] text-[10px] font-black uppercase tracking-[0.3em] transition-all duration-500 ${
        isActive ? "text-white" : "text-white/30 hover:text-white/50"
      }`}
    >
      {isActive && (
        <motion.div 
          layoutId="tabGlow"
          className="absolute inset-0 bg-[#E63946] rounded-[2rem] shadow-[0_10px_25px_rgba(230,57,70,0.4)]"
          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
        />
      )}
      <span className="relative z-10">{label}</span>
    </button>
  );
}