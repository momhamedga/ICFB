"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { motion } from "framer-motion";
// تأكد من وجود Loader2 هنا
import { Award, LogOut, CheckCircle2, Download, Loader2, User } from "lucide-react";

// تعريف الواجهة لضمان النوع (Type Safety)
interface CertificateData {
  cert_code: string;
  student_name: string;
  course_name?: string;
  created_at: string;
}

export default function StudentDashboard() {
  const [certData, setCertData] = useState<CertificateData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  const handleLogout = useCallback(() => {
    localStorage.removeItem("active_cert");
    router.replace("/student/login");
  }, [router]);

  useEffect(() => {
    const fetchSession = async () => {
      const code = localStorage.getItem("active_cert");
      if (!code) return handleLogout();

      try {
        const { data, error } = await supabase
          .from("certificates")
          .select("cert_code, student_name, course_name, created_at")
          .eq("cert_code", code)
          .single();

        if (error || !data) throw error;
        setCertData(data);
      } catch (err) {
        console.error("Dashboard Auth Error:", err);
        handleLogout();
      } finally {
        setLoading(false);
      }
    };

    fetchSession();
  }, [handleLogout]);

  // استخدام Loader2 هنا بشكل آمن
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#f8fafc]">
        <Loader2 className="animate-spin text-[#d32f2f] mb-4" size={40} />
        <p className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-400">
          Verifying Session
        </p>
      </div>
    );
  }

  if (!certData) return null;

  return (
    <div className="min-h-screen bg-[#f8fafc] p-6 lg:p-12">
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto bg-white rounded-[40px] shadow-sm border border-zinc-100 p-10"
      >
        <div className="flex justify-between items-start mb-12">
          <div>
            <h1 className="text-3xl font-black text-zinc-900 tracking-tight">
              Welcome, <span className="text-[#d32f2f]">{certData.student_name}</span>
            </h1>
            <p className="text-zinc-400 font-medium mt-1 text-sm">Your credentials are secured.</p>
          </div>
          <button 
            onClick={handleLogout}
            className="p-4 bg-zinc-50 text-zinc-400 rounded-2xl hover:bg-rose-50 hover:text-rose-600 transition-all"
          >
            <LogOut size={20} />
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-zinc-50/50 rounded-[32px] p-8 border border-zinc-100">
            <Award className="text-[#d32f2f] mb-4" size={32} />
            <p className="text-[10px] font-black uppercase text-zinc-400 tracking-widest">Code</p>
            <p className="text-xl font-bold text-zinc-800">{certData.cert_code}</p>
          </div>
          <div className="bg-zinc-50/50 rounded-[32px] p-8 border border-zinc-100">
            <CheckCircle2 className="text-green-500 mb-4" size={32} />
            <p className="text-[10px] font-black uppercase text-zinc-400 tracking-widest">Status</p>
            <p className="text-xl font-bold text-zinc-800">Verified</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}