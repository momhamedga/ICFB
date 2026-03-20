"use client";

import { supabase } from "@/lib/supabase";
import { motion } from "framer-motion";
import { PlusCircle, ShieldCheck, LogOut, LayoutGrid, GraduationCap } from "lucide-react";
import Link from "next/link";

export default function UnifiedAdminDashboard() {
  // دالة تسجيل الخروج الخاصة بك
  const handleLogout = async (): Promise<void> => {
    try {
      await supabase.auth.signOut();
      window.location.href = "/admin/login";
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <div className="min-h-screen bg-[#fafafa] p-8 md:p-16 font-sans text-zinc-900">
      <div className="max-w-6xl mx-auto">
        
        {/* Header - الموحد لكل الإدارة */}
        <header className="mb-16 flex justify-between items-center">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <h1 className="text-4xl font-black tracking-tighter">
              ICFB <span className="text-[#d32f2f]">Terminal</span>
            </h1>
            <p className="text-zinc-400 text-[10px] font-black uppercase tracking-[0.3em] mt-1">
              Central Management Interface
            </p>
          </motion.div>

          <motion.button 
            onClick={handleLogout}
            className="group flex items-center gap-3 px-8 py-4 bg-white border border-zinc-200 text-zinc-600 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-zinc-900 hover:text-white transition-all shadow-sm active:scale-95"
          >
            <LogOut size={14} />
            Secure Logout
          </motion.button>
        </header>

        {/* Grid - هنا نضع البطاقتين جنباً إلى جنب */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* البطاقة الأولى: إضافة المؤهلات (Module Management) */}
          <Link href="/admin/qualifications/add">
            <motion.div 
              whileHover={{ y: -10 }}
              className="group bg-white p-10 rounded-[45px] border border-zinc-100 shadow-[0_20px_50px_rgba(0,0,0,0.02)] hover:shadow-2xl transition-all cursor-pointer relative overflow-hidden h-full"
            >
              <div className="w-16 h-16 bg-[#d32f2f] text-white rounded-2xl flex items-center justify-center mb-8 shadow-xl shadow-red-100">
                <PlusCircle size={32} />
              </div>
              <h3 className="text-2xl font-black mb-3">Add Qualification</h3>
              <p className="text-zinc-500 text-sm leading-relaxed font-medium">
                Create and configure new ILM accredited modules, course requirements, and curriculum structures.
              </p>
              <div className="mt-8 flex items-center gap-2 text-[#d32f2f] font-black text-[10px] uppercase tracking-widest">
                Access Module Builder →
              </div>
            </motion.div>
          </Link>

          {/* البطاقة الثانية: مركز شهادات الطلاب (Admin Centre) */}
          <Link href="/admin/records">
            <motion.div 
              whileHover={{ y: -10 }}
              className="group bg-white p-10 rounded-[45px] border border-zinc-100 shadow-[0_20px_50px_rgba(0,0,0,0.02)] hover:shadow-2xl transition-all cursor-pointer relative overflow-hidden h-full"
            >
              <div className="w-16 h-16 bg-[#d32f2f] text-white rounded-2xl flex items-center justify-center mb-8 shadow-xl shadow-zinc-200">
                <ShieldCheck size={32} />
              </div>
              <h3 className="text-2xl font-black mb-3">Admin Centre</h3>
              <p className="text-zinc-500 text-sm leading-relaxed font-medium">
                Issue student credentials, manage the secure records library, and authorize PDF certificates.
              </p>
              <div className="mt-8 flex items-center gap-2 text-zinc-900 font-black text-[10px] uppercase tracking-widest">
                Open Credential Manager →
              </div>
            </motion.div>
          </Link>
          {/* البطاقة الثالثة: مركز كورسات الطلاب (Admin Centre) */}
          <Link href="/admin/courses/add">
            <motion.div 
              whileHover={{ y: -10 }}
              className="group bg-white p-10 rounded-[45px] border border-zinc-100 shadow-[0_20px_50px_rgba(0,0,0,0.02)] hover:shadow-2xl transition-all cursor-pointer relative overflow-hidden h-full"
            >
              <div className="w-16 h-16 bg-[#d32f2f] text-white rounded-2xl flex items-center justify-center mb-8 shadow-xl shadow-zinc-200">
                <GraduationCap size={32} />
              </div>
              <h3 className="text-2xl font-black mb-3 capitalize">courses Centre</h3>
              <p className="text-zinc-500 text-sm leading-relaxed font-medium">
Create and Edit  courses.
              </p>
              <div className="mt-8 flex items-center gap-2 text-zinc-900 font-black text-[10px] uppercase tracking-widest">
                Open courses Manager →
              </div>
            </motion.div>
          </Link>
          {/* البطاقة الرابعة: مركز كورسات الطلاب (Admin Centre) */}
          <Link href="/admin/events">
            <motion.div 
              whileHover={{ y: -10 }}
              className="group bg-white p-10 rounded-[45px] border border-zinc-100 shadow-[0_20px_50px_rgba(0,0,0,0.02)] hover:shadow-2xl transition-all cursor-pointer relative overflow-hidden h-full"
            >
              <div className="w-16 h-16 bg-[#d32f2f] text-white rounded-2xl flex items-center justify-center mb-8 shadow-xl shadow-zinc-200">
                <GraduationCap size={32} />
              </div>
              <h3 className="text-2xl font-black mb-3 capitalize">Events Centre</h3>
              <p className="text-zinc-500 text-sm leading-relaxed font-medium">
Create and Edit  Events.
              </p>
              <div className="mt-8 flex items-center gap-2 text-zinc-900 font-black text-[10px] uppercase tracking-widest">
                Open Events Manager →
              </div>
            </motion.div>
          </Link>

        </div>

        {/* Footer Info */}
        <footer className="mt-20 text-center">
           <div className="inline-flex items-center gap-2 px-6 py-3 bg-zinc-100 rounded-full text-[9px] font-black uppercase tracking-widest text-zinc-400">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Terminal Status: Fully Operational
           </div>
        </footer>
      </div>
    </div>
  );
}