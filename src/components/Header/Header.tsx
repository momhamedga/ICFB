"use client";

import { useHeaderLogic } from "@/hooks/useHeaderLogic";
import { NavLink } from "./NavLink";
import MagneticWrapper from "../ui/MagneticWrapper";
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";
import { 
  Mail, Phone, User, Award, Shield, Menu, X, Sparkles, 
  ArrowRight, Globe, Layers, Zap, FileBadge, LayoutGrid 
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function ICFBHeader() {
  const { 
    scrolled, isOpen, setIsOpen, portalOpen, setPortalOpen, 
    hoveredPath, setHoveredPath, pathname 
  } = useHeaderLogic();
  
  const brandNavy = "#003366";
  const brandRed = "#E63946";

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
      {/* 1. Desktop Top Bar */}
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
                    className="absolute top-full right-0 mt-4 w-64 bg-white/95 backdrop-blur-xl rounded-[1.5rem] p-2 shadow-2xl border border-[#003366]/5 z-50">
                    <PortalItem href="/student/dashboard" icon={<FileBadge size={18}/>} title="Student" sub="Certification" activeColor={brandRed} isMobile={false} setIsOpen={setIsOpen} />
                    <PortalItem href="/admin" icon={<LayoutGrid size={18}/>} title="Admin" sub="Control Terminal" activeColor={brandNavy} isMobile={false} setIsOpen={setIsOpen} />
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

      {/* 3. The New "Side Drawer" Experience */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[200] xl:hidden">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-[#003366]/40 backdrop-blur-sm"
            />

            <motion.div 
              initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="absolute top-0 right-0 h-full w-[85%] max-w-sm bg-white shadow-[-20px_0_60px_rgba(0,0,0,0.2)] flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-[#003366] p-8 flex justify-between items-center">
                <div className="flex flex-col">
                  <span className="text-white text-2xl font-black italic leading-none">IC_FB</span>
                  <span className="text-[#E63946] text-[8px] font-black uppercase tracking-[0.5em] mt-2">BRITISH ACADEMY</span>
                </div>
                <button onClick={() => setIsOpen(false)} className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-white active:scale-90 transition-all">
                  <X size={18} />
                </button>
              </div>

           {/* Navigation List - المنيو الطولية الجديدة */}
<div className="flex-1 overflow-y-auto p-6 space-y-2 custom-scroll-area"> 
  {/* ضفنا الكلاس هنا ^ لضمان تطبيق الاستايل المودرن */}
  
  {navItems.map((item, idx) => (
    <motion.div key={item.name} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: idx * 0.05 }}>
      <Link 
        href={item.href} 
        onClick={() => setIsOpen(false)} 
        className="flex items-center gap-5 p-5 bg-zinc-50/50 border border-[#003366]/5 rounded-2xl active:bg-[#E63946]/5 active:border-[#E63946]/20 transition-all group"
      >
        <div className="p-3 bg-white rounded-xl shadow-sm text-[#003366] group-active:text-[#E63946] transition-all">
          {item.icon}
        </div>
        <span className="text-[11px] font-black text-[#003366] uppercase tracking-[0.1em]">{item.name}</span>
      </Link>
    </motion.div>
  ))}

  {/* الـ Portal Items برضه جوه نفس الـ Scroll Area */}
  <div className="pt-6 border-t border-zinc-100 space-y-3">
    <PortalItem href="/student/dashboard" icon={<FileBadge size={22}/>} title="Student" sub="Certification Library" activeColor={brandRed} isMobile={true} setIsOpen={setIsOpen} />

<PortalItem 
  href="/admin" 
  icon={<LayoutGrid size={18}/>} 
  title="Admin" 
  sub="Control Terminal" 
  activeColor={brandNavy} 
  isMobile={false} 
  setIsOpen={setIsOpen} 
/>
  </div>
</div>

              <div className="p-6 border-t border-zinc-100">
                <Link href="/contact" onClick={() => setIsOpen(false)} className="flex items-center justify-center w-full p-6 bg-[#003366] rounded-2xl text-white shadow-lg active:scale-95 transition-all gap-3">
                  <span className="font-black uppercase text-[10px] tracking-[0.2em]">Connect Now</span>
                  <ArrowRight size={16} />
                </Link>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </header>
  );
}

// 🛠️ Modified PortalItem to handle both Desktop and Mobile layout
function PortalItem({ href, icon, title, sub, activeColor, isMobile, setIsOpen }: any) {
  return (
    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
      <Link 
        href={href} 
        onClick={() => setIsOpen(false)}
        className={`flex items-center gap-4 transition-all group active:scale-95
          ${isMobile 
            ? "p-6 bg-zinc-50 border border-[#003366]/5 rounded-3xl" 
            : "p-4 hover:bg-[#003366]/5 rounded-2xl"}`}
      >
        <div className={`flex items-center justify-center shadow-inner group-active:bg-white transition-all
          ${isMobile ? "w-14 h-14 bg-white rounded-2xl" : "w-10 h-10 bg-zinc-50 rounded-xl"}`} 
          style={{ color: activeColor }}
        >
          {icon}
        </div>
        <div className="leading-tight flex-1">
          <p className={`${isMobile ? "text-sm" : "text-xs"} font-black text-[#003366] uppercase tracking-wider`}>{title}</p>
          <p className={`${isMobile ? "text-[9px]" : "text-[8px]"} text-zinc-400 uppercase font-black tracking-widest mt-1`}>{sub}</p>
        </div>
        {isMobile && <ArrowRight size={16} className="text-zinc-300" />}
      </Link>
    </motion.div>
  );
}