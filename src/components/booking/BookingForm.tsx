"use client";

import { useActionState, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, User, Mail, Phone, MessageSquare, ChevronDown, Check, Loader2, Sparkles } from "lucide-react";
import { sendBookingAction } from "@/app/actions/booking";
import { FormInput } from "./FormInput";

const options = ["Executive Coaching", "Cancer Coaching", "Career Coaching", "Team Coaching"] as const;

export default function UltraBookingForm() {
  // React 19 useActionState
  const [state, formAction, isPending] = useActionState(sendBookingAction, null);
  const [selected, setSelected] = useState(options[0]);
  const [isSelectOpen, setIsSelectOpen] = useState(false);

  return (
    <section className="min-h-screen bg-white py-10 md:py-24 px-4">
      <div className="max-w-5xl mx-auto">
        
        {/* Header - Mobile Optimized */}
        <div className="mb-12 md:mb-20 space-y-4">
          <motion.div initial={{opacity:0}} animate={{opacity:1}} className="flex items-center gap-2 justify-center md:justify-start">
             <Sparkles size={14} className="text-red-600 animate-pulse" />
             <span className="text-[9px] font-black tracking-[0.4em] text-zinc-400 uppercase">Deployment Ready</span>
          </motion.div>
          <h2 className="text-5xl md:text-8xl font-black text-[#001429] tracking-tighter text-center md:text-left leading-[0.9]">
            Book Your <br/> <span className="text-red-600 italic">Evolution.</span>
          </h2>
        </div>

        <form action={formAction} className="relative group">
          {/* Glass Card */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 bg-[#000d1a] p-6 md:p-16 rounded-[3rem] md:rounded-[5rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] border border-white/5">
            
            <div className="space-y-8">
              <FormInput label="Identity" name="from_name" icon={<User size={18}/>} placeholder="Full Name" />
              <FormInput label="Digital" name="reply_to" type="email" icon={<Mail size={18}/>} placeholder="Email Address" />
            </div>

            <div className="space-y-8">
               {/* Custom Modern Select */}
               <div className="space-y-3 relative">
                 <label className="text-[10px] font-black uppercase text-white/20 tracking-[0.3em] ml-2">Objective</label>
                 <input type="hidden" name="coaching_type" value={selected} />
                 <div 
                   onClick={() => setIsSelectOpen(!isSelectOpen)}
                   className="p-5 md:p-6 bg-white/[0.02] border border-white/5 rounded-[2rem] cursor-pointer flex justify-between items-center group/btn"
                 >
                   <span className="font-bold text-white/90 text-sm">{selected}</span>
                   <ChevronDown className={`text-red-600 transition-transform duration-500 ${isSelectOpen ? 'rotate-180' : ''}`} size={18} />
                 </div>
                 
                 <AnimatePresence>
                   {isSelectOpen && (
                     <motion.div 
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="absolute z-50 w-full mt-3 bg-zinc-900 border border-white/10 rounded-[2rem] overflow-hidden shadow-2xl backdrop-blur-xl"
                     >
                       {options.map((opt) => (
                         <div 
                           key={opt}
                           onClick={() => { setSelected(opt); setIsSelectOpen(false); }}
                           className="p-5 hover:bg-red-600 text-white/70 hover:text-white transition-all text-xs font-black uppercase tracking-widest cursor-pointer flex justify-between"
                         >
                           {opt} {selected === opt && <Check size={14} />}
                         </div>
                       ))}
                     </motion.div>
                   )}
                 </AnimatePresence>
               </div>
               
               <FormInput label="Comm-Link" name="phone" icon={<Phone size={18}/>} placeholder="Phone Number" />
            </div>

            <div className="md:col-span-2">
               <button 
                type="submit" 
                disabled={isPending}
                className="w-full group relative h-20 md:h-28 bg-red-600 hover:bg-red-700 rounded-[2rem] md:rounded-[3rem] transition-all duration-500 overflow-hidden flex items-center justify-center"
               >
                 <AnimatePresence mode="wait">
                   {isPending ? (
                     <motion.div key="loading" initial={{y:20}} animate={{y:0}} exit={{y:-20}}>
                       <Loader2 className="animate-spin text-white" size={32} />
                     </motion.div>
                   ) : state?.success ? (
                     <motion.div key="success" initial={{scale:0}} animate={{scale:1}} className="flex items-center gap-3">
                        <Check size={32} className="text-white" />
                        <span className="font-black text-white uppercase tracking-[.2em]">Confirmed</span>
                     </motion.div>
                   ) : (
                     <motion.div key="idle" className="flex items-center gap-4">
                       <span className="text-xl md:text-3xl font-black text-white uppercase tracking-[0.3em]">Deploy Session</span>
                       <Send size={24} className="text-white group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform" />
                     </motion.div>
                   )}
                 </AnimatePresence>
               </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}