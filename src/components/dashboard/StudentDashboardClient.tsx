"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { motion } from "framer-motion";
import { DashboardHeader } from "./DashboardHeader";
import { StatsGrid } from "./StatsGrid";
import { LoadingState } from "./LoadingState";
import { SidebarInfo } from "./SidebarInfo";

export default function StudentDashboardClient() {
  const [certData, setCertData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
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
        handleLogout();
      } finally {
        setLoading(false);
      }
    };
    fetchSession();
  }, [handleLogout]);

  if (loading) return <LoadingState />;
  if (!certData) return null;

  return (
    // 🌌 الخلفية البيضاء مع الشبكة (Grid Pattern)
    // الشبكة عملناها بـ CSS Gradient بسيط بس "Faint" جداً عشان تدي احترافية
    <div className="min-h-screen  text-[#003366] overflow-hidden relative"
         style={{
           backgroundImage: `linear-gradient(#f1f5f9 1px, transparent 1px), linear-gradient(90deg, #f1f5f9 1px, transparent 1px)`,
           backgroundSize: '32px 32px'
         }}
    >
      
      {/* 🔴 الإضاءة الخلفية (Light Pattern) */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-600/5 blur-[150px] rounded-full pointer-events-none" />
      
      {/* 📱 الـ Container مهتم بالموبيل (px-4 على الموبيل و px-12 على الديسكتوب) */}
      <div className="container mx-auto max-w-7xl px-4 md:px-12 py-10 md:py-16 relative z-10">
        
        {/* --- Header Section --- */}
        {/* المكون ده لازم يتعدل جوه ملفه عشان الألوان تليق على الخلفية البيضاء */}
        <DashboardHeader 
          studentName={certData.student_name} 
          onLogout={handleLogout} 
        />

        {/* --- Main Dashboard Grid --- */}
        {/* الفصل مهتم جداً بالموبيل (gap-6) وتوزيع الـ Columns (lg:grid-cols-3) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-10">
          
          {/* الكروت الرئيسية (بتشغل 2/3 من المساحة على الشاشات الكبيرة) */}
          <StatsGrid certData={certData} />
          
          {/* الـ Sidebar (بيشغل 1/3 من المساحة) */}
          <SidebarInfo certData={certData} />
          
        </div>
        
      </div>
    </div>
  );
}