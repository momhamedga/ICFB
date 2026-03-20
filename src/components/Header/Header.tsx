"use client";

import { useHeaderLogic } from "@/hooks/useHeaderLogic";
import { NavLink } from "./NavLink";
import MagneticWrapper from "../ui/MagneticWrapper";
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";
import { Mail, Phone, User, Award, Shield, Menu, X, Sparkles, ArrowRight, Globe, Layers, Zap } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function ICFBHeader() {
  const { scrolled, isOpen, setIsOpen, portalOpen, setPortalOpen, hoveredPath, setHoveredPath, pathname } = useHeaderLogic();
  
  const brandNavy = "#003366";
  const brandRed = "#E63946";

  // Motion values لعمل تأثير السحب للقفل في الموبايل
  const dragY = useMotionValue(0);
  const opacity = useTransform(dragY, [0, 200], [1, 0]);
  const scale = useTransform(dragY, [0, 200], [1, 0.9]);

  const navItems = [
    { name: "Home", href: "/", icon: <Layers size={18}/> },
    { name: "Qualifications", href: "/qualifications", icon: <Award size={18}/> },
    { name: "Coaching", href: "/coaching", icon: <Zap size={18}/> },
    { name: "Services", href: "/services", icon: <Globe size={18}/> },
    { name: "Events", href: "/events", icon: <Sparkles size={18}/> },
    { name: "About", href: "/about", icon: <User size={18}/> },
    { name: "Contact", href: "/contact", icon: <Mail size={18}/> },
  ];

  return (
    <header className="fixed top-0 w-full z-[100] font-sans px-4 md:px-0">
      {/* 1. Desktop Top Bar (يبقى كما هو) */}
      <AnimatePresence>
        {!scrolled && (
          <motion.div 
            initial={{ y: -50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -50, opacity: 0 }}
            className="hidden md:flex bg-white/95 backdrop-blur-md text-[#003366] py-2 px-20 justify-between items-center text-[10px] font-bold uppercase tracking-widest border-b border-[#003366]/5 shadow-sm"
          >
            <div className="flex gap-10">
              <Link href="mailto:info@britishacademy-ss.com" className="flex items-center gap-2 hover:text-[#E63946] transition-colors tracking-[0.2em]">
                <Mail size={12} /> Office Of Admissions
              </Link>
              <Link href="tel:+44123456789" className="flex items-center gap-2 hover:text-[#E63946] transition-colors tracking-[0.2em]">
                <Phone size={12} /> UK HQ Support
              </Link>
            </div>
            <div className="flex items-center gap-2 text-[#E63946] font-black italic animate-pulse">
              <Shield size={12} /> ISO 9001 Certified Academy
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. Main Navigation Bar */}
      <div className="max-w-7xl mx-auto mt-4 md:mt-2 px-2 sm:px-0">
        <nav className={`transition-all duration-500 rounded-[1.8rem] px-5 py-3 flex justify-between items-center 
          ${scrolled 
            ? "bg-[#003366]/90 backdrop-blur-2xl border border-white/10 shadow-2xl" 
            : "bg-white/90 backdrop-blur-xl border border-[#003366]/10 shadow-xl"}`}>
          
          <Link href="/" className="flex items-center gap-3 group">
            <MagneticWrapper>
              <div className="relative w-11 h-11 bg-[#003366] rounded-2xl flex items-center justify-center overflow-hidden shadow-lg group-hover:-rotate-6 transition-transform">
                <Image src="/images/icfb-logo.webp" alt="ICFB" fill className="object-contain p-2" />
              </div>
            </MagneticWrapper>
            <div className="flex flex-col">
              <span className={`text-xl font-black tracking-tighter leading-none ${scrolled ? 'text-white' : 'text-[#003366]'}`}>ICFB</span>
              <span className="text-[7px] font-black text-[#E63946] uppercase tracking-[0.3em] mt-1">British Academy</span>
            </div>
          </Link>

          {/* Desktop Glass Menu */}
          <div className="hidden xl:flex items-center gap-1 bg-black/5 p-1 rounded-2xl" onMouseLeave={() => setHoveredPath(pathname)}>
            {navItems.map((item) => (
              <NavLink key={item.name} item={item} isActive={pathname === item.href} isHovered={hoveredPath === item.href} onHover={setHoveredPath} isDark={scrolled} />
            ))}
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            <div className="relative">
              <button 
                onClick={() => setPortalOpen(!portalOpen)} 
                className={`flex items-center gap-2 px-4 py-2 rounded-xl font-black text-[9px] uppercase tracking-widest transition-all active:scale-90
                ${scrolled ? "bg-white text-[#003366]" : "bg-[#003366] text-white"}`}
              >
                <User size={14} /> <span className="hidden xs:inline">Portal</span>
              </button>
              
              <AnimatePresence>
                {portalOpen && (
                  <motion.div initial={{ opacity: 0, scale: 0.9, y: 10 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 10 }}
                    className="absolute top-full right-0 mt-4 w-56 bg-white/95 backdrop-blur-xl rounded-[1.5rem] p-2 shadow-2xl border border-[#003366]/5 z-50">
                    <PortalItem href="/student/dashboard" icon={<Award size={16}/>} title="Student" sub="Certification" activeColor={brandRed} />
                    <PortalItem href="/admin" icon={<Shield size={16}/>} title="Admin" sub="Control" activeColor={brandNavy} />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <button onClick={() => setIsOpen(true)} className={`xl:hidden p-2 rounded-xl transition-all active:scale-75 ${scrolled ? "text-white" : "text-[#003366]"}`}>
              <Menu size={28} />
            </button>
          </div>
        </nav>
      </div>

      {/* 3. The New "Mobile App" Hub Experience */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-[#003366]/60 backdrop-blur-xl z-[200] flex items-end sm:items-center justify-center px-4 xl:hidden"
            onClick={() => setIsOpen(false)}
          >
            <motion.div 
              style={{ y: dragY, opacity, scale }}
              drag="y"
              dragConstraints={{ top: 0, bottom: 200 }}
              dragElastic={0.2}
              onDragEnd={(_, info) => info.offset.y > 100 && setIsOpen(false)}
              initial={{ y: "100%", opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: "100%", opacity: 0 }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="w-full max-w-md bg-white rounded-t-[3rem] sm:rounded-[3rem] shadow-[0_-20px_80px_rgba(0,0,0,0.4)] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Drag Handle for Mobile */}
              <div className="w-12 h-1.5 bg-zinc-200 rounded-full mx-auto mt-4 mb-2 sm:hidden" />

              <div className="bg-[#003366] p-8 flex justify-between items-center">
                <div className="flex flex-col">
                  <span className="text-white text-2xl font-black italic leading-none">SYSTEM_HUB</span>
                  <span className="text-[#E63946] text-[8px] font-black uppercase tracking-[0.5em] mt-2">Active Protocol</span>
                </div>
                <button onClick={() => setIsOpen(false)} className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-white active:bg-red-600 transition-colors">
                  <X size={18} />
                </button>
              </div>

              {/* Grid Layout inspired by Modern Dashboard Apps */}
              <div className="p-4 grid grid-cols-2 gap-3 max-h-[60vh] overflow-y-auto">
                {navItems.map((item, idx) => (
                  <motion.div key={item.name} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: idx * 0.05 }}>
                    <Link href={item.href} onClick={() => setIsOpen(false)} className="flex flex-col items-center justify-center p-6 bg-zinc-50 border border-[#003366]/5 rounded-[2rem] active:bg-[#E63946]/5 active:border-[#E63946]/20 transition-all group">
                      <div className="mb-3 p-3 bg-white rounded-2xl shadow-sm text-[#003366] group-active:text-[#E63946] group-active:scale-110 transition-all">
                        {item.icon}
                      </div>
                      <span className="text-[10px] font-black text-[#003366] uppercase tracking-tighter text-center">{item.name}</span>
                    </Link>
                  </motion.div>
                ))}
              </div>

              {/* High-Impact Contact Button */}
              <div className="p-6 pt-2">
                <Link href="/contact" onClick={() => setIsOpen(false)} className="relative flex items-center justify-center w-full p-6 bg-gradient-to-r from-[#003366] to-[#004d99] rounded-[2rem] text-white shadow-xl overflow-hidden group active:scale-95 transition-all">
                  <div className="absolute inset-0 bg-[#E63946] translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500 ease-out" />
                  <div className="relative z-10 flex items-center gap-3">
                    <span className="font-black uppercase text-xs tracking-widest">Connect Now</span>
                    <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
                  </div>
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function PortalItem({ href, icon, title, sub, activeColor }: any) {
  return (
    <Link href={href} className="flex items-center gap-4 p-4 hover:bg-[#003366]/5 rounded-2xl transition-all group active:scale-95">
      <div className="w-10 h-10 bg-zinc-50 rounded-xl flex items-center justify-center shadow-inner group-hover:bg-white group-hover:shadow-md transition-all" style={{ color: activeColor }}>
        {icon}
      </div>
      <div className="leading-tight">
        <p className="text-xs font-black text-[#003366]">{title}</p>
        <p className="text-[8px] text-zinc-400 uppercase font-black tracking-widest mt-0.5">{sub}</p>
      </div>
    </Link>
  );
}