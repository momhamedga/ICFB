"use client";

import { useActionState, useEffect } from "react";
import { motion } from "framer-motion";
import { Send } from "lucide-react";
import confetti from "canvas-confetti";
import SubmissionStatus from "./SubmissionStatus";
import { sendContactAction } from "@/app/actions/booking";

export default function ContactForm() {
  // استخدام useActionState لربط الفورم بالأكشن (React 19 Hooks)
  const [state, formAction, isPending] = useActionState(sendContactAction, null);

  // تأثير الـ Confetti والنجاح عند تغير الـ state
  useEffect(() => {
    if (state?.success) {
      confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.6 },
        colors: ["#E63946", "#001c30", "#ffffff"],
      });
    }
  }, [state]);

  return (
    <div className="relative w-full">
      {/* عرض الحالة بناءً على الـ state الراجع من السيرفر */}
      <SubmissionStatus status={isPending ? "sending" : state?.success ? "success" : state?.message ? "error" : "idle"} />

      <div className="bg-white rounded-[45px] md:rounded-[60px] p-10 md:p-20 shadow-[0_40px_100px_rgba(0,0,0,0.1)] transition-all duration-700">
        
        <form action={formAction} className="grid grid-cols-1 md:grid-cols-2 gap-10">
          
          <div className="space-y-4">
            <label className="text-[11px] font-black uppercase tracking-widest text-zinc-400 ml-2">Identity Name</label>
            <input 
              name="name" 
              type="text" 
              required 
              placeholder="Full Name" 
              className="w-full bg-zinc-50 border-none rounded-[20px] h-16 px-8 text-zinc-900 focus:ring-2 focus:ring-[#E63946]/10 transition-all font-bold placeholder:text-zinc-300" 
            />
          </div>

          <div className="space-y-4">
            <label className="text-[11px] font-black uppercase tracking-widest text-zinc-400 ml-2">Digital Mail</label>
            <input 
              name="email" 
              type="email" 
              required 
              placeholder="Email Address" 
              className="w-full bg-zinc-50 border-none rounded-[20px] h-16 px-8 text-zinc-900 focus:ring-2 focus:ring-[#E63946]/10 transition-all font-bold placeholder:text-zinc-300" 
            />
          </div>

          <div className="md:col-span-2 space-y-4">
            <label className="text-[11px] font-black uppercase tracking-widest text-zinc-400 ml-2">Mission Brief</label>
            <textarea 
              name="message" 
              required 
              rows={4} 
              placeholder="Brief us..." 
              className="w-full bg-zinc-50 border-none rounded-[30px] p-8 text-zinc-900 focus:ring-2 focus:ring-[#E63946]/10 transition-all resize-none font-bold placeholder:text-zinc-300" 
            />
          </div>

          <motion.button 
            type="submit"
            disabled={isPending}
            whileHover={{ y: -4 }}
            whileTap={{ scale: 0.98 }}
            className="md:col-span-2 h-20 bg-[#001c30] hover:bg-[#E63946] text-white rounded-[22px] font-black uppercase tracking-[0.4em] text-[12px] flex items-center justify-center gap-4 transition-all duration-500 shadow-xl disabled:opacity-50"
          >
            {isPending ? "TRANSMITTING..." : "INITIATE CONTACT"}
            <Send size={18} className={isPending ? "animate-pulse" : ""} />
          </motion.button>

        </form>
      </div>
    </div>
  );
}