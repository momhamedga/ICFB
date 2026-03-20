import { supabase } from "@/lib/supabase";
import { Sparkles } from "lucide-react";
import QualificationsClientContent from "./QualificationsClientContent";
import * as motion from "framer-motion/client"; // إذا كنت تستخدم Next.js 15/14 وتدعم Client Motion في الـ Server Components

export const revalidate = 0;

export default async function QualificationsPage() {
  const { data: courses, error } = await supabase
    .from("qualifications")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) console.error("Database Error:", error);

  return (
    <main className="min-h-screen bg-[#FDFDFD] selection:bg-red-100">
      
      {/* --- Master Hero Section (Identical to Services & Coaching) --- */}
      <section className="relative h-[45vh] md:h-[55vh] flex items-center justify-center overflow-hidden bg-[#003366]">
        <div className="absolute inset-0">
          {/* Animated Red Glow */}
          <div 
            className="absolute -top-20 -left-20 w-96 h-96 bg-[#E63946] rounded-full blur-[120px] opacity-40 animate-pulse" 
            style={{ animationDuration: '8s' }}
          />
          
          {/* Carbon Fibre Pattern Overlay */}
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20 pointer-events-none" />
          
          {/* Subtle White Glow for Depth */}
          <div className="absolute bottom-0 right-0 w-[40%] h-[40%] bg-blue-400/10 blur-[100px]" />
        </div>

        <div className="max-w-7xl mx-auto text-center relative z-10 px-4">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-8">
            <Sparkles className="text-[#E63946]" size={14} />
            <span className="text-white/80 text-[10px] font-black uppercase tracking-[0.4em]">
              Global Excellence
            </span>
          </div>
          
          <h1 className="text-6xl md:text-[9rem] font-black text-white leading-none tracking-tighter uppercase">
            Qualifica<span className="text-[#E63946]">tions</span>
          </h1>
          
          <p className="max-w-2xl mx-auto text-white/50 font-bold text-xs md:text-sm uppercase tracking-[0.5em] mt-6">
            Elevating Professional Standards
          </p>
        </div>
      </section>

      {/* --- Grid Content Section --- */}
      <div className="relative -mt-16 z-30 px-4 md:px-8 pb-32">
        <div className="max-w-7xl mx-auto">
          {/* هذا المكون سيتولى عرض الكروت بنفس ستايل الـ Services الذي صممناه */}
          <QualificationsClientContent initialData={courses || []} />
        </div>
      </div>
    </main>
  );
}