"use client";

import React, { useReducer } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link"; // الـ Hero المفقود هنا
import { 
  Facebook, Instagram, Linkedin, Mail, 
  Phone, ArrowUp, Globe, 
  ShieldCheck, ArrowRight 
} from "lucide-react";
import Image from "next/image";

type State = {
  hoveredLink: string | null;
};

type Action = { type: "SET_HOVER"; payload: string | null };

const footerReducer = (state: State, action: Action): State => {
  return action.type === "SET_HOVER" ? { hoveredLink: action.payload } : state;
};

export default function Footer() {
  const [state, dispatch] = useReducer(footerReducer, { hoveredLink: null });

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="relative bg-[#000810] pt-32 pb-12 overflow-hidden selection:bg-[#E63946]/30 border-t border-white/5">
      
      {/* 🌌 High-Tech Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#E63946]/20 to-transparent" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.03] invert" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* 🚀 Newsletter / CTA */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-24 border-b border-white/5 items-center">
          <div className="lg:col-span-7">
            <h2 className="text-4xl md:text-5xl font-black text-white uppercase italic tracking-tighter leading-none">
              Ready to <span className="text-[#E63946]">architect</span> <br /> your future?
            </h2>
          </div>
          <div className="lg:col-span-5">
            <div className="relative group">
              <input 
                type="email" 
                placeholder="Enter system email..."
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-6 px-8 text-white placeholder:text-zinc-600 focus:outline-none focus:border-[#E63946]/50 transition-all font-mono text-sm"
              />
              <button className="absolute right-3 top-3 bottom-3 px-6 bg-[#E63946] text-white rounded-xl font-black uppercase text-[10px] tracking-widest flex items-center gap-2 hover:bg-[#c32f3a] transition-all">
                Join <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 py-24">
          {/* Brand Identity Block */}
          <div className="lg:col-span-4 space-y-8">
            <Link href="/" className="inline-block transition-transform hover:scale-105">
              <div className="relative w-40 p-4 bg-white/[0.02] border border-white/10 rounded-3xl backdrop-blur-xl">
                <Image 
                  src="/images/icfb-logo.webp" 
                  alt="ICFB Logo" 
                  width={120} height={120} 
                  className="grayscale brightness-200"
                />
              </div>
            </Link>
            
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-[#E63946]">
                <ShieldCheck size={18} />
                <span className="text-[10px] font-black uppercase tracking-[0.3em]">Institutional Standard</span>
              </div>
              <p className="text-zinc-500 text-sm leading-relaxed font-medium max-w-xs">
                Redefining professional excellence through British academic rigor.
              </p>
            </div>
          </div>

          {/* Links System */}
          <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-3 gap-12">
            <FooterGroup 
              title="Architecture" 
              links={[{name: "Home", path: "/"}, {name: "Qualifications", path: "/qualifications"}, {name: "Services", path: "/services"}, {name: "Courses", path: "/courses"}]} 
              dispatch={dispatch}
              hoveredLink={state.hoveredLink}
            />
            <FooterGroup 
              title="Intelligence" 
              links={[{name: "Faqs", path: "/faqs"}, {name: "Privacy", path: "/privacy"}, {name: "Contact", path: "/contact"}, {name: "Portal", path: "/portal"}]} 
              dispatch={dispatch}
              hoveredLink={state.hoveredLink}
            />
            
            <div className="space-y-8">
              <h4 className="text-[#E63946] font-black uppercase tracking-[0.4em] text-[10px]">Connect_Nodes</h4>
              <div className="grid grid-cols-2 gap-3">
                <SocialBtn Icon={Facebook} />
                <SocialBtn Icon={Instagram} />
                <SocialBtn Icon={Linkedin} />
                <SocialBtn Icon={Globe} />
              </div>
              <div className="pt-4 space-y-4">
                <ContactItem icon={Mail} text="ops@icfb.life" />
                <ContactItem icon={Phone} text="+44 20 7946 0958" />
              </div>
            </div>
          </div>
        </div>

        {/* Final Terminal Line */}
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-6">
            <p className="text-zinc-600 text-[9px] font-black uppercase tracking-[0.4em]">
              © 2026 ICFB_SYSTEMS // <span className="text-zinc-800">0.1.4_v</span>
            </p>
          </div>
          
          <motion.button 
            whileHover={{ y: -5 }}
            onClick={scrollToTop}
            className="group flex items-center gap-4 text-zinc-500 hover:text-white transition-all text-[10px] font-black uppercase tracking-[0.3em] outline-none"
          >
            Terminal_Top
            <div className="w-12 h-12 rounded-full border border-white/5 flex items-center justify-center group-hover:border-[#E63946]/50 group-hover:bg-[#E63946]/10 transition-all">
              <ArrowUp size={16} className="group-hover:text-[#E63946]" />
            </div>
          </motion.button>
        </div>
      </div>
    </footer>
  );
}

// --- Sub-components ---

function FooterGroup({ title, links, dispatch, hoveredLink }: any) {
  return (
    <div className="space-y-8">
      <h4 className="text-white/30 font-black uppercase tracking-[0.4em] text-[10px]">{title}</h4>
      <ul className="space-y-4">
        {links.map((link: {name: string, path: string}) => (
          <li key={link.name}>
            <Link 
              href={link.path}
              onMouseEnter={() => dispatch({ type: "SET_HOVER", payload: link.name })}
              onMouseLeave={() => dispatch({ type: "SET_HOVER", payload: null })}
              className="relative text-zinc-500 hover:text-white transition-all duration-300 text-[13px] flex items-center group font-bold uppercase tracking-tighter"
            >
              <AnimatePresence mode="wait">
                {hoveredLink === link.name && (
                  <motion.span 
                    initial={{ width: 0 }} animate={{ width: 12 }} exit={{ width: 0 }}
                    className="h-[2px] bg-[#E63946] mr-2 block"
                  />
                )}
              </AnimatePresence>
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function SocialBtn({ Icon }: any) {
  return (
    <Link href="#" className="h-14 bg-white/[0.02] border border-white/5 flex items-center justify-center text-zinc-600 hover:text-white hover:bg-[#E63946] hover:border-[#E63946] transition-all duration-500 rounded-2xl group">
      <Icon size={18} className="group-hover:scale-110 transition-transform" />
    </Link>
  );
}

function ContactItem({ icon: Icon, text }: any) {
  return (
    <div className="flex items-center gap-4 text-zinc-500 text-xs hover:text-white transition-colors cursor-pointer group">
      <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-[#E63946]/20 group-hover:text-[#E63946]">
        <Icon size={14} />
      </div>
      <span className="font-bold tracking-tight">{text}</span>
    </div>
  );
}