"use client";

import React, { useReducer, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { Play, CheckCircle2, Trophy, Users, Briefcase, Calendar } from "lucide-react";

// --- Types & Reducer Logic ---
type State = {
  activeProgress: boolean;
  isVideoPlaying: boolean;
};

type Action = 
  | { type: "START_ANIMATION" }
  | { type: "TOGGLE_VIDEO" };

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "START_ANIMATION": return { ...state, activeProgress: true };
    case "TOGGLE_VIDEO": return { ...state, isVideoPlaying: !state.isVideoPlaying };
    default: return state;
  }
};

const SKILLS = [
  { label: "Business Planning", value: 92 },
  { label: "Financial Advices", value: 90 },
  { label: "Investment Strategy", value: 85 },
  { label: "Business Security", value: 95 },
];

const STATS = [
  { icon: <Briefcase className="text-[#E63946]" />, count: "582", label: "Projects completed for our respected clients." },
  { icon: <Users className="text-[#E63946]" />, count: "215+", label: "Experienced professionals serving to clients." },
  { icon: <Calendar className="text-[#E63946]" />, count: "30+", label: "Years experience in business & consulting." },
  { icon: <Trophy className="text-[#E63946]" />, count: "70+", label: "Business & consulting awards won over world." },
];

export default function WhyChooseUs() {
  const [state, dispatch] = useReducer(reducer, { activeProgress: false, isVideoPlaying: false });
  const containerRef = React.useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.3 });

  useEffect(() => {
    if (isInView) dispatch({ type: "START_ANIMATION" });
  }, [isInView]);

  return (
    <section ref={containerRef} className="py-32 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Upper Section: Content & Video */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-32">
          
          {/* Left: Text & Skills */}
          <div className="space-y-10">
            <div className="space-y-6">
              <motion.div initial={{ width: 0 }} animate={isInView ? { width: 50 } : {}} className="h-1 bg-[#E63946]" />
              <h2 className="text-6xl font-black text-[#003366] leading-[0.9] uppercase italic tracking-tighter">
                Why <span className="text-[#E63946]">choose</span> us
              </h2>
              <p className="text-zinc-500 font-medium leading-relaxed max-w-xl">
                We donec pulvinar magna id leoersi pellentesque impered dignissim rhoncus euismod euismod eros vitae. 
                We denounce with righteous indignation and dislike men who are so beguiled.
              </p>
            </div>

            <div className="space-y-8">
              {SKILLS.map((skill, i) => (
                <div key={i} className="space-y-3">
                  <div className="flex justify-between items-end">
                    <span className="text-xs font-black uppercase tracking-widest text-[#003366]">{skill.label}</span>
                    <span className="text-sm font-black text-[#E63946]">{skill.value}%</span>
                  </div>
                  <div className="h-[6px] bg-zinc-100 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={state.activeProgress ? { width: `${skill.value}%` } : {}}
                      transition={{ duration: 1.5, delay: i * 0.1, ease: "circOut" }}
                      className="h-full bg-gradient-to-r from-[#003366] to-[#E63946]"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Interactive Video Component */}
          <div className="relative group">
            <div className="absolute -inset-4 border-2 border-[#E63946]/10 rounded-[4rem] -z-10 rotate-2" />
            <div className="relative h-[550px] rounded-[3.5rem] overflow-hidden shadow-2xl border-4 border-white">
               {/* Image Placeholder based on */}
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1000')] bg-cover bg-center grayscale group-hover:grayscale-0 transition-all duration-700" />
              <div className="absolute inset-0 bg-[#003366]/20 group-hover:bg-transparent transition-all" />
              
              {/* Play Button Triggering useReducer */}
              <motion.button 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => dispatch({ type: "TOGGLE_VIDEO" })}
                className="absolute inset-0 m-auto w-24 h-24 bg-[#E63946] rounded-full flex items-center justify-center text-white shadow-2xl z-20"
              >
                <Play fill="currentColor" size={32} />
              </motion.button>

              {/* Geometric Overlay */}
              <div className="absolute bottom-0 right-0 w-40 h-40 bg-[#E63946] clip-path-polygon z-10" 
                   style={{ clipPath: "polygon(100% 0, 0% 100%, 100% 100%)" }} />
            </div>
          </div>
        </div>

        {/* Lower Section: Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 border-t border-zinc-100 pt-20">
          {STATS.map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="space-y-6 group"
            >
              <div className="p-4 bg-zinc-50 rounded-2xl inline-block group-hover:bg-[#003366] group-hover:text-white transition-all duration-500">
                {React.cloneElement(stat.icon as React.ReactElement, { size: 30, className: "group-hover:text-white transition-colors" })}
              </div>
              <div className="space-y-2">
                <h4 className="text-5xl font-black text-[#003366] tracking-tighter italic">
                  {stat.count}
                </h4>
                <p className="text-zinc-400 text-[11px] font-bold uppercase tracking-widest leading-relaxed">
                  {stat.label}
                </p>
              </div>
              <motion.div className="w-10 h-1 bg-[#E63946] group-hover:w-full transition-all duration-500" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}