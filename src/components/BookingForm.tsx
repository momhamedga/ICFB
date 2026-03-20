"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, User, Mail, Phone, MessageSquare, ChevronDown, Check, Loader2, CheckCircle2 } from "lucide-react";
import emailjs from "@emailjs/browser";

// --- Custom Mission Toast Component ---
const MissionToast = ({ show }: { show: boolean }) => (
  <AnimatePresence>
    {show && (
      <motion.div 
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[100] flex items-center gap-4 bg-[#001429]/90 backdrop-blur-xl border border-emerald-500/30 p-5 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
      >
        <div className="bg-emerald-500/20 p-3 rounded-2xl">
          <CheckCircle2 className="text-emerald-500" size={28} />
        </div>
        <div>
          <h4 className="text-emerald-500 font-black uppercase tracking-widest text-sm">Mission Accomplished</h4>
          <p className="text-white/60 text-xs mt-1">Data uplinked to headquarters.</p>
        </div>
      </motion.div>
    )}
  </AnimatePresence>
);

const coachingOptions = [
  "Executive Coaching",
  "Cancer Coaching",
  "Career Coaching",
  "Team Coaching"
] as const;

export default function BookingForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [selectedType, setSelectedType] = useState(coachingOptions[0]);

  useEffect(() => {
    emailjs.init("--El8BxMZ5vR8E2gj");
  }, []);

  const sendBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;
    setLoading(true);

    try {
      await emailjs.sendForm(
        "service_pexoox8", // Service ID من لقطة الشاشة الخاصة بك
        "template_zoax5ud", // Template ID من لقطة الشاشة الخاصة بك
        formRef.current,
        "--El8BxMZ5vR8E2gj"
      );

      setShowToast(true);
      formRef.current.reset();
      setTimeout(() => setShowToast(false), 4000);
    } catch (error) {
      console.error("Critical Failure:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white py-20 px-4 relative overflow-hidden">
      <MissionToast show={showToast} />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl mx-auto"
      >
        <div className="text-center mb-16">
          <h1 className="text-6xl md:text-8xl font-black text-[#001429] mb-4">
            Secure Your <span className="text-red-600">Session.</span>
          </h1>
          <p className="text-[10px] font-bold uppercase tracking-[0.5em] text-[#001429]/40">
            Advanced Booking System V2.0
          </p>
        </div>

        <form 
          ref={formRef}
          onSubmit={sendBooking} 
          className="grid grid-cols-1 lg:grid-cols-2 gap-10 bg-[#001429] p-8 md:p-16 rounded-[4rem] shadow-2xl relative"
        >
          <div className="space-y-10">
            <header className="flex items-center gap-4">
              <span className="text-red-600 font-black text-xs tracking-tighter">01.</span>
              <h3 className="text-white/90 text-xs font-black uppercase tracking-[0.3em]">Personal Identity</h3>
            </header>
            
            <CustomInput label="Full Name" name="name" icon={<User size={18} />} placeholder="Agent Name" />
            <CustomInput label="Digital Address" name="email" type="email" icon={<Mail size={18} />} placeholder="email@secure.io" />
            <CustomInput label="Global Link" name="phone" icon={<Phone size={18} />} placeholder="+971 -- --- ----" />
          </div>

          <div className="space-y-10">
            <header className="flex items-center gap-4">
              <span className="text-red-600 font-black text-xs tracking-tighter">02.</span>
              <h3 className="text-white/90 text-xs font-black uppercase tracking-[0.3em]">Mission Scope</h3>
            </header>

            <div className="space-y-3 relative">
              <label className="text-[10px] font-black uppercase text-white/20 tracking-widest ml-2">Specialization</label>
              <input type="hidden" name="type" value={selectedType} />
              <div 
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center justify-between p-6 bg-white/[0.03] border border-white/5 rounded-3xl cursor-pointer hover:bg-white/[0.06] transition-all"
              >
                <span className="font-bold text-white/90">{selectedType}</span>
                <ChevronDown className={`text-red-600 transition-transform ${isOpen ? 'rotate-180' : ''}`} size={20} />
              </div>

              <AnimatePresence>
                {isOpen && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                    className="absolute z-50 w-full mt-2 bg-[#0a1a2f] border border-white/10 rounded-3xl overflow-hidden shadow-3xl"
                  >
                    {coachingOptions.map((opt) => (
                      <div 
                        key={opt} 
                        onClick={() => { setSelectedType(opt); setIsOpen(false); }}
                        className="p-5 hover:bg-white/[0.05] cursor-pointer flex justify-between items-center text-sm font-bold text-white/70 hover:text-red-500 transition-colors"
                      >
                        {opt} {selectedType === opt && <Check size={16} className="text-red-600" />}
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase text-white/20 tracking-widest ml-2">Intelligence Brief</label>
              <div className="flex gap-4 p-6 bg-white/[0.03] border border-white/5 rounded-[2rem]">
                <MessageSquare className="text-white/10" size={18} />
                <textarea name="message" rows={4} placeholder="Provide mission details..." className="w-full bg-transparent outline-none font-bold text-white/90 placeholder:text-white/5 resize-none" />
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 pt-6">
            <motion.button 
              disabled={loading}
              whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}
              className="w-full h-24 bg-red-600 text-white rounded-[2.5rem] font-black text-2xl uppercase tracking-[0.3em] flex items-center justify-center gap-4 shadow-[0_20px_40px_rgba(220,38,38,0.3)] disabled:opacity-50"
            >
              {loading ? <Loader2 className="animate-spin" /> : <>Confirm Booking <Send size={24} /></>}
            </motion.button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}

function CustomInput({ label, icon, ...props }: any) {
  return (
    <div className="space-y-3">
      <label className="text-[10px] font-black uppercase text-white/20 tracking-widest ml-2">{label}</label>
      <div className="flex items-center gap-4 p-6 bg-white/[0.03] border border-white/5 rounded-3xl focus-within:border-red-600/40 transition-all">
        <div className="text-white/10">{icon}</div>
        <input {...props} required className="w-full bg-transparent outline-none font-bold text-white/90 placeholder:text-white/5" />
      </div>
    </div>
  );
}