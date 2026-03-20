"use client";
import * as motion from "framer-motion/client";
import Link from "next/link";
import Image from "next/image";
import { Calendar, Users, ArrowUpRight, Zap } from "lucide-react";

export default function CourseCard({ course, index }: { course: any, index: number }) {
  const formattedDate = course.start_date 
    ? new Date(course.start_date).toLocaleDateString('en-GB') 
    : "12/03/2026";

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="group bg-white rounded-[2.8rem] p-4 border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500"
    >
      <div className="relative aspect-[4/3] rounded-[2.2rem] overflow-hidden bg-gray-100">
        <Image 
          // أضفنا رابط افتراضي في حال كان الـ URL من الداتابيز فاضي
          src={course.image_url || "https://images.unsplash.com/photo-1517694712202-14dd9538aa97"} 
          alt={course.title}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-700"
          sizes="(max-w-768px) 100vw, 33vw"
          priority={index === 0} // تسريع تحميل أول صورة
        />
      </div>

      <div className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <Zap size={14} className="text-[#E63946]" />
          <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">
            {course.category || "Development"}
          </span>
        </div>

        <h3 className="text-xl font-black text-[#003366] uppercase leading-tight mb-8 h-14 line-clamp-2">
          {course.title}
        </h3>

        <div className="flex justify-between items-center py-5 border-y border-gray-50 mb-8">
          <Meta label="Start Date" icon={<Calendar size={14} />} value={formattedDate} />
          <Meta label="Seats" icon={<Users size={14} />} value={`${course.available_seats || 10}`} end />
        </div>

        {/* تأكد أن الـ ID ليس undefined */}
        <Link 
          href={`/courses/${course.id}`}
          className="flex items-center justify-center gap-3 w-full py-5 bg-[#001429] hover:bg-[#E63946] text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] transition-all active:scale-95"
        >
          View Details <ArrowUpRight size={16} />
        </Link>
      </div>
    </motion.div>
  );
}

const Meta = ({ label, icon, value, end }: any) => (
  <div className={`flex flex-col gap-1 ${end ? 'items-end' : ''}`}>
    <span className="text-[9px] font-bold text-gray-300 uppercase">{label}</span>
    <div className="flex items-center gap-2 text-[11px] font-black text-[#003366] uppercase">
      <span className="text-[#E63946]">{icon}</span> {value}
    </div>
  </div>
);