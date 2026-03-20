"use client";
import { motion } from "framer-motion";
import { Clock, Award, ChevronRight, GraduationCap } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { memo } from "react";

export const CourseCard = memo(({ item, index }: { item: any, index: number }) => (
  <motion.div
    layout
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.05 }}
    // استخدام ظل "System Deep" للبروز فوق الخلفية البيضاء
    className="group relative bg-white border border-slate-100/80 rounded-[3rem] overflow-hidden shadow-[0_30px_60px_-15px_rgba(0,27,58,0.08)] hover:shadow-[0_50px_80px_-20px_rgba(0,27,58,0.15)] transition-all duration-700"
  >
    {/* Image Section */}
    <div className="relative aspect-[16/11] overflow-hidden bg-[#003366]">
      <Image 
        src={item.image_url} 
        alt={item.title} 
        fill 
        sizes="(max-width: 768px) 100vw, 33vw"
        className="object-cover opacity-90 grayscale-[0.2] group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105" 
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#003366] via-transparent to-transparent opacity-70" />
      
      {/* Badge: ستايل كبسولة أحمر صريح */}
      <div className="absolute top-7 left-7 px-5 py-2 bg-[#ef4444] rounded-full text-white text-[8px] font-black uppercase tracking-[0.2em] shadow-lg">
        {item.category}
      </div>
    </div>

    {/* Content Section */}
    <div className="p-10 space-y-6">
      <div className="flex items-center gap-6 text-slate-400 text-[10px] font-black uppercase tracking-widest">
        <span className="flex items-center gap-2.5"><Clock size={14} className="text-[#ef4444]" /> {item.duration}</span>
        <span className="flex items-center gap-2.5"><Award size={14} className="text-[#ef4444]" /> LVL {item.level}</span>
      </div>

      <h3 className="text-2xl font-black text-[#003366] leading-[1.2] tracking-tight line-clamp-2 min-h-[3.5rem] group-hover:text-[#ef4444] transition-colors">
        {item.title}
      </h3>

      <div className="pt-8 flex items-center justify-between border-t border-slate-50">
        <Link href={`/qualifications/${item.id}`} 
              className="flex items-center gap-4 text-[#003366] text-[10px] font-black uppercase tracking-[0.2em] group/link">
          <span className="relative">
            Explore_Program
            <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-[#ef4444] transition-all duration-500 group-hover/link:w-full" />
          </span>
          <div className="w-11 h-11 rounded-full bg-slate-50 flex items-center justify-center group-hover/link:bg-[#003366] group-hover/link:text-white transition-all duration-500 shadow-sm">
            <ChevronRight size={18} strokeWidth={3} />
          </div>
        </Link>
        <GraduationCap size={32} className="text-[#003366]/5 group-hover:text-[#ef4444]/10 transition-colors" />
      </div>
    </div>
  </motion.div>
));

CourseCard.displayName = "CourseCard";