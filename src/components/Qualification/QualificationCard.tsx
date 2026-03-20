"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Clock, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { memo } from "react";

const getFullImageUrl = (imagePath: string) => {
  if (!imagePath) return "https://via.placeholder.com/800x600?text=No+Image";
  if (imagePath.startsWith('http')) return imagePath;
  const PROJECT_ID = "ildjspneaxcpasnnflcu";
  const cleanPath = imagePath.replace(/^\/+/, '');
  return `https://${PROJECT_ID}.supabase.co/storage/v1/object/public/qualifications/${cleanPath}`;
};

const QualificationCard = ({ course, index }: { course: any, index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="group relative bg-white rounded-[2.5rem] overflow-hidden border border-zinc-100 shadow-[0_10px_30px_-15px_rgba(0,0,0,0.05)] hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.1)] transition-all duration-700 active:scale-[0.98] md:active:scale-100"
    >
      {/* Image Container with Cinematic Overlay */}
      <div className="relative h-[300px] md:h-[320px] w-full overflow-hidden">
        <Image 
          src={getFullImageUrl(course.image_url)} 
          alt={course.title}
          fill
          className="object-cover transition-transform duration-[1.5s] cubic-bezier(0.16, 1, 0.3, 1) group-hover:scale-110"
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#002a54] via-[#002a54]/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />
        
        {/* Badge - Ultra Modern */}
        {course.badge && (
          <div className="absolute top-6 left-6 z-20">
            <div className="bg-white/10 backdrop-blur-md border border-white/20 px-4 py-1.5 rounded-full">
              <span className="text-[9px] font-black uppercase tracking-[0.2em] text-white">{course.badge}</span>
            </div>
          </div>
        )}

        {/* Card Actions Overlay */}
        <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end z-20">
          <div className="space-y-3">
            <div className="flex gap-2">
              <div className="flex items-center gap-1.5 bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10">
                <Users size={12} className="text-red-500" />
                <span className="text-[10px] font-black text-white uppercase tracking-tighter">850+ Elite</span>
              </div>
              <div className="flex items-center gap-1.5 bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10">
                <Clock size={12} className="text-red-500" />
                <span className="text-[10px] font-black text-white uppercase tracking-tighter">{course.duration}</span>
              </div>
            </div>
          </div>
          
          <Link 
            href={`/qualifications/${course.id}`}
            className="w-12 h-12 bg-red-600 text-white rounded-2xl flex items-center justify-center shadow-xl shadow-red-600/30 hover:bg-white hover:text-red-600 transition-all duration-500 group/btn"
          >
            <ArrowUpRight size={22} className="group-hover/btn:rotate-45 transition-transform duration-500" />
          </Link>
        </div>
      </div>

      {/* Content Area */}
      <div className="p-8 md:p-10 bg-white space-y-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-[1px] bg-red-600" />
          <span className="text-red-600 font-black text-[10px] uppercase tracking-[0.3em]">{course.category}</span>
        </div>
        <h3 className="text-2xl md:text-3xl font-black text-[#002a54] leading-[1.1] tracking-tight group-hover:text-red-600 transition-colors duration-500 line-clamp-2 italic uppercase">
          {course.title}
        </h3>
      </div>
    </motion.div>
  );
};

export default memo(QualificationCard);