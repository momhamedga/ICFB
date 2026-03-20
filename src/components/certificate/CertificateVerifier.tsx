"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Loader2, AlertCircle } from "lucide-react";
import { verifyCertificateAction } from "@/app/actions/certificate";
import { Certificate } from "@/types/certificate";
import { StatusBadge } from "./StatusBadge";
import { CertificateCard } from "./CertificateCard";

export default function CertificateVerifier() {
  const [certCode, setCertCode] = useState<string>("");
  const [result, setResult] = useState<Certificate | null>(null);
  const [error, setError] = useState<string | null>(null);
const [loading, setLoading] = useState<boolean>(false); // استبدلنا isPending بـ loading عادي
const handleVerify = async () => {
    if (!certCode.trim()) return;

    setLoading(true); // بدأنا التحميل
    setError(null);
    setResult(null);

    try {
      const response = await verifyCertificateAction(certCode);

      if (!response.success) {
        setError(response.message || "Invalid credential.");
      } else {
        setResult(response.data || null);
        
        if (response.data?.cert_code) {
          localStorage.setItem("active_cert", response.data.cert_code);
        }
      }
    } catch (err) {
      setError("Connection failed. Please try again.");
    } finally {
      setLoading(false); // قفلنا التحميل
    }
  };
  return (
    <section className="relative py-12 md:py-24 px-4 overflow-hidden min-h-[90vh] flex items-center justify-center">
      {/* Dynamic Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(255,241,242,0.5),transparent_50%)]" />
      </div>

      <div className="w-full max-w-xl relative z-10">
        <div className="text-center mb-12">
          <StatusBadge />
          <h2 className="text-4xl md:text-6xl font-black text-zinc-900 tracking-tighter italic leading-[0.9]">
            Verify <span className="text-primary block md:inline">Authenticity</span>
          </h2>
        </div>

        {/* Input Group - Mobile Optimized */}
        <div className="relative group mb-8">
          <div className="absolute inset-0 bg-rose-200/20 blur-2xl group-focus-within:bg-rose-300/30 transition-all rounded-[35px]" />
          <div className="relative bg-white p-2 md:p-3 rounded-[30px] md:rounded-[35px] border border-zinc-100 shadow-xl flex items-center">
            <Search className="ml-4 text-zinc-300 hidden md:block" size={20} />
            <input 
              type="text"
              placeholder="Certificate ID..."
              value={certCode}
              onChange={(e) => setCertCode(e.target.value)}
              className="flex-1 px-4 md:px-6 py-4 md:py-5 bg-transparent outline-none font-bold text-zinc-800 placeholder:text-zinc-300 text-lg"
            />
            <button 
              onClick={handleVerify}
              disabled={loading}
              className="px-6 md:px-10 py-4 bg-zinc-900 text-white rounded-[22px] md:rounded-[24px] font-black text-[10px] uppercase tracking-widest active:scale-95 disabled:opacity-50 transition-all"
            >
              {loading ? <Loader2 className="animate-spin" size={18} /> : "Check"}
            </button>
          </div>
        </div>

        {/* Results Area */}
        <AnimatePresence mode="wait">
          {error && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-6 bg-rose-50 border border-rose-100 rounded-[25px] flex items-center gap-3 text-rose-700 font-bold shadow-sm"
            >
              <AlertCircle size={20} /> {error}
            </motion.div>
          )}

          {result && <CertificateCard result={result} />}
        </AnimatePresence>

        <footer className="text-center mt-12">
          <p className="text-zinc-300 text-[8px] md:text-[9px] font-black uppercase tracking-[0.4em]">
            Digital Trust Protocol <span className="text-rose-200 px-2">/</span> UAE - UK
          </p>
        </footer>
      </div>
    </section>
  );
}