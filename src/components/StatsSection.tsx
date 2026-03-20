"use client";

import { motion } from "framer-motion";
import { Users, ShieldCheck, FileCheck, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { adminService } from "@/services/adminService";

export default function StatsSection() {
  const [certCount, setCertCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    adminService.getCertificatesCount().then(setCertCount).finally(() => setLoading(false));
  }, []);

  return (
    <section className="relative py-32 overflow-hidden bg-[#fafafa]">
      {/* عنصر جمالي خلفي (The "Out of Box" element) */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-red-50/50 to-transparent -z-10" />
      
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* الجانب الأيسر: المحتوى النصي */}
          <div className="lg:col-span-5 relative">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 border border-red-100">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-red-600">Global Reach</span>
              </div>
              
              <h2 className="text-5xl font-black text-[#002b5c] leading-[1.1]">
                The Way <br/> <span className="text-red-600">We Do Things.</span>
              </h2>
              
              <p className="text-zinc-500 text-lg leading-relaxed border-l-4 border-red-600 pl-6 italic">
                "We deliver our courses in a unique way, reflecting our core beliefs of respect, rigour, and professional success."
              </p>
            </motion.div>
          </div>

          {/* الجانب الأيمن: عنصر تفاعلي بديل للصورة */}
          <div className="lg:col-span-7 relative h-[400px] flex items-center justify-center">
            {/* Abstract 3D Shape (Floating Circles) */}
            <motion.div 
              animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="relative w-80 h-80 bg-gradient-to-br from-red-600 to-red-800 rounded-[60px] shadow-[0_40px_80px_-15px_rgba(220,38,38,0.3)] flex items-center justify-center overflow-hidden"
            >
              <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
              <FileCheck size={120} className="text-white/20 absolute -bottom-10 -right-10 rotate-12" />
              <div className="text-center p-8 z-10">
                <div className="text-white/60 text-xs font-bold uppercase tracking-[0.3em] mb-2">Live Verification</div>
                <div className="text-white text-6xl font-black italic">ICFB</div>
              </div>
            </motion.div>

            {/* العدادات بتصميم Floating Glass Cards */}
            <div className="absolute inset-0 grid grid-cols-2 gap-4">
              <StatCard delay={0.2} icon={Users} label="Members" value="1,250" pos="top-0 left-0" />
              <StatCard delay={0.4} icon={ShieldCheck} label="Secured" value="100%" pos="bottom-0 left-10" />
              <StatCard 
                delay={0.6} 
                icon={FileCheck} 
                label="Certified" 
                value={loading ? "..." : certCount.toString()} 
                pos="top-10 right-0" 
                highlight 
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

function StatCard({ icon: Icon, label, value, pos, delay, highlight = false }: any) {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ delay }}
      className={`absolute ${pos} p-6 rounded-[32px] backdrop-blur-xl border flex flex-col items-center justify-center min-w-[160px] shadow-2xl transition-transform hover:-translate-y-2
        ${highlight ? 'bg-white/90 border-red-100 shadow-red-200/20' : 'bg-white/60 border-white/40 shadow-zinc-200/40'}`}
    >
      <div className={`p-3 rounded-2xl mb-3 ${highlight ? 'bg-red-500 text-white' : 'bg-zinc-100 text-zinc-900'}`}>
        <Icon size={20} />
      </div>
      <div className="text-2xl font-black text-zinc-900 leading-none mb-1">{value}</div>
      <div className="text-[9px] font-bold uppercase tracking-tighter text-zinc-400">{label}</div>
    </motion.div>
  );
}