"use client";

import { supabase } from "@/lib/supabase";
import { LogOut, ShieldCheck, Database } from "lucide-react";
import CertificateForm from "@/components/admin/CertificateForm";
import { motion } from "framer-motion";
import Link from "next/link";

export default function RecordsClient() {
  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/admin/login";
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] p-8 md:p-12 font-sans">
      <div className="max-w-5xl mx-auto">
        {/* باقي كود الـ UI الجميل بتاعك زي ما هو... */}
        <header className="mb-12 flex justify-between items-center">
          <Link href="/admin" className="flex items-center gap-2 text-zinc-400 hover:text-zinc-900 transition-all font-bold text-xs uppercase tracking-widest">
            ← Back to Terminal
          </Link>
          <button onClick={handleLogout} className="text-zinc-400 hover:text-red-600 transition-colors">
            <LogOut size={18} />
          </button>
        </header>

        <div className="mb-10">
          <h1 className="text-3xl font-black text-zinc-900 tracking-tight flex items-center gap-3">
            Admin <span className="text-[#d32f2f]">Centre</span>
          </h1>
          <p className="text-zinc-400 text-[10px] font-black uppercase tracking-[0.2em] mt-1">
            Credential Issuance & Records Library
          </p>
        </div>

        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-[40px] border border-zinc-100 shadow-xl p-10 mb-12"
        >
          <div className="flex items-center gap-3 mb-8 border-b border-zinc-50 pb-6">
            <div className="w-10 h-10 bg-red-50 text-[#d32f2f] rounded-xl flex items-center justify-center">
              <ShieldCheck size={20} />
            </div>
            <h2 className="font-black text-zinc-800 uppercase tracking-wider text-sm">New Authorisation</h2>
          </div>
          <CertificateForm />
        </motion.section>

        <section>
          {/* Records Library UI ... */}
          <div className="flex items-center justify-between mb-8 px-4">
             <div className="flex items-center gap-3">
                <Database size={18} className="text-zinc-400" />
                <h2 className="font-black text-zinc-800 uppercase tracking-wider text-sm">Records Library</h2>
             </div>
             <span className="bg-zinc-100 px-3 py-1 rounded-full text-[10px] font-black text-zinc-500">TOTAL: 3</span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
             <div className="bg-white p-6 rounded-[30px] border border-zinc-100 shadow-sm hover:shadow-md transition-all">
                <p className="text-[10px] font-black text-zinc-400 uppercase mb-4">Student</p>
                <h3 className="font-bold text-zinc-900 mb-1">Mohamed Developer</h3>
                <p className="text-[10px] font-medium text-zinc-400">ID: #12345 | 11/03/2026</p>
             </div>
          </div>
        </section>
      </div>
    </div>
  );
}