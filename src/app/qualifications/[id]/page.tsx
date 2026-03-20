import { supabase } from "@/lib/supabase";
import { 
  Clock, Award, CheckCircle2, 
  ArrowLeft, Download, GraduationCap, ShieldCheck, Sparkles,
  Users, BookmarkCheck, Star
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";

const getFullImageUrl = (imagePath: string) => {
  if (!imagePath) return "https://via.placeholder.com/1200x800?text=No+Image";
  if (imagePath.startsWith('http')) return imagePath;
  const PROJECT_ID = "ildjspneaxcpasnnflcu"; 
  const cleanPath = imagePath.replace(/^\/+/, '');
  return `https://${PROJECT_ID}.supabase.co/storage/v1/object/public/qualifications/${cleanPath}`;
};

export default async function QualificationDetails({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const { data: course, error } = await supabase
    .from("qualifications")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !course) return notFound();

  return (
    <main className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-[100] bg-white/80 backdrop-blur-xl border-b border-zinc-100 px-6 py-5">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link href="/qualifications" className="text-zinc-900 flex items-center gap-3 font-black text-[10px] uppercase tracking-[0.2em] group">
            <div className="w-8 h-8 rounded-full bg-zinc-50 flex items-center justify-center group-hover:bg-[#ef4444] group-hover:text-white transition-all">
               <ArrowLeft size={16} />
            </div>
            Back to Programs
          </Link>
          <div className="hidden md:block px-4 py-1 bg-zinc-100 rounded-full text-zinc-500 text-[9px] font-black uppercase tracking-[0.2em]">
            Elite Academic Portal
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-48 pb-32 bg-[#002d5b] px-6 overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#ef4444]/10 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-10">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-md border border-white/10 text-[#ef4444] text-[10px] font-black uppercase tracking-[0.3em] rounded-full">
                <Sparkles size={14} /> {course.category}
              </div>
              <h1 className="text-5xl md:text-7xl font-black text-white leading-[1.1] tracking-tighter">
                {course.title}
              </h1>
              <div className="flex flex-wrap gap-8 border-t border-white/10 pt-10">
                <StatItem icon={<Clock />} label="Duration" value={course.duration} />
                <StatItem icon={<Award />} label="Level" value={`Level ${course.level}`} />
                <StatItem icon={<BookmarkCheck />} label="Accreditation" value={course.accreditation || "ILM Approved"} />
              </div>
            </div>
            <div className="relative aspect-[4/3] rounded-[3rem] overflow-hidden shadow-2xl border border-white/10">
              <Image src={getFullImageUrl(course.image_url)} alt={course.title} fill className="object-cover" priority unoptimized />
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-16">
          <div className="lg:col-span-8 space-y-24">
            
            {/* Overview & Aimed At */}
            <div className="space-y-12">
              <SectionHeading icon={<GraduationCap />} title="Program Overview" />
              <p className="text-zinc-500 text-xl leading-relaxed font-medium">{course.overview}</p>
              
              <div className="p-8 bg-zinc-50 rounded-[2.5rem] border border-zinc-100 space-y-4">
                <h4 className="flex items-center gap-2 text-zinc-900 font-black uppercase text-xs tracking-widest">
                  <Users size={18} className="text-[#ef4444]" /> Aimed At
                </h4>
                <p className="text-zinc-600 font-bold leading-relaxed">
                  {course.aimed_at || "Professional coaches and those wishing to lead coaching in an organisation."}
                </p>
              </div>
            </div>

            {/* Requirements */}
            {course.requirements?.length > 0 && (
              <div className="space-y-12">
                <SectionHeading icon={<CheckCircle2 />} title="Entry Requirements" color="text-emerald-500" />
                <div className="grid md:grid-cols-2 gap-4">
                  {course.requirements.map((req: string, i: number) => (
                    <div key={i} className="p-6 bg-white border border-zinc-100 rounded-3xl flex gap-4 items-start hover:border-[#ef4444]/20 transition-colors">
                      <div className="w-2 h-2 rounded-full bg-[#ef4444] mt-2 shrink-0" />
                      <p className="text-zinc-600 font-bold text-sm leading-relaxed">{req}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Why the ILM? Section */}
            <div className="space-y-12">
               <SectionHeading icon={<ShieldCheck />} title="Why the ILM?" />
               <div className="grid md:grid-cols-3 gap-6">
                  <FeatureCard title="Global Standard" desc="Recognised worldwide as a leader in coaching qualifications." />
                  <FeatureCard title="Elite Network" desc="Join thousands of professional leaders across the globe." />
                  <FeatureCard title="Proven Impact" desc="Curriculum designed for immediate workplace application." />
               </div>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-4">
            <div className="sticky top-32 space-y-6">
              <div className="bg-[#002d5b] rounded-[2.5rem] p-10 text-white relative overflow-hidden">
                <div className="relative z-10 space-y-8">
                  <div className="space-y-2">
                    <p className="text-[#ef4444] font-black text-[10px] uppercase tracking-widest">Ready to advance?</p>
                    <h4 className="text-2xl font-black">Join the Next Cohort</h4>
                  </div>
                  <div className="space-y-3">
                    <div>
                           <Link href={"/contact"}>       <button className="w-full py-5 bg-[#ef4444] text-white rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-white hover:text-[#002d5b] transition-all">
                      Apply Online Now
                    </button></Link>
        </div>
                    <button className="w-full py-5 bg-white/10 border border-white/10 text-white rounded-2xl font-black uppercase tracking-widest text-[10px] flex items-center justify-center gap-3">
                      <Download size={16} /> Brochure
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}

// Components الصغيرة عشان الكود يكون نظيف
function StatItem({ icon, label, value }: { icon: any, label: string, value: string }) {
  return (
    <div className="flex items-center gap-4">
      <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 text-[#ef4444]">
        {icon}
      </div>
      <div>
        <p className="text-white/40 text-[9px] font-black uppercase tracking-widest">{label}</p>
        <p className="text-white font-bold text-lg">{value}</p>
      </div>
    </div>
  );
}

function SectionHeading({ icon, title, color = "text-[#ef4444]" }: { icon: any, title: string, color?: string }) {
  return (
    <div className="flex items-center gap-4">
      <div className={`p-3 bg-zinc-50 rounded-2xl ${color}`}>
        {icon}
      </div>
      <h2 className="text-3xl font-black text-zinc-900 tracking-tight">{title}</h2>
    </div>
  );
}

function FeatureCard({ title, desc }: { title: string, desc: string }) {
  return (
    <div className="p-8 bg-[#fafafa] rounded-[2rem] border border-zinc-100 hover:bg-white hover:shadow-xl transition-all">
      <Star className="text-[#ef4444] mb-4" size={20} />
      <h5 className="font-black text-zinc-900 mb-2">{title}</h5>
      <p className="text-zinc-500 text-xs font-medium leading-relaxed">{desc}</p>
    </div>
  );
}