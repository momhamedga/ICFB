"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Lock, Mail, Loader2 } from "lucide-react";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

const handleLogin = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);
  setError(null);

  try {
    const { data, error } = await supabase.auth.signInWithPassword({ 
      email, 
      password 
    });

    if (error) {
      // سيظهر لك هنا السبب الحقيقي (مثلاً: Invalid login credentials)
      setError(error.message); 
      setLoading(false);
    } else {
      window.location.href = "/admin"; // استخدام نافذة المتصفح للإجبار على إعادة التحميل
    }
  } catch (err: any) {
    setError("حدث خطأ غير متوقع: " + err.message);
    setLoading(false);
  }
};

  return (
    <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center p-6 font-sans">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md bg-white rounded-[40px] shadow-2xl p-10 border border-zinc-100 text-center">
        <div className="w-16 h-16 bg-[#d32f2f]/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <Lock className="text-[#d32f2f]" size={28} />
        </div>
        <h1 className="text-2xl font-black text-zinc-900 mb-2">Admin Login</h1>
        <p className="text-zinc-400 text-[10px] font-bold uppercase tracking-widest mb-8">ICFB British Academy</p>

        <form onSubmit={handleLogin} className="text-left space-y-5">
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase text-zinc-400 ml-2">Email Address</label>
            <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-4 bg-zinc-50 rounded-2xl border-none focus:ring-2 focus:ring-[#d32f2f]/20 outline-none font-bold text-zinc-800" placeholder="admin@icfb.uk" />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase text-zinc-400 ml-2">Security Key</label>
            <input required type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-4 bg-zinc-50 rounded-2xl border-none focus:ring-2 focus:ring-[#d32f2f]/20 outline-none font-bold text-zinc-800" placeholder="••••••••" />
          </div>

          {error && <p className="text-rose-600 text-[10px] font-bold text-center italic">{error}</p>}

          <button disabled={loading} type="submit" className="w-full py-4 bg-zinc-900 text-white rounded-2xl font-black text-[11px] uppercase tracking-widest hover:bg-[#d32f2f] transition-all shadow-lg active:scale-95 disabled:opacity-50">
            {loading ? <Loader2 className="animate-spin mx-auto" size={18} /> : "Authorize Access"}
          </button>
        </form>
      </motion.div>
    </div>
  );
}