"use client";

import { motion, useMotionValue, useTransform, AnimatePresence } from "framer-motion";
import { Mail, Phone, MapPin, Send, CheckCircle2, AlertCircle } from "lucide-react";
import { useState, useRef } from "react";
import emailjs from "@emailjs/browser";
import confetti from "canvas-confetti";

// --- Interfaces & Types ---
interface ModernInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

type SubmissionStatus = "idle" | "sending" | "success" | "error";

export default function ContactPage() {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<SubmissionStatus>("idle");
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // 🚀 دالة الاحتفال (Confetti) بأسلوب مخصص للبراند الخاص بك
  const launchSuccessConfetti = () => {
    const end = Date.now() + 3 * 1000; // 3 ثواني
    const colors = ["#ff0000", "#ffffff", "#001429"]; // أحمر، أبيض، أزرق داكن

    (function frame() {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors,
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    }());
  };

  const handleMouseMove = ({ currentTarget, clientX, clientY }: React.MouseEvent) => {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formRef.current) return;
    
    setStatus("sending");

    try {
      // ✅ في 2026، نمرر المفتاح مباشرة في الدالة لضمان استجابة أسرع وأمان أعلى
      await emailjs.sendForm(
        "service_pexoox8", 
        "template_zoax5ud", 
        formRef.current,
        "--El8BxMZ5vR8E2gj" 
      );
      
      setStatus("success");
      launchSuccessConfetti(); // 🎉 انطلاق القصاصات
      formRef.current.reset();
      
      setTimeout(() => setStatus("idle"), 5000);
    } catch (error: unknown) {
      console.error("Critical Transmission Error:", error);
      setStatus("error");
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  return (
    <main 
      onMouseMove={handleMouseMove} 
      className="relative min-h-screen bg-[#000d1a] overflow-hidden pt-48 pb-20 group/main selection:bg-red-500/30"
    >
      {/* 🚀 Notification System */}
      <AnimatePresence mode="wait">
        {status !== "idle" && status !== "sending" && (
          <motion.div
            initial={{ opacity: 0, y: 50, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
            className="fixed bottom-10 right-10 z-[100] flex items-center gap-5 px-8 py-5 rounded-[30px] bg-[#001429]/80 backdrop-blur-3xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
          >
            {status === "success" ? (
              <SuccessContent />
            ) : (
              <ErrorContent />
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-24">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[#f0f4f8] text-6xl md:text-8xl font-black tracking-tighter leading-none mb-6"
          >
            Let's Start a <br/>
            <span className="text-red-600">Conversation.</span>
          </motion.h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Contact Cards */}
          <div className="lg:col-span-4 space-y-4">
            <InteractiveCard icon={Mail} title="Direct Channel" value="info@icfb.life" desc="Secured end-to-end communication." />
            <InteractiveCard icon={Phone} title="Global Link" value="+44 123 456 789" desc="Live support Mon-Fri (GMT)." />
            <InteractiveCard icon={MapPin} title="Base Location" value="London, UK" desc="Academic Innovation Square." />
          </div>

          {/* Form Section */}
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="lg:col-span-8 relative group">
            <div className="absolute -inset-1 bg-gradient-to-br from-red-600/20 to-transparent rounded-[45px] blur-2xl opacity-50 group-hover:opacity-100 transition duration-1000" />
            <div className="relative bg-[#001429]/60 backdrop-blur-3xl border border-white/5 rounded-[40px] p-8 md:p-14">
              <form ref={formRef} onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12">
                <input type="hidden" name="title" value="New Inquiry from Website" />
                <ModernInput label="Full Identity" name="name" placeholder="John Wick" type="text" required />
                <ModernInput label="Digital Address" name="email" placeholder="john@company.io" type="email" required />
                
                <div className="md:col-span-2 space-y-4 group/input">
                  <label className="text-[#f0f4f8] text-[10px] font-bold uppercase tracking-[0.3em] opacity-40 group-focus-within/input:opacity-100 transition-opacity">Mission Briefing</label>
                  <textarea 
                    name="message"
                    required
                    rows={5}
                    className="w-full bg-white/[0.03] border border-white/5 rounded-3xl p-6 text-[#f0f4f8] focus:outline-none focus:ring-2 focus:ring-red-600/20 focus:border-red-600/40 transition-all resize-none placeholder:text-zinc-800 font-medium"
                    placeholder="Brief us on your requirements..."
                  />
                </div>

                <motion.button 
                  disabled={status === "sending"}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  className="md:col-span-2 relative h-20 overflow-hidden rounded-2xl bg-red-600 text-white font-black uppercase tracking-[0.3em] text-xs flex items-center justify-center gap-4 group/btn disabled:opacity-50 shadow-2xl shadow-red-950/20 transition-all duration-500"
                >
                  <span className="relative z-10">
                    {status === "sending" ? "Uplinking Data..." : "Launch Communication"}
                  </span>
                  <Send size={18} className={`relative z-10 transition-transform duration-500 ${status === "sending" ? "animate-pulse" : "group-hover:translate-x-2 group-hover:-translate-y-2"}`} />
                  <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-red-700 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500" />
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}

// --- Sub-components for better organization ---

const SuccessContent = () => (
  <>
    <div className="w-12 h-12 rounded-2xl bg-green-500/20 flex items-center justify-center text-green-500">
      <CheckCircle2 size={24} />
    </div>
    <div>
      <h3 className="text-[#f0f4f8] font-black text-sm uppercase tracking-wider text-green-400">Mission Accomplished</h3>
      <p className="text-zinc-500 text-[11px] font-bold tracking-tight">Data uplinked to headquarters.</p>
    </div>
  </>
);

const ErrorContent = () => (
  <>
    <div className="w-12 h-12 rounded-2xl bg-red-500/20 flex items-center justify-center text-red-500">
      <AlertCircle size={24} />
    </div>
    <div>
      <h3 className="text-[#f0f4f8] font-black text-sm uppercase tracking-wider text-red-500">System Failure</h3>
      <p className="text-zinc-500 text-[11px] font-bold tracking-tight">Uplink failed. Check connection.</p>
    </div>
  </>
);

function ModernInput({ label, name, ...props }: ModernInputProps) {
  return (
    <div className="space-y-4 group/input">
      <label className="text-[#f0f4f8] text-[10px] font-bold uppercase tracking-[0.3em] opacity-40 group-focus-within/input:opacity-100 group-focus-within/input:text-red-500 transition-all">
        {label}
      </label>
      <input 
        name={name} 
        {...props} 
        className="w-full bg-white/[0.03] border border-white/5 border-b-white/10 rounded-2xl h-16 px-6 text-[#f0f4f8] focus:outline-none focus:bg-white/[0.06] focus:border-red-600/40 transition-all placeholder:text-zinc-800 font-bold tracking-tight" 
      />
    </div>
  );
}

function InteractiveCard({ icon: Icon, title, value, desc }: { icon: any, title: string, value: string, desc: string }) {
  return (
    <motion.div 
      whileHover={{ scale: 1.02, x: 10 }} 
      className="group relative bg-white/[0.02] border border-white/5 p-8 rounded-[35px] cursor-pointer overflow-hidden backdrop-blur-md"
    >
      <div className="flex items-start gap-6">
        <div className="w-16 h-16 rounded-[20px] bg-[#001429] border border-white/5 flex items-center justify-center text-red-500 group-hover:bg-red-600 group-hover:text-white transition-all duration-500 shadow-2xl">
          <Icon size={28} />
        </div>
        <div>
          <h4 className="text-zinc-600 text-[9px] font-black uppercase tracking-[0.3em] mb-1 leading-none">{title}</h4>
          <p className="text-[#f0f4f8] font-black text-xl group-hover:text-red-500 transition-colors leading-tight">{value}</p>
          <p className="text-zinc-500 text-[11px] mt-2 font-bold tracking-tight">{desc}</p>
        </div>
      </div>
    </motion.div>
  );
}