"use client";

import { useState, useEffect } from "react";
import { Mail, Phone, Facebook, Twitter, Linkedin, Award, Globe, Menu, X, User, Shield, Sparkles } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

export default function ICFBHeader() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [portalOpen, setPortalOpen] = useState(false);
  const [hoveredPath, setHoveredPath] = useState(pathname);

  // هل الصفحة الحالية تتطلب خلفية داكنة (مثل Contact Us)؟
  const isDarkPage = pathname === "/contact";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setHoveredPath(pathname);
    setPortalOpen(false);
    setIsOpen(false);
  }, [pathname]);

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Qualifications", href: "/qualifications" },
    { name: "Services", href: "/services" },
    { name: "Coaching", href: "/coaching" },
    { name: "Courses", href: "/courses" },
    { name: "Events", href: "/events" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <header className="fixed top-0 w-full z-[100] font-sans transition-all duration-500">
      {/* 1. Top Bar - تختفي عند السكرول لتعطي مساحة أكبر للتصميم الداكن */}
      <AnimatePresence>
        {!scrolled && (
          <motion.div 
            initial={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="bg-[#d32f2f] text-white py-2 px-4 md:px-20 flex justify-between items-center text-[11px] md:text-[13px] font-medium overflow-hidden"
          >
            <div className="flex gap-4 md:gap-8 items-center">
              <a href="mailto:info@icfb.life" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                <Mail size={12} /> <span className="hidden xs:inline">info@icfb.life</span>
              </a>
              <a href="tel:+4412345615523" className="flex items-center gap-2 border-l border-white/20 pl-4 md:pl-6 hover:opacity-80 transition-opacity">
                <Phone size={12} /> <span className="hidden xs:inline">+44 123 4561 5523</span>
              </a>
            </div>
            <div className="flex gap-4 items-center">
              <div className="hidden lg:flex gap-4 items-center">
                <span className="flex items-center gap-1 opacity-90 text-[10px] uppercase tracking-widest"><Sparkles size={12} /> UK Accredited</span>
              </div>
              <div className="flex gap-3">
                <Facebook size={14} className="hover:scale-110 cursor-pointer transition-all" />
                <Linkedin size={14} className="hover:scale-110 cursor-pointer transition-all" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. Main Navigation - التعديل الجوهري هنا */}
      <nav className={`
        transition-all duration-500 px-4 md:px-20 py-4 flex justify-between items-center
        ${scrolled 
          ? "bg-[#000d1a]/80 backdrop-blur-2xl shadow-2xl py-3 border-b border-white/5" 
          : "bg-transparent border-b border-transparent"}
      `}>
        
        {/* Logo Section */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative w-12 h-12 md:w-14 md:h-14 bg-red-600 rounded-full p-2 flex items-center justify-center shadow-[0_0_20px_rgba(220,38,38,0.3)] transition-transform group-hover:rotate-12">
            <div className="relative w-full h-full">
               <Image 
                src="/images/icfb-logo.webp" 
                alt="ICFB Logo" 
                fill 
                className="object-contain" 
                priority 
              />
            </div>
          </div>
          <div className="flex flex-col">
            <span className={`text-xl md:text-2xl font-black leading-none tracking-tighter transition-colors duration-500 ${isDarkPage || scrolled ? 'text-white' : 'text-zinc-900'}`}>
              ICFB
            </span>
            <span className="text-[9px] md:text-[10px] font-bold text-red-500 uppercase tracking-[0.3em] hidden sm:block">
              British Academy
            </span>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <ul 
          className="hidden xl:flex items-center gap-2 relative"
          onMouseLeave={() => setHoveredPath(pathname)}
        >
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <li key={item.name} className="relative px-1">
                <Link 
                  href={item.href}
                  onMouseEnter={() => setHoveredPath(item.href)}
                  className={`px-4 py-2 text-[12px] font-black uppercase tracking-widest transition-all duration-300 relative z-10
                    ${(isActive || hoveredPath === item.href) 
                      ? "text-red-500" 
                      : (isDarkPage || scrolled ? "text-zinc-400 hover:text-white" : "text-zinc-600 hover:text-zinc-900")}`}
                >
                  {item.name}
                  {(hoveredPath === item.href || isActive) && (
                    <motion.span
                      layoutId="nav-pill"
                      className={`absolute inset-0 rounded-full -z-10 ${isDarkPage || scrolled ? 'bg-white/5' : 'bg-red-50'}`}
                      initial={false}
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Mobile Menu Toggle & CTA */}
        <div className="flex items-center gap-2 md:gap-4">
          <div className="relative">
            <button 
              onClick={() => setPortalOpen(!portalOpen)}
              className={`hidden sm:flex items-center gap-2 px-5 py-2.5 rounded-2xl font-bold text-[11px] uppercase tracking-widest transition-all
                ${isDarkPage || scrolled ? "text-zinc-300 hover:bg-white/5 border border-white/10" : "text-zinc-500 hover:bg-zinc-100 border border-zinc-200"}`}
            >
              <User size={14} /> Portal
            </button>

            {/* Portal Dropdown الإبداعي */}
            <AnimatePresence>
              {portalOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 15, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 15, scale: 0.95 }}
                  className="absolute top-full right-0 mt-4 w-64 bg-[#001429] border border-white/10 rounded-[24px] shadow-2xl p-3 flex flex-col gap-1 overflow-hidden backdrop-blur-3xl"
                >
                  <div className="px-4 py-2 mb-2 border-b border-white/5">
                    <p className="text-[9px] font-black text-zinc-500 uppercase tracking-[2px]">Select Gateway</p>
                  </div>
                  
                  <Link href="/student/login" className="flex items-center gap-3 p-3 hover:bg-white/5 rounded-2xl group transition-all">
                    <div className="w-10 h-10 bg-red-600/10 text-red-500 rounded-xl flex items-center justify-center group-hover:bg-red-600 group-hover:text-white transition-all">
                      <Award size={18} />
                    </div>
                    <div>
                      <p className="text-xs font-black text-white">Student Portal</p>
                      <p className="text-[9px] text-zinc-500 font-bold uppercase">View Certificates</p>
                    </div>
                  </Link>

                  <Link href="/admin/login" className="flex items-center gap-3 p-3 hover:bg-white/5 rounded-2xl group transition-all">
                    <div className="w-10 h-10 bg-white/5 text-zinc-400 rounded-xl flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
                      <Shield size={18} />
                    </div>
                    <div>
                      <p className="text-xs font-black text-white">Administrator</p>
                      <p className="text-[9px] text-zinc-500 font-bold uppercase">Secure Access</p>
                    </div>
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

  
          
          <button 
            onClick={() => setIsOpen(!isOpen)} 
            className={`xl:hidden p-2 rounded-xl transition-all ${isDarkPage || scrolled ? "text-white hover:bg-white/10" : "text-zinc-800 hover:bg-zinc-100"}`}
          >
            {isOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer - بسيط ومتناسق مع الـ Dark Theme */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 bg-[#000d1a] z-[150] xl:hidden flex flex-col p-8"
          >
            <div className="flex justify-between items-center mb-12">
               <span className="text-white text-2xl font-black italic tracking-tighter">ICFB</span>
               <button onClick={() => setIsOpen(false)} className="text-white p-2 bg-white/5 rounded-full">
                 <X size={24} />
               </button>
            </div>
            <ul className="flex flex-col gap-6">
              {navItems.map((item) => (
                <li key={item.name}>
                  <Link 
                    href={item.href}
                    className="text-white text-3xl font-black uppercase tracking-tighter hover:text-red-500 transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}