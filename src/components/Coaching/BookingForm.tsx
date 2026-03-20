"use client";
import { useActionState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle2, ShieldAlert, User, Mail, Target } from "lucide-react";
import { sendBookingAction } from "@/app/actions/booking";

export default function BookingForm() {
  const [state, formAction, isPending] = useActionState(sendBookingAction, { 
    success: false, 
    message: "" 
  });

  if (state?.success) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }} 
        animate={{ opacity: 1, scale: 1 }} 
        className="py-24 text-center space-y-8 bg-white rounded-[3rem] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.05)] border border-slate-50"
      >
        <div className="w-28 h-28 bg-[#E63946] text-white rounded-full flex items-center justify-center mx-auto shadow-[0_25px_60px_rgba(230,57,70,0.4)]">
          <CheckCircle2 size={54} strokeWidth={1.5} />
        </div>
        <div className="space-y-2">
          <h3 className="text-3xl font-black text-[#003366] uppercase tracking-tighter italic">Uplink_Complete</h3>
          <p className="text-slate-400 text-[11px] font-bold tracking-[0.5em] uppercase px-6">
            Your protocol has been transmitted to our strategic command.
          </p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }} 
      animate={{ opacity: 1, y: 0 }} 
      className="max-w-4xl mx-auto"
    >
      <form action={formAction} className="space-y-8 bg-white p-6 md:p-16 rounded-[3.5rem] shadow-[0_50px_120px_-30px_rgba(0,0,0,0.08)] border border-slate-50 relative overflow-hidden">
        
        {/* عنصر جمالي خلفي */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-bl-[5rem] -z-10 opacity-50" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <InputGroup 
            label="Agent_Identity" 
            name="from_name" 
            placeholder="ENTER FULL NAME" 
            icon={<User size={18} />}
            required
          />
          <InputGroup 
            label="Response_Uplink" 
            name="reply_to" 
            placeholder="EMAIL@PROTOCOL.COM" 
            type="email"
            icon={<Mail size={18} />}
            required
          />
        </div>

        <InputGroup 
          label="Strategic_Target" 
          name="coaching_type" 
          placeholder="EXECUTIVE / PERFORMANCE / STRATEGIC" 
          icon={<Target size={18} />}
          required
        />

        <div className="pt-10">
          <motion.button 
            whileTap={{ scale: 0.96 }}
            disabled={isPending}
            className="group relative w-full h-24 bg-[#003366] text-white rounded-full font-black uppercase tracking-[0.6em] text-[11px] md:text-xs overflow-hidden disabled:opacity-80 transition-all duration-500 shadow-[0_30px_70px_-15px_rgba(0,51,102,0.4)]"
          >
            <AnimatePresence mode="wait">
              {isPending ? (
                <motion.span 
                  key="loading"
                  initial={{ opacity: 0, y: 15 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  exit={{ opacity: 0, y: -15 }}
                  className="flex items-center justify-center gap-4"
                >
                  <motion.div 
                    animate={{ rotate: 360 }} 
                    transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                    className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full"
                  />
                  SYNCHRONIZING...
                </motion.span>
              ) : (
                <motion.span 
                  key="idle"
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }}
                  className="flex items-center justify-center gap-5 relative z-10"
                >
                  INITIATE_PROTOCOL
                  <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center group-hover:bg-[#E63946] transition-colors duration-500">
                    <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-500" />
                  </div>
                </motion.span>
              )}
            </AnimatePresence>

            {/* Hover Effect Layer */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#003366] via-[#004a94] to-[#003366] translate-x-[-100%] group-hover:translate-x-[0%] transition-transform duration-1000 ease-in-out -z-0" />
          </motion.button>
          
          <p className="mt-6 text-center text-[9px] font-black text-slate-300 uppercase tracking-[0.5em]">
            Secured Encrypted Transmission Protocol v2.6
          </p>
        </div>

        {state?.success === false && state?.message && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }} 
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-50 p-4 rounded-2xl flex items-center justify-center gap-3 border border-red-100"
          >
            <ShieldAlert size={16} className="text-[#E63946]" />
            <span className="text-[#E63946] text-[10px] font-black uppercase tracking-widest">{state.message}</span>
          </motion.div>
        )}
      </form>
    </motion.div>
  );
}

function InputGroup({ label, icon, ...props }: any) {
  return (
    <div className="group space-y-4">
      <label className="text-[10px] font-black text-[#003366] uppercase tracking-[0.4em] ml-8 flex items-center gap-2 opacity-70 group-focus-within:opacity-100 transition-opacity">
        <span className="w-1.5 h-1.5 bg-[#E63946] rounded-full" />
        {label}
      </label>
      <div className="relative">
        <div className="absolute left-8 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#E63946] transition-colors duration-500">
          {icon}
        </div>
        <input 
          {...props}
          className="w-full pl-16 pr-8 h-20 md:h-24 bg-slate-50/50 border-2 border-transparent rounded-[2rem] outline-none focus:bg-white focus:border-slate-100 focus:shadow-[0_20px_50px_-15px_rgba(0,0,0,0.03)] transition-all duration-500 text-sm font-bold uppercase tracking-[0.1em] text-[#003366] placeholder:text-slate-200 placeholder:font-black placeholder:text-[10px] placeholder:tracking-[0.2em]"
        />
      </div>
    </div>
  );
}