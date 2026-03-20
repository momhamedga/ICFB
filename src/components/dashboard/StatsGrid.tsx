"use client";

import { motion } from "framer-motion";
import { Award, ShieldCheck, Loader2, Download } from "lucide-react";
import { StatCard } from "./StatCard";
import { useState } from "react";
import { generateCertificateAction } from "@/app/actions/certificate";


export const StatsGrid = ({ certData }: { certData: any }) => {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    if (!certData?.cert_code) return;
    
    setIsDownloading(true);
    try {
      const result = await generateCertificateAction(certData.cert_code);
      
      if (result.success && result.url) {
        // فتح الشهادة في صفحة الطباعة
        window.open(result.url, "_blank");
      } else {
        console.error("Download Error:", result.message);
        alert("Unable to generate certificate. Please try again.");
      }
    } catch (err) {
      console.error("System Error:", err);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* كروت الإحصائيات السريعة */}
      <StatCard 
        icon={Award} 
        label="Certificate_ID" 
        value={certData?.cert_code || "---"} 
        color="text-[#003366]" 
      />
      <StatCard 
        icon={ShieldCheck} 
        label="Identity_Status" 
        value="Verified_Member" 
        color="text-emerald-500" 
      />
      
      {/* الكارت الكبير (Main Qualification) */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="md:col-span-2 bg-gradient-to-br from-red-800 to-[#E63946] p-10 rounded-[3rem] shadow-2xl relative overflow-hidden group border border-white/5"
      >
        <div className="relative z-10">
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/60 mb-4">Active_Qualification</p>
          <h2 className="text-3xl md:text-5xl font-black text-white leading-[0.9] tracking-tighter mb-8 group-hover:tracking-normal transition-all duration-500">
            {certData?.course_name || "Professional Sports Science Degree"}
          </h2>
          
          <button 
            onClick={handleDownload}
            disabled={isDownloading}
            className="bg-white text-red-600 px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:scale-105 transition-all active:scale-95 flex items-center gap-3 disabled:opacity-70 disabled:cursor-wait"
          >
            {isDownloading ? (
              <>
                <Loader2 className="animate-spin" size={16} />
                <span>Processing...</span>
              </>
            ) : (
              <>
                <Download size={16} />
                <span>Download Certificate</span>
              </>
            )}
          </button>
        </div>

        {/* أيقونة خلفية جمالية */}
        <Award 
          size={200} 
          className="absolute -bottom-10 -right-10 text-white/5 rotate-12 group-hover:rotate-0 transition-transform duration-700 pointer-events-none" 
        />
      </motion.div>
    </div>
  );
};