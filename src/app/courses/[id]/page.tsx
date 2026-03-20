import { supabase } from "@/lib/supabase";
import { 
  Calendar, Mail, Phone, Clock, ArrowLeft, 
  ShieldCheck, Zap, Globe 
} from "lucide-react";
import Link from "next/link"; // Next.js Link only
import { notFound } from "next/navigation";

// استخدام النمط الجديد لـ Next 15/16: الـ params عبارة عن Promise
interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function SingleCoursePage({ params }: PageProps) {
  
  // فك الـ Promise قبل الاستخدام لضمان عدم وجود undefined
  const { id } = await params;

  // جلب البيانات من Supabase
  const { data: course, error } = await supabase
    .from("courses") 
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error || !course) return notFound();

  return (
    <main className="min-h-screen bg-[#FDFDFD] pb-20 selection:bg-red-100">
      
      {/* --- Modern Hero --- */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden bg-[#001D3D]">
        <div className="absolute inset-0 opacity-10" 
             style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
        
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#E63946] rounded-full blur-[180px] opacity-20" />

        <div className="relative z-10 max-w-7xl mx-auto w-full px-6 text-center">
          <Link 
            href="/courses" 
            className="group inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white/50 text-[9px] font-black uppercase tracking-[0.3em] mb-12 hover:bg-[#E63946] hover:text-white transition-all"
          >
            <ArrowLeft size={12} className="group-hover:-translate-x-1 transition-transform" /> 
            Back to Catalog
          </Link>

          <h1 className="text-white text-5xl md:text-8xl font-black uppercase tracking-tighter leading-none mb-6">
            {course.title}
          </h1>
          
          <div className="flex justify-center items-center gap-4">
            <div className="h-[1px] w-12 bg-[#E63946]" />
            <span className="text-[#E63946] text-[10px] font-black uppercase tracking-[0.4em]">
              {course.category || "Professional Development"}
            </span>
            <div className="h-[1px] w-12 bg-[#E63946]" />
          </div>
        </div>
      </section>

      {/* --- Floating Stats --- */}
      <div className="max-w-5xl mx-auto px-6 -mt-10 relative z-30">
        <div className="bg-white/90 backdrop-blur-xl border border-gray-100 rounded-[2.5rem] p-8 shadow-2xl shadow-blue-900/5 flex flex-wrap justify-around gap-8">
          <StatBox icon={<Calendar size={18} />} label="Timeline" value={course.start_date ? new Date(course.start_date).toLocaleDateString() : "TBA"} />
          <StatBox icon={<Clock size={18} />} label="Duration" value={`${course.total_hours || 0} Hours`} />
          <StatBox icon={<Globe size={18} />} label="Level" value={course.difficulty_level || "Professional"} />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-24 grid lg:grid-cols-12 gap-20">
        <div className="lg:col-span-8">
          <h2 className="text-2xl font-black text-[#001D3D] uppercase tracking-tight mb-10 flex items-center gap-4">
            <ShieldCheck className="text-[#E63946]" /> Program Overview
          </h2>
          <p className="text-gray-500 text-lg leading-[1.8] whitespace-pre-wrap font-medium">
            {course.description}
          </p>
        </div>

        {/* Sidebar Action - Using Next.js Link for Internal Routing */}
        <div className="lg:col-span-4">
          <div className="bg-[#001D3D] rounded-[3rem] p-10 text-white sticky top-10">
            <p className="text-white/30 text-[9px] font-black uppercase tracking-[0.3em] mb-2">Price</p>
            <h3 className="text-4xl font-black mb-10">{course.price ? `${course.price} AED` : "Contact Us"}</h3>
            
            <Link 
              href={`https://wa.me/${course.whatsapp_link}`}
              className="flex items-center justify-center gap-3 w-full py-6 bg-[#E63946] rounded-2xl font-black uppercase text-[10px] tracking-widest hover:scale-[1.02] transition-transform"
            >
              <Phone size={16} /> Secure Your Spot
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

function StatBox({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) {
  return (
    <div className="flex items-center gap-4">
      <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center text-[#E63946] border border-gray-100">{icon}</div>
      <div>
        <p className="text-[8px] font-black text-gray-400 uppercase tracking-[0.2em]">{label}</p>
        <p className="text-sm font-black text-[#001D3D] uppercase">{value}</p>
      </div>
    </div>
  );
}