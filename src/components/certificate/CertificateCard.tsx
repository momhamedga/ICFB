"use client";

import { motion } from "framer-motion";
import { Check, Copy, Download, ExternalLink } from "lucide-react";
import { useState } from "react";
import { Certificate } from "@/types/certificate";

interface CardProps {
  result: Certificate;
}

export const CertificateCard = ({ result }: CardProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(result.cert_code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const formatDate = (date?: string) => {
    if (!date) return "N/A";
    return new Date(date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: 10 }}
      className="relative group mt-8"
    >
      {/* Neon Glow Effect (Backdrop) */}
      <div className="absolute -inset-1 bg-gradient-to-r from-rose-500 to-blue-600 rounded-[40px] blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200" />

      {/* Main Glass Card */}
      <div className="relative bg-white/80 backdrop-blur-2xl border border-white/20 rounded-[35px] overflow-hidden shadow-2xl">
        
        {/* Top Accent Bar */}
        <div className="h-2 w-full bg-gradient-to-r from-[#d32f2f] via-rose-400 to-blue-500" />

        <div className="p-8 md:p-10">
          <div className="flex justify-between items-start mb-10">
            <div className="space-y-1">
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-rose-500">Verified Graduate</span>
              <h3 className="text-3xl md:text-4xl font-black text-zinc-900 tracking-tight leading-none">
                {result.student_name}
              </h3>
            </div>
            
            {/* Animated Success Badge */}
            <motion.div 
              initial={{ rotate: -45, scale: 0 }}
              animate={{ rotate: 0, scale: 1 }}
              className="w-12 h-12 bg-emerald-500/10 rounded-full flex items-center justify-center border border-emerald-500/20"
            >
              <Check className="text-emerald-500" size={24} />
            </motion.div>
          </div>

          {/* Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
            <div className="space-y-1.5">
              <p className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest">Program & Course</p>
              <p className="text-zinc-800 font-bold text-lg leading-tight">{result.course_name}</p>
            </div>
            <div className="space-y-1.5 md:text-right">
              <p className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest">Date of Issue</p>
              <p className="text-zinc-800 font-bold text-lg">{formatDate(result.issue_date)}</p>
            </div>
          </div>

          {/* Action Buttons - Mobile Optimized Stack */}
          <div className="flex flex-col md:flex-row gap-4">
            <button
              onClick={handleCopy}
              className="flex-1 flex items-center justify-center gap-3 py-4 bg-zinc-50 hover:bg-zinc-100 rounded-2xl text-zinc-600 text-[10px] font-black uppercase tracking-widest transition-all border border-zinc-200/50"
            >
              {copied ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
              {copied ? "ID Copied" : `ID: ${result.cert_code}`}
            </button>
            
            <button
              onClick={() => window.open(result.pdf_url, "_blank")}
              className="flex-1 flex items-center justify-center gap-3 py-4 bg-zinc-900 hover:bg-[#d32f2f] rounded-2xl text-white text-[10px] font-black uppercase tracking-widest transition-all shadow-xl shadow-zinc-200"
            >
              <Download size={14} /> Download PDF
            </button>
          </div>
        </div>

        {/* Bottom Decorative Pattern */}
        <div className="absolute bottom-0 right-0 p-4 opacity-5">
           <ExternalLink size={80} className="-rotate-12" />
        </div>
      </div>
    </motion.div>
  );
};