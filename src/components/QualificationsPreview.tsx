"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Clock, Users, Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface Qualification {
  id: string | number;
  title: string;
  category: string;
  students?: string;
  duration: string;
  image_url: string;
  badge?: string;
}

export default function QualificationsPreview({ 
  data, 
  initialData 
}: { 
  data?: Qualification[], 
  initialData?: Qualification[] 
}) {
  
  const displayCourses = data?.length ? data : (initialData?.length ? initialData : []);
  const hasData = displayCourses.length > 0;

const getFullImageUrl = (imagePath: string) => {
  if (!imagePath) return "https://via.placeholder.com/800x600?text=No+Image";
  if (imagePath.startsWith('http')) return imagePath;

  const PROJECT_ID = "ildjspneaxcpasnnflcu"; // الـ ID بتاعك
  const cleanPath = imagePath.replace(/^\/+/, '');
  return `https://${PROJECT_ID}.supabase.co/storage/v1/object/public/qualifications/${cleanPath}`;
};

  return (
    <section className="relative py-24 px-6 md:px-20 bg-[#fafafa] overflow-hidden">
      {/* حل مشكلة الـ 404: خلفية شبكية كود CSS بدلاً من ملف SVG مفقود */}
      <div 
        className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" 
        style={{
          backgroundImage: `radial-gradient(#000 1px, transparent 1px)`,
          backgroundSize: '30px 30px'
        }} 
      />

      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="text-center mb-16">
          <motion.span initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="text-[#d32f2f] font-black text-[10px] uppercase tracking-[0.4em] mb-4 block">
            Elite Qualifications
          </motion.span>
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} className="text-4xl md:text-6xl font-black text-zinc-900 tracking-tighter mb-6">
            What We <span className="text-[#d32f2f]">Provide</span>
          </motion.h2>
        </div>

        {!hasData ? (
          <div className="flex flex-col items-center justify-center py-20 bg-white rounded-[32px] border-2 border-dashed border-zinc-200">
            <Loader2 className="w-10 h-10 text-zinc-300 animate-spin mb-4" />
            <p className="text-zinc-500 font-bold uppercase tracking-widest text-xs">Waiting for data...</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {displayCourses.slice(0, 3).map((course, index) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group bg-white rounded-[32px] overflow-hidden shadow-xl border border-zinc-100"
              >
                <div className="relative h-[280px] w-full bg-zinc-200">
                  <Image 
                    src={getFullImageUrl(course.image_url)} 
                    alt={course.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-90" />
                  
                  {course.badge && (
                    <div className="absolute top-5 left-5 bg-white px-4 py-1.5 rounded-full z-20">
                      <span className="text-[10px] font-black uppercase text-[#d32f2f]">{course.badge}</span>
                    </div>
                  )}

                  <div className="absolute bottom-5 left-5 right-5 flex justify-between items-center text-white z-20">
                    <div className="flex gap-4">
                      <div className="flex items-center gap-1.5 bg-black/20 backdrop-blur-sm px-2 py-1 rounded-lg">
                        <Users size={14} className="text-[#d32f2f]" />
                        <span className="text-xs font-bold">850+</span>
                      </div>
                      <div className="flex items-center gap-1.5 bg-black/20 backdrop-blur-sm px-2 py-1 rounded-lg">
                        <Clock size={14} className="text-[#d32f2f]" />
                        <span className="text-xs font-bold">{course.duration}</span>
                      </div>
                    </div>
               <Link 
  href={`/qualifications/${course.id}`} // ده المسار اللي هيروح لصفحة التفاصيل
  className="w-10 h-10 bg-[#d32f2f] rounded-full flex items-center justify-center hover:scale-110 transition-transform"
>
  <ArrowUpRight size={20} />
</Link>
                  </div>
                </div>

                <div className="p-8">
                  <span className="text-[#d32f2f] font-black text-[10px] uppercase tracking-widest mb-3 block">{course.category}</span>
                  <h3 className="text-xl font-black text-zinc-900 group-hover:text-[#d32f2f] transition-colors line-clamp-2">{course.title}</h3>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        <div className="flex justify-center">
          <Link href="/qualifications" className="group px-12 py-5 bg-[#d32f2f] text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-zinc-900 transition-all flex items-center gap-4">
            Explore All
            <ArrowUpRight size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}