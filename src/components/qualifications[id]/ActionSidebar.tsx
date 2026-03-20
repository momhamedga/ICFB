"use client";
import { Download, Send, PhoneCall } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function ActionSidebar({ courseTitle }: { courseTitle: string }) {
  return (
    <div className="sticky top-28 space-y-4">
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        className="bg-[#003366] rounded-[3rem] p-8 md:p-10 text-white relative overflow-hidden shadow-2xl"
      >
        <div className="relative z-10 space-y-8">
          <div className="space-y-2">
            <span className="text-[#ef4444] font-black text-[9px] uppercase tracking-[0.4em]">Enrolment_Protocol</span>
            <h4 className="text-3xl font-black leading-tight tracking-tighter">Start Your Journey.</h4>
          </div>

          <div className="space-y-3">
            <Link href="/contact" className="block w-full">
              <button className="w-full py-5 bg-[#ef4444] hover:bg-white hover:text-[#003366] text-white rounded-2xl font-black uppercase tracking-widest text-[10px] transition-all duration-500 flex items-center justify-center gap-3 shadow-xl shadow-red-500/20">
                Apply_Now <Send size={14} />
              </button>
            </Link>
            
            <button className="w-full py-5 bg-white/5 border border-white/10 hover:bg-white/10 text-white rounded-2xl font-black uppercase tracking-widest text-[10px] transition-all flex items-center justify-center gap-3">
              <Download size={14} /> Get Brochure
            </button>
          </div>

          <div className="pt-6 border-t border-white/10 flex items-center justify-between">
             <p className="text-white/40 text-[9px] font-bold uppercase tracking-widest">Available for Next Cohort</p>
             <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          </div>
        </div>
      </motion.div>

      <div className="bg-white border border-zinc-100 rounded-[2.5rem] p-8 flex items-center justify-between group cursor-pointer hover:border-[#ef4444]/30 transition-all duration-500">
        <div className="space-y-1">
          <p className="text-zinc-400 text-[9px] font-black uppercase tracking-widest">Need help?</p>
          <p className="text-[#003366] font-black text-sm">Speak to an Advisor</p>
        </div>
        <div className="w-12 h-12 rounded-full bg-zinc-50 flex items-center justify-center text-[#003366] group-hover:bg-[#ef4444] group-hover:text-white transition-all">
          <PhoneCall size={20} />
        </div>
      </div>
    </div>
  );
}