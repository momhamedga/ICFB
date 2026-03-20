"use client";

import { useState, useTransition, useCallback } from "react";
import { supabase } from "@/lib/supabase";
import { motion, AnimatePresence } from "framer-motion";
import { User, Hash, Loader2, ArrowRight, ShieldCheck } from "lucide-react";

export default function StudentLogin() {
  const [isPending, startTransition] = useTransition();
  const [formData, setFormData] = useState({ code: "", name: "" });
  const [error, setError] = useState<string | null>(null);

  // استخدام useCallback لتحسين الأداء ومنع إعادة التدوير
  const handleAccess = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const { code, name } = formData;
    if (!code.trim() || !name.trim()) {
      setError("Please provide all required security credentials.");
      return;
    }

    startTransition(async () => {
      try {
        const { data, error: supabaseError } = await supabase
          .from("certificates")
          .select("cert_code")
          .eq("cert_code", code.trim())
          .ilike("student_name", `%${name.trim()}%`)
          .maybeSingle(); // أكثر أماناً من select().limit(1)

        if (supabaseError) throw supabaseError;

        if (!data) {
          setError("Verification failed. Invalid credential combination.");
          return;
        }

        localStorage.setItem("active_cert", data.cert_code);
        window.location.href = "/student/dashboard";
        
      } catch (err) {
        console.error("[AUTH_ERROR]:", err);
        setError("Quantum-link established but database refused access.");
      }
    });
  }, [formData]);

  return (
    <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center p-6 selection:bg-rose-100">
      <motion.div 
        initial={{ opacity: 0, y: 30 }} 
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white/80 backdrop-blur-xl rounded-[48px] shadow-[0_40px_80px_-15px_rgba(0,0,0,0.05)] p-12 border border-white"
      >
        <div className="w-24 h-24 bg-gradient-to-br from-rose-50 to-white text-[#d32f2f] rounded-[32px] flex items-center justify-center mx-auto mb-10 shadow-sm border border-rose-100/50">
          <ShieldCheck size={44} strokeWidth={1.5} />
        </div>

        <div className="text-center mb-10">
          <h1 className="text-4xl font-black text-[#003366] tracking-tighter">
            Student <span className="text-[#d32f2f]">Portal</span>
          </h1>
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400 mt-2">
            Secure Verification System v2.6
          </p>
        </div>

        <form onSubmit={handleAccess} className="space-y-7">
          <div className="space-y-2">
            <label className="text-[11px] font-black uppercase text-zinc-400 ml-5">Credential ID</label>
            <div className="relative group">
              <input 
                required 
                type="text" 
                value={formData.code}
                onChange={(e) => setFormData(prev => ({...prev, code: e.target.value}))}
                className="w-full p-6 bg-zinc-50/50 rounded-[28px] outline-none border-2 border-transparent focus:border-rose-100 focus:bg-white transition-all pl-14 font-bold text-zinc-800"
                placeholder="Ex: 123"
              />
              <Hash className="absolute left-6 top-1/2 -translate-y-1/2 text-zinc-300 group-focus-within:text-[#d32f2f] transition-colors" size={20} />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[11px] font-black uppercase text-zinc-400 ml-5">Full Name</label>
            <div className="relative group">
              <input 
                required 
                type="text"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({...prev, name: e.target.value}))}
                className="w-full p-6 bg-zinc-50/50 rounded-[28px] outline-none border-2 border-transparent focus:border-rose-100 focus:bg-white transition-all pl-14 font-bold text-zinc-800"
                placeholder="Enter Full Name"
              />
              <User className="absolute left-6 top-1/2 -translate-y-1/2 text-zinc-300 group-focus-within:text-[#d32f2f] transition-colors" size={20} />
            </div>
          </div>

          <AnimatePresence mode="wait">
            {error && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }} 
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="text-rose-600 text-[11px] font-bold text-center bg-rose-50/50 p-4 rounded-2xl border border-rose-100/50"
              >
                {error}
              </motion.div>
            )}
          </AnimatePresence>

          <button 
            disabled={isPending}
            className="w-full py-6 bg-[#003366] text-white rounded-[28px] font-black uppercase tracking-widest hover:bg-[#d32f2f] transition-all shadow-xl active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-3"
          >
            {isPending ? <Loader2 className="animate-spin" /> : <>Initialize Access <ArrowRight size={20} /></>}
          </button>
        </form>
      </motion.div>
    </div>
  );
}