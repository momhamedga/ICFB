"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, Search, Download, Copy, AlertCircle, Loader2, Check } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { Certificate } from "crypto";

export default function CertificateVerifier() {
  const [certCode, setCertCode] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [result, setResult] = useState<Certificate | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState<boolean>(false);

  // وظيفة لتنسيق التاريخ بشكل احترافي
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  const handleVerify = async (): Promise<void> => {
    const code = certCode.trim();
    if (!code) {
      setError("Please enter a valid certificate code.");
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const { data, error: dbError } = await supabase
        .from("certificates")
        .select("*")
        .eq("cert_code", code)
        .returns<Certificate>() // ضمان نوع البيانات العائدة من Supabase
        .single();

      if (dbError || !data) {
        setError("Invalid code. This certificate is not registered in our records.");
      } else {
        setResult(data);
      }
    } catch (err) {
      setError("Network error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative py-24 px-6 bg-white overflow-hidden min-h-[800px] flex items-center justify-center font-sans">
      {/* Decorative Circles */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-40">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-rose-100 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-50 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto max-w-xl relative z-10">
        {/* Header Section */}
        <div className="text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-rose-50 border border-rose-100 rounded-full mb-8"
          >
            <ShieldCheck className="w-4 h-4 text-[#d32f2f]" />
            <span className="text-[#d32f2f] font-black text-[9px] uppercase tracking-[0.2em]">Official Verification Portal</span>
          </motion.div>
          <h2 className="text-5xl font-black text-zinc-900 tracking-tighter leading-none italic">
            Verify <span className="text-[#d32f2f]">Authenticity</span>
          </h2>
        </div>

        {/* Ultra-Modern Search Bar */}
        <motion.div layout className="bg-white p-3 rounded-[35px] border border-zinc-100 shadow-[0_20px_50px_rgba(0,0,0,0.05)] mb-10 transition-all hover:shadow-[0_25px_60px_rgba(0,0,0,0.1)]">
          <div className="relative flex items-center">
            <Search className="absolute left-6 text-zinc-300" size={22} />
            <input 
              type="text" 
              placeholder="Certificate ID (e.g. 123)"
              value={certCode}
              onChange={(e) => setCertCode(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleVerify()}
              className="w-full pl-16 pr-36 py-6 bg-zinc-50/50 rounded-[28px] outline-none font-bold text-zinc-800 placeholder:text-zinc-300 transition-colors focus:bg-white"
            />
            <button 
              onClick={handleVerify}
              disabled={loading}
              className="absolute right-2 px-10 py-4.5 bg-zinc-900 text-white rounded-[24px] font-black text-[11px] uppercase tracking-widest hover:bg-[#d32f2f] active:scale-95 transition-all shadow-lg disabled:opacity-40"
            >
              {loading ? <Loader2 className="animate-spin" size={18} /> : "Validate"}
            </button>
          </div>
        </motion.div>

        {/* Status & Results */}
        <AnimatePresence mode="wait">
          {error && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-4 p-6 bg-rose-50 border border-rose-100 rounded-[28px] text-rose-700 font-bold text-sm shadow-sm"
            >
              <AlertCircle size={22} className="shrink-0" /> {error}
            </motion.div>
          )}

          {result && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-[#002a54] p-1.5 rounded-[45px] shadow-2xl overflow-hidden"
            >
              <div className="bg-gradient-to-br from-[#003469] to-[#001b3a] p-10 md:p-12 rounded-[40px] border border-white/5 relative">
                {/* Badge Overlay */}
                <div className="absolute -top-4 -right-4 w-32 h-32 bg-white/5 rounded-full blur-3xl" />
                
                <div className="flex justify-between items-start mb-12">
                  <div className="space-y-2">
                    <h4 className="text-rose-400 font-black text-[10px] uppercase tracking-[0.4em]">Credential Found</h4>
                    <p className="text-white text-3xl font-black tracking-tight leading-tight">{result.student_name}</p>
                  </div>
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-14 h-14 bg-emerald-400/20 rounded-full flex items-center justify-center border border-emerald-400/40"
                  >
                    <Check className="text-emerald-400" size={28} />
                  </motion.div>
                </div>

                <div className="grid gap-8 mb-12">
                  <div className="flex flex-col gap-2">
                    <span className="text-white/30 text-[9px] uppercase font-black tracking-[0.3em]">Course/Program</span>
                    <span className="text-white font-bold text-xl leading-snug">{result.course_name}</span>
                  </div>
                  <div className="flex flex-col gap-2">
                    <span className="text-white/30 text-[9px] uppercase font-black tracking-[0.3em]">Issuance Date</span>
                    <span className="text-zinc-200 font-bold">{formatDate(result.issue_date)}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-5">
                  <button 
                    onClick={() => {
                        navigator.clipboard.writeText(result.cert_code);
                        setCopied(true);
                        setTimeout(() => setCopied(false), 2000);
                    }}
                    className="flex items-center justify-center gap-3 py-5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-3xl text-white text-[10px] font-black uppercase tracking-widest transition-all"
                  >
                    {copied ? <Check size={16} className="text-emerald-400" /> : <Copy size={16} />} 
                    {copied ? "Copied" : "Copy ID"}
                  </button>
                  <button 
                    onClick={() => window.open(result.pdf_url, '_blank')}
                    className="flex items-center justify-center gap-3 py-5 bg-[#d32f2f] hover:bg-rose-700 rounded-3xl text-white text-[10px] font-black uppercase tracking-widest transition-all shadow-xl shadow-rose-950/40"
                  >
                    <Download size={16} /> Get PDF
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <p className="text-center mt-14 text-zinc-300 text-[9px] font-black uppercase tracking-[0.5em] opacity-80">
          #AcademyOfCoaching <span className="text-rose-200">|</span> London - Dubai
        </p>
      </div>
    </section>
  );
}